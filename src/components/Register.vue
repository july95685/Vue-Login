<template>
  <el-card class="box-card">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-form ref="registerValidateForm"
        :model="formRegister"
         label-position="left" 
         label-width="80px" >
          <el-form-item label="账号" prop="email">
            <el-input v-model="formRegister.email" ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formRegister.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input v-model="formRegister.checkPass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addUser('registerValidateForm')">立即注册</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import api from '../axios'
export default{
  data(){
    return {
      formRegister:{
            email: '',
            password: '',
            checkPass: '',
            first: 'first'
          }
    }
  },
  methods:{
    addUser:function(formName){
      let opt = this.formRegister;
      console.log(opt);
      api.userRegister(opt).then(({
          data
      }) => {
          if (data.success) {
              this.$message({
                  type: 'success',
                  message: `注册成功，请登录`
              })
              //  Register 设计为了 Login 的组件，所以成功跳转时刷新一次页面
              this.$router.go(0)
              this.$router.push('/login')
          } else {
              this.$message({
                  type: 'info',
                  message: '此账户已存在'
              })
          }
      }).catch((err) => {
          console.log(err);
      })
    }
  }
}
</script>
