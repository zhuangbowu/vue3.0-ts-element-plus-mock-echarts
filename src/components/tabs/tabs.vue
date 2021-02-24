<template>
    <div class="tabs">
        <div class="content">
            <div v-for="(item,index) in tabsList" :key="index">
                {{ item }}
            </div>
        </div>
        <h2>{{ data.num }}</h2>
        <button @click="getRemoveTabs">删除tabs</button>
    </div>
</template>

<script>
import {reactive, ref, watchEffect, watch, getCurrentInstance} from 'vue'

export default {
    name: "Tabs",
    props: {
        tabsList: {
            type: Array,
            default: () => [],
        }
    },
    setup(props, context) {
        /* 代替this调用全局方法的 */
        const {ctx} = getCurrentInstance();
        const data = reactive({
            num: props.tabsList.length
        })
        watchEffect(() => {
            // console.log("tabsList1===" + props.tabsList);
        })
        watch(props.tabsList, (newVal, olVal) => {
            data.num = props.tabsList.length
        })

        function getRemoveTabs() {
            context.emit("remove");
        }

        return {
            data,
            getRemoveTabs
        }
    }
}
</script>

<style lang="stylus" scoped>
.tabs
    color black

    .content
        overflow auto
        display flex

        div
            padding 10px 20px
            cursor pointer

/**/
</style>
