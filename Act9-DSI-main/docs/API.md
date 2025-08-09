**Documento preparado y personalizado por Steven.**

# Documentación de la API

##  Autenticación

Todas las rutas protegidas requieren un token JWT en el header:
```
Authorization: Bearer <token>
```

##  Endpoints Disponibles

### Autenticación

#### POST /api/auth/login
Iniciar sesión de usuario.

**Request:**
```json
{
  "email": "admin@inventarios.com",
  "contraseña": "tu_contraseña"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "usuario": {
      "id": "507f1f77bcf86cd799439011",
      "nombre": "Administrador",
      "email": "admin@inventarios.com",
      "rol": "admin"
    }
  }
}
```

#### POST /api/auth/registro
Registrar nuevo usuario (solo admin).

**Request:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@inventarios.com",
  "contraseña": "contraseña123",
  "rol": "operador"
}
```

#### GET /api/auth/profile
Obtener perfil del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "nombre": "Juan Pérez",
    "email": "juan@inventarios.com",
    "rol": "operador",
    "activo": true,
    "fechaCreacion": "2024-01-15T10:30:00.000Z"
  }
}
```

###  Productos

#### GET /api/productos
Obtener lista de productos.

**Query Parameters:**
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Productos por página (default: 10)
- `categoria` (opcional): Filtrar por categoría
- `search` (opcional): Buscar por nombre

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "nombre": "Laptop HP",
      "descripcion": "Laptop HP Core i5 8GB RAM",
      "precio": 850.00,
      "stock": 25,
      "categoria": "Electrónicos",
      "fechaCreacion": "2024-01-15T10:30:00.000Z",
      "fechaActualizacion": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "pages": 1
  }
}
```

#### POST /api/productos
Crear nuevo producto.

**Request:**
```json
{
  "nombre": "Laptop HP",
  "descripcion": "Laptop HP Core i5 8GB RAM",
  "precio": 850.00,
  "stock": 25,
  "categoria": "Electrónicos"
}
```

#### GET /api/productos/:id
Obtener producto por ID.

#### PUT /api/productos/:id
Actualizar producto completo.

#### PATCH /api/productos/:id/stock
Actualizar solo el stock del producto.

**Request:**
```json
{
  "stock": 30,
  "motivo": "Restock de inventario"
}
```

#### DELETE /api/productos/:id
Eliminar producto (soft delete).

### Movimientos

#### GET /api/movimientos
Obtener lista de movimientos.

**Query Parameters:**
- `page` (opcional): Número de página
- `limit` (opcional): Movimientos por página
- `tipo` (opcional): "entrada" o "salida"
- `producto` (opcional): ID del producto
- `fechaDesde` (opcional): Fecha inicial (YYYY-MM-DD)
- `fechaHasta` (opcional): Fecha final (YYYY-MM-DD)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "producto": {
        "id": "507f1f77bcf86cd799439012",
        "nombre": "Laptop HP"
      },
      "tipo": "entrada",
      "cantidad": 10,
      "motivo": "Compra a proveedor",
      "usuario": {
        "id": "507f1f77bcf86cd799439013",
        "nombre": "Juan Pérez"
      },
      "fecha": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "pages": 1
  }
}
```

#### POST /api/movimientos
Crear nuevo movimiento.

**Request:**
```json
{
  "producto": "507f1f77bcf86cd799439012",
  "tipo": "entrada",
  "cantidad": 10,
  "motivo": "Compra a proveedor"
}
```

#### GET /api/movimientos/producto/:id
Obtener movimientos de un producto específico.

###  Pruebas

#### GET /api/test/test
Verificar funcionamiento de la API.

**Response (200):**
```json
{
  "success": true,
  "message": "API funcionando correctamente",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "development"
}
```

#### GET /api/test/health
Verificar estado del servidor y base de datos.

**Response (200):**
```json
{
  "success": true,
  "api": "OK",
  "database": "connected",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

##  Códigos de Error

### 400 - Bad Request
```json
{
  "success": false,
  "message": "Datos inválidos",
  "errors": [
    {
      "field": "email",
      "message": "El email es requerido"
    }
  ]
}
```

### 401 - Unauthorized
```json
{
  "success": false,
  "message": "Token no válido o expirado"
}
```

### 403 - Forbidden
```json
{
  "success": false,
  "message": "No tienes permisos para esta acción"
}
```

### 404 - Not Found
```json
{
  "success": false,
  "message": "Recurso no encontrado"
}
```

### 500 - Internal Server Error
```json
{
  "success": false,
  "message": "Error interno del servidor"
}
```

##  Ejemplos de Uso

### Autenticación completa
```javascript
// 1. Login
const loginResponse = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'admin@inventarios.com',
    contraseña: 'tu_contraseña'
  })
});

const { data } = await loginResponse.json();
const token = data.token;

// 2. Usar token en requests posteriores
const productosResponse = await fetch('/api/productos', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### Crear producto
```javascript
const nuevoProducto = await fetch('/api/productos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    nombre: 'Laptop HP',
    descripcion: 'Laptop HP Core i5 8GB RAM',
    precio: 850.00,
    stock: 25,
    categoria: 'Electrónicos'
  })
});
```

### Registrar movimiento
```javascript
const movimiento = await fetch('/api/movimientos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    producto: '507f1f77bcf86cd799439012',
    tipo: 'entrada',
    cantidad: 10,
    motivo: 'Compra a proveedor'
  })
});
```

##  Notas Importantes

1. **Tokens JWT**: Expiran en 24 horas por defecto
2. **Paginación**: Máximo 100 elementos por página
3. **Soft Delete**: Los recursos eliminados se marcan como inactivos
4. **Validación**: Todos los campos son validados en el servidor
5. **Logs**: Todas las operaciones importantes se registran
