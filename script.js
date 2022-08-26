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

const relatorio = document.querySelector('#relatorio');

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

//Cria array com elementos filhos de um outro elemento
function criaArray(arrayDoPai) {
    let arrayPai = Array.from(arrayDoPai.children);
  return arrayPai
}

//Criar svg para ir para o botão
function criarSvg(elementoPai) {
  let svgCopiar = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgCopiar.setAttribute("viewBox", "0 0 512 512");
  
  let pathSvgCopiar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathSvgCopiar.setAttribute("d", `M130.152,90.648H51.565V512h232.008l82.083-82.083h94.78V0H130.152V90.648z M293.354,454.998v-25.08h25.08
			L293.354,454.998z M342.045,396.526h-82.082v82.083H84.956V124.04h257.09V396.526z M163.543,33.391h263.502v363.135h-51.609
			V90.648H163.543V33.391z`);
  
  svgCopiar.appendChild(pathSvgCopiar);
  elementoPai.appendChild(svgCopiar);
}

//Cria um botão para copiar o texto.
function criarBotaoCopiar(divBotao) {
    let btnCopy = document.createElement('button');
    divBotao.appendChild(btnCopy);
    criarSvg(btnCopy);
    criaArray(divBtnCopy).forEach((valor, index) => {
      valor.addEventListener('click', () =>{
      let posicao = index;
      navigator.clipboard.writeText(criaArray(relatorio)[index].innerText);
      })
    })
}

//Monta o relatório
function montaRelatorio(arrayDosInput, divEscolhida) {
      arrayDosInput.forEach((valorAtual, indice) => {
        
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
          divEscolhida.appendChild(spanDoRelatorio);                    
      })     
}

//Valida dados do formulário
function validaDados(arrayParaValidar, divAbaixoDoRelatorio, inputDeRelato, inputDaUnidade, inputDoFuncionario) {
    if (!inputDaUnidade || inputHora.value === ''|| inputZona.value === ''|| inputDoFuncionario === '' || !inputDeRelato) {
      alert(`FAVOR VERIFICAR OS DADOS INVÁLIDOS`);    
    } 
    else{
      
      while(inputDeRelato.value === inputRelato.item(1).value) {
        inputDeRelato.value = textbox.value;
        break;
      }
  
      while(inputDeRelato.value === inputRelato.item(0).value) {
        inputDeRelato.value = `Feito contato com funcionário <b>${inputFuncionario.value}</b> , que informa estar sem anormalidades.`;
        break;
      } 
  
     montaRelatorio(arrayParaValidar, divAbaixoDoRelatorio);
     relatorio.appendChild(divAbaixoDoRelatorio);  
     criarBotaoCopiar(divBtnCopy);
    }
  }

//Adiciona o relatorio
function geraRelatorio () {
    let funcionarioNoLocal = inputFuncionario.value;
  
    let inputUnidadeChecada = document.querySelector('input[name="unidade"]:checked');

    let inputRelatoChecado = document.querySelector('input[name="relato"]:checked');
    
    let inputTodosArray = new Array(inputUnidadeChecada, inputHora, inputZona, inputRelatoChecado);
  
    const divFilhaDoRelatorio = document.createElement('div'); 
 
    validaDados(inputTodosArray, divFilhaDoRelatorio, inputRelatoChecado, inputUnidadeChecada, funcionarioNoLocal);
  
}

//Reseta toda a página
function limpaPagina (){
    btnReset.disabled = true;
    verificaLista(relatorio);
    verificaLista(divBtnCopy)
}

btnGerador.addEventListener('click', geraRelatorio);

btnGerador.addEventListener('click', habilitaLimpaPagina);

btnReset.addEventListener('click', limpaPagina);