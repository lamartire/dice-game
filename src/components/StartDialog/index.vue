<script>
import { isEmpty } from 'lodash/fp'
import DialogTitle from 'components/DialogTitle'

export default {
  components: {
    DialogTitle,
  },

  data: () => ({
    form: {
      playerA: null,
      playerB: null,
    },
    rules: {
      playerA: [
        {
          required: true,
          validate: (rule, value, callback) =>
            isEmpty(value) && callback(new Error('Enter first player name!')),
        },
      ],
      playerB: [
        {
          required: true,
          validate: (rule, value, callback) =>
            isEmpty(value) && callback(new Error('Enter second player name!')),
        },
      ],
    },
  }),

  methods: {
    emitSubmit() {
      this.$emit('submit', this.form)
    },

    onClickSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.emitSubmit()
        }
      })
    },
  },
}
</script>

<template>
  <el-dialog
    :visible="true"
    :show-close="false"
    class="start-dialog"
  >
    <DialogTitle>Welcome to the Dice Game 🎲</DialogTitle>
    <p>It's a simple implementation of dice game. Please, fill names and press start button! Have a nice time!</p>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      class="start-dialog__form"
    >
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item
            label="First player name"
            prop="playerA"
          >
            <el-input v-model="form.playerA" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="Second player name"
            prop="playerB"
          >
            <el-input v-model="form.playerB" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-button
        type="primary"
        class="start-dialog__button"
        @click="onClickSubmit"
      >
        Start playing!
      </el-button>
    </el-form>
  </el-dialog>
</template>

<style lang="postcss">
.start-dialog__form {
  margin-top: 10px;
}

.start-dialog__button {
  display: block;
  margin: 10px auto 0;
}
</style>
