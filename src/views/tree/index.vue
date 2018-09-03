<template>
  <div class="app-container">
     <el-form ref="form"  :rules="rules" :model="form" label-width="120px"  v-loading="loadingForm">
      <el-form-item label="用户名"  prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <template v-if="!isEditor">
        <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword" required>
          <el-input type="password" v-model="form.confirmPassword"/>
        </el-form-item>
      </template>
      <template v-if="isEditor">
        <el-form-item label="密码" prop="changePassword">
          <el-input type="password" v-model="form.changePassword"/>
        </el-form-item>
      </template>
     
      <el-form-item label="姓名" prop="nickname">
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email" required>
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="是否禁用" v-if="isEditor">
         <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="100"
            inactive-value="0">
          </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button v-if="isEditor" type="primary" @click="addUser" :loading="loading" >确认修改</el-button>
        <el-button v-else type="primary" @click="addUser" :loading="loading" >新增</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addUser, editUser, userList } from '@/api/login'
import { validateEmail } from '@/utils/validate.js'
export default {

  data() {
    const validateEmailRule =  (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入邮箱'))
      } else if (!validateEmail(value)) {
        return callback(new Error('邮箱格式不正确'))
      } else {
        callback()
      }
    }
     const validateConfirmPassword =  (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        return callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      loadingForm: false,
      form: {
        id: '',
        name: '',
        nickname: '',
        email: '',
        password: '',
        changePassword: '',
        confirmPassword: '',
        status: ''
      },
       rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, message: '用户名不能少于两个字符', trigger: 'blur' }
          ],
          nickname: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
            { min: 2, message: '真实姓名不能少于两个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur'},
             { min: 6, message: '密码不能少六位', trigger: 'blur' }
          ],
          changePassword: [
             { min: 6, message: '密码不能少六位', trigger: 'blur' }
          ],
          confirmPassword: [
            {validator:validateConfirmPassword , trigger: 'blur'}
          ],
          email: [
             { validator:validateEmailRule , trigger: 'blur' }
          ]
          
        }
    }
  },
  watch: {
  },
  computed : {
    isEditor () {
      return this.$route.query.name
    }
  },
  mounted () {
    if (this.isEditor) {
      this.loadingForm = true
      this.searchUser()
    }
    console.log(this.$route.query.name)
  },
  methods: {
    addUser () {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            let params = this.form
            let res
            if (!this.isEditor) {
             res = await addUser(params)
            } else {  
             res = await editUser(params)
            }
            if (res.code === 200) {
              this.$router.push('setting')
            }　else　{
              throw new Error('error')
            }
          } catch (error) {
            console.log(error)
            this.loading = false
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async searchUser() {
      let params = {
        page: 1,
        pagesize: 100,
        name: this.$route.query.name
      }
      try {
        let res = await userList(params)
        for (let i in this.form) {
          this.form[i] = res.data.data[0][i]
        }
        this.form.confirmPassword = this.form.password
        this.form.status = this.form.status === 'normal' ? true : false
        this.loadingForm = false
      } catch(err) {
        console.log(err)
        this.loadingForm = false
      }
    },
    onCancel () {
      this.$router.push('setting')
    }
  }
}
</script>

