# Proyecto modificado por Steven

Este repositorio ha sido personalizado y adaptado para presentarlo como propio. Se conservaron las funcionalidades, pero se actualizaron textos, comentarios y la documentación para reflejar el estilo del autor.

# Sistema de Inventarios

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
</div>

<div align="center">
  <h3>Sistema completo de gestión de inventarios desarrollado con tecnologías modernas</h3>
  <p>
    <strong>Autor:</strong> Sistema de Inventarios<br>
    <strong>Versión:</strong> 1.0.0<br>
    <strong>Licencia:</strong> MIT
  </p>
</div>

---

## Descripción

Sistema web completo para la gestión de inventarios que permite el control total de productos, stock, movimientos y usuarios. Desarrollado con arquitectura moderna y escalable, utilizando Node.js, Express, MongoDB y una interfaz responsive con Tailwind CSS.

## Características Principales

### **Autenticación y Seguridad**
- ✅ Sistema de usuarios con roles (Administrador/Operador)
- ✅ Autenticación JWT segura
- ✅ Encriptación de contraseñas con bcryptjs
- ✅ Middleware de autorización por roles

### **Gestión de Productos**
- ✅ CRUD completo de productos
- ✅ Categorización de productos
- ✅ Control de stock en tiempo real
- ✅ Gestión de proveedores
- ✅ Historial de movimientos

### **Dashboard y Reportes**
- ✅ Panel de control interactivo
- ✅ Estadísticas en tiempo real
- ✅ Reportes de inventario
- ✅ Análisis de movimientos
- ✅ Exportación de datos

### **Interfaz de Usuario**
- ✅ Diseño responsive con Tailwind CSS
- ✅ SPA (Single Page Application)
- ✅ Experiencia de usuario moderna
- ✅ Notificaciones en tiempo real

## Arquitectura del Proyecto

```
sistema-inventarios/
├──  backend/                    # Servidor Node.js + Express
│   ├──  src/
│   │   ├──  config/            # Configuraciones (DB, JWT, etc.)
│   │   ├──  controllers/       # Lógica de negocio
│   │   ├──  middleware/        # Middleware personalizado
│   │   ├──  models/           # Modelos de MongoDB (Mongoose)
│   │   ├──  routes/           # Rutas de la API REST
│   │   ├──  utils/            # Utilidades y helpers
│   │   ├──  app.js            # Configuración de Express
│   │   └──  index.js          # Punto de entrada del servidor
│   ├──  scripts/              # Scripts de utilidad
│   └──  tests/                # Pruebas unitarias
├──  frontend/                  # Cliente web (SPA)
│   ├──  public/
│   │   ├──  css/              # Estilos CSS personalizados
│   │   ├──  js/               # JavaScript del cliente
│   │   ├──  assets/           # Recursos estáticos
│   │   └──  index.html        # Página principal
│   └──  src/                  # Código fuente (futuro)
├──  db/                       # Base de datos
│   └──  migrations/           # Migraciones de BD
├──  docs/                     # Documentación
├──  config/                   # Configuraciones generales
│   ├──  .env                  # Variables de entorno
│   └──  .env.example          # Ejemplo de configuración
└──  .vscode/                  # Configuración de VS Code
```

## Tecnologías Utilizadas

### Backend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Node.js** | 18.x+ | Entorno de ejecución |
| **Express.js** | ^4.18.2 | Framework web |
| **MongoDB** | 8.x+ | Base de datos NoSQL |
| **Mongoose** | ^8.0.3 | ODM para MongoDB |
| **JWT** | ^9.0.2 | Autenticación |
| **bcryptjs** | ^2.4.3 | Encriptación |
| **Joi** | ^17.13.3 | Validación |
| **CORS** | ^2.8.5 | Configuración de CORS |

### Frontend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **HTML5** | - | Estructura |
| **CSS3** | - | Estilos |
| **JavaScript** | ES6+ | Lógica del cliente |
| **Tailwind CSS** | 3.x | Framework CSS |
| **Font Awesome** | 6.0 | Iconos |
| **Fetch API** | Nativo | Peticiones HTTP |

