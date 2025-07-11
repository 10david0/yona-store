document.addEventListener("DOMContentLoaded", function () {
    const enlacesCompra = document.querySelectorAll(".boton-compra");
    const alerta = document.getElementById("alerta");
    const metodoPago = document.getElementById("metodo-pago");
    const items = document.querySelectorAll(".item");
    const correoInfo = document.getElementById("correo-info");

    const preciosPorMetodo = {
        "pago movil": {
            "Pase Elite": 600, "Pase Premium": 1300, "Pase de Mejora": 350,
            "Oro 105": 145, "Oro 320": 430,
            "Oro 540": 725, "Oro 1100": 1450,
            "Oro 2260": 2800, "Oro 5800": 6800
        },
        "zinli": {
            "Pase Elite": 5, "Pase Premium": 12, "Pase de Mejora": 3.50,
            "Oro 105": 1.50, "Oro 320": 4.50,
            "Oro 540": 7.00, "Oro 1100": 13.50,
            "Oro 2260": 25.00, "Oro 5800": 60.00
        },
        "paypal": {
            "Pase Elite": 6.50, "Pase Premium": 15, "Pase de Mejora": 4.00,
            "Oro 105": 1.90, "Oro 320": 4.90,
            "Oro 540": 7.90, "Oro 1100": 15.90,
            "Oro 2260": 28.90, "Oro 5800": 61.00
        },
        "binance": {
            "Pase Elite": 5, "Pase Premium": 12, "Pase de Mejora": 3.50,
            "Oro 105": 1.50, "Oro 320": 4.50,
            "Oro 540": 7.00, "Oro 1100": 13.50,
            "Oro 2260": 25.00, "Oro 5800": 60.00
        }
    };

    metodoPago.addEventListener("change", function () {
        const metodo = metodoPago.value;

        // Actualiza precios
        items.forEach(item => {
            const nombre = item.dataset.nombre;
            const base = item.dataset.base;
            let precio = preciosPorMetodo[metodo]?.[nombre];

            if (precio !== undefined) {
                const simbolo = metodo === "pago movil" ? "Bs" : "$";
                item.querySelector("span").textContent = `${base} — ${precio} ${simbolo}`;
                item.querySelector(".boton-compra").href = `tercerapg.html?producto=${encodeURIComponent(nombre)}&precio=${precio}`;
            }
        });

        // Muestra correo asociado
        let correo = "";
        switch (metodo.toLowerCase()) {
            case "paypal":
                correo = "lf0023692@gmail.com";
                break;
            case "zinli":
                correo = "lf0023692@gmail.com";
                break;
            case "binance":
                correo = "lf0023692@gmail.com";
                break;
            default:
                correo = "";
        }

        correoInfo.innerHTML = correo
            ? `<p><strong>Correo para ${metodo}:</strong> <span style="color: #25D366">${correo}</span></p>`
            : "";
    });

    enlacesCompra.forEach(function (enlace) {
        enlace.addEventListener("click", function (e) {
            e.preventDefault();
            const id = document.getElementById("player-id").value.trim();
            const nombre = document.getElementById("nombre").value.trim();
            const metodo = document.getElementById("metodo-pago").value;

            if (id === "" || nombre === "" || metodo === "") {
                alerta.textContent = "Completa tu ID, nombre y método de pago antes de comprar.";
                return;
            }

            const url = new URL(enlace.href);
            const producto = url.searchParams.get("producto");
            const precio = url.searchParams.get("precio");

            const nuevaURL = `tercerapg.html?producto=${encodeURIComponent(producto)}&precio=${encodeURIComponent(precio)}&id=${encodeURIComponent(id)}&nombre=${encodeURIComponent(nombre)}&metodo=${encodeURIComponent(metodo)}`;
            window.location.href = nuevaURL;
        });
    });
});
