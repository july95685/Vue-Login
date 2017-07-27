<template lang="html">
  <div class="">
    <el-row>
      <el-col :span="10" :offset="7">
        <el-tabs >
          <el-tab-pane label="用户登录" name="first">
            <el-col >
              <el-form :model="dynamicValidateForm" label-width="100px" ref="dynamicValidateForm">
                    <el-form-item
                      prop="email"
                      label="邮箱"
                    >
                      <el-input v-model="dynamicValidateForm.email"></el-input>
                    </el-form-item>
                    <el-form-item
                    prop="password"
                    label="密码"
                    >
                      <el-input type="password" v-model="dynamicValidateForm.password"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="submitForm('dynamicValidateForm')">登录</el-button>
                    <el-button >重置</el-button>
              </el-form>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="用户注册" name="second">
            <Register></Register>
          </el-tab-pane>
      </el-tabs>
    </el-col>
    </el-row>
  </div>
</template>
<script>
import Register from '@/components/Register.vue'
import { mapActions } from "vuex"
import api from '../axios'
export default {
    name: 'login',
    data() {
        return {
            dynamicValidateForm: {
                email: '',
                password: ''
            }
        }
    },
    components: {
        Register
    },
    methods: {
        ...mapActions(['UserLogin','UserName']),
        submitForm(formName) {
            let opt = this.dynamicValidateForm;
            console.log(opt);
            api.userLogin(opt).then(({
                  data
              }) => {
                console.log(data);
                if(!data.info){
                  this.$message({
                    type: 'info',
                    message: '账号不存在'
                  })
                }
                if(data.success){
                  this.$message({
                    type: 'success',
                    message: '登录成功'
                  })
                  this.UserLogin(data.token)
                  this.UserName(opt.email)
                  this.$router.push({
                      path: '/home'
                  })
                }else{
                  this.$message({
                      type: 'info',
                      message: '密码错误'
                  })
                }
              })
        }
    }
}
</script>
