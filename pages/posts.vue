<template>
  <div class="row">
    <div class="col-md-8">
      <h3>List Posts</h3>
    </div>

    <div class="center">
      <vs-dialog v-model="dialog">
        <template #header>
          <h4 class="not-margin"><b>{{isStore ? "Create" : "Update"}}</b></h4>
        </template>

        <div class="con-form">
          <vs-input v-model="post.title" placeholder="Enter title"> </vs-input>
          <vs-input v-model="post.content" placeholder="Enter content">
          </vs-input>
        </div>

        <template #footer>
          <div class="footer-dialog">
            <vs-button block @click="isStore ? store() : update()">
              Submit
            </vs-button>
          </div>
        </template>
      </vs-dialog>
    </div>

    <div class="col-md-4">
      <vs-button class="sf-add" @click="openDialog()"> Create News </vs-button>
    </div>
    <div class="col-md-12">
      <div class="sf-table">
        <vs-table>
          <template #thead>
            <vs-tr>
              <vs-th> Title </vs-th>
              <vs-th> Content </vs-th>
              <vs-th> Actions </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr v-for="post in posts" :key="post.id" :data="post">
              <vs-td class="sf-title">
                {{ post.title }}
              </vs-td>
              <vs-td class="sf-content">
                {{ post.content }}
              </vs-td>
              <vs-td class="sf-action">
                <vs-button
                  success
                  border
                  :post="post"
                  @click="openDialog(post)"
                >
                  Update
                </vs-button>
                <vs-button danger border @click="remove(post)">
                  Delete
                </vs-button>
              </vs-td>
            </vs-tr>
          </template>
          <template #footer>
            <div>
              <vs-pagination
                @input="changePage(page)"
                progress
                v-model="page"
                :length="length"
              />
            </div>
          </template>
        </vs-table>
      </div>
    </div>
  </div>
</template>
<script>
import EditProfileForm from "../components/UserProfile/EditProfileForm.vue";
import UserCard from "../components/UserProfile/UserCard.vue";

export default {
  scrollToTop: true,
  name: "post",
  components: {
    EditProfileForm,
    UserCard,
  },
  computed: {
    posts() {
      return this.$store.state.posts.posts;
    },
  },
  data() {
    return {
      isStore: true,
      idUpdate: null,
      page: 1,
      limit: 20,
      length: 1,
      total: 1,
      dialog: false,
      title: "",
      content: "",
      post: {
        title: "",
        content: "",
      },
    };
  },
  created() {
    this.$api.posts.base
      .index({
        page: this.page,
        limit: this.limit,
      })
      .then((data) => {
        this.length = Math.floor(data.total / this.limit);
        this.$store.commit("posts/SET", data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
  },
  methods: {
    openDialog(post = null) {
      this.dialog = !this.dialog;
      this.isStore = true;
      if (post) {
        this.isStore = false;
        this.idUpdate = post.id;
        this.post.title = post.title;
        this.post.content = post.content;
      }
    },
    store() {
      this.$nuxt.$loading.start();
      this.$api.posts.base
        .store(this.post)
        .then((res) => {
          this.$store.commit("posts/ADD", res.data);
          this.dialog = false;
          this.post = {
            title: "",
            content: "",
          };
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
        })
        .then(() => {
          this.$nuxt.$loading.finish();
        });
    },
    update() {
      this.$nuxt.$loading.start();
      this.$api.posts.base
        .update(this.idUpdate, this.post)
        .then((res) => {
          this.$store.commit("posts/UPDATE", res.data);
          this.dialog = false;
          this.post = {
            title: "",
            content: "",
          };
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
        })
        .then(() => {
          this.$nuxt.$loading.finish();
        });
    },
    remove(post) {
      if (confirm("Remove post?")) {
        this.$nuxt.$loading.start();
        this.$api.posts.base
          .delete(post.id)
          .then(() => {
            this.$store.commit("posts/REMOVE", post);
            this.$vs.notification({
              flat: true,
              title: "Success!",
              color: "success",
              position: "top-center",
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
    changePage(page) {
      this.page = page;
      this.$nuxt.$loading.start();
      this.$api.posts.base
        .index({
          page: this.page,
          limit: this.limit,
        })
        .then((data) => {
          this.length = Math.floor(data.total / this.limit);
          this.$store.commit("posts/SET", data.data);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(() => {
          this.$nuxt.$loading.finish();
          this.$store.dispatch("SCROLL_TOP");
        });
    },
  },
};
</script>
<style lang="scss">
.sf-add {
  float: right;
}
.sf-table {
  .sf-title {
    width: 30%;
  }
  .sf-content {
    width: 50%;
  }
  .sf-action {
    display: flex;
    text-align: right;
  }
}
.not-margin {
  margin: 0px;
  font-weight: normal;
  padding: 10px;
}
.con-form {
  width: 100%;
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
    .vs-input {
      width: 100%;
    }
  }
}
.footer-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(100%);
  .new {
    margin: 0px;
    margin-top: 20px;
    padding: 0px;
    font-size: 0.7rem;
    a {
      color: rgba(var(--vs-primary), 1) !important;
      margin-left: 6px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .vs-button {
    margin: 0px;
  }
}
</style>
