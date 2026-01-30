# Takent API Rest

> [!IMPORTANT]
> **Justificación de las tecnologías seleccionadas**
> Según el punto 1.2 de las especificaciones, "**el diseño será abierto de forma que el alumno tome sus propias decisiones**". Bajo esta premisa, he seleccionado **NestJS** y **Prisma** por los siguientes motivos:
> - **Evolución del Ciclo:** Es una progresión profesional de **Node.js y JavaScript** (tecnologías vistas en el ciclo). El uso de **TypeScript** añade el tipado estático necesario para cumplir con el criterio de "**código bien estructurado y buenas prácticas**" (25% de la nota).
> - **Integridad de Datos:** Como evolución de los ORM vistos (como Eloquent), **Prisma** es un ORM (tecnologia vista en el ciclo) que garantiza la "**persistencia de datos asegurando la integridad y consistencia**" exigida en el apartado 1.3.
> - **Sostenibilidad:** Este stack permite aplicar los principios de "**optimización del consumo de CPU y memoria**", asegurando un software mantenible y duradero.

## Dependencias
* **Framework:** NestJS (Node.js)
* **ORM:** Prisma
* **Package Manager:** pnpm
* **Runtime:** Docker

## Configuración e instalación de NestJS y Prisma ORM
La instalación de nestjs y prisma y su respectiva configuración no tiene ninguna complicación, simplemente es seguir los pasos que nos indica la documentación oficial.

> [!TIP]
> **Documentación oficial:** [https://www.prisma.io/docs/guides/nestjs](https://www.prisma.io/docs/guides/nestjs)

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
# Generar un recurso completo (Modulo, Service, Controller, Entity)
pnpm exec nest g res <nombre-del-recurso> --no-spec
```

> [!NOTE] 
> Se ha incluido el flag --no-spec para evitar la generación de archivos de test en esta etapa inicial para mantener el espacio de trabajo más limpio mientras se define la arquitectura de los datos.