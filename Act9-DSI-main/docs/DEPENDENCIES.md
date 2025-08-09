#  Dependencias del Proyecto

##  Dependencias de Producción

### Backend Core
| Paquete | Versión | Propósito | Documentación |
|---------|---------|-----------|---------------|
| **express** | ^4.18.2 | Framework web para Node.js | [Docs](https://expressjs.com/) |
| **mongoose** | ^8.0.3 | ODM para MongoDB | [Docs](https://mongoosejs.com/) |
| **cors** | ^2.8.5 | Middleware para CORS | [Docs](https://github.com/expressjs/cors) |
| **dotenv** | ^16.3.1 | Variables de entorno | [Docs](https://github.com/motdotla/dotenv) |

### Autenticación y Seguridad
| Paquete | Versión | Propósito | Documentación |
|---------|---------|-----------|---------------|
| **jsonwebtoken** | ^9.0.2 | Tokens JWT | [Docs](https://github.com/auth0/node-jsonwebtoken) |
| **bcryptjs** | ^2.4.3 | Encriptación de contraseñas | [Docs](https://github.com/dcodeIO/bcrypt.js) |

### Validación
| Paquete | Versión | Propósito | Documentación |
|---------|---------|-----------|---------------|
| **joi** | ^17.13.3 | Validación de esquemas | [Docs](https://joi.dev/) |
| **express-validator** | ^7.0.1 | Validación de Express | [Docs](https://express-validator.github.io/) |

##  Dependencias de Desarrollo

### Testing
| Paquete | Versión | Propósito | Documentación |
|---------|---------|-----------|---------------|
| **jest** | ^30.0.4 | Framework de testing | [Docs](https://jestjs.io/) |
| **supertest** | ^7.1.3 | Testing de APIs HTTP | [Docs](https://github.com/ladjs/supertest) |

### Desarrollo
| Paquete | Versión | Propósito | Documentación |
|---------|---------|-----------|---------------|
| **nodemon** | ^3.0.2 | Recarga automática en desarrollo | [Docs](https://nodemon.io/) |

##  Dependencias del Frontend

### CDN (Cargadas desde Internet)
| Librería | Versión | Propósito | CDN |
|----------|---------|-----------|-----|
| **Tailwind CSS** | 3.x | Framework CSS | `https://cdn.tailwindcss.com` |
| **Font Awesome** | 6.0 | Iconos | `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css` |

### Nativas del Navegador
| API | Propósito | Soporte |
|-----|-----------|---------|
| **Fetch API** | Peticiones HTTP | Todos los navegadores modernos |
| **LocalStorage** | Almacenamiento local | Todos los navegadores |
| **JSON** | Serialización de datos | Nativo |

## Instalación de Dependencias

### Instalación Completa
```bash
npm install
```

### Instalación Solo Producción
```bash
npm install --production
```

### Instalación Solo Desarrollo
```bash
npm install --only=dev
```

### Verificar Dependencias
```bash
npm list
```

### Actualizar Dependencias
```bash
npm update
```

### Auditar Seguridad
```bash
npm audit
npm audit fix
```

##  Análisis de Dependencias

### Tamaño del Proyecto
```bash
# Verificar tamaño de node_modules
du -sh node_modules/

# Analizar dependencias
npm ls --depth=0
```

### Dependencias Vulnerables
```bash
# Verificar vulnerabilidades
npm audit

# Corregir automáticamente
npm audit fix

# Corregir forzadamente
npm audit fix --force
```

##  Detalles de Dependencias Principales

### Express.js
- **Uso**: Framework web principal
- **Características**: Routing, middleware, HTTP utilities
- **Alternativas**: Koa, Fastify, Hapi

### Mongoose
- **Uso**: Conexión y modelado de MongoDB
- **Características**: Esquemas, validación, middleware
- **Alternativas**: MongoDB driver nativo, Prisma

### JWT
- **Uso**: Autenticación sin estado
- **Características**: Tokens seguros, expiración
- **Alternativas**: Sessions, OAuth, Passport

### Joi
- **Uso**: Validación de datos
- **Características**: Esquemas declarativos, mensajes personalizados
- **Alternativas**: Yup, Ajv, express-validator

### Tailwind CSS
- **Uso**: Framework CSS utility-first
- **Características**: Componentes reutilizables, responsive
- **Alternativas**: Bootstrap, Bulma, Material-UI

##  Consideraciones de Seguridad

### Dependencias Críticas
- **bcryptjs**: Mantener actualizada para seguridad
- **jsonwebtoken**: Verificar vulnerabilidades regularmente
- **mongoose**: Actualizar por parches de seguridad

### Buenas Prácticas
```bash
# Verificar vulnerabilidades regularmente
npm audit

# Usar versiones específicas en producción
npm ci

# Mantener package-lock.json actualizado
npm install --package-lock-only
```

##  Optimización

### Bundle Size
- **Frontend**: Sin bundler, carga directa
- **Backend**: Solo dependencias necesarias
- **Total**: ~50MB con node_modules

### Performance
- **Mongoose**: Conexión pooled
- **Express**: Middleware optimizado
- **JWT**: Tokens ligeros

##  Mantenimiento

### Actualización Regular
```bash
# Verificar actualizaciones
npm outdated

# Actualizar dependencias menores
npm update

# Actualizar dependencias mayores manualmente
npm install package@latest
```

### Limpieza
```bash
# Limpiar cache
npm cache clean --force

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

##  Recomendaciones

1. **Mantén actualizadas** las dependencias de seguridad
2. **Usa versiones específicas** en producción
3. **Audita regularmente** las vulnerabilidades
4. **Documenta** las razones de cada dependencia
5. **Considera alternativas** más ligeras si es necesario

