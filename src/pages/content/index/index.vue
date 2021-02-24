<template>
    <div class="index">
        <el-scrollbar style="height: calc(100vh - 141px);">
            <div class="content">
                <div class="left">
                    <div id="chart-panel"></div>
                </div>
                <div class="right">
                    <div id="chart-map"></div>
                </div>
            </div>
            <div id="myChart"></div>
        </el-scrollbar>
    </div>
</template>

<script lang="ts">
import {defineComponent, getCurrentInstance, reactive, onMounted} from 'vue'

export default defineComponent({
    name: "Index",
    setup() {
        const ctx = (getCurrentInstance() as any).ctx;
        const data = reactive({
            navList: []
        });
        /* 生命周期 */
        onMounted(() => {
            console.log(ctx);
            ctx.drawLine();
            ctx.panel();
            ctx.map();
        })

        /* 柱状图 */
        function drawLine() {
            // 基于准备好的dom，初始化echarts实例
            const myChart = ctx.$echarts.init(document.getElementById('myChart'));
            const dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
            const data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
            const yMax = 500;
            const dataShadow = [];

            for (let i = 0; i < data.length; i++) {
                dataShadow.push(yMax);
            }
            // 绘制图表
            myChart.setOption({
                xAxis: {
                    data: dataAxis,
                    axisLabel: {
                        inside: true,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    z: 10
                },
                yAxis: {
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#999'
                        }
                    }
                },
                dataZoom: [
                    {
                        type: 'inside'
                    }
                ],
                series: [
                    { // For shadow
                        type: 'bar',
                        itemStyle: {
                            color: 'rgba(0,0,0,0.05)'
                        },
                        barGap: '-100%',
                        barCategoryGap: '40%',
                        data: dataShadow,
                        animation: false
                    },
                    {
                        type: 'bar',
                        itemStyle: {
                            color: ctx.$echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#83bff6'},
                                    {offset: 0.5, color: '#188df0'},
                                    {offset: 1, color: '#188df0'}
                                ]
                            )
                        },
                        emphasis: {
                            itemStyle: {
                                color: ctx.$echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#2378f7'},
                                        {offset: 0.7, color: '#2378f7'},
                                        {offset: 1, color: '#83bff6'}
                                    ]
                                )
                            }
                        },
                        data: data
                    }
                ]
            });

            // Enable data zoom when user click bar.
            const zoomSize = 6;
            myChart.on('click', function (params: any) {
                console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
                myChart.dispatchAction({
                    type: 'dataZoom',
                    startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
                    endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
                });
            });
        }

        /* 饼状图 */
        function panel() {
            // 基于准备好的dom，初始化echarts实例
            const myPanel = ctx.$echarts.init(document.getElementById('chart-panel'));
            const data = [
                [5000, 10000, 6785.71],
                [4000, 10000, 6825],
                [3000, 6500, 4463.33],
                [2500, 5600, 3793.83],
                [2000, 4000, 3060],
                [2000, 4000, 3222.33],
                [2500, 4000, 3133.33],
                [1800, 4000, 3100],
                [2000, 3500, 2750],
                [2000, 3000, 2500],
                [1800, 3000, 2433.33],
                [2000, 2700, 2375],
                [1500, 2800, 2150],
                [1500, 2300, 2100],
                [1600, 3500, 2057.14],
                [1500, 2600, 2037.5],
                [1500, 2417.54, 1905.85],
                [1500, 2000, 1775],
                [1500, 1800, 1650]
            ];
            const cities = ['北京', '上海', '深圳', '广州', '苏州', '杭州', '南京', '福州', '青岛', '济南', '长春', '大连', '温州', '郑州', '武汉', '成都', '东莞', '沈阳', '烟台'];
            const barHeight = 50;

            // 绘制图表
            myPanel.setOption({
                legend: {
                    show: true,
                    data: ['价格范围', '均值']
                },
                grid: {
                    top: 100
                },
                angleAxis: {
                    type: 'category',
                    data: cities
                },
                tooltip: {
                    show: true,
                    formatter: function (params: any) {
                        const id = params.dataIndex;
                        return cities[id] + '<br>最低：' + data[id][0] + '<br>最高：' + data[id][1] + '<br>平均：' + data[id][2];
                    }
                },
                radiusAxis: {},
                polar: {},
                series: [
                    {
                        type: 'bar',
                        itemStyle: {
                            color: 'transparent'
                        },
                        data: data.map(function (d) {
                            return d[0];
                        }),
                        coordinateSystem: 'polar',
                        stack: '最大最小值',
                        silent: true
                    }, {
                        type: 'bar',
                        data: data.map(function (d) {
                            return d[1] - d[0];
                        }),
                        coordinateSystem: 'polar',
                        name: '价格范围',
                        stack: '最大最小值'
                    }, {
                        type: 'bar',
                        itemStyle: {
                            color: 'transparent'
                        },
                        data: data.map(function (d) {
                            return d[2] - barHeight;
                        }),
                        coordinateSystem: 'polar',
                        stack: '均值',
                        silent: true,
                        z: 10
                    }, {
                        type: 'bar',
                        data: data.map(function (d) {
                            return barHeight * 2;
                        }),
                        coordinateSystem: 'polar',
                        name: '均值',
                        stack: '均值',
                        barGap: '-100%',
                        z: 10
                    }]
            });

        }

        /* 地图 */
        function map() {
            // 基于准备好的dom，初始化echarts实例
            const myMap = ctx.$echarts.init(document.getElementById('chart-map'));
            const data = [];
            for (let i = 0; i <= 360; i++) {
                const t = i / 180 * Math.PI;
                const r = Math.sin(2 * t) * Math.cos(2 * t);
                data.push([r, i]);
            }
            myMap.setOption({
                legend: {
                    data: ['line']
                },
                polar: {
                    center: ['50%', '54%']
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                angleAxis: {
                    type: 'value',
                    startAngle: 0
                },
                radiusAxis: {
                    min: 0
                },
                series: [{
                    coordinateSystem: 'polar',
                    name: 'line',
                    type: 'line',
                    showSymbol: false,
                    data: data
                }],
                animationDuration: 2000
            });

        }

        /* 需要return出去才能使用 */
        return {
            data,
            drawLine,
            panel,
            map,
        }
    },
})
</script>

<style lang="stylus" scoped>
.index
    padding 20px
    background-color #ffffff

    #myChart
        width 100%
        height calc((100vh - 141px) / 2)

    .content
        height calc((100vh - 141px) / 2)
        display flex

        .left
            flex 1

            #chart-panel
                width 100%
                height 100%

        .right
            flex 1

            #chart-map
                width 100%
                height 100%

/**/
</style>
