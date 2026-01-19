let tracingLevel = 1;

function setTracingLevel(level) {
    tracingLevel = level;
    document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
}

function generateTracing() {
    const output = document.getElementById('tracingOutput');
    output.innerHTML = '';

    const size = document.getElementById('traceSize').value + 'px';
    document.documentElement.style.setProperty('--trace-size', size);

    let chars = [];

    if (tracingLevel === 1) {
        let ch = document.getElementById('traceSymbol').value?.[0];
        if (!ch) return;
        chars = [document.getElementById('traceCase').value === 'upper'
            ? ch.toUpperCase()
            : ch.toLowerCase()];
    }

    if (tracingLevel === 2) {
        chars = 'abcdefghijklmnopqrstuvwxyz'.split('');
        if (document.getElementById('traceCase').value === 'upper') {
            chars = chars.map(c => c.toUpperCase());
        }
    }

    if (tracingLevel === 3) {
        chars = Array.from({ length: 10 }, (_, i) => i.toString());
    }

    if (tracingLevel === 4) {
        chars = document.getElementById('traceText').value.split('');
    }

    for (let r = 0; r < 60; r++) {
        const row = document.createElement('div');
        row.className = 'tracing-row';

        chars.forEach(c => {
            for (let i = 0; i < 10; i++) {
                const span = document.createElement('span');
                span.className = 'tracing-char';
                span.textContent = c;
                row.appendChild(span);
            }
        });

        output.appendChild(row);

        if (output.scrollHeight > output.clientHeight) {
            output.removeChild(row);
            break;
        }
    }
}
