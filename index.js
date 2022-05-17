let cards = [
  {
    char: "☢️", cover : "?"
  },
  {
    char: "☢️", cover : "?"
  },
  {
    char: "💎", cover : "?"
  },
  {
    char: "💎", cover : "?"
  },
  {
    char: "🏹", cover : "?"
  },
  {
    char: "🏹", cover : "?"
  },
  {
    char: "🍍", cover : "?"
  },
  {
    char: "🍍", cover : "?"
  },
  {
    char: "🍭", cover : "?"
  },
  {
    char: "🍭", cover : "?"
  },
  {
    char: "⚽️", cover : "?"
  },
  {
    char: "⚽️", cover : "?"
  },
  {
    char: "🍔", cover : "?"
  },
  {
    char: "🍔", cover : "?"
  },
  {
    char: "💡", cover : "?"
  },
  {
    char: "💡", cover : "?"
  },
  {
    char: "🎷", cover : "?"
  },
  {
    char: "🎷", cover : "?"
  },
  {
    char: "👒", cover : "?"
  },
  {
    char: "👒", cover : "?"
  },
  
];
let players = [{
  sucses : 0,
  name : "player 1",id:"p1"
  
},
{
  sucses : 0,
  name : "player 2",id:"p2"
}],pl = !!Math.round(Math.random()),s1 = false, s2 = false;
let firstPress = true,firstE = "",firstChoose = "",secondChoose = "",bothPiced = false,elementId = "",cardsFinished = [],sumPress = 0;
let board = document.getElementById("board");
let sounChoose = new Audio("mixkit-unlock-game-notification-253.wav")
let sounWin = new Audio("mixkit-video-game-win-2016.wav")
let sounLose = new Audio("67454__splashdust__negativebeep.wav")

document.getElementById("game-table").style.display="none"
document.getElementById("btnP2").addEventListener("click", start)

function start(){
  document.getElementById("game-table").style.display=""
  let pairs =Number(document.getElementById("h-p").value)
  players[0].name = document.getElementById("tp1").value
  players[1].name = document.getElementById("tp2").value
  document.getElementById("p1").innerText = `${players[0].name}: ${players[Number(pl)].sucses}`;
  document.getElementById("p2").innerText = `${players[1].name}: ${players[Number(pl)].sucses}`;
  document.getElementById("turn").innerText = `it's -${players[Number(pl)].name}- turn to play`;
  document.getElementById(players[Number(pl)].id).classList.add("h-t");
  bordConstructor(pairs);
  s2 = true;
  s1 = true;
  document.getElementById("btnP2").style.display="none";
  document.getElementById("tp1").style.display="none";
  document.getElementById("tp2").style.display="none";
  document.getElementById("h2").style.display="none";
  document.querySelector("h1").style.display="none";
  document.getElementById("h-p").style.display="none";
}

document.getElementById("btnExit").addEventListener("click",btnR)

function btnR(){
  document.getElementById("btnExit").innerText="restart game"  
  document.getElementById("board").remove();
  document.getElementById(players[Number(pl)].id).classList.remove("h-t");
  document.getElementById(players[Number(!pl)].id).classList.remove("h-t");
  cardsFinished = '';
  restartMishtanim();
  players[0].sucses=0
  players[1].sucses=0
  board = document.createElement("div");
  board.id = "board"
  document.getElementById("game-table").appendChild(board)
  start();
    
}



function shuflle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function selectCard(e) {
  if(cardsFinished.find(v =>v==e.target.innerText)){
    alert("STOP BEING ANNOYING!!!");
    return;
  }
  if (bothPiced) {
    alert("PLAY SLOWLY. picked two in a move");
    return;
  }
  flipCard(e);
  elementId = e.target.id;
   if (firstPress) {
     firstE = e.target.id;
    firstChoose = newCardArray[e.target.id].char;
    firstPress = false;
    sumPress++;
  }
  else if (firstE == elementId) {
    alert("Already selected! Please select another card.");
  }
  else if (!firstPress && !bothPiced) {
    secondChoose = newCardArray[e.target.id].char;
    bothPiced = true;
    sumPress++;
    gamePlay();
  }
}

