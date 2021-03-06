import { Game } from '../game'

describe('pure methods', () => {
  const game = new Game()

  it('generateNumber: returns random number between 0 and 100', () => {
    const randomNumber = game.generateNumber()

    expect(randomNumber >= 0 && randomNumber <= 100).toBeTruthy()
  })

  it('generateHash: generates hash on given number', () => {
    expect(game.generateHash(1)).toEqual(expect.any(String))
  })

  it('validateHash: validate hash with current game hash', () => {
    expect()
  })

  describe('calculateForecast: returns expected chance and payout', () => {
    it('Bet 50 Hi Chance of Winning: 50% Payout: 2x ', () => {
      expect(game.calculateForecast(50, 'hi')).toMatchSnapshot()
    })

    it('Bet 50 Lo Chance of Winning: 50% Payout: 2x ', () => {
      expect(game.calculateForecast(50, 'lo')).toMatchSnapshot()
    })

    it('Bet 1 Lo Chance of Winning 1% Payout: 100x', () => {
      expect(game.calculateForecast(1, 'lo')).toMatchSnapshot()
    })

    it('Bet 99 Hi Chance of Winning 1% Payout: 100x', () => {
      expect(game.calculateForecast(99, 'hi')).toMatchSnapshot()
    })

    it('Bet 1 Hi Chance of Winning 99% Payout: 1.01x', () => {
      expect(game.calculateForecast(1, 'hi')).toMatchSnapshot()
    })

    it('Bet 100 Lo Chance of Winning 99% Payout: 1.01x', () => {
      expect(game.calculateForecast(99, 'lo')).toMatchSnapshot()
    })

    it('Bet 10 Hi Chance of Winning 90% Payout: 1.11x', () => {
      expect(game.calculateForecast(10, 'hi')).toMatchSnapshot()
    })

    it('Bet 10 Lo Chance of Winning 10% Payout: 10x', () => {
      expect(game.calculateForecast(10, 'lo')).toMatchSnapshot()
    })
  })
})

describe('methods with side-effects', () => {
  it('setBalance: changes balance with given value', () => {
    const game = new Game()

    game.setBalance(200)

    expect(game.balance).toEqual(200)
  })

  it('processBet: increase user balance by amount * payout', () => {
    const game = new Game()

    game.processBet(10, 50, 'lo')

    expect(game.balance).toEqual(600)
  })

  it('withdrawBetAmount: descrease player balance by bet amount', () => {
    const game = new Game()

    game.withdrawBetAmount(20)

    expect(game.balance).toEqual(80)
  })

  it('createHistoryEntry: creates history entry in game history with given parameters', () => {
    const game = new Game()

    game.startNew()
    game.createHistoryEntry(1, 10, true)

    expect(game.history[0]).toMatchSnapshot({
      hash: expect.any(String),
      result: expect.any(String),
    })
  })

  describe('takeFreeCredits', () => {
    const game = new Game()

    it('throws if player balance not equals to 0', done => {
      try {
        game.takeFreeCredits()
      } catch (err) {
        done()
      }
    })

    it('gives free 100 credits to user', () => {
      game.balance = 0
      game.takeFreeCredits()

      expect(game.balance).toEqual(100)
    })
  })

  describe('startNew', () => {
    const game = new Game()

    it('sets number and hash', () => {
      game.startNew()

      expect(game.number).not.toBeNull()
      expect(game.hash).not.toBeNull()
    })

    it('generated hash can be validated by validateHash', () => {
      expect(game.validateHash(game.hash)).toBeTruthy()
    })
  })

  describe('makeBet', () => {
    const game = new Game()

    it('throws if amount more than balance', done => {
      try {
        game.makeBet(1, 200, 'lo')
      } catch (err) {
        done()
      }
    })

    it('throws if amount less or equals to 0', done => {
      try {
        game.makeBet(1, 0, 'lo')
      } catch (err) {
        done()
      }
    })

    it('throws if number more or equals to 100', done => {
      try {
        game.makeBet(100, 10, 'lo')
      } catch (err) {
        done()
      }
    })

    it('throws if number less or equals to 0', done => {
      try {
        game.makeBet(0, 10, 'lo')
      } catch (err) {
        done()
      }
    })

    it('withdraw amount if player lost and returns false', () => {
      const game = new Game()

      game.number = 50

      const betRes = game.makeBet(50, 10, 'lo')

      expect(game.balance).toEqual(90)
      expect(betRes).toBeFalsy()
    })

    it('add amount if player win and returns true', () => {
      const game = new Game()

      game.number = 50

      const betRes = game.makeBet(49, 10, 'hi')

      expect(game.balance).toEqual(119.6)
      expect(betRes).toBeTruthy()
    })
  })

  describe('betMultiple', () => {
    it('makes bets balance not equals 0 or iteration count left', () => {
      const game = new Game()

      game.betMultiple(1, 1, 'lo', 3)

      expect(game.history).toHaveLength(3)
    })
  })
})
