/* ============ EDITÁ SOLO ESTE ARCHIVO ============
   Ver README.md. Productos de DEMOSTRACIÓN: reemplazalos. */
window.CONFIG = {
  whatsapp: "5490000000000",   // TU número: código de país + área + número, sin + ni espacios
  moneda: "$",
  mercadoPagoEndpoint: null    // 2da etapa: URL de tu backend que crea la preferencia de Checkout Pro
};
window.COLLECTIONS = [
  { id: "demo-explosiva", nombre: "Colección demo: Explosiva", descripcion: "Descripción de ejemplo para una colección temática. Reemplazala.", limitada: true },
  { id: "demo-basicos", nombre: "Colección demo: Básicos", descripcion: "Descripción de ejemplo. Reemplazala.", limitada: false }
];
/* categoria: Remeras | Buzos | Accesorios | Personalizados
   etiquetas: NUEVO | LIMITED EDITION | MÁS VENDIDO
   imagenes: ["img/archivo.jpg"]  (si queda vacío se muestra un marcador con el logo)
   publicado:false lo oculta. stock:0 lo marca agotado. */
window.PRODUCTS = [
  { id:"remera-demo-1", nombre:"Remera Demo 1", categoria:"Remeras", descripcion:"Producto de demostración. Reemplazá descripción, precio e imágenes.", precio:10000, imagenes:[], talles:["S","M","L","XL"], colores:[{nombre:"Negro",hex:"#1A1A1A"},{nombre:"Rojo",hex:"#E32636"}], stock:20, coleccion:"demo-explosiva", publicado:true, etiquetas:["NUEVO","LIMITED EDITION"] },
  { id:"remera-demo-2", nombre:"Remera Demo 2", categoria:"Remeras", descripcion:"Producto de demostración.", precio:9000, imagenes:[], talles:["S","M","L"], colores:[{nombre:"Blanco",hex:"#EDEDED"},{nombre:"Negro",hex:"#1A1A1A"}], stock:15, coleccion:"demo-basicos", publicado:true, etiquetas:["MÁS VENDIDO"] },
  { id:"buzo-demo-1", nombre:"Buzo Demo 1", categoria:"Buzos", descripcion:"Producto de demostración.", precio:22000, imagenes:[], talles:["M","L","XL"], colores:[{nombre:"Negro",hex:"#1A1A1A"}], stock:8, coleccion:"demo-explosiva", publicado:true, etiquetas:["LIMITED EDITION"] },
  { id:"buzo-demo-2", nombre:"Buzo Demo 2", categoria:"Buzos", descripcion:"Producto de demostración.", precio:20000, imagenes:[], talles:["S","M","L"], colores:[{nombre:"Gris",hex:"#8a8a8a"},{nombre:"Rojo",hex:"#E32636"}], stock:10, coleccion:"demo-basicos", publicado:true, etiquetas:["NUEVO"] },
  { id:"tote-demo", nombre:"Tote bag Demo", categoria:"Accesorios", descripcion:"Producto de demostración.", precio:6000, imagenes:[], talles:["Único"], colores:[{nombre:"Crudo",hex:"#E9E2D0"}], stock:30, coleccion:"", publicado:true, etiquetas:[] },
  { id:"gorra-demo", nombre:"Gorra Demo", categoria:"Accesorios", descripcion:"Producto de demostración.", precio:8000, imagenes:[], talles:["Único"], colores:[{nombre:"Negro",hex:"#1A1A1A"},{nombre:"Rojo",hex:"#E32636"}], stock:0, coleccion:"demo-explosiva", publicado:true, etiquetas:["LIMITED EDITION"] }
];
