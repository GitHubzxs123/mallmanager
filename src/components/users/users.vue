<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="searchInput">
      <el-col>
        <el-input clearable placeholder="请输入内容" v-model="query" class="input-with-select">
          <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" @click="showAddUser()">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="userlist" style="width: 100%">
      <el-table-column type="index" label="#" width="60"></el-table-column>
      <el-table-column prop="username" label="姓名" width="80"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="创建时间">
        <!-- 如果单元格的内容不是字符串（文本），需要给被显示的内容包裹一个template -->
        <!-- template内部要用外层数据 需要设置slot-scope属性 该属性的值要用create_time的数据源userlist -->
        <!-- slot-scope的值其实就是el-table绑定的数据（userlist）传什么值都可以 会自动的找上级的数据源 -->
        <!-- userlist.row 代表数组中的每个对象 -->
        <template slot-scope="scope">
          {{scope.row.create_time | fmtdate}}
        </template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            @change="changeUserState(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="showEditUser(scope.row)"></el-button>
          <el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="showDele(scope.row.id)"></el-button>
          <el-button size="mini" plain type="success" icon="el-icon-check" circle @click="showUserRole(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 弹出框 -->
    <!-- 添加用户的弹出框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户的弹出框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input disabled v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色的弹出框 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          {{currUserName}}
        </el-form-item>
        <el-form-item label="角色" label-width="100px">
          <!-- 要想下拉框有默认值 就把select的model和option的value改成一样 -->
          <el-select v-model="currRoleId">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option :label="item.roleName" :value="item.id" v-for="(item, i) in roleArr" :key="i"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="setRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
// @size-change 每页显示条数变化时触发
// @current-change 当前页改变时触发
// :page-sizes="[100, 200, 300, 400]" 每页多少条的数据数组
// :page-size="100" 设置显示多少条
// :total 数据总数
export default {
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 4,
      total: 0,
      userlist: [],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路1518弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路1517弄'
        }
      ],
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRole: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      currRoleId: -1,
      roleArr: [],
      currUserName: '',
      currUserId: ''
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 设置用户角色
    async setRole () {
      const res = await this.$http.put(`users/${this.currUserId}/role`, {
        rid: this.currRoleId
      })
      console.log(res)
      const {meta: {msg, status}} = res.data
      if (status === 200) {
        // 关闭对话框
        this.dialogFormVisibleRole = false
        // 提示信息
        this.$message.success(msg)
      } else {
        // 关闭对话框
        this.dialogFormVisibleRole = false
        // 提示信息
        this.$message.warning(msg)
      }
    },
    // 弹出修改角色对话框
    async showUserRole (user) {
      this.currUserName = user.username
      this.currUserId = user.id
      this.dialogFormVisibleRole = true
      // 获取当前用户的角色id
      const res = await this.$http.get(`users/${user.id}`)
      this.currRoleId = res.data.data.rid
      // 获取所有角色
      const res1 = await this.$http.get(`roles`)
      this.roleArr = res1.data.data
    },
    // 修改用户状态
    async changeUserState (user) {
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
      // console.log(res)
      const {meta: {msg, status}} = res.data
      if (status === 200) {
        this.$message.success(msg)
      }
    },
    // 编辑用户信息
    async editUser () {
      const res = await this.$http.put(`users/${this.form.id}`, this.form)
      // console.log(res)
      const {meta: {msg, status}} = res.data
      if (status === 200) {
        // 关闭提示框
        this.dialogFormVisibleEdit = false
        // 提示消息
        this.$message.success(msg)
        // 更新视图
        this.getUserList()
      }
    },
    // 弹出编辑用户框
    showEditUser (user) {
      this.form = user
      this.dialogFormVisibleEdit = true
    },
    // 弹出删除框
    showDele (userid) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`users/${userid}`)
        if (res.data.meta.status === 200) {
          // 回到首页
          this.pagenum = 1
          // 提示消息
          this.$message({
            type: 'success',
            message: 'res.data.meta.msg!'
          })
          // 更新视图
          this.getUserList()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 发送添加用户请求
    async addUser () {
      // 关闭显示框
      this.dialogFormVisibleAdd = false
      const res = await this.$http.post('users', this.form)
      // console.log(res)
      const {meta: {msg, status}} = res.data
      if (status === 201) {
        // 清空表单数据
        this.form = {}
        // 更新视图
        this.getUserList()
        // 弹出提示框
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    },
    // 弹出添加用户框
    showAddUser () {
      this.form = {}
      this.dialogFormVisibleAdd = true
    },
    // 搜索功能
    searchUser () {
      this.getUserList()
    },
    // 分页相关的方法
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getUserList()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getUserList()
    },
    // 获取数据
    async getUserList () {
      // 需要授权的API 必须在请求头中使用Authorization字段 提供token令牌
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN

      const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      // console.log(res)
      const {data: {total, users}, meta: {msg, status}} = res.data
      if (status === 200) {
        this.total = total
        this.userlist = users
        // this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    }
  }
}
</script>

<style scoped>
.box-card {
  height: 100%;
}
.searchInput {
  margin-top: 20px;
}
.input-with-select {
  width: 300px;
}
.pagination{
  margin-top: 10px
}
</style>
