<template>
    <div>
        <el-form 
            :rules="rules" 
            ref="loginForm" 
            :model="loginForm" 
            class="loginContainer"
            v-loading="loading"
            element-loading-text="正在登录..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
            <h3 class="loginTitle">系统登陆</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" 
                        auto-complete="off" placeholder="请输入用户名" @keydown.enter.native="submitLogin"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password"
                        auto-complete="off" placeholder="请输入密码" @keydown.enter.native="submitLogin"></el-input>
            </el-form-item>
            记住密码<el-checkbox class="loginRemember" v-model="checked"></el-checkbox>
            <el-button type="primary" style="width:100%" @click="submitLogin">登录</el-button>
        </el-form>
    </div>
</template>

<script>


export default {
    name:"Login",
    data(){
        return{
            loading:false,
            checked:false,
            loginForm:{
                username:'admin',
                password:'123'
            },
            rules:{
                username:[{required:true , message:'请输入用户名' , trigger:'blur'}],
                password:[{required:true , message:'请输入密码' , trigger:'blur'}]
            }
        }
    },
    methods:{
        submitLogin(){
            this.$refs.loginForm.validate((valid)=> {
                if(valid){
                    this.loading = true;
                    this.postKeyValueRequest('/doLogin',this.loginForm).then(resp=>{
                        this.loading = false;
                        if(resp){
                            window.sessionStorage.setItem("user", JSON.stringify(resp.object));
                            let path = this.$route.query.redirect;
                            this.$router.replace((path=='/'||path==undefined)?'/home':path)
                        }
                    })
                    // alert('submit');
                }else{
                    this.$message.error('请输入账号或者密码')
                    return false;
                }
            })
        }
    }
}
</script>

<style>
    .loginContainer{
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px ;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .loginTitle{
        margin: 15px auto 20px auto;
        text-align: center;
        color: #505450;
    }
    .loginRemember{
        text-align: left;
        margin: 0px 0px 15px 0px;
    }
</style>