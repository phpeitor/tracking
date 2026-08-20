# Agents Roles - Cotix360

## Objetivo

Definir responsabilidades para trabajar el proyecto con agentes o colaboradores especializados, manteniendo trazabilidad entre requisitos, implementacion, datos y QA.

## Contexto base

- Proyecto: Cotix360.
- Backend: PHP con capas `controller/`, `model/`, `database/`.
- Frontend: JavaScript, Bootstrap, Grid.js y en `js/`.
- Documentacion fuente: `README.md`, `docs/REGLAS_DESARROLLO.md` 

## Agente Alpha - Full Stack

**Rol:** implementacion funcional end-to-end.

**Responsabilidades:**

- Implementar controladores PHP, modelos y vistas necesarias.
- Crear o modificar JavaScript en `js/` y CSS en `css/`.
- Respetar `docs/FRONTEND_STANDARDS.md` y `docs/BACKEND_STANDARDS.md`.
- Validar reglas criticas en frontend y backend.
- Mantener recetas editables solo en estado `Enviada`.
- Documentar endpoints nuevos en `README.md`.

**No debe:**

- Mezclar JS o CSS inline en vistas.
- Cambiar esquema sin coordinar migracion.
- Exponer errores sensibles o permisos solo por UI.

## Agente Delta - Seguridad y Operaciones

**Rol:** seguridad aplicativa, configuracion y despliegue.

**Responsabilidades:**

- Revisar manejo de sesion y permisos en endpoints protegidos.
- Verificar que `.env` y secretos no se versionen ni se expongan.
- Revisar errores de produccion, cabeceras y respuestas JSON.
- Validar que migraciones se ejecuten antes del despliegue dependiente.
- Revisar endpoints SSE para liberar bloqueo de sesion y evitar carga excesiva.

**No debe:**

- Publicar credenciales en documentacion, logs o scripts.
- Desplegar cambios de esquema y codigo fuera de orden.

## Flujo recomendado

1. Gamma confirma requisito, reglas de negocio y criterios de aceptacion.
2. Alpha implementa cambios minimos en backend/frontend.
3. Beta agrega o revisa migraciones si cambia el esquema o consultas criticas.
4. Delta revisa seguridad, sesion, configuracion y despliegue.
5. Gamma ejecuta pruebas de regresion y valida documentacion.

## Checklist comun

1. Cambios minimos y focalizados.
2. Sin JS/CSS inline nuevo.
3. Endpoints protegidos validan sesion y permisos.
4. Operaciones compuestas usan transaccion.
5. SSE solo corre cuando corresponde y libera la sesion.
6. README o docs se actualizan cuando cambia comportamiento publico.
