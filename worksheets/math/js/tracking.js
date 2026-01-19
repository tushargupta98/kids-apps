let currentLevel = 1;

function setTracingLevel(event, level) {
    currentLevel = level;

    // Button active state
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Toggle custom text
    document.getElementById('traceText').style.display =
        level === 4 ? 'block' : 'none';
}

function generateTracing() {
    const output = document.getElementById('tracingOutput');
    output.innerHTML = '';

    const size = document.getElementById('traceSize').value;
    document.documentElement.style.setProperty('--trace-size', size + 'px');

    let rows = [];
    let symbols = [];

    if (currentLevel === 1) {
        const symbol = document.getElementById('traceSymbol').value || 'A';
        const casing = document.getElementById('traceCase').value;
        const char = casing === 'upper'
            ? symbol.toUpperCase()
            : symbol.toLowerCase();

        symbols = Array(20).fill(char);
    }

    if (currentLevel === 2) {
        const casing = document.getElementById('traceCase').value;
        const start = casing === 'upper' ? 65 : 97;
        symbols = Array.from({ length: 26 }, (_, i) =>
            String.fromCharCode(start + i)
        );
    }

    if (currentLevel === 3) {
        symbols = Array.from({ length: 10 }, (_, i) => i.toString());
    }

    if (currentLevel === 4) {
        const text = document.getElementById('traceText').value || '';
        symbols = text.split('');
    }

    // Fill page with rows
    for (let i = 0; i < 8; i++) {
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

// Safety: make sure JS loaded
console.log('Tracing JS loaded');
