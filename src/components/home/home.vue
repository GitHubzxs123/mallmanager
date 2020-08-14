<template>
  <el-container class="container">
  <el-header class="header">
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple"><img style="width: 80px; height: 60px" src="" alt=""></div></el-col>
      <el-col :span="20"><h2 class="title">后台管理系统</h2></el-col>
      <el-col :span="2"><a href="#" class="signOut" @click.prevent="handleSignout">退出</a></el-col>
    </el-row>
  </el-header>
  <el-container>
    <el-aside width="200px" class="aside">
      <el-menu :unique-opened="true" :router="true">
          <!-- 1 -->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item index="users">
            <i class="el-icon-location"></i>
            <span>用户列表</span>
          </el-menu-item>
        </el-submenu>
        <!-- 2 -->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>权限管理</span>
          </template>
          <el-menu-item index="1-1">
            <i class="el-icon-location"></i>
            <span>角色列表</span>
          </el-menu-item>
          <el-menu-item index="1-1">
            <i class="el-icon-location"></i>
            <span>权限列表</span>
          </el-menu-item>
        </el-submenu>
        <!-- 3 -->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item index="1-1">
            <i class="el-icon-location"></i>
            <span>商品列表</span>
          </el-menu-item>
          <el-menu-item index="1-1">
            <i class="el-icon-location"></i>
            <span>分类参数</span>
          </el-menu-item>
          <el-menu-item index="1-1">
            <i class="el-icon-location"></i>
            <span>商品分类</span>
          </el-menu-item>
        </el-submenu>
        <!-- 4 -->
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>订单管理</span>
          </template>
          <el-menu-item index="1-1">
            <i class="el-icon-location"></i>
            <span>订单列表</span>
          </el-menu-item>
        </el-submenu>
        <!-- 5 -->
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>数据统计</span>
          </template>
          <el-menu-item index="1-1">
            <i class="el-icon-location"></i>
            <span>数据报表</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main class="main">
      <router-view/>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  beforeCreate () {
    // 如果没有token值 则访问home的url直接进入登录页面
    const token = localStorage.getItem('token')
    if (!token) {
      this.$router.push({name: 'login'})
    }
  },
  methods: {
    handleSignout () {
      // 清除缓存中的token值
      localStorage.clear()
      // 提示退出成功
      this.$message.success('退出成功')
      // 跳转到login页
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style scoped>
.container{
  height: 100%;
}
.header{
  background: #b3c0d1;
}
.aside{
  background: #d3dce6;
}
.main{
  background: #e9eef3;
}
.title{
  text-align: center;
  margin: 0;
  margin-top: 13px;
  color: #fff;
}
.signOut{
  line-height: 70px;
  margin-left: 60px;
  text-decoration: none;
  font-size: 16px;
}
</style>
