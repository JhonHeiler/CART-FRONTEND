Cart Frontend
Este es el frontend de la aplicación para gestionar el carrito de compras. Está construido con React y Material UI para la interfaz de usuario, y se conecta al backend para gestionar productos, agregar artículos al carrito y realizar el proceso de compra.

Tecnologías Utilizadas
React (v19.0.0) - Biblioteca principal para construir la interfaz de usuario.
Material UI (v6.4.5) - Biblioteca de componentes para una interfaz atractiva y accesible.
React Router Dom (v7.2.0) - Para la gestión de rutas en la aplicación.
Emotion (v11.14.0) - Para estilos CSS-in-JS.
Testing Library (v16.2.0) - Para pruebas unitarias.
Requisitos
Asegúrate de tener Node.js y npm instalados en tu máquina. Puedes descargar Node.js desde aquí.

Instalación
Para instalar las dependencias y poner en marcha el proyecto:

Clona el repositorio:

bash
Copiar
Editar
git clone <URL_DEL_REPOSITORIO>
cd cart-frontend
Instala las dependencias:

bash
Copiar
Editar
npm install
Ejecutando el Proyecto
Para iniciar la aplicación en modo de desarrollo, ejecuta el siguiente comando:

bash
Copiar
Editar
npm start
Esto iniciará el servidor de desarrollo y abrirá la aplicación en http://localhost:3000.

Estructura del Proyecto
php
Copiar
Editar
cart-frontend/
├── public/                    # Archivos estáticos
│   ├── robots.txt             # Archivo de configuración para motores de búsqueda
│   ├── mono.png               # Imagen de logo u otros elementos visuales
├── src/                       # Archivos fuente de la aplicación
│   ├── assets/                # Archivos estáticos como imágenes, iconos, etc.
│   ├── components/            # Componentes reutilizables de la interfaz
│   │   ├── auth/              # Componentes relacionados con autenticación
│   │   │   └── Cart.jsx       # Componente para el carrito de compras
│   │   ├── products/          # Componentes relacionados con productos
│   │   ├── layout/            # Componentes de diseño como encabezados, pies de página
│   │   └── profile/           # Componentes de perfil de usuario
│   ├── context/               # Proveedores de contexto de la aplicación
│   │   └── AuthContext.jsx    # Contexto para la autenticación
│   ├── routes/                # Rutas de la aplicación
│   │   └── AppRoutes.jsx      # Archivo de rutas principales
│   ├── services/              # Servicios para la comunicación con el backend
│   │   ├── authService.js     # Servicio para autenticación
│   │   ├── cartService.js     # Servicio para manejar el carrito
│   │   ├── productService.js  # Servicio para manejar productos
│   │   └── userService.js     # Servicio para manejar datos de usuario
│   ├── App.js                 # Componente principal de la aplicación
│   ├── App.css                # Estilos principales
│   └── index.js               # Punto de entrada de React
├── .gitignore                 # Archivos a excluir del repositorio
├── package.json               # Dependencias y scripts
├── README.md                  # Este archivo
Funcionalidades
Visualizar productos: Los usuarios pueden ver una lista de los productos disponibles.
Agregar productos al carrito: Los usuarios pueden añadir productos al carrito de compras.
Ver detalles del carrito: Permite ver el carrito con los productos seleccionados y sus cantidades.
Eliminar productos del carrito: Los usuarios pueden eliminar productos del carrito si lo desean.
Pruebas
Para ejecutar las pruebas de la aplicación, utiliza el siguiente comando:

bash
Copiar
Editar
npm test
Despliegue
Para crear una versión optimizada para producción, ejecuta:

bash
Copiar
Editar
npm run build
Esto generará una versión optimizada de la aplicación en la carpeta build, que puedes desplegar en tu servidor o plataforma de hosting preferida.

