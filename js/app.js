"use strict";
const $=s=>document.querySelector(s), app=$("#app");
const money=n=>CONFIG.moneda+n.toLocaleString("es-AR");
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const wa=t=>`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(t)}`;
const prods=()=>PRODUCTS.filter(p=>p.publicado);
let cart=[];try{cart=JSON.parse(localStorage.getItem("ed-cart")||"[]")}catch(e){}
const save=()=>{try{localStorage.setItem("ed-cart",JSON.stringify(cart))}catch(e){}$("#count").textContent=cart.reduce((a,i)=>a+i.qty,0)};
const find=id=>PRODUCTS.find(p=>p.id===id);
const view={cat:"Todo",sort:"",q:""};
$("#waFoot").href=wa("Hola Estampas Dinamita!");

function pic(p,i=0){
  const c=p.colores[0]?.hex||"#ddd";
  return p.imagenes[i]?`<img src="${esc(p.imagenes[i])}" alt="${esc(p.nombre)}" loading="lazy">`
   :`<div class="ph" style="background:${c}" role="img" aria-label="${esc(p.nombre)} (imagen de ejemplo)"><img src="img/logo.jpeg" alt="" loading="lazy"></div>`;
}
function card(p){
  const t=[...p.etiquetas.map(x=>`<span class="tag">${esc(x)}</span>`),p.stock<1?'<span class="tag soldout">AGOTADO</span>':""].join("");
  return `<a class="card" href="#/producto/${p.id}"><div style="position:relative">${pic(p)}<div class="tags">${t}</div></div><h3>${esc(p.nombre)}</h3><span class="price">${money(p.precio)}</span></a>`;
}
const grid=l=>l.length?`<div class="grid">${l.map(card).join("")}</div>`:`<p>No hay productos para mostrar.</p>`;

