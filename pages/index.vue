<template>
  <div class="row">
    <!-- Big Chart -->
    <div class="col-12">
      <card>
        <template slot="header">
          <div class="row">
            <div class="col-sm-6 text-left">
              <h2 class="card-title">Dashboard Administrator</h2>
            </div>
          </div>
        </template>
      </card>
    </div>
  </div>
</template>
<script>
export default {
  name: "dashboard",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
  },
};
</script>
<style></style>
