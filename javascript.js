// ===== MOSTRAR SEÇÃO =====
function mostrarSeção() {
    const tipo = document.getElementById('tipoEquacao').value;
    document.querySelectorAll('.secao').forEach(s => s.style.display = 'none');
    if (tipo) document.getElementById(tipo).style.display = 'block';
}

// ===== MODO ESCURO =====
document.getElementById("toggleTheme").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});

// Solucionador de Equações Avançado com MathJax

// Função para renderizar MathJax após atualizar conteúdo
function renderMathJax() {
    if (window.MathJax) {
        MathJax.typeset();
    }
}

// ===== FUNÇÃO PARA ANALISAR EXPRESSÕES MATEMÁTICAS =====
function analisarExpressaoMatematica(expr) {
    if (!expr || expr.trim() === '') return NaN;

    let expressaoProcessada = expr.replace(/\s+/g, '');

    try {
        // Substituir símbolos básicos
        expressaoProcessada = expressaoProcessada.replace(/π/g, 'Math.PI');
        
        // Processar TODAS as raízes quadradas primeiro
        // Padrão: √ seguido de número ou parênteses
        expressaoProcessada = expressaoProcessada.replace(/√(\d+\.?\d*)/g, 'Math.sqrt($1)');
        expressaoProcessada = expressaoProcessada.replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)');
        
        // Processar frações (após processar raízes)
        expressaoProcessada = expressaoProcessada.replace(/(\d+\.?\d*)\/(\d+\.?\d*)/g, function(match) {
            // Verificar se já contém "Math.sqrt" (já foi processado)
            if (match.includes('Math.sqrt')) {
                return match;
            }
            return `(${match})`;
        });

        console.log("Expressão processada:", expressaoProcessada);

        // Avaliar a expressão
        const resultado = eval(expressaoProcessada);
        return typeof resultado === 'number' ? resultado : NaN;

    } catch (erro) {
        console.error("ERROR:", erro);
        return NaN;
    }
}

// ===== FUNÇÃO PARA VALIDAR E CONVERTER INPUT =====
function obterValorMatematico(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return NaN;
    
    const valor = input.value.trim();
    
    // Se estiver vazio
    if (valor === '') {
        if (inputId.includes('exp') || inputId.includes('log') || inputId.includes('trig')) {
            return NaN;
        }
        return 0;
    }
    
    // Tentar como número direto primeiro (para "2", "0.5", etc.)
    const numeroDireto = parseFloat(valor);
    if (!isNaN(numeroDireto) && valor === numeroDireto.toString()) {
        return numeroDireto;
    }
    
    // Se é uma fração simples (como "1/2", "2/3")
    if (/^-?\d+\/-?\d+$/.test(valor)) {
        const partes = valor.split('/');
        const numerador = parseFloat(partes[0]);
        const denominador = parseFloat(partes[1]);
        if (denominador !== 0 && !isNaN(numerador) && !isNaN(denominador)) {
            return numerador / denominador;
        }
    }
    
    // Para outras expressões matemáticas (√2, √3/2, etc.)
    return analisarExpressaoMatematica(valor);
}

// ===== FUNÇÃO AUXILIAR PARA FORMATAR DESIGUALDADE =====
function formatarDesigualdade(simbolo) {
    switch(simbolo) {
        case '>': return '&gt;';
        case '<': return '&lt;';
        case '>=': return '&ge;';
        case '<=': return '&le;';
        default: return '=';
    }
}

// ===== FUNÇÕES DE EXEMPLO ATUALIZADAS =====
function usarExemploLinear(a, b, c) {
    document.getElementById('linearA').value = a !== undefined ? a : '';
    document.getElementById('linearB').value = b !== undefined ? b : '';
    document.getElementById('linearC').value = c !== undefined ? c : '';
    document.getElementById('linearInequality').value = '=';
}

function usarExemploQuadratic(a, b, c, d) {
    document.getElementById('quadraticA').value = a !== undefined ? a : '';
    document.getElementById('quadraticB').value = b !== undefined ? b : '';
    document.getElementById('quadraticC').value = c !== undefined ? c : '';
    document.getElementById('quadraticD').value = d !== undefined ? d : '';
    document.getElementById('quadraticInequality').value = '=';
}

function usarExemploCubic(a, b, c, d, e) {
    document.getElementById('cubicA').value = a !== undefined ? a : '';
    document.getElementById('cubicB').value = b !== undefined ? b : '';
    document.getElementById('cubicC').value = c !== undefined ? c : '';
    document.getElementById('cubicD').value = d !== undefined ? d : '';
    document.getElementById('cubicE').value = e !== undefined ? e : '';
}

function usarExemploQuartic(a, b, c, d, e, f) {
    document.getElementById('quarticA').value = a !== undefined ? a : '';
    document.getElementById('quarticB').value = b !== undefined ? b : '';
    document.getElementById('quarticC').value = c !== undefined ? c : '';
    document.getElementById('quarticD').value = d !== undefined ? d : '';
    document.getElementById('quarticE').value = e !== undefined ? e : '';
    document.getElementById('quarticF').value = f !== undefined ? f : '';
}

function usarExemploExponential(Q, Q0, a, t) {
    document.getElementById('expQ').value = Q !== undefined ? Q : '';
    document.getElementById('expQ0').value = Q0 !== undefined ? Q0 : '';
    document.getElementById('expA').value = a !== undefined ? a : '';
    document.getElementById('expT').value = t !== undefined ? t : '';
    document.getElementById('expInequality').value = '=';
}

function usarExemploLogarithmic(base, argument, result) {
    document.getElementById('logBase').value = base !== undefined ? base : '';
    document.getElementById('logArgument').value = argument !== undefined ? argument : '';
    document.getElementById('logResult').value = result !== undefined ? result : '';
    document.getElementById('logInequality').value = '=';
}

function usarExemploTrigonometric(func, angle, value) {
    if (func) document.getElementById('trigFunction').value = func;
    document.getElementById('trigAngle').value = angle !== undefined ? angle : '';
    document.getElementById('trigValue').value = value !== undefined ? value : '';
    document.getElementById('trigInequality').value = '=';
}

// ===== SISTEMA DE NÚMEROS COMPLEXOS =====
class NumeroComplexo {
    constructor(real, imag = 0) {
        this.real = real;
        this.imag = imag;
    }

    // Operações básicas
    adicionar(outro) {
        return new NumeroComplexo(this.real + outro.real, this.imag + outro.imag);
    }

    subtrair(outro) {
        return new NumeroComplexo(this.real - outro.real, this.imag - outro.imag);
    }

    multiplicar(outro) {
        const real = this.real * outro.real - this.imag * outro.imag;
        const imag = this.real * outro.imag + this.imag * outro.real;
        return new NumeroComplexo(real, imag);
    }

    dividir(outro) {
        const denominador = outro.real * outro.real + outro.imag * outro.imag;
        const real = (this.real * outro.real + this.imag * outro.imag) / denominador;
        const imag = (this.imag * outro.real - this.real * outro.imag) / denominador;
        return new NumeroComplexo(real, imag);
    }

    raizQuadrada() {
        const r = Math.sqrt(this.magnitude());
        const theta = this.angulo() / 2;
        return new NumeroComplexo(r * Math.cos(theta), r * Math.sin(theta));
    }

    magnitude() {
        return Math.sqrt(this.real * this.real + this.imag * this.imag);
    }

    angulo() {
        return Math.atan2(this.imag, this.real);
    }

    toString() {
        if (Math.abs(this.imag) < 1e-10) return this.real.toString();
        if (Math.abs(this.real) < 1e-10) return `${this.imag}i`;
        return `${this.real} ${this.imag > 0 ? '+' : '-'} ${Math.abs(this.imag)}i`;
    }
}

// ===== FUNÇÕES AUXILIARES MELHORADAS =====
function encontrarMDC(a, b) {
    a = Math.round(Math.abs(a));
    b = Math.round(Math.abs(b));
    if (b > a) [a, b] = [b, a];
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function simplificarFracao(numerador, denominador) {
    if (denominador === 0) return { numerador: 0, denominador: 1, inteiro: null };
    if (numerador === 0) return { numerador: 0, denominador: 1, inteiro: 0 };
    const mdc = encontrarMDC(Math.abs(numerador), Math.abs(denominador));
    let numSimpl = numerador / mdc;
    let denSimpl = denominador / mdc;
    if (denSimpl === 1) return { numerador: numSimpl, denominador: 1, inteiro: numSimpl };
    if (denSimpl < 0) {
        numSimpl = -numSimpl;
        denSimpl = -denSimpl;
    }
    return { numerador: numSimpl, denominador: denSimpl, inteiro: null };
}

// ===== FUNÇÃO MELHORADA PARA FORMATAR NÚMEROS =====
function formatarNumeroInteiro(numero) {
    if (Math.abs(numero) < 1e-10) return "0";
    
    // Verificar se é inteiro
    if (Math.abs(Math.round(numero) - numero) < 1e-10) {
        return Math.round(numero).toString();
    }
    
    // Verificar se é fração exata
    for (let den = 1; den <= 100; den++) {
        for (let num = -1000; num <= 1000; num++) {
            if (Math.abs(num/den - numero) < 1e-10) {
                const simp = simplificarFracao(num, den);
                if (simp.inteiro !== null) return simp.inteiro.toString();
                if (simp.denominador === 1) return simp.numerador.toString();
                return `\\frac{${simp.numerador}}{${simp.denominador}}`;
            }
        }
    }

    // Para números decimais: verificar se tem mais de 2 casas decimais
    const arredondado = Math.round(numero * 100) / 100;
    const diff = Math.abs(numero - arredondado);
    
    if (diff < 1e-10) {
        // Número tem no máximo 2 casas decimais
        return arredondado.toString();
    } else {
        // Número tem mais de 2 casas decimais - adicionar "..."
        return arredondado.toString() + '...';
    }
}

function formatarFracao(numerador, denominador) {
    const simp = simplificarFracao(numerador, denominador);
    if (simp.inteiro !== null) return simp.inteiro.toString();
    if (simp.denominador === 1) return simp.numerador.toString();
    return `\\frac{${simp.numerador}}{${simp.denominador}}`;
}

function formatarComplexo(real, imag) {
    if (Math.abs(imag) < 1e-10) return formatarNumeroInteiro(real);
    if (Math.abs(real) < 1e-10) {
        if (Math.abs(imag - 1) < 1e-10) return "i";
        if (Math.abs(imag + 1) < 1e-10) return "-i";
        return `${formatarNumeroInteiro(imag)}i`;
    }
    
    const realStr = formatarNumeroInteiro(real);
    let imagStr = formatarNumeroInteiro(Math.abs(imag));
    if (imagStr === "1") imagStr = "";
    else if (imagStr === "-1") imagStr = "";
    
    const sinal = imag > 0 ? "+" : "-";
    return `${realStr} ${sinal} ${imagStr}i`;
}

// ===== FUNÇÃO AUXILIAR PARA RESOLVER INEQUALIDADES LINEARES =====
function resolverInequacaoLinear(a, b, c, simbolo) {
    let solucao = '';
    const x = (c - b) / a;
    
    if (Math.abs(a) < 1e-10) {
        // Coeficiente angular zero
        const constante = c - b;
        if (simbolo === '=') return constante === 0 ? '∀ x ∈ ℝ' : 'Sem solução';
        if (simbolo === '>') return constante > 0 ? '∀ x ∈ ℝ' : 'Sem solução';
        if (simbolo === '<') return constante < 0 ? '∀ x ∈ ℝ' : 'Sem solução';
        if (simbolo === '>=') return constante >= 0 ? '∀ x ∈ ℝ' : 'Sem solução';
        if (simbolo === '<=') return constante <= 0 ? '∀ x ∈ ℝ' : 'Sem solução';
    }
    
    if (a > 0) {
        switch(simbolo) {
            case '=': solucao = `x = ${formatarNumeroInteiro(x)}`; break;
            case '>': solucao = `x > ${formatarNumeroInteiro(x)}`; break;
            case '<': solucao = `x < ${formatarNumeroInteiro(x)}`; break;
            case '>=': solucao = `x ≥ ${formatarNumeroInteiro(x)}`; break;
            case '<=': solucao = `x ≤ ${formatarNumeroInteiro(x)}`; break;
        }
    } else {
        // a < 0 - inverte o sinal da desigualdade
        switch(simbolo) {
            case '=': solucao = `x = ${formatarNumeroInteiro(x)}`; break;
            case '>': solucao = `x < ${formatarNumeroInteiro(x)}`; break;
            case '<': solucao = `x > ${formatarNumeroInteiro(x)}`; break;
            case '>=': solucao = `x ≤ ${formatarNumeroInteiro(x)}`; break;
            case '<=': solucao = `x ≥ ${formatarNumeroInteiro(x)}`; break;
        }
    }
    
    return solucao;
}

// ===== EQUAÇÃO LINEAR COM DESIGUALDADES =====
function formatarEquacaoLinear(a, b, c, simbolo) {
    let esquerda = '';
    if (a !== 0) {
        if (a === 1) esquerda += 'x';
        else if (a === -1) esquerda += '-x';
        else esquerda += `${formatarNumeroInteiro(a)}x`;
    }
    if (b > 0) esquerda += ` + ${formatarNumeroInteiro(b)}`;
    else if (b < 0) esquerda += ` - ${formatarNumeroInteiro(-b)}`;
    return `$$${esquerda || '0'} ${formatarDesigualdade(simbolo)} ${formatarNumeroInteiro(c)}$$`;
}

function resolverLinear() {
    const a = obterValorMatematico('linearA');
    const b = obterValorMatematico('linearB');
    const c = obterValorMatematico('linearC');
    const simbolo = document.getElementById('linearInequality').value;
    const divPassos = document.getElementById('passos');
    divPassos.innerHTML = '';
    
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        divPassos.innerHTML = `<p style="color:red;">❌ Invalid mathematical expression.</p>`;
        renderMathJax();
        return;
    }

    if (a === 0 && b === 0 && c === 0) {
        divPassos.innerHTML = `<p style="color:orange;">⚠️ Please enter the coefficients</p>`;
        renderMathJax();
        return;
    }

    try {
        divPassos.innerHTML += `<div class="step"><p><strong>Step 1: Inequality</strong></p>`;
        divPassos.innerHTML += `<p>${formatarEquacaoLinear(a, b, c, simbolo)}</p></div>`;

        if (a === 0) {
            divPassos.innerHTML += `<div class="step"><p><strong>Step 2: Analysis</strong></p>`;
            const constante = c - b;
            
            if (simbolo === '=') {
                divPassos.innerHTML += `<p>$$0 ${formatarDesigualdade(simbolo)} ${formatarNumeroInteiro(constante)}$$</p>`;
                if (constante === 0) {
                    divPassos.innerHTML += `<p>✅ True for all x ∈ ℝ</p>`;
                } else {
                    divPassos.innerHTML += `<p>❌ No solution</p>`;
                }
            } else {
                divPassos.innerHTML += `<p>$$${formatarNumeroInteiro(constante)} ${formatarDesigualdade(simbolo)} 0$$</p>`;
                const resultado = eval(`${constante} ${simbolo} 0`);
                if (resultado) {
                    divPassos.innerHTML += `<p>✅ True for all x ∈ ℝ</p>`;
                } else {
                    divPassos.innerHTML += `<p>❌ No solution</p>`;
                }
            }
            renderMathJax();
            return;
        }

        divPassos.innerHTML += `<div class="step"><p><strong>Step 2: Isolate x</strong></p>`;
        divPassos.innerHTML += `<p>$$${formatarNumeroInteiro(a)}x ${formatarDesigualdade(simbolo)} ${formatarNumeroInteiro(c - b)}$$</p>`;

        divPassos.innerHTML += `<div class="step"><p><strong>Step 3: Solve for x</strong></p>`;
        
        const x = (c - b) / a;
        if (a === 1 || a === -1) {
            if (a === 1) {
                divPassos.innerHTML += `<p>$$x ${formatarDesigualdade(simbolo)} ${formatarNumeroInteiro(c - b)}$$</p>`;
            } else {
                // Multiplicar por -1 inverte desigualdade
                let novoSímbolo = simbolo;
                if (simbolo === '>') novoSímbolo = '<';
                if (simbolo === '<') novoSímbolo = '>';
                if (simbolo === '>=') novoSímbolo = '<=';
                if (simbolo === '<=') novoSímbolo = '>=';
                divPassos.innerHTML += `<p>$$x ${formatarDesigualdade(novoSímbolo)} ${formatarNumeroInteiro(b - c)}$$</p>`;
            }
        } else {
            divPassos.innerHTML += `<p>$$x ${formatarDesigualdade(simbolo)} \\frac{${formatarNumeroInteiro(c - b)}}{${formatarNumeroInteiro(a)}}$$</p>`;
            divPassos.innerHTML += `<p>$$x ${formatarDesigualdade(simbolo)} ${formatarNumeroInteiro(x)}$$</p>`;
        }

        divPassos.innerHTML += `<div class="step"><p><strong>Step 4: Solution Set</strong></p>`;
        const solucao = resolverInequacaoLinear(a, b, c, simbolo);
        divPassos.innerHTML += `<p><strong>$$${solucao}$$</strong></p>`;
        
        // Mostrar em notação de intervalo
        if (simbolo !== '=') {
            divPassos.innerHTML += `<p><strong>Interval notation:</strong> `;
            if (a > 0) {
                switch(simbolo) {
                    case '>': divPassos.innerHTML += `$$(${formatarNumeroInteiro(x)}, \\infty)$$`; break;
                    case '<': divPassos.innerHTML += `$$(-\\infty, ${formatarNumeroInteiro(x)})$$`; break;
                    case '>=': divPassos.innerHTML += `$$[${formatarNumeroInteiro(x)}, \\infty)$$`; break;
                    case '<=': divPassos.innerHTML += `$$(-\\infty, ${formatarNumeroInteiro(x)}]$$`; break;
                }
            } else {
                switch(simbolo) {
                    case '>': divPassos.innerHTML += `$$(-\\infty, ${formatarNumeroInteiro(x)})$$`; break;
                    case '<': divPassos.innerHTML += `$$(${formatarNumeroInteiro(x)}, \\infty)$$`; break;
                    case '>=': divPassos.innerHTML += `$$(-\\infty, ${formatarNumeroInteiro(x)}]$$`; break;
                    case '<=': divPassos.innerHTML += `$$[${formatarNumeroInteiro(x)}, \\infty)$$`; break;
                }
            }
            divPassos.innerHTML += `</p>`;
        }

    } catch (err) {
        divPassos.innerHTML = `<p style="color:red;">Error: ${err}</p>`;
    }
    
    renderMathJax();
}

