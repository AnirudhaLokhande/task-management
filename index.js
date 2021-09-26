
//global array
let globalTaskData = [];    
taskContents = document.getElementById("taskContents");

const addCard = () => {
    const newTaskDetails = {
        id: `${Date.now()}`,
        url: document.getElementById("imageURL").value,
        title: document.getElementById("taskTitle").value,
        type: document.getElementById("taskType").value,
        description: document.getElementById("taskDescription").value
    };
    
    taskContents.insertAdjacentHTML('beforeend', generateTaskCard(newTaskDetails));
    
    globalTaskData.push(newTaskDetails);
    saveToLocalStorage();

}

const generateTaskCard = ({id, url, title, type, description}) => {
    return (`<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
        <div class="card">
            <div class="card-header">
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-outline-info" name=${id} onclick="editTask(this)">
                        <i class="fas fa-pencil-alt" name=${id} onclick="editTask(this)"></i>
                    </button>
                    <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteTask(this)">
                        <i class="fas fa-trash-alt" name=${id} onclick="deleteTask(this)"></i>
                    </button>
                </div>
            </div>
            <img src= ${url} class="card-imh-top" alt="image">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <span class="badge bg-primary">${type }</span>
            </div>
            <div class="card-footer">
                <button class="btn btn-outline-primary">OPEN TASK</button>
            </div>
        </div>
    </div>`)

}

const saveToLocalStorage = () => {
    localStorage.setItem("tasky", JSON.stringify({task: globalTaskData}));
}


const reloadTaskCard = () => {
    const localStorageCopy = JSON.parse(localStorage.getItem("tasky"));
    if(localStorageCopy) {
        globalTaskData = localStorageCopy["task"];  
    }
    globalTaskData.map((cardData) => {
        taskContents.insertAdjacentHTML('beforeend', generateTaskCard(cardData));
    })
}


const deleteTask = (e) => {
    console.log(e)
    const targetID = e.getAttribute("name");
    // console.log(targetID)
    globalTaskData = globalTaskData.filter((cardData) => cardData.id!==targetID);
    // globalTaskData = removeTask;
    console.log(globalTaskData);
    saveToLocalStorage();
    window.location.reload();
}

const editTask = (e) => {
    const targetID = e.getAttribute("name");
    const e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable", "true")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable", "true")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable", "true")
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick", "saveEditTask(this)")
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "SAVE CHANGES"
    // saveToLocalStorage();
    // window.location.reload();
}

const saveEditTask = (e) => {
    const targetID = e.getAttribute("name");
}

