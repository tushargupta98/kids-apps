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
    },
    subtraction: {
        1: { maxNumber: 20 },
        2: { maxNumber: 50 },
        3: { maxNumber: 100 },
        4: { maxNumber: 500 },
        5: { maxNumber: 1000 }
    },
    counting: {
        1: { maxCount: 10, showAnswers: true },
        2: { maxCount: 20, showAnswers: true },
        3: { maxCount: 10, showAnswers: false },
        4: { maxCount: 20, showAnswers: false }
    }
};

function initWorksheet(operationType) {
    worksheetConfig.operationType = operationType;
    
    if (operationType === 'addition') {
        document.body.classList.add('addition-theme');
    } else if (operationType === 'subtraction') {
        document.body.classList.add('subtraction-theme');
    } else if (operationType === 'counting') {
        document.body.classList.add('counting-theme');
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
            
            // Update instructions for counting worksheet
            if (operationType === 'counting') {
                const instructionText = document.getElementById('instructionText');
                if (instructionText) {
                    if (worksheetConfig.currentLevel === 1 || worksheetConfig.currentLevel === 2) {
                        instructionText.textContent = '👀 Count the objects on the left and draw a line to match with the correct number on the right! ✏️';
                    } else {
                        instructionText.textContent = '👀 Count the objects on the left and write the number in the box on the right! ✏️';
                    }
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

function generateSubtractionProblem(level) {
    const config = levelConfigs.subtraction[level];
    const maxNumber = config.maxNumber;
    
    let minuend = generateRandomNumber(1, maxNumber - 1);
    let subtrahend = generateRandomNumber(0, minuend);
    
    return { minuend, subtrahend };
}

function generateCountingProblem(level) {
    const config = levelConfigs.counting[level];
    const maxCount = config.maxCount;
    
    const count = generateRandomNumber(1, maxCount);
    
    return { count };
}

function generateProblems() {
    const grid1 = document.getElementById('problemsGrid1');
    const grid2 = document.getElementById('problemsGrid2');
    
    if (grid1) grid1.innerHTML = '';
    if (grid2) grid2.innerHTML = '';

    const operationType = worksheetConfig.operationType;
    const currentLevel = worksheetConfig.currentLevel;

    // Counting worksheet - special handling
    if (operationType === 'counting') {
        generateCountingWorksheet(currentLevel);
        return;
    }

    // Custom table level for multiplication
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

    // Generate problems for page 1
    for (let i = 1; i <= 12; i++) {
        const problem = operationType === 'multiplication' 
            ? generateMultiplicationProblem(currentLevel)
            : operationType === 'addition'
            ? generateAdditionProblem(currentLevel)
            : generateSubtractionProblem(currentLevel);
        
        const problemDiv = document.createElement('div');
        problemDiv.className = 'problem';
        
        if (operationType === 'multiplication') {
            problemDiv.innerHTML = `
                <div class="problem-number">${i}</div>
                <div class="multiplicand">${problem.multiplicand}</div>
                <div class="multiplier">${problem.multiplier}</div>
                <div class="answer-line"></div>
            `;
        } else if (operationType === 'addition') {
            problemDiv.innerHTML = `
                <div class="problem-number">${i}</div>
                <div class="addend1">${problem.addend1}</div>
                <div class="addend2">${problem.addend2}</div>
                <div class="answer-line"></div>
            `;
        } else if (operationType === 'subtraction') {
            problemDiv.innerHTML = `
                <div class="problem-number">${i}</div>
                <div class="minuend">${problem.minuend}</div>
                <div class="subtrahend">${problem.subtrahend}</div>
                <div class="answer-line"></div>
            `;
        }
        
        grid1.appendChild(problemDiv);
    }

    // Generate problems for page 2
    for (let i = 13; i <= 24; i++) {
        const problem = operationType === 'multiplication' 
            ? generateMultiplicationProblem(currentLevel)
            : operationType === 'addition'
            ? generateAdditionProblem(currentLevel)
            : generateSubtractionProblem(currentLevel);
        
        const problemDiv = document.createElement('div');
        problemDiv.className = 'problem';
        
        if (operationType === 'multiplication') {
            problemDiv.innerHTML = `
                <div class="problem-number">${i}</div>
                <div class="multiplicand">${problem.multiplicand}</div>
                <div class="multiplier">${problem.multiplier}</div>
                <div class="answer-line"></div>
            `;
        } else if (operationType === 'addition') {
            problemDiv.innerHTML = `
                <div class="problem-number">${i}</div>
                <div class="addend1">${problem.addend1}</div>
                <div class="addend2">${problem.addend2}</div>
                <div class="answer-line"></div>
            `;
        } else if (operationType === 'subtraction') {
            problemDiv.innerHTML = `
                <div class="problem-number">${i}</div>
                <div class="minuend">${problem.minuend}</div>
                <div class="subtrahend">${problem.subtrahend}</div>
                <div class="answer-line"></div>
            `;
        }
        
        grid2.appendChild(problemDiv);
    }
}

// Counting worksheet generation
function generateCountingWorksheet(level) {
    const container = document.getElementById('problemsGrid1');
    container.innerHTML = '';
    
    const config = levelConfigs.counting[level];
    const showAnswers = config.showAnswers;
    
    const symbolSet = [
        '🐶', '🐱', '🐻', '🐰', '🐸',
        '🦆', '🐠', '🐝', '🦋', '🐢',
        '⭐', '🎈', '🎁', '⚽', '🚗',
        '🍎', '🍌', '🍓', '🌸', '🌈'
    ];
    
    function shuffle(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
    
    const selectedSymbols = shuffle(symbolSet).slice(0, 10);
    
    const counts = Array.from({length: 10}, (_, i) => i + 1);
    let selectedCounts;
    if (config.maxCount === 20) {
        const allCounts = Array.from({length: 20}, (_, i) => i + 1);
        selectedCounts = shuffle(allCounts).slice(0, 10);
    } else {
        selectedCounts = counts;
    }
    
    const questions = selectedSymbols.map((symbol, index) => ({
        symbol: symbol,
        count: selectedCounts[index]
    }));
    
    const displayQuestions = shuffle(questions);
    const answersForMatching = showAnswers ? shuffle(displayQuestions.map(q => q.count)) : [];
    
    displayQuestions.forEach((q, index) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'matching-row';
        
        const objectsDisplay = document.createElement('div');
        objectsDisplay.className = 'objects-display';
        
        for (let i = 0; i < q.count; i++) {
            const symbolSpan = document.createElement('span');
            symbolSpan.textContent = q.symbol;
            objectsDisplay.appendChild(symbolSpan);
        }
        
        rowDiv.appendChild(objectsDisplay);
        
        if (showAnswers) {
            const answerNumber = document.createElement('div');
            answerNumber.className = 'answer-number';
            answerNumber.textContent = answersForMatching[index];
            rowDiv.appendChild(answerNumber);
        } else {
            const answerBox = document.createElement('div');
            answerBox.className = 'answer-box';
            rowDiv.appendChild(answerBox);
        }
        
        container.appendChild(rowDiv);
    });
}
