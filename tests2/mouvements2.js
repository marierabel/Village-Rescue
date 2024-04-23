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
/* Définition variable jeu */
let lifePoint = 20;
const contLP = document.querySelector("#life");
contLP.textContent = lifePoint;
let immute = "";

/*définiton persoMoi*/
const persoMoi = {
  el: document.querySelector("#moi"),
  x: 0,
  size: generalWidth * 0.03,
  moveStep: generalWidth * 0.01,
};
persoMoi.el.style.width = persoMoi.size + "px";
persoMoi.el.style.height = persoMoi.size + "px";

/*définition plateformes*/
const platforms = [];
const platformEl = document.querySelectorAll(".bloque");
platformEl.forEach((pl) => {
  platforms.push({ pl });
});

const sizeAndPositionPt = [
  { width: generalWidth * 2, height: generalWidth * 0.1, bottom: 0, left: 0 },
  {
    width: generalWidth * 0.6,
    height: generalWidth * 0.01,
    bottom: generalWidth * 0.16,
    left: generalWidth * 0.18,
  },
  {
    width: generalWidth * 0.3,
    height: generalWidth * 0.01,
    bottom: generalWidth * 0.26,
    left: generalWidth * 0.04,
  },
  {
    width: generalWidth * 0.3,
    height: generalWidth * 0.01,
    bottom: generalWidth * 0.26,
    left: generalWidth * 0.44,
  },
  {
    width: generalWidth * 0.05,
    height: generalWidth * 0.01,
    bottom: generalWidth * 0.36,
    left: generalWidth * 0.04,
  },
  {
    width: generalWidth * 0.05,
    height: generalWidth * 0.01,
    bottom: generalWidth * 0.46,
    left: generalWidth * 0.14,
  },
  {
    width: generalWidth * 0.2,
    height: generalWidth * 0.01,
    bottom: generalWidth * 0.42,
    left: generalWidth * 0.3,
  },
  {
    width: generalWidth * 0.12,
    height: generalWidth * 0.01,
    bottom: generalWidth * 0.42,
    left: generalWidth * 0.51,
  },
  {
    width: generalWidth * 0.2,
    height: generalWidth * 0.01,
    bottom: generalWidth * 0.42,
    left: generalWidth * 0.8,
  },
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
  {
    width: generalWidth * 0.03,
    height: generalWidth * 0.03,
    bottom: generalWidth * 0.268,
    left: generalWidth * 0.46,
  },
  {
    width: generalWidth * 0.05,
    height: generalWidth * 0.01,
    bottom: generalWidth * 0.35,
    left: generalWidth * 0.04,
  },
];
for (let i = 0; i < monsters.length; i++) {
  monsters[i].mt.style.width = sizeAndPositionMt[i].width + "px";
  monsters[i].mt.style.height = sizeAndPositionMt[i].height + "px";
  monsters[i].mt.style.bottom = sizeAndPositionMt[i].bottom + "px";
  monsters[i].mt.style.left = sizeAndPositionMt[i].left + "px";
}

/* Fonction Game Start */

const btnStart = document.querySelector("#startGame");

btnStart.addEventListener("click", (event) => {
  game(persoMoi);
  //console.log("btnstart");
});
let counter = 10;
let y = generalWidth * 0.2;
let x = generalWidth * 0.1;
persoMoi.el.style.left = x + "px";
persoMoi.el.style.bottom = y + "px";
const wichSection = ["a"];
function game(persoMoi) {
  //console.log("start");
  function motion() {
    move = setInterval(() => {
      //console.log(charDirection, ">>>>");
      const colliding = isItColliding(platforms);
      //console.log(colliding, "===");
      if (!charDirection.includes("jump") && !colliding.includes("bottom")) {
        y -= persoMoi.moveStep;
        persoMoi.el.style.bottom = y + "px";
      }
      if (charDirection.includes("left")) {
        x -= persoMoi.moveStep;
        persoMoi.el.style.left = x + "px";
      }
      if (charDirection.includes("right")) {
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
            //console.log("time out", counter);
          }, 100);
        }
      }
      isItHurting(monsters);
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
        //console.log("left hello");
        //motion(charDirection);

        break;
      case "ArrowRight":
        charDirection.push("right");
        //console.log("right hello");
        //motion(charDirection);

        break;
      case " ":
        if (!charDirection.includes("jump") && colliding.includes("bottom")) {
          charDirection.push("jump");
          counter = 10;
          //console.log("jump hello");
          //motion(charDirection);
          break;
        }
    }
  });
  document.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "ArrowLeft":
        charDirection.splice(charDirection.indexOf("left"), 1);
        //console.log("left bye");
        break;
      case "ArrowRight":
        charDirection.splice(charDirection.indexOf("right"), 1);
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
    const moiRect = persoMoi.el.getBoundingClientRect();
    //console.log("fonction colliding");
    const colliding = [];
    for (const platEl of platforms) {
      const plat = platEl.pl.getBoundingClientRect();
      //console.log(moiRect.bottom, plat.bottom);
      if (
        moiRect.top > plat.top &&
        moiRect.bottom > plat.bottom &&
        moiRect.top <= plat.bottom &&
        ((moiRect.left > plat.left && moiRect.left < plat.right) ||
          (moiRect.right > plat.left && moiRect.right < plat.right))
      ) {
        colliding.push("top");
        //console.log(colliding);
        //return colliding;
      }
      if (
        moiRect.bottom < plat.bottom &&
        moiRect.bottom >= plat.top &&
        moiRect.top < plat.top &&
        ((moiRect.left > plat.left && moiRect.left < plat.right) ||
          (moiRect.right > plat.left && moiRect.right < plat.right))
      ) {
        colliding.push("bottom");
        //console.log(colliding);
        //return colliding;
      }
      if (
        moiRect.left > plat.left &&
        moiRect.left < plat.right &&
        ((moiRect.bottom < plat.bottom && moiRect.bottom >= plat.top) ||
          (moiRect.top <= plat.bottom && moiRect.top > plat.top))
      ) {
        colliding.push("left");
        //return colliding;
      }
      if (
        moiRect.right > plat.left &&
        moiRect.right < plat.right &&
        ((moiRect.bottom < plat.bottom && moiRect.bottom >= plat.top) ||
          (moiRect.top <= plat.bottom && moiRect.top > plat.top))
      ) {
        colliding.push("right");
        //return colliding;
      }

      /*if (colliding.length) {
        break;
      }*/
    }

    const playerRectLeft = persoMoi.el.getBoundingClientRect().left;
    const playerRectRight = persoMoi.el.getBoundingClientRect().right;
    //console.log(playerRectRight);
    if (playerRectLeft / visualViewport.width > 0.49) {
      window.scrollBy({
        behavior: "smooth",
        left: Math.floor(visualViewport.width * 0.25),
      });
      console.log("left");
    }
    if (playerRectRight < 280) {
      window.scrollBy({
        behavior: "smooth",
        left: -Math.floor(visualViewport.width * 0.25),
      });
      console.log("right");
      console.log(visualViewport.pageLeft);
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
        lifePoint -= 2;
        contLP.textContent = lifePoint;
        immute = "on";
        setTimeout(() => {
          immute = "off";
        }, 300);
        console.log("hurt");
      }
    }
    return life;
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
