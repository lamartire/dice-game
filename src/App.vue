<script>
import { isEmpty, random } from 'lodash/fp'
import { StartDialog, FinishDialog, Score } from 'components'
import { Dice as DiceGame } from 'lib/dice'

export default {
  components: {
    StartDialog,
    FinishDialog,
    Score,
  },

  data: () => ({
    game: null,
    rolling: false,
  }),

  computed: {
    awaitingPlayers() {
      return isEmpty(this.game.players)
    },

    firstPlayer() {
      return this.game.players[0]
    },

    secondPlayer() {
      return this.game.players[1]
    },

    winner() {
      return this.game.winner
    },
  },

  created() {
    this.game = new DiceGame()
  },

  methods: {
    onSubmitGameStart(body) {
      const { playerA, playerB } = body

      this.game.addPlayer(playerA)
      this.game.addPlayer(playerB)
    },

    async onClickRoll() {
      if (!this.rolling) {
        this.rolling = true

        setTimeout(() => {
          this.game.turn()
          this.rolling = false
        }, random(250, 2000))
      }
    },
  },
}
</script>

<template>
  <el-row class="game">
    <StartDialog
      v-if="awaitingPlayers"
      @submit="onSubmitGameStart"
    />
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
        <div class="game__start-button">
          <el-button
            :round="true"
            :disabled="rolling"
            type="success"
            @click="onClickRoll"
          >
            Roll 🎲
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
  </el-row>
</template>

<style>
@import url('../node_modules/reset.css/reset.css');

* {
  box-sizing: border-box;
  font-family: monospace !important;
}
</style>

<style lang="postcss">
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

  & button {
    font-size: 24px !important;
  }
}
</style>
