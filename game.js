
//retrieving the html elements and putting them in javascript variables 
const boxes = document.querySelectorAll(".box");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector('#restartBtn')

const winConditions =[
    [0, 1, 2], // horizontal box indices
    [3, 4, 5], // horizonal
    [6, 7, 8], // horizonal 
    [0, 3, 6], // vertical box indices
    [1, 4, 7], // vertical 
    [2, 5, 8], // vertical 
    [0, 4, 8], // diagonal box indices 
    [2, 4, 6], // diagonal 
]

let placeholders = ["","","","","","","","","",]; //array to keep track of the current state of each box 
let currentPlayer = "X"; //keep track of player - initalize the first player as "X"
let running = false; //boolean variable to check if game is running


//function to start game 
function startGame(){
    //each box will have an eventlistener to listen for the box clicked, then return a callback of boxClicked 
    boxes.forEach(box => box.addEventListener("click", boxClicked)) 
    //The restart button will restart the game once it is clicked, this function is initalized at the start of the game 
    restartBtn.addEventListener("click", restartGame);
    //The header thats our status will update to declare which player's turn it is 
    statusText.textContent = `${currentPlayer}'s turn`;
    //setting the game to running status to true once the startGame() function is called
    running = true;
}
//function for what we want to happen when a box is clicked
function boxClicked(){
    //retrieving each boxes index either 0-8 initalized in the HTML file 
    const cellIndex = this.getAttribute('cellIndex');

    //an if statement to check whether the box is empty and the game is running to determine if the function should continue 
    if (placeholders[cellIndex] != "" || !running ){ //if each boxes placeholder is NOT empty and the game is NOT running - the function will return and not run 
        return;
    } 
    //if the check if statement is false - methods to update the cell and check winner will run 
    updateBoxForTurn(this, cellIndex);
    checkWinner();
}
//function to set the boxes content to either an X or O depending on which player is playing 
function updateBoxForTurn(box, index){
    placeholders[index]= currentPlayer; //whichever box is clicked - its index is found in the placeholder array 
    box.textContent = currentPlayer; //and the string at its specified index will change to either an X or an O depending on whose turn it is
    if(currentPlayer === "X"){
        box.style.backgroundColor = "Blue"
    }else {
        box.style.backgroundColor = "pink"
    }
   
}
//function to switch between whose turn it is
function changePlayer(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    } else{
        currentPlayer = "X"; 
    }
    statusText.textContent = `${currentPlayer}'s turn`
}

//when a box is clicked this function will run - 
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){ //for loop to iterate through the winConditions array 
        const condition = winConditions[i]; //get the current win condition 
        const cellA = placeholders[condition[0]];
        const cellB = placeholders[condition[1]];
        const cellC = placeholders[condition[2]];
        //if any of the cells are empty, continue to the next iteration of the loop 
        if (cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        //if all three cells match, set roundWon to true and exit the loop 
        if (cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    //if a win condition was met, update the status text and stop the game 
    if (roundWon){
        statusText.textContent = `${currentPlayer} wins!` //displays winning message 
        running = false; //stop the game from running 
    } else if (!placeholders.includes('')){ //if there are no empty cells and no winner, its a daw 
        statusText.textContent = "Draw!" //display draw message 
    }else { //if no win condition was met and there are still empty cells, change the player 
        changePlayer(); //switches to the other player 
    }
   
}
//resets everything back to its default when restartBtn is clicked - sets the game to running = true so the game is ready to go once the button is clicked
function restartGame(){
    currentPlayer = "X";
    placeholders = ["","","","","","","","","",];
    statusText.textContent = `${currentPlayer}'s turn`;

    boxes.forEach(box =>{
        box.textContent = "";
        box.style.backgroundColor = "#c0bdfd";
    })
    running = true;
    
}
startGame();
/*Explanation Breakdown:
1. Initalization: 
    - The HTML elements are selected and stored in variables using querySelectorAll and querySelector
    -The `winConditions` array defines all possible winning combinations of box indices
    -`placeholders` is an array to track the current state of each box
    -`currentPlayer` keeps track of whose turn it is 
    - `running` is a boolean variable to check if the game is in progress

2. startGame Function:
    -Adds event listeners to the boxes and restart button 
    -sets the inital status text and starts the game by setting `running` to `true` 

3.boxClicked Function:
    -retrieves the index of the clicked box 
    -checks if the box is already filled or if the game is not running
    -updates the box content and checks for a winner

4. updateBoxForTurn Function:
    -Updates the `placeholders` array and the box's text content based on the current player's turn

5. changePlayer Function:
    -switches the player and updates the status text 

6. checkWinner Function:
    -checks each win conidtion to see if any are met
    -updates the status text and game state accordingly

7. restartGame Function:
    -resets the game to its inital state 




 */