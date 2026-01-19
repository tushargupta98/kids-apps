let currentLevel = 1;
let customTableNumber = 2;

// Level configuration
const levelConfig = {
    1: { firstMax: 10, secondMin: 0, secondMax: 5 },
    2: { firstMax: 10, secondMin: 5, secondMax: 10 },
    3: { firstMax: 10, secondMin: 10, secondMax: 15 },
    4: { firstMax: 10, secondMin: 15, secondMax: 20 }
};

// Level selection
document.querySelectorAll('.level-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentLevel = parseInt(this.dataset.level);
        
        const customSelector = document.getElementById('customTableSelector');
        const page2 = document.querySelectorAll('.worksheet')[1];
        
        if (currentLevel === 5) {
            customSelector.style.display = 'block';
            page2.style.display = 'none';
        } else {
            customSelector.style.display = 'none';
            page2.style.display = 'block';
        }
        
        generateProblems();
    });
});

function applyCustomTable() {
    const input = document.getElementById('customTableInput');
    customTableNumber = parseInt(input.value);
    if (customTableNumber < 1) customTableNumber = 1;
    if (customTableNumber > 20) customTableNumber = 20;
    input.value = customTableNumber;
    generateProblems();
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMultiplicationProblem(level) {
    const config = levelConfig[level];
    let multiplicand = generateRandomNumber(config.secondMin, config.secondMax);
    let multiplier = generateRandomNumber(0, config.firstMax);
    
    return { multiplicand, multiplier };
}

function generateProblems() {
    const grid1 = document.getElementById('problemsGrid1');
    const grid2 = document.getElementById('problemsGrid2');
    grid1.innerHTML = '';
    grid2.innerHTML = '';

    if (currentLevel === 5) {
        for (let i = 1; i <= 10; i++) {
            const problemDiv = document.createElement('div');
            problemDiv.className = 'problem';
            problemDiv.innerHTML = `
                <div class="problem-number">${i}</div>
                <div class="multiplicand">${customTableNumber}</div>
                <div class="multiplier">${i}</div>
                <div class="answer-line"></div>
            `;
            grid1.appendChild(problemDiv);
        }
        return;
    }

    for (let i = 1; i <= 12; i++) {
        const problem = generateMultiplicationProblem(currentLevel);
        const problemDiv = document.createElement('div');
        problemDiv.className = 'problem';
        problemDiv.innerHTML = `
            <div class="problem-number">${i}</div>
            <div class="multiplicand">${problem.multiplicand}</div>
            <div class="multiplier">${problem.multiplier}</div>
            <div class="answer-line"></div>
        `;
        grid1.appendChild(problemDiv);
    }

    for (let i = 13; i <= 24; i++) {
        const problem = generateMultiplicationProblem(currentLevel);
        const problemDiv = document.createElement('div');
        problemDiv.className = 'problem';
        problemDiv.innerHTML = `
            <div class="problem-number">${i}</div>
            <div class="multiplicand">${problem.multiplicand}</div>
            <div class="multiplier">${problem.multiplier}</div>
            <div class="answer-line"></div>
        `;
        grid2.appendChild(problemDiv);
    }
}

generateProblems();
