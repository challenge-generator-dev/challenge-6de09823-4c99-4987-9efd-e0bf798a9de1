# Implementación de operaciones CRUD de ordenes en DynamoDB

El sistema permite a los usuarios de la interfaz de usuario gestionar órdenes en una base de datos DynamoDB. Los usuarios pueden crear, leer, actualizar y eliminar órdenes. Cada orden tiene un identificador único, un estado, y detalles del producto. El sistema debe asegurar la integridad de los datos y manejar correctamente los errores de validación y las excepciones de la base de datos.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Persistir ordenes en DynamoDB desde la interfaz |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Crear y leer órdenes

**Objetivo:** Implementar la funcionalidad para crear y leer órdenes en DynamoDB.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Define el modelo de datos para las órdenes en DynamoDB.
- Implementa la funcionalidad para crear una nueva orden y leer una orden existente.
- Asegura que las órdenes creadas tengan un identificador único y que los detalles del producto sean correctos.

**Entregable:** Interfaz de usuario que permite crear y leer órdenes en DynamoDB.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo manejar los errores de validación al crear una orden.
- Piensa en cómo asegurar la unicidad del identificador de la orden.

</details>

### Fase 2: Actualizar y eliminar órdenes

**Objetivo:** Implementar la funcionalidad para actualizar y eliminar órdenes en DynamoDB.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementa la funcionalidad para actualizar los detalles de una orden existente.
- Implementa la funcionalidad para eliminar una orden.
- Asegura que las actualizaciones y eliminaciones se realicen de manera idempotente y consistente.

**Entregable:** Interfaz de usuario que permite actualizar y eliminar órdenes en DynamoDB.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo manejar los casos en los que una orden no existe al intentar actualizarla o eliminarla.
- Piensa en cómo asegurar la consistencia de los datos al actualizar o eliminar una orden.

</details>

### Fase 3: Versionar la infraestructura

**Objetivo:** Versionar la infraestructura de DynamoDB usando Terraform.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Configura Terraform para versionar la infraestructura de DynamoDB.
- Asegura que la configuración de Terraform permita desplegar y actualizar la infraestructura de manera idempotente.
- Documenta el proceso de versionado y despliegue de la infraestructura.

**Entregable:** Configuración de Terraform para versionar la infraestructura de DynamoDB y documentación del proceso de despliegue.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo manejar las dependencias y los recursos en Terraform.
- Piensa en cómo asegurar que el despliegue de la infraestructura sea idempotente.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son las operaciones CRUD y cómo se aplican en este contexto?
- **paraQueSirve**: ¿Para qué sirven las operaciones CRUD en la gestión de órdenes?
- **comoSeUsa**: ¿Cómo se implementan las operaciones CRUD en DynamoDB desde la interfaz?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar operaciones CRUD en DynamoDB y cómo se manejan?
- **queDecisionesImplica**: ¿Qué decisiones implica el versionado de la infraestructura con Terraform?

## Criterios de Evaluacion

- Implementación correcta de la funcionalidad para crear y leer órdenes en DynamoDB.
- Implementación correcta de la funcionalidad para actualizar y eliminar órdenes en DynamoDB.
- Configuración correcta de Terraform para versionar la infraestructura de DynamoDB.
- Documentación clara y completa del proceso de despliegue de la infraestructura.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB |
| `client` | `client/` | chapter, support | client | React | React |
| `infra` | `infra/` | support | infra | Terraform (AWS) | Terraform |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate` — componente `infra` (support).
3. `cd api && npm install && npm run build` — componente `api` (practice).
4. `cd client && npm install && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /orders`
  - `GET /orders/:id`
  - `PUT /orders/:id`
  - `DELETE /orders/:id`

## Herramientas

- **Terraform**: Herramienta de trabajo del candidato: usala en la fase donde se depura o se prueba la solucion (no es una dependencia del proyecto).

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
