const testPuzzle = [[0,1,1],[0,1,0],[0,0,1]]
const grid = document.getElementById("main-grid");
const canvas = document.getElementById("create-grid");
const gridBtn = document.getElementById("grid-btn");
const gridInput = document.getElementById("rowcol-input");
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
    console.log(puzz.length);
    for (y=0;y<puzz.length;y++) {
        console.log(y);
        let row = document.getElementById("num-row-" + (y+1));
        let nums = getRowNums(y);
        row.innerHTML = ``;
        for (x=0;x<nums.length;x++) {
            row.innerHTML += `<div class="number">${nums[x]}</div>`;
        }
    }
    for (y=0;y<puzz.length;y++) {
        let col = document.getElementById("num-col-" + y);
        let nums = getColNums(y);
        col.innerHTML = ``;
        for (x=0;x<nums.length;x++) {
            col.innerHTML += `<div class="number">${nums[x]}</div>`;
        }
    }
    exportArea.innerText = puzz.flat().join("") + ",";
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

function getRowNums(num) {
    let puzz = exportCanvas();
    let arr = [];
    counter = 0;
    for (i=0;i-1<puzz[num].length;i++) {
        if (puzz[num][i]) {
            counter ++;
        }
        else if (counter) {
            arr.push(counter);
            counter = 0;
        }
    }
    return arr;
}

function getColNums(num) {
    let puzz = exportCanvas();
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
    for (i=0;i<puzz.length;i++) {
        grid.innerHTML += `<div id="row-${i}" class="row"></div>`;

        let row = document.getElementById("row-" + i);
        for (x=0;x<puzz[i].length;x++) {
            if (puzz[i][x]) {
                row.innerHTML += `<div id="block-${i}-${x}" class="block solid"></div>`;
            }
            else {
                row.innerHTML += `<div id="block-${i}-${x}" class="block"></div>`;
            }
        }
    }
}

genPuzzle(testPuzzle);