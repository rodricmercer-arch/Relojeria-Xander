const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
const galeria = document.querySelector('.galeria-relojes');

const scrollAmount = 270; // ancho aproximado + gap

galeria.scrollLeft = 0;

nextBtn.addEventListener('click', () => {
    galeria.scrollBy({left: scrollAmount, behavior: 'smooth'});
});

prevBtn.addEventListener('click', () => {
    galeria.scrollBy({left: -scrollAmount, behavior: 'smooth'});
});

// --- FUNCIÓN PARA ENVIAR COMPRA A WHATSAPP ---
function enviarCompraWhatsApp(carrito) {
    const numero = "51918164193";  //

    let mensaje = "🛒 *Nueva compra desde tu Tienda Web*\n\n";

    carrito.forEach(item => {
        mensaje += `• ${item.nombre} x${item.cantidad} - S/${item.precio}\n`;
    });

    let total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    mensaje += `\n💵 *Total:* S/${total}`;

    let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
}

document.addEventListener('DOMContentLoaded', () => {
    const botonesVerMas = document.querySelectorAll('.btn-ver-mas');
    const modal = document.getElementById('modal-servicio');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalImagen = document.getElementById('modal-imagen');
    const modalDescripcion = document.getElementById('modal-descripcion');
    const modalDetalle = document.getElementById('modal-detalle');
    const cerrar = document.querySelector('.modal .cerrar');

    const infoServicios = {
        "Cambio de pila": {
            imagen: "https://media.gq.com.mx/photos/65566d0fd095bbee0d4cdc23/master/w_1600%2Cc_limit/Changer-pile-montre-3.jpg",
            descripcion: "Reemplazo seguro de la batería original, asegurando funcionamiento óptimo de tu reloj.",
            detalle: `
1. Verificación del estado actual de la pila y diagnóstico general del reloj.
2. Apertura cuidadosa del compartimento de la batería.
3. Instalación de batería original certificada.
4. Prueba de funcionamiento para garantizar precisión.
5. Cierre seguro y limpieza exterior.
💡 Ventaja: Mantienes la garantía del mecanismo y evitas daños por baterías no originales.
⏱ Duración: 15 minutos | 💰 Precio: S/.10
`
        },
        "Limpieza general": {
            imagen: "https://elektonwatches.com/wp-content/uploads/como-limpiar-un-reloj.jpg",
            descripcion: "Limpieza profesional de correa y esfera para que tu reloj luzca impecable.",
            detalle: `
1. Desmontaje parcial de correa si es necesario.
2. Limpieza y pulido de la correa con productos adecuados según material.
3. Limpieza delicada de la esfera y cristal.
4. Secado y revisión final de piezas.
💡 Ventaja: Evita acumulación de polvo y mantiene brillo y estética del reloj.
⏱ Duración: 30 minutos | 💰 Precio: S/.20
`
        },
        "Ajuste de correa": {
            imagen: "https://www.iguanasell.es/cdn/shop/articles/portada-blog_1200x.jpg?v=1628854708",
            descripcion: "Adaptamos tu correa al tamaño exacto de tu muñeca para máximo confort.",
            detalle: `
1. Medición precisa de la muñeca.
2. Ajuste del largo de la correa, recorte o adición de eslabones según el modelo.
3. Prueba de comodidad y seguridad.
💡 Ventaja: Evita que la correa quede demasiado floja o apretada, asegurando comodidad diaria.
⏱ Duración: 10 minutos | 💰 Precio: S/.5
`
        },
        "Revisión de movimiento": {
            imagen: "https://img.freepik.com/foto-gratis/cerrar-reloj-cambio-hora_23-2149241149.jpg?semt=ais_hybrid&w=740&q=80",
            descripcion: "Chequeo completo del mecanismo interno para mantener precisión y durabilidad.",
            detalle: `
1. Apertura del reloj y limpieza interna del movimiento.
2. Verificación de engranajes, tornillería y lubricación.
3. Ajustes finos para asegurar la precisión de tiempo.
4. Prueba de funcionamiento y ajuste final.
💡 Ventaja: Detecta problemas antes de que se conviertan en fallas graves, prolongando la vida útil de tu reloj.
⏱ Duración: 45 minutos | 💰 Precio: S/.30
`
        }
    };
    botonesVerMas.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const servicio = btn.closest('.cuadro-servicio').querySelector('h3').innerText;
            const info = infoServicios[servicio];
            if (!info)
                return;

            modalTitulo.innerText = servicio;
            modalImagen.src = info.imagen;
            modalDescripcion.innerText = info.descripcion;
            modalDetalle.innerText = info.detalle;

            // --- ASIGNAR FONDO POR SERVICIO ---
            // reseteamos clases anteriores
            modal.querySelector('.modal-contenido').className = 'modal-contenido';
            let claseServicio = '';
            switch (servicio) {
                case "Cambio de pila":
                    claseServicio = "modal-cambio-pila";
                    break;
                case "Limpieza general":
                    claseServicio = "modal-limpieza-general";
                    break;
                case "Ajuste de correa":
                    claseServicio = "modal-ajuste-correa";
                    break;
                case "Revisión de movimiento":
                    claseServicio = "modal-revision-movimiento";
                    break;
            }
            modal.querySelector('.modal-contenido').classList.add(claseServicio);

            modal.classList.add('show');

        });
    });

    cerrar.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    window.addEventListener('click', e => {
        if (e.target === modal)
            modal.classList.remove('show');

    });
});


