<template>
	<div class="com-tab">
		<Button size="large" @click="scrollTab('left')"><Icon type="ios-arrow-back" /></Button>
		<ul id="tab-menu">
			<li :id="'li'+index" v-for="(item,index) in list" :key="index"
				:class="{active: item[idName] === currentName}" @click="tabClick(index,item)">{{item.name}}</li>
		</ul>
		<Button size="large" @click="scrollTab('right')"><Icon type="ios-arrow-forward" /></Button>
	</div>
</template>

<script>
	export default {
		props: {
			labelName: {
				type: String,
				default: 'label'
			},
			idName: {
				type: String,
				default: 'id'
			},
			value: {},
			activeName: String
		},
		data() {
			return {
				currentName: this.value || this.activeName,
				offsetCount: 0,
				list: [{
					name: '表格表格表格表格表格1',
					id: '1'
				}, {
					name: '表格表格表格表格表格2',
					id: '2'
				}, {
					name: '表格表格表格表格表格3',
					id: '3'
				}, {
					name: '表格表格表格表格表格4',
					id: '4'
				}, {
					name: '表格表格表格表格表格5',
					id: '5'
				}, {
					name: '表格表格表格表格表格6',
					id: '6'
				}, {
					name: '表格表格表格表格表格7',
					id: '7'
				}, {
					name: '表格表格表格表格表格8',
					id: '8'
				}, {
					name: '表格表格表格表格表格9',
					id: '9'
				}, {
					name: '表格表格表格表格表格10',
					id: '10'
				}],

			}
		},
		methods: {
			// 点击tab页
			tabClick(index, item) {
				this.currentName = item.id;
			},
			// 滑动tab页签
			scrollTab(direction) {
				if (this.list.length === 0) return
				let menu = document.querySelector('#tab-menu')
				// 计算ul宽度和当前
				let ulWidth = menu.clientWidth
				const getWidth = (idName) => {
					let li = document.querySelector(idName)
					return li.clientWidth
				}
				let liWidth = 0
				this.list.forEach((ele, index) => {
					liWidth = liWidth + getWidth(`#li${index}`)
				});
				// 根据方向和宽度计算偏移量
				if (liWidth < ulWidth) return
				let distance = this.offsetCount * 100

				if (direction === 'left') {
					if (this.offsetCount > 0) {
						this.offsetCount = this.offsetCount - 1
					}
				} else if (direction === 'right') {
					if ((ulWidth + distance) < liWidth) {
						this.offsetCount = this.offsetCount + 1
					}
				}
				distance = this.offsetCount * 100
				menu.scrollTo({
					'left': distance,
					'behavior': 'smooth'
				})
			}
		},
		watch: {
			activeName(val) {
				this.setCurrentName(val)
			},
			value(value) {
				this.setCurrentName(value);
			},
		}
	}
</script>

<style>
	.com-tab {
		padding: 0;
		background: #fff;
		width: 100%;
		display: flex;
	}

	.com-tab ul {
		margin: 0;
		padding: 0;
		width: calc(100% - 54px);
		overflow: hidden;
		white-space: nowrap;
	}

	.com-tab li {
		list-style: none;
		position: relative;
		display: inline-block;
		padding: 5px 20px 5px 15px;
		border: 1px solid #dad4d8;
		border-right: none;
		cursor: pointer;
		font-size: 14px;
		line-height: 28px;
	}

	.com-tab li:first-child {
		border-left: none;
	}

	.com-tab li:last-child {
		border-right: 1px solid #dad4d8;
	}

	.com-tab li.active,
	.active>.close {
		background: #fff;
		color: #4b85fa;
		border: 1px solid #4b85fa;
	}

	.close {
		position: absolute;
		top: 2px;
		right: 2px;
		font-size: 8px;
		color: #989ba2;
	}

	.arrow {
		font-size: 20px;
		color: #989ba2;
		display: inline-block;
		width: 25px;
		height: 30px;
		border: 1px solid #dad4d8;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
</style>
