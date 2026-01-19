// tracing.js

window.currentLevel = 1;

window.setTracingLevel = function(event, level) {
    document.querySelectorAll('.level-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    window.currentLevel = level;

    const traceSymbolInput = document.getElementById('traceSymbol');
    const traceCaseSelect = document.getElementById('traceCase');
    const traceTextArea = document.getElementById('traceText');
    const rangeInputs = document.getElementById('rangeStart').parentElement;

    if (level === 1) {
        traceSymbolInput.style.display = 'inline-block';
        traceCaseSelect.style.display = 'inline-block';
        traceTextArea.style.display = 'none';
        rangeInputs.style.display = 'none';
    } else if (level === 2) {
        traceSymbolInput.style.display = 'none';
        traceCaseSelect.style.display = 'inline-block';
        traceTextArea.style.display = 'none';
        rangeInputs.style.display = 'inline-block';
    } else if (level === 3) {
        traceSymbolInput.style.display = 'none';
        traceCaseSelect.style.display = 'none';
        traceTextArea.style.display = 'none';
        rangeInputs.style.display = 'none';
    } else if (level === 4) {
        traceSymbolInput.style.display = 'none';
        traceCaseSelect.style.display = 'none';
        traceTextArea.style.display = 'inline-block';
        rangeInputs.style.display = 'none';
    }

    generateTracing();
};

window.generateTracing = function() {
    const output = document.getElementById('tracingOutput');
    output.innerHTML = '';

    // Set size and font
    const size = document.getElementById('traceSize').value;
    document.documentElement.style.setProperty('--trace-size', size + 'px');
    const font = document.getElementById('traceFont').value;
    output.style.fontFamily = font;

    // LEVEL 1: Single alphabet repeated in one row
    if (window.currentLevel === 1) {
        const symbol = document.getElementById('traceSymbol').value || 'A';
        const casing = document.getElementById('traceCase').value;
        const ch = casing === 'upper' ? symbol.toUpperCase() : symbol.toLowerCase();

        const row = document.createElement('div');
        row.className = 'tracing-row';
        for (let i = 0; i < 12; i++) {
            const span = document.createElement('span');
            span.className = 'tracing-char';
            span.textContent = ch;
            row.appendChild(span);
        }
        output.appendChild(row);
        return;
    }

    // LEVEL 2: All alphabets repeated per row with optional range
    if (window.currentLevel === 2) {
        const casing = document.getElementById('traceCase').value;
        const startChar = document.getElementById('rangeStart').value.toUpperCase() || 'A';
        const endChar = document.getElementById('rangeEnd').value.toUpperCase() || 'Z';
        const startCode = startChar.charCodeAt(0);
        const endCode = endChar.charCodeAt(0);

        for (let i = startCode; i <= endCode; i++) {
            const row = document.createElement('div');
            row.className = 'tracing-row';
            const ch = String.fromCharCode(i);
            const displayChar = casing === 'upper' ? ch.toUpperCase() : ch.toLowerCase();

            for (let j = 0; j < 8; j++) {
                const span = document.createElement('span');
                span.className = 'tracing-char';
                span.textContent = displayChar;
                row.appendChild(span);
            }
            output.appendChild(row);
        }
        return;
    }

    // LEVEL 3: Numbers 0–9 repeated in one row
    if (window.currentLevel === 3) {
        const row = document.createElement('div');
        row.className = 'tracing-row';
        for (let i = 0; i <= 9; i++) {
            const span = document.createElement('span');
            span.className = 'tracing-char';
            span.textContent = i;
            row.appendChild(span);
        }
        output.appendChild(row);
        return;
    }

    // LEVEL 4: Custom text wrapped within div
    if (window.currentLevel === 4) {
        const text = document.getElementById('traceText').value.trim();
        if (!text) return;

        const row = document.createElement('div');
        row.className = 'tracing-row';
        row.style.flexWrap = 'wrap';
        row.style.whiteSpace = 'normal';

        text.split('').forEach(ch => {
            const span = document.createElement('span');
            span.className = 'tracing-char';
            span.textContent = ch;
            row.appendChild(span);
        });

        output.appendChild(row);
        return;
    }
};
