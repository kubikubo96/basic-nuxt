<template>
  <div class="center">
    <vs-dialog :value="dialog" prevent-close @close="toggle">
      <template #header>
        <h4 class="not-margin">
          <b>{{ dataUpdate.status ? "Update" : "Create" }}</b>
        </h4>
      </template>

      <div class="sf-dialog-post con-form">
        <vs-input v-model="post.title" placeholder="Enter title"> </vs-input>
        <vs-input v-model="post.content" placeholder="Enter content">
        </vs-input>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button block @click="dataUpdate.status ? update() : store()">
            Submit
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
export default {
  props: ["post", "dataUpdate"],
  components: {},
  computed: {
    dialog() {
      return this.$store.state.posts.dialog;
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    toggle() {
      this.$store.commit("posts/TOGGLE_DIALOG");
    },
    store() {
      this.$nuxt.$loading.start();
      this.$api.posts.base
        .store(this.post)
        .then((res) => {
          this.$nuxt.$loading.finish();
          this.$store.commit("posts/ADD", res.data);
          this.$store.commit("posts/TOGGLE_DIALOG");
          this.$emit("post", { title: "", content: "" });

          this.$vs.notification({
            flat: true,
            title: "Success!",
            color: "success",
            position: "top-center",
          });
        })
        .catch((error) => {
          this.$vs.notification({
            flat: true,
            title: error,
            color: "danger",
            position: "top-center",
          });
        });
    },
    update() {
      this.$nuxt.$loading.start();
      this.$api.posts.base
        .update(this.dataUpdate.id, this.post)
        .then((res) => {
          this.$nuxt.$loading.finish();
          this.$store.commit("posts/UPDATE", res.data);
          this.$store.commit("posts/TOGGLE_DIALOG");

          this.$vs.notification({
            flat: true,
            title: "Success!",
            color: "success",
            position: "top-center",
          });
        })
        .catch((error) => {
          this.$vs.notification({
            flat: true,
            title: error,
            color: "danger",
            position: "top-center",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.not-margin {
  margin: 0px;
  font-weight: normal;
  padding: 10px;
}
.sf-dialog-post {
  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
      font-size: 0.8rem;
      opacity: 0.7;
      &:hover {
        opacity: 1;
      }
    }
  }
  .vs-checkbox-label {
    font-size: 0.8rem;
  }
  .vs-input-content {
    margin: 10px 0px;
    width: calc(100%);
  }
}

.footer-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(100%);
  .vs-button {
    margin: 0px;
  }
}
</style>