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
  created() {
    const promise = this.$api.todos.base.index({
      page: this.page,
      limit: this.limit,
    });
    promise
      .then((data) => {
        this.$store.commit("todos/SET", data.data);
        this.totalPage = Math.floor(data.total / this.limit);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    add() {
      if (this.newTask) {
        this.$nuxt.$loading.start();
        const promise = this.$api.todos.base.store({ content: this.newTask });
        promise
          .then((data) => {
            this.$store.commit("todos/ADD", data.data.content);
            this.$vs.notification({
              title: "Success!",
              color: "success",
              position: "top-right",
            });
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(() => {
            this.newTask = "";
            this.$nuxt.$loading.finish();
          });
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
  },
};
</script>

<style lang="scss">
</style>

