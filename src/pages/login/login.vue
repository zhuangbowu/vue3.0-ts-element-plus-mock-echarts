<template>
    <div class="login">
        <div class="content">
            <div class="wrapper">
                <div class="title">
                    登录页面
                </div>
                <el-input type="text"
                          v-model="data.loginForm.userName"
                          prefix-icon="el-icon-user-solid"
                          placeholder="请输入用户名"></el-input>
                <el-input type="password"
                          v-model="data.loginForm.password"
                          prefix-icon="el-icon-s-custom"
                          placeholder="请输入密码"></el-input>
                <el-button type="primary" @click="getLogin">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, getCurrentInstance, reactive, onMounted} from 'vue'
import store from "@/store"
import router from "@/router";

export default defineComponent({
    name: "Login",
    setup() {
        const ctx = (getCurrentInstance() as any).ctx;
        const data = reactive({
            loginForm: {
                userName: "admin",
                password: "admin",
            }
        });
        /* 生命周期 */
        onMounted(() => {
            console.log(ctx)
        })
        const getLogin = () => {
            ctx.$getConfig.openLoad(ctx);
            const apiData = {
                phone: data.loginForm.userName,
                password: data.loginForm.userName,
            };
            ctx.$getApi.info.getLogin(apiData)
                .then((res: any) => {
                    console.log(res);
                    ctx.$getConfig.closeLoad(ctx);
                    store.commit('setUserInfo', res.data);
                    ctx.$message.success("登陆成功")
                    router.push('/home/index');
                })
                .catch((error: any) => {
                    ctx.$message.error(error.msg);
                    ctx.$getConfig.closeLoad(ctx);
                })

        }

        /* 需要return出去才能使用 */
        return {
            data,
            getLogin
        }
    },
})
</script>

<style lang="stylus" scoped>
.login
    height 100vh
    width 100%
    display flex
    align-items center
    justify-content center
    background url("../../static/img/back.jpg") no-repeat center center
    background-size cover

    .content
        border-radius 4px
        padding 20px
        width 500px
        height 500px
        text-align center
        box-sizing border-box
        background-color rgba(255, 255, 255, 0.1)
        box-shadow 0 0 12px 6px rgba(0, 0, 0, 0.2)
        display flex
        align-items center
        justify-content center

        .wrapper
            padding 0 50px

            .title
                font-size 40px
                font-weight 700
                margin-bottom 40px

            .el-input
                margin-bottom 20px

/**/
</style>
