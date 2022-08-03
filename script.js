const puzzleE1 = "1111101110111111111101110,DIAM";
const puzzleE2 = "0111011111101010111001010,ASCTT";
const puzzleE3 = "0010000010011011111011100,NWWBXZQVB";
const puzzleM1 = "0001111000001101110001110011101111111111100100110110110010011111111111011110111000110111000001111000,KWXXMZ KWQV";
const puzzleM2 = "0111110000011111000000111000000011111100011111001011111110101011101010110001110011111110000111110000,RCO";
const puzzleM3 = "000000111000000000011111110000001111000111100111100000001111111111111111111111111111111111011100111001110011100111001110011100111001110011100111001110011100111001110111111111111111111111111111111110000000000011111111111111111,BMUXTM";
const puzzleH1 = "0000111000000111110000111011100011010111110101101111011010111110111011011100011000111111000001111000,IUUWVQBM";
const puzzleH2 = "000000000000000000000000000000000000001111000001110011111100010111100010100101111000010110111110101101110101111111111100001010101110110000000000100011000000001111011101010111111110111111111111100011111111110000000000000000000,BZMF ASCTT";
const puzzleH3 = "000000000000000000111111000000111111111111100111000000111111000011111000011000111111100000001111111110000011101110111100111001100111111011111111111000001111111000000001111100001100001100110010010001100011000100000110001111000,MGM WN PWZCA";

const grid = document.getElementById("main-grid");
const e1Btn = document.getElementById("e1-btn");
const e2Btn = document.getElementById("e2-btn");
const e3Btn = document.getElementById("e3-btn");
const m1Btn = document.getElementById("m1-btn");
const m2Btn = document.getElementById("m2-btn");
const m3Btn = document.getElementById("m3-btn");
const h1Btn = document.getElementById("h1-btn");
const h2Btn = document.getElementById("h2-btn");
const h3Btn = document.getElementById("h3-btn");
const helpBtn = document.getElementById("help-btn");
const loadBtn = document.getElementById("load-btn");
const clearBtn = document.getElementById("clear-btn");
const canvas = document.getElementById("create-grid");
const gridBtn = document.getElementById("grid-btn");
const gridInput = document.getElementById("rowcol-input");
const nameInput = document.getElementById("name-input");
const exportArea = document.getElementById("export-area");

e1Btn.addEventListener("click", function() {
    genPuzzle(puzzleE1);
    deactivateButtons();
    this.classList.add("active");
});
e2Btn.addEventListener("click", function() {
    genPuzzle(puzzleE2);
    deactivateButtons();
    this.classList.add("active");
});
e3Btn.addEventListener("click", function() {
    genPuzzle(puzzleE3);
    deactivateButtons();
    this.classList.add("active");
});
m1Btn.addEventListener("click", function() {
    genPuzzle(puzzleM1);
    deactivateButtons();
    this.classList.add("active");
});
m2Btn.addEventListener("click", function() {
    genPuzzle(puzzleM2);
    deactivateButtons();
    this.classList.add("active");
});
m3Btn.addEventListener("click", function() {
    genPuzzle(puzzleM3);
    deactivateButtons();
    this.classList.add("active");
});
h1Btn.addEventListener("click", function() {
    genPuzzle(puzzleH1);
    deactivateButtons();
    this.classList.add("active");
});
h2Btn.addEventListener("click", function() {
    genPuzzle(puzzleH2);
    deactivateButtons();
    this.classList.add("active");
});
h3Btn.addEventListener("click", function() {
    genPuzzle(puzzleH3);
    deactivateButtons();
    this.classList.add("active");
});
helpBtn.addEventListener("click", function() {
    grid.innerHTML = `
    <div class="how-to-play">
    <h3>How to Play</h3>
    <h4>Hammer</h4>
    <p>Use the hammer to chip away blocks that are part of the puzzle. Be careful not to chip away incorrect blocks or you lose a life.</p>
    <h4>Brush</h4>
    <p>Use the brush to mark blocks you've deduced aren't part of the puzzle.</p>
    <h4>Row and Column Numbers</h4>
    <p>The numbers next to each row and column tell you how many clusters of blocks should be revealed.</p>
    <div class="row"><div class="nums row"><div class="number">4</div></div><div class="block solid"></div><div class="block solid"></div><div class="block solid"></div><div class="block solid"></div><div class="block"></div></div>
    <div class="row"><div class="nums row"><div class="number">2</div></div><div class="block"></div><div class="block"></div><div class="block solid"></div><div class="block solid"></div><div class="block"></div></div>
    <p>Multiple numbers mean there are multiple clusters in the row/column. Each cluster of blocks will have a gap of at least one block between them.</p>
    <div class="row"><div class="nums row"><div class="number">1</div><div class="number">2</div></div><div class="block"></div><div class="block solid"></div><div class="block"></div><div class="block solid"></div><div class="block solid"></div></div>
    <div class="row"><div class="nums row"><div class="number">1</div><div class="number">1</div><div class="number">1</div></div><div class="block solid"></div><div class="block"></div><div class="block solid"></div><div class="block"></div><div class="block solid"></div></div>
    <p>Good luck and have fun!</p>
    </div>
`;
    deactivateButtons();
    this.classList.add("active");
});
clearBtn.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

