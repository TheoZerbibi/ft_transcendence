<template>
  <button @click="openOverlay">Create Channel</button>
</template>

<script>
export default {
  methods: {
    openOverlay() {
      this.$emit('open-overlay');
    },
  },
};
</script>

<style scoped>
/*  Style placeholder because my design suck */
</style>