### Herramientas de Desarrollo
| Herramienta | Propósito |
|-------------|-----------|
| **Nodemon** | Desarrollo con recarga automática |
| **Jest** | Testing |
| **Supertest** | Testing de APIs |
| **VS Code** | Editor de código |

## Requisitos Previos

- **Node.js** 18.0 o superior
- **MongoDB Atlas** (cuenta gratuita)
- **Git** (para clonar el repositorio)
- **VS Code** (recomendado)

## Instalación

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/sistema-inventarios.git
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno
```bash
cp config/.env.example config/.env

# Editar el archivo .env con tus configuraciones
```

**Configuración del archivo `.env`:**
```env
# Configuración del servidor
PORT=3000
NODE_ENV=development

# Base de datos MongoDB Atlas
MONGODB_URI=mongodb+srv://tu_usuario:tu_password@cluster.mongodb.net/inventario_db

# JWT Secret
JWT_SECRET=tu-clave-secreta-muy-segura
JWT_EXPIRE=24h

# CORS
CORS_ORIGIN=http://localhost:3000
```

### 4. Configurar MongoDB Atlas
1. Crear una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crear un cluster gratuito
3. Configurar el acceso a la base de datos
4. Obtener la URI de conexión
5. Actualizar `MONGODB_URI` en el archivo `.env`

### 5. Crear Usuario Administrador
```bash
npm run create-admin
```

### 6. Iniciar la Aplicación
```bash
# Modo desarrollo (recomendado)
npm run dev

# Modo producción
npm start
```

## Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Iniciar servidor en modo desarrollo
npm run server:dev       # Iniciar solo el servidor Express

# Producción
npm start               # Iniciar servidor en modo producción
npm run server          # Iniciar solo el servidor Express

# Utilidades
npm run create-admin    # Crear usuario administrador
npm test               # Ejecutar pruebas
npm run test:watch     # Ejecutar pruebas en modo observación
```

## API Endpoints

### Autenticación
```http
POST   /api/auth/login          # Iniciar sesión
POST   /api/auth/register       # Registrar usuario
GET    /api/auth/profile        # Obtener perfil del usuario
```

### Productos
```http
GET    /api/productos           # Listar todos los productos
GET    /api/productos/:id       # Obtener producto por ID
POST   /api/productos           # Crear nuevo producto
PUT    /api/productos/:id       # Actualizar producto
DELETE /api/productos/:id       # Eliminar producto
PATCH  /api/productos/:id/stock # Actualizar stock
```

### Movimientos
```http
GET    /api/movimientos                 # Listar movimientos
POST   /api/movimientos                 # Registrar nuevo movimiento
GET    /api/movimientos/producto/:id    # Movimientos por producto
```

### Pruebas
```http
GET    /api/test/test           # Verificar funcionamiento de la API
GET    /api/test/health         # Verificar estado del servidor y BD
```

## Modelos de Datos

### Usuario
```javascript
{
  nombre: String,
  email: String (único),
  contraseña: String (encriptada),
  rol: String (admin/operador),
  activo: Boolean,
  fechaCreacion: Date
}
```

### Producto
```javascript
{
  nombre: String,
  descripcion: String,
  precio: Number,
  stock: Number,
  categoria: String,
  proveedor: ObjectId,
  fechaCreacion: Date,
  fechaActualizacion: Date
}
```

### Movimiento
```javascript
{
  producto: ObjectId,
  tipo: String (entrada/salida),
  cantidad: Number,
  motivo: String,
  usuario: ObjectId,
  fecha: Date
}
```

## Testing

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo observación
npm run test:watch

# Ejecutar pruebas con cobertura
npm run test:coverage
```

## Estados de Respuesta de la API

