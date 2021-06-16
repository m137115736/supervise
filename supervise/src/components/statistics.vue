<template>
	<div class="statistics">
		<div class="s_Top">
			<Form :model="s_ScreenData" :label-width="80" inline>
				<FormItem label="起止时间:">
					<DatePicker type="daterange" placement="bottom-end" placeholder="选择统计起止时间" style="width: 430px">
					</DatePicker>
				</FormItem>
				<FormItem :label-width="0">
					<Button type="primary" icon="ios-search">查询</Button>
				</FormItem>
			</Form>
		</div>
		<div class="s_Chart" ref="s_Chart">
			<div ref="main" :style="{width:chartWidth +'px',height:'400px'}"></div>
		</div>
		<div class="s_Table">
			<Table stripe :columns="columns1" :data="data1"></Table>
		</div>
	</div>

</template>

<script>
	import * as echarts from 'echarts';
	export default {
		data() {
			return {
				chartWidth: '',
				s_ScreenData: {

				},
				columns1: [{
					type: 'index',
					width: 60,
					align: 'center'
				}, {
					title: '单位',
					key: 'dw'
				}, {
					title: '问题数',
					key: 'wts',
					align: 'center'
				}, {
					title: '整改数',
					key: 'zgs',
					align: 'center'
				}, {
					title: '反馈及时率',
					key: 'fkjsl',
					align: 'center'
				}, {
					title: '整改率',
					key: 'zgl',
					align: 'center'
				}],
				data1: [{
					dw: '市区公司',
					wts: 18,
					zgs: 20,
					fkjsl: '50%',
					zgl: '70%'
				}, {
					dw: '市区公司',
					wts: 18,
					zgs: 20,
					fkjsl: '50%',
					zgl: '70%'
				}, {
					dw: '市区公司',
					wts: 18,
					zgs: 20,
					fkjsl: '50%',
					zgl: '70%'
				}, {
					dw: '市区公司',
					wts: 18,
					zgs: 20,
					fkjsl: '50%',
					zgl: '70%'
				}, {
					dw: '市区公司',
					wts: 18,
					zgs: 20,
					fkjsl: '50%',
					zgl: '70%'
				}, {
					dw: '市区公司',
					wts: 18,
					zgs: 20,
					fkjsl: '50%',
					zgl: '70%'
				}, {
					dw: '市区公司',
					wts: 18,
					zgs: 20,
					fkjsl: '50%',
					zgl: '70%'
				}]
			}
		},
		methods: {
			getCharts() {
				var _this = this;
				var myChart = echarts.init(_this.$refs.main);
				var option;

				option = {
					title: {
						text: "整改率（2021-05-22）",
						left: "center",
						textStyle: {
							fontSize: 30
						},
					},
					grid: {
						top: '70px',
						left: '20px',
						right: '20px',
						bottom: '20px',
						containLabel: true
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							crossStyle: {
								color: '#999'
							}
						}
					},
					legend: {
						left: 'right',
						data: ['问题数', '整改数', '反馈及时率', '整改率']
					},
					xAxis: [{
						type: 'category',
						data: ['市区', '北碚', '市北', '市南', '永川', '綦南', '江津', '万州', '长寿', '璧山', '川东', '大足', '武隆',
							'潼南', '南川', '巫溪', '城口', '铜梁', '开州', '合川', '黔江', '丰都', '垫江', '忠县', '云阳', '巫山',
							'石柱', '秀山', '酉阳', '彭水', '奉节'
						],
						axisPointer: {
							type: 'shadow'
						}
					}],
					yAxis: [{
						type: 'value',
						name: '数量',
						nameTextStyle: {
							align: 'right'
						},
						min: 0,
						max: 200,
						interval: 40,
						axisLabel: {
							formatter: '{value}'
						}
					}, {
						type: 'value',
						name: '整改率',
						nameTextStyle: {
							align: 'left'
						},
						min: 0,
						max: 100,
						interval: 20,
						axisLabel: {
							formatter: '{value} %'
						}
					}],
					series: [{
						name: '问题数',
						type: 'bar',
						data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3, 2.0, 4.9,
							7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3, 76.7, 135.6, 162.2,
							32.6, 20.0, 6.4, 3.3
						]
					}, {
						name: '整改数',
						type: 'bar',
						data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3, 2.6, 5.9,
							9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3, 70.7, 115.6, 122.2,
							48.7, 18.8, 6.0, 2.3
						]
					}, {
						name: '反馈及时率',
						type: 'line',
						yAxisIndex: 1,
						data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2, 2.0, 2.2, 3.3,
							4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2, 10.2, 20.3, 23.4, 23.0,
							16.5, 12.0, 6.2
						]
					}, {
						name: '整改率',
						type: 'line',
						yAxisIndex: 1,
						data: [4.0, 4.2, 5.3, 4.5, 10.3, 10.2, 30.3, 43.4, 63.0, 26.5, 18.0, 6.2, 4.0, 4.2,
							5.3, 4.5, 10.3, 10.2, 30.3, 43.4, 63.0, 26.5, 18.0, 6.2, 10.3, 10.2, 30.3,
							43.4, 63.0, 26.5, 18.0
						]
					}]
				};
				option && myChart.setOption(option);
			},
		},
		mounted() {
			const chartWidth = this.$refs.s_Chart.style;
			this.chartWidth = chartWidth - 200;
			this.$nextTick(() => {
				this.getCharts();
			})

		}
	}
</script>

<style>
	.s_Chart {
		width: 100%;
		height: 400px;
	}

	.main {
		width: 100%;
		height: 100%;
	}
</style>
