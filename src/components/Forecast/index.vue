<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },

    number: {
      type: Number,
      required: true,
    },

    forecast: {
      type: Object,
      required: true,
    },

    disabled: {
      type: Boolean,
      required: false,
    },
  },

  computed: {
    numberLabel() {
      if (this.type === 'lo') {
        return `Number <= ${this.number}`
      }

      return `Number >= ${this.number}`
    },

    buttonLabel() {
      if (this.type === 'lo') {
        return 'Bet Lo 👇'
      }

      return 'Bet Hi 👆'
    },
  },

  methods: {
    emitBet() {
      this.$emit('bet', this.type)
    },
  },
}
</script>

<template>
  <section class="forecast">
    <p class="forecast__label">
      <strong>{{numberLabel}}</strong>
    </p>
    <p class="forecast__label">
      Chance:
      <strong>{{forecast.chance}}%</strong>
    </p>
    <p class="forecast__label">
      Payout:
      <strong>{{forecast.payout}}x</strong>
    </p>
    <el-button
      :disabled="disabled"
      class="forecast__button"
      type="primary"
      @click="emitBet"
    >
      {{buttonLabel}}
    </el-button>
  </section>
</template>

<style lang="postcss">
.forecat {
  display: flex;
  flex-direction: column;
}

.forecast__button {
  width: 100%;
  margin-top: auto;
}

.forecast__label {
  text-align: center;
  margin-bottom: 9px;

  strong {
    font-weight: 700;
  }
}
</style>
