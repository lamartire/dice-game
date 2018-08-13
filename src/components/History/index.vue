<script>
export default {
  props: {
    history: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
}
</script>

<template>
  <el-table
    :data="history"
  >
    <el-table-column
      prop="number"
      label="Bet number"
    />
    <el-table-column
      prop="amount"
      label="Bet amount"
    />
    <el-table-column
      prop="result"
      label="Result"
    />
    <el-table-column
      prop="hash"
      label="Provably hash"
    />
    <el-table-column
      prop="total"
      label="New balance"
    />
  </el-table>
</template>

<style>
</style>
