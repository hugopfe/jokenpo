/*
“o que é regra do jogo?”
“o que é estado?”
“o que é interface?”
*/

class Game {
  static Play_Order = Object.freeze(["ROCK", "PAPER", "SCISSORS"])

  static Play_Definitions = Object.freeze({
    ROCK: {
      id: "ROCK",
      wins: "SCISSORS",
      loses: "PAPER",
      icon: "&#9994;",
    },
    PAPER: {
      id: "PAPER",
      wins: "ROCK",
      loses: "SCISSORS",
      icon: "&#9995;",
    },
    SCISSORS: {
      id: "SCISSORS",
      wins: "PAPER",
      loses: "ROCK",
      icon: "&#9996;",
    },
  })

  constructor() {
    this.state = {
      playerScore: 0,
      pcScore: 0,
      currentRound: 0,
    }
  }

  /**
   * Handles players choices (user and PC)
   */
  play(userChoice) {
    const userPlay = Game.Play_Definitions[userChoice]
    const pcPlay = this.getRandomPlay()
    const result = this.resolveRound(userPlay, pcPlay)

    this.render(userPlay, pcPlay, result)
  }

  /*
   * Returns a random valid play
   */
  getRandomPlay() {
    const randomIndex = Math.floor(Math.random() * Game.Play_Order.length)
    console.log(Game.Play_Definitions[Game.Play_Order[randomIndex]])
    
    return Game.Play_Definitions[Game.Play_Order[randomIndex]]
  }

  /**
   * Verify who is the winner
   */
  resolveRound(userPlay, pcPlay) {
    this.state.currentRound++

    if (userPlay.wins === pcPlay.id) {
      this.state.playerScore++
      return "Player wins"
    } else if (userPlay.loses === pcPlay.id) {
      this.state.pcScore++
      return "Player loses"
    }

    return "Draw"
  }

  /**
   * Update the interface with game state
   */
  render(userPlay, pcPlay, result) {
    document.querySelector("#round span").textContent = this.state.currentRound
    document.querySelector("#player-score span").textContent =
      this.state.playerScore
    document.querySelector("#pc-score span").textContent = this.state.pcScore

    const userPlayDiv = document.querySelector("#user-side .play")
    userPlayDiv.classList.remove("awaiting")

    const pcPlayDiv = document.querySelector("#pc-side .play")
    pcPlayDiv.classList.remove("awaiting")

    userPlayDiv.innerHTML = userPlay.icon
    pcPlayDiv.innerHTML = pcPlay.icon

    const matchResult = document.querySelector("#match-result")
    matchResult.textContent = result
    matchResult.style.animationName = "shake"
  }

  /**
   * Resets the match
   */
  reset() {}
}

const matchResult = document.querySelector("#match-result")

matchResult.addEventListener("animationend", () => {
  matchResult.style.animationName = ""
})

const game = new Game()
