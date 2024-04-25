let arrow_keys_handler = function (e) {
  switch (e.code) {
    case "ArrowUp":
    case "ArrowDown":
    case "ArrowLeft":
    case "ArrowRight":
    case "Space":
      e.preventDefault();
      break;
    default:
      break; // do not block other keys
  }
};
window.addEventListener("keydown", arrow_keys_handler, false);

generalWidth = visualViewport.width;

let charDirection = [];

/* Définition chrono */
let timeRemaining = 120;
const minutes = Math.floor(timeRemaining / 60)
  .toString()
  .padStart(2, "0");
const seconds = (timeRemaining % 60).toString().padStart(2, "0");

const timeRemainingContainer = document.getElementById("timeRemaining");
timeRemainingContainer.innerText = `${minutes}:${seconds}`;

/* Définition variable jeu */
const transitionScreen = document.querySelector("#transition");
const etat = document.querySelector(".etat");
const messageUn = document.querySelector(".msg1");
const messageDeux = document.querySelector(".msg2");
const cadre = document.querySelector("#gameFrame");
let lifePoint = 10;
const contLP = document.querySelector("#life");
contLP.textContent = lifePoint;
let immute = "";
let save = "";
let look = "right";
let villageSaved = 0;
const contVS = document.querySelector("#vilsav");
contVS.textContent = `${villageSaved}/6`;

/*définiton persoMoi*/
const persoMoi = {
  el: document.querySelector("#moi"),
  x: 0,
  sizeX: generalWidth * 0.03,
  sizeY: generalWidth * 0.045,
  moveStep: generalWidth * 0.01,
};
persoMoi.el.style.width = persoMoi.sizeX + "px";
persoMoi.el.style.height = persoMoi.sizeY + "px";

/*définition plateformes*/
const platforms = [];
const platformEl = document.querySelectorAll(".bloque");
platformEl.forEach((pl) => {
  platforms.push({ pl });
});

