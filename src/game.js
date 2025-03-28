// Helper function to generate random letters with weighted distribution
function generateRandomLetter() {
    const vowels = 'aeiou';
    const consonants = 'bcdfghjklmnpqrstvwxyz';
    const weights = {
        vowels: 0.4,
        consonants: 0.6
    };
    
    const random = Math.random();
    if (random < weights.vowels) {
        return vowels[Math.floor(Math.random() * vowels.length)];
    } else {
        return consonants[Math.floor(Math.random() * consonants.length)];
    }
}

// Helper function to check if a word exists in the dictionary
function isValidWord(word) {
    return window.DICTIONARY.has(word.toLowerCase());
}

// Helper function to check and add a word if it's valid
function checkAndAddWord(word, foundWords) {
    if (word.length >= 3 && isValidWord(word)) {
        foundWords.add(word.toLowerCase());
    }
}

window.WordGridGame = function() {
    const [grid, setGrid] = React.useState([]);
    const [selectedCells, setSelectedCells] = React.useState([]);
    const [foundWords, setFoundWords] = React.useState(new Set());
    const [score, setScore] = React.useState(0);
    const [highScore, setHighScore] = React.useState(() => {
        const saved = localStorage.getItem('wordBlockHighScore');
        return saved ? parseInt(saved) : 0;
    });
    const [time, setTime] = React.useState(0);
    const [isTimerRunning, setIsTimerRunning] = React.useState(false);

    // Timer effect
    React.useEffect(() => {
        let interval;
        if (isTimerRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning]);

    // Format time as MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    // Start timer
    const startTimer = () => {
        setIsTimerRunning(true);
    };

    // Stop timer
    const stopTimer = () => {
        setIsTimerRunning(false);
    };

    // Update high score
    const updateHighScore = (newScore) => {
        if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('wordBlockHighScore', newScore);
        }
    };

    // Generate initial grid
    const generateInitialGrid = () => {
        const newGrid = [];
        for (let i = 0; i < 5; i++) {
            const row = [];
            for (let j = 0; j < 5; j++) {
                row.push(generateRandomLetter());
            }
            newGrid.push(row);
        }
        setGrid(newGrid);
        setSelectedCells([]);
        setFoundWords(new Set());
        setScore(0);
        setTime(0);
        startTimer();
    };

    // Find all words in the grid
    const findAllWords = () => {
        const words = new Set();
        
        // Check horizontal words
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 3; j++) {
                const word = grid[i][j] + grid[i][j + 1] + grid[i][j + 2];
                checkAndAddWord(word, words);
                if (j < 2) {
                    const word4 = word + grid[i][j + 3];
                    checkAndAddWord(word4, words);
                    if (j < 1) {
                        const word5 = word4 + grid[i][j + 4];
                        checkAndAddWord(word5, words);
                    }
                }
            }
        }

        // Check vertical words
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 5; j++) {
                const word = grid[i][j] + grid[i + 1][j] + grid[i + 2][j];
                checkAndAddWord(word, words);
                if (i < 2) {
                    const word4 = word + grid[i + 3][j];
                    checkAndAddWord(word4, words);
                    if (i < 1) {
                        const word5 = word4 + grid[i + 4][j];
                        checkAndAddWord(word5, words);
                    }
                }
            }
        }

        // Check diagonal words (top-left to bottom-right)
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const word = grid[i][j] + grid[i + 1][j + 1] + grid[i + 2][j + 2];
                checkAndAddWord(word, words);
                if (i < 2 && j < 2) {
                    const word4 = word + grid[i + 3][j + 3];
                    checkAndAddWord(word4, words);
                    if (i < 1 && j < 1) {
                        const word5 = word4 + grid[i + 4][j + 4];
                        checkAndAddWord(word5, words);
                    }
                }
            }
        }

        // Check diagonal words (top-right to bottom-left)
        for (let i = 0; i < 3; i++) {
            for (let j = 2; j < 5; j++) {
                const word = grid[i][j] + grid[i + 1][j - 1] + grid[i + 2][j - 2];
                checkAndAddWord(word, words);
                if (i < 2 && j > 2) {
                    const word4 = word + grid[i + 3][j - 3];
                    checkAndAddWord(word4, words);
                    if (i < 1 && j > 3) {
                        const word5 = word4 + grid[i + 4][j - 4];
                        checkAndAddWord(word5, words);
                    }
                }
            }
        }

        return words;
    };

    // Calculate score based on found words
    const calculateScore = (words) => {
        let totalScore = 0;
        words.forEach(word => {
            if (word.length === 3) totalScore += 1;
            else if (word.length === 4) totalScore += 2;
            else if (word.length >= 5) totalScore += 4;
        });
        return totalScore;
    };

    // Handle cell selection
    const handleCellClick = (row, col) => {
        const cellIndex = row * 5 + col;
        if (!selectedCells.includes(cellIndex)) {
            setSelectedCells([...selectedCells, cellIndex]);
        }
    };

    // Handle swap
    const handleSwap = () => {
        if (selectedCells.length === 2) {
            const [first, second] = selectedCells;
            const row1 = Math.floor(first / 5);
            const col1 = first % 5;
            const row2 = Math.floor(second / 5);
            const col2 = second % 5;

            const newGrid = [...grid];
            const temp = newGrid[row1][col1];
            newGrid[row1][col1] = newGrid[row2][col2];
            newGrid[row2][col2] = temp;

            setGrid(newGrid);
            setSelectedCells([]);
        }
    };

    // Handle submit
    const handleSubmit = () => {
        const words = findAllWords();
        const newScore = calculateScore(words);
        setFoundWords(words);
        setScore(newScore);
        updateHighScore(newScore);
        stopTimer();
    };

    // Handle reset
    const handleReset = () => {
        generateInitialGrid();
    };

    // Initialize grid on component mount
    React.useEffect(() => {
        generateInitialGrid();
    }, []);

    return (
        <div className="game-container">
            <div className="stats">
                <div className="stat-item">
                    <span>Time: {formatTime(time)}</span>
                </div>
                <div className="stat-item">
                    <span>Swapped: {selectedCells.length}/2</span>
                </div>
                <div className="stat-item">
                    <span>Words: {foundWords.size}</span>
                </div>
                <div className="stat-item">
                    <span>Score: {score}</span>
                </div>
                <div className="stat-item">
                    <span>High Score: {highScore}</span>
                </div>
            </div>

            <div className="grid">
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={`cell ${selectedCells.includes(rowIndex * 5 + colIndex) ? 'selected' : ''}`}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                            >
                                {cell}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="controls">
                <button onClick={handleSwap} disabled={selectedCells.length !== 2}>
                    Swap
                </button>
                <button onClick={handleSubmit} disabled={selectedCells.length !== 0}>
                    Submit
                </button>
                <button onClick={handleReset}>Reset</button>
            </div>

            <div className="word-list">
                <h3>Found Words:</h3>
                <ul>
                    {Array.from(foundWords).sort().map((word, index) => (
                        <li key={index}>{word}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}; 