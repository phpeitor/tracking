# Tracking360

[![forthebadge](https://forthebadge.com/badges/uses-css.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/badges/built-with-love.svg)](https://www.linkedin.com/in/drphp/)

<a href="https://www.instagram.com/amvsoft.tech/" target="_blank">
  <img src="https://on3-step.com/cargonz/demo/track.png" alt="Instagram" width="600">
</a>

## Descripción

Aplicación frontend para el seguimiento de proyectos de ingeniería. Permite consultar el estado de un proyecto mediante su código de tracking y visualizar el avance a través de 5 fases: **Inicio**, **Planificación**, **Fabricación**, **Instalación / Entrega** y **Cierre**.

- Consulta vía API REST contra el backend de `cotix`.
- Renderiza una línea de tiempo agrupada por fase con actividades, fechas y observaciones.
- Código público formateado como `MGI-G-2026-{cod_publico}`.
- AlertifyJS para notificaciones (éxito/error).
- Botón de impresión con estilos `@media print` optimizados (solo muestra datos del tracking).

## Arquitectura

```
tracking/
├── config/
│   └── config-js.php        # Endpoint PHP que expone variables de entorno al frontend (JSON)
├── css/
│   └── cargo-theme.css      # Estilos del proyecto (tema + tracking + print)
├── img/
│   └── main.mp4             # Video de fondo del header
├── js/
│   ├── main.js              # Lógica principal: form, API, timeline, Alertify
│   ├── jquery.min.js        # jQuery 3.7.1 (local)
│   └── plugins.js           # Bootstrap 5.3.3 + Popper
├── .env                     # Variables de entorno (no versionado)
├── .env.example             # Template de variables de entorno
├── .gitignore
├── index.html               # Landing page principal
└── README.md
```

## Configuración

### 1. Variables de entorno

Copia `.env.example` a `.env` y ajusta la URL del API:

```bash
cp .env.example .env
```

| Variable              | Descripción                          | Ejemplo                                              |
|-----------------------|--------------------------------------|------------------------------------------------------|
| `TRACKING_API_URL`    | URL del endpoint de tracking         | `http://127.0.0.1/cotix/controller/tracking/api_tracking.php` |
| `API_DNI_URL`         | API de consulta de DNI               | `https://api/v1/dni?numero=`                         |
| `API_RUC_URL`         | API de consulta de RUC               | `https://api/v1/ruc?numero=`                         |
| `IP_API_URL`          | Servicio de IP pública               | `https://api.ipify.org`                              |
| `SUNAT_TIPO_CAMBIO_URL` | API tipo de cambio SUNAT           | `https://api/v1/tipo-cambio-sunat`                   |

> El parser de `.env` es un Custom parser en `config/config-js.php`. No soporta `parse_ini_file` porque no maneja comentarios con `#`. Si agregas dependencias de Composer, reconsiderar migrar a `vlucas/phpdotenv`.

### 2. Servidor web

Requiere Apache con PHP habilitado. El proyecto está pensado para correr bajo `http://127.0.0.1/tracking/`.

```bash
sudo systemctl start apache2
```

### 3. Backend (API)

El frontend consume el endpoint definido en `TRACKING_API_URL`. Se espera una respuesta JSON con la siguiente estructura:

```json
{
  "ok": true,
  "data": {
    "id": 1,
    "nombre": "Proyecto X",
    "razon_social_empresa": "Empresa S.A.",
    "ruc": "20602351671",
    "cod_tracking": "MGI-G-2026-1731539562",
    "cod_publico": "1731539562",
    "created_at": "2026-08-01",
    "updated_at": "2026-08-15",
    "actividades": [
      {
        "id": 1,
        "fase": "Inicio",
        "actividad": "Inicio de Proyecto",
        "fecha": "2026-08-11",
        "observacion": "Iniciamos el proyecto de ingeniería"
      }
    ]
  }
}
```

El código de tracking se compone como `MGI-G-2026-{cod_publico}`, donde `cod_publico` reemplaza el último segmento de `cod_tracking`.

## Uso

1. Abrir `http://127.0.0.1/tracking/` en el navegador.
2. Ingresar el código de tracking en el formulario y presionar **Track Result**.
3. Alternativamente, navegar directamente con el parámetro GET: `?cod_tracking=MGI-G-2026-1731539562`.

La página muestra:
- **Tarjeta de datos**: Tracking ID, nombre, empresa, RUC.
- **Línea de tiempo**: Actividades agrupadas por fase (solo fases con datos).
- **Botón Imprimir**: Genera una vista limpia para impresión.

## Dependencias

| Librería      | Versión  | Tipo       | Fuente                              |
|---------------|----------|------------|-------------------------------------|
| Bootstrap     | 5.3.3    | JS/CSS     | `js/plugins.js` (local)            |
| jQuery        | 3.7.1    | JS         | `js/jquery.min.js` (local)         |
| Font Awesome  | 6.x      | CSS        | CDN (`all.min.css`)                 |
| AlertifyJS    | 1.14.0   | JS/CSS     | CDN                                 |
| Swiper        | —        | JS/CSS     | CDN (carrusel del header)           |

## Notas para el equipo

- **No agregar lógica inline** en `index.html`. Toda la interacción va en `main.js`.
- **Variables de entorno** se leen desde PHP (`config-js.php`) y se exponen como JSON al frontend.
- Los estilos de impresión están en `@media print` al final de `cargo-theme.css`. Si se modifica la estructura HTML del resultado de tracking, actualizar esos selectores.
- El overlay de loading es hijo directo de `<body>` (no de un contenedor Bootstrap) para que `position: fixed` funcione correctamente.

## Licencia

Proyecto de uso interno. Definir una licencia explícita antes de distribuirlo a terceros.