const sizeAndPositionPt = [
  { width: generalWidth * 1.2, height: generalWidth * 0.1, bottom: 0, left: 0 },
  //1
  {
    width: generalWidth * 0.6,
    height: generalWidth * 0.015,
    bottom: generalWidth * 0.16,
    left: generalWidth * 0.18,
  },
  //2
  {
    width: generalWidth * 0.3,
    height: generalWidth * 0.015,
    bottom: generalWidth * 0.26,
    left: generalWidth * 0.04,
  },
  //3
  {
    width: generalWidth * 0.3,
    height: generalWidth * 0.015,
    bottom: generalWidth * 0.26,
    left: generalWidth * 0.44,
  },
  //4
  {
    width: generalWidth * 0.05,
    height: generalWidth * 0.015,
    bottom: generalWidth * 0.36,
    left: generalWidth * 0.04,
  },
  //5
  {
    width: generalWidth * 0.05,
    height: generalWidth * 0.015,
    bottom: generalWidth * 0.43,
    left: generalWidth * 0.14,
  },
  //6
  {
    width: generalWidth * 0.2,
    height: generalWidth * 0.015,
    bottom: generalWidth * 0.42,
    left: generalWidth * 0.27,
  },
  //7
  {
    width: generalWidth * 0.12,
    height: generalWidth * 0.015,
    bottom: generalWidth * 0.42,
    left: generalWidth * 0.51,
  },
  //8
  {
    width: generalWidth * 0.08,
    height: generalWidth * 0.015,
    bottom: generalWidth * 0.34,
    left: generalWidth * 1.1,
  },
  //9
  {
    width: generalWidth * 0.16,
    height: generalWidth * 0.015,
    bottom: generalWidth * 0.25,
    left: generalWidth * 1.25,
  },
  //10
  {
    width: generalWidth * 0.24,
    height: generalWidth * 0.015,
    bottom: generalWidth * 0.42,
    left: generalWidth * 0.8,
  },
  //11
  {
    width: generalWidth * 0.55,
    height: generalWidth * 0.1,
    bottom: generalWidth * 0,
    left: generalWidth * 1.48,
  },
  //12
  {
    width: generalWidth * 0.34,
    height: generalWidth * 0.015,
    bottom: generalWidth * 0.16,
    left: generalWidth * 1.6,
  },
  //13
  {
    width: generalWidth * 0.2,
    height: generalWidth * 0.015,
    bottom: generalWidth * 0.24,
    left: generalWidth * 1.83,
  },
  //14
  {
    width: generalWidth * 0.17,
    height: generalWidth * 0.015,
    bottom: generalWidth * 0.32,
    left: generalWidth * 1.86,
  },
  //15
  {
    width: generalWidth * 0.008,
    height: generalWidth * 0.07,
    bottom: generalWidth * 0.23,
    left: generalWidth * 1.6,
  },
  //16
  {
    width: generalWidth * 0.008,
    height: generalWidth * 0.07,
    bottom: generalWidth * 0.3,
    left: generalWidth * 1.7,
  },
  //17
  {
    width: generalWidth * 0.008,
    height: generalWidth * 0.07,
    bottom: generalWidth * 0.38,
    left: generalWidth * 1.6,
  },
  //18
  {
    width: generalWidth * 0.008,
    height: generalWidth * 0.07,
    bottom: generalWidth * 0.45,
    left: generalWidth * 1.7,
  },
  //19
  {
    width: generalWidth * 0.02,
    height: generalWidth * 0.015,
    bottom: generalWidth * 0.48,
    left: generalWidth * 1.5,
  },
  //20
  {
    width: generalWidth * 0.02,
    height: generalWidth * 0.015,
    bottom: generalWidth * 0.07,
    left: generalWidth * 1.2,
  },
  //21
  {
    width: generalWidth * 0.18,
    height: generalWidth * 0.3,
    bottom: generalWidth * 0.1,
    left: generalWidth * 0.85,
  },
  //22
  {
    width: generalWidth * 0.02,
    height: generalWidth * 0.015,
    bottom: generalWidth * 0.24,
    left: generalWidth * 1.607,
  },
  //23
  {
    width: generalWidth * 0.02,
    height: generalWidth * 0.015,
    bottom: generalWidth * 0.31,
    left: generalWidth * 1.682,
  },
  //24
  {
    width: generalWidth * 0.02,
    height: generalWidth * 0.015,
    bottom: generalWidth * 0.39,
    left: generalWidth * 1.607,
  },
  //25
  {
    width: generalWidth * 0.02,
    height: generalWidth * 0.015,
    bottom: generalWidth * 0.46,
    left: generalWidth * 1.682,
  },
  //26
  {
    width: generalWidth * 0.02,
    height: generalWidth * 0.015,
    bottom: generalWidth * 0.45,
    left: generalWidth * 1.595,
  },
  //27
  {
    width: generalWidth * 0.01,
    height: generalWidth * 0.015,
    bottom: generalWidth * 0.07,
    left: generalWidth * 1.35,
  },
  //28
  {
    width: generalWidth * 0.2,
    height: generalWidth * 0.015,
    bottom: generalWidth * 0.42,
    left: generalWidth * 0.8,
  },
  //29
];
for (let i = 0; i < platforms.length; i++) {
  platforms[i].pl.style.width = sizeAndPositionPt[i].width + "px";
  platforms[i].pl.style.height = sizeAndPositionPt[i].height + "px";
  platforms[i].pl.style.bottom = sizeAndPositionPt[i].bottom + "px";
  platforms[i].pl.style.left = sizeAndPositionPt[i].left + "px";
  //console.log(platforms[i]);
  //console.log(sizeAndPosition[i]);
}

/* Définition monstres*/

const monsters = [];
const msts = document.querySelectorAll(".monster");
msts.forEach((mt) => {
  monsters.push({ mt });
});

