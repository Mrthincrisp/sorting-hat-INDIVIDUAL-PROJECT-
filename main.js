//blank array to fill
const students = [] 
//iterative mould for arrays to fill 
// notes to remember that caused issue, arrays to be filled need to stay empty, and does not need to be preped for objects ie not [{}]
//array.forEach(item)  is students and any element to be displayed FUNCTION or other needs item to read the students key data. because scope?(get confirmation)   background-image: url('${backColor(item)}');
const renderCards = (array) => {
  let refStuff = "";
  array.forEach((item) => {
refStuff += `<div id="cards" class="hog-cards">
<img src="${backColor(item)}" class="card-img-top" alt="..."
<p class="none"></p>
  <p class="card-text">${item.name}</p>
  <button type="button" id="delete--${item.id}" class="btn btn-danger">Avada Kedavra</button>
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
      return gryffImg;
      
     case "Slytherin":
      return slythImg;
      break
    case "Hufflepuff":
      return huffImg;
      break
    case "Ravenclaw":
      return ravenImg;
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
  const showSorted = document.querySelector("#sorted") //variable to maipulate main parent div
  showSorted.style.display ="block" //displays the main part of the project
  students.push(newStudent) //adds the new student to the students array
  renderCards(students)  // puts students onto the dom
  form.reset()  // resets form elements to default(cleared text)
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
renderCards(students.sort((a, b) => a.name.localeCompare(b.name)))
}

document.querySelector("#btn-cont").addEventListener("click", btnFilter)  //triggers all buttons in the button container to be able to do coded filter function if clicked


const voldyArmy = [] // blank array

const card = document.querySelector(id="#cards")  // targets cards html (displayed ID of students div) to store in card

// creates new template for cards that get deleted, repeated code from renderCards
const newArmy = (array) => {
  let ref = "";
  array.forEach((item) => {
    ref += `<div class="card">
    <div class="card-body">
    <p class="card-text "  style="margin:2px;  font-size: larger;">${item.name}...</p>
      <h5 class="vold-title" style="margin:0px; font-size: larger;">Fell to Darkness</h5>
    </div>
  </div>`    
  });
  renderToDom("#vold-army", ref);
};
//
card.addEventListener("click", (e) => { // when a card is clicked on do...
  if (e.target.id.includes("delete")) { // this, but only if the id has delete, so clicking on the card will trigger delete
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



//variable for backgound images, just down here to keep upper code clean
const gryffImg = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9bd13371-535a-4737-b5d2-4c985d7ea5de/d7gk5ll-ea34c89a-e4a4-461b-b282-67c38fc4d17e.png/v1/fill/w_805,h_992/gryffindor_crest_badge_by_rainbowrenly_d7gk5ll-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI2MiIsInBhdGgiOiJcL2ZcLzliZDEzMzcxLTUzNWEtNDczNy1iNWQyLTRjOTg1ZDdlYTVkZVwvZDdnazVsbC1lYTM0Yzg5YS1lNGE0LTQ2MWItYjI4Mi02N2MzOGZjNGQxN2UucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.py9qEiMl8tX2L8K6xOMlt2Fsf8p3M7RknMeBMlbAOEY"

const slythImg = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9bd13371-535a-4737-b5d2-4c985d7ea5de/d7gk6lo-541e03d5-340c-40c9-9c88-0072af0bdaca.png/v1/fill/w_1024,h_1262/slytherin_crest_badge_by_rainbowrenly_d7gk6lo-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI2MiIsInBhdGgiOiJcL2ZcLzliZDEzMzcxLTUzNWEtNDczNy1iNWQyLTRjOTg1ZDdlYTVkZVwvZDdnazZsby01NDFlMDNkNS0zNDBjLTQwYzktOWM4OC0wMDcyYWYwYmRhY2EucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.IYbkSDwLepxScrLUrg3-WtM7cblP74XzUYxo1k6Lluc"

const huffImg = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9bd13371-535a-4737-b5d2-4c985d7ea5de/d7gk685-383ae974-15ba-4bc2-a899-d7992092daf3.png/v1/fill/w_805,h_992/hufflepuff_crest_badge_by_rainbowrenly_d7gk685-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI2MiIsInBhdGgiOiJcL2ZcLzliZDEzMzcxLTUzNWEtNDczNy1iNWQyLTRjOTg1ZDdlYTVkZVwvZDdnazY4NS0zODNhZTk3NC0xNWJhLTRiYzItYTg5OS1kNzk5MjA5MmRhZjMucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.McfIZkG_oKFUHZ_w8cOcbr_4GEye1bssBsJ7-t3-MTs"

const ravenImg = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9bd13371-535a-4737-b5d2-4c985d7ea5de/d7gk6ec-3bc6cac7-8bba-4ead-9ebc-f42bfce1bc47.png/v1/fill/w_1024,h_1262/ravenclaw_crest_badge_by_rainbowrenly_d7gk6ec-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI2MiIsInBhdGgiOiJcL2ZcLzliZDEzMzcxLTUzNWEtNDczNy1iNWQyLTRjOTg1ZDdlYTVkZVwvZDdnazZlYy0zYmM2Y2FjNy04YmJhLTRlYWQtOWViYy1mNDJiZmNlMWJjNDcucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.r8UUWoaHTu0QzqLx0GmZbugETJDvjZG25eWfQadTJg4"
