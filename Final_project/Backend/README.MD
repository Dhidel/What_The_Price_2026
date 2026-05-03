

# WTP Models Backend

API REST para What The Price

## Instalación
1. Clonar el repositorio
2. Instalar dependencias:
   npm install
3. Crear archivo .env con:
   
   MONGO_URI=tu_uri_de_mongodb
   PORT=3000
4. Correr el servidor:
   npm run dev


## Endpoints

### Products model (manejo de productos en plataforma)

### GET /api/products
Obtiene todos los productos.

Respuesta (ejemplo):
json
[
  {
    "_id": "69f67cdd49ab5adfb66c5751",
    "name": "Arroz Diana 1lb",
    "category": "Granos",
    "prices": [
      {
        "store": "Walmart",
        "price": 12.50
      }
    ]
  }
]


### POST /api/products
Crear un producto nuevo.

Agregar en el Body como un json:
{
  "name": "Arroz Diana 1lb",
  "category": "Granos",
  "prices": [
    {
      "store": "Walmart",
      "price": 12.50
    }
  ]
}


### PATCH /api/products/:id
Actualizar un producto por su ID.

Agregar en el Body como un json:**

{
  "name": "Arroz Diana 2lb"
}


### DELETE /api/products/:id
Eliminar un producto por su ID.

Respuesta (como un json):
{
  "message": "Producto eliminado"
}

### Endpoints Backends de users


## Instalación
1. Clonar el repositorio
2. Instalar dependencias:
   `npm install`
3. Crear archivo .env con:
   
   `PORT=3004`
4. Correr el servidor:
   `npm run dev` o `node index.js`


## Endpoints

### Users model (manejo de usuarios en plataforma)

### GET /users
Obtiene todos los usuarios registrados.

Respuesta (ejemplo):
```json
[
  {
    "id": 1,
    "name": "Dhidel Osorio",
    "plan": "plus",
    "contrasena": "101010"
  }
]
```

### GET /users/:id
Obtiene la información de un usuario específico por su ID, incluyendo el nombre legible del plan.

Respuesta (ejemplo):
```json
{
  "id": 1,
  "name": "Dhidel Osorio",
  "plan": "plus",
  "contrasena": "101010",
  "planName": "Plan Plus"
}
```

### POST /users
Crear un usuario nuevo.

Agregar en el Body como un json:
```json
{
  "name": "Nuevo Usuario",
  "plan": "plus",
  "contrasena": "password123"
}
```

### POST /login
Validar credenciales de acceso.

Agregar en el Body como un json:
```json
{
  "name": "Dhidel Osorio",
  "contrasena": "101010"
}
```

### PATCH /users/:id
Actualizar la información de un usuario por su ID.

Agregar en el Body como un json:
```json
{
  "name": "Nombre Actualizado",
  "plan": "basic"
}
```

### DELETE /users/:id
Eliminar un usuario por su ID.

Respuesta (ejemplo):
```json
{
  "message": "Usuario eliminado",
  "user": {
    "id": 1,
    "name": "Dhidel Osorio"
  }
}
```
```