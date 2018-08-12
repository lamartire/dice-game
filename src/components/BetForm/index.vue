<script>
import { pick } from 'lodash/fp'

export default {
  props: {
    disabled: {
      type: Boolean,
      required: false,
    },

    amount: {
      type: Number,
      required: true,
    },

    number: {
      type: Number,
      required: true,
    },

    balance: {
      type: Number,
      required: true,
    },
  },

  data: () => ({
    form: {
      number: 50,
      amount: 10,
    },
  }),

  computed: {
    maxAmountValue() {
      if (this.balance <= 0) {
        return 0
      }

      return this.balance
    },
  },

  watch: {
    balance() {
      if (this.balance === 0 || this.balance < 0) {
        this.form.amount = 0
      }
    },
  },

  created() {
    Object.assign(this.form, pick(['amount', 'number'], this))
  },

  methods: {
    emitChange() {
      this.$emit('change', this.form)
    },
  },
}
</script>

<template>
  <form
    class="bet-form"
  >
    <section
      class="bet-form__field"
    >
      <div class="bet-form__label">
        <span>Your number: {{form.number}}</span>
      </div>
      <div class="bet-form__slider">
        <el-slider
          v-model="form.number"
          :max="99"
          :min="1"
          :disabled="disabled || balance <= 0"
          class="bet-form__slider"
          @change="emitChange"
        />
      </div>
    </section>
    <section
      class="bet-form__field"
    >
      <div class="bet-form__label">
        <span>Your amount: {{form.amount}}</span>
      </div>
      <div class="bet-form__slider">
        <el-slider
          v-model="form.amount"
          :max="maxAmountValue"
          :min="1"
          :disabled="disabled || balance <= 0"
          class="bet-form__slider"
          @change="emitChange"
        />
      </div>
    </section>
  </form>
</template>

<style lang="postcss">
.bet-form__field {
  display: flex;
  align-items: center;
}

.bet-form__label {
  flex: 0 0 auto;
  margin-right: 15px;
  min-width: 100px;
}

.bet-form__slider {
  flex: 1 1 auto;
}
</style>
