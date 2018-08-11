<script>
export default {
  created() {
    setTimeout(() => {
      this.emitFade()
    }, 1000)
  },

  methods: {
    emitFade() {
      this.$emit('fade')
    },
  },
}
</script>


<template>
  <div class="throwing">
    <div class="throwing__dice">🎲</div>
    <div class="throwing__dice">🎲</div>
  </div>
</template>

<style lang="postcss">
@keyframes rotation {
  to {
    transform: rotate(360deg);
  }
}

.throwing__dice {
  display: inline-block;
  animation-name: rotation;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  transform-origin: center;
  font-size: 84px;
  &:last-child {
    animation-duration: 0.8s;
  }
}
</style>
