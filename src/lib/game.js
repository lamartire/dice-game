import { random, round } from 'lodash'
import md5 from 'md5'

export class Game {
  constructor() {
    this.balance = 100
    this.number = null
    this.hash = null
    this.played = false
    this.history = []
  }

  startNew() {
    this.played = false
    this.number = this.generateNumber()
    this.hash = this.generateHash(this.number)
  }

  generateNumber() {
    return random(0, 100)
  }

  setBalance(amount) {
    this.balance = amount
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

    let betResult = false

    this.played = true

    if (destination === 'lo' && this.number < number && number > 0) {
      this.processBet(number, amount, destination)

      betResult = true
    } else if (destination === 'hi' && this.number > number) {
      this.processBet(number, amount, destination)

      betResult = true
    } else {
      this.withdrawBetAmount(amount)
    }

    this.createHistoryEntry(number, amount, betResult)

    return betResult
  }

  processBet(number, amount, destination) {
    const { payout } = this.calculateForecast(number, destination)

    this.balance = this.balance + amount * payout
  }

  withdrawBetAmount(amount) {
    this.balance = this.balance - amount
  }

  createHistoryEntry(number, amount, result) {
    this.history.push({
      number: number,
      amount: amount,
      result: `${this.number} ${result ? 'WIN' : 'LOSE'}`,
      hash: this.hash,
      total: this.balance,
    })
  }

  betMultiple(number, amount, destination, iterations) {
    let i = 0

    while (i < iterations) {
      this.makeBet(number, amount, destination)
      this.startNew()
      i++
    }
  }
}
