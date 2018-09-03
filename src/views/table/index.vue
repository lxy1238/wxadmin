<template>
  <div class="app-container">
    <div>
      <el-row>
        <el-col :span="4">
          <el-input v-model="username" @keyup.native.enter="searchUser" placeholder="用户名"/>
        </el-col>
        <el-col :offset="1" :span="4">
          <el-button  type="primary" icon="el-icon-search" @click="searchUser">搜索</el-button>
        </el-col>
         <el-button  type="success"  @click="addUser">新增</el-button>
      </el-row>
    </div>
    <br>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="ID" width="65">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
        <el-table-column align="center" width="110" prop="created_at" label="是否禁用" >
        <template slot-scope="scope">
          <!-- <el-switch
            
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="100"
            inactive-value="0">
          </el-switch> -->
          <el-tag type="success"  v-if="scope.row.status=== 'normal'" >正常</el-tag>
          <el-tag type="danger" v-else>已禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" >
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
    
      <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <el-button type="text"  @click="editUser(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { userList } from '@/api/login'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      username: ''
    }
  },
  created() {
    this.searchUser()
  },
  methods: {
    fetchData() {
     
    },
    async searchUser() {
      let params = {
        page: 1,
        pagesize: 100,
        name: this.username
      }
      try {
        let res = await userList(params)
        this.list = res.data.data
        this.listLoading = false
      } catch(err) {
        console.log(err)
        this.listLoading = false
      }
    },
    addUser () {
      this.$router.push('add')
    },
    editUser (item) {
      this.$router.push({
        path: '/user/add',
        query: {
          name: item.name
        }
      })
    }
  }
}
</script>
