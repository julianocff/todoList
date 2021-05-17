function tarefa() {

    const inputTarefa = document.querySelector('.input-tarefa')
    const btnTarefa = document.querySelector('.btn-tarefa')
    const tarefas = document.querySelector('.tarefas')

    const criaElemento = (tag) => {
        const elemento = document.createElement(tag)
        return elemento
    }

    const criaBtnApagar = (li) => {
        const button = criaElemento('button')
        button.innerText = 'Apagar'
            // button.classList.add('btn') OU 
        button.setAttribute('class', 'apagar')
        button.setAttribute('title', 'Apagar essa tarefa')
        li.appendChild(button)
    }

    const criaTarefa = (textoInput) => {
        const li = criaElemento('li')
        li.innerHTML = textoInput
        tarefas.appendChild(li)
        criaBtnApagar(li)
        salvarTarefas()
        limpaInput()
    }

    btnTarefa.addEventListener('click', () => {
        if (!inputTarefa.value) return
        criaTarefa(inputTarefa.value)
    })

    inputTarefa.addEventListener('keypress', (e) => {
        if (e.keyCode === 13 && inputTarefa.value) {
            criaTarefa(inputTarefa.value)
        }
    })

    const limpaInput = () => {
        inputTarefa.value = ''
        inputTarefa.focus()
    }

    document.addEventListener('click', (e) => {
        const elemento = e.target
        if (elemento.classList.contains('apagar')) {
            elemento.parentElement.remove()
            salvarTarefas()
        }
    })

    const salvarTarefas = () => {
        const liTarefas = tarefas.querySelectorAll('li')
        const todasTarefas = []

        for (let tarefa of liTarefas) {
            let tarefaTexto = tarefa.innerText
            tarefaTexto = tarefaTexto.replace('Apagar', '').trim()
            todasTarefas.push(tarefaTexto)
        }
        const tarefasJSON = JSON.stringify(todasTarefas)
        localStorage.setItem('tarefas', tarefasJSON)
    }

    const exibeTarefasSalvas = () => {
        const tarefasSalvasJSON = localStorage.getItem('tarefas')
        const tarefasSalvas = JSON.parse(tarefasSalvasJSON)

        for (let tarefa of tarefasSalvas) {
            criaTarefa(tarefa)
        }
    }
    exibeTarefasSalvas()
}

tarefa()