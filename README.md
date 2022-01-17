# MDB-Things

docker-compose up -d
docker exec -it mdbase mongosh

## Base de datos
- Contenedor físico de colecciones
- Cada base de datos tiene su archivo propio en el sistema de archivos
- un clúster puede tener múltiples BDs

## Conexión
- para cliente web --> http://localhost:3000 
- para gestor --> mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000

## Colecciones
- Agrupación de documentos
- Equivalente a una tabla 
- No impone un esquema (estructura "rigida")

## Documentos
- Un registro dentro de una colección
- Es parecido a un JSON, es un BSON (codificación binaria de documentos JSON)
- es la únidad básica de MongoDB

## Básicos
ver bases de datos
```show dbs```

ver collections
```show collections```

ver comandos para una colección
```db.{collection}.help()```

crear base de datos. Dato: MongoDB no crea bases de datos vacías
```use tuit-db```

## Crud: Insertar
insertar documento
```
db.message.insertOne({
    text: "Hola, esto es una prueba",
    user: {
        id: 9,
        name: "Juan"
    },
    tags: ["test"],
    views_count: 210,
    favorite_count: 12,
    source: "web",
    ip_origin: "127.0.0.1",
    created_at: "Sun Jan 16 2022 20:20:14 GMT-0300 (Argentina Standard Time)"
})
```
dato: se puede ingresar un _id, pero es mejor que mongodb los genere para evitar error por duplicados

Insert múltiples documentos
```
db.message.insertMany([
    {
        "text": "Prueba 3",
        "user": {
            "id": 9,
            "name": "Juan"
        },
        "tags": [
            "test"
        ],
        "views_count": 312,
        "favorite_count": 2,
        "source": "mobile",
        "ip_origin": "127.0.0.1",
        "created_at": "Sun Jan 16 2022 20:36:31 GMT-0300 (Argentina Standard Time)"
    },
    {
        "text": "Prueba 4",
        "user": {
            "id": 9,
            "name": "Juan"
        },
        "tags": [
            "test"
        ],
        "views_count": 3,
        "favorite_count": 2,
        "source": "mobile",
        "ip_origin": "127.0.0.1",
        "created_at": "Sun Jan 16 2022 20:36:31 GMT-0300 (Argentina Standard Time)"
    },
    {
        "text": "Prueba 5",
        "user": {
            "id": 9,
            "name": "Juan"
        },
        "tags": [
            "test"
        ],
        "views_count": 54,
        "favorite_count": 1,
        "source": "mobile",
        "ip_origin": "127.0.0.1",
        "created_at": "Sun Jan 16 2022 20:36:31 GMT-0300 (Argentina Standard Time)"
    }
])
```

## CRUD: Consultar
Traer uno
```db.message.findOne()```
Traer uno con filtro
```db.message.findOne({_id: ObjectId("61e4aa74caebd6cf158ffeb3")})```

Traer todos
```db.message.find()```

Filtrar por un campo
```db.message.find({source:"web"})```

Filtrar por campos con AND 
```db.message.find({source:"web", favorite_count: 12})```

Filtrar por campos con AND y operador
```db.message.find({source:"web", favorite_count: {$lte: 75}})```

Filtrar por un campo, traer cantidad de resultados
```db.message.find({source:"web"}).count()```

## Crud: Actualizar
Actualizar:
```
db.message.updateOne(
    {_id: ObjectId("61e4ac91caebd6cf158ffeb6")},
    {
        $set: {favorite_count: 2}
    })
```
Del mismo modo también se puede usar con el updateMany (para múltiples documentos)

## Crud: Eliminar
Eliminar
```
db.message.deleteOne(
    {_id: ObjectId("61e4ac91caebd6cf158ffeb6")})
```
Del mismo modo también se puede usar con el deleteMany (para múltiples documentos)
Para este caso, al no tener filtro, elimina a todos
```
db.message.deleteMany({})
```