```javascript
// Respuesta exitosa
{
  "success": true,
  "message": "Operación exitosa",
  "data": { ... },
  "pagination": { ... } // Si aplica
}

// Respuesta de error
{
  "success": false,
  "message": "Descripción del error",
  "errors": [ ... ] // Detalles si aplica
}
```

## Capturas de Pantalla

### Pantalla de Login
![Login](docs/screenshots/login.png)

### Dashboard Principal
![Dashboard](docs/screenshots/dashboard.png)

### Gestión de Productos
![Productos](docs/screenshots/productos.png)

### Movimientos de Inventario
![Movimientos](docs/screenshots/movimientos.png)

## Seguridad

-  Tokens JWT con expiración
-  Contraseñas encriptadas con bcryptjs
-  Validación de entrada en frontend y backend
-  Middleware de autorización por roles
-  Configuración de CORS
-  Sanitización de datos

## Deployment

### Heroku
```bash
# Instalar Heroku CLI
npm install -g heroku

# Crear aplicación
heroku create tu-app-inventarios

# Configurar variables de entorno
heroku config:set MONGODB_URI=tu_uri_mongodb
heroku config:set JWT_SECRET=tu_secreto
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Railway
```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway init
railway up
```

---

## Estructura del Proyecto

```
proyecto/
├── backend/                 # Código del servidor
│   ├── src/
│   │   ├── config/         # Configuraciones
│   │   ├── controllers/    # Controladores (lógica de negocio)
│   │   ├── middleware/     # Middleware personalizado
│   │   ├── models/         # Modelos de datos
│   │   ├── routes/         # Rutas de la API
│   │   ├── utils/          # Utilidades
│   │   ├── app.js          # Configuración de Express
│   │   └── index.js        # Punto de entrada del servidor
│   ├── scripts/            # Scripts de utilidad
│   └── tests/              # Pruebas unitarias
├── frontend/               # Código del cliente
│   ├── public/
│   │   ├── css/           # Estilos CSS
│   │   ├── js/            # JavaScript del cliente
│   │   ├── assets/        # Recursos estáticos
│   │   └── index.html     # Página principal
│   └── src/               # Código fuente del frontend (futuro)
├── db/                     # Base de datos
│   └── migrations/        # Migraciones de BD
├── docs/                   # Documentación
├── config/                 # Configuraciones generales
└── .vscode/               # Configuración de VS Code
```

## Características

- **Autenticación y Autorización**: Sistema de usuarios con roles (Administrador/Operador)
- **Gestión de Productos**: CRUD completo con categorías y proveedores
- **Control de Inventario**: Registro de entradas y salidas con historial detallado
- **Dashboard Interactivo**: Estadísticas en tiempo real del inventario
- **Reportes**: Análisis y exportación de datos
- **Interfaz Responsiva**: Diseño moderno con Tailwind CSS
- **API RESTful**: Endpoints completos para todas las funcionalidades

## Tecnologías

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación
- **bcryptjs** - Encriptación de contraseñas
- **express-validator** - Validación de datos

### Frontend
- **HTML5** - Estructura
- **CSS3** - Estilos
- **JavaScript (ES6+)** - Lógica del cliente
- **Tailwind CSS** - Framework de CSS
- **Font Awesome** - Iconos

## Prerrequisitos

Antes de instalar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [MongoDB](https://www.mongodb.com/try/download/community) (versión 4.4 o superior)
- [Git](https://git-scm.com/)

## Instalación

1. **Clona el repositorio**
   ```bash
   git clone [url-del-repositorio]
   cd sistema-inventarios
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   
   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/sistema_inventarios
   JWT_SECRET=tu_jwt_secret_muy_seguro_aqui
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

4. **Inicia MongoDB**
   
   Asegúrate de que MongoDB esté ejecutándose en tu sistema.

5. **Inicializa la base de datos con datos de ejemplo**
   ```bash
   npm run init-db
   ```

6. **Ejecuta la aplicación**
   
   Para desarrollo:
   ```bash
   npm run dev
   ```
   
   Para producción:
   ```bash
   npm start
   ```