const routes={
home(){
  const nuevos=prods().filter(p=>p.etiquetas.includes("NUEVO")).slice(0,4);
  const dest=prods().filter(p=>p.etiquetas.includes("MÁS VENDIDO")||p.etiquetas.includes("LIMITED EDITION")).slice(0,4);
  const cats=["Remeras","Buzos","Accesorios","Personalizados"];
  app.innerHTML=`<section class="hero"><div><h1>Ropa que explota.</h1><p>Estampados originales, ediciones limitadas y prendas hechas a tu medida.</p><p><a class="btn" href="#/catalogo">Explorar colección</a></p></div><img src="img/logo.jpeg" alt="Estampas Dinamita: perro salchicha con mecha de dinamita" width="430" height="430"></section>
  <div class="fuse" aria-hidden="true"><i></i></div>
  <section><h2>Últimos lanzamientos</h2>${grid(nuevos)}</section>
  <section class="dark"><div><h2>Estampados personalizados</h2><p>Contanos qué querés estampar y armamos tu pedido por WhatsApp.</p><a class="btn alt" href="#/personalizados">Pedir mi estampado</a></div></section>
  <section><h2>Destacados</h2>${grid(dest)}</section>
  <section><h2>Categorías</h2><div class="chips">${cats.map(c=>`<a class="btn alt" href="#/catalogo/${encodeURIComponent(c)}">${c}</a>`).join("")}<a class="btn alt" href="#/colecciones">Colecciones especiales</a></div></section>`;
},
catalogo(cat){
  if(cat)view.cat=decodeURIComponent(cat);
  let l=prods();
  if(view.cat!=="Todo")l=l.filter(p=>p.categoria===view.cat);
  if(view.q)l=l.filter(p=>(p.nombre+p.descripcion+p.categoria).toLowerCase().includes(view.q));
  if(view.sort==="asc")l=[...l].sort((a,b)=>a.precio-b.precio);
  if(view.sort==="desc")l=[...l].sort((a,b)=>b.precio-a.precio);
  const cats=["Todo","Remeras","Buzos","Accesorios","Personalizados"];
  app.innerHTML=`<section><h2>Tienda</h2><div class="chips">${cats.map(c=>`<button class="alt ${c===view.cat?"on":""}" data-cat="${c}">${c}</button>`).join("")}<select id="sort" aria-label="Ordenar por precio"><option value="">Ordenar</option><option value="asc"${view.sort==="asc"?" selected":""}>Menor precio</option><option value="desc"${view.sort==="desc"?" selected":""}>Mayor precio</option></select></div>${grid(l)}</section>`;
  app.querySelectorAll("[data-cat]").forEach(b=>b.onclick=()=>{view.cat=b.dataset.cat;view.q="";routes.catalogo()});
  $("#sort").onchange=e=>{view.sort=e.target.value;routes.catalogo()};
},
producto(id){
  const p=find(id);if(!p||!p.publicado)return routes.catalogo();
  const sel={talle:p.talles[0],color:p.colores[0]?.nombre};
  const out=p.stock<1;
  app.innerHTML=`<section class="prod"><div>${pic(p)}</div><div><h1 style="font-size:2.2rem">${esc(p.nombre)}</h1><p class="price" style="font-size:1.4rem">${money(p.precio)}</p><p>${esc(p.descripcion)}</p>
  <b>Talle</b><div class="opts" id="oT">${p.talles.map((t,i)=>`<button aria-pressed="${i===0}" data-v="${esc(t)}">${esc(t)}</button>`).join("")}</div>
  <b>Color</b><div class="opts" id="oC">${p.colores.map((c,i)=>`<button aria-pressed="${i===0}" data-v="${esc(c.nombre)}"><span class="sw" style="background:${c.hex}"></span>${esc(c.nombre)}</button>`).join("")}</div>
  <label>Cantidad<input class="qty" id="qty" type="number" min="1" max="${p.stock}" value="1" ${out?"disabled":""}></label><p></p>
  <button id="add" ${out?"disabled":""}>${out?"Agotado":"Añadir al carrito"}</button> <a class="btn alt" href="#/catalogo">Seguir mirando</a></div></section>`;
  for(const [box,k] of [["#oT","talle"],["#oC","color"]])$(box).onclick=e=>{const b=e.target.closest("button");if(!b)return;$(box).querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b));sel[k]=b.dataset.v};
  $("#add")?.addEventListener("click",()=>{const q=Math.max(1,Math.min(p.stock,+$("#qty").value||1));add(p.id,sel.talle,sel.color,q);openCart()});
},
colecciones(){
  app.innerHTML=`<section><h2>Colecciones especiales</h2>${COLLECTIONS.map(c=>{const l=prods().filter(p=>p.coleccion===c.id);return `<div class="col"><h2>${esc(c.nombre)} ${c.limitada?'<span class="tag">LIMITED EDITION</span>':""}</h2><p>${esc(c.descripcion)}</p>${grid(l)}</div>`}).join("")}</section>`;
},
personalizados(){
  app.innerHTML=`<section><h2>Estampados personalizados</h2><p>Completá el pedido y se abre WhatsApp con todo listo. Si tenés una imagen de referencia, enviala en el chat.</p><form class="f" id="cf">
  <label>Nombre<input name="nombre" required></label><label>WhatsApp<input name="tel" type="tel" required></label>
  <label>Tipo de prenda<select name="prenda"><option>Remera</option><option>Buzo</option><option>Tote bag</option><option>Gorra</option><option>Otra</option></select></label>
  <label>Talle<input name="talle" required></label><label>Color<input name="color" required></label><label>Cantidad<input name="cant" type="number" min="1" value="1" required></label>
  <label>Descripción del diseño<textarea name="desc" rows="4" required></textarea></label><label>Enlace a una referencia (opcional)<input name="ref" type="url" placeholder="https://"></label>
  <button>Enviar por WhatsApp</button></form></section>`;
  $("#cf").onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));
   window.open(wa(`*Pedido de estampado personalizado*\nNombre: ${d.nombre}\nWhatsApp: ${d.tel}\nPrenda: ${d.prenda}\nTalle: ${d.talle}\nColor: ${d.color}\nCantidad: ${d.cant}\nDiseño: ${d.desc}${d.ref?`\nReferencia: ${d.ref}`:""}`),"_blank","noopener")};
}};

