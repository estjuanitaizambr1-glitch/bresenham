// Inicializar canvas

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Escala y máximo dinámicos (se calculan al dibujar)
let escala;
let maxValor;

/**
 * Dibuja un punto en el canvas usando coordenadas cartesianas.
 * Convierte el sistema matemático (origen abajo) al sistema del canvas (origen arriba).
 * @param {number} x - Coordenada X del punto.
 * @param {number} y - Coordenada Y del punto.
 */
function plot(x,y){
    ctx.fillStyle = "#da84fc";
    ctx.fillRect(
        x*escala,
        canvas.height - (y * escala),
        escala,
        escala
    );
}
/**
 * Limpia completamente el canvas.
 * Elimina cualquier dibujo previo.
 */
function limpiarCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}
/**
 * Dibuja la cuadrícula del plano cartesiano.
 * Incluye líneas horizontales y verticales según la escala dinámica.
 * También dibuja la numeración en los ejes X y Y.
 * Usa un salto dinámico para evitar que los números se encimen.
 */
function dibujarCuadricula(){
    // Controla cada cuánto se muestran números, para que en coordenadas grandes no se amontonen
    let salto = Math.ceil(maxValor / 20);
    // Tamaño de los números
    ctx.font = "10px Arial";
    ctx.fillStyle = "black";
    ctx.strokeStyle = "#ddd"; 

  // Ahora usamos unidades en vez de píxeles directos
    for(let i = 0; i <= maxValor; i++){
    let x = i * escala;

    ctx.beginPath();
    ctx.moveTo(x,0);
    ctx.lineTo(x,canvas.height);
    ctx.stroke();
     // Número en eje X
    if(i % salto === 0){
    ctx.fillText(i, x, canvas.height - 2);
}
}

    for(let i = 0; i <= maxValor; i++){
    let y = i * escala;

    ctx.beginPath();
    ctx.moveTo(0,y);
    ctx.lineTo(canvas.width,y);
    ctx.stroke();
    // Número en eje Y (invertido)
    if(i % salto === 0){
    ctx.fillText(i, 2, canvas.height - y);
}
}
    ctx.strokeStyle = "black"; 
}
/**
 * Dibuja los ejes principales del plano cartesiano (X y Y).
 * Limpia el canvas y luego dibuja la cuadrícula y los ejes.
 */
function dibujarEjes(){

    limpiarCanvas();

    dibujarCuadricula();

    ctx.beginPath();
    ctx.moveTo(0,canvas.height);
    ctx.lineTo(canvas.width,canvas.height);

    ctx.moveTo(0,0);
    ctx.lineTo(0,canvas.height);

    ctx.stroke();
}
/**
 * Limpia el contenido de la tabla eliminando todas las filas.
 */
function limpiarTabla(){
    document.querySelector("#tabla tbody").innerHTML="";
}
/**
 * Agrega una fila a la tabla con los valores del algoritmo.
 * @param {number} p - Número de paso.
 * @param {number} x - Coordenada X.
 * @param {number} y - Coordenada Y.
 * @param {number} err - Error acumulado.
 * @param {number} e2 - Error duplicado.
 */
function agregarFila(p,x,y,err,e2){
    document.querySelector("#tabla tbody").innerHTML+=`
    <tr>
    <td>${p}</td>
    <td>${x}</td>
    <td>${y}</td>
    <td>${err}</td>
    <td>${e2}</td>
    </tr>`;
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

    // Contador de pasos (AGREGADO)
    let paso = 0;

    while (true) {
        // Dibujar el punto actual
        plot(x0, y0);

        let e2 = 2 * err;

        // Registrar valores en tabla (AGREGADO)
        agregarFila(paso, x0, y0, err, e2);

        // Condición de finalización
        if (x0 === x1 && y0 === y1) break;

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

        // Incrementar paso (AGREGADO)
        paso++;
    }
}
/**
 * Obtiene los valores ingresados por el usuario desde los inputs.
 * @returns {{x0:number, y0:number, x1:number, y1:number}} Coordenadas ingresadas.
 */
function obtenerValores(){
    return{
        x0:parseInt(x0.value),
        y0:parseInt(y0.value),
        x1:parseInt(x1.value),
        y1:parseInt(y1.value)
    }
}
/**
 * Función principal que ejecuta el proceso completo:
 * Obtiene los valores ingresados
 * Calcula la escala dinámica
 * Dibuja ejes y cuadrícula
 * Ejecuta el algoritmo de Bresenham
 */
function dibujar(){

    const v = obtenerValores();

    limpiarTabla();

    //calcular máximo dinámico según los datos
    maxValor = Math.max(v.x0, v.y0, v.x1, v.y1);

    // Evitar división por 0
    if(maxValor === 0) maxValor = 1;

    //calcular escala en función del máximo
    escala = canvas.width / maxValor;

    dibujarEjes();

    bresenham(v.x0,v.y0,v.x1,v.y1,plot);
}