const sizeAndPositionMt = [
  {
    width: generalWidth * 0.03,
    height: generalWidth * 0.03,
    bottom: generalWidth * 0.168,
    left: generalWidth * 0.32,
  },
  //1
  {
    width: generalWidth * 0.03,
    height: generalWidth * 0.03,
    bottom: generalWidth * 0.268,
    left: generalWidth * 0.46,
  },
  //2
  {
    width: generalWidth * 0.048,
    height: generalWidth * 0.01,
    bottom: generalWidth * 0.35,
    left: generalWidth * 0.041,
  },
  //3
  {
    width: generalWidth * 0.048,
    height: generalWidth * 0.01,
    bottom: generalWidth * 0.42,
    left: generalWidth * 0.141,
  },
  //4
  {
    width: generalWidth * 0.03,
    height: generalWidth * 0.03,
    bottom: generalWidth * 0.37,
    left: generalWidth * 0.95,
  },
  //5
  {
    width: generalWidth * 0.008,
    height: generalWidth * 0.28,
    bottom: generalWidth * 0.19,
    left: generalWidth * 1.76,
  },
  //6
  {
    width: generalWidth * 0.14,
    height: generalWidth * 0.01,
    bottom: generalWidth * 0.31,
    left: generalWidth * 1.87,
  },
  //7
  {
    width: generalWidth * 0.03,
    height: generalWidth * 0.03,
    bottom: generalWidth * 0.29,
    left: generalWidth * 1.2,
  },
  //8
  {
    width: generalWidth * 0.05,
    height: generalWidth * 0.01,
    bottom: generalWidth * 0.1,
    left: generalWidth * 1.53,
  },
  //9
  {
    width: generalWidth * 0.03,
    height: generalWidth * 0.03,
    bottom: generalWidth * 0.43,
    left: generalWidth * 0.93,
  },
  //10
];
for (let i = 0; i < monsters.length; i++) {
  monsters[i].mt.style.width = sizeAndPositionMt[i].width + "px";
  monsters[i].mt.style.height = sizeAndPositionMt[i].height + "px";
  monsters[i].mt.style.bottom = sizeAndPositionMt[i].bottom + "px";
  monsters[i].mt.style.left = sizeAndPositionMt[i].left + "px";
}

/* Définition foods */

const foods = [];
const itemFood = document.querySelectorAll(".food");
itemFood.forEach((fd) => {
  foods.push({ fd });
});

const sizeAndPositionFd = [
  {
    width: generalWidth * 0.02,
    height: generalWidth * 0.02,
    bottom: generalWidth * 0.112,
    left: generalWidth * 0.65,
  },
  {
    width: generalWidth * 0.02,
    height: generalWidth * 0.02,
    bottom: generalWidth * 0.28,
    left: generalWidth * 0.05,
  },
  {
    width: generalWidth * 0.02,
    height: generalWidth * 0.02,
    bottom: generalWidth * 0.1,
    left: generalWidth * 1.5,
  },
  {
    width: generalWidth * 0.02,
    height: generalWidth * 0.02,
    bottom: generalWidth * 0.3,
    left: generalWidth * 1.63,
  },
];
for (let i = 0; i < foods.length; i++) {
  foods[i].fd.style.width = sizeAndPositionFd[i].width + "px";
  foods[i].fd.style.height = sizeAndPositionFd[i].height + "px";
  foods[i].fd.style.bottom = sizeAndPositionFd[i].bottom + "px";
  foods[i].fd.style.left = sizeAndPositionFd[i].left + "px";
}

/* Définition village */

const villages = [];
const villageHab = document.querySelectorAll(".village");
villageHab.forEach((vl) => {
  villages.push({ vl });
});
const sizeAndPositionVl = [
  {
    width: generalWidth * 0.035,
    height: generalWidth * 0.045,
    bottom: generalWidth * 0.44,
    left: generalWidth * 0.15,
  },
  {
    width: generalWidth * 0.035,
    height: generalWidth * 0.045,
    bottom: generalWidth * 0.17,
    left: generalWidth * 0.7,
  },
  {
    width: generalWidth * 0.035,
    height: generalWidth * 0.045,
    bottom: generalWidth * 0.1,
    left: generalWidth * 0.81,
  },
  {
    width: generalWidth * 0.035,
    height: generalWidth * 0.045,
    bottom: generalWidth * 0.43,
    left: generalWidth * 1,
  },
  {
    width: generalWidth * 0.035,
    height: generalWidth * 0.045,
    bottom: generalWidth * 0.17,
    left: generalWidth * 1.9,
  },
  {
    width: generalWidth * 0.035,
    height: generalWidth * 0.045,
    bottom: generalWidth * 0.33,
    left: generalWidth * 1.95,
  },
];
for (let i = 0; i < villages.length; i++) {
  villages[i].vl.style.width = sizeAndPositionVl[i].width + "px";
  villages[i].vl.style.height = sizeAndPositionVl[i].height + "px";
  villages[i].vl.style.bottom = sizeAndPositionVl[i].bottom + "px";
  villages[i].vl.style.left = sizeAndPositionVl[i].left + "px";
}