// ===== FUNÇÃO AUXILIAR PARA RESOLVER INEQUALIDADES QUADRÁTICAS =====
function resolverInequacaoQuadratica(a, b, c, d, simbolo) {
    // Primeiro encontrar as raízes da equação
    const constante = c - d;
    const delta = b * b - 4 * a * constante;
    
    if (delta < 0) {
        // Sem raízes reais
        if (a > 0) {
            // Parábola sempre positiva
            switch(simbolo) {
                case '>':
                case '>=': return '∀ x ∈ ℝ';
                case '=':
                case '<':
                case '<=': return 'No solution';
            }
        } else {
            // Parábola sempre negativa
            switch(simbolo) {
                case '<':
                case '<=': return '∀ x ∈ ℝ';
                case '=':
                case '>':
                case '>=': return 'No solution';
            }
        }
    }
    
    const sqrtDelta = Math.sqrt(delta);
    const x1 = (-b + sqrtDelta) / (2 * a);
    const x2 = (-b - sqrtDelta) / (2 * a);
    
    // Ordenar as raízes
    const raizMenor = Math.min(x1, x2);
    const raizMaior = Math.max(x1, x2);
    
    let solucao = '';
    
    if (a > 0) {
        // Parábola com concavidade para cima
        switch(simbolo) {
            case '=': 
                if (Math.abs(raizMenor - raizMaior) < 1e-10) {
                    return `x = ${formatarNumeroInteiro(raizMenor)}`;
                } else {
                    return `x = ${formatarNumeroInteiro(raizMenor)} \\; \\text{or} \\; x = ${formatarNumeroInteiro(raizMaior)}`;

                }
            case '>':
                if (Math.abs(raizMenor - raizMaior) < 1e-10) {
                    return `x ≠ ${formatarNumeroInteiro(raizMenor)}`;
                } else {
                    return `x < ${formatarNumeroInteiro(raizMenor)} \\; \\lor \\; x > ${formatarNumeroInteiro(raizMaior)}`;

                }
            case '<':
                if (Math.abs(raizMenor - raizMaior) < 1e-10) {
                    return 'No solution';
                } else {
                    return `${formatarNumeroInteiro(raizMenor)} < x < ${formatarNumeroInteiro(raizMaior)}`;
                }
            case '>=':
                if (Math.abs(raizMenor - raizMaior) < 1e-10) {
                    return `∀ x ∈ ℝ`;
                } else {
                    return `x \\le ${formatarNumeroInteiro(raizMenor)} \\; \\lor \\; x \\ge ${formatarNumeroInteiro(raizMaior)}`;

                }
            case '<=':
                if (Math.abs(raizMenor - raizMaior) < 1e-10) {
                    return `x = ${formatarNumeroInteiro(raizMenor)}`;
                } else {
                    return `${formatarNumeroInteiro(raizMenor)} ≤ x ≤ ${formatarNumeroInteiro(raizMaior)}`;
                }
        }
    } else {
        // Parábola com concavidade para baixo
        switch(simbolo) {
            case '=': 
                if (Math.abs(raizMenor - raizMaior) < 1e-10) {
                    return `x = ${formatarNumeroInteiro(raizMenor)}`;
                } else {
                    return `x = ${formatarNumeroInteiro(raizMenor)}  or  x = ${formatarNumeroInteiro(raizMaior)}`;
                }
            case '>':
                if (Math.abs(raizMenor - raizMaior) < 1e-10) {
                    return 'No solution';
                } else {
                    return `${formatarNumeroInteiro(raizMenor)} < x < ${formatarNumeroInteiro(raizMaior)}`;
                }
            case '<':
                if (Math.abs(raizMenor - raizMaior) < 1e-10) {
                    return `x ≠ ${formatarNumeroInteiro(raizMenor)}`;
                } else {
                    return `x < ${formatarNumeroInteiro(raizMenor)}  or  x > ${formatarNumeroInteiro(raizMaior)}`;
                }
            case '>=':
                if (Math.abs(raizMenor - raizMaior) < 1e-10) {
                    return `x = ${formatarNumeroInteiro(raizMenor)}`;
                } else {
                    return `${formatarNumeroInteiro(raizMenor)} ≤ x ≤ ${formatarNumeroInteiro(raizMaior)}`;
                }
            case '<=':
                if (Math.abs(raizMenor - raizMaior) < 1e-10) {
                    return `∀ x ∈ ℝ`;
                } else {
                    return `x ≤ ${formatarNumeroInteiro(raizMenor)}  or  x ≥ ${formatarNumeroInteiro(raizMaior)}`;
                }
        }
    }
    
    return solucao;
}

// ===== EQUAÇÃO QUADRÁTICA COM DESIGUALDADES =====
function formatarEquacaoQuadratica(a, b, c, d, simbolo) {
    let esquerda = '';
    if (a !== 0) {
        if (a === 1) esquerda += 'x^2';
        else if (a === -1) esquerda += '-x^2';
        else esquerda += `${formatarNumeroInteiro(a)}x^2`;
    }
    if (b > 0) esquerda += ` + ${formatarNumeroInteiro(b)}x`;
    else if (b < 0) esquerda += ` - ${formatarNumeroInteiro(-b)}x`;
    if (c > 0) esquerda += ` + ${formatarNumeroInteiro(c)}`;
    else if (c < 0) esquerda += ` - ${formatarNumeroInteiro(-c)}`;
    return `$$${esquerda || '0'} ${formatarDesigualdade(simbolo)} ${formatarNumeroInteiro(d)}$$`;
}

function resolverQuadratic() {
    const a = obterValorMatematico('quadraticA');
    const b = obterValorMatematico('quadraticB');
    const c = obterValorMatematico('quadraticC');
    const d = obterValorMatematico('quadraticD');
    const simbolo = document.getElementById('quadraticInequality').value;
    const divPassos = document.getElementById('quadraticSteps');
    divPassos.innerHTML = '';
    
    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) {
        divPassos.innerHTML = `<p style="color:red;">❌ Invalid mathematical expression.</p>`;
        renderMathJax();
        return;
    }
    
    if (a === 0 && b === 0 && c === 0 && d === 0) {
        divPassos.innerHTML = `<p style="color:orange;">⚠️ Please enter the coefficients</p>`;
        renderMathJax();
        return;
    }
    
    try {
        const constante = c - d;
        divPassos.innerHTML += `<div class="step"><p><strong>Step 1: Inequality</strong></p>`;
        divPassos.innerHTML += `<p>${formatarEquacaoQuadratica(a, b, c, d, simbolo)}</p></div>`;

        divPassos.innerHTML += `<div class="step"><p><strong>Step 2: Standard Form</strong></p>`;
        divPassos.innerHTML += `<p>$$${formatarNumeroInteiro(a)}x^2 + ${formatarNumeroInteiro(b)}x + ${formatarNumeroInteiro(constante)} ${formatarDesigualdade(simbolo)} 0$$</p></div>`;

        if (a === 0) {
            // Equação linear
            divPassos.innerHTML += `<div class="step"><p><strong>Step 3: Linear Case (a = 0)</strong></p>`;
            
            if (b === 0) {
                // Constante apenas
                divPassos.innerHTML += `<p>$$${formatarNumeroInteiro(constante)} ${formatarDesigualdade(simbolo)} 0$$</p>`;
                const resultado = eval(`${constante} ${simbolo} 0`);
                if (resultado) {
                    divPassos.innerHTML += `<p>✅ True for all x ∈ ℝ</p>`;
                } else {
                    divPassos.innerHTML += `<p>❌ No solution</p>`;
                }
            } else {
                // Equação linear
                const solucao = resolverInequacaoLinear(b, 0, -constante, simbolo);
                divPassos.innerHTML += `<p><strong>Solution:</strong> $${solucao}$</p>`;
            }
            renderMathJax();
            return;
        }
        
        // Calcular discriminante
        const delta = b * b - 4 * a * constante;
        divPassos.innerHTML += `<div class="step"><p><strong>Step 3: Calculate Discriminant</strong></p>`;
        divPassos.innerHTML += `<p>$$\\Delta = b^2 - 4ac = (${formatarNumeroInteiro(b)})^2 - 4(${formatarNumeroInteiro(a)})(${formatarNumeroInteiro(constante)}) = ${formatarNumeroInteiro(delta)}$$</p></div>`;
        
        if (delta < 0) {
            divPassos.innerHTML += `<div class="step"><p><strong>Step 4: No Real Roots</strong></p>`;
            divPassos.innerHTML += `<p>Since $\\Delta < 0$, the quadratic has no real roots.</p>`;
            
            if (a > 0) {
                divPassos.innerHTML += `<p>The parabola opens upward and is always positive.</p>`;
            } else {
                divPassos.innerHTML += `<p>The parabola opens downward and is always negative.</p>`;
            }
        } else {
            // Encontrar raízes
            const sqrtDelta = Math.sqrt(delta);
            const x1 = (-b + sqrtDelta) / (2 * a);
            const x2 = (-b - sqrtDelta) / (2 * a);
            
            divPassos.innerHTML += `<div class="step"><p><strong>Step 4: Find Roots</strong></p>`;
            if (Math.abs(delta) < 1e-12) {
                // Raiz dupla
                const x = -b / (2 * a);
                divPassos.innerHTML += `<p>Double root: $$x = ${formatarNumeroInteiro(x)}$$</p>`;
            } else {
                divPassos.innerHTML += `<p>Roots: $$x_1 = ${formatarNumeroInteiro(x1)}, \\quad x_2 = ${formatarNumeroInteiro(x2)}$$</p>`;
            }
            
            // Análise do sinal
            divPassos.innerHTML += `<div class="step"><p><strong>Step 5: Sign Analysis</strong></p>`;
            
            const raizMenor = Math.min(x1, x2);
            const raizMaior = Math.max(x1, x2);
            
            if (a > 0) {
                divPassos.innerHTML += `<p>Since $a > 0$, parabola opens upward:</p>`;
                divPassos.innerHTML += `<p>• Positive for: $x < ${formatarNumeroInteiro(raizMenor)}$ or $x > ${formatarNumeroInteiro(raizMaior)}$</p>`;
                divPassos.innerHTML += `<p>• Negative for: $${formatarNumeroInteiro(raizMenor)} < x < ${formatarNumeroInteiro(raizMaior)}$</p>`;
                if (Math.abs(raizMenor - raizMaior) > 1e-10) {
                    divPassos.innerHTML += `<p>• Zero at: $x = ${formatarNumeroInteiro(raizMenor)}$ and $x = ${formatarNumeroInteiro(raizMaior)}$</p>`;
                } else {
                    divPassos.innerHTML += `<p>• Zero at: $x = ${formatarNumeroInteiro(raizMenor)}$ (double root)</p>`;
                }
            } else {
                divPassos.innerHTML += `<p>Since $a < 0$, parabola opens downward:</p>`;
                divPassos.innerHTML += `<p>• Positive for: $${formatarNumeroInteiro(raizMenor)} < x < ${formatarNumeroInteiro(raizMaior)}$</p>`;
                divPassos.innerHTML += `<p>• Negative for: $x < ${formatarNumeroInteiro(raizMenor)}$ or $x > ${formatarNumeroInteiro(raizMaior)}$</p>`;
                if (Math.abs(raizMenor - raizMaior) > 1e-10) {
                    divPassos.innerHTML += `<p>• Zero at: $x = ${formatarNumeroInteiro(raizMenor)}$ and $x = ${formatarNumeroInteiro(raizMaior)}$</p>`;
                } else {
                    divPassos.innerHTML += `<p>• Zero at: $x = ${formatarNumeroInteiro(raizMenor)}$ (double root)</p>`;
                }
            }
        }
        
        divPassos.innerHTML += `<div class="step"><p><strong>Step 6: Solution</strong></p>`;
        const solucao = resolverInequacaoQuadratica(a, b, c, d, simbolo);
        divPassos.innerHTML += `<p><strong>$$${solucao}$$</strong></p>`;
        
        // Mostrar em notação de intervalo
        if (solucao.includes('or')) {
            const partes = solucao.split(' or ');
            divPassos.innerHTML += `<p><strong>Interval notation:</strong> `;
            if (partes[0].includes('< x <')) {
                // Intervalo interno
                const nums = partes[0].match(/[-\d\.]+/g);
                divPassos.innerHTML += `$$(${nums[0]}, ${nums[1]})$$`;
            } else {
                // União de intervalos
                let intervalos = [];
                partes.forEach(parte => {
                    if (parte.includes('x <')) {
                        const num = parte.match(/[-\d\.]+/)[0];
                        intervalos.push(`(-\\infty, ${num})`);
                    } else if (parte.includes('x >')) {
                        const num = parte.match(/[-\d\.]+/)[0];
                        intervalos.push(`(${num}, \\infty)`);
                    } else if (parte.includes('x ≤')) {
                        const num = parte.match(/[-\d\.]+/)[0];
                        intervalos.push(`(-\\infty, ${num}]`);
                    } else if (parte.includes('x ≥')) {
                        const num = parte.match(/[-\d\.]+/)[0];
                        intervalos.push(`[${num}, \\infty)`);
                    } else if (parte.includes('≤ x ≤')) {
                        const nums = parte.match(/[-\d\.]+/g);
                        intervalos.push(`[${nums[0]}, ${nums[1]}]`);
                    }
                });
                divPassos.innerHTML += `$${intervalos.join(' \\cup ')}$`;
            }
            divPassos.innerHTML += `</p>`;
        }

    } catch (err) {
        divPassos.innerHTML = `<p style="color:red;">Error: ${err}</p>`;
    }

    renderMathJax();
}

// ===== EQUAÇÃO CÚBICA (SEM DESIGUALDADES) =====
function formatarEquacaoCubica(a, b, c, d, e) {
    let esquerda = '';
    if (a !== 0) {
        if (a === 1) esquerda += 'x^3';
        else if (a === -1) esquerda += '-x^3';
        else esquerda += `${formatarNumeroInteiro(a)}x^3`;
    }
    if (b > 0) esquerda += ` + ${formatarNumeroInteiro(b)}x^2`;
    else if (b < 0) esquerda += ` - ${formatarNumeroInteiro(-b)}x^2`;
    if (c > 0) esquerda += ` + ${formatarNumeroInteiro(c)}x`;
    else if (c < 0) esquerda += ` - ${formatarNumeroInteiro(-c)}x`;
    if (d > 0) esquerda += ` + ${formatarNumeroInteiro(d)}`;
    else if (d < 0) esquerda += ` - ${formatarNumeroInteiro(-d)}`;
    return `$$${esquerda || '0'} = ${formatarNumeroInteiro(e)}$$`;
}

// Função para resolver equação cúbica usando fórmula de Cardano
function resolverCubicaCardano(a, b, c, d) {
    // Reduzir para forma x³ + px + q = 0
    const p = (3 * a * c - b * b) / (3 * a * a);
    const q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
    
    const discriminante = (q * q / 4) + (p * p * p / 27);

    if (discriminante > 0) {
        // Uma raiz real, duas complexas
        const u = Math.cbrt(-q/2 + Math.sqrt(discriminante));
        const v = Math.cbrt(-q/2 - Math.sqrt(discriminante));

        const raizReal = u + v - b/(3*a);
        const complexReal = -(u + v)/2 - b/(3*a);
        const complexImag = (u - v) * Math.sqrt(3)/2;

        return {
            tipo: 'uma_real_duas_complexas',
            raizReal: raizReal,
            raizComplexa1: { real: complexReal, imag: complexImag },
            raizComplexa2: { real: complexReal, imag: -complexImag }
        };
    } else if (Math.abs(discriminante) < 1e-10) {
        // Três raízes reais (pelo menos duas iguais)
        const u = Math.cbrt(-q/2);
        const raiz1 = 2 * u - b/(3*a);
        const raiz2 = -u - b/(3*a);

        return {
            tipo: 'tres_reais_duas_iguais',
            raiz1: raiz1,
            raiz2: raiz2,
            raiz3: raiz2 // Raiz dupla
        };
    } else {
        // Três raízes real distintas
        const r = Math.sqrt(-p*p*p/27);
        const phi = Math.acos(-q/(2*r));

        const raiz1 = 2 * Math.cbrt(r) * Math.cos(phi/3) - b/(3*a);
        const raiz2 = 2 * Math.cbrt(r) * Math.cos((phi + 2*Math.PI)/3) - b/(3*a);
        const raiz3 = 2 * Math.cbrt(r) * Math.cos((phi + 4*Math.PI)/3) - b/(3*a);

        return {
            tipo: 'tres_reais_distintas',
            raiz1: raiz1,
            raiz2: raiz2,
            raiz3: raiz3
        };
    }
}

