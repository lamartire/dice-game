<script>
import { Dice } from '../'

export default {
  components: {
    Dice,
  },

  props: {
    value: {
      type: Array,
      required: true,
    },
  },
}
</script>

<template>
  <div class="throw-result">
    <div class="throw-result__dice">
      <Dice :value="value[0]" />
    </div>
    <div class="throw-result__dice">
      <Dice :value="value[1]" />
    </div>
  </div>
</template>

<style lang="postcss">
.throw-result {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.throw-result__dice {
  flex: 0 0 auto;
  &:first-child {
    margin-right: 10px;
  }
}
</style>