/*Définitions déco*/

const decorations = [];
const deco = document.querySelectorAll(".deco");
deco.forEach((dc) => {
  decorations.push({ dc });
});
const sizeAndPositionDc = [
  {
    width: generalWidth * 0.31,
    //height: generalWidth * 0.015,
    bottom: generalWidth * 0.08,
    left: generalWidth * 0.79,
  },
];
for (let i = 0; i < decorations.length; i++) {
  decorations[i].dc.style.width = sizeAndPositionDc[i].width + "px";
  //decorations[i].dc.style.height = sizeAndPositionDc[i].height + "px";
  decorations[i].dc.style.bottom = sizeAndPositionDc[i].bottom + "px";
  decorations[i].dc.style.left = sizeAndPositionDc[i].left + "px";
}

/* Bouton start*/

const btnStart = document.querySelector("#startGame");

btnStart.addEventListener("click", (event) => {
  cadre.classList.remove("hidden");
  transitionScreen.classList.add("hidden");
  game(persoMoi);
  /* window.scrollBy({
    behavior: "linear",
    left: 0,
  });*/

  console.log(villages);
  //console.log("btnstart");
});
let counter = 10;
let y = generalWidth * 0.2;
let x = generalWidth * 0.1;
persoMoi.el.style.left = x + "px";
persoMoi.el.style.bottom = y + "px";

/* Fonction Game Start */

