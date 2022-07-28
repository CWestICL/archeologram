const puzzleE1 = "1111101110111111111101110,DIAM"
const puzzleE2 = "0111011111101010111001010,ASCTT"

const grid = document.getElementById("main-grid");
const loadBtn = document.getElementById("load-btn");
const canvas = document.getElementById("create-grid");
const gridBtn = document.getElementById("grid-btn");
const gridInput = document.getElementById("rowcol-input");
const nameInput = document.getElementById("name-input");
const exportArea = document.getElementById("export-area");

gridBtn.addEventListener("click", function() {
    canvas.innerHTML = ``;
    for (i=0;i-1<gridInput.value;i++) {
        if ((i-1) % 5 === 0 && i !== 1) {
            console.log("Break");
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
    //console.log(arr);
    return arr;
}


function genPuzzle(puzz) {
    puzz = puzz.split(",");
    puzzCode = puzz[0];
    puzzName = puzz[1];
    gridSize = Math.sqrt(puzzCode.length);
    puzzArr = arrayPuzzle(puzzCode,gridSize);
    console.log(puzzCode,puzzName,gridSize);
    try {
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

        console.log(puzzArr);
        for (y=0;y<puzzArr.length;y++) {
            //console.log(y);
            let row = document.getElementById("main-num-row-" + (y+1));
            let nums = getRowNums(puzzArr,y);
            console.log(nums);
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
            console.log("Temp:",temp);
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
    }
    
    catch(e) {
        alert("Error loading puzzle!\nPlease check code is correct");
    }

    document.getElementById("tool-space").innerHTML += `<div id="hammer-button" class="tool-button active">HAMMER</div><div id="brush-button" class="tool-button">BRUSH</div`;
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
                this.classList.add("solid");
            }
            else {
                this.classList.toggle('brush');
            }
        });
    });
    let incorrectBlocks = document.querySelectorAll(".block.incorrect");
    incorrectBlocks.forEach(block => {
        block.addEventListener("click", function() {
            if (hammer) {
                this.classList.add("mistake");
            }
            else {
                this.classList.toggle('brush');
            }
        });
    });
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
    let puzzle = document.getElementById("load-area").value;
    document.getElementById("load-area").value = "";
    genPuzzle(puzzle);

});
//genPuzzle("0000111000000100010000100000100010011001001010010101100001011001001001100011001001000001000011111000,IUGVQBM");
//genPuzzle("000111111111000001000000000100010000000000010100000000000001111111111111111010010101010010010010101010010010010101010010010010101010010010010101010010010010101010010010010101010010111111111111111100000000000001111111111111111,BMUXTM");