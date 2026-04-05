// Inicializar canvas

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//escala
const escala = 20;

// Dibuja un punto en el canvas usando coordenadas cartesianas (x, y)
// Convierte las coordenadas matemáticas al sistema del canvas y aplica la escala
function plot(x,y){
    ctx.fillRect(
        x*escala,
        canvas.height-(y+1)*escala,
        escala,
        escala
    );
}

function limpiarCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}
// Función que limpia el canvas y dibuja los ejes X y Y 

function dibujarEjes(){

    limpiarCanvas();

    ctx.beginPath();
    ctx.moveTo(0,canvas.height);
    ctx.lineTo(canvas.width,canvas.height);

    ctx.moveTo(0,0);
    ctx.lineTo(0,canvas.height);

    ctx.stroke();
}

/**
 * * Código suministrado por el profesor
 * Implementación del algoritmo de líneas de Bresenham.
 * @param {number} x0 - Coordenada X inicial.
 * @param {number} y0 - Coordenada Y inicial.
 * @param {number} x1 - Coordenada X final.
 * @param {number} y1 - Coordenada Y final.
 * @param {Function} plot - Función para dibujar el píxel (x, y).
 */
function bresenham(x0, y0, x1, y1, plot) {
    // Cálculo de diferenciales y dirección del paso
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        // Dibujar el punto actual
        plot(x0, y0);

        // Condición de finalización
        if (x0 === x1 && y0 === y1) break;

        let e2 = 2 * err;

        // Ajuste en el eje X
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }

        // Ajuste en el eje Y
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}