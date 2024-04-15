
document.addEventListener('DOMContentLoaded', () => {
    const emojis = ['😎', '😘', '😳', '❤️', '😂', '😁', '🥰', '😍', '😉', '😏'] // You can add more emojis if needed

    // Duplicate the emojis array to create pairs
    const emojisPairs = [...emojis, ...emojis];

    const gameBoard = document.getElementById('game-board');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const restartBtn = document.getElementById('restart-btn');

    let score = 0;
    let timer = 0;
    let timerInterval;
    let flippedCards = [];
    let matchedCards = [];
    let timerStarted = false;

    // Function to create card HTML
    function createCard(emoji) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
        cardInner.dataset.emoji = emoji;
        cardInner.addEventListener('click', flipCard);

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.textContent = emoji;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardDiv.appendChild(cardInner);
        gameBoard.appendChild(cardDiv);
    }

    // Function to shuffle cards
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Function to start timer
    function startTimer() {
        timerInterval = setInterval(() => {
            timer++;
            timerDisplay.textContent = `Time: ${timer}s`;
        }, 1000);
    }

    // Function to flip card
    function flipCard() {
        if (!timerStarted) {
            startTimer();
            timerStarted = true;
        }
        if (flippedCards.length < 2 && !this.classList.contains('flip')) {
            this.classList.add('flip');
            this.querySelector('.card-back').style.display = 'block';
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }
    }

    // Function to check if cards match
    function checkMatch() {
        const [card1, card2] = flippedCards;
        const emoji1 = card1.dataset.emoji;
        const emoji2 = card2.dataset.emoji;

        if (emoji1 === emoji2) {
            card1.removeEventListener('click', flipCard);
            card2.removeEventListener('click', flipCard);
            matchedCards.push(card1, card2);
            score += 10;
            scoreDisplay.textContent = `Score: ${score}`;

            if (matchedCards.length === emojisPairs.length) {
                endGame();
            }
        } else {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            card1.querySelector('.card-back').style.display = 'none';
            card2.querySelector('.card-back').style.display = 'none';
        }

        flippedCards = [];
    }

    // Function to restart game
    function restartGame() {
        clearInterval(timerInterval);
        gameBoard.innerHTML = '';
        matchedCards = [];
        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        timer = 0;
        timerStarted = false;
        timerDisplay.textContent = `Time: ${timer}s`;
        startGame();
    }

    // Function to end game
    function endGame() {
        clearInterval(timerInterval);
        alert('Congratulations! You completed the game in ' + timer + ' seconds!');
    }

    // Function to initialize game
    function startGame() {
        shuffle(emojisPairs);
        emojisPairs.forEach(createCard);
    }

    // Event listener for restart button
    restartBtn.addEventListener('click', restartGame);

    // Start the game
    startGame();
});

