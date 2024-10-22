let selectedItem = null;

function selectItem(index) {
    const items = document.querySelectorAll('.item');
    const btnIniciar = document.getElementById('btnIniciar');
    const entradaSer = document.getElementById('entradaSer');
    const entradaPoblacion = document.getElementById('entradaPoblacion');
    const entradaDesviacion = document.getElementById('entradaDesviacion');
    const titulo = document.getElementById('idTitulo');

    items.forEach((item, i) => {
        item.classList.remove('selected');
    });

    if (selectedItem !== index - 1) {
        items[index - 1].classList.add('selected');
        selectedItem = index - 1;
        btnIniciar.disabled = false;


        switch (index) {
            case 1: // Tiempos de atención uniformes y 1 unidad de servicio
                entradaSer.querySelector('input').value = 1;
                entradaSer.querySelector('input').disabled = true;
                entradaSer.style.display = 'flex';
                entradaPoblacion.style.display = 'none';
                entradaDesviacion.style.display = 'none';
                entradaDesviacion.querySelector('input').disabled = true;
                titulo.innerText = 'M/M/1';
                break;

            case 2: // Tiempos de atención uniformes y más de 1 unidad de servicio
                entradaSer.querySelector('input').value = 1;
                entradaSer.querySelector('input').disabled = false;
                entradaSer.style.display = 'flex';
                entradaPoblacion.style.display = 'none';
                entradaDesviacion.style.display = 'none';
                entradaDesviacion.querySelector('input').disabled = true;
                titulo.innerText = 'M/M/c';
                break;

            case 3: // Tiempos de atención variables y 1 unidad de servicio
                entradaSer.querySelector('input').value = 1;
                entradaSer.querySelector('input').disabled = true;
                entradaSer.style.display = 'flex';
                entradaPoblacion.style.display = 'none';
                entradaDesviacion.style.display = 'flex';
                entradaDesviacion.querySelector('input').disabled = false;
                titulo.innerText = 'M/G/1';
                break;

            case 4: // Tiempos de atención variables y más de 1 unidad de servicio
                entradaSer.querySelector('input').value = 1;
                entradaSer.querySelector('input').disabled = false;
                entradaSer.style.display = 'flex';
                entradaPoblacion.style.display = 'none';
                entradaDesviacion.style.display = 'flex';
                entradaDesviacion.querySelector('input').disabled = false;
                titulo.innerText = 'M/G/c';
                break;

            case 5: // Tiempos de atención uniformes y 1 unidad de servicio y población finita
                entradaSer.querySelector('input').value = 1;
                entradaSer.querySelector('input').disabled = true;
                entradaSer.style.display = 'flex';
                entradaPoblacion.style.display = 'flex';
                entradaPoblacion.querySelector('input').disabled = false;
                entradaDesviacion.style.display = 'none';
                entradaDesviacion.querySelector('input').disabled = true;
                titulo.innerText = 'M/D/1';
                break;

            default:
                entradaSer.style.display = 'none';
                entradaPoblacion.style.display = 'none';
                entradaDesviacion.style.display = 'none';
                entradaDesviacion.querySelector('input').disabled = true;
                break;
        }
    } else {
        selectedItem = null;
        btnIniciar.disabled = true;
        entradaSer.style.display = 'none';
        entradaPoblacion.style.display = 'none';
        entradaDesviacion.style.display = 'none';
        entradaDesviacion.querySelector('input').disabled = true;
    }
}

document.getElementById('btnIniciar').addEventListener('click', function () {
    document.querySelector('.menu').style.display = 'none';
    document.querySelector('.contenido').style.display = 'grid';
    if (selectedItem === 0) {
        document.getElementById('canales').value = 1;
    }
});


document.getElementById('btnIniciar').addEventListener('click', function () {
    document.querySelector('.menu').style.display = 'none';
    document.querySelector('.contenido').style.display = 'grid';
    if (selectedItem === 0) {
        document.getElementById('canales').value = 1;
    }
});

function regresarMenu() {
    document.getElementById('tasaLlegada').value = '';
    document.getElementById('tasaServicio').value = '';
    document.getElementById('desviacion').value = '';
    document.getElementById('canales').value = '';
    document.getElementById('poblacion').value = '';
    document.getElementById('clientesCantidad').value = '';

    document.getElementById('tasaLlegada').style.border = '';
    document.getElementById('tasaServicio').style.border = '';
    document.getElementById('canales').style.border = '';
    document.getElementById('desviacion').style.border = '';
    document.getElementById('poblacion').style.border = '';
    document.getElementById('clientesCantidad').style.border = '';


    selectedItem = null;
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        item.classList.remove('selected');
    });

    document.querySelector('.contenido').style.display = 'none';
    document.querySelector('.menu').style.display = 'flex';
    ocultarResultados();
    document.getElementById('P0').innerHTML = '';
    document.getElementById('Lq').innerHTML = '';
    document.getElementById('L').innerHTML = '';
    document.getElementById('Wq').innerHTML = '';
    document.getElementById('W').innerHTML = '';
    document.getElementById('Pw').innerHTML = '';
    document.getElementById('Pn').innerHTML = '';

    btnIniciar.disabled = true;
}



