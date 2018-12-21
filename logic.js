var currentScore = 0;

function checkBingo (i,j,m,l) {
    var colorA = getButtonColor(m,l);
    var bingoA = setToBingo(i,j, colorA,bingoObjA);
    bingoA.setAll();

    for (a = 0; a < bingoA.combinedArray.length; a++) {
        if (bingoA.combinedArray[a].length >= 2) {
            var insideArrA = bingoA.combinedArray[a];
            for (inside = 0 ; inside < insideArrA.length ; inside++) {
                var btna = insideArrA[inside];
                hideButtonSingle(btna);
            }
        }
    }
   
    var colorB = getButtonColor(i,j);
    var bingoB = setToBingo(m,l, colorB,bingoObjB);
    bingoB.setAll();

    for (b = 0; b < bingoB.combinedArray.length; b++) {
        if (bingoB.combinedArray[b].length >= 2) {
            var insideArrB = bingoB.combinedArray[b];
            for (inside = 0 ; inside < insideArrB.length ; inside++) {
                var btnb = insideArrB[inside];
                hideButtonSingle(btnb);
            }
        }
    }

}

function setToBingo (r,c, color,arrObj) {
    for (i = 0; i < 4; i++) {
        if (i == 0) {
            var down = r;
            while (down <= 8) {
                down++;
                if (getButtonColor(down,c) != null) {
                    if (getButtonColor(down,c) == color) {
                        arrObj.setDown(down,c);
                    } else {
                        break;
                    }
                }
            }
        } else if (i == 1) {
            var up = r;
            while (up >= 0) {
                up--;
                if (getButtonColor(up,c) != null) {
                    if (getButtonColor(up,c) == color) {
                        arrObj.setUp(up,c);
                    } else {
                        break;
                    }
                }
            }
        } else if (i == 2) {
            var right = c;
            while (right <= 8) {
                right++;
                if (getButtonColor(r,right) != null) {
                    if (getButtonColor(r,right) == color) {
                        arrObj.setRight(r,right);

                    } else {
                        break;
                    }
                }
            }
        } else if (i == 3) {
            var left = c;
            while (left <= 0) {
                left--;
                if (getButtonColor(r,left) != null) {
                    if (getButtonColor(r,left) == color) {
                        arrObj.setLeft(r,left);

                    } else {
                        break;
                    }
                }
            }
        }
    }
    return arrObj;
}

var bingoObjA = {
    left: [],
    up: [],
    right: [],
    down: [],

    combinedArray : [],

    setAll : function () {
        this.combinedArray.push(this.left);
        this.combinedArray.push(this.up);
        this.combinedArray.push(this.right);
        this.combinedArray.push(this.down);
    },

    setChosen : function (r, c , direction) {
        if (direction == 'column-') {
            this.setLeft(r, c);
        } else if (direction == 'row-') {
            this.setUp(r,c);
        } else if (direction == 'column+') {
            this.setRight(r,c);
        } else if (direction == 'row+') {
            this.setDown(r,c);
        }
    },

    setLeft : function (r , c) {
        var btn = getButtonParent(r, c);
        this.left.push(btn);
    },

    setUp : function (r , c) {
        var btn = getButtonParent(r, c);
        this.up.push(btn);
    },

    setRight : function (r , c) {
        var btn = getButtonParent(r, c);
        this.right.push(btn);
    },

    setDown : function (r , c) {
        var btn = getButtonParent(r, c);
        this.down.push(btn);
    }

};

var bingoObjB = {
    left: [],
    up: [],
    right: [],
    down: [],

    combinedArray : [],

    setAll : function () {
        this.combinedArray.push(this.left);
        this.combinedArray.push(this.up);
        this.combinedArray.push(this.right);
        this.combinedArray.push(this.down);
    },

    setChosen : function (r, c , direction) {
        if (direction == 'column-') {
            this.setLeft(r, c);
        } else if (direction == 'row-') {
            this.setUp(r,c);
        } else if (direction == 'column+') {
            this.setRight(r,c);
        } else if (direction == 'row+') {
            this.setDown(r,c);
        }
    },

    setLeft : function (r , c) {
        var btn = getButtonParent(r, c);
        this.left.push(btn);
    },

    setUp : function (r , c) {
        var btn = getButtonParent(r, c);
        this.up.push(btn);
    },

    setRight : function (r , c) {
        var btn = getButtonParent(r, c);
        this.right.push(btn);
    },

    setDown : function (r , c) {
        var btn = getButtonParent(r, c);
        this.down.push(btn);
    }

};

