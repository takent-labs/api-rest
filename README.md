# Takent API Rest

## Desarrollo técnico

### Configuración e instalación de NestJS y Prisma ORM
La instalación de nestjs y prisma y su respectiva configuración no tiene ninguna complicación, simplemente es seguir los pasos que nos indica la documentación oficial de nestjs y prisma.

> **Documentación → https://www.prisma.io/docs/guides/nestjs**

### Dockerización de la app

Esto se hace principalmente para eliminar el mítico ***“En mi máquina funciona”***, para mejorar la portabilidad y el incremento de la compatibilidad en otros entornos.

### El archivo Dockerfile

Creamos en el fichero raíz del proyecto un archivo `dockerfile` el cual dividiremos por etapas una de compilación y otra de ejecución siguiendo el estándar Multi-Stage  ocasionando así una reducción significante del tamaño de nuestra imagen.

### ¿Que he conseguido solo con 3 sencillos pasos?

He evitado crear un dockerfile genérico y de principiantes por uno que implementa principios de seguridad y profesionalismo:

- **Seguridad:** La API no tiene permisos para romper el contenedor ni acceder a archivos del host.
- **Profesionalismo:** Uso estándares de la industria como el Multi-stage.

### ¿Por qué esta imagen `24-bookworm-slim` ?

- **Compatibilidad:** Al basarse en Debian (`glibc`), evita errores comunes de compatibilidad que suelen ocurrir en Alpine con librerías nativas de Node.js (como `bcrypt`, `sharp` o `prisma`).
- **Equilibrio de Peso:** La variante `slim` reduce drásticamente el tamaño de la imagen al eliminar herramientas de compilación innecesarias, manteniendo solo lo esencial para la ejecución.
- **Estabilidad y Seguridad:** Utiliza `bookworm` (Debian 12),con parches de seguridad actualizados para entornos de producción exigentes.

> **Dockerfile → https://docs.docker.com/reference/dockerfile/**
>
> **Imágenes de Node → https://hub.docker.com/_/node**

### El archivo compose.yaml

Para facilitar la orquestación del contenedor y la configuración de variables de entorno, decidí utilizar **Docker Compose y crear** un archivo `compose.yaml` que permite:

- Construir la imagen de forma controlada.
- Definir puertos de forma explícita.
- Centralizar la configuración de variables de entorno mediante un archivo .env
- Garantizar reinicio automático del servicio en caso de fallo.

Este enfoque simplifica tanto el desarrollo local como futuros despliegues en servidores.

> **Docker compose → https://docs.docker.com/reference/compose-file/services/**
> 

Construimos la imagen y levantamos la app de la siguiente forma:

```bash
docker compose up --build
```

### Estructura de carpetas y recursos iniciales de la API
Generar los recursos básicos

``` typescript

```