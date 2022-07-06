const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({  extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index2.html");
});

let userInput=[];
let solvable="";
let obj = {
  solvable : solvable ,
  answer : userInput
};

app.post('/', (req, res) => {
   console.log(req.body.array);
   let input = (req.body.array);
   console.log(input);
  createInput(input);
  // console.log(obj.solvable);
  // console.log(obj.answer);
 res.send(JSON.stringify(obj));
 res.end();


});

app.listen( (process.env.PORT || 3000), function(res) {
  console.log("Listening");
});

function createInput(allBoxes)
{
  let k = 0;
  let a = [];
  for (let x = 0; x < 9; x++) {
    a = [];
    for (let y = 0; y < 9; y++) {

      let inp = allBoxes[k++];
      a.push(inp)


    }
    userInput.push(a);
  }
  console.log(userInput);

  console.log("----------Solving-----------");

  //calling solve function

  const isSolvable = Solve(userInput);
  if (isSolvable) {
    console.log("Solved Successfully: solvedAnswer==");
    solvable=true;
    console.log(solvedAnswer);
    // renderTheSolution(solvedAnswer);
  } else {
    solvable=false;
    console.log("Unsolvable!!!!!");
  }
  obj.answer = userInput;
  obj.solvable = solvable;
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
  for (var i = 0; i < 9; i++) {
    if (arr[i][col] == c) {
      return false; //checking in column
    }

    if (arr[row][i] == c) {
      return false; //checking in row
    }
    var ind1 = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    var ind2 = (3 * (Math.floor(col / 3))) + (i % 3);
    console.log(ind1);
    console.log(ind2);
     if (arr[ind1][ind2]===c) {
       return false; //checking in 3*3 box
     }
  }
  return true;
};
