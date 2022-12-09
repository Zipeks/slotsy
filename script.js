const slot1 = document.querySelector("#slot1");
const slot2 = document.querySelector("#slot2");
const slot3 = document.querySelector("#slot3");
const points = document.querySelector("#punkty")
const btnGraj = document.querySelector("#btnGraj");

let obrazki = ["img/banan.png","img/sliwka.png","img/gruszka.png","img/truskawka.png"];

function los() {
    return Math.round(Math.random()*(obrazki.length-1));
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


slot1.src = obrazki[los()];
slot2.src = obrazki[los()];
slot3.src = obrazki[los()];

let punkty = 1000;
points.innerText  = punkty;

btnGraj.addEventListener("click", async () => {
    if (btnGraj.innerText == "GRAJ") {
        btnGraj.innerText = "STOP";
        while (btnGraj.innerText != "GRAJ") {
            await sleep(100);
            slot1.dataset.wylosowany = los()
            slot1.src = obrazki[slot1.dataset.wylosowany];
            await sleep(100);
            slot2.dataset.wylosowany = los()
            slot2.src = obrazki[slot2.dataset.wylosowany];
            await sleep(100);
            slot3.dataset.wylosowany = los()
            slot3.src = obrazki[slot3.dataset.wylosowany];
        }
    } else {
        btnGraj.innerText = "GRAJ";
        await sleep(500);
        slot1.src = obrazki[los()];
        await sleep(100);
        slot2.src = obrazki[los()];
        await sleep(100);
        slot3.src = obrazki[los()];
        if ((slot1.src === slot2.src) && (slot2.src === slot3.src)) {
            console.log("LOL");
        }
    }
    
})
