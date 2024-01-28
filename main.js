const students = [{}] 
//iterative mould for arrays to fill 
const renderCards = (array) => {
  let refStuff = "";
  array.forEach((item) => {
refStuff += `<div id="cards" style="background-color: green">
  <h5 class="card-title">${item.name}</h5>
  <p class="card-text">${item.house}</p>
  <button type="button" class="btn btn-danger">Danger</button>
</div>`
  
  })
  renderToDom("#cards", refStuff);
}
// creates function that selects IDs, and innerhtml
const renderToDom = (divId, html) =>{
const selectedDiv = document.querySelector(divId)
selectedDiv.innerHTML = html
}
//sorting hat
 const sort = (houses)=> { 
  houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]
  const houseIndex = Math.floor(Math.random() * houses.length)
  return houses[houseIndex]
}

//card template and what is displayed

const form = document.querySelector("form")

const createNewStudent = (e) =>{
  e.preventDefault()
  const newStudent ={
    id: students.length+1,
    name: document.querySelector("#name").value, 
    house: sort(),
  };
  students.push(newStudent)
  renderCards(students)
  form.reset()
}
form.addEventListener("submit", createNewStudent )
document.querySelector("#form-submit").addEventListener("click",() => renderCards(students))

const filter = (renderCards, house) =>{
  return renderCards.filter((member)=>
  member.house === house)
}
  

const griffBtn = document.querySelector("#gryffindor-btn")
const slythBtn = document.querySelector("#slytherin-btn")
const huffBtn = document.querySelector("#hufflepuff-btn")
const ravenBtn = document.querySelector("#ravenclaw-btn")
const allBtn = document.querySelector("#all-btn")

const btnFilter = (e) => {
  const selectedHouse = e.target.id
if(selectedHouse === "gryffindor-btn"){
  const gryff = students.filter((item) => item.house === "Gryffindor")
  renderCards(gryff)
}
  //const gryff = students.filter((item) => item.house === "Gryffindor");

if(selectedHouse === "slytherin-btn"){
  const slyth = students.filter(item => item.house === "Slytherin")
  renderCards(slyth)
}
if(selectedHouse === "hufflepuff-btn"){
  const huff = students.filter(items => items.house === "Hufflepuff")
  renderCards(huff)
}
if(selectedHouse === "ravenclaw-btn"){
  const raven = students.filter(item => item.house === "Ravenclaw")
  renderCards(raven)
}
if(selectedHouse === "all-btn")
renderCards(students)
}

document.querySelector("#btn-cont").addEventListener("click", btnFilter)
