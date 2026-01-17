// Sistema de Solver Gráfico Avançado
class MathSolver {
    constructor() {
        this.functions = [];
        this.nextColorIndex = 0;
        this.graphTraces = [];
        this.currentZoom = 1.0;
        this.cursorPosition = { x: 0, y: 0 };
        
        // Cores disponíveis
        this.colors = [
            '#4285f4', '#ea4335', '#34a853', '#fbbc05', 
            '#8b46ff', '#00bcd4', '#ff6d00', '#9c27b0'
        ];
        
        this.init();
    }
    
    init() {
        this.setupDOM();
        this.setupEventListeners();
        this.setupMathJS();
        this.initializeGraph();
        this.loadExamples();
        
        // Mostrar teclado por padrão em mobile
        if (window.innerWidth < 768) {
            this.toggleKeyboard();
        }
    }
    
    setupDOM() {
        this.elements = {
            mainInput: document.getElementById('main-input'),
            evalBtn: document.getElementById('eval-btn'),
            solveBtn: document.getElementById('solve-btn'),
            functionsList: document.getElementById('functions-list'),
            graph: document.getElementById('graph'),
            keyboardPanel: document.getElementById('keyboard-panel'),
            toggleKeyboard: document.getElementById('toggle-keyboard'),
            closeKeyboard: document.getElementById('close-keyboard'),
            clearAll: document.getElementById('clear-all'),
            solutionsList: document.getElementById('solutions-list'),
            cursorPosition: document.getElementById('cursor-position'),
            zoomLevel: document.getElementById('zoom-level'),
            suggestions: document.getElementById('suggestions')
        };
    }
    
    setupMathJS() {
        // Configurar mathjs para suportar mais funções
        math.import({
            csc: function(x) { return 1 / Math.sin(x); },
            sec: function(x) { return 1 / Math.cos(x); },
            cot: function(x) { return 1 / Math.tan(x); },
            acsc: function(x) { return Math.asin(1/x); },
            asec: function(x) { return Math.acos(1/x); },
            acot: function(x) { return Math.atan(1/x); },
            sech: function(x) { return 1 / Math.cosh(x); },
            csch: function(x) { return 1 / Math.sinh(x); },
            coth: function(x) { return 1 / Math.tanh(x); }
        });
        
        // Adicionar constantes
        math.import({
            tau: 2 * Math.PI,
            phi: (1 + Math.sqrt(5)) / 2,
            infinity: Infinity
        });
    }
    
