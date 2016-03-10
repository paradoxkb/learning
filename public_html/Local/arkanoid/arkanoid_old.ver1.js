/**
 * Created by Watcher on 004 04.02.16.
 */
var start = document.getElementById("start");
var roll = document.getElementById("roll");
var area = document.getElementById("area");
var counter = 0;
area.addEventListener("mousemove", moveRoll, false);
start.addEventListener("click", startMove, false);

function moveRoll(e){
    roll.center = area.offsetWidth * 0.5;
    roll.limit = area.getBoundingClientRect();
    if(e.clientX < roll.limit.right - roll.offsetWidth){
        roll.x = e.clientX - roll.center;
    }
    roll.style.left = roll.x + "px";
}

function startMove(){
    start.style.visibility = "hidden";
    var circle = document.getElementById("circle");
    var makeCoor = {}, flagx = true, flagy = true;
    circle.x = circle.offsetLeft;
    circle.y = circle.offsetTop;
    makeCoor.x = function(act){
        if(act === "plus"){
            circle.x++;
        } else if(act === "minus"){
            circle.x--;
        }
    }
    makeCoor.y = function(act){
        if(act === "plus"){
            circle.y++;
        } else if(act === "minus"){
            circle.y--;
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
            flagx = (circle.x === 0) ? true : false;
        }
        if(flagy){
            makeCoor.y("plus");
            if(parseInt(window.getComputedStyle(circle)["bottom"]) === parseInt(window.getComputedStyle(roll)["bottom"]) + roll.offsetHeight){
                circle.c = circle.offsetLeft + (circle.offsetWidth * 0.5);
                if(circle.c > roll.offsetLeft && circle.c < roll.offsetLeft + roll.offsetWidth ){
                    flagy = false;
                }
            }
            if(parseInt(window.getComputedStyle(circle)["bottom"]) === 0){
                counter++;
                flagy = false;
                document.getElementById("counter").innerHTML = counter;
            }
        } else {
            makeCoor.y("minus");
            flagy = (circle.y === 0) ? true : false;
        }
        circle.style.left = circle.x + "px";
        circle.style.top = circle.y + "px";
    }
    setInterval(moveTarget, 900 / 300);
}