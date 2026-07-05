# TiendaOnline

Proyecto de tienda online con backend en Node.js/Express y frontend en React + Vite.

///////////////REEMPLAZA EL ARCHIVO .env 
## Requisitos

- Node.js 18+ instalado
- npm instalado
- MySQL/MariaDB

## Base de datos

1. Conecta a MySQL.(o xampp con phpmyadmin)
2. Crea la base de datos:

```sql
CREATE DATABASE tienda_online CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tienda_online;
```

3. Crea las tablas necesarias:

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
  stock INT(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT(11) DEFAULT NULL,
  total DECIMAL(10,2) DEFAULT NULL,
  estado ENUM('Pendiente','Aprobado','Rechazado','Enviado','Entregado') DEFAULT 'Pendiente',
  fecha TIMESTAMP NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE pedido_detalle (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT(11) DEFAULT NULL,
  producto_id INT(11) DEFAULT NULL,
  cantidad INT(11) DEFAULT NULL,
  precio DECIMAL(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE pedidos
  ADD KEY usuario_id (usuario_id);

ALTER TABLE pedido_detalle
  ADD KEY pedido_id (pedido_id),
  ADD KEY producto_id (producto_id);

ALTER TABLE pedidos
  ADD CONSTRAINT pedidos_ibfk_1 FOREIGN KEY (usuario_id) REFERENCES usuarios(id);

ALTER TABLE pedido_detalle
  ADD CONSTRAINT pedido_detalle_ibfk_1 FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
  ADD CONSTRAINT pedido_detalle_ibfk_2 FOREIGN KEY (producto_id) REFERENCES productos(id);
```

## Configuración del backend

1. Abre una terminal en `backend/`.
2. Instala dependencias:

```bash
cd backend
npm install
```

3. Crea un archivo `.env` con estos valores:

```env
PORT=3000
DB_HOST=localhost
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=tienda_online
JWT_SECRET=una_clave_secreta_fuerte
```

4. Inicia el servidor:

```bash
npm run dev
```

> El backend quedará disponible en `http://localhost:3000`.

## Configuración del frontend

1. Abre otra terminal en `frontend/`.
2. Instala dependencias:

```bash
cd frontend
npm install
```

3. Inicia la aplicación React:

```bash
npm run dev
```

> El frontend usará `http://localhost:3000` como base para la API.

## Endpoints principales

### Autenticación

- `POST /auth/register` — registrar usuario
- `POST /auth/login` — iniciar sesión

### Productos

- `GET /productos` — listar productos
- `POST /productos` — crear producto
- `PUT /productos/:id` — actualizar producto (requiere token + admin)
- `DELETE /productos/:id` — eliminar producto (requiere token + admin)

### Pedidos

- `POST /pedidos` — crear pedido (requiere token)
- `GET /pedidos` — obtener pedidos del usuario o todos si es admin
- `PUT /pedidos/:id` — actualizar estado (requiere admin)
- `GET /pedidos/estadisticas` — estadísticas de pedidos (requiere admin)

## Notas

- El frontend guarda el token de usuario en `localStorage` y lo envía en el header `Authorization: Bearer <token>`.
- Si actualizas credenciales de MySQL, ajusta el archivo `.env` del backend.
