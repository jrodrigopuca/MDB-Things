# MDB-Things
## Instrucciones
```
docker-compose up -d
docker exec -it mdbase mongosh
```

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
- no puede ser mayor a 16MB

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

## Tipos de datos
```
String      "Texto"
Boolean     True/False
ObjectId    ObjectId("23de..")
Date        ISODate("2022-01-19..")

Number 
    - Double
    - Int32/Int64
    - Decimal
```

## Documentos embebidos
Los documentos pueden tener dentro sub-documentos, ejemplo:
En este caso "user" es un documento dentro del documento principal
```
    {
        "text": "Prueba 5",
        "user": {
            "id": 9,
            "name": "Juan"
        },..
    }
```

## Esquemas
Los esquemas son la forma en la que organizamos los documentos dentro de una colección
- No se impone ningún esquema
- es flexible para agregar campos

Relaciones:
- uno a uno: documentos embebidos
```
    // libro - autor
    {
        _id:988,
        title: 'Libro 1'
        author: {
            name: 'Juan'
        }
    }
```
- uno a muchos: usar referencias como array
```
    // editorial - libros
    {
        _id:899089879,
        name: 'e1'
        libro: ['321e','323d']
    }
```
- muchos a uno: usar referencias en campo. 
```
    // libros - editorial
    {
        _id:988,
        title: 'Libro 1'

        editorial_id: 'e1'
    }
```

## Filtros (Filter)
```
{campo: {filtro: valor}}

// ejemplo: 
db.message.find({source:"web"})

// ejemplo usando el operador $in: 
db.message.find({source:{$in:["web"]}})
```

## Proyecciones (Project)
Permiten traer solamente algunos campos no todo el documento. Con 1 se muestra, con 0 no se muestra (solo para _id)
```
// traer todos los elementos que tengan a web como source
// y solamente mostrar los campos text, views_count
// y sin mostrar id
db.message.find({source:"web"}, {text:1, views_count:1, _id:0})
```

# Operadores
MongoDB provee múltiples operadores para trabajar con datos.
[Lista completa](https://docs.mongodb.com/manual/reference/operator/)

## Operadores de comparación
```
$eq     =   equal
$gt     >   greater than
$gte    >=  greater than or equal
$lt     <   lower than
$lte    >=  lower than or equal
$ne     !=  not equal
$in         include (valores dentro de un array)
$nin        not include (valores no encontrados dentro de un array)
```

## Operadores lógicos
```
$and        Y lógico
$not        Negado lógico
$nor        O Negado lógico
$or         O lógico
```

## Operadores por elemento
```
$exist      Documentos que tienen un campo en específico
$type       Documentos que cuentan con un tipo específico
```

## Operadores para arrays
```
$all        Documentos que contengan todos los elementos de la query
$elemMatch  Documentos que cumplan con la condición $elemMatch en uno de sus elementos
$size       Documentos que contienen un campo array de un tamaño en específico
```

## Operadores para relacionar elementos
https://docs.mongodb.com/manual/reference/operator/update/addToSet/

https://platzi.com/clases/1533-mongodb/18555-usando-operadores-para-realizar-updates-en-arreglo/
```
db.message.updateOne({_id: ObjectId("61e4aa74caebd6cf158ffeb3")}, {$addToSet:{tags: "nuevo"}})

db.message.updateOne(
    {'_id': ObjectId('61e4aa74caebd6cf158ffeb3')}, 
    {'$pull':{'tags': 'test'}}
)
```