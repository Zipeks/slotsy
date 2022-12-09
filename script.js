const points = document.querySelector("#punkty")
const btnGraj = document.querySelector(".btnGraj");

// let obrazki = ["🍍","🍇","🍋","🍎","🫐","🥥","🥕"];


// function los() {
//     return Math.round(Math.random()*(obrazki.length-1));
// }
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let punkty = 1000;
points.innerText  = punkty;

class JednorekiBandyta {

    constructor() {
        this.obrazki = ["🍍","🍇","🍋","🍎","🫐","🥥","🥕"];
        this.pola = [document.querySelector("#slot1"),document.querySelector("#slot2"),document.querySelector("#slot3")]

        this.pola[0].innerHTML = this.obrazki[this.los()];
        this.pola[1].innerHTML = this.obrazki[this.los()];
        this.pola[2].innerHTML = this.obrazki[this.los()];
    }

    los() {
        return Math.round(Math.random()*(this.obrazki.length-1));
    }

    async spuszczenieDzwigni(time) {
        for (let i = 0 ; i < 3; i++) {
            
            await sleep(time);

            let a = this.los();
            
            while (this.pola[i].innerHTML == this.obrazki[a]) {
                a = this.los();
            }
            this.pola[i].innerHTML = this.obrazki[a];
        }        
    }

    async graj() {
        if (btnGraj.innerText == "GRAJ") {
            btnGraj.classList.add("btnActive");
            btnGraj.innerText = "STOP";
            while (btnGraj.innerText != "GRAJ") {
                await this.spuszczenieDzwigni(100)
            }
        } else {
            btnGraj.classList.remove("btnActive");
            btnGraj.innerText = "GRAJ";
            btnGraj.disabled = true;
            await this.spuszczenieDzwigni(500);
            btnGraj.disabled = false;

            if ((slot1.src === slot2.src) && (slot2.src === slot3.src)) {
                console.log("LOL");
            }
        }        
    }

}

let bandyta = new JednorekiBandyta();
btnGraj.addEventListener("click",  () => {
   bandyta.graj(); 
})
