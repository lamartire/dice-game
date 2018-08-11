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

  it('processBet: increase user balance by amount * payout', () => {
    const game = new Game()

    game.processBet(10, 50, 'lo')

    expect(game.balance).toEqual(600)
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

    it('calls process bet if player won', () => {
      game.number = 50
      game.makeBet(10, 50, 'lo')

      expect(game.balance).toEqual(600)
    })
  })

  it('withdrawBetAmount: descrease player balance by bet amount', () => {
    const game = new Game()

    game.withdrawBetAmount(20)

    expect(game.balance).toEqual(80)
  })
})
