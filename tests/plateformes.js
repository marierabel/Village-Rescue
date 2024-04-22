const platformEl = document.querySelectorAll(".bloque");

const platforms = [];

platformEl.forEach((pl) => {
  platforms.push({
    floor: pl.querySelector(".floor"),
    air: pl.querySelector(".air"),
  });
});

console.log(platforms);
console.log(platformEl);

const moiRect = persoMoi.getBoundingClientRect();
const platformsRect = platformEl.floor.getBoundingClientRect();

console.log(moiRect);
console.log(platformsRect);
