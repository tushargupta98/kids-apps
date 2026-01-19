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
    // LEVEL 1: Single alphabet filling the entire worksheet
if (window.currentLevel === 1) {
    const symbol = document.getElementById('traceSymbol').value || 'A';
    const casing = document.getElementById('traceCase').value;
    const ch = casing === 'upper' ? symbol.toUpperCase() : symbol.toLowerCase();

    const rowHeight = parseInt(size) * 1.5; // approx row height based on font-size
    const areaHeight = output.clientHeight;
    const numRows = Math.floor(areaHeight / rowHeight);

    const spanWidth = parseInt(size) * 0.8; // approximate width per char
    const areaWidth = output.clientWidth;
    const numCols = Math.floor(areaWidth / spanWidth);

    for (let r = 0; r < numRows; r++) {
        const row = document.createElement('div');
        row.className = 'tracing-row';

        for (let c = 0; c < numCols; c++) {
            const span = document.createElement('span');
            span.className = 'tracing-char';
            span.textContent = ch;
            row.appendChild(span);
        }

        output.appendChild(row);
    }
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

    // LEVEL 3: Numbers filling the div
if (window.currentLevel === 3) {
    let startNum = parseInt(document.getElementById('traceSymbol').value) || 0;
    let endNum = parseInt(document.getElementById('traceCase').value) || 9; // use select for range if needed
    if (startNum > endNum) [startNum, endNum] = [endNum, startNum];

    const numbers = [];
    for (let n = startNum; n <= endNum; n++) numbers.push(n);

    const rowHeight = parseInt(size) * 1.5; // approx row height
    const areaHeight = output.clientHeight;
    const numRows = Math.floor(areaHeight / rowHeight);

    const spanWidth = parseInt(size) * 0.8; // approximate width per number
    const areaWidth = output.clientWidth;
    const numCols = Math.floor(areaWidth / spanWidth);

    for (let r = 0; r < numRows; r++) {
        const row = document.createElement('div');
        row.className = 'tracing-row';

        for (let c = 0; c < numCols; c++) {
            const span = document.createElement('span');
            span.className = 'tracing-char';
            span.textContent = numbers[(c + r * numCols) % numbers.length]; // cycle numbers
            row.appendChild(span);
        }

        output.appendChild(row);
    }
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
