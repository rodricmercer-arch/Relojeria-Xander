// Configuración de Supabase
const supabaseUrl = "https://cqmcrpcycpqvqmzonnak.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbWNycGN5Y3BxdnFtem9ubmFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MjYwODgsImV4cCI6MjA3OTMwMjA4OH0.2NHybJFrvu06I8kO5H0vkNksFqZFtdAJxKk8WykyTQw";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// --- Carrito en sessionStorage (reinicia al cerrar pestaña)
let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

// --- Agregar producto al carrito
function agregarAlCarrito(producto) {
    const prodId = Number(producto.id);

    // Buscar si ya existe
    const index = carrito.findIndex(item => item.id === prodId);

    if (index > -1) {
        carrito[index].cantidad += 1; // aumentar cantidad
    } else {
        carrito.push({
            id: prodId,
            nombre: producto.nombre,
            marca: producto.marca,
            modelo: producto.modelo,
            precio: producto.precio,
            cantidad: 1
        });
    }

    // Guardar en sessionStorage
    sessionStorage.setItem("carrito", JSON.stringify(carrito));

    // Mostrar panel flotante
    mostrarCarritoFlotante();
}

// --- Mostrar panel flotante
function mostrarCarritoFlotante() {
    const panel = document.getElementById("panelCarrito");

    if (!carrito || carrito.length === 0) {
        panel.style.display = "none";
        return;
    }

    let subtotal = 0;
    let contenido = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3>Carrito</h3>
            <button id="cerrarPanel" style="background:none; border:none; font-size:16px; cursor:pointer;">X</button>
        </div>
        <ul style="padding-left:0; list-style:none;">`;

    carrito.forEach(item => {
        subtotal += item.precio * item.cantidad;
        contenido += `
            <li style="margin-bottom:8px;">
                <p><strong>${item.nombre}</strong></p>
                <p>Marca: ${item.marca}</p>
                <p>Modelo: ${item.modelo}</p>
                <p>Precio: $${item.precio} x ${item.cantidad}</p>
            </li>`;
    });

    contenido += `</ul>`;
    contenido += `<p><strong>Subtotal: $${subtotal}</strong></p>`;

    panel.innerHTML = contenido;
    panel.style.display = "block";

    // Evento cerrar panel
    document.getElementById("cerrarPanel").addEventListener("click", () => {
        panel.style.display = "none";
    });
}

// --- Obtener ID de la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// --- Cargar reloj
if (id) {
    cargarReloj(id);
}

async function cargarReloj(id) {
    const { data, error } = await supabase
        .from("Relojes")
        .select("id, nombre, precio, descripcion_corta, url_imagen_principal, material_caja, marca, modelo, categoria, stock")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error al cargar el reloj:", error);
        return;
    }

    // Insertar datos en HTML
    document.getElementById("nombre").textContent = data.nombre;
    document.getElementById("precio").textContent = data.precio;
    document.getElementById("descripcion").textContent = data.descripcion_corta;
    document.getElementById("material").textContent = data.material_caja;
    document.getElementById("marca").textContent = data.marca;
    document.getElementById("modelo").textContent = data.modelo;
    document.getElementById("categoria").textContent = data.categoria;
    document.getElementById("stock").textContent = data.stock;
    document.getElementById("imagen").src = data.url_imagen_principal;

    // --- Botón agregar
    document.getElementById("btnAgregarCarrito").addEventListener("click", () => {
        agregarAlCarrito(data);
    });
}