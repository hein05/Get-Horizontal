var currentScore = 0;


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
        if (winArrayRow.length >= 3 && j == 7) {
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
    //console.log("THREE " + score );
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
