/**
 * Created by Watcher on 004 06.03.16.
 */
function $(id){
    return document.getElementById(id);
}
var start = $('start'), roll = $('roll'), area = $('area'), counter = 0, circle = $('circle'), flagx = true, flagy = true;
function comp_style(target, pos){
    return parseInt(window.getComputedStyle(target)[pos]);
}
function makeCoor (tar, route, act){
    if(act === "plus"){
        tar[route]++;
    } else if(act === "minus"){
        tar[route]--;
    }
}
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
    var moveTarget = function(){
        if(flagx){
            makeCoor(circle, 'x', "plus");
            flagx = (comp_style(circle, 'right') === 0) ? false : flagx;
        } else {
            makeCoor(circle, 'x', "minus");
            flagx = (circle.x === 0) ? true : false;
        }
        if(flagy){
            makeCoor(circle, 'y', "plus");
            if(comp_style(circle, "bottom") === comp_style(roll, "bottom") + roll.offsetHeight){
                circle.c = circle.offsetLeft + (circle.offsetWidth * 0.5);
                if(circle.c > roll.offsetLeft && circle.c < roll.offsetLeft + roll.offsetWidth ){
                    flagy = false;
                }
            }
            if(comp_style(circle, "bottom") === 0){
                circle.x = 0;
                circle.y = 0;
                flagx = true;
                counter++;
                $('counter').innerHTML = counter;
            }
        } else {
            makeCoor(circle, 'y', "minus");
            flagy = (circle.y === 0) ? true : false;
        }
        circle.style.left = circle.x + "px";
        circle.style.top = circle.y + "px";
    }
    setInterval(moveTarget, 1000 / 300);
}
area.addEventListener("mousemove", moveRoll, false);
start.addEventListener("click", startMove, false);