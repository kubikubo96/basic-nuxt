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
        v-model="user.username"
      >
      </base-input>
      <base-input
        type="password"
        label="Mật khẩu"
        placeholder="tiennt"
        v-model="user.password"
      >
      </base-input>
      <div class="tt-btn-submit" @click="login()">
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
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      alert("Your data: " + JSON.stringify(this.user));
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
