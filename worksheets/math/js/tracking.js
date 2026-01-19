// tracing.js

// Track the current level globally
window.currentLevel = 1;

// Set level function
window.setTracingLevel = function(event, level) {
    // Remove active class from all buttons
    document.querySelectorAll('.level-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    window.currentLevel = level;

    // Show/hide inputs based on level
    const traceSymbolInput = document.getElementById('traceSymbol');
    const traceCaseSelect = document.getElementById('traceCase');
    const traceTextArea = document.getElementById('traceText');

    if (level === 1) {
        traceSymbolInput.style.display = 'inline-block';
        traceCaseSelect.style.display = 'inline-block';
        traceTextArea.style.display = 'none';
    } else if (level === 2) {
        traceSymbolInput.style.display = 'none';
        traceCaseSelect.style.display = 'inline-block';
        traceTextArea.style.display = 'none';
    } else if (level === 3) {
        traceSymbolInput.style.display = 'none';
        traceCaseSelect.style.display = 'none';
        traceTextArea.style.display = 'none';
    } else if (level === 4) {
        traceSymbolInput.style.display = 'none';
        traceCaseSelect.style.display = 'none';
        traceTextArea.style.display = 'inline-block';
    }

    generateTracing();
};

// Main generateTracing function
window.generateTracing = function() {
    const output = document.getElementById('tracingOutput');
    output.innerHTML = '';

    // Apply font size
    const size = document.getElementById('traceSize').value;
    document.documentElement.style.setProperty('--trace-size', size + 'px');

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

    // LEVEL 2: All alphabets, repeated per row
    if (window.currentLevel === 2) {
        const casing = document.getElementById('traceCase').value;
        const base = casing === 'upper' ? 65 : 97;

        for (let i = 0; i < 26; i++) {
            const row = document.createElement('div');
            row.className = 'tracing-row';
            const ch = String.fromCharCode(base + i);

            for (let j = 0; j < 8; j++) {
                const span = document.createElement('span');
                span.className = 'tracing-char';
                span.textContent = ch;
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

    // LEVEL 4: Custom text, one long line
    if (window.currentLevel === 4) {
        const text = document.getElementById('traceText').value.trim();
        if (!text) return;

        const row = document.createElement('div');
        row.className = 'tracing-row';

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