function resolverCubic() {
    const a = obterValorMatematico('cubicA');
    const b = obterValorMatematico('cubicB');
    const c = obterValorMatematico('cubicC');
    const d = obterValorMatematico('cubicD');
    const e = obterValorMatematico('cubicE');
    const divPassos = document.getElementById('cubicSteps');
    divPassos.innerHTML = '';

    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || isNaN(e)) {
        divPassos.innerHTML = `<p style="color:red;">❌ Invalid mathematical expression.</p>`;
        renderMathJax();
        return;
    }

    if (a === 0 && b === 0 && c === 0 && d === 0 && e === 0) {
        divPassos.innerHTML = `<p style="color:orange;">⚠️ Please enter the coefficients</p>`;
        renderMathJax();
        return;
    }

    try {
        const constante = d - e;
        divPassos.innerHTML += `<div class="step"><p><strong>Step 1: Equation</strong></p>`;
        divPassos.innerHTML += `<p>${formatarEquacaoCubica(a, b, c, d, e)}</p></div>`;
        
        divPassos.innerHTML += `<div class="step"><p><strong>Step 2: Standard Form</strong></p>`;
        divPassos.innerHTML += `<p>$$${formatarNumeroInteiro(a)}x^3 + ${formatarNumeroInteiro(b)}x^2 + ${formatarNumeroInteiro(c)}x + ${formatarNumeroInteiro(constante)} = 0$$</p></div>`;

        if (a === 0) {
            // Esta é uma equação quadrática
            divPassos.innerHTML += `<div class="step"><p><strong>Step 3: Analysis</strong></p>`;
            divPassos.innerHTML += `<p>This is a quadratic equation ($a = 0$)</p></div>`;
            // Resolver como quadrática
            const delta = b * b - 4 * c * constante;

            divPassos.innerHTML += `<div class="step"><p><strong>Step 4: Calculate Discriminant</strong></p>`;
            divPassos.innerHTML += `<p>$$\\Delta = b^2 - 4ac = (${formatarNumeroInteiro(b)})^2 - 4(${formatarNumeroInteiro(c)})(${formatarNumeroInteiro(constante)}) = ${formatarNumeroInteiro(delta)}$$</p></div>`;

            if (delta < 0) {
                const parteReal = -b / (2 * c);
                const parteImag = Math.sqrt(-delta) / (2 * c);
                divPassos.innerHTML += `<div class="step"><p><strong>Step 5: Complex Roots</strong></p>`;
                divPassos.innerHTML += `<p>$$x_1 = ${formatarComplexo(parteReal, parteImag)}$$</p>`;
                divPassos.innerHTML += `<p>$$x_2 = ${formatarComplexo(parteReal, -parteImag)}$$</p></div>`;
            } else {
                const sqrtDelta = Math.sqrt(delta);
                const x1 = (-b + sqrtDelta) / (2 * c);
                const x2 = (-b - sqrtDelta) / (2 * c);
                divPassos.innerHTML += `<div class="step"><p><strong>Step 5: Real Roots</strong></p>`;
                divPassos.innerHTML += `<p>$$x_1 = ${formatarNumeroInteiro(x1)}$$</p>`;
                divPassos.innerHTML += `<p>$$x_2 = ${formatarNumeroInteiro(x2)}$$</p></div>`;
            }
            renderMathJax();
            return;
        }
        
        // Procurar raízes inteiras usando Teorema das Raízes Racionais
        const raizes = [];
        const raizesPossiveis = [];
        
        // Gerar possíveis raízes racionais
        const fatoresConst = fatoresInteiros(Math.abs(constante));
        const fatoresA = fatoresInteiros(Math.abs(a));
        
        for (const fatorConst of fatoresConst) {
            for (const fatorA of fatoresA) {
                raizesPossiveis.push(fatorConst / fatorA);
                raizesPossiveis.push(-fatorConst / fatorA);
            }
        }

        // Remover duplicatas e ordenar
        const raizesUnicas = [...new Set(raizesPossiveis)].sort((x, y) => Math.abs(x) - Math.abs(y));

        // Testar raízes possíveis
        for (const raiz of raizesUnicas) {
            const valor = a*raiz*raiz*raiz + b*raiz*raiz + c*raiz + constante;
            if (Math.abs(valor) < 1e-8) {
                raizes.push(raiz);
                // Se encontramos 3 raízes, parar a busca
                if (raizes.length === 3) break;
            }
        }

        divPassos.innerHTML += `<div class="step"><p><strong>Step 3: Finding Roots</strong></p>`;
        
        if (raizes.length === 3) {
            divPassos.innerHTML += `<p>Found 3 real roots:</p>`;
            raizes.forEach((raiz, idx) => {
                divPassos.innerHTML += `<p>$$x_{${idx+1}} = ${formatarNumeroInteiro(raiz)}$$</p>`;
            });

            // Mostrar forma fatorada
            divPassos.innerHTML += `<p><strong>Factored Form:</strong></p>`;
            const fatorada = raizes.map(raiz => {
                const absRaiz = Math.abs(raiz);
                const sinal = raiz < 0 ? '+' : '-';
                return `(x ${sinal} ${formatarNumeroInteiro(absRaiz)})`;
            }).join('');
            divPassos.innerHTML += `<p>$$${formatarNumeroInteiro(a)}${fatorada} = 0$$</p>`;
        } else if (raizes.length > 0) {
            divPassos.innerHTML += `<p>Found ${raizes.length} real root(s):</p>`;
            raizes.forEach((raiz, idx) => {
                divPassos.innerHTML += `<p>$$x_{${idx+1}} = ${formatarNumeroInteiro(raiz)}$$</p>`;
            });

            divPassos.innerHTML += `<p><strong>Step 4: Complex Roots Analysis</strong></p>`;
            divPassos.innerHTML += `<p>Using Cardano's method to find all roots...</p>`;

            // Usar método de Cardano para encontrar raízes complexas
            const resultadoCardano = resolverCubicaCardano(a, b, c, constante);

            if (resultadoCardano.tipo === 'uma_real_duas_complexas') {
                divPassos.innerHTML += `<p>Complete solution:</p>`;
                divPassos.innerHTML += `<p>$$x_1 = ${formatarNumeroInteiro(resultadoCardano.raizReal)}$$</p>`;
                divPassos.innerHTML += `<p>$$x_2 = ${formatarComplexo(resultadoCardano.raizComplexa1.real, resultadoCardano.raizComplexa1.imag)}$$</p>`;
                divPassos.innerHTML += `<p>$$x_3 = ${formatarComplexo(resultadoCardano.raizComplexa2.real, resultadoCardano.raizComplexa2.imag)}$$</p>`;
            } else if (resultadoCardano.tipo === 'tres_reais_duas_iguais') {
                divPassos.innerHTML += `<p>Complete solution (double root):</p>`;
                divPassos.innerHTML += `<p>$$x_1 = ${formatarNumeroInteiro(resultadoCardano.raiz1)}$$</p>`;
                divPassos.innerHTML += `<p>$$x_2 = x_3 = ${formatarNumeroInteiro(resultadoCardano.raiz2)}$$</p>`;
            } else {
                divPassos.innerHTML += `<p>Complete solution:</p>`;
                divPassos.innerHTML += `<p>$$x_1 = ${formatarNumeroInteiro(resultadoCardano.raiz1)}$$</p>`;
                divPassos.innerHTML += `<p>$$x_2 = ${formatarNumeroInteiro(resultadoCardano.raiz2)}$$</p>`;
                divPassos.innerHTML += `<p>$$x_3 = ${formatarNumeroInteiro(resultadoCardano.raiz3)}$$</p>`;
            }
        } else {
            divPassos.innerHTML += `<p>No simple rational roots found.</p>`;
            divPassos.innerHTML += `<p><strong>Step 4: Using Cardano's Method</strong></p>`;

            // Usar método de Cardano
            const resultadoCardano = resolverCubicaCardano(a, b, c, constante);

            if (resultadoCardano.tipo === 'uma_real_duas_complexas') {
                divPassos.innerHTML += `<p>The equation has one real root and two complex roots:</p>`;
                divPassos.innerHTML += `<p>$$x_1 = ${formatarNumeroInteiro(resultadoCardano.raizReal)}$$</p>`;
                divPassos.innerHTML += `<p>$$x_2 = ${formatarComplexo(resultadoCardano.raizComplexa1.real, resultadoCardano.raizComplexa1.imag)}$$</p>`;
                divPassos.innerHTML += `<p>$$x_3 = ${formatarComplexo(resultadoCardano.raizComplexa2.real, resultadoCardano.raizComplexa2.imag)}$$</p>`;
            } else if (resultadoCardano.tipo === 'tres_reais_duas_iguais') {
                divPassos.innerHTML += `<p>The equation has three real roots (double root):</p>`;
                divPassos.innerHTML += `<p>$$x_1 = ${formatarNumeroInteiro(resultadoCardano.raiz1)}$$</p>`;
                divPassos.innerHTML += `<p>$$x_2 = x_3 = ${formatarNumeroInteiro(resultadoCardano.raiz2)}$$</p>`;
            } else {
                divPassos.innerHTML += `<p>The equation has three distinct real roots:</p>`;
                divPassos.innerHTML += `<p>$$x_1 = ${formatarNumeroInteiro(resultadoCardano.raiz1)}$$</p>`;
                divPassos.innerHTML += `<p>$$x_2 = ${formatarNumeroInteiro(resultadoCardano.raiz2)}$$</p>`;
                divPassos.innerHTML += `<p>$$x_3 = ${formatarNumeroInteiro(resultadoCardano.raiz3)}$$</p>`;
            }
        }
        
    } catch (err) {
        divPassos.innerHTML = `<p style="color:red;">Error: ${err}</p>`;
    }
    
    renderMathJax();
}

// ===== EQUAÇÃO QUÁRTICA SIMPLES (SEM DESIGUALDADES) =====
function formatarEquacaoQuartica(a, b, c, d, e, f_val) {
    let esquerda = '';
    if (a !== 0) {
        if (a === 1) esquerda += 'x^4';
        else if (a === -1) esquerda += '-x^4';
        else esquerda += `${formatarNumeroInteiro(a)}x^4`;
    }
    if (b > 0) esquerda += ` + ${formatarNumeroInteiro(b)}x^3`;
    else if (b < 0) esquerda += ` - ${formatarNumeroInteiro(-b)}x^3`;
    if (c > 0) esquerda += ` + ${formatarNumeroInteiro(c)}x^2`;
    else if (c < 0) esquerda += ` - ${formatarNumeroInteiro(-c)}x^2`;
    if (d > 0) esquerda += ` + ${formatarNumeroInteiro(d)}x`;
    else if (d < 0) esquerda += ` - ${formatarNumeroInteiro(-d)}x`;
    if (e > 0) esquerda += ` + ${formatarNumeroInteiro(e)}`;
    else if (e < 0) esquerda += ` - ${formatarNumeroInteiro(-e)}`;
    return `$$${esquerda || '0'} = ${formatarNumeroInteiro(f_val)}$$`;
}

// Função simples para encontrar raízes reais
function encontrarRaizesReaisQuartic(a, b, c, d, e) {
    const raizes = [];

    // Função para calcular f(x)
    const f = (x) => a*x*x*x*x + b*x*x*x + c*x*x + d*x + e;
    
    // Procurar raízes em um intervalo
    for (let x = -10; x <= 10; x += 0.1) {
        const valor = f(x);

        // Se encontrou uma raiz aproximada
        if (Math.abs(valor) < 0.1) {
            // Refinar a raiz
            let raizRefinada = x;
            for (let i = 0; i < 10; i++) {
                const f_val = f(raizRefinada);
                const df = 4*a*raizRefinada*raizRefinada*raizRefinada + 
                          3*b*raizRefinada*raizRefinada + 
                          2*c*raizRefinada + d;

                if (Math.abs(df) < 1e-12) break;

                const novaRaiz = raizRefinada - f_val / df;

                if (Math.abs(novaRaiz - raizRefinada) < 1e-12) {
                    raizRefinada = novaRaiz;
                    break;
                }
                raizRefinada = novaRaiz;
            }
            
            // Verificar se é uma nova raiz
            const novaRaiz = true;
            for (const r of raizes) {
                if (Math.abs(r - raizRefinada) < 0.01) {
                    novaRaiz = false;
                    break;
                }
            }

            if (novaRaiz && Math.abs(f(raizRefinada)) < 0.1) {
                raizes.push(raizRefinada);
                if (raizes.length >= 4) break;
            }
        }
    }

    return raizes;
}

function resolverQuartic() {
    const a = obterValorMatematico('quarticA');
    const b = obterValorMatematico('quarticB');
    const c = obterValorMatematico('quarticC');
    const d = obterValorMatematico('quarticD');
    const e = obterValorMatematico('quarticE');
    const f_val = obterValorMatematico('quarticF');
    const divPassos = document.getElementById('quarticSteps');
    divPassos.innerHTML = '';
    
    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || isNaN(e) || isNaN(f_val)) {
        divPassos.innerHTML = `<p style="color:red;">❌ Invalid mathematical expression.</p>`;
        renderMathJax();
        return;
    }
    
    if (a === 0 && b === 0 && c === 0 && d === 0 && e === 0 && f_val === 0) {
        divPassos.innerHTML = `<p style="color:orange;">⚠️ Please enter the coefficients</p>`;
        renderMathJax();
        return;
    }

    try {
        const constante = e - f_val;
        divPassos.innerHTML += `<div class="step"><p><strong>Step 1: Equation</strong></p>`;
        divPassos.innerHTML += `<p>${formatarEquacaoQuartica(a, b, c, d, e, f_val)}</p></div>`;

        divPassos.innerHTML += `<div class="step"><p><strong>Step 2: Standard Form</strong></p>`;
        divPassos.innerHTML += `<p>$$${formatarNumeroInteiro(a)}x^4 + ${formatarNumeroInteiro(b)}x^3 + ${formatarNumeroInteiro(c)}x^2 + ${formatarNumeroInteiro(d)}x + ${formatarNumeroInteiro(constante)} = 0$$</p></div>`;

        if (a === 0) {
            // Equação cúbica
            divPassos.innerHTML += `<div class="step"><p><strong>Step 3: Analysis</strong></p>`;
            divPassos.innerHTML += `<p>This is a cubic equation ($a = 0$)</p></div>`;
            const raizes = encontrarRaizesCubicas(b, c, d, constante);
            if (raizes.length > 0) {
                raizes.forEach((raiz, idx) => {
                    divPassos.innerHTML += `<p>$$x_{${idx+1}} = ${formatarNumeroInteiro(raiz)}$$</p>`;
                });
            } else {
                divPassos.innerHTML += `<p>No real roots found.</p>`;
            }
            renderMathJax();
            return;
        }

        divPassos.innerHTML += `<div class="step"><p><strong>Step 3: Finding Real Roots</strong></p>`;

        const raizes = encontrarRaizesReaisQuartic(a, b, c, d, constante);

        if (raizes.length > 0) {
            divPassos.innerHTML += `<p>Found ${raizes.length} real root(s):</p>`;
            raizes.forEach((raiz, idx) => {
                divPassos.innerHTML += `<p>$$x_{${idx+1}} = ${formatarNumeroInteiro(raiz)}$$</p>`;
            });

            // Mostrar forma fatorada se todas as raízes forem racionais
            if (raizes.length === 4) {
                divPassos.innerHTML += `<p><strong>Factored Form:</strong></p>`;
                const fatorada = raizes.map(raiz => {
                    const absRaiz = Math.abs(raiz);
                    const sinal = raiz < 0 ? '+' : '-';
                    return `(x ${sinal} ${formatarNumeroInteiro(absRaiz)})`;
                }).join('');
                divPassos.innerHTML += `<p>$$${formatarNumeroInteiro(a)}${fatorada} = 0$$</p>`;
            }
        } else {
            divPassos.innerHTML += `<p>No real roots found.</p>`;
            divPassos.innerHTML += `<p><em>Note: The equation may have complex roots, but this solver only displays real roots.</em></p>`;
        }
        
    } catch (err) {
        divPassos.innerHTML = `<p style="color:red;">Error: ${err}</p>`;
    }

    renderMathJax();
}

// ===== EQUAÇÃO EXPONENCIAL COM DESIGUALDADES =====
function formatarEquacaoExponencial(Q, Q0, a, t, simbolo) {
    return `$$${formatarNumeroInteiro(Q)} ${formatarDesigualdade(simbolo)} ${formatarNumeroInteiro(Q0)} \\cdot ${formatarNumeroInteiro(a)}^${formatarNumeroInteiro(t)}$$`;
}

