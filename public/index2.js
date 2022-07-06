console.log("JS connected");
const boardArea = document.getElementById("sudoku-board");
const button = document.getElementById('solve');
const userInput = [];
var userstring="";
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
  console.log(allBoxes);
  let k = 0;
  let a = [];
  for (let x = 0; x < 9; x++) {
    a = [];
    for (let y = 0; y < 9; y++) {

      let inp = allBoxes[k++];
      if (inp.value) {
        userstring=userstring+inp.value;
        a.push(inp.value)
      } else {
        userstring=userstring+'.';
        a.push('.')
      }

    }
    userInput.push(a);
  }
  console.log(userstring);

  var obj = {
    key:"1",
    array:userstring
  };
  console.log(obj);
  console.log(JSON.stringify(obj));
  console.log(userInput);
  console.log(userInput[0][1]);
  // console.log("----------Solving-----------");
  //
  // //calling solve function
  //
  // const isSolvable = Solve(userInput);
  // if (isSolvable) {
  //   console.log("Solved Successfully: solvedAnswer==");
  //   console.log(solvedAnswer);
  //   renderTheSolution(solvedAnswer);
  // } else {
  //   console.log("Unsolvable!!!!!");
  // }

  //=================================Sending userInput to server========================0
 //let jsonarray = arrayToJSONObject(userInput) ;
  fetch('http://localhost:3000/', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
   'Content-Type': 'application/json'
 }
   })
     .then(function(response) {
       console.log(response);
         return (response.json());
    })
    .then(data => {
    // Use the parsed data here
    console.log(data.answer);
    if(data.solvable == true){
    renderTheSolution(data.answer);
    solvedAnswer=[];
    userInput=[];
  }
  else{
    let d = document.getElementsByClassName("notSolvable")[0];
    d.classList.add("notSolvableMessage");
  }
})
      .catch(function(error) {
      console.log(error);
      });


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

//================================================================================
// function Solve(grid) {
//
//   for (let i = 0; i < 9; i++) {
//     for (let j = 0; j < 9; j++) {
//       if (grid[i][j] == '.') {
//         for (let k = '1'; k <= '9'; k++) {
//           if (isValid(grid, k, i, j) == true) {
//             grid[i][j] = k;
//             if (Solve(grid) == true) {
//               return true;
//             } else {
//               grid[i][j] = '.';
//
//             }
//           }
//
//         }
//         return false;
//       }
//     }
//   }
//   solvedAnswer = grid;
//   return true;
// };
//
// function isValid(arr, c, row, col) {
//   for (var i = 0; i < 9; i++) {
//     if (arr[i][col] == c) {
//       return false; //checking in column
//     }
//
//     if (arr[row][i] == c) {
//       return false; //checking in row
//     }
//     var ind1 = 3 * Math.floor(row / 3) + Math.floor(i / 3);
//     var ind2 = (3 * (Math.floor(col / 3))) + (i % 3);
//     console.log(ind1);
//     console.log(ind2);
//      if (arr[ind1][ind2]===c) {
//        return false; //checking in 3*3 box
//      }
//   }
//   return true;
// };
//
//
