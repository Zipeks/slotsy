const pointsSpan = document.querySelector("#punkty");
const btnGraj = document.querySelector(".btnGraj");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class JednorekiBandyta {

    constructor() {
        this.obrazki = ["🍍","🍇","🍋","🍎","🥥","🥕"];
        this.pola = [document.querySelector("#slotIn1"), document.querySelector("#slotIn2"), document.querySelector("#slotIn3")];
        this.stawka = document.querySelector("#stawka").value;
        this.pola[0].innerHTML = this.obrazki[this.los()];
        this.pola[1].innerHTML = this.obrazki[this.los()];
        this.pola[2].innerHTML = this.obrazki[this.los()];
        this.punkty = 1000;
        pointsSpan.innerHTML = this.punkty;
    }

    los() {
        return Math.round(Math.random()*(this.obrazki.length-1));
    }

    async spuszczenieDzwigni() {
        for (let i = 0 ; i < 3; i++) {
            await sleep(i*100)
            let a = this.los();
            
            while (this.pola[i].innerHTML == this.obrazki[a]) {
                a = this.los();
            }
            this.pola[i].innerHTML = this.obrazki[a];
        }
    }

    async graj() {
        if (btnGraj.innerText == "GRAJ") {
            this.punkty-=this.stawka;
            this.pointsSpan.innerHTML = this.punkty;
            btnGraj.classList.add("btnActive");
            btnGraj.innerText = "STOP";
            for (let i = 0 ; i < 3; i++) {
                await sleep(400+(i*100));
                this.pola[i].classList.add("slot-machine-reel");
                this.pola[i].classList.remove("slot-machine-reel-end");
            }
            while (btnGraj.innerText != "GRAJ") {
                this.spuszczenieDzwigni();
                await sleep(400);
            }

        } else {
            btnGraj.innerText = "GRAJ";
            btnGraj.classList.remove("btnActive");
            btnGraj.disabled = true;
            await sleep(1200);
            this.spuszczenieDzwigni();
            for (let i = 0 ; i < 3; i++) {
                await sleep(400+i*100);
                console.log(i);
                this.pola[i].classList.remove("slot-machine-reel");
                this.pola[i].classList.add("slot-machine-reel-end");
            }
            btnGraj.disabled = false;

            if ((slot1.innerHTML === slot2.innerHTML) && (slot2.innerHTML === slot3.innerHTML)) {
                punkty += 100;
                this.pointsSpan.innerHTML = this.punkty;

            }
        }        
    }

}

let bandyta = new JednorekiBandyta();
btnGraj.addEventListener("click",  () => {
   bandyta.graj(); 
})