// ------- JS Formulario -------- //

const form = document.querySelector('form');
const mensaje = document.getElementById('mensaje-enviado');

form.addEventListener('submit', e => {
    mensaje.style.display = 'block';
});


// Variable global del carrito
let carrito = [];

// Seleccionar todos los botones de agregar
const botonesCarrito = document.querySelectorAll('.agregar-carrito');

botonesCarrito.forEach(btn => {
    btn.addEventListener('click', e => {
        const item = e.target.closest('.reloj-item'); // contenedor del reloj
        const reloj = {
            nombre: item.querySelector('.nombre').innerText,
            modelo: item.querySelector('.modelo').innerText,
            marca: item.querySelector('.marca').innerText,
            precio: item.querySelector('.precio').innerText
        };

        carrito.push(reloj);
        console.log("Reloj agregado:", reloj.nombre);
        console.log("Carrito actual:", carrito);
    });
});
// ----------Función Carrito ------//
document.addEventListener('DOMContentLoaded', () => {

    // ---------- Carrito ----------
    const carritoCompras = []; // variable principal del carrito
    // NOTE: El resto de los IDs están correctos en tu HTML.
    const carritoCantidad = document.getElementById('carrito-cantidad'); // número en mini-carrito
    const carritoLista = document.getElementById('carrito-lista'); // ul del carrito
    const carritoTotal = document.getElementById('carrito-total'); // div con total
    const carritoContenido = document.getElementById('carrito-contenido'); // contenedor desplegable
    const miniCarritoBtn = document.getElementById('mini-carrito'); // <-- Nueva variable para evitar el error
   const btnRealizarCompra = document.getElementById('btn-realizar-compra');

    // ----------------------------------------------------------------------
    // --- NUEVAS CONSTANTES PARA FILTROS ---
    // ----------------------------------------------------------------------
    const relojes = document.querySelectorAll('.reloj-item'); // Todos los ítems de producto
    const busquedaInput = document.getElementById('busqueda');
    const filtroMarcaSelect = document.getElementById('filtro-marca');
    const precioMinInput = document.getElementById('precio-min');
    const precioMaxInput = document.getElementById('precio-max');
    const btnBuscar = document.getElementById('btn-buscar');
    const btnPrompt = document.getElementById('btn-prompt');
    const mensajeNoEncontrado = document.getElementById('no-encontrado'); // Mensaje de alerta

    // Asignar botones "Agregar al carrito"
    document.querySelectorAll('.reloj-item').forEach(item => {
        let btn = item.querySelector('.agregar-carrito'); // busca tu botón HTML

        // El código de creación/asignación de clases que tenías aquí es correcto
        // ... (Tu código original de asignación de botones) ...

        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // evitar abrir mini-carrito

            // Info del reloj
            const nombre = item.querySelector('.nombre').innerText;
            // NOTE: Tu selector y lógica de precio son CORRECTOS:
            const precio = parseFloat(item.querySelector('.precio').innerText.replace('S/.', '').trim());

            // Ver si ya está en el carrito
            let carritoItem = carritoCompras.find(i => i.nombre === nombre);
            if (carritoItem) {
                carritoItem.cantidad += 1;
            } else {
                carritoCompras.push({nombre, precio, cantidad: 1});
            }

            // AÑADIMOS EL CONSOLE.LOG DE DIAGNÓSTICO AQUÍ
            console.log(`✅ Producto añadido: ${nombre}. Precio: S/.${precio}. Cantidad en carrito: ${carritoItem ? carritoItem.cantidad : 1}`);
            console.log("🛒 Estado actual del Carrito:", carritoCompras);

            // Feedback visual
            btn.classList.add('agregado');
            setTimeout(() => btn.classList.remove('agregado'), 300);

            // Actualizar visual
            actualizarCarrito();
        });
    });

    // Mostrar / ocultar carrito al hacer click en mini-carrito
    // Usamos la nueva variable miniCarritoBtn, que ahora está segura de existir.
    if (miniCarritoBtn) {
        miniCarritoBtn.addEventListener('click', () => {
            carritoContenido.classList.toggle('show');
        });
    }

