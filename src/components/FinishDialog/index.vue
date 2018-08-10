<script>
import DialogTitle from 'components/DialogTitle'

export default {
  components: {
    DialogTitle,
  },

  props: {
    winner: {
      type: Object,
      required: true,
    },
  },

  computed: {
    playerName() {
      return this.winner.name
    },

    score() {
      return this.winner.score
    },
  },
}
</script>

<template>
  <el-dialog
    :visible="true"
    :show-close="false"
    class="finish-dialog"
  >
    <DialogTitle>Congratulations, {{playerName}} is now winner with {{score}} points! 🎉</DialogTitle>
    <p>I hope, you have a nice few seconds! 🙂</p>
    <p class="finish-dialog__signature">
      Created with ❤️ by <a href="https://github.com/lamartire">lamartire</a>
    </p>
  </el-dialog>
</template>

<style lang="postcss">
.finish-dialog {
  text-align: center;
}

.finish-dialog__signature {
  margin-top: 15px;
}
</style>
