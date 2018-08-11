<script>
import { isEmpty, random } from 'lodash/fp'
import { StartDialog, FinishDialog, Score, Throwing } from 'components'
import { Dice as DiceGame } from 'lib/dice'

export default {
  components: {
    StartDialog,
    FinishDialog,
    Score,
    Throwing,
  },

  data: () => ({
    game: null,
    rolling: false,
  }),

  computed: {
    firstPlayer() {
      return this.game.players[0]
    },

    secondPlayer() {
      return this.game.players[1]
    },

    winner() {
      return this.game.winner
    },

    round() {
      return this.game.round
    },

    totalRounds() {
      return this.game.rounds
    },

    buttonLabel() {
      const { winner, round, totalRounds } = this

      if (winner) {
        return `${winner.name} 🎉`
      }

      return `Roll ${round}/${totalRounds} 🎲`
    },
  },

  methods: {
    onSubmitGameStart(body) {
      const { playerA, playerB, rounds } = body

      this.game = new DiceGame(rounds)
      this.game.addPlayer(playerA)
      this.game.addPlayer(playerB)
    },

    onFadeDices() {
      this.rolling = false
    },

    onClickRoll() {
      if (!this.rolling) {
        this.rolling = true

        setTimeout(() => {
          this.game.turn()
        }, 1000)
      }
    },
  },
}
</script>

<template>
  <el-row class="game">
    <StartDialog
      v-if="!game"
      @submit="onSubmitGameStart"
    />
    <template v-if="game">
      <FinishDialog
        v-if="winner"
        :winner="winner"
      />
      <el-col :span="5">
        <div class="game__aside left">
          <Score
            v-if="firstPlayer"
            :player="firstPlayer"
          />
        </div>
      </el-col>
      <el-col :span="14">
        <div class="game__main">
          <div
            v-if="rolling"
            class="game__dices"
          >
            <Throwing @fade="onFadeDices" />
          </div>
          <div class="game__start-button">
            <el-button
              :round="true"
              :disabled="rolling || Boolean(winner)"
              type="success"
              @click="onClickRoll"
            >
              {{buttonLabel}}
            </el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="game__aside right">
          <Score
            v-if="secondPlayer"
            :player="secondPlayer"
          />
        </div>
      </el-col>
    </template>
  </el-row>
</template>

<style>
@import url('../node_modules/reset.css/reset.css');

* {
  box-sizing: border-box;
  font-family: monospace !important;
}

body {
  overflow: hidden;
}
</style>

<style lang="postcss">
@keyframes throwing {
  to {
    top: 40vh;
    opacity: 0;
  }
}

.game__aside,
.game__main {
  height: 100vh;
}

.game__main {
  position: relative;
}

.game__aside {
  overflow-y: auto;
  box-shadow: 0 0px 20px 0 rgba(0, 0, 0, 0.25);

  &.left {
    border-right: 1px solid var(--lightBorder);
  }

  &.right {
    border-left: 1px solid var(--lightBorder);
  }
}

.game__start-button {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;

  & button {
    font-size: 24px !important;
  }
}

.game__dices {
  position: absolute;
  top: -115px;
  left: 50%;
  transform: translateX(-50%);
  animation-name: throwing;
  animation-duration: 1.5s;
  z-index: 1;
}
</style>
