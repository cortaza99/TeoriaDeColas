let selectedItem = null; // Variable para guardar el ítem seleccionado

function selectItem(index) {
    const items = document.querySelectorAll('.item'); // Selecciona todos los ítems
    const btnIniciar = document.getElementById('btnIniciar'); // Obtiene el botón "Iniciar"

    // Si ya hay un ítem seleccionado, lo deseleccionamos
    if (selectedItem !== null) {
        items[selectedItem].classList.remove('selected'); // Remueve la clase de seleccionado
    }

    // Si el índice no es igual al seleccionado, lo seleccionamos
    if (selectedItem !== index - 1) { // Restamos 1 porque los índices comienzan en 0
        items[index - 1].classList.add('selected'); // Agrega la clase de seleccionado
        selectedItem = index - 1; // Actualiza el ítem seleccionado
        btnIniciar.disabled = false; // Habilita el botón "Iniciar"
    } else {
        selectedItem = null; // Si clickeamos el mismo, lo deseleccionamos
        btnIniciar.disabled = true; // Deshabilita el botón "Iniciar"
    }
}

// Función para manejar el clic en el botón "Iniciar"
document.getElementById('btnIniciar').addEventListener('click', function() {
    document.querySelector('.menu').style.display = 'none'; // Oculta el menú
    document.querySelector('.contenido').style.display = 'grid'; // Muestra el contenido
});

function regresarMenu() {
    document.querySelector('.contenido').style.display = 'none'; // Oculta el contenido
    document.querySelector('.menu').style.display = 'flex'; // Muestra el menú
}



// Tipar los elementos HTML
const situacionSelect = document.getElementById('situacion');
const lambdaInput = document.getElementById('lambda');
const muInput = document.getElementById('mu');
const servidoresInput = document.getElementById('servidores');
const poblacionInput = document.getElementById('poblacion');
const calcularBtn = document.getElementById('calcularBtn');

// Tipar los resultados
const p0Result = document.getElementById('P0');
const lqResult = document.getElementById('Lq');
const lResult = document.getElementById('L');
const wqResult = document.getElementById('Wq');
const wResult = document.getElementById('W');
const pwResult = document.getElementById('Pw');

// Función para habilitar/deshabilitar campos según la opción seleccionada
situacionSelect.addEventListener('change', () => {
    const situacion = situacionSelect.value;

    // Resetear los valores
    lambdaInput.value = '';
    muInput.value = '';
    servidoresInput.value = '';
    poblacionInput.value = '';

    // Deshabilitar los campos
    lambdaInput.disabled = true;
    muInput.disabled = true;
    servidoresInput.disabled = true;
    poblacionInput.disabled = true;

    // Hacer que los campos no sean obligatorios
    lambdaInput.removeAttribute('required');
    muInput.removeAttribute('required');
    servidoresInput.removeAttribute('required');
    poblacionInput.removeAttribute('required');

    // Mostrar los campos de entrada
    document.getElementById('inputFields').style.display = 'block';

    // Habilitar los campos según la situación seleccionada
    if (situacion === '1' || situacion === '3') {
        lambdaInput.disabled = false;
        muInput.disabled = false;
        lambdaInput.required = true;
        muInput.required = true;

        // Ocultar campos adicionales
        document.getElementById('servidoresLabel').style.display = 'none';
        servidoresInput.style.display = 'none';
        document.getElementById('poblacionLabel').style.display = 'none';
        poblacionInput.style.display = 'none';
    } else if (situacion === '2' || situacion === '4') {
        lambdaInput.disabled = false;
        muInput.disabled = false;
        servidoresInput.disabled = false;
        lambdaInput.required = true;
        muInput.required = true;
        servidoresInput.required = true;

        // Mostrar campos adicionales
        document.getElementById('servidoresLabel').style.display = 'block';
        servidoresInput.style.display = 'block';
        document.getElementById('poblacionLabel').style.display = 'none';
        poblacionInput.style.display = 'none';
    } else if (situacion === '5') {
        lambdaInput.disabled = false;
        muInput.disabled = false;
        poblacionInput.disabled = false;
        lambdaInput.required = true;
        muInput.required = true;
        poblacionInput.required = true;

        // Mostrar campo de población
        document.getElementById('servidoresLabel').style.display = 'none';
        servidoresInput.style.display = 'none';
        document.getElementById('poblacionLabel').style.display = 'block';
        poblacionInput.style.display = 'block';
    }

    // Habilitar el botón calcular cuando se selecciona una opción
    calcularBtn.disabled = situacion === "";
});

// Evento para el botón de calcular
calcularBtn.addEventListener('click', () => {
    const lambda = parseFloat(lambdaInput.value);
    const mu = parseFloat(muInput.value);
    const servidores = parseInt(servidoresInput.value) || 1;
    const poblacion = parseInt(poblacionInput.value) || Infinity;
    const situacion = situacionSelect.value;

    let P0, Lq, L, Wq, W, Pw;

    if (situacion === '1') {
        ({ P0, Lq, L, Wq, W, Pw } = MM1(lambda, mu));
    } else if (situacion === '2') {
        ({ P0, Lq, L, Wq, W, Pw } = MMc(lambda, mu, servidores));
    } else if (situacion === '5') {
        ({ P0, Lq, L, Wq, W, Pw } = MM1K(lambda, mu, poblacion));
    } else {
        return; // Salir si no hay cálculo definido
    }

    // Mostrar los resultados
    p0Result.textContent = `P0: ${P0 ? P0.toFixed(2) : 'N/A'}`;
    lqResult.textContent = `Lq: ${Lq ? Lq.toFixed(2) : 'N/A'}`;
    lResult.textContent = `L: ${L ? L.toFixed(2) : 'N/A'}`;
    wqResult.textContent = `Wq: ${Wq ? Wq.toFixed(2) : 'N/A'}`;
    wResult.textContent = `W: ${W ? W.toFixed(2) : 'N/A'}`;
    pwResult.textContent = `Pw: ${Pw ? Pw.toFixed(2) : 'N/A'}`;

    const resultados = document.querySelector('.results');
    resultados.style.display = 'block';
});

// Funciones para los cálculos
function MM1(lambda, mu) {
    const rho = lambda / mu;
    const P0 = 1 - rho;
    const Lq = Math.pow(rho, 2) / (1 - rho);
    const L = Lq + rho;
    const Wq = Lq / lambda;
    const W = Wq + (1 / mu);
    const Pw = rho;
    return { P0, Lq, L, Wq, W, Pw };
}

function MMc(lambda, mu, servers) {
    const rho = lambda / (mu * servers);
    const P0 = (1 - rho) / (1 - Math.pow(rho, servers + 1));
    const Lq = (Math.pow(lambda / mu, servers) * rho) / (factorial(servers) * Math.pow(1 - rho, 2));
    const L = Lq + (lambda / mu);
    const Wq = Lq / lambda;
    const W = Wq + (1 / mu);
    const Pw = rho;
    return { P0, Lq, L, Wq, W, Pw };
}

function MM1K(lambda, mu, population) {
    const rho = lambda / mu;
    const P0 = 1 - rho;
    const Lq = Math.pow(rho, 2) / (1 - rho);
    const L = Lq + rho;
    const Wq = Lq / lambda;
    const W = Wq + (1 / mu);
    const Pw = rho;
    return { P0, Lq, L, Wq, W, Pw };
}

function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
