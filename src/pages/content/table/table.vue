<template>
    <div class="table">
        <h1>
            table
        </h1>
    </div>
</template>

<script lang="ts">
import {defineComponent, getCurrentInstance, reactive, onMounted} from 'vue'
import store from "@/store"
import router from "@/router";
import {consoleLog} from "echarts/lib/util/log";

export default defineComponent({
    name: "Table",
    setup() {
        const ctx = (getCurrentInstance() as any).ctx;
        const data = reactive({

        });
        /* 生命周期 */
        onMounted(() => {
            console.log(ctx)
        })

        /* 需要return出去才能使用 */
        return {
            data,
        }
    },
})
</script>

<style lang="stylus" scoped>
.table
    color #000

/**/
</style>
