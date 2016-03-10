/**
 * Created by Watcher on 006 06.02.16.
 */
var start = document.getElementById("start");
start.addEventListener("click", startMove, false);
function startMove(){
    var circle = document.getElementById("circle");
    var makeCoor = {}, flagx = true, flagy = true;
    var x = circle.offsetLeft;
    var y = circle.offsetTop;
    makeCoor.x = function(act){
        if(act === "plus"){
            x++;
        } else if(act === "minus"){
            x--;
        }
    }
    makeCoor.y = function(act){
        if(act === "plus"){
            y++;
        } else if(act === "minus"){
            y--;
        }
    }
    var moveTarget = function(){
        if(flagx){
            makeCoor.x("plus")
            if(parseInt(window.getComputedStyle(circle)["right"]) === 0){
                flagx = false;
            }
        } else {
            makeCoor.x("minus");
            if(x === 0){
                flagx = true;
            }
        }
        if(flagy){
            makeCoor.y("plus");
            if(parseInt(window.getComputedStyle(circle)["bottom"]) === 0){
                flagy = false;
            }
        } else {
            makeCoor.y("minus");
            if(y === 0){
                flagy = true;
            }
        }
        circle.style.left = x + "px";
        circle.style.top = y + "px";
    }
    setInterval(moveTarget, 1000 / 300);
}