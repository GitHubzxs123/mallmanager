<template>
  <div class="login-wrap">
    <el-form label-position="top" label-width="80px" :model="formdata" class="login-form">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button @click.prevent="handleLogin()" class="login-button" type="primary">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handleLogin () {
      const res = await this.$http.post('login', this.formdata)
      const {
        data,
        meta: { msg, status }
      } = res.data
      if (status === 200) {
        // 保存token值
        localStorage.setItem('token', data.token)
        this.$router.push({ name: 'home' })
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    }
  }
}
</script>

<style scoped>
.login-wrap {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  width: 400px;
  background-color: #fff;
  padding: 15px 30px 30px 30px;
  border-radius: 8px;
}
.login-button {
  width: 100%;
}
</style>
