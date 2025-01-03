let loadingText = document.querySelector('.loading-text');
let bg = document.querySelector('.bg');


let load = 0;
let int = setInterval(doIt, 50)

function doIt() {
    load++;
    loadingText.innerHTML = `${load}%`;

    if (load === 100) {
        clearInterval(int)
    }
    loadingText.style.opacity = scale(load, 0, 100, 1, 0)
    bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`
}

let scale = (num, in_min, in_max, out_min, out_max) =>{

    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}


