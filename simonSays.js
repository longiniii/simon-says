let simonSaid = document.getElementById('simon-said')
let saidWhatId;
let saidThis;
let highestScore = document.getElementById('highest-score')
let currentScore = document.getElementById('current-score')
let brightnesTimeout;
let gameStarted;
let userInput = []
let pcInput = []
let cycleCounter = 0
let starterAndCounter = document.getElementById('starter-and-counter')
let starter = document.getElementById('starter')
let usersTimeToSay;
let audio0 = new Audio('./audio/audio0.mp3')
let audio1 = new Audio('/audio/audio1.mp3')
let audio2 = new Audio('/audio/audio2.mp3')
let audio3 = new Audio('/audio/audio3.mp3')
let gameStart = () => {
    if (!gameStarted) {
        gameStarted = true
        starterAndCounter.style.cursor = 'default'
        starter.innerText = cycleCounter
        cycleCounter++;
        starter.innerText = cycleCounter;
        setTimeout(pcSaidWhat, 200);
    }
}
let pcSaidWhat = () => {
    let pcSaidWhat = Math.round(Math.random() * 3);
    pcInput.push(pcSaidWhat);
    pcInput.forEach((n, index) => {
        setTimeout(() => { //chatgpt helped set this one timeout
            let color;
            if (n == 0) {
                audio0.currentTime = 0;
                audio0.play();
                color = document.getElementById(`simon-said-${n}`);
            }
            if (n == 1) {
                audio1.currentTime = 0;
                audio1.play();
                color = document.getElementById(`simon-said-${n}`);
            }
            if (n == 2) {
                audio2.currentTime = 0;
                audio2.play();
                color = document.getElementById(`simon-said-${n}`);
            }
            if (n == 3) {
                audio3.currentTime = 0;
                audio3.play();
                color = document.getElementById(`simon-said-${n}`);
            }
            color.style.filter = 'brightness(1)';
            brightnesTimeout = () => {
                color.style.filter = 'brightness(0.4)';
            };
            setTimeout(brightnesTimeout, 400);
        }, index * 500);
    });
    usersTimeToSay = true;
};
let userSaidWhat = (color) => {
    if (usersTimeToSay) {
        let iSaidWhat = Number(color.id.slice(11))
        userInput.push(iSaidWhat)
        if (iSaidWhat == 0) {
            audio0.currentTime = 0;
            audio0.play()
        }
        if (iSaidWhat == 1) {
            audio1.currentTime = 0;
            audio1.play()
        }
        if (iSaidWhat == 2) {
            audio2.currentTime = 0;
            audio2.play()
        }
        if (iSaidWhat == 3) {
            audio3.currentTime = 0;
            audio3.play()
        }
        color.style.filter = 'brightness(1)'
        brightnesTimeout = () => {
            color.style.filter = 'brightness(0.4)';
        }
        setTimeout(brightnesTimeout, 400)
        if (userInput[userInput.length - 1] !== pcInput[userInput.length - 1]) {
            pcInput = []
            userInput = []
            gameStarted = false
            starter.innerText = 'start!'
            usersTimeToSay = false
            starterAndCounter.style.cursor = 'pointer'
            cycleCounter = 0
            currentScore.innerText = 0
        } else if (userInput.length == pcInput.length) {
            usersTimeToSay = false
            userInput = []
            starterAndCounter.style.border = '4px solid var(--theme-secondary)'
            starterAndCounterBorderTimeout = () => {
                starterAndCounter.style.border = '4px solid var(--theme-primary)'
            }
            setTimeout(starterAndCounterBorderTimeout, 400);
            cycleCounter++;
            currentScore.innerText = cycleCounter - 1;
            if (highestScore.innerText < currentScore.innerText) highestScore.innerText = currentScore.innerText
            starter.innerText = cycleCounter;
            setTimeout(pcSaidWhat, 700);
            console.log('txa')
        }
    }
}