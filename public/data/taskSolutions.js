
/*A feladatmegoldások taskId alapján nézi a program.*/
/*Ezeket a lessonData.js-ben megadott data-task-id értékekhez kell nézni.*/

window.TASK_SOLUTIONS = {

  /*1. lecke*/
  "1-1": `console.log("Hello World!");`,


  /*2. lecke*/
  "2-1": `let nev = "Réka";
let kor = 25;
let diak = true;

console.log(nev);
console.log(kor);
console.log(diak);`,


  /*3. lecke*/
  "3-1": `let kor = 18;

if (kor >= 18) {
    console.log("Nagykorú");
} else {
    console.log("Kiskorú");
}`,

  "3-2": `for (let i = 0; i < 5; i++) {
    console.log(i);
}`,


  /*4. lecke*/
  "4-1": `function koszont() {
    console.log("Szia!");
}

koszont();`,

  "4-2": `function hello(nev) {
    console.log("Szia " + nev + "!");
}

hello("Réka");`,


  /*5. lecke*/
  "5-1": `let szamok = [1, 2, 3, 4];
console.log(szamok[0]);
console.log("Hossz:", szamok.length);`,


  /*6. lecke*/
  "6-1": `let a = 10;
let b = 2;
console.log(a + b);`,

"6-2": `let a = 10;
let b = 2;
console.log(a - b);`,

"6-3": `let a = 10;
let b = 2;
console.log(a * b);`,

"6-4": `let a = 10;
let b = 2;
console.log(a / b);`,



  /*7. lecke*/
  "7-1": `document.getElementById("cim").innerText = "Új cím!";`,


  /*8. lecke*/
  "8-1": `document.getElementById("gomb").onclick = function() {
    alert("Siker!");
}`,


  /*9. lecke*/
  "9-1": `fetch("https://api.example.com").then(res => res.json()).then(data => console.log(data));`,


  /*10. lecke*/
  "10-1": `console.log("Kész a tanfolyam!");`
};