function resolverExponential() {
    const Q = obterValorMatematico('expQ');
    const Q0 = obterValorMatematico('expQ0');
    const a = obterValorMatematico('expA');
    const t = obterValorMatematico('expT');
    const simbolo = document.getElementById('expInequality').value;
    const divPassos = document.getElementById('exponentialSteps');
    divPassos.innerHTML = '';

    // Contar quantos campos estão preenchidos
    const campos = [Q, Q0, a, t];
    const camposPreenchidos = campos.filter(val => !isNaN(val)).length;

    if (camposPreenchidos < 3) {
        divPassos.innerHTML = `<p style="color:orange;">⚠️ Please fill exactly 3 values</p>`;
        renderMathJax();
        return;
    }

    // Verificar restrições
    if (!isNaN(Q0) && Q0 <= 0) {
        divPassos.innerHTML = `<p style="color:red;">❌ Q₀ must be positive</p>`;
        renderMathJax();
        return;
    }
    
    if (!isNaN(a) && a <= 0) {
        divPassos.innerHTML = `<p style="color:red;">❌ Base a must be positive</p>`;
        renderMathJax();
        return;
    }

    try {
        // Determinar qual variável está faltando
        let variavelFaltante = '';
        
        if (isNaN(Q)) variavelFaltante = 'Q';
        else if (isNaN(Q0)) variavelFaltante = 'Q₀';
        else if (isNaN(a)) variavelFaltante = 'a';
        else if (isNaN(t)) variavelFaltante = 't';
        
        divPassos.innerHTML += `<div class="step"><p><strong>Step 1: Inequality</strong></p>`;
        
        let expressao = '';
        if (variavelFaltante === 'Q') {
            expressao = `Q ${formatarDesigualdade(simbolo)} ${formatarNumeroInteiro(Q0)} \\cdot ${formatarNumeroInteiro(a)}^${formatarNumeroInteiro(t)}`;
        }
        else if (variavelFaltante === 'Q₀') {
            expressao = `${formatarNumeroInteiro(Q)} ${formatarDesigualdade(simbolo)} Q₀ \\cdot ${formatarNumeroInteiro(a)}^${formatarNumeroInteiro(t)}`;
        }
        else if (variavelFaltante === 'a') {
            expressao = `${formatarNumeroInteiro(Q)} ${formatarDesigualdade(simbolo)} ${formatarNumeroInteiro(Q0)} \\cdot a^${formatarNumeroInteiro(t)}`;
        }
        else if (variavelFaltante === 't') {
            expressao = `${formatarNumeroInteiro(Q)} ${formatarDesigualdade(simbolo)} ${formatarNumeroInteiro(Q0)} \\cdot ${formatarNumeroInteiro(a)}^t`;
        }
        
        divPassos.innerHTML += `<p>$$${expressao}$$</p></div>`;

        // Resolver para cada caso
        if (isNaN(Q)) {
            // Resolver para Q
            const valorDireito = Q0 * Math.pow(a, t);
            divPassos.innerHTML += `<div class="step"><p><strong>Step 2: Solve for Q</strong></p>`;
            divPassos.innerHTML += `<p>$$Q ${formatarDesigualdade(simbolo)} ${formatarNumeroInteiro(valorDireito)}$$</p>`;
            
            divPassos.innerHTML += `<div class="step"><p><strong>Step 3: Solution</strong></p>`;
            divPassos.innerHTML += `<p>$$Q ${formatarDesigualdade(simbolo)} ${formatarNumeroInteiro(valorDireito)}$$</p>`;
            
            if (simbolo === '>=' || simbolo === '<=') {
                divPassos.innerHTML += `<p><strong>Interval notation:</strong> `;
                if (simbolo === '>=') {
                    divPassos.innerHTML += `$$[${formatarNumeroInteiro(valorDireito)}, \\infty)$$`;
                } else {
                    divPassos.innerHTML += `$$(-\\infty, ${formatarNumeroInteiro(valorDireito)}]$$`;
                }
                divPassos.innerHTML += `</p>`;
            }
        }
        else if (isNaN(Q0)) {
            // Resolver para Q₀
            divPassos.innerHTML += `<div class="step"><p><strong>Step 2: Isolate Q₀</strong></p>`;
            
            const potencia = Math.pow(a, t);
            divPassos.innerHTML += `<p>$$Q_0 ${formatarDesigualdade(simbolo)} \\frac{${formatarNumeroInteiro(Q)}}{${formatarNumeroInteiro(potencia)}}$$</p>`;
            
            const valorCalculado = Q / potencia;
            divPassos.innerHTML += `<div class="step"><p><strong>Step 3: Solution</strong></p>`;
            divPassos.innerHTML += `<p>$$Q_0 ${formatarDesigualdade(simbolo)} ${formatarNumeroInteiro(valorCalculado)}$$</p>`;
            
            // Adicionar restrição de positividade
            divPassos.innerHTML += `<p class="solution-note"><strong>Note:</strong> Since Q₀ represents an initial quantity, it must be positive: Q₀ > 0</p>`;
        }
        else if (isNaN(a)) {
            // Resolver para a
            divPassos.innerHTML += `<div class="step"><p><strong>Step 2: Isolate a</strong></p>`;
            
            const razao = Q / Q0;
            divPassos.innerHTML += `<p>$$a^${formatarNumeroInteiro(t)} ${formatarDesigualdade(simbolo)} ${formatarNumeroInteiro(razao)}$$</p>`;
            
            if (t % 2 === 0) {
                // Expoente par - cuidado com inequações
                divPassos.innerHTML += `<p class="solution-note"><strong>Note:</strong> Since exponent ${formatarNumeroInteiro(t)} is even, we must consider both positive and negative roots for equations, but base a must be positive for exponential functions: a > 0</p>`;
                
                if (simbolo === '=') {
                    divPassos.innerHTML += `<p>$$a = \\sqrt[${formatarNumeroInteiro(t)}]{${formatarNumeroInteiro(razao)}}$$</p>`;
                    const valorCalculado = Math.pow(razao, 1/t);
                    divPassos.innerHTML += `<p>$$a = ${formatarNumeroInteiro(valorCalculado)}$$</p>`;
                } else {
                    divPassos.innerHTML += `<p><strong>Analysis needed for inequality with even exponent.</strong></p>`;
                }
            } else {
                // Expoente ímpar - mais simples
                divPassos.innerHTML += `<p>$$a ${formatarDesigualdade(simbolo)} \\sqrt[${formatarNumeroInteiro(t)}]{${formatarNumeroInteiro(razao)}}$$</p>`;
                const valorCalculado = Math.pow(razao, 1/t);
                divPassos.innerHTML += `<p>$$a ${formatarDesigualdade(simbolo)} ${formatarNumeroInteiro(valorCalculado)}$$</p>`;
            }
            
            divPassos.innerHTML += `<p class="solution-note"><strong>Note:</strong> Base a must be positive for exponential functions: a > 0</p>`;
        }
        else if (isNaN(t)) {
            // Resolver para t usando logaritmos
            divPassos.innerHTML += `<div class="step"><p><strong>Step 2: Apply Logarithms</strong></p>`;
            
            const razao = Q / Q0;
            if (razao <= 0) {
                divPassos.innerHTML += `<p style="color:red;">❌ Ratio Q/Q₀ must be positive</p>`;
                renderMathJax();
                return;
            }
            
            divPassos.innerHTML += `<p>$$${formatarNumeroInteiro(a)}^t ${formatarDesigualdade(simbolo)} ${formatarNumeroInteiro(razao)}$$</p>`;
            
            if (a > 1) {
                // Função crescente - mantém a desigualdade
                divPassos.innerHTML += `<p>Since $a > 1$, the exponential function is increasing.</p>`;
                
                if (simbolo === '=') {
                    divPassos.innerHTML += `<p>$$\\log(${formatarNumeroInteiro(a)}^t) = \\log(${formatarNumeroInteiro(razao)})$$</p>`;
                    divPassos.innerHTML += `<p>$$t \\cdot \\log(${formatarNumeroInteiro(a)}) = \\log(${formatarNumeroInteiro(razao)})$$</p>`;
                    const valorCalculado = Math.log(razao) / Math.log(a);
                    divPassos.innerHTML += `<p>$$t = \\frac{\\log(${formatarNumeroInteiro(razao)})}{\\log(${formatarNumeroInteiro(a)})} = ${formatarNumeroInteiro(valorCalculado)}$$</p>`;
                } else {
                    divPassos.innerHTML += `<p>$$t ${formatarDesigualdade(simbolo)} \\log_{${formatarNumeroInteiro(a)}}(${formatarNumeroInteiro(razao)})$$</p>`;
                    const valorCalculado = Math.log(razao) / Math.log(a);
                    divPassos.innerHTML += `<p>$$t ${formatarDesigualdade(simbolo)} ${formatarNumeroInteiro(valorCalculado)}$$</p>`;
                }
            } else if (a < 1 && a > 0) {
                // Função decrescente - inverte a desigualdade
                divPassos.innerHTML += `<p>Since $0 < a < 1$, the exponential function is decreasing.</p>`;
                
                if (simbolo === '=') {
                    divPassos.innerHTML += `<p>$$t = \\frac{\\log(${formatarNumeroInteiro(razao)})}{\\log(${formatarNumeroInteiro(a)})}$$</p>`;
                    const valorCalculado = Math.log(razao) / Math.log(a);
                    divPassos.innerHTML += `<p>$$t = ${formatarNumeroInteiro(valorCalculado)}$$</p>`;
                } else {
                    let novoSímbolo = simbolo;
                    if (simbolo === '>') novoSímbolo = '<';
                    if (simbolo === '<') novoSímbolo = '>';
                    if (simbolo === '>=') novoSímbolo = '<=';
                    if (simbolo === '<=') novoSímbolo = '>=';
                    
                    divPassos.innerHTML += `<p>$$t ${formatarDesigualdade(novoSímbolo)} \\log_{${formatarNumeroInteiro(a)}}(${formatarNumeroInteiro(razao)})$$</p>`;
                    const valorCalculado = Math.log(razao) / Math.log(a);
                    divPassos.innerHTML += `<p>$$t ${formatarDesigualdade(novoSímbolo)} ${formatarNumeroInteiro(valorCalculado)}$$</p>`;
                }
            }
        }

    } catch (err) {
        divPassos.innerHTML = `<p style="color:red;">Error: ${err}</p>`;
    }
    
    renderMathJax();
}

// ===== EQUAÇÃO LOGARÍTMICA COM DESIGUALDADES =====
function formatarEquacaoLogaritmica(base, argument, result, simbolo) {
    return `$$\\log_{${formatarNumeroInteiro(base)}}(${formatarNumeroInteiro(argument)}) ${formatarDesigualdade(simbolo)} ${formatarNumeroInteiro(result)}$$`;
}

function resolverLogarithmic() {
    const base = obterValorMatematico('logBase');
    const argument = obterValorMatematico('logArgument');
    const result = obterValorMatematico('logResult');
    const simbolo = document.getElementById('logInequality').value;
    const divPassos = document.getElementById('logarithmicSteps');
    divPassos.innerHTML = '';
    
    // Contar quantos campos estão preenchidos
    const campos = [base, argument, result];
    const camposPreenchidos = campos.filter(val => !isNaN(val)).length;
    
    if (camposPreenchidos < 2) {
        divPassos.innerHTML = `<p style="color:orange;">⚠️ Please fill exactly 2 values</p>`;
        renderMathJax();
        return;
    }
    
    // Verificar restrições
    if (!isNaN(base) && (base <= 0 || base === 1)) {
        divPassos.innerHTML = `<p style="color:red;">❌ Base must be positive and ≠ 1</p>`;
        renderMathJax();
        return;
    }
    
    if (!isNaN(argument) && argument <= 0) {
        divPassos.innerHTML = `<p style="color:red;">❌ Argument must be positive</p>`;
        renderMathJax();
        return;
    }

    try {
        divPassos.innerHTML += `<div class="step"><p><strong>Step 1: Inequality</strong></p>`;
        
        // Determinar qual variável está faltando
        let expressao = '';
        
        if (isNaN(base)) {
            expressao = `\\log_b(${formatarNumeroInteiro(argument)}) ${formatarDesigualdade(simbolo)} ${formatarNumeroInteiro(result)}`;
        }
        else if (isNaN(argument)) {
            expressao = `\\log_{${formatarNumeroInteiro(base)}}(x) ${formatarDesigualdade(simbolo)} ${formatarNumeroInteiro(result)}`;
        }
        else if (isNaN(result)) {
            expressao = `\\log_{${formatarNumeroInteiro(base)}}(${formatarNumeroInteiro(argument)}) ${formatarDesigualdade(simbolo)} x`;
        }
        
        divPassos.innerHTML += `<p>$$${expressao}$$</p></div>`;

        // Resolver para cada caso
        if (isNaN(base)) {
            // Resolver para base
            divPassos.innerHTML += `<div class="step"><p><strong>Step 2: Convert to Exponential Form</strong></p>`;
            
            if (simbolo === '=') {
                divPassos.innerHTML += `<p>$$b^{${formatarNumeroInteiro(result)}} = ${formatarNumeroInteiro(argument)}$$</p>`;
                const valorCalculado = Math.pow(argument, 1/result);
                divPassos.innerHTML += `<p>$$b = \\sqrt[${formatarNumeroInteiro(result)}]{${formatarNumeroInteiro(argument)}} = ${formatarNumeroInteiro(valorCalculado)}$$</p>`;
            } else {
                divPassos.innerHTML += `<p><strong>Analysis for logarithmic inequalities with unknown base:</strong></p>`;
                divPassos.innerHTML += `<p>We need to consider cases based on whether b > 1 or 0 < b < 1.</p>`;
                
                if (result > 0) {
                    divPassos.innerHTML += `<p>Since the logarithm result is positive (${formatarNumeroInteiro(result)} > 0):</p>`;
                    divPassos.innerHTML += `<p>• If b > 1: $b > \\sqrt[${formatarNumeroInteiro(result)}]{${formatarNumeroInteiro(argument)}}$</p>`;
                    divPassos.innerHTML += `<p>• If 0 < b < 1: $b < \\sqrt[${formatarNumeroInteiro(result)}]{${formatarNumeroInteiro(argument)}}$</p>`;
                } else if (result < 0) {
                    divPassos.innerHTML += `<p>Since the logarithm result is negative (${formatarNumeroInteiro(result)} < 0):</p>`;
                    divPassos.innerHTML += `<p>• If b > 1: $b < \\sqrt[${formatarNumeroInteiro(result)}]{${formatarNumeroInteiro(argument)}}$</p>`;
                    divPassos.innerHTML += `<p>• If 0 < b < 1: $b > \\sqrt[${formatarNumeroInteiro(result)}]{${formatarNumeroInteiro(argument)}}$</p>`;
                }
            }
            
            divPassos.innerHTML += `<p class="solution-note"><strong>Note:</strong> Base b must satisfy: b > 0 and b ≠ 1</p>`;
        }
        else if (isNaN(argument)) {
            // Resolver para argumento
            divPassos.innerHTML += `<div class="step"><p><strong>Step 2: Convert to Exponential Form</strong></p>`;
            
            if (base > 1) {
                // Função logarítmica crescente
                if (simbolo === '=') {
                    divPassos.innerHTML += `<p>$$x = ${formatarNumeroInteiro(base)}^{${formatarNumeroInteiro(result)}}$$</p>`;
                    const valorCalculado = Math.pow(base, result);
                    divPassos.innerHTML += `<p>$$x = ${formatarNumeroInteiro(valorCalculado)}$$</p>`;
                } else {
                    divPassos.innerHTML += `<p>Since base ${formatarNumeroInteiro(base)} > 1, the logarithmic function is increasing.</p>`;
                    divPassos.innerHTML += `<p>$$x ${formatarDesigualdade(simbolo)} ${formatarNumeroInteiro(base)}^{${formatarNumeroInteiro(result)}}$$</p>`;
                    const valorCalculado = Math.pow(base, result);
                    divPassos.innerHTML += `<p>$$x ${formatarDesigualdade(simbolo)} ${formatarNumeroInteiro(valorCalculado)}$$</p>`;
                }
            } else if (base < 1 && base > 0) {
                // Função logarítmica decrescente
                if (simbolo === '=') {
                    divPassos.innerHTML += `<p>$$x = ${formatarNumeroInteiro(base)}^{${formatarNumeroInteiro(result)}}$$</p>`;
                    const valorCalculado = Math.pow(base, result);
                    divPassos.innerHTML += `<p>$$x = ${formatarNumeroInteiro(valorCalculado)}$$</p>`;
                } else {
                    divPassos.innerHTML += `<p>Since 0 < base ${formatarNumeroInteiro(base)} < 1, the logarithmic function is decreasing.</p>`;
                    let novoSímbolo = simbolo;
                    if (simbolo === '>') novoSímbolo = '<';
                    if (simbolo === '<') novoSímbolo = '>';
                    if (simbolo === '>=') novoSímbolo = '<=';
                    if (simbolo === '<=') novoSímbolo = '>=';
                    
                    divPassos.innerHTML += `<p>$$x ${formatarDesigualdade(novoSímbolo)} ${formatarNumeroInteiro(base)}^{${formatarNumeroInteiro(result)}}$$</p>`;
                    const valorCalculado = Math.pow(base, result);
                    divPassos.innerHTML += `<p>$$x ${formatarDesigualdade(novoSímbolo)} ${formatarNumeroInteiro(valorCalculado)}$$</p>`;
                }
            }
            
            divPassos.innerHTML += `<p class="solution-note"><strong>Note:</strong> Argument x must be positive: x > 0</p>`;
        }
        else if (isNaN(result)) {
            // Resolver para resultado
            divPassos.innerHTML += `<div class="step"><p><strong>Step 2: Calculate Result</strong></p>`;
            
            const valorCalculado = Math.log(argument) / Math.log(base);
            
            if (simbolo === '=') {
                divPassos.innerHTML += `<p>$$x = \\log_{${formatarNumeroInteiro(base)}}(${formatarNumeroInteiro(argument)})$$</p>`;
                divPassos.innerHTML += `<p>$$x = \\frac{\\log(${formatarNumeroInteiro(argument)})}{\\log(${formatarNumeroInteiro(base)})} = ${formatarNumeroInteiro(valorCalculado)}$$</p>`;
            } else {
                divPassos.innerHTML += `<p>$$x ${formatarDesigualdade(simbolo)} \\log_{${formatarNumeroInteiro(base)}}(${formatarNumeroInteiro(argument)})$$</p>`;
                divPassos.innerHTML += `<p>$$x ${formatarDesigualdade(simbolo)} ${formatarNumeroInteiro(valorCalculado)}$$</p>`;
            }
        }

    } catch (err) {
        divPassos.innerHTML = `<p style="color:red;">Error: ${err}</p>`;
    }

    renderMathJax();
}

// ===== FUNÇÕES PARA TRIGONOMETRIA =====
function paraRadianos(graus) {
    return graus * Math.PI / 180;
}

function paraGraus(radianos) {
    return radianos * 180 / Math.PI;
}