document.getElementById('btnCalcular').addEventListener('click', function () {
    const tasaLlegada = document.getElementById('tasaLlegada');
    const tasaServicio = document.getElementById('tasaServicio');
    const canales = document.getElementById('canales');
    const poblacion = document.getElementById('poblacion');
    const desviacionEstandar = document.getElementById('desviacion');
    const nClientes = document.getElementById('clientesCantidad');
    const mensajeEstabilidad = document.getElementById('mensajeEstabilidad');
    const btnAceptar = document.getElementById('btnAceptar'); // Botón aceptar
    const selectedRadioButton = document.querySelector('input[name="cantidadClientes"]:checked');

    
    let selectedIndex;
    if (selectedRadioButton) {
        const selectedValue = selectedRadioButton.value;

        if (selectedValue === 'exactamente') {
            selectedIndex = 1;
        } else if (selectedValue === 'alMenos') {
            selectedIndex = 2;
        } else if (selectedValue === 'maximo') {
            selectedIndex = 3;
        }
    }

    let valid = true;
    mensajeEstabilidad.style.display = 'none';

    btnAceptar.addEventListener('click', function () {
        mensajeEstabilidad.style.display = 'none';
    });

    if (selectedItem === 0 || selectedItem === 2) {
        if (!tasaLlegada.value) {
            tasaLlegada.style.border = "1px solid red";
            valid = false;
        }

        if (!tasaServicio.value) {
            tasaServicio.style.border = "1px solid red";
            valid = false;
        }
        if (selectItem === 2) {
            if (!desviacionEstandar.value) {
                desviacionEstandar.style.border = "1px solid red";
                valid = false;
            }
        }
        if (!nClientes.value) {
            nClientes.style.border = "1px solid red";
            valid = false;
        }
    } else if (selectedItem === 1 || selectedItem === 3) {
        if (!tasaLlegada.value) {
            tasaLlegada.style.border = "1px solid red";
            valid = false;
        }
        if (!tasaServicio.value) {
            tasaServicio.style.border = "1px solid red";
            valid = false;
        }
        if (!canales.value) {
            canales.style.border = "1px solid red";
            valid = false;
        }
        if (selectItem === 3) {
            if (!desviacionEstandar.value) {
                desviacionEstandar.style.border = "1px solid red";
                valid = false;
            }
        }
        if (!nClientes.value) {
            nClientes.style.border = "1px solid red";
            valid = false;
        }
    } else if (selectedItem === 4) {
        if (!tasaLlegada.value) {
            tasaLlegada.style.border = "1px solid red";
            valid = false;
        }
        if (!tasaServicio.value) {
            tasaServicio.style.border = "1px solid red";
            valid = false;
        }
        if (!canales.value) {
            canales.style.border = "1px solid red";
            valid = false;
        }
        if (!poblacion.value) {
            poblacion.style.border = "1px solid red";
            valid = false;
        }
        if (!nClientes.value) {
            nClientes.style.border = "1px solid red";
            valid = false;
        }
    }
    if (valid) {
        if ((!tasaServicio.value || tasaLlegada.value >= tasaServicio.value) && selectedItem !== 4) {
            mensajeEstabilidad.style.display = 'flex';
            valid = false;
        } else {
            tasaServicio.title = "";
            const resultados = calcularResultados(tasaLlegada.value, tasaServicio.value, canales.value, poblacion.value, desviacionEstandar.value, nClientes.value, selectedIndex);

            document.getElementById('P0').innerText = resultados.P0.toFixed(2);
            document.getElementById('Lq').innerText = resultados.Lq.toFixed(2);
            document.getElementById('L').innerText = resultados.L.toFixed(2);
            document.getElementById('Wq').innerText = resultados.Wq.toFixed(2);
            document.getElementById('W').innerText = resultados.W.toFixed(2);
            document.getElementById('Pw').innerText = resultados.Pw.toFixed(2);
            document.getElementById('Pn').innerText = resultados.Pn.toFixed(2);

            mostrarResultados();
        }

    }
});

function restaurarBordeOriginal(element) {
    element.addEventListener('input', function () {
        element.style.border = "";
    });
}

