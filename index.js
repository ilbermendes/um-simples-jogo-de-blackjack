let cards = [];
let banca = [];
let hasBlackJack = false;
let isAlive = false;
let gameStarter = true;
let jogadorTotal = 0;
let bancaTotal = 0;
let podeApostar = false;


let message = "";
let messageEl = document.querySelector("#message-el");
let cartasEl = document.querySelector("#cards-el");
let totalEl = document.querySelector("#total-el");
let bancaEl = document.querySelector("#banca-el");

function startGame() {
    
    if (gameStarter === true) {

        isAlive = true;
        podeApostar = true;

        let firstCard = getRandomCard();
        let secondCard =  getRandomCard();
        cards = [firstCard, secondCard];
        jogadorTotal = firstCard + secondCard;

        let bancaFirstCard = getRandomCard();
        let bancaSecondCard = getRandomCard();
        banca = [bancaFirstCard, bancaSecondCard];
        bancaTotal = bancaFirstCard + bancaSecondCard;
        renderGame();
        gameStarter = false;
    }
}

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    if (randomNumber === 1) {
        return 11;
    } else if (randomNumber > 10) {
        return 10;
    } else {
        return randomNumber;
    }
}

function renderGame() {
    cartasEl.textContent = "Cartas: ";
    for (let i = 0; i < cards.length; i++) {
        cartasEl.textContent += cards[i] + ", ";
    }

    totalEl.textContent = "Total: " + jogadorTotal;
    if (jogadorTotal <= 20) {
        message = "Gostaria de tirar uma nova carta?";   
    } else if (jogadorTotal === 21) {
        message = "Você venceu! Blackjack!";
        hasBlackJack = true;
    } else {
        message = "Que pena! Você perdeu!";
        isAlive = false;
    }

    messageEl.textContent = message;

}

function drawCard() {
    if (isAlive === true && hasBlackJack === false && podeApostar === true) {
        let nextCard =  getRandomCard();
        jogadorTotal += nextCard;
        cards.push(nextCard);
        let bancaNextCard = getRandomCard();
        bancaTotal += bancaNextCard;
        banca.push(bancaNextCard);
        renderGame();
    }
}

function apostar() {
    if (podeApostar === true && hasBlackJack === false && isAlive === true) {
        if (bancaTotal > 21) {
            message = "Você venceu!"
            podeApostar = false;
        } else if (jogadorTotal > bancaTotal) {
            message = "Você venceu!"
            podeApostar = false;
        } else if (jogadorTotal < bancaTotal) {
            message = "Você perdeu!"
            podeApostar = false;
        } else {
            message = "Empate! Ninguém venceu!"
            podeApostar = false;
        }
        messageEl.textContent = message;
        bancaEl.textContent = "Banca: " + bancaTotal;
    }
}