// ----------------------------------------------------------------------
    // --- NUEVA FUNCIÓN: Lógica de Filtrado (Tema 2) ---
    // ----------------------------------------------------------------------
    function filtrarRelojes() {
        // 1. Obtener valores de los filtros
        const textoBusqueda = busquedaInput.value.toLowerCase();
        const marcaSeleccionada = filtroMarcaSelect.value;
        // Si el campo está vacío, usamos 0. Si el campo está vacío, usamos Infinity.
        const precioMin = parseFloat(precioMinInput.value) || 0;
        const precioMax = parseFloat(precioMaxInput.value) || Infinity;

        let encontrados = 0;

        relojes.forEach(item => {
            // 2. Extraer datos del item (compatible con tu HTML)
            const nombre = item.querySelector('.nombre').innerText.toLowerCase();
            const marca = item.querySelector('.marca').innerText;
            const precio = parseFloat(item.querySelector('.precio').innerText.replace('S/.', '').trim());

            // 3. Estructura de Control (if/else) y Operadores Lógicos (&&, ||)
            const cumpleBusqueda = (textoBusqueda === "" || nombre.includes(textoBusqueda) || marca.toLowerCase().includes(textoBusqueda));
            const cumpleMarca = (marcaSeleccionada === "" || marca === marcaSeleccionada);
            const cumplePrecio = (precio >= precioMin && precio <= precioMax);

            if (cumpleBusqueda && cumpleMarca && cumplePrecio) {
                item.style.display = "block"; // Mostrar
                encontrados++;
            } else {
                item.style.display = "none"; // Ocultar
            }
        });

        // 4. Mostrar u ocultar el mensaje de "No encontrado"
        if (encontrados === 0) {
            mensajeNoEncontrado.style.display = "block";
        } else {
            mensajeNoEncontrado.style.display = "none";
        }
    }
    // ----------------------------------------------------------------------


    // Función para actualizar mini-carrito y lista
    function actualizarCarrito() {
        // Total de items
        let cantidadTotal = carritoCompras.reduce((sum, item) => sum + item.cantidad, 0);

        if (carritoCantidad) {
            carritoCantidad.innerText = cantidadTotal;
        }

        // Lista de items
        carritoLista.innerHTML = '';
        carritoCompras.forEach(item => {
            const li = document.createElement('li');
            li.innerText = `${item.nombre} x${item.cantidad} - S/.${(item.precio * item.cantidad).toFixed(2)}`;
            carritoLista.appendChild(li);
        });

        // Total acumulado
        let total = carritoCompras.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        if (carritoTotal) {
            carritoTotal.innerText = `Total: S/. ${total.toFixed(2)}`;
        }

        // ----------------------------------------------------------------------
        // --- LÓGICA DE ACTIVACIÓN DEL BOTÓN DE COMPRA (INTEGRADO AQUÍ) ---
        // ----------------------------------------------------------------------
        if (btnRealizarCompra) {
            if (cantidadTotal > 0) {
                btnRealizarCompra.disabled = false;
            } else {
                btnRealizarCompra.disabled = true;
            }
        }
        // ----------------------------------------------------------------------
    }

    // ----------------------------------------------------------------------
    // --- NUEVO EVENTO: Clic para el Botón de Compra (Al final de DOMContentLoaded) ---
    // ----------------------------------------------------------------------
    if (btnRealizarCompra) {
        btnRealizarCompra.addEventListener('click', () => {
            enviarCompraWhatsApp(carritoCompras);
        });

    }
    // ----------------------------------------------------------------------


    // --- Lógica del Slider (también dentro de DOMContentLoaded) ---
    const sliderGaleria = document.querySelector('.galeria-relojes');
    const btnPrev = document.querySelector('.slider-btn.prev');
    const btnNext = document.querySelector('.slider-btn.next');

    const scrollDistance = 250; // nombre único

    if (btnNext && sliderGaleria) {
        btnNext.addEventListener('click', () => {
            sliderGaleria.scrollBy({left: scrollDistance, behavior: 'smooth'});
        });
    }

    if (btnPrev && sliderGaleria) {
        btnPrev.addEventListener('click', () => {
            sliderGaleria.scrollBy({left: -scrollDistance, behavior: 'smooth'});
        });
    }
// ----------------------------------------------------------------------
    // --- NUEVOS LISTENERS PARA FILTRO Y BÚSQUEDA ---
    // ----------------------------------------------------------------------

    // Listener 1: Botón 'Buscar'
    if (btnBuscar) {
        btnBuscar.addEventListener('click', filtrarRelojes);
    }

    // Listener 2: Búsqueda al presionar Enter en el input de texto
    if (busquedaInput) {
        busquedaInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                filtrarRelojes();
            }
        });
    }

    // Listener 3: Búsqueda rápida con PROMMPT (Tema 2)
    if (btnPrompt) {
        btnPrompt.addEventListener('click', () => {
            // El prompt aparece en una ventana del navegador
            const marca = prompt("¿Qué marca buscas? (Ej: Casio)");

            if (marca === null || marca.trim() === "") {
                alert("Búsqueda cancelada.");
                return;
            }

            // Aplicar la búsqueda y filtrar
            busquedaInput.value = marca.trim();
            filtrarRelojes();
        });
    }
    // ----------------------------------------------------------------------


    // --- Lógica del Slider (también dentro de DOMContentLoaded) ---
    // ... (código existente del slider) ...

}); // Fin de DOMContentLoaded