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

point.addEventListener("mouseenter", () => {
highlightDivisions(item.divisions);
});

point.addEventListener("mouseleave", () => {
clearDivisions();
});

point.addEventListener("click", () => {

document.getElementById("infoTitle").textContent = item.title;
document.getElementById("infoText").textContent = item.text;

document.getElementById("infoPanel").classList.remove("hidden");

});

svg.appendChild(point);

});

}

function highlightDivisions(divisions) {

clearDivisions();

divisions.forEach(div => {
const element = document.querySelector("." + div);
if(element){
element.style.opacity = "0.6";
}
});

}

function clearDivisions() {

document.querySelectorAll(".division").forEach(el => {
el.style.opacity = "0.12";
});

}

function closePanel() {
document.getElementById("infoPanel").classList.add("hidden");
}

loadInteractions();