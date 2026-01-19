// ----- GLOBAL STATE -----
window.currentLevel = 1;

// ----- LEVEL SELECTION -----
window.setTracingLevel = function(event, level) {
    window.currentLevel = level;

    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    event.target.classList.add('active');

    document.getElementById('traceText').style.display =
        level === 4 ? 'block' : 'none';
}

// ----- GENERATE -----
window.generateTracing = function() {
    const output = document.getElementById('tracingOutput');
    output.innerHTML = '';

    const size = document.getElementById('traceSize').value;
    document.documentElement.style.setProperty('--trace-size', size + 'px');

    let symbols = [];

    if (window.currentLevel === 1) {
        const symbol = document.getElementById('traceSymbol').value || 'A';
        const casing = document.getElementById('traceCase').value;
        symbols = Array(20).fill(
            casing === 'upper' ? symbol.toUpperCase() : symbol.toLowerCase()
        );
    }

    if (window.currentLevel === 2) {
        const casing = document.getElementById('traceCase').value;
        const base = casing === 'upper' ? 65 : 97;
        symbols = Array.from({ length: 26 }, (_, i) =>
            String.fromCharCode(base + i)
        );
    }

    if (window.currentLevel === 3) {
        symbols = Array.from({ length: 10 }, (_, i) => i.toString());
    }

    if (window.currentLevel === 4) {
        const text = document.getElementById('traceText').value || '';
        symbols = text.split('');
    }

    // Fill page with rows
    for (let r = 0; r < 8; r++) {
        const row = document.createElement('div');
        row.className = 'tracing-row';

        symbols.forEach(ch => {
            const span = document.createElement('span');
            span.className = 'tracing-char';
            span.textContent = ch;
            row.appendChild(span);
        });

        output.appendChild(row);
    }
}

// ----- DEBUG CONFIRMATION -----
console.log('tracing.js loaded and generateTracing is global');