function add(id,talle,color,qty){
  const i=cart.find(x=>x.id===id&&x.talle===talle&&x.color===color);
  const max=find(id).stock;
  if(i)i.qty=Math.min(max,i.qty+qty);else cart.push({id,talle,color,qty});
  save();
}
const total=()=>cart.reduce((a,i)=>a+i.qty*find(i.id).precio,0);
function drawCart(){
  cart=cart.filter(i=>find(i.id));
  const c=$("#cart");
  c.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center"><h2 style="margin:0">Carrito</h2><button class="alt" id="x" aria-label="Cerrar carrito">Cerrar</button></div>
  ${cart.length?cart.map((i,n)=>{const p=find(i.id);return `<div class="line"><div><b>${esc(p.nombre)}</b><br><small>Talle ${esc(i.talle)} · ${esc(i.color)} · ${money(p.precio)}</small></div><b>${money(p.precio*i.qty)}</b><div><button class="alt" data-m="${n}" aria-label="Quitar una unidad">−</button> ${i.qty} <button class="alt" data-p="${n}" aria-label="Sumar una unidad">+</button></div><button class="alt" data-d="${n}">Eliminar</button></div>`}).join("")
   :"<p>El carrito está vacío.</p>"}
  <p style="font-size:1.3rem"><b>Total: ${money(total())}</b></p>
  ${cart.length?`<label>Tu nombre<input id="cn"></label><label>Datos adicionales (envío, aclaraciones)<textarea id="cx" rows="2"></textarea></label><p class="err" id="ce"></p><button id="go">Pedir por WhatsApp</button>`:""}`;
  $("#x").onclick=closeCart;
  c.onclick=e=>{const b=e.target.closest("button");if(!b)return;const d=b.dataset;
   if(d.m!==undefined){const i=cart[d.m];i.qty--;if(i.qty<1)cart.splice(d.m,1)}
   if(d.p!==undefined){const i=cart[d.p];i.qty=Math.min(find(i.id).stock,i.qty+1)}
   if(d.d!==undefined)cart.splice(d.d,1);
   if(d.m!==undefined||d.p!==undefined||d.d!==undefined){save();drawCart()}};
  $("#go")?.addEventListener("click",()=>{
   const n=$("#cn").value.trim();if(!n){$("#ce").textContent="Escribí tu nombre para continuar.";return}
   const lines=cart.map(i=>{const p=find(i.id);return `- ${p.nombre} | Talle ${i.talle} | ${i.color} | x${i.qty} | ${money(p.precio)} c/u`}).join("\n");
   const x=$("#cx").value.trim();
   window.open(wa(`*Nuevo pedido*\nCliente: ${n}\n\n${lines}\n\n*Total: ${money(total())}*${x?"\nDatos: "+x:""}`),"_blank","noopener")});
}
/* 2da etapa: si CONFIG.mercadoPagoEndpoint existe, enviar {items} a ese backend y redirigir a init_point.
   Nunca se marca un pago como exitoso desde el navegador. */
function openCart(){drawCart();$("#cart").hidden=$("#veil").hidden=false;$("#x").focus()}
function closeCart(){$("#cart").hidden=$("#veil").hidden=true;$("#cartBtn").focus()}
$("#cartBtn").onclick=openCart;$("#veil").onclick=closeCart;
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart()});
$("#search").onsubmit=e=>{e.preventDefault();view.q=$("#q").value.trim().toLowerCase();view.cat="Todo";if(location.hash==="#/catalogo")routes.catalogo();else location.hash="#/catalogo"};
function route(){
  const [,r,a]=(location.hash||"#/").split("/");
  (routes[r||"home"]||routes.home)(a);window.scrollTo(0,0);
}
addEventListener("hashchange",route);save();route();