function game(persoMoi) {
  Reset();

  /* timer */
  let timer = setInterval(() => {
    timeRemaining--;
    timeRemainingContainer.textContent = `${Math.floor(timeRemaining / 60)
      .toString()
      .padStart(2, "0")}:${(timeRemaining % 60).toString().padStart(2, "0")}`;
    if (timeRemaining <= 0) {
      clearInterval(timer);
      showResults();
    }
  }, 1000);
  function motion() {
    move = setInterval(() => {
      console.log(lifePoint);
      const colliding = isItColliding(platforms);
      //console.log(colliding, "===");
      if (!charDirection.includes("jump") && !colliding.includes("bottom")) {
        y -= persoMoi.moveStep;
        persoMoi.el.style.bottom = y + "px";
      }
      if (charDirection.includes("left") && !colliding.includes("left")) {
        x -= persoMoi.moveStep;
        persoMoi.el.style.left = x + "px";
      }
      if (charDirection.includes("right") && !colliding.includes("right")) {
        x += persoMoi.moveStep;
        persoMoi.el.style.left = x + "px";
      }
      if (charDirection.includes("jump")) {
        if (counter > 0 && !colliding.includes("top")) {
          --counter;
          y += persoMoi.moveStep;
          persoMoi.el.style.bottom = y + "px";
          //console.log("etape1");
          //console.log(counter);
        } /*else if (counter >= 2) {
          counter -= 1;
          console.log("etape2");
        } else if (counter === 0) {
          charDirection.splice(charDirection.indexOf("jump"), 1);
          console.log("etape3");
        }*/ else {
          setTimeout(() => {
            charDirection.splice(charDirection.indexOf("jump"), 1);
            persoMoi.el.classList.remove("jumpD");
            persoMoi.el.classList.remove("jumpG");
            if (look === "right") {
              persoMoi.el.classList.add("still");
            }
            if (look === "left") {
              persoMoi.el.classList.add("stillG");
            }
            //console.log("time out", counter);
          }, 100);
        }
      }
      isItHurting(monsters);
      isItHealing(foods);
      isItSaving(villages);
      endGame();
    }, 30);
  }

  document.addEventListener("keydown", (e) => {
    const colliding = isItColliding(platforms);
    if (charDirection.includes("left")) {
      charDirection.splice(charDirection.indexOf("left"), 1);
    }
    if (charDirection.includes("right")) {
      charDirection.splice(charDirection.indexOf("right"), 1);
    }
    switch (e.key) {
      case "ArrowLeft":
        charDirection.push("left");
        persoMoi.el.classList.remove("still");
        persoMoi.el.classList.remove("stillG");
        persoMoi.el.classList.remove("jumpD");
        persoMoi.el.classList.remove("jumpG");
        persoMoi.el.classList.add("runG");
        look = "left";
        //console.log("left hello");
        //motion(charDirection);

        break;
      case "ArrowRight":
        charDirection.push("right");
        persoMoi.el.classList.remove("stillG");
        persoMoi.el.classList.remove("still");
        persoMoi.el.classList.remove("jumpD");
        persoMoi.el.classList.remove("jumpG");
        persoMoi.el.classList.add("runR");
        look = "right";
        //console.log("right hello");
        //motion(charDirection);

        break;
      case " ":
        if (!charDirection.includes("jump") && colliding.includes("bottom")) {
          charDirection.push("jump");
          counter = 10;
        }
        if (look === "right") {
          persoMoi.el.classList.remove("still");
          persoMoi.el.classList.remove("stillG");
          persoMoi.el.classList.remove("runG");
          persoMoi.el.classList.remove("runD");
          persoMoi.el.classList.add("jumpD");
        }
        if (look === "left") {
          persoMoi.el.classList.remove("still");
          persoMoi.el.classList.remove("stillG");
          persoMoi.el.classList.remove("runG");
          persoMoi.el.classList.remove("runD");
          persoMoi.el.classList.add("jumpG");
        }
        //console.log("jump hello");
        //motion(charDirection);
        break;
      case "Shift":
        let possible = "no";
        for (let i = 0; i < villages.length; i++) {
          let save = isItSaving(villages);
          console.log(save);
          if (
            save[0] === "yes you can" &&
            !villages[save[1]].vl.classList.contains("hidden")
          ) {
            villages[save[1]].vl.classList.add("hidden");
            possible = "yes";
            villageSaved++;
            contVS.textContent = `${villageSaved}/6`;
          }
          if (possible === "yes") {
            save = "no sorry";
          }
          return villageSaved;
        }
        break;
    }
  });
  document.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "ArrowLeft":
        charDirection.splice(charDirection.indexOf("left"), 1);
        persoMoi.el.classList.remove("runG");
        persoMoi.el.classList.add("stillG");
        //console.log("left bye");
        break;
      case "ArrowRight":
        charDirection.splice(charDirection.indexOf("right"), 1);
        persoMoi.el.classList.remove("runR");
        persoMoi.el.classList.add("still");
        //console.log("right bye");
        break;
      case " ":
        //clearInterval(move);
        //console.log("jump bye");
        //counter = 0;
        break;
    }
  });

  //console.log(platforms);
  //console.log(platformsRect);

  function isItColliding(platforms) {
    const limite = cadre.getBoundingClientRect();
    const moiRect = persoMoi.el.getBoundingClientRect();
    //console.log("fonction colliding");
    const colliding = [];
    for (const platEl of platforms) {
      const plat = platEl.pl.getBoundingClientRect();
      const collisionhorizon =
        (moiRect.left >= plat.left && moiRect.left <= plat.right) ||
        (moiRect.right >= plat.left && moiRect.right <= plat.right) ||
        (moiRect.left <= plat.left && moiRect.right >= plat.right);
      const collisionvertical =
        (moiRect.top <= plat.bottom && moiRect.top >= plat.top) ||
        (moiRect.top >= plat.top && moiRect.bottom <= plat.bottom);

      //console.log(moiRect.bottom, plat.bottom);
      if (
        (moiRect.top >= plat.top &&
          moiRect.bottom > plat.bottom &&
          moiRect.top <= plat.bottom &&
          collisionhorizon) ||
        moiRect.top <= limite.top
      ) {
        colliding.push("top");
        //console.log(colliding);
        //return colliding;
      }
      if (
        moiRect.bottom < plat.bottom &&
        moiRect.bottom >= plat.top &&
        moiRect.top <= plat.top &&
        collisionhorizon
      ) {
        colliding.push("bottom");
        //console.log(colliding);
        //return colliding;
      }
      if (
        (moiRect.left > plat.left &&
          moiRect.left <= plat.right &&
          collisionvertical) ||
        moiRect.left <= limite.left
      ) {
        colliding.push("left");
        //return colliding;
      }
      if (
        (moiRect.right >= plat.left &&
          moiRect.right < plat.right &&
          collisionvertical) ||
        moiRect.right >= limite.right
      ) {
        colliding.push("right");
        //return colliding;
      }
      //console.log(colliding);
      /*if (colliding.length) {
        break;
      }*/
    }

    const playerRectLeft = persoMoi.el.getBoundingClientRect().left;
    const playerRectRight = persoMoi.el.getBoundingClientRect().right;
    //console.log(playerRectRight);
    if (playerRectLeft / visualViewport.width > 0.49) {
      window.scrollBy({
        behavior: "instant",
        left: Math.floor(visualViewport.width * 0.1),
      });
      //console.log("left");
    }
    if (playerRectRight < 250) {
      window.scrollBy({
        behavior: "instant",
        left: -Math.floor(visualViewport.width * 0.15),
      });
      //console.log("right");
      //console.log(visualViewport.pageLeft);
    }

    //console.log(colliding);
    return colliding;
  }
  function isItHurting(monsters) {
    const moiRect = persoMoi.el.getBoundingClientRect();
    for (const monst of monsters) {
      const monstRect = monst.mt.getBoundingClientRect();
      if (
        ((moiRect.right >= monstRect.left && moiRect.right < monstRect.right) ||
          (moiRect.left <= monstRect.right && moiRect.left > monstRect.left)) &&
        ((moiRect.top > monstRect.top && moiRect.top <= monstRect.bottom) ||
          (moiRect.bottom < monstRect.bottom &&
            moiRect.bottom >= monstRect.top)) &&
        immute !== "on"
      ) {
        lifePoint = lifePoint - 2 > 0 ? lifePoint - 2 : 0;
        contLP.textContent = lifePoint;
        immute = "on";
        persoMoi.el.classList.add("hurt");
        setTimeout(() => {
          immute = "off";
          persoMoi.el.classList.remove("hurt");
        }, 2000);
        console.log("hurt");
      }
    }
    return lifePoint;
  }
  function isItHealing(foods) {
    const moiRect = persoMoi.el.getBoundingClientRect();
    for (const item of foods) {
      const foodRect = item.fd.getBoundingClientRect();
      if (
        ((((moiRect.right >= foodRect.left && moiRect.right < foodRect.right) ||
          (moiRect.left <= foodRect.right && moiRect.left > foodRect.left)) &&
          ((moiRect.top > foodRect.top && moiRect.top <= foodRect.bottom) ||
            (moiRect.bottom < foodRect.bottom &&
              moiRect.bottom >= foodRect.top))) ||
          (foodRect.left >= moiRect.left &&
            foodRect.top >= moiRect.top &&
            foodRect.right <= moiRect.right &&
            foodRect.bottom <= moiRect.bottom)) &&
        immute !== "on" &&
        item.fd.style.backgroundColor !== "black"
      ) {
        item.fd.style.backgroundColor = "black";
        lifePoint = lifePoint + 1 < 10 ? lifePoint + 1 : 10;
        contLP.textContent = lifePoint;
        console.log("heal");
        immute = "on";
        setTimeout(() => {
          immute = "off";
        }, 2000);
      }
    }
    return lifePoint;
  }
  function isItSaving(villages) {
    const moiRect = persoMoi.el.getBoundingClientRect();
    for (let i = 0; i < villages.length; i++) {
      const villageRect = villages[i].vl.getBoundingClientRect();
      if (
        (((moiRect.right >= villageRect.left &&
          moiRect.right < villageRect.right) ||
          (moiRect.left <= villageRect.right &&
            moiRect.left > villageRect.left)) &&
          ((moiRect.top > villageRect.top &&
            moiRect.top <= villageRect.bottom) ||
            (moiRect.bottom < villageRect.bottom &&
              moiRect.bottom >= villageRect.top))) ||
        (villageRect.left >= moiRect.left &&
          villageRect.top >= moiRect.top &&
          villageRect.right <= moiRect.right &&
          villageRect.bottom <= moiRect.bottom)
      ) {
        console.log("save him");
        save = ["yes you can", i];
      }
    }
    return save;
  }

  function endGame() {
    if (lifePoint === 0 || y < 0 || timeRemaining === 0 || villageSaved == 6) {
      cadre.classList.add("hidden");
      transitionScreen.classList.remove("hidden");
      clearInterval(move);
      if (
        lifePoint === 0 ||
        y < 0 ||
        (timeRemaining === 0) & (villageSaved !== 6)
      )
        etat.textContent = "Game Over";
      messageUn.textContent = `${villageSaved} villagers saved ...`;
      messageDeux.textContent = `Would you like to try again ?`;
      console.log("fini");
    }
  }
  function Reset() {
    timeRemaining = 120;
    lifePoint = 10;
    contLP.textContent = lifePoint;
    save = "";
    immute = "";
    look = "right";
    villageSaved = 0;
    contVS.textContent = `${villageSaved}/6`;
    counter = 10;
    x = generalWidth * 0.1;
    y = generalWidth * 0.1;
    persoMoi.el.style.left = x + "px";
    persoMoi.el.style.bottom = y + "px";
    for (const pers of villages) {
      pers.vl.classList.remove("hidden");
    }
    window.scrollBy({
      behavior: "instant",
      left: 0,
    });
    for (const item of foods) {
      item.fd.style.backgroundColor = "green";
    }
  }

  motion();
}

