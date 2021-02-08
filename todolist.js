const button = document.querySelector("#button-js");
const input = document.querySelector("#input-js");
const errorInput = document.querySelector("#error-input-js");
const list = document.querySelector("#list");

if (localStorage) {
    let todos = []
    for (let i = 0; i < 50; i++) {
        if (localStorage["todo-" + i] !== undefined) {
            let save = {
                'id' : i,
                'text' : localStorage["todo-" + i]
            }
            todos.push(save)
        } 
    }
    todos.forEach((todo) => {
        let div = document.createElement("div")
        div.classList.add("list-todo");
        div.id = "todo-" + (document.querySelectorAll(".list-todo").length + 1);
        div.innerText = todo.text
        
        if (localStorage.getItem(div.id + "-validated") === div.id) {
            div.classList.add("validated")
        }
        list.appendChild(div)


        let btnDelete = document.createElement("button");
        btnDelete.classList.add("btn-delete");
        btnDelete.id = "todo-" + document.querySelectorAll(".list-todo").length;
        btnDelete.innerHTML = "X";
        div.appendChild(btnDelete);

        let btnValidate = document.createElement("button");
        btnValidate.classList.add("btn-valid");
        btnValidate.id = "todo-valid-" + document.querySelectorAll(".list-todo").length;
        btnValidate.innerHTML = "V";
        div.appendChild(btnValidate);

        btnDelete.addEventListener("click", () => {
            if (confirm("Voulez vous vraiment supprimer cette tâche ?")) {
                localStorage.removeItem(btnDelete.id);
                if (localStorage.getItem(div.id + "-validated") === div.id) {
                    localStorage.removeItem(div.id + "-validated");
                }
                btnDelete.parentElement.remove();
                document.location.reload();
            }
        })

        btnValidate.addEventListener("click", () => {
            div.classList.toggle("validated");

            if (localStorage.getItem(div.id + "-validated") !== div.id) {
                localStorage.setItem(div.id + "-validated", div.id);
            } else {
                localStorage.removeItem(div.id + "-validated");
            }
        })
    })
}

button.addEventListener('click', (e) => {
    e.preventDefault()
    if (input.value === "") {
        errorInput.style.display = "block";
        input.style.border = "2px solid red";
    } else {
        errorInput.style.display = "none";
        input.style.border = "none";

        localStorage.setItem("todo-" + (document.querySelectorAll(".list-todo").length + 1), input.value);
        document.location.reload();
    }
})
