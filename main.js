//Imagenees
const imagen1 = document.querySelector('#imagenUno');
const imagen2 = document.querySelector('#imagenDos');
const imagen3 = document.querySelector('#imagenTres');
//Score
const score = document.querySelector('#score');
//Botones
const btnIniciar = document.querySelector('#btnStart');
const jugarDeNuevo = document.querySelector('#jugarDeNuevo');
//TEXTOS
const resultado = document.querySelector('#resultado');
const boxHistorialHtml = document.querySelector('#historial');
let numeroHistorial = 0;
let boxResultado = [];
//===============================
//Reset valores
let valorInicial = 900;
score.textContent = valorInicial;
//Evento
jugarDeNuevo.addEventListener('click',()=>{
    valorInicial = 900;
    score.textContent = valorInicial;
    limpiarHistorial();
});
btnIniciar.addEventListener('click',iniciarJuego);
function iniciarJuego(e){
    e.preventDefault();
    const numero1 = Math.ceil(Math.random()*3);
    const numero2 = Math.ceil(Math.random()*3);
    const numero3 = Math.ceil(Math.random()*3);

    if(valorInicial > 199){
        rotarImagenes(numero1,numero2,numero3);
        validacionDePuntos(numero1,numero2,numero3);
        historialHTML();
    }else{
        resultado.textContent = 'No tienes creditos Suficientes';
        resultado.classList.add('no-creditos');
        resultado.classList.remove('ganada');
        resultado.classList.remove('perdida');
    }
}
//Rotar Imagenes
function rotarImagenes(n1,n2,n3){
    imagen1.setAttribute('src',`img/${n1}.png`);
    imagen2.setAttribute('src',`img/${n2}.png`);
    imagen3.setAttribute('src',`img/${n3}.png`);
}
//Validar Puntos
function validacionDePuntos(n1,n2,n3){
    if(n1 === n2 && n2 === n3 && n3 === n1){
        valorInicial += Math.floor(valorInicial*0.5);
        score.textContent = valorInicial;
        resultado.textContent = 'Ganaste, Tu score aumenta un 50%';
        resultado.classList.remove('no-creditos');
        resultado.classList.add('ganada');
        resultado.classList.remove('perdida');

    }else{
        valorInicial -= 200;
        score.textContent = valorInicial;
        resultado.textContent = 'RONDA PERDIDA, PIERDES 200 CREDITOS';
        resultado.classList.add('perdida');
        resultado.classList.remove('ganada');
        resultado.classList.remove('no-creditos');
    }
}
//INsertar HTML
function historialHTML(){
    while(boxHistorialHtml.firstChild){
        boxHistorialHtml.firstChild.remove();
    }
    const objeto = crearObjeto();
    boxResultado.push(objeto);
    boxResultado.forEach(itemHistorial =>{
        //Elemento html ITEM HISTORIAL
        const divItemHistorial = document.createElement('div');
        divItemHistorial.classList.add('ctn-item-historial');
        const p1Historial = document.createElement('p');
        p1Historial.textContent = itemHistorial.ronda;
        const p2Historial = document.createElement('p');
        p2Historial.textContent = itemHistorial.valorInicial;

        //Agregando parrafos a item historial
        divItemHistorial.appendChild(p1Historial);
        divItemHistorial.appendChild(p2Historial);

        //Agregando item historial al contenedor boxHistorialHtml
        boxHistorialHtml.appendChild(divItemHistorial);
    })
}
//Asignar objetos
function crearObjeto(){
    const objetoHistorial = {
        ronda:`ronda Nº${++numeroHistorial}`,
        valorInicial:`Creditos: ${valorInicial}`,
    }
    return objetoHistorial;
};
function limpiarHistorial(){
    numeroHistorial = 0;
    boxResultado = [];
    resultado.textContent = '';
    resultado.classList.remove('no-creditos');
    resultado.classList.remove('perdida');
    resultado.classList.remove('ganada');
    while(boxHistorialHtml.firstChild){
        boxHistorialHtml.firstChild.remove();
    };
};