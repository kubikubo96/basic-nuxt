<template>
  <div :class="`task ${task.done ? 'is-complete' : ''}`">
    <div class="content">{{ task.content }}</div>
    <div class="buttons">
      <button @click="toggle">{{ task.done ? "Undo" : "Done" }}</button>
      <button @click="remove" class="delete">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["task"],
  methods: {
    toggle() {
      this.$nuxt.$loading.start();
      const task = { ...this.task };
      task.done = !this.task.done;
      const promise = this.$repo.todos.base.update(this.task.id, task);
      promise
        .then(() => {
          this.$store.commit("todos/TOGGLE", this.task);
          this.$vs.notification({
            title: "Success!",
            color: "success",
            position: "top-right",
          });
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          this.$nuxt.$loading.finish();
        });
    },
    remove() {
      if (confirm("Remove task?")) {
        this.$nuxt.$loading.start();
        const promise = this.$repo.todos.base.delete(this.task.id);
        promise
          .then(() => {
            this.$store.commit("todos/REMOVE", this.task);
            this.$vs.notification({
              title: "Success!",
              color: "success",
              position: "top-right",
            });
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            this.$nuxt.$loading.finish();
          });
      }
    },
  },
};
</script>

<style>
</style>