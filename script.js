const Valid_Plays = Object.freeze({
  ROCK: "Rock",
  PAPER: "Paper",
  SCISSORS: "Scissors",
})

const Play_Definitions = Object.freeze({
  [Valid_Plays.ROCK]: {
    id: Valid_Plays.ROCK,
    wins: Valid_Plays.SCISSORS,
    loses: Valid_Plays.PAPER,
    icon: "&#9994;",
  },
  [Valid_Plays.PAPER]: {
    id: Valid_Plays.PAPER,
    wins: Valid_Plays.ROCK,
    loses: Valid_Plays.SCISSORS,
    icon: "&#9995;",
  },
  [Valid_Plays.SCISSORS]: {
    id: Valid_Plays.SCISSORS,
    wins: Valid_Plays.PAPER,
    loses: Valid_Plays.ROCK,
    icon: "&#9996;",
  },
})

const game = {
  validPlays: [
    Play_Definitions[Valid_Plays.ROCK],
    Play_Definitions[Valid_Plays.PAPER],
    Play_Definitions[Valid_Plays.SCISSORS],
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

  if (userPlay.wins == pcPlay.id) {
    increasePlayerScore()
    result = "Player wins"
  } else if (userPlay.loses == pcPlay.id) {
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
