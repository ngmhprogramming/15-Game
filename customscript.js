var board = [["1", "2", "3", "4"], ["5", "6", "7", "8"], ["9", "10", "11", "12"], ["13", "14", "15", ":)"]];
var solvedBoard = [["1", "2", "3", "4"], ["5", "6", "7", "8"], ["9", "10", "11", "12"], ["13", "14", "15", ":)"]];
var selected = [];
var moves = 0;
var size = 4;
var mostDigits = 2;
var fontSize = 32;
window.onload = function(){
    generateBoard();
};
function updateMoves(){
    document.getElementById("moves").innerHTML = "Moves: " + moves.toString();
}
function scramble(times){
    while(times > 0){
        var x = Math.floor(Math.random() * size);
        var y = Math.floor(Math.random() * size);
        spaceLocationArray = tileNextToSpace([x, y]);
        var count = 0;
        for(var i = 0; i < spaceLocationArray.length; i++){
            if(spaceLocationArray[i] == "Yes"){
                count += 1;
            }
        }
        if(count > 0){
            tileClicked([x, y]);
        }
        times -= 1;
    }
    document.getElementById("winText").innerHTML = "You may begin.";
    moves = 0;
    updateMoves();
}
function changeMostDigits(){
    var lastNum = board[size - 1][size - 2];
    var lastNumString = lastNum.toString();
    mostDigits = lastNumString.length;
}
function changeSize(){
    removeBoard();
    size = document.getElementById("size").value;
    changeBoardSize();
    changeSolvedBoard();
    generateBoard();
    var tiles = document.getElementsByClassName("tile");
    changeMostDigits();
    for(var i = 0; i < size * size; i++){
        tiles[i].style.fontSize = fontSize.toString() + "px";
        tiles[i].style.width = (mostDigits * fontSize + 5).toString() + "px";
        tiles[i].style.height = (mostDigits * fontSize  + 5).toString() + "px";
    }
}
function changeFontSize(){
    fontSize = document.getElementById("fontSize").value;
    removeBoard();
    generateBoard();
}
function changeBoardSize(){
    newBoard = [];
    for(var i = 0; i < size; i++){
        var newBoardRow = [];
        for(var j = (i * size + 1); j < (i + 1) * size + 1; j++){
            newBoardRow.push(j.toString());
        }
        newBoard.push(newBoardRow);
    }
    newBoard[size - 1][size - 1] = ":)";
    board = newBoard;
    
}
function changeSolvedBoard(){
    newBoard = [];
    for(var i = 0; i < size; i++){
        var newBoardRow = [];
        for(var j = (i * size + 1); j < (i + 1) * size + 1; j++){
            newBoardRow.push(j.toString());
        }
        newBoard.push(newBoardRow);
    }
    newBoard[size - 1][size - 1] = ":)";
    solvedBoard = newBoard;
}
function removeBoard(){
    for(var i = 0; i < size; i++){
        var div = document.getElementById("row" + (i + 1).toString());
        div.parentNode.removeChild(div);
    }
}
function generateBoard(){
    for(var i = 0; i < board.length; i++){
        var div = document.createElement("DIV");
        div.setAttribute("id", ("row" + (i + 1).toString()));
        document.body.appendChild(div);
        for(var j = 0; j < board.length; j++){
            var button = document.createElement("BUTTON");
            var text = document.createTextNode(board[i][j]);
            button.appendChild(text);
            button.setAttribute("class","tile");
            button.setAttribute("onclick", ("tileClicked([" + [i,j] + "])"));
            document.getElementById("row" + (i + 1).toString()).appendChild(button);
        }
    }
    var tiles = document.getElementsByClassName("tile");
    changeMostDigits();
    for(var i = 0; i < size * size; i++){
        tiles[i].style.fontSize = fontSize.toString() + "px";
        tiles[i].style.width = (mostDigits * fontSize + 5).toString() + "px";
        tiles[i].style.height = (mostDigits * fontSize + 5).toString() + "px";
    }
}
function tileClicked(location){
    spaceLocationArray = tileNextToSpace(location);
    spaceLocation = spaceLocationArray.indexOf("Yes");
    if(spaceLocation == 0){
        holdingTile = board[location[0]][location[1]];
        board[location[0]][location[1]] = ":)";
        board[location[0] - 1][location[1]] = holdingTile;
        moves += 1;
        removeBoard();
        generateBoard();
        checkWin();
    } else if(spaceLocation == 1){
        holdingTile = board[location[0]][location[1]];
        board[location[0]][location[1]] = ":)";
        board[location[0] + 1][location[1]] = holdingTile;
        moves += 1;
        removeBoard();
        generateBoard();
        checkWin();
    } else if(spaceLocation == 2){
        holdingTile = board[location[0]][location[1]];
        board[location[0]][location[1]] = ":)";
        board[location[0]][location[1] - 1] = holdingTile;
        moves += 1;
        removeBoard();
        generateBoard();
        checkWin();
    } else if(spaceLocation == 3){
        holdingTile = board[location[0]][location[1]];
        board[location[0]][location[1]] = ":)";
        board[location[0]][location[1] + 1] = holdingTile;
        moves += 1;
        removeBoard();
        generateBoard();
        checkWin();
    }
    updateMoves();
    console.log(solvedBoard.toString());
}
function tileNextToSpace(location){
    fourDirections = ["No","No","No","No"];
    fourDirections[0] = checkUp(location);
    fourDirections[1] = checkDown(location);
    fourDirections[2] = checkLeft(location);
    fourDirections[3] = checkRight(location);
    console.log(fourDirections);
    return fourDirections;
}
function checkUp(location){
    if(location[0] == 0){
        return "No";
    } else {
        if(board[location[0] - 1][location[1]] == ":)"){
            return "Yes";
        } else {
            return "No";
        }
    }
}
function checkDown(location){
    if(location[0] == (size - 1)){
        return "No";
    } else {
        if(board[location[0] + 1][location[1]] == ":)"){
            return "Yes";
        } else {
            return "No";
        }
    }
}
function checkLeft(location){
    if(location[1] == 0){
        return "No";
    } else {
        if(board[location[0]][location[1] - 1] == ":)"){
            return "Yes";
        } else {
            return "No";
        }
    }
}
function checkRight(location){
    if(location[1] == (size - 1)){
        return "No";
    } else {
        if(board[location[0]][location[1] + 1] == ":)"){
            return "Yes";
        } else {
            return "No";
        }
    }
}
function checkWin(){
    if(board.toString() == solvedBoard.toString()){
        document.getElementById("winText").innerHTML = "You did it in " + moves.toString() + " moves!";
        moves = 0;
        updateMoves();
    }
}