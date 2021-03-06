/**
 * Created by Watcher on 004 04.02.16.
 */
function $(id){
    return document.getElementById(id);
}
function comp_style(target, pos){
    return parseInt(window.getComputedStyle(target)[pos]);
}
var start = $('start'), roll = $('roll'), area = $('area'), counter = 0, circle = $('circle'), makeCoor = {}, flagx = true, flagy = true;
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
            if(comp_style(circle, 'right') === 0){
                flagx = false;
            }
        } else {
            makeCoor.x("minus");
            flagx = (circle.x === 0) ? true : false;
        }
        if(flagy){
            makeCoor.y("plus");
            if(comp_style(circle, "bottom") === comp_style(roll, "bottom") + roll.offsetHeight){
                circle.c = circle.offsetLeft + (circle.offsetWidth * 0.5);
                if(circle.c > roll.offsetLeft && circle.c < roll.offsetLeft + roll.offsetWidth ){
                    flagy = false;
                }
            }
            if(comp_style(circle, "bottom") === 0){
                counter++;
                flagy = false;
                $('counter').innerHTML = counter;
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