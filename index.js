/* let é uma variável que permite mudar o contéudo várias vezes*/  
let participantes = [
    {
        nome: "Mayk Brito",
        email: "mayk@gmail.com",
        dataInscrição: new Date(2024, 2, 22, 19, 20),
        dataCheckIn: new Date(2024, 2, 25, 22, 0)
    },
    {
        nome: "João Silva",
        email: "joao@gmail.com",
        dataInscrição: new Date(2024, 1, 15, 10, 30),
        dataCheckIn: new Date(2024, 1, 18, 18, 45)
    },
    {
        nome: "Maria Souza",
        email: "maria@gmail.com",
        dataInscrição: new Date(2024, 3, 5, 14, 10),
        dataCheckIn: new Date(2024, 3, 8, 20, 30)
    },
    {
        nome: "Carlos Santos",
        email: "carlos@gmail.com",
        dataInscrição: new Date(2024, 0, 10, 9, 0),
        dataCheckIn: new Date(2024, 0, 15, 12, 15)
    },
    {
        nome: "Ana Oliveira",
        email: "ana@gmail.com",
        dataInscrição: new Date(2024, 2, 1, 17, 45),
        dataCheckIn: null
    },
    {
        nome: "Pedro Almeida",
        email: "pedro@gmail.com",
        dataInscrição: new Date(2024, 1, 28, 11, 20),
        dataCheckIn: new Date(2024, 2, 2, 14, 40)
    },
    {
        nome: "Lucia Pereira",
        email: "lucia@gmail.com",
        dataInscrição: new Date(2024, 0, 5, 8, 15),
        dataCheckIn: new Date(2024, 0, 8, 16, 30)
    },
    {
        nome: "Fernando Costa",
        email: "fernando@gmail.com",
        dataInscrição: new Date(2024, 3, 10, 13, 40),
        dataCheckIn: null
    },
    {
        nome: "Aline Lima",
        email: "aline@gmail.com",
        dataInscrição: new Date(2024, 1, 20, 18, 50),
        dataCheckIn: new Date(2024, 1, 23, 23, 10)
    },
    {
        nome: "Gabriel Rocha",
        email: "gabriel@gmail.com",
        dataInscrição: new Date(2024, 0, 30, 22, 5),
        dataCheckIn: new Date(2024, 1, 3, 2, 20)
    }
];

const criarNovoParticipante = (participantes) => {

    const dataInscrição = dayjs(Date.now()).to(participantes.dataInscrição)
    let dataCheckIn = dayjs(Date.now()).to(participantes.dataCheckIn)

// Se o campo do dataCheckIn for vazio, irá criar um botão para confirmar check-in 
    if(participantes.dataCheckIn == null){
        dataCheckIn = `
            <button data-email="${participantes.email}" onclick="fazerCheckIn(event)">
            Confirmar Check-in
            </button>
        `
    }

    return `
    <tr>
        <td>
            <strong>${participantes.nome}</strong>
            <br>
            <small>${participantes.email}</small>
        </td>
        <td>${dataInscrição}</td>
        <td>${dataCheckIn}</td>
    </tr> 
    `
}

const atualizarLista = (participantes) => {

    let output = ""

    //Estrutura de Repetição ou Loop 
/* Para cada item de participantes, irá mostrar esse item  e depois irá somar com o próximo sucessivamente até completar a lista toda */ 
    for (let participante of participantes){
        output = output + criarNovoParticipante(participante)
    }

    //Substituindo informações do HTML
/* Procure no HTML um seletor/tag tbody e substitua sua informação pelo loop de cima*/ 
    document.querySelector('tbody').innerHTML = output
}

//Chamando a função para mostrar o resultado
atualizarLista(participantes) 

// O objeto event está dizendo para não fazer a função padrão do Botão 
const adicionarParticipante = (event) => {
    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target)

    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        dataInscrição: new Date(),
        dataCheckIn: null 
    }

    //Verificar se o participante já existe 
    const participanteExiste = participantes.find(
        (p) => p.email == participante.email   
    )

    if(participanteExiste){
        alert('Email já cadastrado')
        return
    }


    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    //Limpar o Formulário  
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {

//Confirmar se realmente quer o Check-in
const mensagemConfirmacao = "Tem certeza que deseja fazer o Check-in ? "

if(confirm(mensagemConfirmacao) == false){
    return 
}



//Encontrar o participante dentro da lista
const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email 
})
    //Atualizar o check-in do participante 
    participante.dataCheckIn = new Date()

    //Atualizar a lista de participante 
    atualizarLista(participantes)


}