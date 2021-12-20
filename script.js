let tasks = [];
let updateValue = "";
let input = '';
let editext = null;
const link = "http://localhost:8000";

window.onload = async function init(){
    input = document.getElementById('add-task')
    input.addEventListener('change',(e) => {
        updateValue = e.target.value;
    })
    GetFunc()
}

GetFunc = async() => {
    const response = await fetch(`${link}/allTasks`, {
        method:'GET'
    })
    const result = await response.json()
    tasks = result.data
    render()
}

OnClickButton = async () => {
    const response = await fetch(`${link}/createTask`, {
        method:'POST',
        headers:{
            'Content-Type':'application/json;charset=utf-8',
            'Acces-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            text: updateValue,
            isCheck: false
        })
    })
    updateValue = ''; 
    input.value = '';
    GetFunc()
}

render = () => {
    const content = document.getElementById("content-div")
    while(content.firstChild){
        content.removeChild(content.firstChild)
    }
    tasks.sort((a,b) => a.isCheck > b.isCheck? 1: a.isCheck < b.isCheck? -1 : 0)
    tasks.map((item,index) => {
        const container = document.createElement('div');
        container.id = `task-${index}`;
        container.className = 'container-class';
        const checkbox = document.createElement('input'); 
        checkbox.type = "checkbox";
        checkbox.checked = item.isCheck;
        checkbox.onchange  = () =>{
            CheckBoxRes(index)
        }
        container.appendChild(checkbox);
        const text = document.createElement('p');
        text.className = item.isCheck ? 'text-task done-text' : 'text-task';
        content.appendChild(container)

        if(index === editext){
            const inTask = document.createElement('input');
            inTask.type = 'text';
            inTask.value = item.text;
            inTask.addEventListener('change',(e) => editFunc(e,item._id))
            inTask.addEventListener('blur',doneTask)
            container.appendChild(inTask)
        }
        else{
            const text = document.createElement('p');
            text.innerText = item.text;
            text.className = item.isCheck ? 'text-task done-text' : 'text-task';
            container.appendChild(text);
        }

        if(!item.isCheck){
            if(index === editext){
                const okImage = document.createElement('img');
                okImage.className = "image"
                okImage.src = 'img/ok.png';
                okImage.onclick = () =>{
                    doneTask()
                }
                container.appendChild(okImage)
            }
        }
        const editImage = document.createElement('img')
        editImage.className = "image"
        editImage.src = 'img/edit.png'
        editImage.onclick = () => {
            editext = index
            render()
        }
        container.appendChild(editImage)
        content.appendChild(container)        

        const imageB = document.createElement('img')
        imageB.src = "img/close.png"
        imageB.className = 'image'
        imageB.onclick = () => {
            closefunc(index,item._id);
            render()
        }
        
        container.appendChild(imageB)

    })

    CheckBoxRes = (index) => {
        tasks[index].isCheck = !tasks[index].isCheck
        render()
    }

    
    closefunc = async(index,id) => {
        tasks.splice(index,1)
        const response = await fetch(`${link}/deleteTask?id=${id}`,{
            method:'DELETE',
            headers:{
                'Acces-Control-Allow-Origin': '*'
            }
        })
        render()
    }

    editFunc = async (event,id) => {
        let change = tasks[editext].text = event.target.value
        const response = await fetch(`${link}/updateTask`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json;charset=utf-8',
                'Acces-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                text: change,
                id: id
            })

        })
        render()
    }

    doneTask = () => {
        editext = null;
        render()
    }

}