7. **Accede a la aplicación**
   
   Abre tu navegador y ve a `http://localhost:3000`

## Usuarios por Defecto

### Credenciales de Administrador
Después de ejecutar `npm run init-db`, puedes usar estas credenciales:

- **Email:** admin@inventarios.com
- **Contraseña:** admin123

### Primer Usuario (Sin datos de ejemplo)
Si no ejecutas el script de inicialización:
1. Accede a la aplicación
2. Haz clic en "Regístrate aquí"
3. Completa el formulario de registro
4. Selecciona el rol "Administrador" para tener acceso completo

## Uso del Sistema

### Dashboard
- Visualiza estadísticas generales del inventario
- Productos con stock bajo
- Movimientos recientes
- Valor total del inventario

### Gestión de Productos
- **Crear**: Añade nuevos productos con información completa
- **Editar**: Modifica productos existentes
- **Eliminar**: Desactiva productos (soft delete)
- **Buscar**: Filtra por nombre, código o categoría
- **Historial**: Ve movimientos específicos de cada producto

### Movimientos de Inventario
- **Entradas**: Registra compras o ajustes positivos
- **Salidas**: Registra ventas o ajustes negativos
- **Motivos**: Compra, venta, ajuste, devolución, merma, etc.
- **Validación**: Control automático de stock disponible

### Reportes
- Productos con stock bajo
- Movimientos del día
- Exportación de datos (CSV/JSON)
- Análisis de rotación de productos

## Roles y Permisos

### Administrador
- Acceso completo a todas las funcionalidades
- Gestión de usuarios
- Eliminación de registros
- Configuración del sistema

### Operador
- Gestión de productos y movimientos
- Consulta de reportes
- Sin acceso a gestión de usuarios
- Sin permisos de eliminación

## Estructura del Proyecto

```
sistema-inventarios/
├── models/                 # Modelos de MongoDB
│   ├── Usuario.js
│   ├── Categoria.js
│   ├── Proveedor.js
│   ├── Producto.js
│   ├── Movimiento.js
│   ├── Transaccion.js
│   └── DetalleTransaccion.js
├── routes/                 # Rutas de la API
│   ├── auth.js
│   ├── productos.js
│   ├── categorias.js
│   ├── proveedores.js
│   ├── movimientos.js
│   ├── transacciones.js
│   └── usuarios.js
├── middleware/             # Middleware personalizado
│   └── auth.js
├── public/                 # Frontend
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── api.js
│       ├── auth.js
│       ├── app.js
│       ├── products.js
│       ├── movements.js
│       └── reports.js
├── server.js              # Servidor principal
├── package.json
└── .env                   # Variables de entorno
```

## API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/registro` - Registrar usuario
- `GET /api/auth/perfil` - Obtener perfil
- `PUT /api/auth/perfil` - Actualizar perfil

### Productos
- `GET /api/productos` - Listar productos
- `GET /api/productos/:id` - Obtener producto
- `POST /api/productos` - Crear producto
- `PUT /api/productos/:id` - Actualizar producto
- `DELETE /api/productos/:id` - Eliminar producto

### Movimientos
- `GET /api/movimientos` - Listar movimientos
- `POST /api/movimientos` - Crear movimiento
- `GET /api/movimientos/producto/:id` - Movimientos por producto

### [Más endpoints disponibles en la documentación de la API]

## Características Técnicas

### Seguridad
- Autenticación JWT
- Encriptación de contraseñas con bcrypt
- Validación de entrada en frontend y backend
- Middleware de autorización
- Protección contra inyecciones

### Performance
- Índices en MongoDB para consultas optimizadas
- Paginación en listados
- Carga lazy de datos
- Compresión de respuestas

### UX/UI
- Interfaz responsive
- Notificaciones toast
- Confirmaciones de acciones destructivas
- Loading states
- Validación en tiempo real


---

