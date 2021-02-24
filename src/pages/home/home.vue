<template>
    <div class="home">
        <el-header>
            <div class="logo">
                <div class="icon">
                    <i :class="data.isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"
                       @click="data.isCollapse=!data.isCollapse"></i>
                </div>
                <div class="logo-icon">
                    <div class="title">这是一个logo</div>
                </div>
            </div>
            <el-dropdown @command="handleClick">
                <div class="avatar">
                    <div class="name">
                        {{ getStore().userName }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </div>
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="退出登录">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-header>
        <el-container>
            <el-aside :width="data.isCollapse?'65px':'200px'">
                <el-menu
                    :router="true"
                    class="el-menu-vertical-demo"
                    :collapse-transition="true"
                    :collapse="data.isCollapse">
                    <el-menu-item index="/home/index">
                        <i class="el-icon-s-home"></i>
                        <template #title>首页</template>
                    </el-menu-item>
                    <el-submenu index="/content">
                        <template #title>
                            <i class="el-icon-menu"></i>
                            <span>功能一</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/content/table">表格</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <div class="content" :style="{width:(data.isCollapse?'calc(100% - 65px)':'calc(100% - 200px)')}">
                <div class="tabs">
                    <div class="tab-content">
                        <el-tabs type="card"
                                 closable
                                 v-model="data.editableTabsValue"
                                 @tab-remove="removeTab">
                            <el-tab-pane
                                v-for="item in data.editableTabs"
                                :key="item.name"
                                :label="item.title"
                                :name="item.name"
                            >
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="more">
                        <el-dropdown type="primary"
                                     @command="handleClickTabs">
                            <el-button type="primary" size="mini">
                                标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item command="关闭当前">关闭当前</el-dropdown-item>
                                    <el-dropdown-item command="关闭其他">关闭其他</el-dropdown-item>
                                    <el-dropdown-item command="关闭所有">关闭所有</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </div>
                <el-main>
                    <router-view class="wrapper"/>
                </el-main>
            </div>
        </el-container>
    </div>
</template>

<script lang="ts">
import {defineComponent, getCurrentInstance, reactive, onMounted} from 'vue'
import store from "@/store"
import router from "@/router";
import {consoleLog} from "echarts/lib/util/log";

export default defineComponent({
    name: "Home",
    setup() {
        const ctx = (getCurrentInstance() as any).ctx;
        const data = reactive({
            navList: [],
            isCollapse: false,
            editableTabsValue: '/home/index',
            editableTabs: [
                {
                    title: '首页',
                    name: '/home/index',
                }, {
                    title: '基础表格',
                    name: '/content/table',
                }
            ],
        });
        /* 生命周期 */
        onMounted(() => {
            ctx.$bus.$on("tags", (msg: any) => {
                console.log(msg);
            })
        })

        function getTabs() {
            const data = {
                name: "李瑞"
            }
            ctx.$bus.$emit('tags', data);
        }

        /* 下拉菜单 */
        function handleClick(index: string) {
            switch (index) {
                case "退出登录":
                    router.push('/login');
                    store.commit('close');
                    break;
            }
        }

        /* tabs下拉菜单 */
        function handleClickTabs(index: string) {
            consoleLog(index)
        }

        /* 删除标签 */
        function removeTab(targetName: any) {
            console.log(targetName)
            const tabs = data.editableTabs;
            let activeName = data.editableTabsValue;
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        const nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                        }
                    }
                });
            }
        }

        function getStore() {
            return ctx.$store.state.userInfo;
        }

        /* 需要return出去才能使用 */
        return {
            data,
            getStore,
            handleClick,
            removeTab,
            handleClickTabs,
        }
    },
})
</script>

<style lang="stylus" scoped>
.home
    height 100vh

    .el-header
        position relative
        z-index 1
        background-color #ffffff
        box-shadow 0 1px 1px #E4E7ED
        display flex
        justify-content space-between
        align-items center

        .logo
            display flex

            .icon
                cursor pointer
                font-size 24px
                line-height 40px
                margin-right 20px

                i
                    transition all .3s ease-in-out
                    font-size 24px


            .logo-icon
                .title
                    line-height 40px
                    color #000
                    font-size 30px
                    font-weight 700

                img
                    height 40px

        .avatar
            cursor pointer
            display flex

            .name
                font-size 20px
                line-height 40px
                color #333
                margin-right 20px

                i
                    margin-left 10px
                    font-size 16px
                    color #333

    .el-container
        height calc(100vh - 60px)

        .el-aside
            transition width .3s ease-in-out

            .el-menu
                height 100%

        .content
            transition width .3s ease-in-out

            .tabs
                background-color #ffffff
                position relative
                //box-shadow 0 1px 3px rgba(0, 0, 0, 0.2)
                height 41px

                .tab-content
                    border-bottom 1px solid #E4E7ED
                    width 100%
                    overflow hidden
                    box-sizing border-box
                    padding-right 120px

                .more
                    position absolute
                    right 0
                    top 0
                    height 41px
                    width 120px
                    display flex
                    align-items center
                    justify-content center
                    text-align center

            .el-main
                height calc(100vh - 101px)

                .wrapper
                    overflow hidden
                    background-color #ffffff
                    border-radius 4px
                    height 100%
                    box-sizing border-box

/**/
</style>
