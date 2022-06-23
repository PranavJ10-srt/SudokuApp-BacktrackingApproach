console.log("JS connected");
const boardArea = document.getElementById("sudoku-board");
const button = document.getElementById('solve');
const userInput = [];
let solvedAnswer = [];
createBoard();
button.addEventListener("click", createInputArray);
//const isSolvable = Solve(userInput);






function createBoard() {

  for (var i = 0; i < 81; i++) {
    const inputBox = document.createElement('input');
    inputBox.setAttribute('type', 'number');
    inputBox.setAttribute('min', 1);
    inputBox.setAttribute('max', 9);
    boardArea.appendChild(inputBox);
  };

};

function createInputArray() {
  const allBoxes = document.querySelectorAll('input');
  let k = 0;
  let a = [];
  for (let x = 0; x < 9; x++) {
    a = [];
    for (let y = 0; y < 9; y++) {

      let inp = allBoxes[k++];
      if (inp.value) {
        a.push(inp.value)
      } else {
        a.push('.')
      }

    }
    userInput.push(a);
  }
  console.log(userInput);
  console.log(userInput[0][1]);
  console.log("----------Solving-----------");

  //calling solve function

  const isSolvable = Solve(userInput);
  if (isSolvable) {
    console.log("Solved Successfully: solvedAnswer==");
    console.log(solvedAnswer);
    renderTheSolution(solvedAnswer);
  } else {
    console.log("Unsolvable!!!!!");
  }
};


function Solve(grid) {

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] == '.') {
        for (let k = '1'; k <= '9'; k++) {
          if (isValid(grid, k, i, j) == true) {
            grid[i][j] = k;
            if (Solve(grid) == true) {
              return true;
            } else {
              grid[i][j] = '.';

            }
          }

        }
        return false;
      }
    }
  }
  solvedAnswer = grid;
  return true;
};

function isValid(arr, c, row, col) {
  for (let i = 0; i < 9; i++) {
    if (arr[i][col] == c) {
      return false; //checking in column
    }

    if (arr[row][i] == c) {
      return false; //checking in row
    }
    // let ind1 = 3 * Math.floor(row / 3) + i / 3;
    // let ind2 = 3 * Math.floor(col / 3) + i % 3;
    //  if (arr[ind1][ind2] == c) {
    //    return false; //checking in 3*3 box
    //  }
  }
  return true;
};


function renderTheSolution(solved) {
  let inputs = document.querySelectorAll('input');
  let t = 0;
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      inputs[t++].value = solved[r][c];
    }
  }
};

//===========================
// function createInputArray() {               - GETTING USER INPUT AS 1D ARRAY
//   const allBoxes = document.querySelectorAll('input');
//   for (let j = 0; j < 81; j++) {
//     let inp = allBoxes[j];
//     if (inp.value) {
//       userInput.push(inp.value)
//     } else {
//       userInput.push('.')
//     }
//   }
//   console.log(userInput);
// };
//==============================
