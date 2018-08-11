import { random, round } from 'lodash'
import md5 from 'md5'

export class Game {
  constructor() {
    this.balance = 100
    this.number = null
    this.hash = null
    this.played = false
  }

  startNew() {
    this.played = false
    this.number = this.generateNumber()
    this.hash = this.generateHash(this.number)
  }

  generateNumber() {
    return random(0, 100)
  }

  takeFreeCredits() {
    if (this.balance > 0) {
      throw new Error('Free credits avilable only if balance equals to 0!')
    }

    this.balance = 100
  }

  calculateForecast(number, destination) {
    const chance = destination === 'hi' ? 100 - number : number

    return {
      chance,
      payout: round(100 / chance, 2),
    }
  }

  generateHash(number) {
    return md5(number)
  }

  validateHash(hash) {
    return this.hash === hash
  }

  makeBet(number, amount, destination) {
    if (amount > this.balance) {
      throw new Error('Amount of bet must not be more than user balance!')
    } else if (amount <= 0) {
      throw new Error('Amount of bet musy be more than 0!')
    }

    if (number >= 100) {
      throw new Error('Number must not be more than 100!')
    } else if (number <= 0) {
      throw new Error('Number must not be less than 1!')
    }

    this.played = true

    if (destination === 'lo' && this.number >= number) {
      this.processBet(number, amount, destination)

      return true
    } else if (destination === 'hi' && this.number <= number) {
      this.processBet(number, amount, destination)

      return true
    } else {
      this.withdrawBetAmount(number, amount)

      return false
    }
  }

  processBet(number, amount, destination) {
    const { payout } = this.calculateForecast(number, destination)

    this.balance = this.balance + amount * payout
  }

  withdrawBetAmount(amount) {
    this.balance = this.balance - amount
  }
}
