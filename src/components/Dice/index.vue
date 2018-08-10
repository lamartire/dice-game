<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
}
</script>

<template>
  <div class="dice">{{value}}</div>
</template>

<style lang="postcss">
.dice {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 86px;
  height: 86px;
  border: 3px solid var(--baseBorder);
  border-radius: 6px;
  font-size: 38px;
  font-weight: 700;
}
</style>
