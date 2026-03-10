async function loadInteractions() {

const response = await fetch("data/interactions.json");
const data = await response.json();

const svg = document.getElementById("house");

Object.values(data).forEach(item => {

const point = document.createElementNS("http://www.w3.org/2000/svg","circle");

point.setAttribute("cx", item.x);
point.setAttribute("cy", item.y);
point.setAttribute("r", 8);

point.classList.add("interaction");

point.addEventListener("click", () => {

document.getElementById("infoTitle").textContent = item.title;
document.getElementById("infoText").textContent = item.text;

document.getElementById("infoPanel").classList.remove("hidden");

});

svg.appendChild(point);

});

}

loadInteractions();