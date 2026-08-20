# Frontend Standards - Tracking360

## Objetivo

Mantener interfaces consistentes, seguras y mantenibles para los modulos de cotizaciones, recetas, carga de items, usuarios, dashboard y exportaciones relacionadas.

## Stack y ubicacion

- JavaScript del proyecto: `js/`.
- CSS del proyecto: `css/`.
- Vistas PHP/HTML: raiz del proyecto y archivos de pantalla existentes.
- UI base: Bootstrap, Grid.js, Alertify y librerias ya incluidas.

## Reglas obligatorias

1. Todo JavaScript nuevo debe vivir en un archivo dedicado dentro de `js/`.
2. Todo CSS nuevo debe vivir en un archivo dedicado dentro de `css/`.
3. Las vistas no deben mezclar logica de negocio ni calculos extensos; deben delegar en JS o backend segun corresponda.
4. Los datos enviados desde PHP hacia JS deben exponerse con atributos `data-*` o endpoints JSON, no con bloques `<script>` inline.
5. Toda restriccion critica de negocio debe validarse tambien en backend.

## Formularios y validacion

- Validar entradas antes de enviar al backend: cantidades, tipo de cambio, margenes, fechas y campos obligatorios.
- Normalizar numeros ingresados por usuario aceptando coma o punto solo cuando el flujo existente lo haga.
- Mostrar errores claros al usuario, sin exponer trazas ni detalles internos.
- Deshabilitar botones mientras una operacion asincrona esta en curso para evitar doble envio.

## Fetch y endpoints AJAX

- Consumir controladores en `controller/` mediante `fetch` o patrones ya existentes.
- Esperar respuestas JSON consistentes con banderas como `ok` o `success` y `message`.
- Manejar errores de red, respuestas no validas y sesiones expiradas.
- No confiar en validaciones del frontend para seguridad; el backend decide autorizacion, estado y persistencia.
