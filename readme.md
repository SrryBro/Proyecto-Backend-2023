# Proyecto de Red Social

Este proyecto es una aplicación de red social desarrollada con Node.js, Express y Sequelize.

## Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/nombre-del-repositorio.git
   cd nombre-del-repositorio

   Instalar dependencias:

"npm install"
 
Configurar base de datos:

Crea una base de datos en tu servidor de base de datos (por ejemplo, MySQL).
Copia el archivo .env.example a un nuevo archivo llamado .env y configura las variables de entorno, incluyendo la URL de tu base de datos.

Sincronizar modelos con la base de datos:

"npm run db:migrate"


Uso


Iniciar la aplicación:

npm start

La aplicación estará disponible en http://localhost:3000 utilizando el Thunder Client para las consultas

Endpoints:

La lista de usuarios está disponible en http://localhost:3000/usuarios.
Otros endpoints como registro, inicio de sesión, etc., se pueden acceder según las rutas definidas en routes/usuarios.js.