# Proyecto: [Aquí va el Nombre de tu Aplicación]

Aplicación móvil full-stack para la gestión de eventos y anuncios en grupos. Incluye un backend en Node.js para manejar la lógica de negocio y un frontend en React Native para la interfaz de usuario.

---
## ✨ Características Principales

* **Autenticación de Usuarios:**
    * Registro e inicio de sesión con Email y Contraseña.
    * Inicio de sesión social rápido y seguro con Google.
* **Seguridad:** Contraseñas hasheadas con `bcrypt` y sesiones manejadas con JSON Web Tokens (JWT) para proteger las rutas del API.
* **Backend Completo:** Servidor en Node.js con Express para gestionar la lógica de negocio.
* **Base de Datos:** Persistencia de datos robusta utilizando PostgreSQL.
* **Frontend Móvil:** Interfaz de usuario creada con React Native y Expo.

---
## 💻 Tecnologías Utilizadas

-   **Frontend:** React Native, Expo
-   **Backend:** Node.js, Express.js
-   **Base de Datos:** PostgreSQL
-   **Autenticación:** Firebase Authentication, JSON Web Token (JWT), Bcrypt.js
-   **Control de Versiones:** Git y GitHub

---
## 🚀 Requisitos Previos

Asegúrate de tener instalado el siguiente software antes de empezar:

* [Node.js](https://nodejs.org/) (v18 o superior)
* [Git](https://git-scm.com/)
* Un gestor de paquetes como `npm`.
* Una instancia de [PostgreSQL](https://www.postgresql.org/) activa.
* **[EAS CLI](https://docs.expo.dev/eas/getting-started/):** Instálalo globalmente con `npm install -g eas-cli`.
* Un emulador de Android Studio o un dispositivo físico Android.

---
## ⚙️ Instalación y Configuración

⚙️ Instalación y Configuración
Sigue estos pasos para configurar el entorno de desarrollo local.

1. Clonar el Repositorio
git clone [URL_DE_TU_REPOSITORIO_EN_GITHUB]
cd [NOMBRE_DE_LA_CARPETA_DEL_PROYECTO]

2. Configurar el Backend
Navega a la carpeta del backend e instala las dependencias:

cd backend
npm install

Crea tu archivo de variables de entorno copiando la plantilla:

cp .env.example .env

Abre el archivo .env y configúralo con tus datos:

# El host o IP donde corre tu servidor de PostgreSQL (usualmente 'localhost')
DB_HOST=localhost
# El nombre de la base de datos que vas a crear (ej. 'nodetesis')
DB_DATABASE=nodetesis
# El usuario de tu base de datos (comúnmente 'postgres')
DB_USER=postgres
# La contraseña para el usuario de la base de datos
DB_PASSWORD=TU_CONTRASEÑA_DE_POSTGRES
# El puerto de PostgreSQL (usualmente 5432)
DB_PORT=5432
# Inventa una frase larga y segura para firmar los tokens
JWT_SECRET=UNA_CLAVE_SECRETA_LARGA_Y_DIFICIL_DE_ADIVINAR

3. Configurar la Base de Datos con pgAdmin4
Abre pgAdmin4 o tu cliente de PostgreSQL preferido.

Crea una nueva base de datos vacía. Usa el mismo nombre que definiste en el archivo .env (ej. nodetesis).

Haz clic derecho sobre la base de datos que acabas de crear y selecciona la opción Restore....

En la ventana que aparece, busca y selecciona tu archivo de script (.sql o .backup) y ejecuta el proceso de restauración.

¡Listo! Al finalizar, tu base de datos tendrá todas las tablas y la información necesaria.

4. Configurar el Frontend
Regresa a la raíz del proyecto y navega a la carpeta del frontend para instalar sus dependencias:

cd ../frontend
npm install

Crea tu archivo de variables de entorno:

cp .env.example .env

Abre el archivo .env y asegúrate de que la EXPO_PUBLIC_API_URL apunta a la dirección IP de tu servidor backend.

# Usa la IP de tu máquina (ej. 192.168.1.10) si vas a probar en un teléfono físico
EXPO_PUBLIC_API_URL=http://10.0.0.5:3000/api

▶️ Ejecutar la Aplicación
Este proyecto utiliza librerías nativas y no es compatible con la aplicación Expo Go. Debes usar un "Development Build" que tú mismo compilarás.

1. Compilar e Instalar el Build (Solo la primera vez)
Compilar el APK: Desde la carpeta /frontend, ejecuta el siguiente comando para crear tu archivo .apk:

eas build --profile development --platform android

Descargar e Instalar: Una vez que la compilación termine, Expo te dará un enlace para descargar el archivo .apk. Descárgalo e instálalo en tu teléfono o emulador Android.

2. Iniciar los Servidores (Para el día a día)
Una vez que tienes el "Development Build" instalado, solo necesitas iniciar los servidores.

Iniciar el Servidor Backend:

# En una terminal, desde la carpeta /backend
npm start

Iniciar el Servidor del Frontend:

# En una segunda terminal, desde la carpeta /frontend
npx expo start --dev-client

Abre la aplicación que instalaste en tu dispositivo y se conectará automáticamente al servidor de desarrollo.

📂 Estructura de Carpetas
mi-proyecto/
├── backend/        # Código del servidor (Node.js, Express)
├── frontend/       # Código de la app móvil (React Native, Expo)
├── .gitignore      # Archivos y carpetas ignorados por Git
└── README.md       # La documentación del proyecto

### 1. Clonar el Repositorio

```bash
git clone [URL_DE_TU_REPOSITORIO_EN_GITHUB]
cd [NOMBRE_DE_LA_CARPETA_DEL_PROYECTO]