function formatarComoFracaoPi(radianos) {
    if (Math.abs(radianos) < 1e-10) return "0";
    
    // Verificar se é múltiplo de π
    const multiplo = radianos / Math.PI;
    
    // Tentar encontrar frações comuns
    const fracoes = [
        {valor: 1/6, texto: "π/6"}, {valor: 1/4, texto: "π/4"}, {valor: 1/3, texto: "π/3"},
        {valor: 1/2, texto: "π/2"}, {valor: 2/3, texto: "2π/3"}, {valor: 3/4, texto: "3π/4"},
        {valor: 5/6, texto: "5π/6"}, {valor: 1, texto: "π"}, {valor: 4/3, texto: "4π/3"},
        {valor: 3/2, texto: "3π/2"}, {valor: 5/3, texto: "5π/3"}, {valor: 7/4, texto: "7π/4"},
        {valor: 11/6, texto: "11π/6"}, {valor: 2, texto: "2π"}
    ];
    
    for (const fracao of fracoes) {
        if (Math.abs(multiplo - fracao.valor) < 1e-10) {
            return fracao.texto;
        }
        if (Math.abs(multiplo + fracao.valor) < 1e-10) {
            return `-${fracao.texto}`;
        }
    }

    // Se não for fração comum, retornar decimal
    return `${formatarNumeroInteiro(radianos)}`;
}

function encontrarSolucoesTrigonometricas(func, valor, resolverParaX) {
    const solucoes = [];
    
    if (resolverParaX) {
        // Resolver para o ângulo (x)
        switch(func) {
            case 'sin':
                // sin(x) = valor
                if (valor < -1 || valor > 1) {
                    return []; // Sem solução real
                }
                const principalSin = Math.asin(valor);
                solucoes.push(principalSin);
                solucoes.push(Math.PI - principalSin);
                break;
                
            case 'cos':
                // cos(x) = valor
                if (valor < -1 || valor > 1) {
                    return []; // Sem solução real
                }
                const principalCos = Math.acos(valor);
                solucoes.push(principalCos);
                solucoes.push(-principalCos);
                break;
                
            case 'tan':
                // tan(x) = valor
                const principalTan = Math.atan(valor);
                solucoes.push(principalTan);
                break;
                
            case 'sec':
                // sec(x) = valor => cos(x) = 1/valor
                if (Math.abs(valor) < 1e-10 || Math.abs(1/valor) > 1) {
                    return []; // Sem solução real
                }
                const principalSec = Math.acos(1/valor);
                solucoes.push(principalSec);
                solucoes.push(-principalSec);
                break;
                
            case 'csc':
                // csc(x) = valor => sin(x) = 1/valor
                if (Math.abs(valor) < 1e-10 || Math.abs(1/valor) > 1) {
                    return []; // Sem solução real
                }
                const principalCsc = Math.asin(1/valor);
                solucoes.push(principalCsc);
                solucoes.push(Math.PI - principalCsc);
                break;
                
            case 'cot':
                // cot(x) = valor => tan(x) = 1/valor
                if (Math.abs(valor) < 1e-10) {
                    // cot(x) = 0 => x = π/2 + kπ
                    solucoes.push(Math.PI/2);
                } else {
                    const principalCot = Math.atan(1/valor);
                    solucoes.push(principalCot);
                }
                break;
        }
        
        // Gerar soluções periódicas (0 a 2π)
        const todasSolucoes = [];
        const periodo = func === 'tan' || func === 'cot' ? Math.PI : 2 * Math.PI;

        solucoes.forEach(sol => {
            // Normalizar para [0, 2π)
            let solNormalizada = sol % periodo;
            if (solNormalizada < 0) solNormalizada += periodo;

            // Adicionar solução principal
            if (!todasSolucoes.some(s => Math.abs(s - solNormalizada) < 1e-10)) {
                todasSolucoes.push(solNormalizada);
            }
        });

        return todasSolucoes.sort((a, b) => a - b);
    } else {
        // Resolver para o valor (y)
        const anguloRad = paraRadianos(angle);
        let resultado;

        switch(func) {
            case 'sin':
                resultado = Math.sin(anguloRad);
                break;
            case 'cos':
                resultado = Math.cos(anguloRad);
                break;
            case 'tan':
                resultado = Math.tan(anguloRad);
                break;
            case 'sec':
                resultado = 1 / Math.cos(anguloRad);
                break;
            case 'csc':
                resultado = 1 / Math.sin(anguloRad);
                break;
            case 'cot':
                resultado = 1 / Math.tan(anguloRad);
                break;
        }

        return [resultado];
    }
}

// ===== EQUAÇÃO TRIGONOMÉTRICA COM DESIGUALDADES =====
function formatarEquacaoTrigonometrica(func, angle, value, simbolo) {
    return `$$\\${func}(${formatarNumeroInteiro(angle)}) ${formatarDesigualdade(simbolo)} ${formatarNumeroInteiro(value)}$$`;
}

function resolverTrigonometric() {
    const func = document.getElementById('trigFunction').value;
    const angle = obterValorMatematico('trigAngle');
    const value = obterValorMatematico('trigValue');
    const simbolo = document.getElementById('trigInequality').value;
    const divPassos = document.getElementById('trigonometricSteps');
    divPassos.innerHTML = '';
    
    // Verificar quais campos estão preenchidos
    const anguloPreenchido = !isNaN(angle);
    const valorPreenchido = !isNaN(value);

    if (!anguloPreenchido && !valorPreenchido) {
        divPassos.innerHTML = `<p style="color:orange;">⚠️ Please fill angle or value</p>`;
        renderMathJax();
        return;
    }
    
    if (anguloPreenchido && valorPreenchido) {
        divPassos.innerHTML = `<p style="color:orange;">⚠️ Please leave one field empty</p>`;
        renderMathJax();
        return;
    }
    
    try {
        divPassos.innerHTML += `<div class="step"><p><strong>Step 1: Inequality</strong></p>`;
        
        if (!anguloPreenchido) {
            // Resolver para o ângulo (x)
            divPassos.innerHTML += `<p>$$\\${func}(x) ${formatarDesigualdade(simbolo)} ${formatarNumeroInteiro(value)}$$</p></div>`;
            
            // Verificar domínio
            let dominioValido = true;
            let mensagemDominio = '';
            
            switch(func) {
                case 'sin':
                case 'cos':
                    if (simbolo === '=') {
                        if (value < -1 || value > 1) {
                            dominioValido = false;
                            mensagemDominio = `The ${func} function only accepts values between -1 and 1.`;
                        }
                    }
                    break;
                case 'sec':
                case 'csc':
                    if (Math.abs(value) < 1 && (simbolo === '=' || simbolo === '<=' || simbolo === '>=')) {
                        dominioValido = false;
                        mensagemDominio = `The ${func} function requires |value| ≥ 1.`;
                    }
                    break;
            }
            
            if (!dominioValido) {
                divPassos.innerHTML += `<p style="color:red;">❌ ${mensagemDominio}</p></div>`;
                renderMathJax();
                return;
            }
            
            // Encontrar soluções para a equação correspondente
            let solucoesPrincipais = [];
            if (simbolo === '=' || simbolo === '>=' || simbolo === '<=') {
                // Encontrar pontos onde a igualdade ocorre
                solucoesPrincipais = encontrarSolucoesTrigonometricas(func, value, true);
            }
            
            divPassos.innerHTML += `
                <div class="step">
                    <p><strong>Step 2: Find Critical Points</strong></p>
            `;
            
            if (solucoesPrincipais.length === 0 && (simbolo === '=' || simbolo === '>=' || simbolo === '<=')) {
                // Nenhum ponto de igualdade encontrado
                if (simbolo === '=') {
                    divPassos.innerHTML += `<p>No solutions found for $\\${func}(x) = ${formatarNumeroInteiro(value)}$</p>`;
                } else {
                    // Testar um ponto para determinar o sinal
                    const pontoTeste = 0;
                    let valorTeste;
                    switch(func) {
                        case 'sin': valorTeste = Math.sin(pontoTeste); break;
                        case 'cos': valorTeste = Math.cos(pontoTeste); break;
                        case 'tan': valorTeste = Math.tan(pontoTeste); break;
                        case 'sec': valorTeste = 1/Math.cos(pontoTeste); break;
                        case 'csc': valorTeste = 1/Math.sin(pontoTeste); break;
                        case 'cot': valorTeste = 1/Math.tan(pontoTeste); break;
                    }
                    
                    const satisfaz = eval(`${valorTeste} ${simbolo} ${value}`);
                    if (satisfaz) {
                        divPassos.innerHTML += `<p>✅ Inequality holds for all x where function is defined</p>`;
                    } else {
                        divPassos.innerHTML += `<p>❌ No solutions found</p>`;
                    }
                }
            } else {
                // Mostrar pontos críticos
                if (solucoesPrincipais.length > 0) {
                    divPassos.innerHTML += `<p><strong>Critical points where equality occurs:</strong></p>`;
                    solucoesPrincipais.forEach((sol, idx) => {
                        const solGraus = paraGraus(sol);
                        divPassos.innerHTML += `<p>$$x_${idx+1} = ${formatarNumeroInteiro(solGraus)}°$$</p>`;
                    });
                }
                
                // Análise de intervalos
                divPassos.innerHTML += `<div class="step"><p><strong>Step 3: Interval Analysis</strong></p>`;
                divPassos.innerHTML += `<p>Analyze the sign of $\\${func}(x) - ${formatarNumeroInteiro(value)}$ in each interval.</p>`;
                
                // Para simplificação, mostrar solução geral
                divPassos.innerHTML += `<p><strong>General approach:</strong></p>`;
                divPassos.innerHTML += `<p>1. Find where $\\${func}(x) = ${formatarNumeroInteiro(value)}$</p>`;
                divPassos.innerHTML += `<p>2. Test points in each interval</p>`;
                divPassos.innerHTML += `<p>3. Consider periodicity of $\\${func}(x)$</p>`;
                
                // Mostrar período da função
                const periodo = func === 'tan' || func === 'cot' ? 'π' : '2π';
                divPassos.innerHTML += `<p>Period of $\\${func}(x)$: ${periodo}</p>`;
            }
            
        } else {
            // Resolver para o valor (y)
            divPassos.innerHTML += `<p>$$\\${func}(${formatarNumeroInteiro(angle)}) ${formatarDesigualdade(simbolo)} y$$</p>`;
            divPassos.innerHTML += `</div>`; // Fecha Passo 1
            
            // Converter para radianos e calcular
            const anguloRad = paraRadianos(angle);
            let resultado;
            
            switch(func) {
                case 'sin': resultado = Math.sin(anguloRad); break;
                case 'cos': resultado = Math.cos(anguloRad); break;
                case 'tan': 
                    if (Math.abs(Math.cos(anguloRad)) < 1e-10) {
                        divPassos.innerHTML += `<div class="step"><p style="color:red;">❌ Tangent undefined for this angle</p></div>`;
                        renderMathJax();
                        return;
                    }
                    resultado = Math.tan(anguloRad);
                    break;
                case 'sec': 
                    if (Math.abs(Math.cos(anguloRad)) < 1e-10) {
                        divPassos.innerHTML += `<div class="step"><p style="color:red;">❌ Secant undefined for this angle</p></div>`;
                        renderMathJax();
                        return;
                    }
                    resultado = 1 / Math.cos(anguloRad);
                    break;
                case 'csc': 
                    if (Math.abs(Math.sin(anguloRad)) < 1e-10) {
                        divPassos.innerHTML += `<div class="step"><p style="color:red;">❌ Cosecant undefined for this angle</p></div>`;
                        renderMathJax();
                        return;
                    }
                    resultado = 1 / Math.sin(anguloRad);
                    break;
                case 'cot': 
                    if (Math.abs(Math.sin(anguloRad)) < 1e-10) {
                        divPassos.innerHTML += `<div class="step"><p style="color:red;">❌ Cotangent undefined for this angle</p></div>`;
                        renderMathJax();
                        return;
                    }
                    resultado = 1 / Math.tan(anguloRad);
                    break;
            }
            
            divPassos.innerHTML += `
                <div class="step">
                    <p><strong>Step 2: Calculate Value</strong></p>
                    <p>$$\\${func}(${formatarNumeroInteiro(angle)}°) = ${formatarNumeroInteiro(resultado)}$$</p>
                </div>
            `;
            
            divPassos.innerHTML += `
                <div class="step">
                    <p><strong>Step 3: Inequality Solution</strong></p>
                    <p>$$${formatarNumeroInteiro(resultado)} ${formatarDesigualdade(simbolo)} y$$</p>
                    <p>$$y ${simbolo === '>' ? '<' : simbolo === '<' ? '>' : formatarDesigualdade(simbolo)} ${formatarNumeroInteiro(resultado)}$$</p>
                </div>
            `;
        }

    } catch (err) {
        divPassos.innerHTML = `<p style="color:red;">Error: ${err}</p>`;
    }

    renderMathJax();
}

// ===== FUNÇÕES AUXILIARES =====
function fatoresInteiros(n) {
    if (n === 0) return [0];
    const fatores = [];
    for (let i = 1; i <= Math.abs(n); i++) {
        if (n % i === 0) {
            fatores.push(i);
        }
    }
    return fatores;
}

function encontrarRaizesCubicas(a, b, c, constante) {
    const raizes = [];
    // Procurar no intervalo [-10, 10]
    for (let x = -10; x <= 10; x += 0.1) {
        const valor = a*x*x*x + b*x*x + c*x + constante;
        if (Math.abs(valor) < 0.1) {
            const arredondado = Math.round(x * 100) / 100;
            if (!raizes.some(r => Math.abs(r - arredondado) < 0.1)) {
                raizes.push(arredondado);
            }
            if (raizes.length >= 3) break;
        }
    }
    return raizes;
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar placeholders com exemplos
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
        if (!input.placeholder) {
            input.placeholder = 'ex: 1/2, √2, 3.14';
        }
    });
});

// ===== LOUSA =====
const canvas = document.getElementById("lousa");
const ctx = canvas.getContext("2d");

function ajustarCanvas() {
    canvas.width = window.innerWidth * 0.45;
    canvas.height = window.innerHeight * 0.7;
}
ajustarCanvas();
window.addEventListener('resize', ajustarCanvas);

ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.lineWidth = 1;
ctx.strokeStyle = "black";

let desenhando = false;
let lastX = 0;
let lastY = 0;

// Função para obter a posição correta do mouse no canvas
function obterPosicaoMouse(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        x: (evt.clientX - rect.left) * scaleX,
        y: (evt.clientY - rect.top) * scaleY
    };
}

// Função para obter a posição correta do touch no canvas
function obterPosicaoTouch(canvas, touch) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY
    };
}

function iniciarDesenho(x, y) {
    desenhando = true;
    [lastX, lastY] = [x, y];
}

function desenharLinha(x, y) {
    if (!desenhando) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    [lastX, lastY] = [x, y];
}

function finalizarDesenho() {
    desenhando = false;
}

// Eventos do mouse
canvas.addEventListener("mousedown", e => {
    const pos = obterPosicaoMouse(canvas, e);
    iniciarDesenho(pos.x, pos.y);
});

canvas.addEventListener("mousemove", e => {
    const pos = obterPosicaoMouse(canvas, e);
    desenharLinha(pos.x, pos.y);
});

canvas.addEventListener("mouseup", finalizarDesenho);
canvas.addEventListener("mouseout", finalizarDesenho);

// Eventos touch
canvas.addEventListener("touchstart", e => {
    e.preventDefault();
    const touch = e.touches[0];
    const pos = obterPosicaoTouch(canvas, touch);
    iniciarDesenho(pos.x, pos.y);
});

canvas.addEventListener("touchmove", e => {
    e.preventDefault();
    const touch = e.touches[0];
    const pos = obterPosicaoTouch(canvas, touch);
    desenharLinha(pos.x, pos.y);
});

canvas.addEventListener("touchend", e => {
    e.preventDefault();
    finalizarDesenho();
});

// Ferramentas da lousa
document.getElementById("clear").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById("pencil").addEventListener("click", () => {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
});

document.getElementById("eraser").addEventListener("click", () => {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 10;
});

// ===== ABRIR E FECHAR LOUSA =====
const btnAbrir = document.getElementById("abrirLousa");
const btnFechar = document.getElementById("fecharLousa");
const lousaContainer = document.getElementById("lousaContainer");

// Inicialmente o botão "fechar" fica escondido
btnFechar.style.display = "none";

btnAbrir.addEventListener("click", () => {
    lousaContainer.style.display = "block";
    setTimeout(() => lousaContainer.classList.add("visivel"), 10);
    btnAbrir.style.display = "none";
    btnFechar.style.display = "inline-block";
});

btnFechar.addEventListener("click", () => {
    lousaContainer.classList.remove("visivel");
    setTimeout(() => {
        lousaContainer.style.display = "none";
        btnAbrir.style.display = "inline-block";
        btnFechar.style.display = "none";
    }, 400);
});

// ===== CALCULADORA =====
const calcModal = document.getElementById('calcModal');
const openCalc = document.getElementById('openCalc');
const closeCalc = document.getElementById('closeCalc');
const calcInput = document.getElementById('calcInput');

let ultimoFoiResultado = false;

// Abrir e fechar modal
openCalc.addEventListener('click', () => {
    calcModal.style.display = 'flex';
    calcInput.focus();
});

closeCalc.addEventListener('click', () => {
    calcModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === calcModal) calcModal.style.display = 'none';
});

// Funções da Calculadora
function calcAppend(valor) {
    if (calcInput.value === "0" || calcInput.value === "Erro" || ultimoFoiResultado) {
        calcInput.value = valor;
        ultimoFoiResultado = false;
    } else {
        // Evita operadores duplicados
        const ultimoCaracter = calcInput.value.slice(-1);
        if ("+-*/^".includes(ultimoCaracter) && "+-*/^".includes(valor)) {
            calcInput.value = calcInput.value.slice(0, -1) + valor;
        } else {
            calcInput.value += valor;
        }
    }
}

