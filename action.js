var chosenBtn = [];


function doingSelect(i, j) {

    if (validSelection.check(i, j)) { //If both selection Valid 

        select(i, j, function () {
            //Do Game Logic Here.
            
            doSwitch(i , j, chosenBtn[0], chosenBtn[1], false,false,function() {
                //IF selection is same for both color OR there is no Bingo , switch back
                if (checkColor(i,j,chosenBtn[0], chosenBtn[1])) { 
                    doSwitch(i, j,chosenBtn[0], chosenBtn[1],true ,false,function() {
                        deSelect(chosenBtn[0], chosenBtn[1], function() {
                            //Unselect Current Selection
                            var button = document.getElementById("img_" + i + "_" + j);
                            button.style.border = "none";
                        });
                        // No more reverse
                    });

                } else { //Do Logic here. There is winning case.2
                    // checkBingo(i,j,chosenBtn[0],chosenBtn[1]);
                    doSwitch(i, j,chosenBtn[0], chosenBtn[1],true, true,function() {

                    });
                }
            });
        });

    } else { //If both selection inValid 
        console.log("InValid");
        if (chosenBtn.length == 0) { //Check IF there is the First click
            
            //If this is first click , select
            select(i, j, function () {
                //After Selection, Add to Array
                addToArray(i , j);
            });
        } else {
            //Do Second Click
            if (i == chosenBtn[0] && j == chosenBtn[1]) { //Second click same as first click
                deSelect(chosenBtn[0],chosenBtn[1],function () { 
                    //No need Call Back function
                });
            } else { 
                deSelect(chosenBtn[0],chosenBtn[1],function () { //Second click diff from first click
                    select(i , j, function () {
                        //After Selection, Add to Array
                        addToArray(i , j);
                    });
                });
            }
        }
    }
}

var validSelection = {
    check: function (i, j) {
        //Check either in same row or column
        if (i == chosenBtn[0] || j == chosenBtn[1]) {
            //Checking if these selection are adjacent
            if (checkDifference(i, chosenBtn[0]) == 1 || checkDifference(j, chosenBtn[1]) == 1) {
                return true;
            }
        }
        return false;
    }
};

var checkDifference = function (a, b) {
    return Math.abs(a - b);
};

function deSelect(A, B, select) {
    var button = document.getElementById("img_" + A + "_" + B);
    button.style.border = "none";
    chosenBtn.length = 0;
    select();
}

function select(i, j, doLogic) {
    var button = document.getElementById("img_" + i + "_" + j);
    button.setAttribute("style", "border: 2px dashed " + "white");
    doLogic();
}

function addToArray (i , j) {
    chosenBtn[0] = i;
    chosenBtn[1] = j;
}

function switchBtns (btnsArr) {
    return [btnsArr[1], btnsArr[0]];
}
