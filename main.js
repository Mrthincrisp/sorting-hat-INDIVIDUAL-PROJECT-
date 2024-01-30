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
 const sortHouse = (houses)=> { 
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
    house: sortHouse(),
  };
  const showSorted = document.querySelector("#sorted") //variable to maipulate main oarent div
  showSorted.style.display ="block" //displays the main part of the project
  students.push(newStudent) //adds the new student to the students array
  renderCards(students)  // puts students onto the dom
  form.reset()  // refreshes the form to have new array shown
}


form.addEventListener("submit", createNewStudent)  // form listens for a submit action, upon activation does createNewStudent function
document.querySelector("#submit-btn").addEventListener("submit",renderCards(students)) // when the submit btn is used it renders students

//button ids to variables
const griffBtn = document.querySelector("#gryffindor-btn") 
const slythBtn = document.querySelector("#slytherin-btn")
const huffBtn = document.querySelector("#hufflepuff-btn")
const ravenBtn = document.querySelector("#ravenclaw-btn")
const allBtn = document.querySelector("#all-btn")
//filters for the buttons
const btnFilter = (e) => {
  const selectedHouse = e.target.id  //variable for selected button id
if(selectedHouse === "gryffindor-btn"){  //checks value
  const gryff = students.filter((item) => item.house === "Gryffindor") //variable for students with Gryffindor in house. filter creates array of matching Gryffindor... Do all words start to look off after coding for a while or is that just me?
  renderCards(gryff)  // renders filter array gryff
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
if(selectedHouse === "all-btn")  // shows all
renderCards(students)
}

document.querySelector("#btn-cont").addEventListener("click", btnFilter)  //triggers all buttons in the button container to be able to do coded filter function if clicked


const voldyArmy = [] // blank array

const card = document.querySelector(id="#cards")  // targets cards html (displayed ID of students div) to store in card

// creates new template for cards that get deleted, repeated code from renderCards
const newArmy = (array) => {
  let ref = "";
  array.forEach((item) => {
    ref += `<div class="card" style="flex flex-wrap: wrap">
    <img src="https://www.posterposse.com/wp-content/uploads/2015/03/DARK_MARK_thedarkinker.jpg" class="card-img-top" alt="...">
    <div class="card-body">
    <p class="card-text"  style="margin:2px;">${item.name}...</p>
      <h5 class="card-title" style="margin:0px;">Fell to Darkness</h5>
    </div>
  </div>`    
  });
  renderToDom("#vold-army", ref);
};
//
card.addEventListener("click", (e) => { // when a card is clicked on do...
  if (e.target.id.includes("delete")) { // this, but only if the id has delete, otherwise just clicking on the card will trigger delete
    const [, id] = e.target.id.split("--"); // seperates object based on the delete--${item.id} <--unique address, but I think this may cause a bug
    const index = students.findIndex((student) => student.id === Number(id)); // creates variable for the index of the selected student, just index
    const deletedStudentName = students.find((p) => p.id === Number(id)); // creates variable for student with matching ID, all data
    voldyArmy.push(deletedStudentName);// pushes all data to voldyArmy array to be displayed via newArmy(voldyArmy)
    students.splice(index, 1); // removes targeted card, but card will still show 
  }
  renderCards(students); //redisplayes students with deleted students removed
  newArmy(voldyArmy); // update for voldyArmy display
});


// the bug I run into, and can't actively recreate (bad QA skills T_T)  when I delete a student the voldy card will have the wrong name, and evey card after will have the same name.  I'm pretty sure it has to do with the id numbers being created overlapping somehow with deleteing and creating into arrays, but can't say for sure. No errors pop up in the tools

//Changed the sort function to sortHouse, and it didn't change anything.  it was just bad timing that the above bug happened before I knew that was occuring.

//Let me know if you want me to make a discussion ticket with this version after this submission.