function calcClear() {
    calcInput.value = "0";
    ultimoFoiResultado = false;
}

function calcBackspace() {
    if (calcInput.value.length > 1 && calcInput.value !== "Erro") {
        calcInput.value = calcInput.value.slice(0, -1);
    } else {
        calcInput.value = "0";
    }
}

function calcSqrt() {
    if (calcInput.value === "0" || calcInput.value === "Erro" || ultimoFoiResultado) {
        calcInput.value = "√(";
    } else {
        calcInput.value += "√(";
    }
    ultimoFoiResultado = false;
}

function calcCalculate() {
    try {
        let expressao = calcInput.value;

        // Converte operadores visuais
        expressao = expressao
            .replace(/÷/g, '/')
            .replace(/×/g, '*')
            .replace(/\^/g, '**')
            .replace(/√/g, 'Math.sqrt')
            .replace(/,/g, '.');

        // Avalia a expressão
        let resultado = Function(`'use strict'; return (${expressao})`)();

        if (!isFinite(resultado) || isNaN(resultado)) throw new Error();

        // Formata resultado
        const formatado = new Intl.NumberFormat('pt-BR', {
            maximumFractionDigits: 10
        }).format(resultado);

        calcInput.value = formatado;
        ultimoFoiResultado = true;

    } catch (e) {
        calcInput.value = "Erro";
        ultimoFoiResultado = false;
    }
}

// Suporte ao teclado físico
calcInput.addEventListener('keydown', (e) => {
    const tecla = e.key;

    if (!isNaN(tecla)) {
        calcAppend(tecla);
    } else if ("+-*/().".includes(tecla)) {
        calcAppend(tecla);
    } else if (tecla === "Enter" || tecla === "=") {
        e.preventDefault();
        calcCalculate();
    } else if (tecla === "Backspace") {
        e.preventDefault();
        calcBackspace();
    } else if (tecla === "Escape") {
        calcClear();
    } else if (tecla.toLowerCase() === "r") {
        calcSqrt();
    }
});

// Exporta funções para o escopo global
window.calcAppend = calcAppend;
window.calcClear = calcClear;
window.calcBackspace = calcBackspace;
window.calcSqrt = calcSqrt;
window.calcCalculate = calcCalculate;

