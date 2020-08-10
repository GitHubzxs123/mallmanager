<template>
  <el-container class="container">
  <el-header class="header">
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple"><img src="" alt="图片"></div></el-col>
      <el-col :span="20"><h3 class="title">电商后台管理系统</h3></el-col>
      <el-col :span="2"><a href="#" class="signUp">退出</a></el-col>
    </el-row>
  </el-header>
  <el-container>
    <el-aside width="200px" class="aside">
      <el-menu :unique-opened="true">
          <!-- 1 -->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item index="1-1">
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
    <el-main class="main">Main</el-main>
  </el-container>
</el-container>
</template>

<script>

</script>

<style scoped>
.container{
  width: 100%;
  height: 100%;
}
.header{
  background: #b3c0d1;
  padding: 0;
}
.aside{
  background: #d3dce6;
}
.main{
  background: #e9eef3;
  padding: 0;
}
.title{
  text-align: center;
  color: #fff;
}
.signUp{
  line-height: 60px;
  text-decoration: none;
  font-size: 17px;
}
</style>
