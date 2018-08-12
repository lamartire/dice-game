<script>
export default {
  props: {
    win: {
      type: Boolean,
      required: false,
    },

    number: {
      type: Number,
      required: true,
    },

    played: {
      type: Boolean,
      required: false,
    },
  },

  computed: {
    label() {
      if (!this.played) {
        return '🤔'
      }

      if (this.win) {
        return `${this.number} win!`
      }

      return `${this.number} lose!`
    },
  },

  methods: {
    emitRestart() {
      this.$emit('restart')
    },
  },
}
</script>

<template>
  <section class="turn-result">
    <h3 class="turn-result__score">{{label}}</h3>
    <p v-if="!played">
      Try to make a bet
    </p>
    <el-button
      v-if="played"
      type="primary"
      @click="emitRestart"
    >
      Play again 🚀
    </el-button>
  </section>
</template>

<style lang="postcss">
.turn-result {
  text-align: center;
}

.turn-result__score {
  margin-bottom: 20px;
  font-size: 86px;
  font-weight: 700;
}
</style>
