<template>
  <div class="col-md-12">
    <main>
      <h2>TO DO LIST</h2>
      <p></p>
      <div class="create-new">
        <input
          type="text"
          v-model="newTask"
          placeholder="Add a new task"
          @keypress.enter="add"
        />
        <button @click="add">ADD</button>
      </div>
      <div class="tasks">
        <Task v-for="task in tasks" :key="task.id" :task="task" />
      </div>
    </main>
  </div>
</template>


<script>
import Task from "~/components/TodoApp/Task";
import { BasePagination } from "@/components";

export default {
  name: "todos",
  components: {
    Task,
    BasePagination,
  },
  computed: {
    tasks() {
      return this.$store.state.todos.tasks;
    },
  },
  data() {
    return {
      newTask: "",
      totalPage: 1,
      page: 1,
      limit: 50,
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
    });
    this.$api.todos.base
      .index({
        page: this.page,
        limit: this.limit,
      })
      .then((data) => {
        this.$store.commit("todos/SET", data.data);
        this.totalPage = Math.floor(data.total / this.limit);
      })
      .catch((error) => {
        this.$vs.notification({
          flat: true,
          title: error,
          color: "danger",
          position: "top-center",
        });
      })
      .then(() => {
        this.$nuxt.$loading.finish();
      });
  },
  methods: {
    add() {
      if (this.newTask) {
        this.$nuxt.$loading.start();
        this.$api.todos.base
          .store({ content: this.newTask })
          .then((data) => {
            this.$store.commit("todos/ADD", data.data.content);
            this.$vs.notification({
              title: "Success!",
              color: "success",
              position: "top-right",
            });
          })
          .catch((error) => {
            this.$vs.notification({
              flat: true,
              title: error,
              color: "danger",
              position: "top-center",
            });
          })
          .then(() => {
            $this.$nuxt.$loading.finish();
            this.newTask = "";
          });
      }
    },
  },
};
</script>

<style lang="scss">
</style>