function deactivateButtons() {
    e1Btn.classList.remove("active");
    e2Btn.classList.remove("active");
    e3Btn.classList.remove("active");
    m1Btn.classList.remove("active");
    m2Btn.classList.remove("active");
    m3Btn.classList.remove("active");
    h1Btn.classList.remove("active");
    h2Btn.classList.remove("active");
    h3Btn.classList.remove("active");
    helpBtn.classList.remove("active");
}

gridBtn.addEventListener("click", function() {
    canvas.innerHTML = ``;
    for (i=0;i-1<gridInput.value;i++) {
        if ((i-1) % 5 === 0 && i !== 1) {
            //console.log("Break");
            canvas.innerHTML += `<div class="row-div"></div>`;
        }
        canvas.innerHTML += `<div id="canv-row-${i}" class="row"></div>`;
        let row = document.getElementById("canv-row-" + i);
        for (x=0;x<gridInput.value;x++) {
            if (i === 0) {
                if (x === 0) {
                    row.innerHTML += `<div class="nums row col"></div>`;
                }
                else if (x % 5 === 0) {
                    row.innerHTML += `<div class="col-div"></div>`;
                }
                row.innerHTML += `<div id="num-col-${x}" class="nums col"></div>`;
            }
            else {
                if (x === 0) {
                    row.innerHTML += `<div id="num-row-${i}" class="nums row"></div>`;
                }
                else if (x % 5 === 0) {
                    row.innerHTML += `<div class="col-div"></div>`;
                }
                row.innerHTML += `<div id="block-${i}-${x}" class="block edit"></div>`;
            }
        }
    }
    updateCanvas();
    let editBlocks = document.querySelectorAll(".edit");
    editBlocks.forEach(block => {
        block.addEventListener("click", function() {
            this.classList.toggle('solid');
            updateCanvas();
        });
    });
});

function updateCanvas() {
    let puzz = exportCanvas();
    //console.log(puzz.length);
    for (y=0;y<puzz.length;y++) {
        //console.log(y);
        let row = document.getElementById("num-row-" + (y+1));
        let nums = getRowNums(puzz,y);
        row.innerHTML = ``;
        for (x=0;x<nums.length;x++) {
            row.innerHTML += `<div class="number">${nums[x]}</div>`;
        }
    }
    for (y=0;y<puzz.length;y++) {
        let col = document.getElementById("num-col-" + y);
        let nums = getColNums(puzz,y);
        col.innerHTML = ``;
        for (x=0;x<nums.length;x++) {
            col.innerHTML += `<div class="number">${nums[x]}</div>`;
        }
    }
    exportArea.innerText = puzz.flat().join("") + "," + exportName();
}

function exportCanvas() {
    let editBlocks = document.querySelectorAll(".edit");
    let rowCols = Math.sqrt(editBlocks.length);
    let arr = [];
    let finalArr = [];
    for (i=0;i<editBlocks.length;i++) {
        if (editBlocks[i].classList.contains("solid")) {
            arr.push(1);
        }
        else {
            arr.push(0);
        }
    }
    while (arr.length > 0) {
        let minArr = [];
        for (i=0;i<rowCols;i++) {
            minArr.push(arr.shift());
        }
        finalArr.push(minArr);
    }
    return finalArr;
}

