//blank array to fill
const students = [] 

//iterative mould for arrays to fill 
// notes to remember that caused issue, arrays to be filled need to stay empty, and do not need to be preped for objects ie not [{}]
//array.forEach(item)  is students and any element to be displayed FUNCTION or other needs item to read the students key data. because scope?(get confirmation)
const renderCards = (array) => {
  let refStuff = "";
  array.forEach((item) => {
refStuff += `<div id="cards" style="padding:5px; background-color:${backColor(item)} ">
  <h5 class="card-title">${item.name}</h5>
  <p class="card-text">${item.house}</p>
  <button type="button" id="delete--${item.id}" class="btn btn-danger">Danger</button>
</div>`
  
  })
  renderToDom("#cards", refStuff);
}
// creates function that selects IDs, and innerhtml  <div id="me"> blank </div> becomes <div id="me"> Derek </div> when me is selected
const renderToDom = (divId, html) =>{
const selectedDiv = document.querySelector(divId)
selectedDiv.innerHTML = html
}
//creates a function that generates a random number 0-3 and is asigned to the index of houses to be used in students key house
 const sort = (houses)=> { 
  houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]
  const houseIndex = Math.floor(Math.random() * houses.length)
  return houses[houseIndex]
}

//creates function to produce a color based on students.house, function goes in the div card
const backColor = (students) =>{
  let color =""
  switch(students.house){
    case "Gryffindor":
      color = "red"
      break
     case "Slytherin":
      color = "green"
      break
    case "Hufflepuff":
      color = "Yellow"
      break
    case "Ravenclaw":
      color = "blue"
      break
  }
  return color
}


const form = document.querySelector("#submit-form") // selects form id with variable form 


const createNewStudent = (e) =>{  //creates submit function
  e.preventDefault()              // prevents weird url stuff
  const newStudent ={             // objects of new students to fit into esablished array students
    id: students.length+1,
    name: document.querySelector("#name").value, 
    house: sort(),
  };
  const showSorted = document.querySelector("#sorted") //
  showSorted.style.display ="block"
  students.push(newStudent)
  renderCards(students)
  form.reset()
}


form.addEventListener("submit", createNewStudent )
document.querySelector("#submit-btn").addEventListener("submit",() => renderCards(students))


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


const voldyArmy = []

const card = document.querySelector(id="#cards")


const newArmy = (array) => {
  let ref = "";
  array.forEach((item) => {
    ref += `<div class="card" style="flex">
    <img src="https://www.posterposse.com/wp-content/uploads/2015/03/DARK_MARK_thedarkinker.jpg" class="card-img-top" alt="...">
    <div class="card-body">
    <p class="card-text"  style="margin:2px;">${item.name}...</p>
      <h5 class="card-title" style="margin:0px;">Fell to Darkness</h5>
    </div>
  </div>`    
  });
  renderToDom("#vold-army", ref);
};

card.addEventListener("click", (e) => {
  if (e.target.id.includes("delete")) {
    const [, id] = e.target.id.split("--");
    const index = students.findIndex((student) => student.id === Number(id));
    const deletedStudentName = students.find((p) => p.id);
    voldyArmy.push(deletedStudentName);
    students.splice(index, 1);
  }
  renderCards(students);
  newArmy(voldyArmy);
});
