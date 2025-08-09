**Documento preparado y personalizado por Steven.**

# Instalación y Configuración

## Guía Paso a Paso

### 1. Prerrequisitos

Antes de empezar, asegúrate de tener instalado:

```bash
# Verificar versiones
node --version    # Debe ser 18.x o superior
npm --version     # Debe ser 8.x o superior
git --version     # Cualquier versión reciente
```

### 2. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/sistema-inventarios.git
cd sistema-inventarios
```

### 3. Instalar Dependencias

```bash
npm install
```

### 4. Configurar MongoDB Atlas

#### 4.1 Crear Cuenta en MongoDB Atlas
1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una cuenta gratuita
3. Crea un nuevo cluster (selecciona la opción gratuita)

#### 4.2 Configurar Acceso
1. En "Database Access", crea un usuario:
   - Username: `tu_usuario`
   - Password: `tu_password`
   - Roles: `Atlas Admin`

2. En "Network Access", añade tu IP:
   - Selecciona "Add IP Address"
   - Elige "Allow Access from Anywhere" (para desarrollo)

#### 4.3 Obtener URI de Conexión
1. En "Database", haz clic en "Connect"
2. Selecciona "Connect your application"
3. Copia la URI de conexión

### 5. Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp config/.env.example config/.env
```

Edita `config/.env` con tus datos:
```env
# Configuración del servidor
PORT=3000
NODE_ENV=development

# Base de datos MongoDB Atlas
MONGODB_URI=mongodb+srv://tu_usuario:tu_password@cluster.mongodb.net/inventario_db

# JWT Secret (genera una clave segura)
JWT_SECRET=mi_clave_super_secreta_2024
JWT_EXPIRE=24h

# CORS
CORS_ORIGIN=http://localhost:3000
```

### 6. Crear Usuario Administrador

```bash
npm run create-admin
```

Sigue las instrucciones en pantalla para crear tu primer usuario administrador.

### 7. Iniciar la Aplicación

```bash
# Modo desarrollo (recomendado)
npm run dev

# El servidor se iniciará en http://localhost:3000
```

## Comandos Útiles

```bash
# Desarrollo
npm run dev              # Servidor con recarga automática
npm run server:dev       # Solo servidor Express

# Producción
npm start               # Servidor en modo producción

# Utilidades
npm run create-admin    # Crear usuario administrador
npm test               # Ejecutar pruebas
npm run test:watch     # Pruebas en modo observación
```

##  Solución de Problemas

### Error: "Cannot connect to MongoDB"
```bash
# Verificar que la URI de MongoDB sea correcta
# Verificar que tu IP esté en la lista blanca de MongoDB Atlas
# Verificar que el usuario y contraseña sean correctos
```

### Error: "Port 3000 is already in use"
```bash
# Cambiar el puerto en config/.env
PORT=3001

# O terminar el proceso que usa el puerto 3000
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F
```

### Error: "JWT Secret not defined"
```bash
# Asegúrate de que config/.env tenga la variable JWT_SECRET
JWT_SECRET=tu_clave_secreta_aqui
```

## Primer Uso

1. Abre tu navegador en `http://localhost:3000`
2. Usa las credenciales del administrador que creaste
3. Explora las diferentes secciones:
   - Dashboard: Estadísticas generales
   - Productos: Gestión de inventario
   - Movimientos: Historial de cambios
   - Usuarios: Gestión de accesos (solo admin)

## Siguientes Pasos

1. Familiarízate con la interfaz
2. Crea algunos productos de prueba
3. Registra movimientos de inventario
4. Explora los reportes y estadísticas
5. Crea usuarios adicionales si es necesario

¡Listo! Tu sistema de inventarios está funcionando correctamente. 