function exportName() {
    let str = nameInput.value.toLowerCase();

    if (!str) {
        str = "artifact";
    }

    const alph = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    let alphCap = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    let encStr = "";

    for (i = 0; i < 8; i++) {
        let temp = alphCap.shift();
        alphCap.push(temp);
    }
    
    for (i = 0; i < str.length; i++) {
        for (x = 0; x < alph.length; x++) {
        if (str[i] === alph[x]) {
            encStr += alphCap[x];
        }
        }
        if (str[i] === " ") {
            encStr += " ";
        }
    }

    return encStr;
}

function getRowNums(puzz,num) {
    let arr = [];
    counter = 0;
    for (i=0;i-1<puzz[num].length;i++) {
        //console.log(puzz[num][i]);
        if (puzz[num][i]) {
            counter ++;
            //console.log("Counter++");
        }
        else if (counter) {
            //console.log("Push:",counter);
            arr.push(counter);
            counter = 0;
        }
    }
    if (!arr.length) {
        arr = [0];
    }
    return arr;
}

function getColNums(puzz,num) {
    let arr = [];
    counter = 0;
    for (i=0;i-1<puzz.length;i++) {
        if (puzz[i]) {
            if (puzz[i][num]) {
                counter ++;
            }
            else if (counter) {
                arr.push(counter);
                counter = 0;
            }
        }
        else if (counter) {
            arr.push(counter);
            counter = 0;
        }
    }
    if (!arr.length) {
        arr = [0];
    }
    return arr;
}


