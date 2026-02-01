<div align="center">
<h1>Takent API Rest</h1>

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-000000?style=for-the-badge&logo=Prisma&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-blue?style=for-the-badge&logo=docker&logoColor=white)
![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

</div>

> [!IMPORTANT]
> **Justificación de las tecnologías seleccionadas**
> Según el punto 1.2 de las especificaciones, "**el diseño será abierto de forma que el alumno tome sus propias decisiones**". Bajo esta premisa, he seleccionado **NestJS** y **Prisma** por los siguientes motivos:
> - **Evolución del Ciclo:** Es una progresión profesional de **Node.js y JavaScript** (tecnologías vistas en el ciclo). El uso de **TypeScript** añade el tipado estático necesario para cumplir con el criterio de "**código bien estructurado y buenas prácticas**" (25% de la nota).
> - **Integridad de Datos:** Como evolución de los ORM vistos (como Eloquent), **Prisma** es un ORM (tecnologia vista en el ciclo) que garantiza la "**persistencia de datos asegurando la integridad y consistencia**" exigida en el apartado 1.3.
> - **Sostenibilidad:** Este stack permite aplicar los principios de "**optimización del consumo de CPU y memoria**", asegurando un software mantenible y duradero.

## Dependencias
Estas son las librerías principales divididas por su función en el ecosistema:

| Categoría | Paquete | Propósito | Comando de Instalación |
| :--- | :--- | :--- | :--- |
| **Framework** | `NestJS` | Núcleo del framework (Node.js) | `pnpm add -g @nestjs/cli` |
| **Base de Datos** | `Prisma` | ORM para modelado y migraciones | `pnpm add -D prisma` |
| **Cliente DB** | `@prisma/client` | Cliente Type-safe para consultas | `pnpm add @prisma/client` |
| **Driver Neon** | `@prisma/adapter-neon` | Driver para PostgreSQL y adaptador | `pnpm add @prisma/adapter-neon` |
| **Validación** | `class-validator` | Validación de DTOs con decoradores | `pnpm add class-validator` |
| **Transformación**| `class-transformer`| Mapeo de objetos y tipos de datos | `pnpm add class-transformer` |
| **Entorno** | `dotenv` | Carga de variables de entorno | `pnpm add dotenv` |
| **Documentación** | `@nestjs/swagger` | Interfaz interactiva OpenAPI | `pnpm add @nestjs/swagger` |

### Guía de instalación rápida

Para instalar todas las dependencias necesarias de una sola vez:

```bash
# Dependencias de producción
pnpm add @nestjs/swagger @prisma/client class-validator class-transformer @prisma/adapter-neon dotenv

# Dependencias de desarrollo
pnpm add -D prisma
```

## Configuración e instalación de NestJS y Prisma ORM
La instalación de nestjs y prisma y su respectiva configuración no tiene ninguna complicación, simplemente es seguir los pasos que nos indica la documentación oficial.

> [!TIP]
> **Documentación Prisma:** [https://www.prisma.io/docs/guides/nestjs](https://www.prisma.io/docs/guides/nestjs)
> **Documentación Neon:** [https://neon.com/docs/guides/prisma#use-the-neon-serverless-driver-with-prisma](https://neon.com/docs/guides/prisma#use-the-neon-serverless-driver-with-prisma)

---
## Dockerización de la app
Esto se hace principalmente para eliminar el mítico ***“En mi máquina funciona”***, para mejorar la portabilidad y el incremento de la compatibilidad en otros entornos.

### El archivo Dockerfile
Creamos en el fichero raíz del proyecto un archivo `dockerfile` el cual dividiremos por etapas una de compilación y otra de ejecución siguiendo el estándar Multi-Stage ocasionando así una reducción significante del tamaño de nuestra imagen.

> [!IMPORTANT]
> **¿Que he conseguido solo con 3 sencillos pasos?**
> He evitado crear un dockerfile genérico y de principiantes por uno que implementa principios de seguridad y profesionalismo:
> - **Seguridad:** La API no tiene permisos para romper el contenedor ni acceder a archivos del host.
> - **Profesionalismo:** Uso estándares de la industria como el Multi-stage.

### Optimización con .dockerignore
He configurado un archivo `.dockerignore` para excluir archivos innecesarios durante el proceso de construcción de la imagen. Esto no solo acelera la subida del contexto a Docker, sino que evita conflictos con dependencias locales y protege archivos sensibles.

> [!IMPORTANT]
> **¿Qué archivos estamos ignorando?**
> - Carpetas de dependencias locales (`node_modules`).
> - Archivos de variables de entorno con credenciales reales (`.env`).
> - Carpetas de compilación local (`dist`, `out`).
> - Logs y archivos temporales del sistema.

### ¿Por qué esta imagen `24-bookworm-slim`?
- **Compatibilidad:** Al basarse en Debian (`glibc`), evita errores comunes de compatibilidad que suelen ocurrir en Alpine con librerías nativas de Node.js (como `bcrypt`, `sharp` o `prisma`).
- **Equilibrio de Peso:** La variante `slim` reduce drásticamente el tamaño de la imagen al eliminar herramientas de compilación innecesarias, manteniendo solo lo esencial para la ejecución.
- **Estabilidad y Seguridad:** Utiliza `bookworm` (Debian 12), con parches de seguridad actualizados para entornos de producción exigentes.

> [!NOTE]
> **Recursos de interés:**
> - [Dockerfile Reference](https://docs.docker.com/reference/dockerfile/)
> - [Imágenes oficiales de Node](https://hub.docker.com/_/node)

### El archivo compose.yaml
Para facilitar la orquestación del contenedor y la configuración de variables de entorno, decidí utilizar **Docker Compose** y crear un archivo `compose.yaml` que permite:
- Construir la imagen de forma controlada.
- Definir puertos de forma explícita.
- Centralizar la configuración de variables de entorno mediante un archivo `.env`.
- Garantizar reinicio automático del servicio en caso de fallo.

Este enfoque simplifica tanto el desarrollo local como futuros despliegues en servidores.

> [!TIP]
> **Referencia de Docker Compose:** [https://docs.docker.com/reference/compose-file/services/](https://docs.docker.com/reference/compose-file/services/)

Construimos la imagen y levantamos la app de la siguiente forma:

```bash
docker compose up --build
```

### Estructura basica de la App
En esta fase he definido el esqueleto de la API basándome en el diagrama Entidad-Relación. He organizado la aplicación en módulos independientes para que el código sea limpio y fácil de escalar. Cada módulo agrupa su propia lógica, rutas y conexión a la base de datos.

Para generar cada uno de estos recursos (carpetas, controladores, servicios y entidades), he utilizado el CLI de NestJS con el siguiente comando:

```bash
# Generar un recurso completo (Modulo, Service, Controller, Entity) sin los tests
pnpx nest g res <nombre-del-recurso> --no-spec
```

> [!NOTE] 
> Se ha incluido el flag --no-spec para evitar la generación de archivos de test en esta etapa inicial para mantener el espacio de trabajo más limpio mientras se define la arquitectura de los datos.