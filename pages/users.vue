<template>
  <div class="row">
    <div class="col-md-8">
      <h3>List Users</h3>
    </div>
    <dialog-user :dataUpdate="dataUpdate" :user="user" />
    <div class="col-md-4">
      <vs-button class="sf-add" @click="openDialog()"> Create News </vs-button>
    </div>
    <div class="col-md-12">
      <div class="sf-table">
        <vs-table>
          <template #thead>
            <vs-tr>
              <vs-th> STT </vs-th>
              <vs-th> Name </vs-th>
              <vs-th> Username </vs-th>
              <vs-th> Email </vs-th>
              <vs-th> Admin </vs-th>
              <vs-th> Active </vs-th>
              <vs-th> Actions </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr v-for="(user, idx) in users" :key="user.id" :data="user">
              <vs-td class="sf-title">
                #{{ idx + limit * (page - 1) + 1 }}
              </vs-td>
              <vs-td class="sf-title">
                {{ user.full_name }}
              </vs-td>
              <vs-td class="sf-title">
                {{ user.username }}
              </vs-td>
              <vs-td class="sf-content">
                {{ user.email }}
              </vs-td>
              <vs-td class="sf-content">
                {{ user.admin }}
              </vs-td>
              <vs-td class="sf-content">
                {{ user.active }}
              </vs-td>
              <vs-td class="sf-action">
                <vs-button
                  success
                  border
                  :user="user"
                  @click="openDialog(user)"
                >
                  Update
                </vs-button>
                <vs-button danger border @click="remove(user)">
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
import EditProfileForm from "~/components/UserProfile/EditProfileForm.vue";
import UserCard from "~/components/UserProfile/UserCard.vue";
import DialogUser from "~/components/Sf/DialogUser.vue";

export default {
  name: "user",
  components: {
    EditProfileForm,
    UserCard,
    DialogUser,
  },
  computed: {
    users() {
      return this.$store.state.users.users;
    },
  },
  data() {
    return {
      page: 1,
      limit: 20,
      length: 1,
      total: 1,
      user: {},
      dataUpdate: {},
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
    });
    this.$api.users.base
      .index({
        page: this.page,
        limit: this.limit,
      })
      .then((data) => {
        this.$nuxt.$loading.finish();
        this.length = Math.floor(data.total / this.limit);
        this.$store.commit("users/SET", data.data);
      })
      .catch(function (error) {
        this.$vs.notification({
          flat: true,
          title: error,
          color: "danger",
          position: "top-center",
        });
      });
  },
  methods: {
    openDialog(user = null) {
      this.$store.commit("users/TOGGLE_DIALOG");
      this.user = { admin: false };
      this.dataUpdate = {};
      if (user) {
        this.dataUpdate = { status: true, id: user.id };
        this.user = { ...user };
      }
    },
    remove(user) {
      if (confirm("Remove user?")) {
        this.$nuxt.$loading.start();
        this.$api.users.base
          .delete(user.id)
          .then(() => {
            this.$nuxt.$loading.finish();
            this.$store.commit("users/REMOVE", user);
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
      }
    },
    changePage(page) {
      this.page = page;
      this.$nuxt.$loading.start();
      this.$api.users.base
        .index({
          page: this.page,
          limit: this.limit,
        })
        .then((data) => {
          this.$nuxt.$loading.finish();
          this.length = Math.floor(data.total / this.limit);
          this.$store.commit("users/SET", data.data);
        })
        .catch(function (error) {
          this.$vs.notification({
            flat: true,
            title: error,
            color: "danger",
            position: "top-center",
          });
        })
        .then(() => {
          this.$store.dispatch("SCROLL_TOP");
        });
    },
  },
};
</script>
<style lang="scss">
</style>
