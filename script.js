const pointsSpan = document.querySelector("#punkty");
const btnGraj = document.querySelector(".btnGraj");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class JednorekiBandyta {

    constructor() {
        this.obrazki = ["🍍","🍇","🍋","🍎","🥥","🥕","🌶️","🍉","🌽"];
        this.pola = [document.querySelector("#slotIn1"), document.querySelector("#slotIn2"), document.querySelector("#slotIn3")];
        this.stawka = document.querySelector("#stawka");
        this.pola[0].innerHTML = this.obrazki[this.los()];
        this.pola[1].innerHTML = this.obrazki[this.los()];
        this.pola[2].innerHTML = this.obrazki[this.los()];
        this.punkty = 1000;
        pointsSpan.innerHTML = this.punkty;
    }

    los() {
        return Math.round(Math.random()*(this.obrazki.length-1));
    }

    async spuszczenieDzwigni(choosen = -1) {
        if (choosen == -1) {
            for (let i = 0 ; i < this.pola.length; i++) {
            await sleep(i*100)
            let a = this.los();
            
            while (this.pola[i].innerHTML == this.obrazki[a]) {
                a = this.los();
            }
            this.pola[i].innerHTML = this.obrazki[a];
            }
        } else {
            let a = this.los();
            
            while (this.pola[choosen].innerHTML == this.obrazki[a]) {
                a = this.los();
            }
            this.pola[choosen].innerHTML = this.obrazki[a];
        }
        
    }

    async graj() {
    
        if (btnGraj.innerText == "GRAJ") {
            if (this.punkty-this.stawka.value >= 0) {
                btnGraj.disabled = true;

                this.punkty-=this.stawka.value;
                this.bet = this.stawka.value;

                pointsSpan.innerHTML = this.punkty;

                btnGraj.classList.add("btnActive");
                btnGraj.innerText = "STOP";

                for (let i = 0 ; i < this.pola.length; i++) {
                    
                    this.pola[i].classList.add("slot-machine-reel-start");
                    await sleep(400+(i*100));
                    this.pola[i].classList.add("slot-machine-reel");
                    this.pola[i].classList.remove("slot-machine-reel-end");
                }

                btnGraj.disabled = false;

                while (btnGraj.innerText != "GRAJ") {
                    this.status = "start";
                    this.spuszczenieDzwigni();
                    await sleep(400);
                    this.status = "end";
                }
            }
        } else {

            btnGraj.innerText = "GRAJ";
            btnGraj.classList.remove("btnActive");
            btnGraj.disabled = true;

            while (true) {
                if (this.status !== "end")  {
                    await sleep(10);
                    continue;
                }
                for (let i = 0 ; i < this.pola.length; i++) {
                    await sleep(400+i*100);
                    this.pola[i].classList.remove("slot-machine-reel");
                    this.pola[i].classList.remove("slot-machine-reel-start");

                    this.spuszczenieDzwigni(i);
                
                    this.pola[i].classList.add("slot-machine-reel-end");
                }

                btnGraj.disabled = false;

                if ((this.pola[0].innerHTML === this.pola[1].innerHTML) && (this.pola[1].innerHTML === this.pola[2].innerHTML)) {

                    console.log("duza wygrana");
                    this.punkty += this.bet*50;
                    pointsSpan.innerHTML = this.punkty;

                } else if ((this.pola[0].innerHTML === this.pola[1].innerHTML) || (this.pola[1].innerHTML === this.pola[2].innerHTML) || (this.pola[0].innerHTML === this.pola[2].innerHTML)){
                    console.log("mala wygrana");
                    this.punkty += this.bet*5;
                    pointsSpan.innerHTML = this.punkty;

                }
                break;
                
            }           
        }        
    }
}

let bandyta = new JednorekiBandyta();
btnGraj.addEventListener("click",  () => {
   bandyta.graj(); 
})
