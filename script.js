const game = {
  validPlays: [
    { name: "Rock", wins: "Scissors", loses: "Paper", icon: "&#9994;" },
    { name: "Paper", wins: "Rock", loses: "Scissors", icon: "&#9995;" },
    { name: "Scissors", wins: "Paper", loses: "Rock", icon: "&#9996;" },
  ],
  playerScore: 0,
  pcScore: 0,
  currentRound: 0,
}

const roundParagraph = document.querySelector("#round span")
const playerScoreParagraph = document.querySelector("#player-score span")
const pcScoreParagraph = document.querySelector("#pc-score span")
const matchResult = document.querySelector("#match-result")

matchResult.addEventListener("animationend", (ev) => {
  matchResult.style.animationName = ""
})

const increasePlayerScore = () => game.playerScore++
const increasePcScore = () => game.pcScore++

function play(userPlayIndex) {
  const userPlayDiv = document.querySelector("#user-side .play")
  userPlayDiv.classList.remove("awaiting")
  const pcPlayDiv = document.querySelector("#pc-side .play")
  pcPlayDiv.classList.remove("awaiting")
  const pcPlayIndex = Math.floor(Math.random() * game.validPlays.length)

  userPlay = game.validPlays[userPlayIndex]
  pcPlay = game.validPlays[pcPlayIndex]

  userPlayDiv.innerHTML = userPlay.icon
  pcPlayDiv.innerHTML = pcPlay.icon

  checkWinner(userPlay, pcPlay)
  updateGame()
}

function checkWinner(userPlay, pcPlay) {
  let result
  
  if (userPlay.wins == pcPlay.name) {
    increasePlayerScore()
    result = "Player wins"
  } else if (userPlay.loses == pcPlay.name) {
    increasePcScore()
    result = "Player loses"
  } else {
    result = "Draw"
  }

  displayResult(result)
}

function updateGame() {
  game.currentRound++
  roundParagraph.innerHTML = game.currentRound
  playerScoreParagraph.innerHTML = game.playerScore
  pcScoreParagraph.innerHTML = game.pcScore
}

function displayResult(result) {
  matchResult.innerHTML = result
  matchResult.style.animationName = "shake"
}
