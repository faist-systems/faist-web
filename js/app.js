let interactionsData = [];

async function loadInteractions() {

const response = await fetch("data/interactions.json");
const data = await response.json();

interactionsData = Object.values(data);

const svg = document.getElementById("house");

interactionsData.forEach(item => {

const group = document.createElementNS("http://www.w3.org/2000/svg","g");

group.dataset.x = item.x;
group.dataset.y = item.y;

group.setAttribute("transform", "translate(" + item.x + "," + item.y + ")");

group.classList.add("interaction");
group.dataset.divisions = item.divisions.join(",");

/* ikona */

const icon = document.createElementNS("http://www.w3.org/2000/svg","rect");

icon.setAttribute("x", -10);
icon.setAttribute("y", -10);
icon.setAttribute("width", 20);
icon.setAttribute("height", 20);
icon.setAttribute("rx", 4);

icon.style.fill = "#d4af37";

group.appendChild(icon);

/* hover technologie */

group.addEventListener("mouseenter", () => {
highlightDivisions(item.divisions);
});

group.addEventListener("mouseleave", () => {
clearDivisions();
clearTechnologyHighlights();
});

/* klik */

group.addEventListener("click", () => {

document.getElementById("infoTitle").textContent = item.title;
document.getElementById("infoText").textContent = item.text;

document.getElementById("infoPanel").classList.remove("hidden");

});

svg.appendChild(group);

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
const icon = point.firstChild;

const x = point.dataset.x;
const y = point.dataset.y;

if(divs.includes(division)){

icon.style.fill = "#ffffff";

point.setAttribute(
"transform",
"translate(" + x + "," + y + ") scale(1.4)"
);

}else{

icon.style.fill = "#555";

point.setAttribute(
"transform",
"translate(" + x + "," + y + ") scale(1)"
);

}

});

}

function clearTechnologyHighlights(){

document.querySelectorAll(".interaction").forEach(point => {

const icon = point.firstChild;

icon.style.fill = "#d4af37";

const x = point.dataset.x;
const y = point.dataset.y;

point.setAttribute(
"transform",
"translate(" + x + "," + y + ") scale(1)"
);

});

}

function closePanel() {
document.getElementById("infoPanel").classList.add("hidden");
}

loadInteractions();s