<script>
import { isEmpty } from 'lodash/fp'
import DialogTitle from 'components/DialogTitle'

export default {
  components: {
    DialogTitle,
  },

  data: () => ({
    form: {
      rounds: 5,
      playerA: null,
      playerB: null,
    },
    rules: {
      rounds: [
        {
          validator: (rule, value, callback) => {
            if (value <= 0) {
              callback(new Error('Rounds count must be more 0!'))
            }

            callback()
          },
          trigger: 'change',
        },
      ],
      playerA: [
        {
          required: true,
          message: 'Enter first player name!',
        },
      ],
      playerB: [
        {
          required: true,
          message: 'Enter second player name!',
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
        console.log(valid)
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
      <el-form-item
        label="Rounds count"
        prop="rounds"
      >
        <el-input
          v-model="form.rounds"
          type="number"
          min="1"
        />
      </el-form-item>
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
