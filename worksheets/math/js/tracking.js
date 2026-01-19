// GLOBAL VARIABLES
window.currentLevel = 1;

// Attach level buttons
function setTracingLevel(event, level) {
    window.currentLevel = level;

    document.querySelectorAll('.level-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // Show/hide inputs based on level
    document.getElementById('traceSymbol').style.display = (level === 1 || level === 2 || level === 3) ? 'inline-block' : 'none';
    document.getElementById('traceCase').style.display = (level === 2 || level === 3) ? 'inline-block' : 'none';
    document.getElementById('traceText').style.display = (level === 4) ? 'block' : 'none';

    generateTracing();
}

// MAIN GENERATE FUNCTION
function generateTracing() {
    const output = document.getElementById('tracingOutput');
    output.innerHTML = '';

    // Get font and size
    const fontSelect = document.getElementById('traceFont');
    const font = fontSelect ? fontSelect.value : 'KG Primary Dots';
    const sizeInput = document.getElementById('traceSize');
    const size = sizeInput ? parseInt(sizeInput.value) : 72;
    document.documentElement.style.setProperty('--trace-size', size + 'px');
    output.style.fontFamily = font;

    // LEVEL 1: Single letter filling
    if (window.currentLevel === 1) {
        const char = (document.getElementById('traceSymbol').value || 'A').toUpperCase();
        fillDivWithChar(output, char, size);
        return;
    }

    // LEVEL 2: Letter range
    if (window.currentLevel === 2) {
        let rangeInput = document.getElementById('traceSymbol').value || 'A-Z';
        let [startChar, endChar] = rangeInput.toUpperCase().split('-');

        if (!endChar) endChar = startChar; // default if single letter entered

        const letters = [];
        for (let c = startChar.charCodeAt(0); c <= endChar.charCodeAt(0); c++) {
            letters.push(String.fromCharCode(c));
        }

        fillDivWithSequence(output, letters, size);
        return;
    }

    // LEVEL 3: Numbers
    if (window.currentLevel === 3) {
        let rangeInput = document.getElementById('traceSymbol').value || '0-9';
        let [startNum, endNum] = rangeInput.split('-').map(Number);
        if (isNaN(startNum)) startNum = 0;
        if (isNaN(endNum)) endNum = 9;

        const numbers = [];
        for (let n = startNum; n <= endNum; n++) numbers.push(n);

        fillDivWithSequence(output, numbers, size);
        return;
    }

    // LEVEL 4: Custom text
    if (window.currentLevel === 4) {
        const text = document.getElementById('traceText').value || '';
        const row = document.createElement('div');
        row.className = 'tracing-row';
        row.style.flexWrap = 'wrap';
        row.style.wordBreak = 'break-word';
        row.style.width = '100%';

        const span = document.createElement('span');
        span.className = 'tracing-char';
        span.textContent = text;
        row.appendChild(span);

        output.appendChild(row);
        return;
    }
}

// HELPER: fill div with a single char
function fillDivWithChar(container, char, size) {
    const rowHeight = size * 1.5;
    const areaHeight = container.clientHeight;
    const numRows = Math.floor(areaHeight / rowHeight);

    const spanWidth = size * 0.8;
    const areaWidth = container.clientWidth;
    const numCols = Math.floor(areaWidth / spanWidth);

    for (let r = 0; r < numRows; r++) {
        const row = document.createElement('div');
        row.className = 'tracing-row';
        for (let c = 0; c < numCols; c++) {
            const span = document.createElement('span');
            span.className = 'tracing-char';
            span.textContent = char;
            row.appendChild(span);
        }
        container.appendChild(row);
    }
}

// HELPER: fill div with a sequence (letters or numbers) repeatedly
function fillDivWithSequence(container, sequence, size) {
    const rowHeight = size * 1.5;
    const areaHeight = container.clientHeight;
    const numRows = Math.floor(areaHeight / rowHeight);

    const spanWidth = size * 0.8;
    const areaWidth = container.clientWidth;
    const numCols = Math.floor(areaWidth / spanWidth);

    for (let r = 0; r < numRows; r++) {
        const row = document.createElement('div');
        row.className = 'tracing-row';
        for (let c = 0; c < numCols; c++) {
            const span = document.createElement('span');
            span.className = 'tracing-char';
            span.textContent = sequence[c % sequence.length];
            row.appendChild(span);
        }
        container.appendChild(row);
    }
}
