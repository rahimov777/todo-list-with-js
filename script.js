let box = document.querySelector('.box')

let btnForAdd = document.querySelector('.btnForAdd')
let dialogForAdd = document.querySelector('.dialogForAdd')
let btnForX = document.querySelector('.btnForX')
let inpForDialogAdd = document.querySelector('.inpForDialogAdd')
let textareaForAdd = document.querySelector('.textareaForAdd')
let btnForSaveAdd = document.querySelector('.btnForSaveAdd')
let btnForCanelAdd = document.querySelector('.btnForCanelAdd')

let dialogForDelete = document.querySelector('.dialogForDelete')
let btnYes = document.querySelector('.btnYes')
let btnNo = document.querySelector('.btnNo')

let dialogForEdit = document.querySelector('.dialogForEdit')
let inpForEdit = document.querySelector('.inpForEdit')
let inpForEdit2 = document.querySelector('.inpForEdit2')
let btnForEdit = document.querySelector('.btnForEdit')
let btnForEdit2 = document.querySelector('.btnForEdit2')

let inpForHide = document.querySelector('.inpForHide')
    
let data = [
    {
        id: 1,
        title: "The first task tittle",
        description: `Lorem ipsum dolor sit amet, <br> consectetur adipiscing elit. Mauris <br> sit amet euismod nulla.`,
        status: false,
    },
    {
        id: 2,
        title: "The first task tittle",
        description: `Lorem ipsum dolor sit amet, <br> consectetur adipiscing elit. Mauris <br> sit amet euismod nulla.`,
        status: false,
    },
    {
        id: 3,
        title: "The first task tittle",
        description: `Lorem ipsum dolor sit amet, <br> consectetur adipiscing elit. Mauris <br> sit amet euismod nulla.`,
        status: false,
    },
    {
        id: 4,
        title: "The first task tittle",
        description: `Lorem ipsum dolor sit amet, <br> consectetur adipiscing elit. Mauris <br> sit amet euismod nulla.`,
        status: false,
    },
]

function Delete(id) {
    data = data.filter((el) => el.id != id)
    get()
}

let idx = null

function edit(el) {
    idx = el.id
    inpForEdit.value = el.title
    inpForEdit2.value = el.description
    dialogForEdit.showModal()
}

function SaveEdit() {
    data = data.map((el) => {
        if (el.id == idx) {
            el.title = inpForEdit.value
            el.description = inpForEdit2.value
        }
        return el
    })
    dialogForEdit.close()
    get()
}

function check(id) {
    data = data.map((el) => {
        if (el.id == id) {
            el.status = !el.status
        }
        return el
    })
    get()
}

function add() {
    let newData = {
        id: Date.now(),
        title: inpForDialogAdd.value,
        description: textareaForAdd.value,
        status: false,
    }
    data.push(newData)
    get()
}

let hide = false

function get() {

    box.innerHTML = ""

    let res = [...data]

    if (hide) {
        res = res.filter((el) => el.status == true)
    }

    res.forEach(el => {
        let container = document.createElement('div')
        container.classList.add('container')
        let div = document.createElement('div')
        div.classList.add('div')

        let title = document.createElement('h2')
        title.innerHTML = el.title

        let description = document.createElement('p')
        description.innerHTML = el.description
        description.style.color = "rgba(89, 89, 89, 1)"

        let btnEdit = document.createElement('button')
        btnEdit.innerHTML = `<i class="fa-solid fa-pen"></i>`
        btnEdit.classList.add('btnEdit')

        btnEdit.onclick = () => {
            edit(el)
            btnForEdit.onclick = () => {
                SaveEdit()
            }
            btnForEdit2.onclick = () => {
                dialogForEdit.close()
            }
        }

        let btnDel = document.createElement('button')
        btnDel.innerHTML = `<i class="fa-solid fa-trash"></i>`
        btnDel.classList.add('btnDel')

        btnDel.onclick = () => {
            dialogForDelete.showModal()
            btnYes.onclick = () => {
                Delete(el.id)
                dialogForDelete.close()
            }
            btnNo.onclick = () => {
                dialogForDelete.close()
            }
        }

        let checkbox = document.createElement('input')
        checkbox.type = "checkbox"
        checkbox.checked = el.status
        checkbox.classList.add('checkbox')

        if (el.status) {
            title.style.textDecoration = "line-through"
            description.style.textDecoration = "line-through"
        }

        checkbox.onclick = () => {
            check(el.id)
        }

        let done = document.createElement('span')
        done.innerHTML = "done"
        done.style.position = "relative"
        done.style.top = "10px"
        done.style.left = "235px"

        div.append(btnEdit, btnDel, checkbox, done)
        container.append(title, description, div)
        box.append(container)
    });

}

get()


btnForAdd.onclick = () => {
    dialogForAdd.showModal()
    btnForSaveAdd.onclick = () => {
        add()
        dialogForAdd.close()
    }
    btnForCanelAdd.onclick = () => {
        dialogForAdd.close()
    }
    btnForX.onclick = () => {
        dialogForAdd.close()
    }
}

inpForHide.onclick = () => {
    hide = inpForHide.checked
    get()
}
