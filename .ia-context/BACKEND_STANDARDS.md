# Backend Standards - Tracking360

## Objetivo

Mantener controladores, modelos y calculos comerciales consistentes, seguros y faciles de mantener en la aplicacion PHP.

## Stack y capas

- Lenguaje: PHP 8.1 o superior.
- Base de datos: MySQL mediante PDO.
- Configuracion y variables de entorno: `config/` y `.env`.

## Separacion de responsabilidades

- Los controladores validan metodo HTTP, sesion, autorizacion, payload y formato de respuesta.
- Los modelos concentran consultas, transacciones y reglas de negocio persistentes.
- Las vistas no deben ejecutar logica de negocio.
- Los calculos compartidos deben centralizarse en clases existentes, por ejemplo `model/calc_cotizacion.php`.

## Respuestas JSON

- Todo endpoint AJAX debe responder `Content-Type: application/json; charset=utf-8`.
- Usar una estructura consistente con `ok` o `success` y `message` cuando haya error.
- Responder con codigos HTTP adecuados: `405` para metodo invalido, `401` o mensaje equivalente para sesion expirada, `500` solo para fallas inesperadas.
- No exponer trazas, SQL ni credenciales en respuestas de produccion.

## Sesion y permisos

- Validar sesion al inicio de endpoints protegidos usando `session_id` de la sesion del proyecto.
- Validar `session_cargo` cuando el flujo dependa del rol.
- Para `session_cargo === 4` (Tecnico), impedir acceso backend a precios y totales sensibles cuando afecte seguridad o calculo.
- No confiar en campos enviados por frontend para usuario, cargo, estado o permisos.

## Archivos y exportaciones

- Validar cabeceras y estructura de archivos Excel antes de procesar carga masiva.
- No confiar en nombres de archivo enviados por usuario.
- Para PDFs con Dompdf, mantener calculos y permisos consistentes con la UI.

## Checklist antes de cerrar

1. El endpoint valida sesion, metodo HTTP y payload.
2. Las consultas usan PDO preparado.
3. Las operaciones compuestas usan transaccion.
4. Las respuestas JSON son consistentes.
5. Las reglas criticas estan validadas tambien en backend.
6. Si se agrego endpoint nuevo, se documento en `README.md`.
7. Si se modifico tiempo real, se documento el comportamiento y rendimiento.
