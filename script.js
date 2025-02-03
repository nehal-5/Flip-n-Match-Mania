document.addEventListener("DOMContentLoaded", () => {
    const emojis = ["😎", "😘", "😳", "❤️", "😂", "😁", "🥰", "😍", "😉", "😏"]; // Emoji List
    const emojisPairs = [...emojis, ...emojis]; // Duplicate for matching pairs

    const gameBoard = document.getElementById("game-board");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");
    const restartBtn = document.getElementById("restart-btn");

    let score = 0;
    let timer = 0;
    let flippedCards = [];
    let matchedCards = [];
    let timerInterval;
    let gameStarted = false;

    // Function to shuffle array using Fisher-Yates algorithm
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Function to create a card
    function createCard(emoji) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.emoji = emoji; // Store emoji in dataset for easy access
        card.addEventListener("click", flipCard);

        const cardInner = document.createElement("div");
        cardInner.classList.add("card-inner");

        const cardFront = document.createElement("div");
        cardFront.classList.add("card-front");

        const cardBack = document.createElement("div");
        cardBack.classList.add("card-back");
        cardBack.textContent = emoji;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        gameBoard.appendChild(card);
    }

    // Start timer when first card is clicked
    function startTimer() {
        if (!gameStarted) {
            gameStarted = true;
            timerInterval = setInterval(() => {
                timer++;
                timerDisplay.textContent = `Time: ${timer}s`;
            }, 1000);
        }
    }

    // Function to flip a card
    function flipCard() {
        if (!gameStarted) startTimer(); // Start timer on first move
        if (flippedCards.length >= 2 || this.classList.contains("flip") || matchedCards.includes(this)) return; // Prevent unnecessary clicks

        this.classList.add("flip");
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 700);
        }
    }

    // Function to check if two flipped cards match
    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.emoji === card2.dataset.emoji) {
            matchedCards.push(card1, card2);
            card1.removeEventListener("click", flipCard);
            card2.removeEventListener("click", flipCard);
            score += 10;
            scoreDisplay.textContent = `Score: ${score}`;

            if (matchedCards.length === emojisPairs.length) {
                endGame();
            }
        } else {
            card1.classList.remove("flip");
            card2.classList.remove("flip");
        }
        flippedCards = [];
    }

    // Function to restart the game
    function restartGame() {
        clearInterval(timerInterval); // Stop the timer
        gameBoard.innerHTML = ""; // Clear existing cards
        flippedCards = [];
        matchedCards = [];
        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        timer = 0;
        gameStarted = false;
        timerDisplay.textContent = `Time: ${timer}s`;
        startGame();
    }

    // Function to end the game
    function endGame() {
        clearInterval(timerInterval);
        setTimeout(() => {
            alert(`🎉 Congratulations! You completed the game in ${timer} seconds!`);
        }, 500);
    }

    // Function to initialize the game
    function startGame() {
        shuffle(emojisPairs);
        emojisPairs.forEach(createCard);
    }

    restartBtn.addEventListener("click", restartGame);

    // Start the game when the page loads
    startGame();
});
