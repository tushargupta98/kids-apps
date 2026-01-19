let worksheetConfig = {
    operationType: 'multiplication',
    currentLevel: 1,
    customTableNumber: 2
};

const levelConfigs = {
    multiplication: {
        1: { firstMax: 10, secondMin: 0, secondMax: 5 },
        2: { firstMax: 10, secondMin: 5, secondMax: 10 },
        3: { firstMax: 10, secondMin: 10, secondMax: 15 },
        4: { firstMax: 10, secondMin: 15, secondMax: 20 }
    },
    addition: {
        1: { maxSum: 20 },
        2: { maxSum: 50 },
        3: { maxSum: 100 },
        4: { maxSum: 500 },
        5: { maxSum: 1000 }
    }
};

function initWorksheet(operationType) {
    worksheetConfig.operationType = operationType;
    
    if (operationType === 'addition') {
        document.body.classList.add('addition-theme');
    }
    
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            worksheetConfig.currentLevel = parseInt(this.dataset.level);
            
            if (operationType === 'multiplication') {
                const customSelector = document.getElementById('customTableSelector');
                const page2 = document.querySelectorAll('.worksheet')[1];
                
                if (worksheetConfig.currentLevel === 5) {
                    customSelector.style.display = 'block';
                    page2.style.display = 'none';
                } else {
                    customSelector.style.display = 'none';
                    page2.style.display = 'block';
                }
            }
            
            generateProblems();
        });
    });
    
    generateProblems();
}

function applyCustomTable() {
    const input = document.getElementById('customTableInput');
    worksheetConfig.customTableNumber = parseInt(input.value);
    if (worksheetConfig.customTableNumber < 1) worksheetConfig.customTableNumber = 1;
    if (worksheetConfig.customTableNumber > 20) worksheetConfig.customTableNumber = 20;
    input.value = worksheetConfig.customTableNumber;
    generateProblems();
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMultiplicationProblem(level) {
    const config = levelConfigs.multiplication[level];
    let multiplicand = generateRandomNumber(config.secondMin, config.secondMax);
    let multiplier = generateRandomNumber(0, config.firstMax);
    
    return { multiplicand, multiplier };
}

function generateAdditionProblem(level) {
    const config = levelConfigs.addition[level];
    const maxNumber = config.maxSum;
    
    let addend1 = generateRandomNumber(1, maxNumber - 2);
    let maxAddend2 = Math.min(maxNumber - addend1, maxNumber - 1);
    let addend2 = generateRandomNumber(1, maxAddend2);
    
    return { addend1, addend2 };
}

function generateProblems() {
    const grid1 = document.getElementById('problemsGrid1');
    const grid2 = document.getElementById('problemsGrid2');
    grid1.innerHTML = '';
    grid2.innerHTML = '';

    const operationType = worksheetConfig.operationType;
    const currentLevel = worksheetConfig.currentLevel;

    if (operationType === 'multiplication' && currentLevel === 5) {
        for (let i = 1; i <= 10; i++) {
            const problemDiv = document.createElement('div');
            problemDiv.className = 'problem';
            problemDiv.innerHTML = `
                <div class="problem-number">${i}</div>
                <div class="multiplicand">${worksheetConfig.customTableNumber}</div>
                <div class="multiplier">${i}</div>
                <div class="answer-line"></div>
            `;
            grid1.appendChild(problemDiv);
        }
        return;
    }

    for (let i = 1; i <= 12; i++) {
        const problem = operationType === 'multiplication' 
            ? generateMultiplicationProblem(currentLevel)
            : generateAdditionProblem(currentLevel);
        
        const problemDiv = document.createElement('div');
        problemDiv.className = 'problem';
        
        if (operationType === 'multiplication') {
            problemDiv.innerHTML = `
                <div class="problem-number">${i}</div>
                <div class="multiplicand">${problem.multiplicand}</div>
                <div class="multiplier">${problem.multiplier}</div>
                <div class="answer-line"></div>
            `;
        } else {
            problemDiv.innerHTML = `
                <div class="problem-number">${i}</div>
                <div class="addend1">${problem.addend1}</div>
                <div class="addend2">${problem.addend2}</div>
                <div class="answer-line"></div>
            `;
        }
        
        grid1.appendChild(problemDiv);
    }

    for (let i = 13; i <= 24; i++) {
        const problem = operationType === 'multiplication' 
            ? generateMultiplicationProblem(currentLevel)
            : generateAdditionProblem(currentLevel);
        
        const problemDiv = document.createElement('div');
        problemDiv.className = 'problem';
        
        if (operationType === 'multiplication') {
            problemDiv.innerHTML = `
                <div class="problem-number">${i}</div>
                <div class="multiplicand">${problem.multiplicand}</div>
                <div class="multiplier">${problem.multiplier}</div>
                <div class="answer-line"></div>
            `;
        } else {
            problemDiv.innerHTML = `
                <div class="problem-number">${i}</div>
                <div class="addend1">${problem.addend1}</div>
                <div class="addend2">${problem.addend2}</div>
                <div class="answer-line"></div>
            `;
        }
        
        grid2.appendChild(problemDiv);
    }
}
