import { Grille } from "./script.js"
import { Joueur } from "./script.js"

let joueur1 = new Joueur(1, "red");
let joueur2 = new Joueur(2, "yellow");

let P4 = new Grille(joueur1, joueur2);
