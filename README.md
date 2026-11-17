# Estampas Dinamita: tienda estática

## Agregar o editar productos (sin programar)
1. Abrí `js/products.js`.
2. Copiá un bloque de producto (de `{ id:` hasta `}`), pegalo debajo, y cambiá los textos entre comillas.
3. Subí las fotos a la carpeta `img/` y escribí su ruta en `imagenes`, por ejemplo `["img/remera-1.jpg"]`.
4. `publicado:false` oculta el producto. `stock:0` lo marca agotado.
5. En `CONFIG.whatsapp` poné tu número (código de país + área + número, sin + ni espacios). Ejemplo Argentina: `5491155551234`.

## Publicar gratis en GitHub Pages
1. Creá un repositorio en github.com y subí todos estos archivos a la raíz.
2. Settings → Pages → Source: "Deploy from a branch" → rama `main`, carpeta `/ (root)` → Save.
3. En un par de minutos queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

## Mercado Pago (2da etapa)
Checkout Pro necesita credenciales y un backend seguro que cree la preferencia de pago. Cuando lo tengas, completá `CONFIG.mercadoPagoEndpoint` y conectalo en `js/app.js` (comentario marcado). Hoy el pedido se confirma por WhatsApp y no se simula ningún pago.