restaurarBordeOriginal(document.getElementById('tasaLlegada'));
restaurarBordeOriginal(document.getElementById('tasaServicio'));
restaurarBordeOriginal(document.getElementById('canales'));
restaurarBordeOriginal(document.getElementById('poblacion'));
restaurarBordeOriginal(document.getElementById('desviacion'));
restaurarBordeOriginal(document.getElementById('clientesCantidad'));

function mostrarResultados() {
    document.getElementById('resultadoMensaje').style.display = 'none';
    document.getElementById('resultadoContenido').style.display = 'flex';
}
function ocultarResultados() {
    document.getElementById('resultadoMensaje').style.display = 'flex';
    document.getElementById('resultadoContenido').style.display = 'none';
}


function calcularResultados(tasaLlegada, tasaServicio, canales, poblacion, desviacionEstandar, nClientes, selectedIndex) {
    let P0, Lq, L, Wq, W, Pw, Pn;

    tasaLlegada = parseFloat(tasaLlegada);
    tasaServicio = parseFloat(tasaServicio);
    canales = parseFloat(canales);
    poblacion = parseFloat(poblacion);
    desviacionEstandar = parseFloat(desviacionEstandar);
    nClientes = parseFloat(nClientes);
    selectItems = selectedIndex;


    switch (selectedItem) {
        case 0: // tiempos de atención uniformes y 1 unidad de servicio
            P0 = 1 - (tasaLlegada / tasaServicio);
            Lq = (tasaLlegada ** 2) / (tasaServicio * (tasaServicio - tasaLlegada));
            L = Lq + tasaLlegada / tasaServicio;
            Wq = Lq / tasaLlegada;
            W = Wq + (1 / tasaServicio)
            Pw = tasaLlegada / tasaServicio;

            if (selectItems === 1) {
                Pn = P0 * (tasaLlegada / tasaServicio) ** nClientes;
            } else if (selectItems === 2) { //>=  P(n >= )
                let rho = tasaLlegada / tasaServicio;
                Pn = Math.pow(rho, nClientes);
            } else if (selectItems === 3) { // <
                let rho = tasaLlegada / tasaServicio;
                Pn = 1 - Math.pow(rho, nClientes);
            }

            break;

        case 1: // Tiempos de atención uniformes y más de 1 unidad de servicio

            let sumatoria = 0;
            for (let k = 0; k < canales; k++) {
                sumatoria += (1 / factorial(k)) * ((tasaLlegada / tasaServicio) ** k);
            }
            const rho = tasaLlegada / (canales * tasaServicio);
            P0 = 1 / (sumatoria + (1 / factorial(canales)) * ((tasaLlegada / tasaServicio) ** canales) * (1 / (1 - rho)));
            Lq = (P0 * ((tasaLlegada / tasaServicio) ** canales) * tasaLlegada * tasaServicio) / (factorial(canales - 1) * ((canales * tasaServicio) - tasaLlegada) ** 2);
            L = Lq + (tasaLlegada / tasaServicio);
            Wq = Lq / tasaLlegada;
            W = Wq + (1 / tasaServicio);
            Pw = (P0 * (tasaLlegada / tasaServicio) ** canales) / factorial(canales) * (1 / (1 - rho));

            if (selectItems === 1) {
                // P(n = nClientes)
                if (nClientes <= canales) {
                    Pn = (((tasaLlegada / tasaServicio) ** nClientes) / factorial(nClientes)) * P0;
                } else {
                    Pn = (((tasaLlegada / tasaServicio) ** nClientes) / (factorial(canales) * (canales ** (nClientes - canales)))) * P0;
                }
            } else if (selectItems === 2) {
                // P(n >= nClientes)
                let sum = 0;
                for (let k = 0; k < nClientes; k++) {
                    if (k < canales) {
                        sum += (((tasaLlegada / tasaServicio) ** k) / factorial(k)) * P0;
                    } else {
                        sum += (((tasaLlegada / tasaServicio) ** k) / (factorial(canales) * (canales ** (k - canales)))) * P0;
                    }
                }
                Pn = 1 - sum;
            } else if (selectItems === 3) {
                // P(n < nClientes)
                let sum = 0;
                for (let k = 0; k < nClientes; k++) {
                    if (k < canales) {
                        sum += (((tasaLlegada / tasaServicio) ** k) / factorial(k)) * P0;
                    } else {
                        sum += (((tasaLlegada / tasaServicio) ** k) / (factorial(canales) * (canales ** (k - canales)))) * P0;
                    }
                }
                Pn = sum;
            }
            break;

        case 2: // Tiempos de atención variables y 1 unidad de servicio
            P0 = 1 - (tasaLlegada / tasaServicio);
            Lq = (((tasaLlegada ** 2) * (desviacionEstandar ** 2)) + ((tasaLlegada / (tasaServicio)) ** 2)) / (2 * (1 - (tasaLlegada / tasaServicio)));
            L = Lq + (tasaLlegada / tasaServicio);
            Wq = Lq / tasaLlegada;
            W = Wq + (1 / tasaServicio);
            Pw = tasaLlegada / tasaServicio;
            
            if (selectItems === 1) {
                // P(n = nClientes)
                Pn = P0 * ((tasaLlegada / tasaServicio) ** nClientes);
            } else if (selectItems === 2) {
                // P(n >= nClientes)
                Pn = ((tasaLlegada / tasaServicio) ** nClientes);
            } else if (selectItems === 3) {
                // P(n < nClientes)
                Pn = 1 - ((tasaLlegada / tasaServicio) ** nClientes);
            }
            break;

        case 3: // Tiempos de atención variables y más de 1 unidad de servicio
            const c = canales;
            const cv2 = (desviacionEstandar * tasaServicio) ** 2;
            const operacion = tasaLlegada / (c * tasaServicio);
            let sum = 0;
            for (let n = 0; n < c; n++) {
                sum += (c * operacion) ** n / factorial(n);
            }
            P0 = 1 / (sum + (c * operacion) ** c / (factorial(c) * (1 - operacion)));
            const Pc = ((c * operacion) ** c / factorial(c)) * P0 / (1 - operacion);
            Lq = Pc * operacion * (1 + cv2) / (2 * (1 - operacion));
            L = Lq + c * operacion;
            Wq = Lq / tasaLlegada;
            W = Wq + 1 / tasaServicio;
            Pw = Pc;

            if (selectItems === 1) {
                // P(n = nClientes)
                if (nClientes <= c) {
                    Pn = ((c * operacion) ** nClientes / factorial(nClientes)) * P0;
                } else {
                    Pn = ((c * operacion) ** c / factorial(c)) * (operacion ** (nClientes - c)) * P0;
                }
            } else if (selectItems === 2) {
                // P(n >= nClientes)
                let sum = 0;
                for (let k = 0; k < nClientes; k++) {
                    if (k <= c) {
                        sum += ((c * operacion) ** k / factorial(k)) * P0;
                    } else {
                        sum += ((c * operacion) ** c / factorial(c)) * (operacion ** (k - c)) * P0;
                    }
                }
                Pn = 1 - sum;
            } else if (selectItems === 3) {
                // P(n < nClientes)
                let sum = 0;
                for (let k = 0; k < nClientes; k++) {
                    if (k <= c) {
                        sum += ((c * operacion) ** k / factorial(k)) * P0;
                    } else {
                        sum += ((c * operacion) ** c / factorial(c)) * (operacion ** (k - c)) * P0;
                    }
                }
                Pn = sum;
            }
        


            break;


            case 4: // Tiempos de atención uniformes y 1 unidad de servicio y población finita
            const K = poblacion; // K es el tamaño de la población
            const lambda = tasaLlegada;
            const mu = tasaServicio;
            const division = lambda / mu;
        
            // Calculamos todas las probabilidades de estado
            let probEstados = new Array(K + 1).fill(0);
            let sumaTotal = 0;
            for (let i = 0; i <= K; i++) {
                probEstados[i] = factorial(K) / factorial(K - i) * Math.pow(division, i);
                sumaTotal += probEstados[i];
            }
        
            // Normalizamos las probabilidades
            for (let i = 0; i <= K; i++) {
                probEstados[i] /= sumaTotal;
            }
        
            P0 = probEstados[0];
            Pw = 1 - P0;
        
            // Calculamos L y Lq
            L = 0;
            for (let i = 1; i <= K; i++) {
                L += i * probEstados[i];
            }
            Lq = L - (1 - P0);
        
            // Calculamos W y Wq
            W = L / (lambda * (K - L));
            Wq = W - (1 / mu);
        
            if (selectItems === 1) {
                // P(n = nClientes)
                Pn = probEstados[nClientes];
            } else if (selectItems === 2) {
                // P(n >= nClientes)
                Pn = 0;
                for (let i = nClientes; i <= K; i++) {
                    Pn += probEstados[i];
                }
            } else if (selectItems === 3) {
                // P(n < nClientes)
                Pn = 0;
                for (let i = 0; i < nClientes; i++) {
                    Pn += probEstados[i];
                }
            }
            break;

        default:
            console.error('selectedItem no válido');
    }

    return { P0, Lq, L, Wq, W, Pw, Pn };
}

function factorial(k) {
    if (k === 0) {
        return 1;
    }
    let result = 1;
    for (let i = 1; i <= k; i++) {
        result *= i;
    }
    return result;
}
