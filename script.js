let canvas = document.getElementById("snake");
let contexto = canvas.getContext("2d");
let caixa = 32;
let snake = [];
snake[0] = {
    x: 8 * caixa,
    y: 8 * caixa
}

let direcao = "direita";

let comida = {
    x: Math.floor(Math.random() * 15 + 1) * caixa,
    y: Math.floor(Math.random() * 15 + 1) * caixa
}

function criarFundo() {
    contexto.fillStyle = "lightgreen";
    contexto.fillRect(0, 0, 16 * caixa, 16 * caixa);
}

function criarCobrinha() {
    for (let i = 0; i < snake.length; i++) {
        contexto.fillStyle = "green";
        contexto.fillRect(snake[i].x, snake[i].y, caixa, caixa);
    }
}

function desenharComida() {
    contexto.fillStyle = 'red';
    contexto.fillRect(comida.x, comida.y, caixa, caixa);
}

document.addEventListener('keydown', atualizarDirecao);

function atualizarDirecao(evento) {
    if (evento.keyCode == 37 && direcao != 'direita') direcao = 'esquerda';
    if (evento.keyCode == 38 && direcao != 'baixo') direcao = 'cima';
    if (evento.keyCode == 39 && direcao != 'esquerda') direcao = 'direita';
    if (evento.keyCode == 40 && direcao != 'cima') direcao = 'baixo';
}

function iniciarJogo() {
    if (snake[0].x > 15 * caixa && direcao == "direita") snake[0].x = 0;
    if (snake[0].x < 0 && direcao == "esquerda") snake[0].x = 16 * caixa;
    if (snake[0].y > 15 * caixa && direcao == "baixo") snake[0].y = 0;
    if (snake[0].y < 0 && direcao == "cima") snake[0].y = 16 * caixa;

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert('Fim de jogo!');
        }
    }
    criarFundo();
    criarCobrinha();
    desenharComida();

    let cobraX = snake[0].x;
    let cobraY = snake[0].y;

    if (direcao == "direita") cobraX += caixa;
    if (direcao == "esquerda") cobraX -= caixa;
    if (direcao == "cima") cobraY -= caixa;
    if (direcao == "baixo") cobraY += caixa;

    if (cobraX != comida.x || cobraY != comida.y) {
        snake.pop();
    } else {
        comida.x = Math.floor(Math.random() * 15 + 1) * caixa;
        comida.y = Math.floor(Math.random() * 15 + 1) * caixa;
    }

    let novaCabeca = {
        x: cobraX,
        y: cobraY
    }

    snake.unshift(novaCabeca);
}

let jogo = setInterval(iniciarJogo, 100);
