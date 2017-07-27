<template >
<div class="hello">
    <h1>{{mes}} : {{username}}</h1>

    <!-- v-for在进行过度时，使用 transition-group 标签，使用后内层标签需要有独有的 key 值 -->
    <transition-group name="list-complete" tag="ul">
        <li  v-for="(item, index) in user" class="list-complete-item" style="display:block" :key="item._id">
            {{ index+1 }}. {{ item.email }}
            <el-button type=""  @click="del_user(index)">删除</el-button>
        </li>
    </transition-group>
    <br>
    <el-button type="primary" @click="logout()" >登出</el-button>
</div>
</template>

<script>
import api from '../axios'
import { mapActions,mapState } from 'vuex'

export default {
    name: 'home',
    data(){
        return {
            mes:"Welcome to Vue-login",
            user: "",
            username: "",
        }
    },
    mounted(){
        this.get_User()
        this.username = localStorage.getItem('username')
    },
    computed:{
     ...mapState({
            token: state => state.token
        }),
    },
    methods:{
        ...mapActions([ 'UserLogout']),
        get_User(){
            setTimeout(() => {
                api.getUser().then(({
                    data
                }) => {
                    console.log(data);
                    if (data.status == 401) {
                        this.$router.push('/login')
                    } else {
                        this.user = data
                    }
                })
            }, 100)
        },
        logout(){
            console.log(this.token);
            this.UserLogout()
            if (!this.token) {
                this.$router.push('/login')
                this.$message({
                    type: 'success',
                    message: '登出成功'
                })
            } else {
                this.$message({
                    type: 'info',
                    message: '登出失败'
                })
            }
        },
        del_user(id){
            console.log(id);
            let opt = {
                id:this.user[id]._id
            }
            api.delUser(opt).then( (response) => {
                console.log(response)
                this.$message({
                    type:"success",
                    message:"删除成功"
                })
                this.get_User()
            }).catch((err) => {
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    /*display: inline-block;*/
    margin: 10px 0;
}

a {
    color: #42b983;
}

.list-complete-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
}

.list-complete-enter,
.list-complete-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.list-complete-leave-active {
    position: absolute;
}
</style>