// ===== CONTEÚDOS DE MATEMÁTICA EXPANDIDOS =====
const conteudos = {
    1: `<strong>Numbers and Algebraic Expressions:</strong><br>
<strong>Real Numbers:</strong><br>
Properties: commutative, associative, distributive, identity element, inverse element.<br>
\\[ a + b = b + a, \\quad a \\cdot b = b \\cdot a \\]<br>
\\[ a + (b + c) = (a + b) + c, \\quad a \\cdot (b \\cdot c) = (a \\cdot b) \\cdot c \\]<br>
\\[ a \\cdot (b + c) = a \\cdot b + a \\cdot c \\]<br><br>

<strong>Complex Numbers:</strong><br>
Algebraic form: \\( z = a + bi \\), where \\( i^2 = -1 \\)<br>
Conjugate: \\( \\overline{z} = a - bi \\)<br>
Modulus: \\( |z| = \\sqrt{a^2 + b^2} \\)<br>
Argument: \\( \\theta = \\arctan\\left(\\frac{b}{a}\\right) \\)<br>
Trigonometric form: \\( z = r(\\cos\\theta + i\\sin\\theta) \\)<br>
Exponential form: \\( z = re^{i\\theta} \\)<br><br>

<strong>Operations with Complex Numbers:</strong><br>
Addition: \\( (a+bi) + (c+di) = (a+c) + (b+d)i \\)<br>
Multiplication: \\( (a+bi)(c+di) = (ac-bd) + (ad+bc)i \\)<br>
Division: \\( \\frac{a+bi}{c+di} = \\frac{(a+bi)(c-di)}{c^2+d^2} \\)<br><br>

<strong>De Moivre's Theorem:</strong><br>
\\[ (\\cos\\theta + i\\sin\\theta)^n = \\cos(n\\theta) + i\\sin(n\\theta) \\]<br>
\\[ z^n = r^n[\\cos(n\\theta) + i\\sin(n\\theta)] \\]<br><br>

<strong>Roots of Complex Numbers:</strong><br>
\\[ \\sqrt[n]{z} = \\sqrt[n]{r}\\left[\\cos\\left(\\frac{\\theta + 2k\\pi}{n}\\right) + i\\sin\\left(\\frac{\\theta + 2k\\pi}{n}\\right)\\right] \\]<br>
for \\( k = 0, 1, 2, \\dots, n-1 \\)<br><br>

<strong>Polynomials:</strong><br>
Polynomial degree, coefficients, roots.<br>
Fundamental Theorem of Algebra: Every polynomial of degree n has n complex roots.<br>
Viète's formulas (Relations between coefficients and roots).<br><br>

<strong>Factorization Example:</strong><br>
\\[ x^3 - 6x^2 + 11x - 6 = (x-1)(x-2)(x-3) \\]<br>
Roots: \\( x = 1, x = 2, x = 3 \\)<br><br>

<strong>Polynomial Division:</strong><br>
Long division method, Synthetic division (Briot-Ruffini).<br>
Remainder Theorem: \\( P(a) \\) is the remainder when \\( P(x) \\) is divided by \\( (x-a) \\)`,

    2: `<strong>Equations and Inequalities:</strong><br>

<strong>First Degree Equation:</strong><br>
\\[ ax + b = 0 \\Rightarrow x = -\\frac{b}{a} \\]<br><br>

<strong>Quadratic Equation:</strong><br>
General form: \\( ax^2 + bx + c = 0 \\)<br>
Solution by Quadratic Formula:<br>
\\[ x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\]<br>
Sum of roots: \\( S = -\\frac{b}{a} \\)<br>
Product of roots: \\( P = \\frac{c}{a} \\)<br><br>

<strong>Discriminant (Δ):</strong><br>
\\[ \\Delta = b^2 - 4ac \\]<br>
If \\( \\Delta > 0 \\): two distinct real roots<br>
If \\( \\Delta = 0 \\): one real double root<br>
If \\( \\Delta < 0 \\): two complex conjugate roots<br><br>

<strong>Biquadratic Equations:</strong><br>
\\[ ax^4 + bx^2 + c = 0 \\]<br>
Letting \\( y = x^2 \\), we have: \\( ay^2 + by + c = 0 \\)<br><br>

<strong>Irrational Equations:</strong><br>
\\[ \\sqrt{ax + b} = c \\Rightarrow ax + b = c^2 \\]<br><br>

<strong>Exponential Equations:</strong><br>
Properties: \\( a^m \\cdot a^n = a^{m+n} \\), \\( \\frac{a^m}{a^n} = a^{m-n} \\), \\( (a^m)^n = a^{mn} \\)<br>
Example 1: \\( 2^{x+1} = 16 \\Rightarrow 2^{x+1} = 2^4 \\Rightarrow x+1 = 4 \\Rightarrow x = 3 \\)<br>
Example 2: \\( 3^{2x} - 4\\cdot3^x + 3 = 0 \\) (letting \\( y = 3^x \\))<br><br>

<strong>Logarithmic Equations:</strong><br>
Definition: \\( \\log_a b = x \\Leftrightarrow a^x = b \\)<br>
Properties:<br>
\\[ \\log_a(mn) = \\log_a m + \\log_a n \\]<br>
\\[ \\log_a\\left(\\frac{m}{n}\\right) = \\log_a m - \\log_a n \\]<br>
\\[ \\log_a m^n = n\\log_a m \\]<br>
Change of base: \\( \\log_a b = \\frac{\\log_c b}{\\log_c a} \\)<br><br>

<strong>Inequalities:</strong><br>
<strong>First Degree Inequality:</strong><br>
\\[ ax + b > 0 \\Rightarrow x > -\\frac{b}{a} \\ (if\\ a>0) \\]<br><br>

<strong>Quadratic Inequality:</strong><br>
Solve: \\( x^2 - 4 > 0 \\)<br>
Factor: \\( (x-2)(x+2) > 0 \\)<br>
Sign chart:<br>
\\( x < -2 \\): positive × positive = positive<br>
\\( -2 < x < 2 \\): negative × positive = negative<br>
\\( x > 2 \\): positive × positive = positive<br>
Solution: \\( x < -2 \\) or \\( x > 2 \\)<br><br>

<strong>Product and Quotient Inequalities:</strong><br>
\\[ \\frac{(x-1)(x-3)}{x-2} \\geq 0 \\]<br>
Study the sign of each factor and create sign chart.<br><br>

<strong>Absolute Value Inequality:</strong><br>
\\[ |x - a| < b \\Rightarrow -b < x - a < b \\Rightarrow a - b < x < a + b \\]<br>
\\[ |x - a| > b \\Rightarrow x - a < -b \\ or \\ x - a > b \\]`,

    3: `<strong>Functions and Graphs:</strong><br>

<strong>Function Definition:</strong><br>
A function is a relation \\( f: A \\to B \\) that associates each \\( x \\in A \\) to exactly one value \\( f(x) \\in B \\).<br>
Domain: set A<br>
Codomain: set B<br>
Range: \\( \\{f(x) : x \\in A\\} \\)<br><br>

<strong>Composite Function:</strong><br>
\\[ (f \\circ g)(x) = f(g(x)) \\]<br>
Example: \\( f(x) = x^2 \\), \\( g(x) = x+1 \\)<br>
\\[ (f \\circ g)(x) = f(g(x)) = (x+1)^2 \\]<br>
\\[ (g \\circ f)(x) = g(f(x)) = x^2 + 1 \\]<br><br>

<strong>Inverse Function:</strong><br>
\\[ f(x) = 3x + 5 \\Rightarrow f^{-1}(x) = \\frac{x-5}{3} \\]<br>
Property: \\( f(f^{-1}(x)) = x \\) and \\( f^{-1}(f(x)) = x \\)<br><br>

<strong>Graph Transformations:</strong><br>
Vertical shift: \\( f(x) + k \\)<br>
Horizontal shift: \\( f(x - h) \\)<br>
Reflection over x-axis: \\( -f(x) \\)<br>
Reflection over y-axis: \\( f(-x) \\)<br>
Vertical stretch/compression: \\( A\\cdot f(x) \\)<br>
Horizontal stretch/compression: \\( f(Bx) \\)<br><br>

<strong>Function Classification:</strong><br>
Even function: \\( f(-x) = f(x) \\) (symmetric about y-axis)<br>
Odd function: \\( f(-x) = -f(x) \\) (symmetric about origin)<br>
Injective function: \\( f(x_1) = f(x_2) \\Rightarrow x_1 = x_2 \\)<br>
Surjective function: Range = Codomain<br>
Bijective function: injective and surjective<br><br>

<strong>Linear Function:</strong><br>
\\[ f(x) = ax + b \\]<br>
Graph: line with slope \\( a \\)<br>
Root: \\( x = -\\frac{b}{a} \\)<br><br>

<strong>Quadratic Function:</strong><br>
\\[ f(x) = ax^2 + bx + c \\]<br>
Vertex: \\( V = \\left(-\\frac{b}{2a}, -\\frac{\\Delta}{4a}\\right) \\)<br>
Concavity: upward if \\( a > 0 \\), downward if \\( a < 0 \\)<br><br>

<strong>Absolute Value Function:</strong><br>
\\[ f(x) = |x| = \\begin{cases} x & \\text{if } x \\geq 0 \\\\ -x & \\text{if } x < 0 \\end{cases} \\]<br><br>

<strong>Exponential Function:</strong><br>
\\[ f(x) = a^x \\quad (a > 0, a \\neq 1) \\]<br>
Growth: \\( a > 1 \\): increasing; \\( 0 < a < 1 \\): decreasing<br><br>

<strong>Logarithmic Function:</strong><br>
\\[ f(x) = \\log_a x \\quad (a > 0, a \\neq 1, x > 0) \\]<br>
Inverse of exponential function`,

    4: `<strong>Sequences and Series:</strong><br>

<strong>Arithmetic Progression (AP):</strong><br>
General term: \\( a_n = a_1 + (n-1)d \\)<br>
Common difference: \\( d = a_n - a_{n-1} \\)<br>
Sum of first n terms:<br>
\\[ S_n = \\frac{n(a_1 + a_n)}{2} \\]<br>
\\[ S_n = \\frac{n[2a_1 + (n-1)d]}{2} \\]<br>
Property: \\( a_m = \\frac{a_{m-k} + a_{m+k}}{2} \\) (equidistant terms)<br><br>

<strong>Geometric Progression (GP):</strong><br>
General term: \\( a_n = a_1 \\cdot r^{n-1} \\)<br>
Common ratio: \\( r = \\frac{a_n}{a_{n-1}} \\)<br>
Sum of first n terms:<br>
\\[ S_n = a_1 \\cdot \\frac{r^n - 1}{r - 1} \\quad (r \\neq 1) \\]<br>
\\[ S_n = n\\cdot a_1 \\quad (r = 1) \\]<br>
Product of first n terms:<br>
\\[ P_n = (a_1 \\cdot a_n)^{n/2} \\]<br><br>

<strong>Infinite GP:</strong><br>
If \\( |r| < 1 \\):<br>
\\[ S_\\infty = \\frac{a_1}{1 - r} \\]<br><br>

<strong>Summation:</strong><br>
\\[ \\sum_{k=1}^n k = 1 + 2 + 3 + \\dots + n = \\frac{n(n+1)}{2} \\]<br>
\\[ \\sum_{k=1}^n k^2 = 1^2 + 2^2 + 3^2 + \\dots + n^2 = \\frac{n(n+1)(2n+1)}{6} \\]<br>
\\[ \\sum_{k=1}^n k^3 = 1^3 + 2^3 + 3^3 + \\dots + n^3 = \\left[\\frac{n(n+1)}{2}\\right]^2 \\]<br><br>

<strong>Geometric Series:</strong><br>
\\[ \\sum_{k=0}^{n-1} ar^k = a\\frac{1-r^n}{1-r} \\]<br>
\\[ \\sum_{k=0}^\\infty ar^k = \\frac{a}{1-r} \\quad (|r| < 1) \\]<br><br>

<strong>Recursively Defined Sequences:</strong><br>
Example: Fibonacci Sequence<br>
\\[ F_1 = 1, F_2 = 1, F_n = F_{n-1} + F_{n-2} \\]`,

    5: `<strong>Trigonometry:</strong><br>

<strong>Trigonometric Ratios in Right Triangle:</strong><br>
\\[ \\sin\\theta = \\frac{\\text{opposite}}{\\text{hypotenuse}} \\]<br>
\\[ \\cos\\theta = \\frac{\\text{adjacent}}{\\text{hypotenuse}} \\]<br>
\\[ \\tan\\theta = \\frac{\\text{opposite}}{\\text{adjacent}} \\]<br><br>

<strong>Fundamental Identity:</strong><br>
\\[ \\sin^2 x + \\cos^2 x = 1 \\]<br>
\\[ 1 + \\tan^2 x = \\sec^2 x \\]<br>
\\[ 1 + \\cot^2 x = \\csc^2 x \\]<br><br>

<strong>Addition and Subtraction Formulas:</strong><br>
\\[ \\sin(a\\pm b) = \\sin a\\cos b \\pm \\cos a\\sin b \\]<br>
\\[ \\cos(a\\pm b) = \\cos a\\cos b \\mp \\sin a\\sin b \\]<br>
\\[ \\tan(a\\pm b) = \\frac{\\tan a \\pm \\tan b}{1 \\mp \\tan a\\tan b} \\]<br><br>

<strong>Double Angle Formulas:</strong><br>
\\[ \\sin(2a) = 2\\sin a\\cos a \\]<br>
\\[ \\cos(2a) = \\cos^2 a - \\sin^2 a = 2\\cos^2 a - 1 = 1 - 2\\sin^2 a \\]<br>
\\[ \\tan(2a) = \\frac{2\\tan a}{1 - \\tan^2 a} \\]<br><br>

<strong>Half Angle Formulas:</strong><br>
\\[ \\sin^2\\left(\\frac{a}{2}\\right) = \\frac{1 - \\cos a}{2} \\]<br>
\\[ \\cos^2\\left(\\frac{a}{2}\\right) = \\frac{1 + \\cos a}{2} \\]<br><br>

<strong>Product-to-Sum Formulas:</strong><br>
\\[ \\sin a + \\sin b = 2\\sin\\left(\\frac{a+b}{2}\\right)\\cos\\left(\\frac{a-b}{2}\\right) \\]<br>
\\[ \\sin a - \\sin b = 2\\cos\\left(\\frac{a+b}{2}\\right)\\sin\\left(\\frac{a-b}{2}\\right) \\]<br>
\\[ \\cos a + \\cos b = 2\\cos\\left(\\frac{a+b}{2}\\right)\\cos\\left(\\frac{a-b}{2}\\right) \\]<br>
\\[ \\cos a - \\cos b = -2\\sin\\left(\\frac{a+b}{2}\\right)\\sin\\left(\\frac{a-b}{2}\\right) \\]<br><br>

<strong>Law of Sines:</strong><br>
\\[ \\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R \\]<br>
where R is the radius of the circumscribed circle<br><br>

<strong>Law of Cosines:</strong><br>
\\[ a^2 = b^2 + c^2 - 2bc\\cos A \\]<br>
\\[ b^2 = a^2 + c^2 - 2ac\\cos B \\]<br>
\\[ c^2 = a^2 + b^2 - 2ab\\cos C \\]<br><br>

<strong>Trigonometric Relations in Any Triangle:</strong><br>
\\[ \\tan\\left(\\frac{A}{2}\\right) = \\frac{r}{s-a} \\]<br>
where r is the radius of the inscribed circle and s is the semiperimeter<br><br>

<strong>Inverse Trigonometric Functions:</strong><br>
\\[ \\arcsin x, \\arccos x, \\arctan x \\]`,

    6: `<strong>Analytic Geometry:</strong><br>

<strong>Cartesian System:</strong><br>
Coordinates: \\( (x, y) \\)<br>
Distance between two points:<br>
\\[ d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} \\]<br><br>

<strong>Midpoint:</strong><br>
\\[ M = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right) \\]<br><br>

<strong>Triangle Centroid:</strong><br>
\\[ G = \\left(\\frac{x_1 + x_2 + x_3}{3}, \\frac{y_1 + y_2 + y_3}{3}\\right) \\]<br><br>

<strong>Line:</strong><br>
General equation: \\( Ax + By + C = 0 \\)<br>
Slope-intercept form: \\( y = mx + b \\)<br>
Slope: \\( m = \\frac{y_2 - y_1}{x_2 - x_1} \\)<br>
Intercept form: \\( \\frac{x}{a} + \\frac{y}{b} = 1 \\)<br>
Parametric form: \\( x = x_0 + at, y = y_0 + bt \\)<br><br>

<strong>Angle between Lines:</strong><br>
\\[ \\tan\\theta = \\left|\\frac{m_2 - m_1}{1 + m_1m_2}\\right| \\]<br>
Parallel lines: \\( m_1 = m_2 \\)<br>
Perpendicular lines: \\( m_1 \\cdot m_2 = -1 \\)<br><br>

<strong>Distance from Point to Line:</strong><br>
\\[ d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}} \\]<br><br>

<strong>Circle:</strong><br>
Standard form: \\( (x - h)^2 + (y - k)^2 = r^2 \\)<br>
General form: \\( x^2 + y^2 + Dx + Ey + F = 0 \\)<br>
Center: \\( C = (-\\frac{D}{2}, -\\frac{E}{2}) \\)<br>
Radius: \\( r = \\sqrt{\\left(\\frac{D}{2}\\right)^2 + \\left(\\frac{E}{2}\\right)^2 - F} \\)<br><br>

<strong>Parabola:</strong><br>
Definition: locus of points equidistant from a point (focus) and a line (directrix)<br>
Equation: \\( y = ax^2 + bx + c \\)<br>
Vertex: \\( V = (-\\frac{b}{2a}, -\\frac{\\Delta}{4a}) \\)<br>
Focus and directrix depend on orientation<br><br>

<strong>Ellipse:</strong><br>
Standard form: \\( \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\)<br>
Foci: \\( F_1 = (-c, 0), F_2 = (c, 0) \\) with \\( c^2 = a^2 - b^2 \\)<br>
Eccentricity: \\( e = \\frac{c}{a} \\)<br><br>

<strong>Hyperbola:</strong><br>
Standard form: \\( \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1 \\)<br>
Foci: \\( F_1 = (-c, 0), F_2 = (c, 0) \\) with \\( c^2 = a^2 + b^2 \\)<br>
Asymptotes: \\( y = \\pm\\frac{b}{a}x \\)<br><br>

<strong>General Conics:</strong><br>
General second-degree equation: \\( Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0 \\)<br>
Discriminant: \\( \\Delta = B^2 - 4AC \\)<br>
If \\( \\Delta < 0 \\): ellipse (or circle)<br>
If \\( \\Delta = 0 \\): parabola<br>
If \\( \\Delta > 0 \\): hyperbola`,

    7: `<strong>Plane Geometry:</strong><br>

<strong>Triangles:</strong><br>
Sum of interior angles: \\( A + B + C = 180^\\circ \\)<br>
Classification by sides: equilateral, isosceles, scalene<br>
Classification by angles: acute, right, obtuse<br><br>

<strong>Triangle Area:</strong><br>
\\[ A = \\frac{b\\cdot h}{2} \\]<br>
Heron's formula: \\( A = \\sqrt{s(s-a)(s-b)(s-c)} \\) where \\( s = \\frac{a+b+c}{2} \\)<br>
Using trigonometry: \\( A = \\frac{1}{2}ab\\sin C \\)<br><br>

<strong>Pythagorean Theorem:</strong><br>
\\[ a^2 + b^2 = c^2 \\]<br>
Converse: If \\( a^2 + b^2 = c^2 \\), then the triangle is right<br><br>

<strong>Metric Relations in Right Triangle:</strong><br>
\\[ h^2 = m\\cdot n \\]<br>
\\[ b^2 = a\\cdot m \\]<br>
\\[ c^2 = a\\cdot n \\]<br>
\\[ b\\cdot c = a\\cdot h \\]<br><br>

<strong>Quadrilaterals:</strong><br>
Sum of interior angles: \\( 360^\\circ \\)<br>
Rectangle area: \\( A = b\\cdot h \\)<br>
Parallelogram area: \\( A = b\\cdot h \\)<br>
Rhombus area: \\( A = \\frac{D\\cdot d}{2} \\)<br>
Trapezoid area: \\( A = \\frac{(B + b)\\cdot h}{2} \\)<br><br>

<strong>Regular Polygons:</strong><br>
Sum of interior angles: \\( S_i = (n-2)\\cdot 180^\\circ \\)<br>
Interior angle: \\( a_i = \\frac{(n-2)\\cdot 180^\\circ}{n} \\)<br>
Exterior angle: \\( a_e = \\frac{360^\\circ}{n} \\)<br>
Number of diagonals: \\( d = \\frac{n(n-3)}{2} \\)<br>
Area: \\( A = \\frac{P\\cdot ap}{2} \\) where P is perimeter and ap is apothem<br><br>

<strong>Circle and Circumference:</strong><br>
Circumference: \\( C = 2\\pi r \\)<br>
Area: \\( A = \\pi r^2 \\)<br>
Arc length: \\( \\ell = \\alpha\\cdot r \\) (α in radians)<br>
Circular sector area: \\( A = \\frac{\\alpha\\cdot r^2}{2} \\) (α in radians)<br>
Circular ring area: \\( A = \\pi(R^2 - r^2) \\)<br><br>

<strong>Similarity Ratio:</strong><br>
If \\( k \\) is the similarity ratio, then:<br>
Ratio between sides: \\( k \\)<br>
Ratio between perimeters: \\( k \\)<br>
Ratio between areas: \\( k^2 \\)<br>
Ratio between volumes: \\( k^3 \\)<br><br>

<strong>Thales' Theorem:</strong><br>
\\[ \\frac{AB}{A'B'} = \\frac{BC}{B'C'} = \\frac{AC}{A'C'} \\]`,

    8: `<strong>Spatial Geometry:</strong><br>

<strong>Polyhedra:</strong><br>
Euler's formula: \\( V - A + F = 2 \\) (for convex polyhedra)<br>
Regular polyhedra (Platonic solids): tetrahedron, hexahedron, octahedron, dodecahedron, icosahedron<br><br>

<strong>Prisms:</strong><br>
Lateral area: \\( A_l = P_b\\cdot h \\) (base perimeter × height)<br>
Total area: \\( A_t = A_l + 2A_b \\)<br>
Volume: \\( V = A_b\\cdot h \\)<br><br>

<strong>Pyramids:</strong><br>
Lateral area: sum of lateral face areas<br>
Total area: \\( A_t = A_l + A_b \\)<br>
Volume: \\( V = \\frac{1}{3}A_b\\cdot h \\)<br><br>

<strong>Cylinder:</strong><br>
Lateral area: \\( A_l = 2\\pi r h \\)<br>
Total area: \\( A_t = 2\\pi r(h + r) \\)<br>
Volume: \\( V = \\pi r^2 h \\)<br><br>

<strong>Cone:</strong><br>
Slant height: \\( g = \\sqrt{r^2 + h^2} \\)<br>
Lateral area: \\( A_l = \\pi r g \\)<br>
Total area: \\( A_t = \\pi r(g + r) \\)<br>
Volume: \\( V = \\frac{1}{3}\\pi r^2 h \\)<br><br>

<strong>Sphere:</strong><br>
Area: \\( A = 4\\pi r^2 \\)<br>
Volume: \\( V = \\frac{4}{3}\\pi r^3 \\)<br><br>

<strong>Spherical Lune and Wedge:</strong><br>
Lune area: \\( A = \\frac{\\alpha}{90^\\circ}\\pi r^2 \\) (α in degrees)<br>
Wedge volume: \\( V = \\frac{\\alpha}{270^\\circ}\\pi r^3 \\) (α in degrees)<br><br>

<strong>Truncated Solids:</strong><br>
Truncated pyramid: \\( V = \\frac{h}{3}(A_B + \\sqrt{A_B\\cdot A_b} + A_b) \\)<br>
Truncated cone: \\( V = \\frac{\\pi h}{3}(R^2 + Rr + r^2) \\)<br><br>

<strong>Inscribed and Circumscribed Solids:</strong><br>
Relations between inscribed and circumscribed solids<br><br>

<strong>Spatial Coordinates:</strong><br>
Three-dimensional Cartesian system: \\( (x, y, z) \\)<br>
Distance between points: \\( d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2} \\)`,

    9: `<strong>Matrices and Determinants:</strong><br>

<strong>Matrix Definition:</strong><br>
\\( m \\times n \\) matrix: \\( m \\) rows and \\( n \\) columns<br>
\\[ A = \\begin{bmatrix} a_{11} & a_{12} & \\dots & a_{1n} \\\\ a_{21} & a_{22} & \\dots & a_{2n} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ a_{m1} & a_{m2} & \\dots & a_{mn} \\end{bmatrix} \\]<br><br>

<strong>Matrix Types:</strong><br>
Row matrix, column matrix, zero matrix, square matrix<br>
Diagonal matrix, identity matrix, triangular matrix<br>
Symmetric matrix: \\( A = A^T \\)<br>
Skew-symmetric matrix: \\( A = -A^T \\)<br><br>

<strong>Matrix Operations:</strong><br>
Addition: \\( C = A + B \\Rightarrow c_{ij} = a_{ij} + b_{ij} \\)<br>
Scalar multiplication: \\( B = kA \\Rightarrow b_{ij} = k\\cdot a_{ij} \\)<br>
Matrix multiplication: \\( C = A\\cdot B \\Rightarrow c_{ij} = \\sum_{k=1}^n a_{ik}b_{kj} \\)<br>
Transposition: \\( B = A^T \\Rightarrow b_{ij} = a_{ji} \\)<br><br>

<strong>Determinants:</strong><br>
2×2 matrix: \\( \\det\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} = ad - bc \\)<br>
3×3 matrix (Sarrus' rule):<br>
\\[ \\det\\begin{bmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{bmatrix} = aei + bfg + cdh - ceg - bdi - afh \\]<br>
Properties of determinants<br><br>

<strong>Matrix Inverse:</strong><br>
\\[ A^{-1} = \\frac{1}{\\det(A)}\\operatorname{adj}(A) \\]<br>
For 2×2 matrix:<br>
\\[ \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}^{-1} = \\frac{1}{ad-bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix} \\]<br><br>

<strong>Linear Systems:</strong><br>
Matrix form: \\( AX = B \\)<br>
Solution: \\( X = A^{-1}B \\) (if \\( A \\) is invertible)<br>
Cramer's rule<br><br>

<strong>Matrix Rank:</strong><br>
Number of linearly independent rows/columns<br><br>

<strong>Eigenvalues and Eigenvectors:</strong><br>
\\[ Av = \\lambda v \\]<br>
Characteristic equation: \\( \\det(A - \\lambda I) = 0 \\)`,

    10: `<strong>Combinatorics and Probability:</strong><br>

<strong>Fundamental Counting Principle:</strong><br>
If one event can occur in m ways and another in n ways, then the two events can occur in m×n ways.<br><br>

<strong>Simple Permutations:</strong><br>
\\[ P(n) = n! = n\\cdot(n-1)\\cdot(n-2)\\cdot\\dots\\cdot 2\\cdot 1 \\]<br><br>

<strong>Permutations with Repetition:</strong><br>
\\[ P_n^{n_1,n_2,\\dots,n_k} = \\frac{n!}{n_1!\\cdot n_2!\\cdot\\dots\\cdot n_k!} \\]<br><br>

<strong>Simple Arrangements:</strong><br>
\\[ A(n,k) = \\frac{n!}{(n-k)!} \\]<br><br>

<strong>Simple Combinations:</strong><br>
\\[ C(n,k) = \\binom{n}{k} = \\frac{n!}{k!(n-k)!} \\]<br>
Properties:<br>
\\[ \\binom{n}{k} = \\binom{n}{n-k} \\]<br>
\\[ \\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k} \\] (Stifel's relation)<br><br>

<strong>Binomial Numbers and Pascal's Triangle:</strong><br>
\\[ \\binom{n}{0} = \\binom{n}{n} = 1 \\]<br>
\\[ \\binom{n}{1} = \\binom{n}{n-1} = n \\]<br><br>

<strong>Binomial Theorem:</strong><br>
\\[ (a+b)^n = \\sum_{k=0}^n \\binom{n}{k} a^{n-k}b^k \\]<br><br>

<strong>Probability:</strong><br>
Classical definition: \\( P(A) = \\frac{\\text{number of favorable outcomes}}{\\text{total number of possible outcomes}} \\)<br>
Properties:<br>
\\[ 0 \\leq P(A) \\leq 1 \\]<br>
\\[ P(\\varnothing) = 0, \\quad P(\\Omega) = 1 \\]<br>
\\[ P(A \\cup B) = P(A) + P(B) - P(A \\cap B) \\]<br>
\\[ P(A^c) = 1 - P(A) \\]<br><br>

<strong>Conditional Probability:</strong><br>
\\[ P(A|B) = \\frac{P(A \\cap B)}{P(B)} \\]<br><br>

<strong>Independent Events:</strong><br>
\\[ P(A \\cap B) = P(A)\\cdot P(B) \\]<br><br>

<strong>Bayes' Theorem:</strong><br>
\\[ P(A_i|B) = \\frac{P(B|A_i)P(A_i)}{\\sum_{j=1}^n P(B|A_j)P(A_j)} \\]<br><br>

<strong>Random Variables:</strong><br>
Expected value: \\( E[X] = \\sum x_i P(X=x_i) \\)<br>
Variance: \\( Var(X) = E[X^2] - (E[X])^2 \\)<br><br>

<strong>Probability Distributions:</strong><br>
Binomial distribution, Poisson distribution, normal distribution`,

    11: `<strong>Sets and Logic:</strong><br>

<strong>Set Theory:</strong><br>
Membership relation: \\( \\in, \\notin \\)<br>
Inclusion relation: \\( \\subset, \\subseteq, \\supset, \\supseteq \\)<br>
Empty set: \\( \\varnothing \\)<br>
Universal set: \\( U \\)<br><br>

<strong>Set Operations:</strong><br>
Union: \\( A \\cup B = \\{x : x \\in A \\text{ or } x \\in B\\} \\)<br>
Intersection: \\( A \\cap B = \\{x : x \\in A \\text{ and } x \\in B\\} \\)<br>
Difference: \\( A - B = \\{x : x \\in A \\text{ and } x \\notin B\\} \\)<br>
Complement: \\( A^c = \\{x : x \\notin A\\} \\)<br>
Symmetric difference: \\( A \\triangle B = (A - B) \\cup (B - A) \\)<br><br>

<strong>Operation Properties:</strong><br>
Commutative: \\( A \\cup B = B \\cup A, \\quad A \\cap B = B \\cap A \\)<br>
Associative: \\( (A \\cup B) \\cup C = A \\cup (B \\cup C) \\)<br>
Distributive: \\( A \\cup (B \\cap C) = (A \\cup B) \\cap (A \\cup C) \\)<br>
De Morgan's Laws:<br>
\\[ (A \\cup B)^c = A^c \\cap B^c \\]<br>
\\[ (A \\cap B)^c = A^c \\cup B^c \\]<br><br>

<strong>Cartesian Product:</strong><br>
\\[ A \\times B = \\{(a,b) : a \\in A, b \\in B\\} \\]<br><br>

<strong>Relations:</strong><br>
Domain, codomain, range<br>
Inverse relation<br><br>

<strong>Functions as Special Relations:</strong><br>
Injective function, surjective function, bijective function<br><br>

<strong>Propositional Logic:</strong><br>
Propositions, logical connectives: \\( \\land \\) (and), \\( \\lor \\) (or), \\( \\neg \\) (not), \\( \\rightarrow \\) (implies), \\( \\leftrightarrow \\) (if and only if)<br><br>

<strong>Truth Tables:</strong><br>
Conjunction: \\( p \\land q \\) is T only when both are T<br>
Disjunction: \\( p \\lor q \\) is F only when both are F<br>
Implication: \\( p \\rightarrow q \\) is F only when p is T and q is F<br>
Biconditional: \\( p \\leftrightarrow q \\) is T when p and q have same truth value<br><br>

<strong>Logical Equivalences:</strong><br>
\\[ p \\rightarrow q \\equiv \\neg p \\lor q \\]<br>
\\[ \\neg(p \\land q) \\equiv \\neg p \\lor \\neg q \\] (1st De Morgan's Law)<br>
\\[ \\neg(p \\lor q) \\equiv \\neg p \\land \\neg q \\] (2nd De Morgan's Law)<br><br>

<strong>Quantifiers:</strong><br>
Universal: \\( \\forall x \\in A, P(x) \\)<br>
Existential: \\( \\exists x \\in A, P(x) \\)<br>
Negation of quantifiers:<br>
\\[ \\neg(\\forall x P(x)) \\equiv \\exists x \\neg P(x) \\]<br>
\\[ \\neg(\\exists x P(x)) \\equiv \\forall x \\neg P(x) \\]<br><br>

<strong>Proof Methods:</strong><br>
Direct proof, proof by contraposition, proof by contradiction, proof by induction`
};

