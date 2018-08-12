<script>
export default {
  props: {
    balance: {
      type: Number,
      required: true,
    },
  },

  computed: {
    fixedBalance() {
      return this.balance.toFixed(2)
    },
  },

  methods: {
    emitLoan() {
      this.$emit('loan')
    },
  },
}
</script>

<template>
  <div class="player">
    <img
      src="../../assets/images/avatar.png"
      class="player__avatar"
    >
    <p class="player__balance">Balance: 💰{{fixedBalance}}</p>
    <el-button
      :disabled="balance > 0"
      type="primary"
      @click="emitLoan"
    >
      Get free credits 🤝
    </el-button>
  </div>
</template>

<style lang="postcss">
.player {
  text-align: center;
}

.player__avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.player__balance {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
}
</style>
