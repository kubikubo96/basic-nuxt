<template></template>

<script>
export default {
  data: () => ({
    vsLoading: false
  }),
  methods: {
    start() {
      this.vsLoading = this.$vs.loading({
        type: 'circles'
      });
    },
    finish() {
      this.vsLoading.close()
    }
  }
}
</script>