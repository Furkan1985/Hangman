class hangman{
    constructor(){
        // this.word = "Sauerstoffflasche";
        // this.versuche = 0;
        this.word = this.getWord();
        this.gamer = [];
        this.actualGamer = 0;
        this.end = false;
        this.splitChars();
    }

    config() {
      
        document.getElementById("configure").style.display = "none";
        document.getElementById("setup").style.visibility = "visible"; 
               
        let playerJson = localStorage.getItem("playerList");
        if(playerJson){
            this.gamer = JSON.parse(playerJson); 
            this.renderConfig(); 
        } 
    }

    addGamer(gamer) {
        this.gamer.push(gamer);
    }
    newPlayer(event) {
       // debugger;
        event.preventDefault()
     let name = document.getElementById("name").value;
     if (name == ""){
        alert("pls enter name");
        return;
     }
     let gamer = new Charackter(name);
    this.addGamer(gamer);
    this.renderConfig();
    }
    start(){
        // debugger;
        if(this.gamer.length <= 0){
            alert("PLS ENTER A USERNAME")
            return;
        }
        localStorage.setItem("playerList",JSON.stringify(this.gamer))
        document.getElementById("setup").style.visibility = "hidden";
        document.getElementById("game").style.display = "block";
        this.actualGamer = this.randomPlayer();
        this.renderWord();
    }
    renderConfig(){
        document.getElementById("playerList").innerHTML = "";
        for(let i = 0; i<this.gamer.length;i++){
            let listElement = document.createElement("li");
            listElement.innerHTML = this.gamer[i].name
            let delElement = document.createElement("button");
            delElement.innerText = "X";
            delElement.addEventListener("click", (event) => game.removePlayer(event));
            delElement.setAttribute("data-index",i);
            listElement.appendChild(delElement);
            document.getElementById("playerList").appendChild(listElement);
        }
    }
    removePlayer(event){
       // debugger;
      let index = event.target.getAttribute("data-index")
      let gamer = this.gamer;
      this.gamer = [];
      for(let i = 0; i<gamer.length;i++){
        if(i != index) {
            this.gamer.push(gamer[i]);
        }
      }
      this.renderConfig();
    }
    nextGamer() {
        this.getPlayer().versuche++;
        this.actualGamer++;
        if(this.actualGamer >= this.gamer.length) {
            this.actualGamer = 0;
        }
    }
    splitChars(){
        this.chars = []; 
        for(let i = 0; i<this.word.length;i++){
           this.chars.push({
                char: this.word[i],
                show: false
            });
        }
    }
    restart(){
     //   debugger;
     this.end = false;

        let gamers = this.gamer
        this.gamer = []
        for(let i = 0; i<gamers.length;i++){
            let gamer = new Charackter(gamers[i].name);

                this.gamer.push(gamer);
        }    
        this.word = this.getWord();
        this.splitChars();

        this.renderWord();
    }

    checkEnd(){
        this.end = true;
        for(let i = 0;i<this.chars.length;i++){
            if(this.chars[i].show == false) {
                this.end = false;
            }
        }
    }
    save(event){
        //debugger;
        event.preventDefault()
            let a = document.getElementById('Input').value;
            document.getElementById('Input').value = ""
            let versuchzaeler = true;
            for(let i = 0;i<this.chars.length;i++){
                if(this.chars[i].char.toLowerCase() == a.toLowerCase()) {
                    this.chars[i].show =true;
                    versuchzaeler = false;
                }
            }
            if(versuchzaeler) {
                this.versuche++;
                this.nextGamer();
            }
            else{
                this.checkEnd();
            }
            this.renderWord();
        }
        getPlayer() {
            let gamer = this.gamer[this.actualGamer];
            return gamer;
        }
        
    renderWord(){
        document.querySelector("#search").innerHTML="";
        for(let i = 0; i<this.chars.length;i++){
           let char = document.createElement("span");
           if(this.chars[i].show) {
            char.innerText = this.chars[i].char;
           }
           else{
            char.innerHTML = "&nbsp;";
           }
           document.querySelector("#search").appendChild(char);
           if(this.gamer.length) {
                document.querySelector("#versuche").innerText = this.getPlayer().versuche;
                document.querySelector("#player").innerText = this.getPlayer().name;         
           }

           if(this.end){
            document.getElementById("Paul").style.visibility = "hidden";
            document.getElementById("end").style.visibility = "visible";
            document.getElementById("winner").innerHTML = this.getPlayer().name;
           }
           else{
            document.getElementById("Paul").style.visibility = "visible";
            document.getElementById("end").style.visibility = "hidden";
            document.getElementById("winner").innerHTML = this.getPlayer().name;
           }
        }
    }
    getWord(){
        let words = [
            "Apfel",
            "Baum",
            "Computer",
            "Delfin",
            "Elefant",
            "Freude",
            "Garten",
            "Haus",
            "Idee",
            "Jacke",
            "Kaffee",
            "Lampe",
            "Maus",
            "Nacht",
            "Orange",
            "Pizza",
            "Quelle",
            "Regen",
            "Sonne",
            "Tisch",
            "Uhr",
            "Vogel",
            "Wasser",
            "Xylophon",
            "Yoga",
            "Zebra",
            "Ananas",
            "Banane",
            "Chamäleon",
            "Drache",
            "Eule",
            "Fisch",
            "Giraffe",
            "Hase",
            "Insel",
            "Jackfruit",
            "Kaktus",
            "Löwe",
            "Mond",
            "Nudeln",
            "Ozean",
            "Paprika",
            "Qualle",
            "Regenbogen",
            "Sonnenblume",
            "Tiger",
            "Uhu",
            "Vulkan",
            "Wal",
            "Zitrone",
        ];
        let RandomNumber = Math.floor(Math.random() * words.length)  
        let Word = words[RandomNumber];
        return Word;
    }
    randomPlayer(){
        let RandomGamer = Math.floor(Math.random() * this.gamer.length)  
        return RandomGamer;
    }
}
class Charackter{
    constructor(name){
        // this.word = "Sauerstoffflasche";
        this.name = name;
        this.versuche = 0;
    }
}


let game = new hangman();
/*
let gamer = new Charackter("Furkan");
game.addGamer(gamer);
let gamer2 = new Charackter("Frank");
game.addGamer(gamer2);
game.play(); */
