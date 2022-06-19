<template>
  <div class="row">
    <div class="col-md-8">
      <h3>List Posts</h3>
    </div>
    <dialog-post :dataUpdate="dataUpdate" :post="post" />
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
import DialogPost from "~/components/Sf/DialogPost.vue";

export default {
  name: "post",
  components: {
    EditProfileForm,
    UserCard,
    DialogPost,
  },
  computed: {
    posts() {
      return this.$store.state.posts.posts;
    },
  },
  data() {
    return {
      page: 1,
      limit: 20,
      length: 1,
      total: 1,
      post: { title: "", content: "" },
      dataUpdate: { status: false, id: null },
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
    });
    this.$api.posts.base
      .index({
        page: this.page,
        limit: this.limit,
      })
      .then((data) => {
        this.length = Math.floor(data.total / this.limit);
        this.$store.commit("posts/SET", data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        this.$nuxt.$loading.finish();
      });
  },
  methods: {
    openDialog(post = null) {
      this.$store.commit("posts/TOGGLE_DIALOG");
      this.post = { title: "", content: "" };
      this.dataUpdate = { status: false, id: null };
      if (post) {
        this.dataUpdate = { status: true, id: post.id };
        this.post = { title: post.title, content: post.content };
      }
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
          this.$store.dispatch("SCROLL_TOP");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
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
</style>
