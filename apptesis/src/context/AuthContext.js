import React, { createContext, useState } from 'react';
import apiClient from '../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const AuthContext = createContext();
const auth = getAuth();

GoogleSignin.configure({
    webClientId: '631827940213-57oq4046iospjpvrg46k2vch3rojbr2k.apps.googleusercontent.com',
});


export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);       
    const [misGrupos, setMisGrupos] = useState([]);    
    const [isLoading, setIsLoading] = useState(true);

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            const firebaseToken = await auth.currentUser.getIdToken();
            const { data } = await apiClient.post('/auth/login', { firebaseToken });
            await AsyncStorage.setItem('token', data.token);
            return await cargarDatosUsuarioYGrupo();
        } catch (error) {
            console.error("Error en login:", error);
            return false;
        }
    };

    const loginConGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = GoogleAuthProvider.credential(idToken);
            const userCredential = await signInWithCredential(auth, googleCredential);
            const firebaseIdToken = await userCredential.user.getIdToken();
            const { data } = await apiClient.post('/auth/google-login', { idToken: firebaseIdToken });
            await AsyncStorage.setItem('token', data.token);
            return await cargarDatosUsuarioYGrupo();
        } catch (error) {
            if (error.code === '12501') return false;
            console.error("Error en Google Login:", error);
            return false;
        }
    };

    const register = async (nombre, email, contrasena) => {
        try {
            await apiClient.post('/auth/register', { nombre_completo: nombre, email, contrasena });
            return true;
        } catch (error) {
            return error.response?.data?.msg || 'No se pudo completar el registro.';
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await auth.signOut();
            await GoogleSignin.signOut();
            await AsyncStorage.removeItem('token');
            setUsuario(null);
            setMisGrupos([]);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const cargarDatosUsuarioYGrupo = async () => {
    console.log('[AuthContext] -> Iniciando carga de datos de usuario y grupo...');
    setIsLoading(true);
    try {
        console.log('[AuthContext] ...obteniendo token de AsyncStorage.');
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            console.log('[AuthContext] ...No se encontró token. Abortando.');
            throw new Error("No hay token");
        }
        console.log('[AuthContext] ...Token encontrado. Realizando llamadas a la API.');

        const [datosInicio, datosGrupos] = await Promise.all([
            apiClient.get('/grupos/inicio'),
            apiClient.get('/grupos/mis-grupos')
        ]);
         console.log('[AuthContext] Datos recibidos de /inicio:', JSON.stringify(datosInicio.data, null, 2));
        console.log('[AuthContext] ...Llamadas a la API completadas con éxito.');
        setUsuario(datosInicio.data);
        setMisGrupos(datosGrupos.data);
        return true;
    } catch (error) {
        console.error('[AuthContext] -> ERROR capturado durante la carga:', error);
        setUsuario(null);
        setMisGrupos([]);
        return false;
    } finally {
        console.log('[AuthContext] -> Bloque finally ejecutado. isLoading se establece en false.');
        setIsLoading(false);
    }
};
    
    const cambiarGrupoActivo = async (nuevoGrupoId) => {
        if (nuevoGrupoId === usuario?.grupo_activo_id) return;
        setIsLoading(true);
        try {
            await apiClient.post('/grupos/cambiar-activo', { grupo_id: nuevoGrupoId });
            await cargarDatosUsuarioYGrupo();
        } catch (error) {
            console.error("Error al cambiar de grupo:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const salirseDeGrupo = async () => {
        setIsLoading(true);
        try {
            await apiClient.delete('/grupos/salirse');
            await cargarDatosUsuarioYGrupo();
            return true;
        } catch (error) {
            return error.response?.data?.msg || "No se pudo salir del grupo.";
        } finally {
            setIsLoading(false);
        }
    };

    const unirseAGrupo = async (codigo_union) => {
        setIsLoading(true);
        try {
            await apiClient.post('/grupos/unirse', { codigo_union });
            await cargarDatosUsuarioYGrupo();
            return true;
        } catch (error) {
            return error.response?.data?.msg || 'No se pudo unir al grupo.';
        } finally {
            setIsLoading(false);
        }
    };

    const crearGrupo = async (nombre, descripcion) => {
        setIsLoading(true);
        try {
            await apiClient.post('/grupos/crear', { nombre, descripcion });
            await cargarDatosUsuarioYGrupo();
            return true;
        } catch (error) {
            return error.response?.data?.msg || 'No se pudo crear el grupo.';
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{

            usuario,
            misGrupos,
            isLoading,

            login,
            loginConGoogle,
            register,
            logout,
            cargarDatosUsuarioYGrupo,
            cambiarGrupoActivo,
            salirseDeGrupo,
            unirseAGrupo,
            crearGrupo
        }}>
            {children}
        </AuthContext.Provider>
    );
};