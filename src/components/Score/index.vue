<script>
import { ThrowResult } from '../'

export default {
  components: {
    ThrowResult,
  },

  props: {
    player: {
      type: Object,
      required: true,
    },
  },

  computed: {
    playerName() {
      return this.player.name
    },

    throws() {
      return this.player.throws
    },
  },
}
</script>

<template>
  <div class="score">
    <h3 class="score__title">{{playerName}}</h3>
    <transition-group
      name="tr-list"
      tag="ul"
      class="score__list"
    >
      <li
        v-for="(item, i) in throws"
        :key="i"
        class="score__item"
      >
        <ThrowResult
          :value="item"
        />
      </li>
    </transition-group>
  </div>
</template>

<style lang="postcss">
.score__title {
  margin: 20px 0;
  font-size: 24px;
  text-align: center;
}

.score__list {
  list-style: none;
}

.tr-list-enter-active,
.tr-list-leave-active {
  transition: all 0.5s;
}

.tr-list-enter,
.tr-list-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>