/*case "ArrowUp":
        if (game.snake.direction === "down") {
          return;
        }
        game.snake.direction = "up";
        break;
      case "ArrowDown":
        if (game.snake.direction === "up") {
          return;
        }
        game.snake.direction = "down";
        break;
    }
  });*/

/*document.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "ArrowLeft":
        clearInterval(move);
        //console.log("left bye");
        break;
      case "ArrowRight":
        clearInterval(move);
        //console.log("right bye");
        break;
      case " ":
        //clearInterval(jump);
        //console.log("jump bye");
        //counter = 0;
        break;
    }
  });
}

let y = 30;
let x = 10;
persoMoi.style.left = x + "%";
persoMoi.style.bottom = y + "%";
let move = null;
let jump = null;

// const intervalId = { jump: null };

// function stopInterval(intId) {
//   clearInterval(intervalId[intId]);
//   console.log(intervalId[intId]);
// }

/* fonction marche */
/*function walking(charDirection) {
  if (move !== null) {
    clearInterval(move);
    move = null;
  }
  if (charDirection === "right") {
    move = setInterval(() => {
      x += 3;
      //console.log(x);
      persoMoi.style.left = x + "%";
    }, 50);
  } else if (charDirection === "left") {
    move = setInterval(() => {
      x -= 3;
      //console.log(x);
      persoMoi.style.left = x + "%";
    }, 50);
  }
}

/*fonction saut*/

