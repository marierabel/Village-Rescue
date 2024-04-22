let charDirection = [];
const persoMoi = document.querySelector("#moi");
//console.log(persoMoi);

const btnStart = document.querySelector("#startGame");

btnStart.addEventListener("click", (event) => {
  game(persoMoi);
  //console.log("btnstart");
});
let counter = 25;
let y = 30;
let x = 10;
persoMoi.style.left = x + "%";
persoMoi.style.bottom = y + "%";
function game(persoMoi) {
  //console.log("start");
  function motion() {
    move = setInterval(() => {
      //console.log(charDirection, ">>>>");
      const colliding = isItColliding(platformsRect);
      console.log(colliding, "===");
      if (!charDirection.includes("jump") && !colliding.includes("bottom")) {
        y -= 1;
        persoMoi.style.bottom = y + "%";
      }
      if (charDirection.includes("left")) {
        x -= 1;
        persoMoi.style.left = x + "%";
      }
      if (charDirection.includes("right")) {
        x += 1;
        persoMoi.style.left = x + "%";
      }
      if (charDirection.includes("jump")) {
        if (counter > 0 && !colliding.includes("top")) {
          --counter;
          y += 1;
          persoMoi.style.bottom = y + "%";
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
    }, 80);
  }

  document.addEventListener("keydown", (e) => {
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
        if (!charDirection.includes("jump")) {
          charDirection.push("jump");
          counter = 25;
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

  const platformEl = document.querySelectorAll(".bloque");

  const platforms = [];
  const platformsRect = [];

  platformEl.forEach((pl) => {
    platforms.push({
      floor: pl.querySelector(".floor"),
      air: pl.querySelector(".air"),
    });
  });
  platforms.forEach((el) => {
    platformsRect.push(el.floor.getBoundingClientRect());
  });

  //console.log(platformsRect);

  function isItColliding(platformsRect) {
    const moiRect = persoMoi.getBoundingClientRect();
    //console.log("fonction colliding");
    const colliding = [];
    for (const plat of platformsRect) {
      //console.log(moiRect.bottom, plat.bottom);
      if (
        //moiRect.top > plat.top &&
        moiRect.top >= plat.bottom &&
        ((moiRect.left > plat.left && moiRect.left < plat.right) ||
          (moiRect.right > plat.left && moiRect.right < plat.right))
      ) {
        colliding.push("top");
        console.log(colliding);
        //return colliding;
      }
      if (
        moiRect.bottom >= plat.top &&
        //moiRect.bottom < plat.bottom &&
        ((moiRect.left > plat.left && moiRect.left < plat.right) ||
          (moiRect.right > plat.left && moiRect.right < plat.right))
      ) {
        colliding.push("bottom");
        //console.log(colliding);
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
