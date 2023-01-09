'use strict'
const numberbox = document.getElementById("numberbox");
const slider = document.getElementById("slider");
const progressBar = document.getElementById("progress-bar")
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById("pause-button");

const queen = '<i class="fas fa-chess-queen" style="color:#000"></i>';

let n, speed, tempSpeed, q, Board = 0;
// Board = 0;
var audio= new Audio('"C:\Users\Asus\Downloads\tickingbuzzer-75859.mp3"');
// Creating array for all the possible arrangements of the N-Queen
let array = [0, 2, 1, 1, 3, 11, 5, 41, 93,965];

// Used to store the state of the boards;
let pos = {};
// let position = {};


// Setting the slider value onSlide
speed = (100 - slider.value) * 10;
tempSpeed = speed;

slider.oninput = function () {
    progressBar.style.width = this.value + "%";
    speed = slider.value;
    speed = (100 - speed) * 1;
}

class Queen {
    constructor() {  

        this.position = Object.assign({}, pos);
        // this.Board = 0;
        this.uuid = [];
    } 

    nQueen = async () => {
        Board = 0;
        this.position[`${Board}`] = {};
        numberbox.disabled = false;
        await q.solveQueen(Board, 0, n);
        await q.clearColor(Board);
        numberbox.disabled = false;
    }

    isValid = async (board, r, col, n) => {
        //Setting the current box color to orange
        const table = document.getElementById(`table-${this.uuid[board]}`);
        const currentRow = table.firstChild.childNodes[r];
        const currentColumn = currentRow.getElementsByTagName("td")[col];
        currentColumn.innerHTML = queen;
        

        
        for (let i = r - 1; i >= 0; --i) {
            const row = table.firstChild.childNodes[i];
            const column = row.getElementsByTagName("td")[col];

            const value = column.innerHTML;

            if (value == queen) {
                column.style.backgroundColor = "#ec8254";
                currentColumn.innerHTML = " "
                audio.play();
                return false;
            }
            column.style.backgroundColor = "#a67b5b";
            await q.delay();
        }

        
        for (let i = r - 1, j = col - 1; i >= 0 && j >= 0; --i, --j) {
            const row = table.firstChild.childNodes[i];
            const column = row.getElementsByTagName("td")[j];
            const value = column.innerHTML;

            if (value == queen) {
                column.style.backgroundColor = "#ec8254";
                currentColumn.innerHTML = " "
                audio.play();
                return false;
            }
            column.style.backgroundColor = "#a67b5b";
            await q.delay();
        }

        // Checking the upper right diagonal
        for (let i = r - 1, j = col + 1; i >= 0 && j < n; --i, ++j) {
            const row = table.firstChild.childNodes[i];
            const column = row.getElementsByTagName("td")[j];

            const value = column.innerHTML;

            if (value == queen) {
                column.style.backgroundColor = "#ec8254";
                currentColumn.innerHTML = " "
                audio.play();
                return false;
            }
            column.style.backgroundColor = "#a67b5b";
            await q.delay();
        }
        return true;
    }

    clearColor = async (board) => {
        for (let j = 0; j < n; ++j) {
            const table = document.getElementById(`table-${this.uuid[board]}`);
            const row = table.firstChild.childNodes[j];
            for (let k = 0; k < n; ++k)
                (j + k) & 1
                    ? (row.getElementsByTagName("td")[k].style.backgroundColor = "#ec8254")
                    : (row.getElementsByTagName("td")[k].style.backgroundColor = "#a67b5b");
        }
    }

    delay = async () => {
        await new Promise((done) => setTimeout(() => done(), speed));
    }

    solveQueen = async (board, r, n) => {
        if (r == n) {
            ++Board;
            let table = document.getElementById(`table-${this.uuid[Board]}`);
            for (let k = 0; k < n; ++k) {
                let row = table.firstChild.childNodes[k];
                row.getElementsByTagName("td")[this.position[board][k]].innerHTML = queen;
            }
            //this.position[Board] = this.position[board];
            return;
        }

        for (let i = 0; i < n; ++i) {
            await q.delay(); 
            // console.log("outside:" + board);
            await q.clearColor(board);
            if (await q.isValid(board, r, i, n)) {
                await q.delay();
                // console.log("inside:" + board)
                await q.clearColor(board);
                let table = document.getElementById(`table-${this.uuid[board]}`);
                let row = table.firstChild.childNodes[r];
                row.getElementsByTagName("td")[i].innerHTML = queen;

                this.position[board][r] = i;

                if (await q.solveQueen(board, r + 1, n))
                    await q.clearColor(board);

                await q.delay();
                board = Board;
                // console.log(this.Board)
                table = document.getElementById(`table-${this.uuid[board]}`);
                // console.log(JSON.parse(JSON.stringify(table)));
                row = table.firstChild.childNodes[r];
                row.getElementsByTagName("td")[i].innerHTML = " ";

                delete this.position[`${board}`][`${r}`];
            }
        }
    }
}

playButton.onclick = async function visualise() {
    const chessBoard = document.getElementById("n-queen-board");
    const arrangement = document.getElementById("queen-arrangement");

    n = numberbox.value;
    q = new Queen();

    if (n > 10) {
        numberbox.value = "";
        alert("Queen value is too large");
        return;
    } else if (n < 1) {
        numberbox.value = "";
        alert("Queen value is too small");
        return;    
    }

   
    while (chessBoard.hasChildNodes()) { 
       chessBoard.removeChild(chessBoard.firstChild);
    }
    if (arrangement.hasChildNodes()) {
        arrangement.removeChild(arrangement.lastChild)
    }

    const para = document.createElement("p");
    para.setAttribute("class", "queen-info");
    para.innerHTML = `For ${n}x${n} board, ${array[n] - 1} arrangements are possible.`;
    arrangement.appendChild(para);

    //Adding boards to the Div
    if (chessBoard.childElementCount === 0) {
        for (let i = 0; i < 1; ++i) {
            q.uuid.push(Math.random());
            let div = document.createElement('div');
            let table = document.createElement('table');
            let header = document.createElement('h4');
            // div.setAttribute("id", `div-${100 + uuid[i]}`)
            header.innerHTML = `Board ${i + 1} `
            table.setAttribute("id", `table-${q.uuid[i]}`);
            header.setAttribute("id", `paragraph-${i}`);
            chessBoard.appendChild(div);
            div.appendChild(table);
            div.appendChild(header);
            
            
            
        }
    }

    for (let k = 0; k < 1; ++k) {
        let table = document.getElementById(`table-${q.uuid[k]}`);
        for (let i = 0; i < n; ++i) {
            const row = table.insertRow(i); // inserting ith row
            row.setAttribute("id", `Row${i} `);
            for (let j = 0; j < n; ++j) {
                const col = row.insertCell(j); // inserting jth column
                (i + j) & 1
                    ? (col.style.backgroundColor = "#ec8254")
                    : (col.style.backgroundColor = "#a67b5b");
                col.innerHTML = " ";
                col.style.border = "0.3px solid #bbff1c";
            }
        }
        await q.clearColor(k);
    }
    await q.nQueen();
};
