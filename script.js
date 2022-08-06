const inputUnidade = document.querySelectorAll('input[name="unidade"]');

const inputHora = document.querySelector('#hora');

const inputZona = document.querySelector('#zona');

const listaZona = document.querySelector('#listaZona');

const inputFuncionario = document.querySelector('#funcionario');

const listaFuncionario = document.querySelector('#listaFuncionario');

const inputRelato = document.querySelectorAll('input[name="relato"]');

const textbox = document.querySelector('#textbox');

const btnGerador = document.querySelector('#gera-relatorio');

const btnReset = document.querySelector('#reset');

//const relatorio = document.querySelector('#relatorio');

const divBtnCopy = document.querySelector('#divBtnCopy');

const zonasUnidade1 = ['ZONA 1','ZONA 2', ' ZONA 3', 'ZONA 4', 'ZONA 5', 'ZONA 6' , 'ZONA 7', 'ZONA 8'];

const zonasUnidade2 = ['ZONA A', 'ZONA B', 'ZONA C', 'ZONA D'];

const funcionarioUnidade1 = ['Fulano','Beltrano','Sicrano'];

const funcionarioUnidade2 = ['Neymar', 'Messi','Mbappé'];

textbox.disabled = true;

btnReset.disabled = true;

//Verifica se o local tem um elemento, e se tiver retirar.
function verificaLista(elementoPai) {
	while(elementoPai.hasChildNodes()){
		elementoPai.removeChild(elementoPai.firstChild);
	}
}

//Relaciona uma lista a um input do tipo search.
function adicionaOpcao(array, elPai) {
	array.forEach((valorAtual) =>{
		let opcao = document.createElement('option');
		opcao.value = valorAtual;
		elPai.appendChild(opcao);
	})
}

//Adiciona a datalist no input dependendo do radio escolhido.
function adicionaListas() {
	verificaLista(listaZona);
	verificaLista(listaFuncionario);

	if(inputUnidade.item(0).checked !== true) {
		adicionaOpcao(funcionarioUnidade2, listaFuncionario);
		adicionaOpcao(zonasUnidade2, listaZona);
	} else {
		adicionaOpcao(funcionarioUnidade1, listaFuncionario);
		adicionaOpcao(zonasUnidade1, listaZona);
	}

}

//Habilita o textbox se o radio "Outro" estiver ativo.
function habilitaTextbox() {
	if(inputRelato.item(1).checked !== true){
		textbox.disabled = true;
	} else {
		textbox.disabled = false;
	}
}

//Habilita o botão de limpar página.
function habilitaLimpaPagina() {
    btnReset.disabled = false;
}

//Cria um botão para copiar o texto.
function criarBotaoCopiar(divBotao, itemCopiado) {
    let btnCopy = document.createElement('button');
    divBotao.appendChild(btnCopy);
    btnCopy.addEventListener('click', () => {
        navigator.clipboard.writeText(itemCopiado.innerText);
    })
}

//Adiciona o relatorio
function geraRelatorio () {
    let inputUnidadeChecada = document.querySelector('input[name="unidade"]:checked');

    let inputRelatoChecado = document.querySelector('input[name="relato"]:checked');
    
    let inputTodosArray = new Array(inputUnidadeChecada, inputHora, inputZona, inputRelatoChecado);
 
    while(inputRelatoChecado.value === inputRelato.item(1).value) {
      inputRelatoChecado.value = textbox.value;
      break;
    }
  
    while(inputRelatoChecado.value === 'sem-anormalidades') {
        inputRelatoChecado.value = `Feito contato com funcionário <b>${inputFuncionario.value}</b> , que informa estar sem anormalidades.`;
        break;
    }
  

    inputTodosArray.forEach((valorAtual, indice) => {

        let spanDoRelatorio = document.createElement('span');

        switch(indice){
            case 0:
            spanDoRelatorio.innerHTML = `<b>${valorAtual.value}<br>`;
            break;
            case 1:
            spanDoRelatorio.innerHTML = `<b>Diparo:</b> ${valorAtual.value}<br>`;
            break;
            case 2:
            spanDoRelatorio.innerHTML = `<b>Setor:</b> ${valorAtual.value}<br>`;
            break;
            case 3:
            spanDoRelatorio.innerHTML = `${valorAtual.value}<br><br>`
            break;
          }

          relatorio.appendChild(spanDoRelatorio)
    })

    criarBotaoCopiar(divBtnCopy, relatorio);

}

//Reseta toda a página
function limpaPagina (){
    btnReset.disabled = true;
    verificaLista(relatorio);
}

btnGerador.addEventListener('click', geraRelatorio);

btnGerador.addEventListener('click', habilitaLimpaPagina);

btnReset.addEventListener('click', limpaPagina);
