var categories = [
  {
    Name: "Country",
    Values: ["Canada", "Norway"],
  },
  {
    Name: "Test",
    Values: ["A", "B"],
  },
  {
    Name: "Test2",
    Values: ["word with space one", "word with space two"],
  },
];



//categories end
var starta = document.getElementById("startarea")
var showl = document.getElementById("showlife")
var showc = document.getElementById("showcont")
var btns = document.getElementById("startbtns");
var hman = document.getElementById("hang_man");
var cent = document.getElementById("center");
var check = document.getElementById("check")
var input = document.getElementById("input");
var game = document.getElementById("start");
var cont = document.getElementById("cont");
var key = document.getElementById("key");
var won = document.getElementById("won");
var num = document.getElementById("num")
var red = document.getElementById("red")
var wordlengt
var spaceid
var checked
var hangman
var word
var lost
var man
var spacenum = 0
var lives = 6
var i = 0;

//var end
check.onclick = function () {
  checked = document.querySelector('#check:checked') !== null;
  if (checked) {
    num.style.display = "flex"
  } else {
    num.style.display = "none"
  }
}
start();
function start() {
  man = 0
  for (let i = 0; i < categories.length; i++) {
    var btn = document.createElement("button");
    btns.appendChild(btn);
    btn.innerText = categories[i].Name;
    btn.setAttribute("id", i);
    btn.setAttribute("class", "btns");
    btn.onclick = function () {
      if (checked) {
        if (num.value >= 1) {
          lives = num.value
          clicked(this.id)
        } else {
          red.style.display = "flex"
        }
      } else {
        clicked(this.id)
        hangman = true
      }
    };
  }
}
function clicked(clicked_id) {
  starta.style.display = "none";
  game.style.display = "";
  getID(clicked_id);
}
function getID(clicked_id) {
  var cbtn = clicked_id;
  var cat = categories[cbtn].Values;
  var random = getRandomInt(cat.length);
  word = cat[random];
  var split = word.split("");
  split.forEach((list) => {
    if (list == " ") {
      var space = document.createElement("h1")
      space.setAttribute("class", "space");
      space.setAttribute("id", "id" + i);
      cont.appendChild(space);
      space.innerHTML = "---";
      spacenum++
    } else {
      var p = document.createElement("h1");
      p.setAttribute("class", "p");
      p.setAttribute("id", "id" + i);
      cont.appendChild(p);
      p.innerHTML = "";
    }
    i++;
  });
  keyboard();
  console.log(word);
}
function keyboard() {
  wordlengt = word.length - spacenum
  var hm = document.createElement("div")
  cent.appendChild(hm)
  showlives()
  for (let i = 65; i < 91; i++) {
    var ABC = document.createElement("button");
    key.appendChild(ABC);
    ABC.innerHTML = String.fromCharCode(i);
    ABC.onclick = function () {
      var letter = String.fromCharCode(i);
      key.childNodes[i - 65].style.background = "gray"
      let l = 0
      for (let j = 0; j < word.length; j++) {
        //if Correct letter
        if (letter == word.toUpperCase().charAt(j)) {
          var change = document.querySelector("#id" + j);
          change.innerHTML = letter;
          checkforwin();
          //if wrong letter
        } else {
          l++
          if (l == word.length) {
            lives = lives - 1
            showlives()
            if (hangman) {
              animation()
            }
            if (lives <= 0) {
              lost = true
              win(lost)
            }
          }
        }
      }
    };
  }
}
function showlives() {
  if (lives >= 50) {
    showl.innerText = "50 or more"
  } else {
    showl.innerText = lives
  }
}
function animation() {
  man++

}
function checkforwin() {
  var winnum = 0;
  for (let i = 0; i < word.length; i++) {
    var check = document.querySelector("#id" + i);
    if (check.innerText != "") {
      winnum = winnum + 1;
      if (winnum == word.length) {
        win();
      }
    }
  }
}
function win(lost) {

  won.style.display = "flex";
  key.style.display = "none";
  hman.style.display = "none";
  showc.innerHTML = "<button id=hide  onclick=location.reload()>Try again</button>"
  if (lost) {
    won.innerText = "GAME OVER"
    for (let i = 0; i < word.length; i++) {
      var red = document.querySelector("#id" + i);
      if (red.innerText == "") {
        red.style.color = "red"
        red.innerText = word[i].toUpperCase()
      }
    }
  }
}
//Keyboard end

//btn end
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}