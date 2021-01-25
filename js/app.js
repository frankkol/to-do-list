// Seleção de elementos:
const clear = document.querySelector('.clear')
const header = document.querySelector('.header')
const dateElement = document.getElementById('date')
const hourElement = document.getElementById('hour')
const list = document.getElementById('list')
const input = document.getElementById('input')

// Nome das classes:
const CHECK = 'fa-check-circle'
const UNCHECK = 'fa-circle-thin'
const LINE_THROUGH = 'lineThrough'
let lastHour = 0

//Visualização da data:
let options = { weekday:'long', month:'short', day:'numeric'}
let today = new Date()
dateElement.innerHTML = today.toLocaleDateString('pt-br', options)

//Visualização da hora:
let optHour = {timeStyle: 'short'}
setInterval(function(){
    let today = new Date()
    if(today.getHours() != lastHour){
        lastHour = today.getHours()
        changeImage(lastHour)
    }
    hourElement.innerHTML = today.toLocaleTimeString('pt-br', optHour)
}, 1000)

//Definição background image:
let images = [
    "url('../img/goodmorning.jpg')",
    "url('../img/tarde.jpg')",
    "url('../img/bye.jpg')"
]

function changeImage(lastHour) {
    if(lastHour >= 12 && lastHour < 18){
        header.style.backgroundImage = images[1]
    }else if (lastHour >= 18 && lastHour < 24){
        header.style.backgroundImage = images[2]
    }else {
        header.style.backgroundImage = images[0]
    }
}

//Variaveis
let LIST, id
let data = localStorage.getItem('TODO')

if(data){
    LIST = JSON.parse(data)
    id = LIST.length
    loadToDo(LIST)
}else{
    LIST = []
    id = 0
}

clear.addEventListener('click', function(){
    localStorage.clear()
    location.reload()
})

function loadToDo(array){
    array.forEach(element => {
      addToDo(element.name, element.id, element.done, element.trash)  
    })
}

//Função de adicionar tarefa:
function addToDo(toDo, id, done, trash){

    if(trash) { return }

    const DONE = done ? CHECK : UNCHECK
    const LINE = done ? LINE_THROUGH : ''

    const text =    `<li class="item">
                        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                        <p class="text ${LINE}">${toDo}</p>
                        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>`

    const position = "beforeend"
    list.insertAdjacentHTML(position, text)
}

document.addEventListener('keyup', function(event){
    if(event.keyCode == 13){
        const toDo = input.value
        if(toDo){
            addToDo(toDo, id, false, false)
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            })
            localStorage.setItem('TODO', JSON.stringify(LIST))
        }
        input.value = ''
        id++
    }
})

//Função de concluir tarefa:
function completeToDo(element){
    element.classList.toggle(CHECK)
    element.classList.toggle(UNCHECK)
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH)
    LIST[element.id].done = LIST[element.id].done ? false : true
}

//Função de remover tarefa:
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].trash = true
}

list.addEventListener('click', function(event){
    const element = event.target
    const elementJOB = element.attributes.job.value
    if(elementJOB == 'complete'){
        completeToDo(element)
    }else if(elementJOB == 'delete'){
        removeToDo(element)
    }
    localStorage.setItem('TODO', JSON.stringify(LIST))
})