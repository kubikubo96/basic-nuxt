<template>
  <div class="form-login row">
    <card class="card-login">
      <div class="tt-title">
        <p>Administrator</p>
      </div>
      <base-input
        type="text"
        label="Tài khoản"
        placeholder="tiennt"
        v-model="login.email"
        @keyup.enter="userLogin"
      >
      </base-input>
      <base-input
        type="password"
        label="Mật khẩu"
        placeholder="tiennt"
        v-model="login.password"
        @keyup.enter="userLogin"
      >
      </base-input>
      <div class="tt-btn-submit" @click="userLogin">
        <base-button native-type="submit" class="btn-fill">
          Đăng nhập
        </base-button>
      </div>
      <p></p>
      <div class="tt-footer">
        <p>Hoặc đăng nhập với:</p>
        <base-button class="btn-facebook" icon round>
          <i class="fab fa-facebook"></i>
        </base-button>
        <base-button class="btn-google" icon round>
          <i class="fab fa-google-plus"></i>
        </base-button>
      </div>
    </card>
  </div>
</template>

<script>
export default {
  name: "login",
  layout: "empty",
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async userLogin() {
      this.$nuxt.$loading.start();
      try {
        await this.$auth
          .loginWith("local", {
            data: this.login,
          })
          .then(() => this.$nuxt.$loading.finish());
      } catch (error) {
        this.$nuxt.$loading.finish();
        this.$vs.notification({
          flat: true,
          title: error,
          color: "danger",
          position: "top-center",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.form-login {
  width: 400px;
  margin: auto;
  margin-top: 50px;
  .card-login {
    .tt-title,
    .tt-footer,
    .tt-btn-submit {
      text-align: center;
    }

    .tt-title {
      p {
        font-weight: bold;
        font-size: 20px;
      }
    }

    .tt-btn-submit {
      margin-bottom: 20px;
      .btn-fill {
        height: 35px;
      }
    }
  }
}
</style>
