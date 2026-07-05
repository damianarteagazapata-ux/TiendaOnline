# 🛒 TiendaOnline
Permite el registro e inicio de sesión mediante JWT, gestión de productos, carrito de compras, creación de pedidos y un panel administrativo para administrar productos y pedidos.

Proyecto de tienda online desarrollado con **Node.js + Express**, **React + Vite** y **MySQL/MariaDB**.

---

# Características

- Registro de usuarios.
- Inicio de sesión con JWT.
- Gestión de productos.
- Carrito de compras persistente por usuario.
- Creación de pedidos.
- Administración de pedidos.
- Cambio de estados de pedidos.
- Dashboard administrativo.
- Gestión de roles (Administrador / Cliente).

---

# Requisitos

- Node.js 18 o superior
- npm
- MySQL o MariaDB
- XAMPP (Opcional)

---

## Seguridad

- Contraseñas cifradas con bcrypt.
- Autenticación mediante JWT.
- Middleware para verificar el token.
- Middleware para validar el rol de administrador.
---

# Base de datos

## 1. Crear la base de datos

```sql
CREATE DATABASE tienda_online CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tienda_online;
```

## 2. Crear las tablas

```sql
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  telefono VARCHAR(20) DEFAULT NULL,
  direccion VARCHAR(255) DEFAULT NULL,
  rol ENUM('cliente','admin') DEFAULT 'cliente',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT DEFAULT NULL,
  precio DECIMAL(10,2) NOT NULL,
  imagen VARCHAR(255) DEFAULT NULL,
  stock INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT DEFAULT NULL,
  total DECIMAL(10,2) DEFAULT NULL,
  estado ENUM(
      'Pendiente',
      'Aprobado',
      'Rechazado',
      'Enviado',
      'Entregado'
  ) DEFAULT 'Pendiente',
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE pedido_detalle (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT DEFAULT NULL,
  producto_id INT DEFAULT NULL,
  cantidad INT DEFAULT NULL,
  precio DECIMAL(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE pedidos
ADD KEY usuario_id(usuario_id);

ALTER TABLE pedido_detalle
ADD KEY pedido_id(pedido_id),
ADD KEY producto_id(producto_id);

ALTER TABLE pedidos
ADD CONSTRAINT pedidos_ibfk_1
FOREIGN KEY(usuario_id)
REFERENCES usuarios(id);

ALTER TABLE pedido_detalle
ADD CONSTRAINT pedido_detalle_ibfk_1
FOREIGN KEY(pedido_id)
REFERENCES pedidos(id);

ALTER TABLE pedido_detalle
ADD CONSTRAINT pedido_detalle_ibfk_2
FOREIGN KEY(producto_id)
REFERENCES productos(id);
```

---

## 3. Insertar datos de prueba

```sql
INSERT INTO productos
(id,nombre,descripcion,precio,imagen,stock)
VALUES

(10,
'cable inalambrico',
'24 pulgadas Full HD',
850000.00,
'https://teclado.pro/wp-content/uploads/2024/06/teclado-para-pc-2.jpg',
15),

(11,
'Monitor Samsung',
'Bluetooth Noise Cancelling',
250000.00,
'https://www.quietpc.com/images/products/logitech-b100-large.jpg',
12);

INSERT INTO usuarios
(id,nombre,email,password,telefono,direccion,rol,created_at)
VALUES

(
9,
'admin',
'admin@gmail.com',
'$2b$10$TVX/uDO7dmIiAfStt25cZeNT5UemJlQiNNB7XEtUJgFmDfKgQeBWC',
'3042035322',
'ddd',
'admin',
CURRENT_TIMESTAMP
),

(
10,
'cliente',
'cliente@gmail.com',
'$2b$10$PY/fBXD754NNiQYtTCs5p.i7Pxsz2TshGRdEKkMhn.vGTCtf8QpPO',
'3042035322',
'ddd',
'cliente',
CURRENT_TIMESTAMP
);

ALTER TABLE productos
AUTO_INCREMENT = 12;

ALTER TABLE usuarios
AUTO_INCREMENT = 11;
```

---

# Usuarios de prueba

Después de ejecutar el SQL podrás iniciar sesión con:

| Rol | Correo | Contraseña |
|------|---------|------------|
| Administrador | admin@gmail.com | **123** |
| Cliente | cliente@gmail.com | **123** |

> **Nota:** Las contraseñas almacenadas en la base de datos están cifradas con **bcrypt**. La contraseña real para ambos usuarios es **123**.

---

# Configuración del Backend

Entrar a la carpeta:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Crear (o reemplazar) el archivo `.env` dentro de la carpeta **backend**:

```env
PORT=3000
DB_HOST=localhost
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=tienda_online
JWT_SECRET=una_clave_secreta_fuerte
```

Iniciar el servidor:

```bash
npm run dev
```

Servidor:

```
http://localhost:3000
```

---

# Configuración del Frontend

Entrar a la carpeta:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar:

```bash
npm run dev
```

La aplicación quedará disponible en:

```
http://localhost:5173
```

---

# Endpoints principales

## Autenticación

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| POST | /auth/register | Registrar usuario |
| POST | /auth/login | Iniciar sesión |

---

## Productos

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| GET | /productos | Obtener productos |
| POST | /productos | Crear producto (Admin) |
| PUT | /productos/:id | Actualizar producto (Admin) |
| DELETE | /productos/:id | Eliminar producto (Admin) |

---

## Pedidos

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| POST | /pedidos | Crear pedido |
| GET | /pedidos | Obtener pedidos |
| PUT | /pedidos/:id | Cambiar estado (Admin) |
| GET | /pedidos/estadisticas | Dashboard (Admin) |

---

## Usuarios

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| GET | /usuarios | Listar usuarios (Admin) |
| PUT | /usuarios/:id/rol | Cambiar rol de usuario (Admin) |

---

# Tecnologías utilizadas

### Backend

- Node.js
- Express
- MySQL
- JWT
- bcrypt
- dotenv
- cors

### Frontend

- React
- React Router DOM
- Axios
- CSS

---

# Notas

- El token JWT se almacena en **localStorage**.
- Todas las peticiones protegidas utilizan el encabezado:

```http
Authorization: Bearer <token>
```

- Los usuarios de prueba ya están incluidos en el SQL.
- El administrador puede crear, editar y eliminar productos, gestionar pedidos y modificar los roles de los usuarios.