function gamePlay() {
  if (bothPiced) {
    if (firstChoose == secondChoose) {
      cardsFinished.push(firstChoose, secondChoose);
      firstPress = true;
      bothPiced = false;
      players[Number(pl)].sucses++
      if (cardsFinished.length < newCardArray.length){
      sounChoose.play();  
      document.getElementById("turn").innerText = `👏👏 wow ${players[Number(pl)].name}!!!`;
      setTimeout(() => {
      document.getElementById("turn").innerText = `${players[Number(pl)].name}, Play another move`;}, 900)
      } 
      else{
        //sounChoose.play();
        sounWin.play();
        debugger;
        if(!pl){pl = !pl}
          if (players[Number(pl)].sucses > players[Number(pl)-1].sucses){
            document.getElementById("turn").innerText = `🎊 🎉${players[Number(pl)].name} win the game! well done!!!🎊 🎉`;
          }
          else if(players[Number(pl)].sucses < players[Number(pl)-1].sucses){
            document.getElementById("turn").innerText = `🎊 🎉${players[Number(!pl)].name} win the game! well done!!!🎊 🎉`;
          }
          else{
            document.getElementById("turn").innerText = `${players[Number(pl)-1].name} and ${players[Number(pl)].name} you got TEKO, play again!----->`; 
            return; 
          }
          setTimeout(() => {
            document.getElementById("board").style.display="none";;
            document.getElementById("turn").innerText = `Want to play again? press here ------>`           
            document.getElementById("btnExit").innerText="play again"        
            document.getElementById(players[Number(pl)].id).classList.remove("h-t");
            document.getElementById(players[Number(!pl)].id).classList.remove("h-t");
          },3000)
        }
    } 
    else if (cardsFinished.length != newCardArray.length) {
      pl =!pl;
      sounLose.play();
      document.getElementById("turn").innerText = `next time 🤢`;
      setTimeout(() => {
        document.getElementById(firstE).style.transform = ""//classList.add("hidden");
        document.getElementById(elementId).style.transform = ""
        setTimeout(() => {document.getElementById(firstE).innerText = "🎲"
        document.getElementById(elementId).innerText = "🎲"},150);
        bothPiced = false;
        firstPress = true;
        document.getElementById("turn").innerText = `now it's -${players[Number(pl)].name}- turn to play`;
        document.getElementById(players[Number(!pl)].id).classList.remove("h-t");
        document.getElementById(players[Number(pl)].id).classList.add("h-t");
        
      }, 900);
    }
  }
  document.getElementById("p1").innerText = `${players[0].name}: ${players[0].sucses}`;
  document.getElementById("p2").innerText = `${players[1].name}: ${players[1].sucses}`;
  
}

function createCard(index) {
  let newCard = document.createElement("div");
  newCard.innerText = "🎲" //newCardArray[index].char;
  newCard.id = index;
  newCard.className = "cards";
  //newCard.classList.add("hidden");
  newCard.addEventListener("click", (e) => {
    selectCard(e);
  });
  board.appendChild(newCard);
}

function checkTwoClick() {}

function flipCard(event) {
  event.target.style.transform = "rotateY(180deg)"
  setTimeout(() => {
  event.target.innerText = newCardArray[event.target.id].char;},150)
  
  //event.target.classList.remove("hidden");
}

function restartMishtanim(){
  firstPress = true,firstE = "",firstChoose = "",secondChoose = "",bothPiced = false,elementId = "",cardsFinished = [],sumPress = 0,board="",pl=!!Math.round(Math.random());
}
let f = ""
function bordConstructor(pairs){
  f = "1fr"
  let z = pairs * 2;
  if (pairs>6){
    pairs = 4;
  }
  for(i=0;i<pairs-1;i++){
     f+=" 1fr"
  }
  document.getElementById("board").style.gridTemplateColumns = f;
  newCardArray = cards.slice(0,z)
  shuflle(newCardArray);
  for (i in newCardArray) {
    createCard(i);
  }
}



