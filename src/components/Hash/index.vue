<script>
export default {
  props: {
    hash: {
      type: String,
      required: true,
    },

    showValidate: {
      type: Boolean,
      required: false,
    }
  },

  methods: {
    emitValidate() {
      this.$emit('validate')
    }
  }
}
</script>

<template>
  <section class="hash">
    <h3 class="hash__title">Provably fair hash</h3>
    <p class="hash__content">{{hash}}</p>
    <el-button
      v-if="showValidate"
      type="primary"
      @click="emitValidate"
    >
      Validate hash
    </el-button>
  </section>
</template>

<style lang="postcss">
.hash {
  text-align: center;
}

.hash__title,
.hash__content {
  margin-bottom: 10px;
}

.hash__content {
  font-weight: 700;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
