# Proyecto Gimnasio

Este repositorio contiene un backend en Go y un frontend en React. Ambos servicios se despliegan con Docker Compose.

## Prerrequisitos

- [Docker](https://docs.docker.com/get-docker/) y Docker Compose
- [Go](https://go.dev/) 1.24 o superior
- [Node.js](https://nodejs.org/) 18 o superior

## Configuración del archivo `.env`

Copie el archivo `example.env` a `.env` para usar la configuración por defecto.
Luego modifique las variables según sea necesario para que los contenedores puedan comunicarse.

```dotenv
# Cadena de conexión para MySQL utilizada por el backend
DB_DSN=root:clave123@tcp(mysql-gimnasio:3306)/gimnasio?charset=utf8mb4&parseTime=True&loc=Local

# URL en la que el frontend accede al backend
VITE_BACKEND_URL=http://localhost:8080
```

Ajuste los valores de las variables `DB_*` según su entorno en caso de ser necesario.
El contenedor de MySQL se expone en el puerto 3307 del host (`3307:3306`). Si necesita utilizar otro puerto, cambie el valor antes de los dos puntos en `docker-compose.yml`.

## Construcción y ejecución con Docker Compose

Ejecute el siguiente comando para compilar las imágenes y levantar los servicios:

```bash
docker-compose up --build
```

El backend quedará disponible en `http://localhost:8080` y el frontend en `http://localhost:3000`.

Para detener los contenedores utilice `docker-compose down`.

## Pruebas

Las verificaciones del backend se pueden ejecutar con:

```bash
go vet ./...
```

En el frontend los tests (si existen) se ejecutan con:

```bash
npm test
```

Si se ejecutan en un entorno sin conexión a Internet o sin las dependencias instaladas, estas pruebas podrían fallar o no iniciarse correctamente.
