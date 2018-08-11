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
    }
  },

  computed: {
    label() {
      if (this.win) {
        return 'You win! 🎉'
      }

      return 'You lose! 😥'
    }
  },

  methods: {
    emitRestart() {
      this.$emit('restart')
    }
  }
}
</script>

<template>
  <section class="turn-result">
    <h3 class="turn-result__score">{{number}}</h3>
    <p class="turn-result__label">{{label}}</p>
    <el-button
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

.turn-result__label {
  margin-bottom: 20px;
}

.turn-result__score {
  margin-bottom: 20px;
  font-size: 86px;
  font-weight: 700;
}
</style>