function genPuzzle(puzz) {
    puzz = puzz.split(",");
    let puzzCode = puzz[0];
    let puzzCodeOrig = puzz[0];
    let puzzName = puzz[1];
    let gridSize = Math.sqrt(puzzCode.length);
    let puzzArr = arrayPuzzle(puzzCode,gridSize);
    //console.log(puzzCode,puzzName,gridSize);
    let lives = 3;
    try {
        if (puzz.length !== 2) {
            throw new Error("Incompatible puzzle code");
        }
        if (puzzCode.length !== 25 && puzzCode.length !== 100 && puzzCode.length !== 225) {
            throw new Error("Incompatible puzzle code");
        }
        if (puzzName.length < 1 || puzzName.length > 30) {
            throw new Error("Incompatible puzzle code");
        }
        grid.innerHTML = ``;
        for (i=0;i-1<gridSize;i++) {
            if ((i-1) % 5 === 0 && i !== 1) {
                grid.innerHTML += `<div class="row-div"></div>`;
            }
            grid.innerHTML += `<div id="main-canv-row-${i}" class="row"></div>`;
            let row = document.getElementById("main-canv-row-" + i);
            for (x=0;x<gridSize;x++) {
                if (i === 0) {
                    if (x === 0) {
                        row.innerHTML += `<div id="tool-space" class="nums row col"></div>`;
                    }
                    else if (x % 5 === 0) {
                        row.innerHTML += `<div class="col-div"></div>`;
                    }
                    row.innerHTML += `<div id="main-num-col-${x}" class="nums col"></div>`;
                }
                else {
                    if (x === 0) {
                        row.innerHTML += `<div id="main-num-row-${i}" class="nums row"></div>`;
                    }
                    else if (x % 5 === 0) {
                        row.innerHTML += `<div class="col-div"></div>`;
                    }
                    if (Number(puzzCode[0])) {
                        row.innerHTML += `<div id="block-${i}-${x}" class="block correct"></div>`;
                    }
                    else {
                        row.innerHTML += `<div id="block-${i}-${x}" class="block incorrect"></div>`;
                    }
                    puzzCode = puzzCode.slice(1);
                }
            }
        }

        //console.log(puzzArr);
        for (y=0;y<puzzArr.length;y++) {
            //console.log(y);
            let row = document.getElementById("main-num-row-" + (y+1));
            let nums = getRowNums(puzzArr,y);
            //console.log(nums);
            row.innerHTML = ``;
            for (x=0;x<nums.length;x++) {
                row.innerHTML += `<div class="number">${nums[x]}</div>`;
            }
        }
        for (y=0;y<puzzArr.length;y++) {
            let col = document.getElementById("main-num-col-" + y);
            let nums = getColNums(puzzArr,y);
            col.innerHTML = ``;
            for (x=0;x<nums.length;x++) {
                col.innerHTML += `<div class="number">${nums[x]}</div>`;
            }
        }

        const alphCap = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        let alph = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        let newCyp = "";
    
        for (i = 0; i < 8; i++) {
            let temp = alph.pop();
            //console.log("Temp:",temp);
            alph.unshift(temp);
        }
        
        for (i = 0; i < puzzName.length; i++) {
            for (x = 0; x < alphCap.length; x++) {
                if (puzzName[i] === alphCap[x]) {
                newCyp += alph[x];
                }
            }
            if (puzzName[i] === " ") {
                newCyp += " ";
            }
        }
        puzzName = newCyp;
    }
    catch(e) {
        canvas.innerHTML = ``;
        document.getElementById("game-hud").innerHTML = ``;
        alert("Error loading puzzle!\nPlease check code is correct");
        return;
    }

    renderLives(lives);

    document.getElementById("tool-space").innerHTML += `<div id="hammer-button" class="tool-button active"><img src="img/hammer-icon.png" alt=""></div><div id="brush-button" class="tool-button"><img src="img/brush-icon.png" alt=""></div`;
    let hammer = true;

    let hammerButton = document.getElementById("hammer-button");
    let brushButton = document.getElementById("brush-button");
    hammerButton.addEventListener("click", function() {
        if (!this.classList.contains("active")) {
            this.classList.add("active");
            brushButton.classList.remove("active");
            hammer = true;
        }
    });
    brushButton.addEventListener("click", function() {
        if (!this.classList.contains("active")) {
            this.classList.add("active");
            hammerButton.classList.remove("active");
            hammer = false;
        }
    });

    let correctBlocks = document.querySelectorAll(".block.correct");
    correctBlocks.forEach(block => {
        block.addEventListener("click", function() {
            if (hammer) {
                if (this.classList.contains("brush")) {
                    this.classList.remove("brush");
                }
                this.classList.add("solid");
                checkComplete(puzzName,puzzCodeOrig);
            }
            else if (!this.classList.contains("solid")) {
                this.classList.toggle('brush');
            }
        });
    });
    let incorrectBlocks = document.querySelectorAll(".block.incorrect");
    incorrectBlocks.forEach(block => {
        block.addEventListener("click", function() {
            if (hammer) {
                this.classList.add("mistake");
                lives--;
                renderLives(lives);
                if (!lives) {
                    removeEvent();
                    setTimeout(function() {
                        grid.innerHTML = `
                        <div class="how-to-play game-over">
                        <h3 class="game-over">GAME OVER</h3>
                        </div>
                        `;
                        deactivateButtons();
                    }, 1000);
                }
            }
            else {
                this.classList.toggle('brush');
            }
        });
    });
}

function renderLives(num) {
    document.getElementById("game-hud").innerHTML = `Lives: <div class="life"></div><div class="life"></div><div class="life"></div>`;
    let lives = document.querySelectorAll(".life");
    for (i=0;i<num;i++) {
        lives[i].classList.add("full");
    }
}

function arrayPuzzle(puzz,size) {
    let arr = [];
    let finalArr = [];
    for (i=0;i<puzz.length;i++) {
        arr.push(Number(puzz[i]));
    }
    while (arr.length > 0) {
        let minArr = [];
        for (i=0;i<size;i++) {
            minArr.push(arr.shift());
        }
        finalArr.push(minArr);
    }
    return finalArr;
}

loadBtn.addEventListener("click", function() {
    deactivateButtons();
    let puzzle = document.getElementById("load-area").value;
    document.getElementById("load-area").value = "";
    genPuzzle(puzzle);

});