/*function jumping(charDirection) {
  if (jump !== null) {
    clearInterval(jump);
    jump = null;
  }
  if (charDirection === "jump") {
    /*const moiRect = persoMoi.getBoundingClientRect();
    console.log(moiRect);
    const posYInit = moiRect.y;
    console.log(posYInit);*/
/* let counter = 0;
    jump = setInterval(() => {
      const colliding = isItColliding(platformsRect);
      //console.log(y, counter);
      if (counter < 4 && !colliding.includes("top")) {
        y += 6;
        persoMoi.style.bottom = y + "%";
        counter += 1;
        console.log("etape1");
      } else if (counter < 9) {
        counter += 1;
        console.log("etape2");
      } else if (counter < 13 && !colliding.includes("bottom")) {
        y = y - 6 > 0 ? y - 6 : 0;
        persoMoi.style.bottom = y + "%";
        console.log("etape3");
        counter += 1;
      }
      if (counter === 13) {
        clearInterval(jump);
        //console.log("etape 4");
      }
      console.log(counter);
    }, 30);
  }
}

/* appels fonction avec touches */

/*document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      // changeBlock(moiRect, bloquesRect);
      charDirection = "left";
      //console.log("left hello");
      walking(charDirection);

      break;
    case "ArrowRight":
      // changeBlock(bloquesRect);
      charDirection = "right";
      //console.log("right hello");
      walking(charDirection);

      break;
    case " ":
      if (y !== 0) {
        return;
      }
      //changeBlock(bloquesRect);
      charDirection = "jump";
      //console.log("jump hello");
      jumping(charDirection);
      break;
  }
});
/*case "ArrowUp":
      if (game.snake.direction === "down") {
        return;
      }
      game.snake.direction = "up";
      break;
    case "ArrowDown":
      if (game.snake.direction === "up") {
        return;
      }
      game.snake.direction = "down";
      break;
  }
});*/