    setupEventListeners() {
        // Botão de plotar
        this.elements.evalBtn.addEventListener('click', () => this.plotFunction());
        
        // Botão de resolver
        this.elements.solveBtn.addEventListener('click', () => this.solveEquation());
        
        // Input principal (Enter para plotar)
        this.elements.mainInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.plotFunction();
            }
        });
        
        // Input principal (autocomplete)
        this.elements.mainInput.addEventListener('input', (e) => this.showSuggestions(e.target.value));
        
        // Teclado virtual
        this.elements.toggleKeyboard.addEventListener('click', () => this.toggleKeyboard());
        this.elements.closeKeyboard.addEventListener('click', () => this.toggleKeyboard(false));
        
        // Limpar tudo
        this.elements.clearAll.addEventListener('click', () => this.clearAll());
        
        // Teclas do teclado virtual
        document.querySelectorAll('.keyboard-key').forEach(key => {
            key.addEventListener('click', (e) => {
                const text = e.target.getAttribute('data-insert');
                this.insertText(text);
            });
        });
        
        // Abas do teclado
        document.querySelectorAll('.keyboard-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabId = e.target.getAttribute('data-tab');
                this.switchKeyboardTab(tabId);
            });
        });
        
        // Teclas especiais do teclado
        document.getElementById('keyboard-backspace').addEventListener('click', () => this.backspace());
        document.getElementById('keyboard-clear').addEventListener('click', () => this.clearInput());
        document.getElementById('keyboard-space').addEventListener('click', () => this.insertText(' '));
        document.getElementById('keyboard-enter').addEventListener('click', () => this.plotFunction());
        
        // Exemplos rápidos
        document.querySelectorAll('.example-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const expr = e.target.getAttribute('data-expr');
                this.elements.mainInput.value = expr;
                this.elements.mainInput.focus();
            });
        });
        
        // Atalhos de teclado
        document.addEventListener('keydown', (e) => {
            // Ctrl+Enter para plotar
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                this.plotFunction();
            }
            
            // Ctrl+K para teclado
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                this.toggleKeyboard();
            }
            
            // Ctrl+D para limpar
            if (e.ctrlKey && e.key === 'd') {
                e.preventDefault();
                this.clearAll();
            }
            
            // Esc para fechar teclado
            if (e.key === 'Escape') {
                this.toggleKeyboard(false);
            }
        });
        
        // Configurações do gráfico
        document.getElementById('x-min').addEventListener('change', () => this.updateGraph());
        document.getElementById('x-max').addEventListener('change', () => this.updateGraph());
        document.getElementById('y-min').addEventListener('change', () => this.updateGraph());
        document.getElementById('y-max').addEventListener('change', () => this.updateGraph());
        document.getElementById('step').addEventListener('change', () => this.updateGraph());
        
        // Controles do gráfico
        document.getElementById('zoom-in').addEventListener('click', () => this.zoom(1.2));
        document.getElementById('zoom-out').addEventListener('click', () => this.zoom(0.8));
        document.getElementById('reset-view').addEventListener('click', () => this.resetView());
        document.getElementById('fit-view').addEventListener('click', () => this.fitView());
        
        // Rastrear cursor no gráfico
        this.elements.graph.on('plotly_hover', (data) => {
            if (data.points && data.points[0]) {
                const point = data.points[0];
                this.cursorPosition = { x: point.x, y: point.y };
                this.elements.cursorPosition.textContent = 
                    `x: ${point.x.toFixed(4)}, y: ${point.y.toFixed(4)}`;
            }
        });
    }
    
    initializeGraph() {
        const layout = {
            title: {
                text: 'Gráfico Interativo',
                font: { color: '#e0e0e0' }
            },
            xaxis: {
                title: 'Eixo X',
                gridcolor: '#3a3a5d',
                zerolinecolor: '#3a3a5d',
                linecolor: '#e0e0e0',
                tickfont: { color: '#e0e0e0' },
                titlefont: { color: '#e0e0e0' },
                range: [-10, 10]
            },
            yaxis: {
                title: 'Eixo Y',
                gridcolor: '#3a3a5d',
                zerolinecolor: '#3a3a5d',
                linecolor: '#e0e0e0',
                tickfont: { color: '#e0e0e0' },
                titlefont: { color: '#e0e0e0' },
                range: [-10, 10]
            },
            plot_bgcolor: '#1a1a2e',
            paper_bgcolor: '#1a1a2e',
            showlegend: true,
            legend: {
                font: { color: '#e0e0e0' },
                bgcolor: 'rgba(45, 45, 68, 0.8)',
                bordercolor: '#3a3a5d'
            },
            hovermode: 'closest'
        };
        
        Plotly.newPlot(this.elements.graph, [], layout, {
            responsive: true,
            displayModeBar: true,
            displaylogo: false,
            modeBarButtonsToAdd: ['drawline', 'drawopenpath', 'eraseshape']
        });
    }
    
    toggleKeyboard(show) {
        if (show === undefined) {
            show = !this.elements.keyboardPanel.classList.contains('show');
        }
        
        if (show) {
            this.elements.keyboardPanel.classList.add('show');
            this.elements.toggleKeyboard.innerHTML = '<i class="fas fa-keyboard"></i>';
            this.elements.toggleKeyboard.title = 'Ocultar teclado';
        } else {
            this.elements.keyboardPanel.classList.remove('show');
            this.elements.toggleKeyboard.innerHTML = '<i class="fas fa-keyboard"></i>';
            this.elements.toggleKeyboard.title = 'Mostrar teclado';
        }
    }
    
    switchKeyboardTab(tabId) {
        // Remover classe active de todas as abas
        document.querySelectorAll('.keyboard-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        document.querySelectorAll('.keyboard-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Adicionar classe active à aba selecionada
        document.querySelector(`.keyboard-tab[data-tab="${tabId}"]`).classList.add('active');
        document.getElementById(`tab-${tabId}`).classList.add('active');
    }
    
    insertText(text) {
        const input = this.elements.mainInput;
        const start = input.selectionStart;
        const end = input.selectionEnd;
        
        input.value = input.value.substring(0, start) + text + input.value.substring(end);
        input.selectionStart = input.selectionEnd = start + text.length;
        input.focus();
        
        // Atualizar sugestões
        this.showSuggestions(input.value);
    }
    
    backspace() {
        const input = this.elements.mainInput;
        const start = input.selectionStart;
        const end = input.selectionEnd;
        
        if (start === end && start > 0) {
            input.value = input.value.substring(0, start - 1) + input.value.substring(end);
            input.selectionStart = input.selectionEnd = start - 1;
        } else if (start !== end) {
            input.value = input.value.substring(0, start) + input.value.substring(end);
            input.selectionStart = input.selectionEnd = start;
        }
        
        input.focus();
    }
    
    clearInput() {
        this.elements.mainInput.value = '';
        this.elements.mainInput.focus();
    }
    
    showSuggestions(text) {
        const suggestions = this.getSuggestions(text);
        const container = this.elements.suggestions;
        
        if (suggestions.length > 0 && text.length > 0) {
            container.innerHTML = suggestions.map(s => 
                `<div class="suggestion-item" data-expr="${s}">${s}</div>`
            ).join('');
            
            container.style.display = 'block';
            
            // Adicionar event listeners às sugestões
            container.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    this.elements.mainInput.value = e.target.getAttribute('data-expr');
                    container.style.display = 'none';
                    this.elements.mainInput.focus();
                });
            });
        } else {
            container.style.display = 'none';
        }
    }
    
    getSuggestions(text) {
        const allFunctions = [
            'sin(x)', 'cos(x)', 'tan(x)', 'log(x)', 'exp(x)', 'sqrt(x)',
            'x^2', 'x^3', '1/x', 'abs(x)', 'x^2 + y^2', 'sin(x)*cos(x)',
            'e^(-x^2)', 'log10(x)', 'ln(x)', 'x!', 'sin(x)^2 + cos(x)^2'
        ];
        
        if (!text) return [];
        
        return allFunctions.filter(func => 
            func.toLowerCase().includes(text.toLowerCase())
        ).slice(0, 5);
    }
    
    plotFunction() {
        const expr = this.elements.mainInput.value.trim();
        if (!expr) {
            this.showError('Digite uma expressão válida.');
            return;
        }
        
        try {
            // Validar expressão
            const compiled = math.compile(expr);
            
            // Testar a expressão com alguns valores
            for (let x of [-1, 0, 1]) {
                const scope = { x: x };
                compiled.evaluate(scope);
            }
            
            // Adicionar função à lista
            const color = this.colors[this.nextColorIndex % this.colors.length];
            this.nextColorIndex++;
            
            const funcId = Date.now();
            this.functions.push({
                id: funcId,
                expression: expr,
                color: color,
                compiled: compiled
            });
            
            // Atualizar interface
            this.updateFunctionsList();
            this.updateGraph();
            
            // Limpar input
            this.elements.mainInput.value = '';
            this.elements.suggestions.style.display = 'none';
            
        } catch (error) {
            this.showError(`Erro na expressão: ${error.message}`);
        }
    }
    
    solveEquation() {
        const expr = this.elements.mainInput.value.trim();
        if (!expr) {
            this.showError('Digite uma equação para resolver.');
            return;
        }
        
        try {
            let solutionText = '';
            
            // Tentar diferentes métodos de solução
            if (expr.includes('=')) {
                // É uma equação
                const [left, right] = expr.split('=').map(s => s.trim());
                const equation = `${left} - (${right})`;
                
                // Tentar encontrar raízes
                const solutions = this.findRoots(equation, -10, 10);
                
                if (solutions.length > 0) {
                    solutionText = `Soluções para ${expr}:<br>`;
                    solutions.forEach((sol, i) => {
                        solutionText += `x${i+1} = ${sol.toFixed(4)}<br>`;
                    });
                } else {
                    solutionText = `Nenhuma solução encontrada para ${expr} no intervalo [-10, 10]`;
                }
            } else {
                // É uma expressão, calcular derivada e integral
                const compiled = math.compile(expr);
                
                // Calcular derivada simbólica
                try {
                    const derivative = math.derivative(expr, 'x').toString();
                    solutionText += `Derivada: f'(x) = ${derivative}<br>`;
                } catch (e) {
                    solutionText += `Não foi possível calcular a derivada.<br>`;
                }
                
                // Calcular em pontos específicos
                solutionText += `<br>Valores:<br>`;
                for (let x of [-2, -1, 0, 1, 2]) {
                    try {
                        const y = compiled.evaluate({ x: x });
                        solutionText += `f(${x}) = ${y.toFixed(4)}<br>`;
                    } catch (e) {
                        solutionText += `f(${x}) = indefinido<br>`;
                    }
                }
            }
            
            // Mostrar soluções
            this.elements.solutionsList.innerHTML = solutionText;
            
        } catch (error) {
            this.showError(`Erro ao resolver: ${error.message}`);
        }
    }
    
    findRoots(equation, min, max, steps = 1000) {
        const roots = [];
        const compiled = math.compile(equation);
        const step = (max - min) / steps;
        
        let lastValue = null;
        
        for (let i = 0; i <= steps; i++) {
            const x = min + i * step;
            
            try {
                const value = compiled.evaluate({ x: x });
                
                if (lastValue !== null) {
                    // Verificar mudança de sinal
                    if (lastValue * value <= 0 && Math.abs(lastValue) < 1e10 && Math.abs(value) < 1e10) {
                        // Refinar raiz usando método da bisseção
                        const root = this.bisection(equation, x - step, x);
                        if (root !== null && !roots.some(r => Math.abs(r - root) < 0.001)) {
                            roots.push(root);
                        }
                    }
                }
                
                lastValue = value;
            } catch (e) {
                lastValue = null;
            }
        }
        
        return roots;
    }
    
    bisection(equation, a, b, maxIterations = 50) {
        const compiled = math.compile(equation);
        
        let fa, fb;
        try {
            fa = compiled.evaluate({ x: a });
            fb = compiled.evaluate({ x: b });
        } catch (e) {
            return null;
        }
        
        if (fa * fb > 0) return null;
        
        for (let i = 0; i < maxIterations; i++) {
            const c = (a + b) / 2;
            
            try {
                const fc = compiled.evaluate({ x: c });
                
                if (Math.abs(fc) < 1e-10 || (b - a) / 2 < 1e-10) {
                    return c;
                }
                
                if (fa * fc < 0) {
                    b = c;
                    fb = fc;
                } else {
                    a = c;
                    fa = fc;
                }
            } catch (e) {
                return null;
            }
        }
        
        return (a + b) / 2;
    }
    
    updateFunctionsList() {
        const container = this.elements.functionsList;
        container.innerHTML = '';
        
        this.functions.forEach((func, index) => {
            const funcElement = document.createElement('div');
            funcElement.className = 'function-item';
            funcElement.style.borderLeftColor = func.color;
            
            funcElement.innerHTML = `
                <div class="function-expr">f${index+1}(x) = ${func.expression}</div>
                <div class="function-actions">
                    <button class="function-btn function-color" data-id="${func.id}" title="Mudar cor">
                        <i class="fas fa-palette"></i>
                    </button>
                    <button class="function-btn function-edit" data-id="${func.id}" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="function-btn function-delete" data-id="${func.id}" title="Remover">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            
            container.appendChild(funcElement);
        });
        
        // Adicionar event listeners aos botões
        container.querySelectorAll('.function-color').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const funcId = parseInt(e.target.closest('button').getAttribute('data-id'));
                this.changeFunctionColor(funcId);
            });
        });
        
        container.querySelectorAll('.function-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const funcId = parseInt(e.target.closest('button').getAttribute('data-id'));
                this.editFunction(funcId);
            });
        });
        
        container.querySelectorAll('.function-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const funcId = parseInt(e.target.closest('button').getAttribute('data-id'));
                this.removeFunction(funcId);
            });
        });
    }
    
    changeFunctionColor(funcId) {
        const funcIndex = this.functions.findIndex(f => f.id === funcId);
        if (funcIndex !== -1) {
            // Rotacionar para próxima cor
            const currentColor = this.functions[funcIndex].color;
            const currentIndex = this.colors.indexOf(currentColor);
            const nextIndex = (currentIndex + 1) % this.colors.length;
            
            this.functions[funcIndex].color = this.colors[nextIndex];
            this.updateFunctionsList();
            this.updateGraph();
        }
    }
    
    editFunction(funcId) {
        const func = this.functions.find(f => f.id === funcId);
        if (func) {
            this.elements.mainInput.value = func.expression;
            this.elements.mainInput.focus();
            this.removeFunction(funcId);
        }
    }
    
    removeFunction(funcId) {
        this.functions = this.functions.filter(f => f.id !== funcId);
        this.updateFunctionsList();
        this.updateGraph();
    }
    
    clearAll() {
        this.functions = [];
        this.updateFunctionsList();
        this.updateGraph();
        this.elements.solutionsList.innerHTML = '';
        this.elements.mainInput.value = '';
    }
    
    updateGraph() {
        const traces = [];
        const xMin = parseFloat(document.getElementById('x-min').value) || -10;
        const xMax = parseFloat(document.getElementById('x-max').value) || 10;
        const step = parseFloat(document.getElementById('step').value) || 0.1;
        
        // Gerar pontos do eixo x
        const xValues = [];
        for (let x = xMin; x <= xMax; x += step) {
            xValues.push(x);
        }
        
        // Adicionar cada função
        this.functions.forEach((func, index) => {
            const yValues = [];
            const validPoints = [];
            
            for (let i = 0; i < xValues.length; i++) {
                try {
                    const y = func.compiled.evaluate({ x: xValues[i] });
                    
                    if (isFinite(y) && !isNaN(y)) {
                        yValues.push(y);
                        validPoints.push(i);
                    } else {
                        yValues.push(null);
                    }
                } catch (error) {
                    yValues.push(null);
                }
            }
            
            // Criar traço
            traces.push({
                x: xValues,
                y: yValues,
                mode: 'lines',
                name: `f${index+1}(x) = ${func.expression}`,
                line: {
                    color: func.color,
                    width: 3
                },
                hoverinfo: 'x+y+name'
            });
        });
        
        // Adicionar eixos
        traces.push({
            x: [xMin, xMax],
            y: [0, 0],
            mode: 'lines',
            name: 'Eixo X',
            line: {
                color: '#e0e0e0',
                width: 1,
                dash: 'dash'
            },
            showlegend: false
        });
        
        traces.push({
            x: [0, 0],
            y: [parseFloat(document.getElementById('y-min').value) || -10, 
                parseFloat(document.getElementById('y-max').value) || 10],
            mode: 'lines',
            name: 'Eixo Y',
            line: {
                color: '#e0e0e0',
                width: 1,
                dash: 'dash'
            },
            showlegend: false
        });
        
        // Atualizar layout
        const layoutUpdate = {
            xaxis: {
                range: [xMin, xMax]
            },
            yaxis: {
                range: [
                    parseFloat(document.getElementById('y-min').value) || -10,
                    parseFloat(document.getElementById('y-max').value) || 10
                ]
            }
        };
        
        Plotly.react(this.elements.graph, traces, layoutUpdate);
    }
    
    zoom(factor) {
        this.currentZoom *= factor;
        this.elements.zoomLevel.textContent = `Zoom: ${this.currentZoom.toFixed(2)}x`;
        
        const xMin = parseFloat(document.getElementById('x-min').value) || -10;
        const xMax = parseFloat(document.getElementById('x-max').value) || 10;
        const yMin = parseFloat(document.getElementById('y-min').value) || -10;
        const yMax = parseFloat(document.getElementById('y-max').value) || 10;
        
        const xCenter = (xMin + xMax) / 2;
        const yCenter = (yMin + yMax) / 2;
        const xRange = (xMax - xMin) / factor;
        const yRange = (yMax - yMin) / factor;
        
        document.getElementById('x-min').value = (xCenter - xRange / 2).toFixed(2);
        document.getElementById('x-max').value = (xCenter + xRange / 2).toFixed(2);
        document.getElementById('y-min').value = (yCenter - yRange / 2).toFixed(2);
        document.getElementById('y-max').value = (yCenter + yRange / 2).toFixed(2);
        
        this.updateGraph();
    }
    
    resetView() {
        document.getElementById('x-min').value = -10;
        document.getElementById('x-max').value = 10;
        document.getElementById('y-min').value = -10;
        document.getElementById('y-max').value = 10;
        document.getElementById('step').value = 0.1;
        this.currentZoom = 1.0;
        this.elements.zoomLevel.textContent = 'Zoom: 1.00x';
        this.updateGraph();
    }
    
    fitView() {
        // Encontrar valores mínimos e máximos de todas as funções
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;
        
        this.functions.forEach(func => {
            const xMin = parseFloat(document.getElementById('x-min').value) || -10;
            const xMax = parseFloat(document.getElementById('x-max').value) || 10;
            const step = parseFloat(document.getElementById('step').value) || 0.1;
            
            for (let x = xMin; x <= xMax; x += step) {
                try {
                    const y = func.compiled.evaluate({ x: x });
                    if (isFinite(y) && !isNaN(y)) {
                        minX = Math.min(minX, x);
                        maxX = Math.max(maxX, x);
                        minY = Math.min(minY, y);
                        maxY = Math.max(maxY, y);
                    }
                } catch (e) {
                    // Ignorar erros
                }
            }
        });
        
        // Adicionar margem
        const xMargin = Math.max(1, (maxX - minX) * 0.1);
        const yMargin = Math.max(1, (maxY - minY) * 0.1);
        
        if (isFinite(minX) && isFinite(maxX)) {
            document.getElementById('x-min').value = (minX - xMargin).toFixed(2);
            document.getElementById('x-max').value = (maxX + xMargin).toFixed(2);
        }
        
        if (isFinite(minY) && isFinite(maxY)) {
            document.getElementById('y-min').value = (minY - yMargin).toFixed(2);
            document.getElementById('y-max').value = (maxY + yMargin).toFixed(2);
        }
        
        this.currentZoom = 1.0;
        this.elements.zoomLevel.textContent = 'Zoom: 1.00x';
        this.updateGraph();
    }
    
    loadExamples() {
        // Adicionar alguns exemplos iniciais
        const examples = [
            'x^2',
            'sin(x)',
            'exp(-x^2)',
            'log(x+1, 10)'
        ];
        
        // Plotar exemplos após um breve delay
        setTimeout(() => {
            examples.forEach((expr, i) => {
                setTimeout(() => {
                    this.elements.mainInput.value = expr;
                    this.plotFunction();
                }, i * 300);
            });
        }, 1000);
    }
    
    showError(message) {
        // Mostrar erro nas soluções
        this.elements.solutionsList.innerHTML = 
            `<div style="color: #ea4335; padding: 10px; border: 1px solid #ea4335; border-radius: 5px;">
                <i class="fas fa-exclamation-triangle"></i> ${message}
            </div>`;
    }
}

// Inicializar o solver quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.mathSolver = new MathSolver();
});
