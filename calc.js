const display = document.getElementById('display')
const displayText = document.getElementById('display').textContent
const igual = document.getElementById('igual')
const apagar = document.getElementById('apagar')
const maismenos = document.getElementById('maismenos')
const limparTudo = document.getElementById('limparTudo')
const porc = document.getElementById('porc')
const virg = document.getElementById('virg')


const nums = document.querySelectorAll("[id*=num]")
const operadores = document.querySelectorAll("[id*=sinal]")

let primeiro = true
let operador
let numeroAnterior
let numeroAtual
let apagarIgual

const ajustaPontoVirgula = () => display.textContent = display.textContent.replace('.', ',')

const inserirDisplay = text => {

  if (primeiro) {
    display.textContent = text
    primeiro = false
  } else {
    display.textContent += text
  }

  display.textContent = display.textContent.substring(0, 17)
  numeroAtual = display.textContent
  apagarIgual = true
}

const inserir = e => inserirDisplay(e.target.textContent)

nums.forEach(e => e.addEventListener('click', inserir))


const inserirOperador = e => {
  primeiro = true
  operador = e.target.textContent
  if (operador == 'x') {
    operador = '*'
  } else if (operador == '÷') {
    operador = '/'
  }
  numeroAnterior = display.textContent
}

operadores.forEach(e => e.addEventListener('click', inserirOperador))

const calcular = () => {

  if (numeroAnterior && operador) {
    let result = numeroAnterior + operador

    if(numeroAtual) {
      result += numeroAtual
    } else {
      result += numeroAnterior
    }

    display.textContent = eval(result.replace(',', '.'))
    ajustaPontoVirgula()

    if (display.textContent == 'NaN') {
      display.textContent = '0'
    }

    numeroAnterior = display.textContent
    primeiro = true
    apagarIgual = false
  }
}

igual.addEventListener('click', calcular)

const apagarUltimo = () => {
  if (apagarIgual) {
    if (display.textContent.length > 1) {
      display.textContent = display.textContent.slice(0, -1)
    } else {
      display.textContent = 0
    }
    
    primeiro = true
  }
}

apagar.addEventListener('click', apagarUltimo)

const inverteSinal = () => {
  display.textContent = parseFloat(display.textContent.replace(',', '.')) * -1
  ajustaPontoVirgula()
}

maismenos.addEventListener('click', inverteSinal)



const limpaTudo = () => {
  display.textContent = '0'
  numeroAnterior = '0'
  numeroAtual = '0'
  primeiro = true
}

limparTudo.addEventListener('click', limpaTudo)

const calcPorc = () => {
  display.textContent = parseFloat(display.textContent.replace(',', '.')) / 100
  ajustaPontoVirgula()
  numeroAtual
  primeiro = true
}

porc.addEventListener('click', calcPorc)
