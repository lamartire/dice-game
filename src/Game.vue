<script>
import {
  BetForm,
  TurnResult,
  Hash,
  Forecast,
  HashValidator,
  Player,
  History,
  BetBot,
} from 'components'
import { Game } from 'lib/game'

export default {
  components: {
    BetForm,
    Player,
    TurnResult,
    Hash,
    HashValidator,
    Forecast,
    History,
    BetBot,
  },

  data: () => ({
    storageKey: 'dice-game:balance',
    game: null,
    number: 50,
    amount: 10,
    validatingHash: false,
    winner: false,
  }),

  computed: {
    played() {
      return this.game.played
    },

    hash() {
      return this.game.hash
    },

    balance() {
      return this.game.balance
    },

    loForecast() {
      return this.game.calculateForecast(this.number, 'lo')
    },

    hiForecast() {
      return this.game.calculateForecast(this.number, 'hi')
    },

    history() {
      return this.game.history
    },
  },

  created() {
    const lastPlayerBalance = this.loadPlayerBalance()

    this.game = new Game()
    this.game.startNew()

    if (lastPlayerBalance) {
      this.game.setBalance(lastPlayerBalance)
    }
  },

  methods: {
    loadPlayerBalance() {
      const balance = localStorage.getItem(this.storageKey)

      return balance ? parseInt(balance) : null
    },

    savePlayerBalance() {
      localStorage.setItem(this.storageKey, this.balance)
    },

    onStartValidate() {
      this.validatingHash = true
    },

    onFinishValidate() {
      this.validatingHash = false
    },

    onChangeBetForm({ amount, number }) {
      Object.assign(this, {
        amount,
        number,
      })
    },

    onBet(type) {
      const { number, amount, game } = this

      this.winner = game.makeBet(number, amount, type)
      this.savePlayerBalance()
    },

    onLoadRequest() {
      this.game.takeFreeCredits()
    },

    onSubmitBetBot(body) {
      try {
        const { number, amount, game } = this

        game.betMultiple(number, amount, body.direction, body.iterations)

        this.$message({
          message: 'All iterations passed! Look at history for more details!',
          type: 'success',
        })
      } catch (err) {
        this.$message({
          message: 'Something went wrong!  Check your balance.',
          type: 'error',
        })

        this.amount = 0
      }
    },

    onRestart() {
      this.game.startNew()
    },
  },
}
</script>

<template>
  <main class="game">
    <HashValidator
      v-if="validatingHash"
      :hash="hash"
      @close="onFinishValidate"
    />
    <div class="game__section">
      <Player
        :balance="balance"
        @loan="onLoadRequest"
      />
    </div>
    <div class="game__section">
      <el-row :gutter="15">
        <el-col :span="8">
          <Forecast
            :forecast="loForecast"
            :number="number"
            :disabled="played || balance <= 0"
            type="lo"
            @bet="onBet"
          />
        </el-col>
        <el-col :span="8">
          <div class="game__section">
            <TurnResult
              :win="winner"
              :number="game.number"
              :played="played"
              @restart="onRestart"
            />
          </div>
        </el-col>
        <el-col :span="8">
          <Forecast
            :forecast="hiForecast"
            :number="number"
            :disabled="played || balance <= 0"
            type="hi"
            @bet="onBet"
          />
        </el-col>
      </el-row>
    </div>
    <div class="game__section">
      <BetForm
        :number="number"
        :amount="amount"
        :balance="game.balance"
        :disabled="played"
        @change="onChangeBetForm"
      />
    </div>
    <div class="game__section">
      <BetBot
        :balance="balance"
        @submit="onSubmitBetBot"
      />
    </div>
    <div class="game__section">
      <History :history="history" />
    </div>
    <div class="game__section">
      <Hash
        :show-validate="played"
        :hash="game.hash"
        @validate="onStartValidate"
      />
    </div>
  </main>
</template>

<style>
@import url('../node_modules/reset.css/reset.css');

* {
  box-sizing: border-box;
  font-family: monospace !important;
}
</style>

<style lang="postcss">
.game {
  padding: 15px;
}

.game__section {
  padding: 15px;
  border: 1px solid var(--lightBorder);
  border-radius: 5px;
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
}

.game__controlls {
  padding: 20px 20px 40px;
}
</style>
