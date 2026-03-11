let interactionsData = [];

async function loadInteractions() {

const response = await fetch("data/interactions.json");
const data = await response.json();

interactionsData = Object.values(data);

const svg = document.getElementById("house");

interactionsData.forEach(item => {

const point = document.createElementNS("http://www.w3.org/2000/svg","circle");

point.setAttribute("cx", item.x);
point.setAttribute("cy", item.y);
point.setAttribute("r", 8);

point.classList.add("interaction");

point.dataset.divisions = item.divisions.join(",");

point.addEventListener("mouseenter", () => {
highlightDivisions(item.divisions);
});

point.addEventListener("mouseleave", () => {
clearDivisions();
clearTechnologyHighlights();
});

point.addEventListener("click", () => {

document.getElementById("infoTitle").textContent = item.title;
document.getElementById("infoText").textContent = item.text;

document.getElementById("infoPanel").classList.remove("hidden");

});

svg.appendChild(point);

});

setupDivisionHover();

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

function setupDivisionHover(){

document.querySelectorAll(".division").forEach(div => {

div.addEventListener("mouseenter", () => {

const name = div.classList[1];

highlightTechnology(name);

});

div.addEventListener("mouseleave", () => {

clearTechnologyHighlights();
clearDivisions();

});

});

}

function highlightTechnology(division){

document.querySelectorAll(".interaction").forEach(point => {

const divs = point.dataset.divisions.split(",");

if(divs.includes(division)){
point.setAttribute("r", 14);
point.style.fill = "#ffffff";
point.style.opacity = "1";
}else{
point.setAttribute("r", 6);
point.style.fill = "#555";
point.style.opacity = "0.4";
}

});

}

function clearTechnologyHighlights(){

document.querySelectorAll(".interaction").forEach(point => {

point.setAttribute("r", 8);
point.style.fill = "#d4af37";
point.style.opacity = "1";

});

}

function closePanel() {
document.getElementById("infoPanel").classList.add("hidden");
}

loadInteractions();