function mostrarConteudo() {
    const valor = document.getElementById("topicSelect").value;
    const div = document.getElementById("conteudoSelecionado");
    div.innerHTML = valor ? conteudos[valor] : "";

    // Re-renderizar MathJax após inserir o conteúdo
    if (window.MathJax) {
        MathJax.typesetPromise().catch(err => {
            console.error('Erro ao renderizar MathJax:', err);
        });
    }
}

// Adicionar evento para carregar o MathJax quando a página estiver pronta
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se MathJax está carregado
    if (window.MathJax) {
        MathJax.startup.document.state(0);
        MathJax.typesetPromise();
    }
});

// ===== FAÍSCAS DA LÂMPADA =====
const toggleTheme = document.getElementById("toggleTheme");
const sparksBox = document.getElementById("sparks");

toggleTheme.addEventListener("click", () => {
    criarFaiscas();
});

function criarFaiscas() {
    for (let i = 0; i < 8; i++) {
        let spark = document.createElement("div");
        spark.classList.add("spark");

        // posição inicial (meio das faíscas)
        spark.style.left = "50%";
        spark.style.top = "20%";

        // direção aleatória
        const angulo = Math.random() * Math.PI * 2;
        const distancia = 30 + Math.random() * 40;

        spark.style.setProperty("--x", `${Math.cos(angulo) * distancia}px`);
        spark.style.setProperty("--y", `${Math.sin(angulo) * distancia}px`);

        sparksBox.appendChild(spark);

        setTimeout(() => {
            spark.remove();
        }, 400);
    }
}

// ===== DESMOS GRAPHING CALCULATOR =====
let desmosCalculator = null;
let isDesmosVisible = false;

// Initialize Desmos calculator
function initDesmos() {
    if (!window.Desmos) {
        console.error('Desmos library not loaded');
        return;
    }
    
    const elt = document.getElementById('desmos-calculator');
    if (!elt) return;
    
    desmosCalculator = Desmos.GraphingCalculator(elt, {
        keypad: true,
        graphpaper: true,
        expressions: true,
        settingsMenu: true,
        zoomButtons: true,
        expressionsTopbar: true,
        pointsOfInterest: true,
        trace: true,
        border: false,
        colors: {
            grid: '#ccc',
            axes: '#000'
        }
    });
    
    // Set default view
    desmosCalculator.setMathBounds({
        left: -10,
        right: 10,
        bottom: -10,
        top: 10
    });
}

// Toggle Desmos container visibility
function toggleDesmos() {
    const desmosContainer = document.getElementById('desmosContainer');
    isDesmosVisible = !isDesmosVisible;
    
    if (isDesmosVisible) {
        desmosContainer.style.display = 'block';
        setTimeout(() => {
            desmosContainer.classList.add('visible');
            // Initialize Desmos if not already initialized
            if (!desmosCalculator) {
                initDesmos();
            }
        }, 10);
    } else {
        desmosContainer.classList.remove('visible');
        setTimeout(() => {
            desmosContainer.style.display = 'none';
        }, 400);
    }
}

// Plot equation from current active tab
function plotEquationFromCurrentTab() {
    if (!desmosCalculator) return;
    
    const tipo = document.getElementById('tipoEquacao').value;
    
    switch(tipo) {
        case 'linear':
            plotLinearEquation();
            break;
        case 'quadratic':
            plotQuadraticEquation();
            break;
        case 'cubic':
            plotCubicEquation();
            break;
        case 'quartic':
            plotQuarticEquation();
            break;
        case 'exponential':
            plotExponentialEquation();
            break;
        case 'logarithmic':
            plotLogarithmicEquation();
            break;
        case 'trigonometric':
            plotTrigonometricEquation();
            break;
        default:
            alert('Please select an equation type first.');
    }
}

// Plot linear equation
function plotLinearEquation() {
    const a = obterValorMatematico('linearA');
    const b = obterValorMatematico('linearB');
    const c = obterValorMatematico('linearC');
    const simbolo = document.getElementById('linearInequality').value;
    
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        alert('Please enter valid coefficients first.');
        return;
    }
    
    // Clear previous expressions
    desmosCalculator.setExpressions([]);
    
    // Plot the equation
    if (simbolo === '=') {
        // Plot as line
        const expression = `${formatarNumeroInteiro(a)}x + ${formatarNumeroInteiro(b)} = ${formatarNumeroInteiro(c)}`;
        desmosCalculator.setExpression({
            id: 'graph1',
            latex: `${formatarNumeroInteiro(a)}x + ${formatarNumeroInteiro(b)} = ${formatarNumeroInteiro(c)}`,
            color: Desmos.Colors.BLUE
        });
    } else {
        // Plot inequality region
        const expression = `${formatarNumeroInteiro(a)}x + ${formatarNumeroInteiro(b)} ${simbolo} ${formatarNumeroInteiro(c)}`;
        desmosCalculator.setExpression({
            id: 'graph1',
            latex: `${formatarNumeroInteiro(a)}x + ${formatarNumeroInteiro(b)} ${simbolo} ${formatarNumeroInteiro(c)}`,
            color: Desmos.Colors.BLUE,
            fill: true,
            lines: false
        });
    }
    
    // Adjust view if needed
    adjustViewForLinear(a, b, c);
}

// Adjust view for linear equation
function adjustViewForLinear(a, b, c) {
    if (a === 0) {
        // Horizontal line
        desmosCalculator.setMathBounds({
            left: -10,
            right: 10,
            bottom: Math.min(-10, c - b - 5),
            top: Math.max(10, c - b + 5)
        });
    } else {
        const xIntercept = (c - b) / a;
        desmosCalculator.setMathBounds({
            left: Math.min(-10, xIntercept - 5),
            right: Math.max(10, xIntercept + 5),
            bottom: -10,
            top: 10
        });
    }
}

// Plot quadratic equation
function plotQuadraticEquation() {
    const a = obterValorMatematico('quadraticA');
    const b = obterValorMatematico('quadraticB');
    const c = obterValorMatematico('quadraticC');
    const d = obterValorMatematico('quadraticD');
    const simbolo = document.getElementById('quadraticInequality').value;
    
    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) {
        alert('Please enter valid coefficients first.');
        return;
    }
    
    const constante = c - d;
    desmosCalculator.setExpressions([]);
    
    if (simbolo === '=') {
        desmosCalculator.setExpression({
            id: 'graph1',
            latex: `y = ${formatarNumeroInteiro(a)}x^2 + ${formatarNumeroInteiro(b)}x + ${formatarNumeroInteiro(constante)}`,
            color: Desmos.Colors.RED
        });
    } else {
        desmosCalculator.setExpression({
            id: 'graph1',
            latex: `${formatarNumeroInteiro(a)}x^2 + ${formatarNumeroInteiro(b)}x + ${formatarNumeroInteiro(constante)} ${simbolo} 0`,
            color: Desmos.Colors.RED,
            fill: true
        });
    }
    
    // Find vertex and adjust view
    if (a !== 0) {
        const vertexX = -b / (2 * a);
        const vertexY = a * vertexX * vertexX + b * vertexX + constante;
        
        desmosCalculator.setMathBounds({
            left: vertexX - 5,
            right: vertexX + 5,
            bottom: vertexY - 5,
            top: vertexY + 5
        });
    }
}

// Plot cubic equation
function plotCubicEquation() {
    const a = obterValorMatematico('cubicA');
    const b = obterValorMatematico('cubicB');
    const c = obterValorMatematico('cubicC');
    const d = obterValorMatematico('cubicD');
    const e = obterValorMatematico('cubicE');
    
    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || isNaN(e)) {
        alert('Please enter valid coefficients first.');
        return;
    }
    
    const constante = d - e;
    desmosCalculator.setExpressions([]);
    
    desmosCalculator.setExpression({
        id: 'graph1',
        latex: `y = ${formatarNumeroInteiro(a)}x^3 + ${formatarNumeroInteiro(b)}x^2 + ${formatarNumeroInteiro(c)}x + ${formatarNumeroInteiro(constante)}`,
        color: Desmos.Colors.GREEN
    });
    
    // Adjust view
    desmosCalculator.setMathBounds({
        left: -10,
        right: 10,
        bottom: -10,
        top: 10
    });
}

// Plot quartic equation
function plotQuarticEquation() {
    const a = obterValorMatematico('quarticA');
    const b = obterValorMatematico('quarticB');
    const c = obterValorMatematico('quarticC');
    const d = obterValorMatematico('quarticD');
    const e = obterValorMatematico('quarticE');
    const f_val = obterValorMatematico('quarticF');
    
    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || isNaN(e) || isNaN(f_val)) {
        alert('Please enter valid coefficients first.');
        return;
    }
    
    const constante = e - f_val;
    desmosCalculator.setExpressions([]);
    
    desmosCalculator.setExpression({
        id: 'graph1',
        latex: `y = ${formatarNumeroInteiro(a)}x^4 + ${formatarNumeroInteiro(b)}x^3 + ${formatarNumeroInteiro(c)}x^2 + ${formatarNumeroInteiro(d)}x + ${formatarNumeroInteiro(constante)}`,
        color: Desmos.Colors.PURPLE
    });
    
    // Adjust view
    desmosCalculator.setMathBounds({
        left: -10,
        right: 10,
        bottom: -10,
        top: 10
    });
}

// Plot exponential equation
function plotExponentialEquation() {
    const Q = obterValorMatematico('expQ');
    const Q0 = obterValorMatematico('expQ0');
    const a = obterValorMatematico('expA');
    const t = obterValorMatematico('expT');
    const simbolo = document.getElementById('expInequality').value;
    
    // Determine which variable is unknown
    if (isNaN(Q)) {
        // Q is unknown, plot Q as function of t
        desmosCalculator.setExpressions([]);
        
        if (simbolo === '=') {
            desmosCalculator.setExpression({
                id: 'graph1',
                latex: `y = ${formatarNumeroInteiro(Q0)} \\cdot ${formatarNumeroInteiro(a)}^x`,
                color: Desmos.Colors.ORANGE
            });
        } else {
            desmosCalculator.setExpression({
                id: 'graph1',
                latex: `y ${simbolo} ${formatarNumeroInteiro(Q0)} \\cdot ${formatarNumeroInteiro(a)}^x`,
                color: Desmos.Colors.ORANGE,
                fill: true
            });
        }
        
        // Highlight the point at x = t
        const QValue = Q0 * Math.pow(a, t);
        desmosCalculator.setExpression({
            id: 'point1',
            latex: `(${formatarNumeroInteiro(t)}, ${formatarNumeroInteiro(QValue)})`,
            color: Desmos.Colors.RED,
            pointStyle: Desmos.Styles.CROSS
        });
    }
    // Add similar logic for other unknown variables...
    
    desmosCalculator.setMathBounds({
        left: Math.max(-10, t - 5),
        right: t + 5,
        bottom: 0,
        top: Math.max(10, Q0 * Math.pow(a, t) * 1.5)
    });
}

// Plot logarithmic equation
function plotLogarithmicEquation() {
    const base = obterValorMatematico('logBase');
    const argument = obterValorMatematico('logArgument');
    const result = obterValorMatematico('logResult');
    const simbolo = document.getElementById('logInequality').value;
    
    if (isNaN(base) || isNaN(argument) || isNaN(result)) {
        alert('Please enter valid values first.');
        return;
    }
    
    desmosCalculator.setExpressions([]);
    
    if (simbolo === '=') {
        // Plot logarithmic function
        desmosCalculator.setExpression({
            id: 'graph1',
            latex: `y = \\log_{${formatarNumeroInteiro(base)}}{x}`,
            color: Desmos.Colors.BLUE,
            restrictedDomain: true,
            domain: { min: 0.001 }
        });
        
        // Plot horizontal line at y = result
        desmosCalculator.setExpression({
            id: 'graph2',
            latex: `y = ${formatarNumeroInteiro(result)}`,
            color: Desmos.Colors.RED
        });
        
        // Mark intersection point
        const xValue = Math.pow(base, result);
        desmosCalculator.setExpression({
            id: 'point1',
            latex: `(${formatarNumeroInteiro(xValue)}, ${formatarNumeroInteiro(result)})`,
            color: Desmos.Colors.GREEN,
            pointStyle: Desmos.Styles.CROSS
        });
    }
    
    desmosCalculator.setMathBounds({
        left: 0,
        right: Math.max(10, Math.pow(base, result) * 1.5),
        bottom: Math.min(-5, result - 3),
        top: Math.max(5, result + 3)
    });
}

// Plot trigonometric equation
function plotTrigonometricEquation() {
    const func = document.getElementById('trigFunction').value;
    const angle = obterValorMatematico('trigAngle');
    const value = obterValorMatematico('trigValue');
    const simbolo = document.getElementById('trigInequality').value;
    
    desmosCalculator.setExpressions([]);
    
    if (!isNaN(angle) && isNaN(value)) {
        // Angle is known, value is unknown
        const angleRad = paraRadianos(angle);
        let funcValue;
        
        switch(func) {
            case 'sin': funcValue = Math.sin(angleRad); break;
            case 'cos': funcValue = Math.cos(angleRad); break;
            case 'tan': funcValue = Math.tan(angleRad); break;
            case 'sec': funcValue = 1/Math.cos(angleRad); break;
            case 'csc': funcValue = 1/Math.sin(angleRad); break;
            case 'cot': funcValue = 1/Math.tan(angleRad); break;
        }
        
        // Plot trigonometric function
        desmosCalculator.setExpression({
            id: 'graph1',
            latex: `y = \\${func}(x)`,
            color: Desmos.Colors.BLUE
        });
        
        // Plot vertical line at x = angle
        desmosCalculator.setExpression({
            id: 'graph2',
            latex: `x = ${formatarNumeroInteiro(angle)}`,
            color: Desmos.Colors.RED
        });
        
        // Mark the point
        desmosCalculator.setExpression({
            id: 'point1',
            latex: `(${formatarNumeroInteiro(angle)}, ${formatarNumeroInteiro(funcValue)})`,
            color: Desmos.Colors.GREEN,
            pointStyle: Desmos.Styles.CROSS
        });
    }
    
    desmosCalculator.setMathBounds({
        left: Math.max(-360, angle - 180),
        right: Math.min(360, angle + 180),
        bottom: -2,
        top: 2
    });
}

// Plot custom equation
function plotCustomEquation() {
    const equationInput = document.getElementById('desmosEquation').value;
    
    if (!equationInput.trim()) {
        alert('Please enter an equation.');
        return;
    }
    
    if (!desmosCalculator) {
        alert('Desmos calculator not initialized.');
        return;
    }
    
    // Clear previous expressions except maybe keep some
    const expressions = desmosCalculator.getExpressions();
    const newExpressions = expressions.filter(exp => exp.id && exp.id.startsWith('custom-'));
    
    // Generate new ID
    const newId = 'custom-' + Date.now();
    
    // Add new expression
    desmosCalculator.setExpression({
        id: newId,
        latex: equationInput,
        color: getRandomColor()
    });
    
    // Clear input
    document.getElementById('desmosEquation').value = '';
}

// Get random color for graphs
function getRandomColor() {
    const colors = [
        Desmos.Colors.BLUE,
        Desmos.Colors.RED,
        Desmos.Colors.GREEN,
        Desmos.Colors.PURPLE,
        Desmos.Colors.ORANGE,
        Desmos.Colors.BLACK
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Clear Desmos graph
function clearDesmosGraph() {
    if (desmosCalculator) {
        desmosCalculator.setExpressions([]);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for Desmos toggle button
    const toggleDesmosBtn = document.getElementById('toggleDesmos');
    if (toggleDesmosBtn) {
        toggleDesmosBtn.addEventListener('click', toggleDesmos);
    }
    
    // Add event listener for close Desmos button
    const closeDesmosBtn = document.getElementById('closeDesmos');
    if (closeDesmosBtn) {
        closeDesmosBtn.addEventListener('click', toggleDesmos);
    }
    
    // Initialize Desmos when needed
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const desmosContainer = document.getElementById('desmosContainer');
                if (desmosContainer && desmosContainer.style.display !== 'none' && !desmosCalculator) {
                    initDesmos();
                }
            }
        });
    });
    
    const desmosContainer = document.getElementById('desmosContainer');
    if (desmosContainer) {
        observer.observe(desmosContainer, { attributes: true });
    }
});

// Update the lousa button event listener to also handle Desmos
document.getElementById("abrirLousa").addEventListener("click", () => {
    const lousaContainer = document.getElementById("lousaContainer");
    lousaContainer.style.display = "block";
    setTimeout(() => lousaContainer.classList.add("visivel"), 10);
    document.getElementById("abrirLousa").style.display = "none";
    document.getElementById("fecharLousa").style.display = "inline-block";
    
    // Also show Desmos if it was visible before
    const desmosContainer = document.getElementById("desmosContainer");
    if (desmosContainer && desmosContainer.classList.contains("visible")) {
        desmosContainer.style.display = "block";
        desmosContainer.classList.add("visible");
    }
});

document.getElementById("fecharLousa").addEventListener("click", () => {
    const lousaContainer = document.getElementById("lousaContainer");
    lousaContainer.classList.remove("visivel");
    setTimeout(() => {
        lousaContainer.style.display = "none";
        document.getElementById("abrirLousa").style.display = "inline-block";
        document.getElementById("fecharLousa").style.display = "none";
        
        // Also hide Desmos
        const desmosContainer = document.getElementById("desmosContainer");
        if (desmosContainer) {
            desmosContainer.classList.remove("visible");
            setTimeout(() => {
                desmosContainer.style.display = "none";
            }, 400);
            isDesmosVisible = false;
        }
    }, 400);

    
});