function checkComplete(puzzName,puzzCode) {
    let correctBlocks = document.querySelectorAll(".block.correct");
    let incomp = false;
    for (i=0;i<correctBlocks.length;i++) {
        if (!correctBlocks[i].classList.contains("solid")) {
            incomp = true;
        }
    }
    if (!incomp) {
        removeEvent();
        setTimeout(function() {
            grid.innerHTML = `
            <div class="how-to-play">
            <h3 class="win">Congratulations!</h3>
            <h3 class="win-sub">You Uncovered:</h3>
            <h3 id="win-name" class="win"></h3>
            <div class="grid-container win">
                <div id="win-grid" class="grid-div">
                </div>
            </div>
            </div>
            `;
            document.getElementById("win-name").innerText = puzzName;
            let winGrid = document.getElementById("win-grid");
            winGrid.innerHTML = ``;
            let gridSize = Math.sqrt(puzzCode.length);
            for (i=0;i<gridSize;i++) {
                winGrid.innerHTML += `<div id="win-row-${i}" class="row"></div>`;
                let row = document.getElementById("win-row-" + i);
                for (x=0;x<gridSize;x++) {
                    if (Number(puzzCode[0])) {
                        row.innerHTML += `<div id="block-${i}-${x}" class="block win solid"></div>`;
                    }
                    else {
                        row.innerHTML += `<div id="block-${i}-${x}" class="block win"></div>`;
                    }
                    puzzCode = puzzCode.slice(1);
                }
            }
            updateProgress();
        }, 1000);
    }
}

function removeEvent() {
    let correctBlocks = document.querySelectorAll(".block.correct");
    correctBlocks.forEach(block => {
        block.replaceWith(block.cloneNode(true));
    });
    let incorrectBlocks = document.querySelectorAll(".block.incorrect");
    incorrectBlocks.forEach(block => {
        block.replaceWith(block.cloneNode(true));
    });
}

function updateProgress() {
    let progress;
    if (localStorage.getItem("progress")) {
        progress = JSON.parse(localStorage.getItem("progress"));
    }
    else {
        progress = {
            e1: false,
            e2: false,
            e3: false,
            m1: false,
            m2: false,
            m3: false,
            h1: false,
            h2: false,
            h3: false
        }
    }
    if (e1Btn.classList.contains("active")) {
        progress.e1 = true;
    }
    if (e2Btn.classList.contains("active")) {
        progress.e2 = true;
    }
    if (e3Btn.classList.contains("active")) {
        progress.e3 = true;
    }
    if (m1Btn.classList.contains("active")) {
        progress.m1 = true;
    }
    if (m2Btn.classList.contains("active")) {
        progress.m2 = true;
    }
    if (m3Btn.classList.contains("active")) {
        progress.m3 = true;
    }
    if (h1Btn.classList.contains("active")) {
        progress.h1 = true;
    }
    if (h2Btn.classList.contains("active")) {
        progress.h2 = true;
    }
    if (h3Btn.classList.contains("active")) {
        progress.h3 = true;
    }
    //console.log(progress);
    localStorage.setItem("progress",JSON.stringify(progress));
    loadProgress();
}

function loadProgress() {
    if (localStorage.getItem("progress")) {
        let progress = JSON.parse(localStorage.getItem("progress"));
        if (progress.e1) {
            e1Btn.innerText = "1. VASE";
            e1Btn.classList.add("complete");
        }
        if (progress.e2) {
            e2Btn.innerText = "2. SKULL";
            e2Btn.classList.add("complete");
        }
        if (progress.e3) {
            e3Btn.innerText = "3. FOOTPRINT";
            e3Btn.classList.add("complete");
        }
        if (progress.m1) {
            m1Btn.innerText = "1. COPPER COIN";
            m1Btn.classList.add("complete");
        }
        if (progress.m2) {
            m2Btn.innerText = "2. JUG";
            m2Btn.classList.add("complete");
        }
        if (progress.m3) {
            m3Btn.innerText = "3. TEMPLE";
            m3Btn.classList.add("complete");
        }
        if (progress.h1) {
            h1Btn.innerText = "1. AMMONITE";
            h1Btn.classList.add("complete");
        }
        if (progress.h2) {
            h2Btn.innerText = "2. TREX SKULL";
            h2Btn.classList.add("complete");
        }
        if (progress.h3) {
            h3Btn.innerText = "3. EYE OF HORUS";
            h3Btn.classList.add("complete");
        }
    }
}
//console.log(localStorage.getItem("progress"));
loadProgress();
