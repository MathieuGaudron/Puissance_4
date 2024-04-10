export class Grille {
    constructor(joueur1, joueur2) {
        this.joueur1 = joueur1;
        this.joueur2 = joueur2;
        this.currentPlayer = joueur1;
        this.createGrille();
        this.gameFin = false;
        this.buttonRelancer();
    }

    createGrille() {
        let x = prompt("Choisis le nombre de colonnes");
        let y = prompt("Choisis le nombre de lignes");

        let grille = document.createElement("TABLE");
        document.body.appendChild(grille);
        grille.style.backgroundColor = "blue";
        grille.style.margin = "auto";
        this.grille = grille;

        for (let i = 0; i < y; i++) {
            let tr = document.createElement("tr");
            tr.style.backgroundColor = "blue";
            grille.appendChild(tr);

            for (let j = 0; j < x; j++) {
                let td = document.createElement("td");
                td.style.display = "inline-block";
                td.style.border = "1px solid black";
                td.style.width = "5em";
                td.style.height = "5em";
                td.style.backgroundColor = "white";
                td.style.borderRadius = "50%";
                td.style.margin = "0.3em";
                td.style.cursor = "pointer";
                tr.appendChild(td);

                td.addEventListener("click", () => this.game(td));
            }
        }

        this.currentPlayerTour();
    }

    game(td) {
        if (this.gameFin) return;

        let colonne = td.cellIndex;
        let currentColor = this.currentPlayer.color;

        let cells = [];
        for (let i = this.grille.rows.length - 1; i >= 0; i--) {
            let td = this.grille.rows[i].cells[colonne];
            cells.push(td);

            if (td.style.backgroundColor === "white") {
                td.style.backgroundColor = this.currentPlayer.color;
                td.animate([
                    {transform: 'translateY(-400px)'},
                    {transform: 'translateY(0px)'}
                ],{
                    duration:500,
                    iterations:1
                });
                if (this.vertical(cells, currentColor) || this.horizontal(this.grille.rows[i].cells, currentColor) || this.diagonalGauche(this.grille.rows, currentColor) || this.diagonaleDroite(this.grille.rows, currentColor)) {
                    alert(`Le joueur ${this.currentPlayer.id} a gagné !`);
                    this.gameFin = true;
                    this.desactiveGame();
                } else {
                    this.switchPlayer();
                    this.currentPlayerTour();
                }
                break;
            }
        }

        if (!this.gameFin && this.egalite()) {
            alert("Match nul !");
            this.gameFin = true;
            this.desactiveGame();
        }
    }

    buttonRelancer() {
        let buttonRelancer = document.createElement("button");
        buttonRelancer.textContent = "Relançez une partie";
        buttonRelancer.style.backgroundColor = "black"
        buttonRelancer.style.color = "white"
        buttonRelancer.style.cursor = "pointer";
        buttonRelancer.style.borderRadius = "1em"
        buttonRelancer.addEventListener("click", () => this.rejouer());
        document.body.appendChild(buttonRelancer);
    }

    rejouer() {
        this.gameFin = false;
        this.currentPlayer = this.joueur1; 
        this.grille.parentNode.removeChild(this.grille); 
        this.createGrille(); 
    }
    

    desactiveGame() {
        for (let i = 0; i < this.grille.rows.length; i++) {
            for (let j = 0; j < this.grille.rows[i].cells.length; j++) {
                this.grille.rows[i].cells[j].removeEventListener("click", () => this.game(this.grille.rows[i].cells[j]));
            }
        }
    }


    vertical(cells, currentColor) {
        for (let i = 0; i <= cells.length - 4; i++) {
            let cellsConsecutive = 0;
            for (let j = i; j < i + 4; j++) {
                if (cells[j].style.backgroundColor === currentColor) {
                    cellsConsecutive++;
                } else {
                    cellsConsecutive = 0;
                }
            }
            if (cellsConsecutive === 4) {
                return true;
            }
        }
        return false;
    }

    horizontal(cells, currentColor) {
        let cellsConsecutive = 0;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].style.backgroundColor === currentColor) {
                cellsConsecutive++;
            } else {
                cellsConsecutive = 0;
            }
            if (cellsConsecutive === 4) {
                return true;
            }
        }
        return false;
    }

    diagonalGauche(cells, currentColor) {
        for (let i = 0; i < cells.length - 3; i++) {
            for (let j = 0; j < cells[i].cells.length - 3; j++) {
                let cellsConsecutive = 0;
                for (let k = 0; k < 4; k++) {
                    if (cells[i + k].cells[j + k].style.backgroundColor === currentColor) {
                        cellsConsecutive++;
                    } else {
                        cellsConsecutive = 0;
                        break;
                    }
                }
                if (cellsConsecutive === 4) {
                    return true;
                }
            }
        }
        return false;
    }

    diagonaleDroite(cells, currentColor) {
        for (let i = 0; i < cells.length - 3; i++) {
            for (let j = 3; j < cells[i].cells.length; j++) {
                let cellsConsecutive = 0;
                for (let k = 0; k < 4; k++) {
                    if (cells[i + k].cells[j - k].style.backgroundColor === currentColor) {
                        cellsConsecutive++;
                    } else {
                        cellsConsecutive = 0;
                        break;
                    }
                }
                if (cellsConsecutive === 4) {
                    return true;
                }
            }
        }
        return false;
    }


    egalite() {
        for (let i = 0; i < this.grille.rows.length; i++) {
            for (let j = 0; j < this.grille.rows[i].cells.length; j++) {
                let cell = this.grille.rows[i].cells[j];
                if (cell.style.backgroundColor === "white") {
                    return false;
                }
            }
        }
        return true;
    }


    switchPlayer() {
        if (this.currentPlayer === this.joueur1) {
            this.currentPlayer = this.joueur2;
        } else {
            this.currentPlayer = this.joueur1;
        }
    }

    currentPlayerTour() {
        let currentPlayerText = document.getElementById("currentPlayer");
        if (!currentPlayerText) {
            currentPlayerText = document.createElement("div");
            currentPlayerText.id = "currentPlayer";
            currentPlayerText.style.color = "black";
            currentPlayerText.style.fontWeight = "bold";
            document.body.appendChild(currentPlayerText);
        }
        currentPlayerText.innerText = `Joueur en cours : ${this.currentPlayer.id}`;
    }
}

export class Joueur {
    constructor(id, color) {
        this.id = id;
        this.color = color;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // let joueur1 = new Joueur(1, "red");
    // let joueur2 = new Joueur(2, "yellow");
    // let P4 = new Grille(joueur1, joueur2);
});
