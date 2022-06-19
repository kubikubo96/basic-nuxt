<template>
  <div class="row">
    <div class="col-md-8">
      <h3>List Users</h3>
    </div>
    <dialog-user
      :dataUpdate="dataUpdate"
      :user="user"
      :roles="roles"
      :permissions="permissions"
    />
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
              <vs-th> Role </vs-th>
              <vs-th> Permission Extra </vs-th>
              <vs-th> Username </vs-th>
              <vs-th> Email </vs-th>
              <vs-th> Admin </vs-th>
              <vs-th> Active </vs-th>
              <vs-th> Actions </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr v-for="(user, idx) in users" :key="user.id" :data="user">
              <vs-td class="sf-stt">
                #{{ idx + limit * (page - 1) + 1 }}
              </vs-td>
              <vs-td class="sf-full-name">
                {{ user.full_name }}
              </vs-td>
              <vs-td class="sf-role">
                <span v-for="role in user.roles" :key="role.id">
                  {{ role.title }}
                </span>
              </vs-td>
              <vs-td class="sf-permission">
                <span
                  v-for="permission in user.permissions"
                  :key="permission.id"
                >
                  {{ permission.title }}
                </span>
              </vs-td>
              <vs-td class="sf-username">
                {{ user.username }}
              </vs-td>
              <vs-td class="sf-email">
                {{ user.email }}
              </vs-td>
              <vs-td class="sf-admin">
                {{ user.admin }}
              </vs-td>
              <vs-td class="sf-active">
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
      roles: [],
      permissions: [],
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
        if (data.state) {
          this.length = Math.floor(data.total / this.limit);
          this.$store.commit("users/SET", data.data);
        } else {
          alert(JSON.stringify(data.message));
        }
      });
  },
  methods: {
    async openDialog(user = null) {
      this.$nuxt.$loading.start();

      this.roles = await this.$api.roles.base.dataIndex();
      this.permissions = await this.$api.permissions.base.dataIndex();

      this.$nuxt.$loading.finish();
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
          })
          .then(() => {
            this.$nuxt.$loading.finish();
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
          this.length = Math.floor(data.total / this.limit);
          this.$store.commit("users/SET", data.data);
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
  .sf-stt {
    width: 3%;
  }
  .sf-action {
    display: flex;
    text-align: right;
  }
}
</style>