function getButtonParent (r, c) {
    var img = document.getElementById("img_" + r + "_" + c);
    var parent = img.parentElement;
    return parent;
}

function checkColor (i,j,m,l) {
    var colorA = getButtonColor(i,j);
    var colorB = getButtonColor(m,l);
    // console.log("color equality : " + boo);
    return colorA == colorB;
}

function checkWinColor () {
    var winTmp = document.getElementById("tmp_" + 0);
    var winColor = (winTmp != null) ? winTmp.getAttribute("alt") : "";
    var winArrayRow = [];
    var winArrayCol = [];
    var score = +0;
    var winnable = false;
    for (i = 0; i < 8; i++) {
        winArrayRow.length = 0;
        winArrayCol.length = 0;
        for (j = 0; j < 8; j++) {
            // console.log("ONE" + winColor);
            if (getButtonColor(i,j) == winColor) {
                console.log("ONE " + i + " " + j + " " + score );
                winArrayRow.push(i);
                winArrayCol.push(j);
                
            } else {
                if (winArrayRow.length >= 3) {
                    for ( a = 0 ; a < winArrayRow.length ; a++) {
                        // var button = document.getElementById("img_" + i + "_" + j);
                        setButtonColor(winArrayRow[a],winArrayCol[a], "black");
                        // setButtonText(winArrayRow[a],winArrayCol[a],"");
                        var txt = getButtonText(winArrayRow[a],winArrayCol[a]);
                        // var txt = document.getElementById("text_" + winArrayRow[a] + "_" + winArrayCol[a]);
                        var textValue = 0;

                        if (txt != "") {
                             textValue = parseInt(txt, 10); //convert the text to base10 (decimal) number
                             if (textValue > 0) {
                                console.log("TWO " + txt + " " + textValue );
                                score = +score + textValue;
                                winnable = true;
                            }
                        }
                    }
                    winArrayRow.length = 0;
                    winArrayCol.length = 0;
                } 
                else {
                    winArrayRow.length = 0;
                    winArrayCol.length = 0;
                }
            }
        //   setButtonColor(i, j, "white");
        //   setButtonText(i, j, "");
        if (winArrayRow.length >= 3) {
            for ( a = 0 ; a < winArrayRow.length ; a++) {
                // var button = document.getElementById("img_" + i + "_" + j);
                setButtonColor(winArrayRow[a],winArrayCol[a], "black");
                // setButtonText(winArrayRow[a],winArrayCol[a],"");
                var txtb = getButtonText(winArrayRow[a],winArrayCol[a]);
                // var txt = document.getElementById("text_" + winArrayRow[a] + "_" + winArrayCol[a]);
                var textValueb = 0;
                

                if (txtb != "") {
                     textValueb = parseInt(txtb, 10); //convert the text to base10 (decimal) number
                     if (textValueb > 0) {
                        score = +score + textValueb;
                        winnable = true;
                    }
                }
            }
            winArrayRow.length = 0;
            winArrayCol.length = 0;
        } 
        
        }
        
    }
    
    currentScore = score;
    changeScore(currentScore,"text-bold",5);
    console.log("THREE " + score );
    return winnable;
}

var gameStatus = {
    playing: false,
    ended: true,

    changeStatus : function () {
        if(this.playing) {
            this.playing = false;
            this.ended = true;
        } else {
            this.playing = true;
            this.ended = false;
        }
    }
};

var gameLevel = {
    level : 0,

    updateLevel : function () {
        this.level += 1;
    },

    restartLevel : function () {
        this.level = 0;
    }
};
