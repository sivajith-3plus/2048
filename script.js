var board
var score = 0
var best = 0
var rows = 4
var coloums = 4

window.onload = () => {
    launchGame()
}

function launchGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    // board = [
    //     [2, 2, 2, 2],
    //     [2, 2, 2, 2],
    //     [4, 4, 8, 8],
    //     [4, 4, 8, 8]
    // ];

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < coloums; c++) {
            var tile = document.createElement('div')
            tile.id = r.toString() + '-' + c.toString() //0-0
            var num = board[r][c]
            updateTile(tile, num)
            document.getElementById('board').append(tile)
        }
    }
    setTwo();
    setTwo();
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ''
    tile.classList.add('tile')
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 2048) {
            tile.classList.add("x" + num.toString()); // x2
        } else {
            tile.classList.add("xxx");
        }
    }
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * coloums);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

document.addEventListener('keyup', (e) => {
    if (e.code == 'ArrowLeft') {
        slideLeft(slide)
    } else if (e.code == 'ArrowRight') {
        slideRight(slide)
    } else if (e.code == 'ArrowUp') {
        slideUp(slide)
    } else if (e.code == 'ArrowDown') {
        slideDown(slide)
    }
    document.getElementById("score").innerText = score;
    if (score > best) {
        best = score;
        document.getElementById("best").innerText = best;
    }

    if (checkForWin()) {
        return;
    }

    if (isGameOver()) {
        document.getElementById("board").innerHTML = `<div class="gameover" id="gameover">game over<button class="newgame" onclick="restart()">Try again </button></div>`
        console.log("Game Over");
        if (e.code == 'Enter') {
            restart();
        }
    } else {
        setTwo();
    }
})

function filterZero(row) {
    return row.filter(num => num != 0);
}

function slide(row) {
    row = filterZero(row)
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] = row[i] * 2
            row[i + 1] = 0
            score += row[i];
        }
    }
    row = filterZero(row)
    while (row.length < coloums) {
        row.push(0);
    }
    return row
}

function slideLeft(callback) {
    for (let r = 0; r < rows; r++) {
        let row = board[r]
        row = callback(row)
        board[r] = row;
        for (let c = 0; c < coloums; c++) {
            let tile = document.getElementById(r.toString() + '-' + c.toString())
            tile.id = r.toString() + '-' + c.toString()
            var num = board[r][c]
            updateTile(tile, num)
        }
    }
}
function slideRight(callback) {
    for (let r = 0; r < rows; r++) {
        let row = board[r]
        row = row.reverse()
        row = callback(row)
        row = row.reverse()
        board[r] = row;
        for (let c = 0; c < coloums; c++) {
            let tile = document.getElementById(r.toString() + '-' + c.toString())
            tile.id = r.toString() + '-' + c.toString()
            var num = board[r][c]
            updateTile(tile, num)
        }
    }
}

function slideUp(callback) {
    for (let c = 0; c < coloums; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = callback(row)
        for (let r = 0; r < coloums; r++) {
            board[r][c] = row[r]
            let tile = document.getElementById(r.toString() + '-' + c.toString())
            tile.id = r.toString() + '-' + c.toString()
            var num = board[r][c]
            updateTile(tile, num)
        }
    }
}

function slideDown(callback) {
    for (let c = 0; c < coloums; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = row.reverse()
        row = callback(row)
        row = row.reverse()
        for (let r = 0; r < coloums; r++) {
            board[r][c] = row[r]
            let tile = document.getElementById(r.toString() + '-' + c.toString())
            tile.id = r.toString() + '-' + c.toString()
            var num = board[r][c]
            updateTile(tile, num)
        }
    }
}

function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < coloums; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

function isGameOver() {
    if (!hasEmptyTile()) {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < coloums - 1; c++) {
                if (board[r][c] === board[r][c + 1]) {
                    return false;
                }
            }
        }

        for (let c = 0; c < coloums; c++) {
            for (let r = 0; r < rows - 1; r++) {
                if (board[r][c] === board[r + 1][c]) {
                    return false;
                }
            }
        }

        return true;
    }

    return false;
}

function restart() {
    document.getElementById("board").innerHTML = ''
    score = 0
    document.getElementById("score").innerText = score;
    launchGame()
}

function checkForWin() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < coloums; c++) {
            if (board[r][c] >= 2048) {
                document.getElementById("board").innerHTML = ''
                document.getElementById("gameover").innerText = "You Won!";
                return true;
            }
        }
    }
    return false;
}
