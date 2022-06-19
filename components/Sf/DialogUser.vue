<template>
  <div class="center">
    <vs-dialog :value="dialog" prevent-close @close="toggle">
      <template #header>
        <h4 class="not-margin">
          <b>{{ dataUpdate.status ? "Update" : "Create" }}</b>
        </h4>
      </template>

      <div class="sf-dialog-user con-form">
        <div class="sf-content">
          <vs-checkbox v-model="user.admin"> Admin </vs-checkbox>
        </div>
        <div class="sf-content">
          <vs-select
            label="Roles"
            filter
            multiple
            placeholder="Choose roles"
            v-model="role_ids"
          >
            <vs-option
              v-for="role in roles"
              :key="role.id"
              :label="role.title"
              :value="role.id"
            >
              {{ role.title }}
            </vs-option>
          </vs-select>
        </div>
        <div class="sf-content">
          <vs-select
            label="Permissions"
            filter
            multiple
            placeholder="Choose permissions"
            v-model="permission_ids"
          >
            <vs-option
              v-for="permission in permissions"
              :key="permission.id"
              :label="permission.title"
              :value="permission.id"
            >
              {{ permission.title }}
            </vs-option>
          </vs-select>
        </div>
        <div class="sf-content">
          <vs-input
            label="Username"
            v-model="user.username"
            placeholder="Enter Username"
          />
        </div>
        <div class="sf-content">
          <vs-input
            label="Email"
            v-model="user.email"
            placeholder="Enter Email"
          />
        </div>
        <div class="sf-content">
          <vs-input
            label="Phone"
            v-model="user.phone_number"
            placeholder="Enter Phone"
          />
        </div>
        <div v-if="!dataUpdate.status" class="sf-content">
          <vs-input
            v-model="user.password"
            label="Password"
            placeholder="Enter Password"
          />
        </div>
        <div class="sf-content">
          <vs-input
            label="First Name"
            v-model="user.first_name"
            placeholder="Enter First name"
          />
        </div>
        <div class="sf-content">
          <vs-input
            label="Last Name"
            v-model="user.last_name"
            placeholder="Enter Last name"
          />
        </div>
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
  props: ["user", "dataUpdate", "roles", "permissions"],
  components: {},
  computed: {
    dialog() {
      return this.$store.state.users.dialog;
    },
  },
  data() {
    return {
      role_ids: [],
      permission_ids: [],
    };
  },
  created() {},
  mounted() {},
  methods: {
    toggle() {
      this.$store.commit("users/TOGGLE_DIALOG");
    },
    store() {
      this.$nuxt.$loading.start();
      this.$api.users.base
        .store(this.user)
        .then((res) => {
          this.$store.commit("users/ADD", res.data);
          this.$store.commit("users/TOGGLE_DIALOG");

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
      this.$api.users.base
        .update(this.dataUpdate.id, this.user)
        .then((res) => {
          this.$store.commit("users/UPDATE", res.data);
          this.$store.commit("users/TOGGLE_DIALOG");

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
  },
};
</script>

<style lang="scss" scoped>
.not-margin {
  margin: 0px;
  font-weight: normal;
  padding: 10px;
}
.sf-dialog-user {
  .sf-content {
    padding: 20px;
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

    .vs-select-content {
      max-width: inherit;
    }
  }
}

.footer-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(100%);
  button {
    margin: 0px;
    width: 100px;
  }
}
</style>

<style lang="scss">
.vs-dialog {
  .vs-dialog__header {
    padding: 0;
  }
  .vs-dialog__content {
    padding-top: 0;
  }
}
.vs-input-content .vs-input {
  width: 100%;
}
.vs-select__label {
  top: 0;
}
</style>