/*document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      clearInterval(move);
      //console.log("left bye");
      break;
    case "ArrowRight":
      clearInterval(move);
      //console.log("right bye");
      break;
    case " ":
      //clearInterval(jump);
      //console.log("jump bye");
      //counter = 0;
      break;
  }
});

/*contenu page plateformes.js */

/*const platformEl = document.querySelectorAll(".bloque");

const platforms = [];
const platformsRect = [];

platformEl.forEach((pl) => {
  platforms.push({
    floor: pl.querySelector(".floor"),
    air: pl.querySelector(".air"),
  });
});

console.log(platforms);
console.log(platformEl);
/*platforms.forEach((el) => {
  console.log(el.floor);
});*/

/*platforms.forEach((el) => {
  platformsRect.push(el.floor.getBoundingClientRect());
});

console.log(platformsRect);

/* fonction pour le calcul des collisions */

/*function isItColliding(platformsRect) {
  const moiRect = persoMoi.getBoundingClientRect();
  //console.log("fonction colliding");
  const colliding = [];
  for (const plat of platformsRect) {
    console.log(moiRect.bottom, plat.bottom);
    if (
      moiRect.top > plat.top &&
      moiRect.top <= plat.bottom &&
      ((moiRect.left > plat.left && moiRect.left < plat.right) ||
        (moiRect.right > plat.left && moiRect.right < plat.right))
    ) {
      colliding.push("top");
      console.log(colliding);
      //return colliding;
    }
    if (
      moiRect.bottom <= plat.top &&
      moiRect.bottom < plat.bottom &&
      ((moiRect.left > plat.left && moiRect.left < plat.right) ||
        (moiRect.right > plat.left && moiRect.right < plat.right))
    ) {
      colliding.push("bottom");
      console.log(colliding);
      //return colliding;
    }
    if (moiRect.left > plat.left && moiRect.left < plat.right) {
      colliding.push("left");
      //return colliding;
    }
    if (moiRect.right > plat.left && moiRect.right < plat.right) {
      colliding.push("right");
      //return colliding;
    }

    if (colliding.length) {
      break;
    }
  }
  //console.log(colliding);
  return colliding;
}

/* fonction pour changement de div*/

/*const bloquesRect = [];

platforms.forEach((el) => {
  bloquesRect.push(el.air.getBoundingClientRect());
});

console.log(bloquesRect);

function changeBlock(moiRect, bloquesRect) {
  if (
    moiRect.bottom < bloquesRect.top &&
    moiRect.bottom > bloquesRect.bottom &&
    moiRect.left > bloquesRect.left &&
    moiRect.left < bloquesRect.right
  ) {
    platforms.air.appendChild(persoMoi);
    console.log("changement bloque");
  } else if (
    moiRect.bottom < bloquesRect.top &&
    moiRect.bottom > bloquesRect.bottom &&
    moiRect.right > bloquesRectRect.left &&
    moiRect.right < bloquesRectRect.right
  ) {
    platforms.air.appendChild(persoMoi);
    console.log("changement bloque");
  }
}*/
