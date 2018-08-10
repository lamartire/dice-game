import { times } from 'lodash/fp'
import { Dice } from '../dice'

describe('Dice game', () => {
  describe('initialization and instance specification', () => {
    it('creates instance of Dice', () => {
      expect(new Dice()).toBeInstanceOf(Dice)
    })

    it('by default creates with 5 rounds', () => {
      expect(new Dice().rounds).toMatchSnapshot()
    })
  })

  describe('common methods', () => {
    const dice = new Dice()

    it('creates new player with given name', () => {
      expect(dice.createPlayer('Foo')).toMatchSnapshot()
    })

    it('throws dices and returns result', () => {
      expect(dice.throwDices()).toEqual([
        expect.any(Number),
        expect.any(Number),
      ])
    })
  })

  describe('game process', () => {
    it('creates new player with given name and stores it', () => {
      const dice = new Dice()

      dice.addPlayer('Foo')

      expect(dice.players).toMatchSnapshot()
    })

    it('throws if already added two players', done => {
      try {
        const dice = new Dice()

        dice.addPlayer('Foo')
        dice.addPlayer('Bar')
        dice.addPlayer('Baz')
      } catch (err) {
        done()
      }
    })

    it('throws error if player with passed name already added', done => {
      try {
        const dice = new Dice()

        dice.addPlayer('Foo')
        dice.addPlayer('Foo')
      } catch (err) {
        done()
      }
    })

    it('after adding first player makes him as current', () => {
      const dice = new Dice()

      expect(dice.currentPlayer).toBeNull()

      dice.addPlayer('Foo')

      expect(dice.currentPlayer).not.toBeNull()
      expect(dice.currentPlayer).toMatchSnapshot()
    })

    it('move queue to next player, after last player increments round', () => {
      const dice = new Dice()

      dice.addPlayer('Foo')

      const lastPlayer = { ...dice.currentPlayer }

      dice.addPlayer('Bar')
      dice.moveQueue()

      expect(dice.currentPlayer).not.toMatchObject(lastPlayer)

      dice.moveQueue()

      expect(dice.currentPlayer).toMatchObject(lastPlayer)
      expect(dice.round).toEqual(2)
    })

    it('adds result of throwing to currentPlayer and makes as current next player', () => {
      const dice = new Dice()

      dice.addPlayer('Foo')
      dice.addPlayer('Bar')
      dice.turn()

      const [player1, player2] = dice.players

      expect(dice.currentPlayer).toMatchObject(player2)
      expect(player1.throws).toHaveLength(1)
    })

    it('launches next round after throw of last player', () => {
      const dice = new Dice()

      dice.addPlayer('Foo')
      dice.addPlayer('Bar')
      dice.turn()
      dice.turn()

      expect(dice.round).toEqual(2)
    })

    it('stops game after throw of last player in final round and marks someone as winner', () => {
      const dice = new Dice()

      dice.addPlayer('Foo')
      dice.addPlayer('Bar')
      times(() => dice.turn(), 5 * 2)

      expect(dice.winner).not.toBeNull()
    })
  })
})
