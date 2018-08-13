<script>
export default {
  props: {
    balance: {
      type: Number,
      required: true,
    }
  },

  data: () => ({
    form: {
      iterations: 0,
      direction: 'lo',
    },
    rules: {
      iterations: [
        {
          validator: (rule, value, callback) => {
            if (value <= 0) {
              callback(new Error('Iterations must be more than 0!'))
            } else {
              callback()
            }
          }
        }
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
    }
  }
}
</script>

<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    label-position="left"
    label-width="150px"
  >
    <el-row :gutter="15">
      <el-col :span="8">
        <el-form-item
          prop="iterations"
          label="Iterations count"
        >
          <el-input
            v-model="form.iterations"
            type="number"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          prop="direction"
          label="Bet direction"
        >
          <el-select
            v-model="form.direction"
            class="bet-bot__select"
          >
            <el-option
              label="Bet Lo"
              value="lo"
            />
            <el-option
              label="Bet Hi"
              value="hi"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-button
          :disabled="balance === 0 || form.iterations === 0"
          type="primary"
          class="bet-bot__button"
          @click="onClickSubmit"
        >
          Run bot
        </el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<style>
.bet-bot {
}

.bet-bot__select,
.bet-bot__button {
  width: 100%;
}
</style>
