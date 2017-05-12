var board = [["1", "2", "3", "4"], ["5", "6", "7", "8"], ["9", "10", "11", "12"], ["13", "14", "15", ":)"]];
var solvedBoard = [["1", "2", "3", "4"], ["5", "6", "7", "8"], ["9", "10", "11", "12"], ["13", "14", "15", ":)"]];
selected = [];
moves = 0;
window.onload = function(){
    generateBoard();
};
function removeBoard(){
    for(var i = 0; i < 4; i++){
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
            button.setAttribute("onclick", ("tileClicked([" + [i,j] + "])"));
            document.getElementById("row" + (i + 1).toString()).appendChild(button);
        }
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
    if(location[0] == 3){
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
    if(location[1] == 3){
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
    }
}