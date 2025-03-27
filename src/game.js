// Comprehensive dictionary (you might want to expand this)
const DICTIONARY = new Set([
  'cat', 'dog', 'rat', 'mat', 'sat', 'eat', 'hat', 
  'bat', 'pat', 'rat', 'tap', 'map', 'pad', 'sad',
  'car', 'bar', 'tar', 'far', 'war', 'art', 'ant'
]);

function WordGridGame() {
  // Generate initial 5x5 grid of letters
  const generateInitialGrid = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from({ length: 5 }, () => 
      Array.from({ length: 5 }, () => letters[Math.floor(Math.random() * letters.length)])
    );
  };

  const [grid, setGrid] = React.useState(generateInitialGrid());
  const [swappedCells, setSwappedCells] = React.useState([]);
  const [foundWords, setFoundWords] = React.useState([]);
  const [score, setScore] = React.useState(0);

  // Find all possible words in the grid
  const findAllWords = () => {
    const words = new Set();
    
    // Check horizontal words
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col <= 2; col++) {
        // Check 3-letter words
        const word3 = grid[row].slice(col, col + 3).join('').toLowerCase();
        if (DICTIONARY.has(word3)) words.add(word3);
        
        // Check 4-letter words
        if (col <= 1) {
          const word4 = grid[row].slice(col, col + 4).join('').toLowerCase();
          if (DICTIONARY.has(word4)) words.add(word4);
        }
      }
    }

    // Check vertical words
    for (let col = 0; col < 5; col++) {
      for (let row = 0; row <= 2; row++) {
        // 3-letter vertical
        const word3 = [
          grid[row][col],
          grid[row+1][col],
          grid[row+2][col]
        ].join('').toLowerCase();
        if (DICTIONARY.has(word3)) words.add(word3);

        // 4-letter vertical
        if (row <= 1) {
          const word4 = [
            grid[row][col],
            grid[row+1][col],
            grid[row+2][col],
            grid[row+3][col]
          ].join('').toLowerCase();
          if (DICTIONARY.has(word4)) words.add(word4);
        }
      }
    }

    return Array.from(words);
  };

  // Calculate score based on found words
  const calculateScore = (words) => {
    const totalLength = words.reduce((sum, word) => sum + word.length, 0);
    return words.length * totalLength;
  };

  // Handle cell selection for swapping
  const handleCellSelect = (row, col) => {
    const cellKey = `${row},${col}`;
    
    // Prevent more than 5 swaps
    if (swappedCells.length >= 5) return;

    // Check if cell is already selected
    const isAlreadySelected = swappedCells.some(
      cell => cell[0] === row && cell[1] === col
    );

    if (isAlreadySelected) {
      // Deselect if already selected
      setSwappedCells(prev => 
        prev.filter(cell => cell[0] !== row || cell[1] !== col)
      );
    } else {
      // Add to swapped cells
      setSwappedCells(prev => [...prev, [row, col]]);
    }
  };

  // Perform letter swap
  const performSwap = () => {
    if (swappedCells.length !== 2) return;

    const newGrid = grid.map(row => [...row]);
    const [cell1, cell2] = swappedCells;
    
    // Swap letters
    const temp = newGrid[cell1[0]][cell1[1]];
    newGrid[cell1[0]][cell1[1]] = newGrid[cell2[0]][cell2[1]];
    newGrid[cell2[0]][cell2[1]] = temp;

    setGrid(newGrid);
    setSwappedCells([]);
  };

  // Submit grid and find words
  const submitGrid = () => {
    const words = findAllWords();
    setFoundWords(words);
    setScore(calculateScore(words));
  };

  // Reset the game
  const resetGame = () => {
    setGrid(generateInitialGrid());
    setSwappedCells([]);
    setFoundWords([]);
    setScore(0);
  };

  return (
    <div className="game-container">
      <div className="stats">
        <p>Swapped Cells: {swappedCells.length}/5</p>
        <p>Found Words: {foundWords.length}</p>
        <p>Score: {score}</p>
      </div>
      <div className="grid">
        {grid.map((row, rowIndex) => 
          row.map((letter, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${swappedCells.some(
                cell => cell[0] === rowIndex && cell[1] === colIndex
              ) ? 'selected' : ''}`}
              onClick={() => handleCellSelect(rowIndex, colIndex)}
            >
              {letter}
            </button>
          ))
        )}
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button 
          onClick={performSwap}
          disabled={swappedCells.length !== 2}
          className="button button-green"
        >
          Swap Letters
        </button>
        <button 
          onClick={submitGrid}
          className="button button-blue"
        >
          Submit Grid
        </button>
        <button 
          onClick={resetGame}
          className="button button-red"
        >
          Reset Game
        </button>
      </div>
      {foundWords.length > 0 && (
        <div className="word-list">
          <h3>Words Found:</h3>
          <ul>
            {foundWords.map((word, index) => (
              <li key={index}>{word} ({word.length} points)</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default WordGridGame; 