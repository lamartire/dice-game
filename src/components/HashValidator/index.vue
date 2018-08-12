<script>
export default {
  props: {
    hash: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    userHash: '',
  }),

  methods: {
    emitClose() {
      this.$emit('close')
    },

    onClickValidate() {
      if (!this.userHash) {
        this.$message({
          message: 'Please, fill hash field! ☝️',
          type: 'warning',
        })
      } else if (this.userHash === this.hash) {
        this.$message({
          message: 'Your hash is valid, The game was fair! 🎉',
          type: 'success',
        })
      } else {
        this.$message({
          message:
            'Your hash is not valid! Are you had some attempts to trick game? 🤔',
          type: 'error',
        })
      }
    },
  },
}
</script>

<template>
  <el-dialog
    :visible="true"
    title="Provably fair hash validation"
    class="hash-validator"
    @close="emitClose"
  >
    <el-input
      v-model="userHash"
      label="Your hash"
      placeholder="Enter hash here"
    />
    <el-button
      type="primary"
      class="hash-validator__button"
      @click="onClickValidate"
    >
      Validate
    </el-button>
  </el-dialog>
</template>

<style lang="postcss">
.hash-validator {
  text-align: center;
}

.hash-validator__button {
  margin-top: 15px;
}
</style>
