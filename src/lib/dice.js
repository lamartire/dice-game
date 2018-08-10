import {
  isEqual,
  random,
  times,
  find,
  pick,
  sum,
  map,
  flatMap,
} from 'lodash/fp'

/**
 *
 */
export class Dice {
  constructor(rounds = 5) {
    this.rounds = rounds
    this.round = 1
    this.players = []
    this.currentPlayer = null
  }

  get state() {
    return pick(['players', 'round', 'currentPlayer', 'winner'], this)
  }

  get winner() {
    const [playerA, playerB] = this.players
    const isGameFinished = this.round > this.rounds

    if (!isGameFinished) {
      return null
    }

    const playerAScore = this.getThrowsSum(playerA.throws)
    const playerBScore = this.getThrowsSum(playerB.throws)

    if (playerAScore > playerBScore) {
      return {
        ...playerA,
        score: playerAScore,
      }
    }

    return {
      ...playerB,
      score: playerBScore,
    }
  }

  getThrowsSum(throws) {
    return sum(flatMap(values => sum(values), throws))
  }

  createPlayer(name) {
    return {
      name: name,
      throws: [],
    }
  }

  addPlayer(name) {
    if (this.players.length === 2) {
      throw new Error('Only two players can playing at one time')
    } else if (find(player => isEqual(player.name, name), this.players)) {
      throw new Error(`Player with ${name} already added!`)
    }

    const newPlayer = this.createPlayer(name)

    if (!this.currentPlayer) {
      this.currentPlayer = newPlayer
    }

    this.players.push(newPlayer)
  }

  throwDices() {
    return times(() => random(1, 6), 2)
  }

  moveQueue() {
    const [playerA, playerB] = this.players

    if (isEqual(this.currentPlayer, playerA)) {
      this.currentPlayer = playerB
    } else {
      this.currentPlayer = playerA
      this.round += 1
    }
  }

  turn() {
    const result = this.throwDices()

    this.currentPlayer.throws.push(result)
    this.moveQueue()

    return this.state
  }
}
