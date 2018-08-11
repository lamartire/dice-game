<script>
import { BetForm, TurnResult, Hash, Forecast, HashValidator, Player } from 'components'
import { Game } from 'lib/game'

export default {
  components: {
    BetForm,
    Player,
    TurnResult,
    Hash,
    HashValidator,
    Forecast,
  },

  data: () => ({
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
    }
  },

  created() {
    this.game = new Game()
    this.game.startNew()
  },

  methods: {
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
    },

    onLoadRequest() {
      this.game.takeFreeCredits()
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
    <section class="game__board">
      <div class="game__player">
        <Player
          :balance="balance"
          @loan="onLoadRequest"
        />
      </div>
      <div
        v-if="played"
        class="game__result"
      >
        <TurnResult
          :win="winner"
          :number="number"
          @restart="onRestart"
        />
      </div>
    </section>
    <section class="game__controlls">
      <el-row :gutter="15">
        <el-col :span="5">
          <Forecast
            :forecast="loForecast"
            :number="number"
            :disabled="played"
            type="lo"
            @bet="onBet"
          />
        </el-col>
        <el-col :span="14">
          <div class="game__form">
            <BetForm
              :number="number"
              :amount="amount"
              :balance="game.balance"
              :disabled="played"
              @change="onChangeBetForm"
            />
          </div>
          <div class="game__hash">
            <Hash
              :show-validate="played"
              :hash="game.hash"
              @validate="onStartValidate"
            />
          </div>
        </el-col>
        <el-col :span="5">
          <Forecast
            :forecast="hiForecast"
            :number="number"
            :disabled="played"
            type="hi"
            @bet="onBet"
          />
        </el-col>
      </el-row>
    </section>
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
.game__board {
  position: relative;
  height: 400px;
}

.game__player,
.game__result {
  position: absolute;
  padding: 15px;
  border: 1px solid var(--lightBorder);
  border-radius: 5px;
}

.game__result {
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.game__player {
  right: 15px;
  top: 15px;
}

.game__controlls {
  padding: 20px 20px 40px;
  border-top: 1px solid var(--lightBorder);
}

.game__form {
  margin-bottom: 35px;
}
</style>
