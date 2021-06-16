<template>
	<div class="layout">
		<Layout>
			<Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
				<div class="siderLogo">
					<div class="siderLogoImg"></div>
					<div class="siderLogoTitle">LOGO</div>
				</div>
				<Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses">
					<MenuItem name="1-1" to="/home">
					<Icon type="ios-navigate-outline"></Icon>
					<span>现场督查</span>
					</MenuItem>
					<MenuItem name="1-2" to="/statistics">
					<Icon type="ios-stats-outline"></Icon>
					<span>整改统计</span>
					</MenuItem>
					<MenuItem name="1-3" to="/reportTables">
					<Icon type="ios-paper-outline" ></Icon>
					<span>报表填报</span>
					</MenuItem>
					<Submenu name="1-4">
						<template slot="title">
							<Icon type="ios-settings-outline" />
							数据模板
						</template>
						<MenuItem name="4-1" to="/system/dictionary">数据字典</MenuItem>
						<MenuItem name="4-2">报表模板</MenuItem>
					</Submenu>
				</Menu>
				<div slot="trigger"></div>
			</Sider>
			<Layout>
				<Header class="layout-header-bar"></Header>
				<Content :style="{margin: '20px', background: '#fff', minHeight: 'calc(100vh - 112px)',padding:'20px'}">
					<router-view></router-view>
				</Content>
			</Layout>
		</Layout>
	</div>
</template>

<script>
	import {
		logOut,
		getToken
	} from '../../libs/util';
	export default {
		data() {
			return {
				isCollapsed: false
			};
		},
		computed: {
			menuitemClasses: function() {
				return [
					'menu-item',
					this.isCollapsed ? 'collapsed-menu' : ''
				]
			}
		},
		methods: {
			userBarShow() {
				console.log('31')
			}
		},
		created() {

		},
		watch: {
			// $route(val) {
			// 	History.updateRoute()
			// }
		},


	}
</script>

<style>
	.layout {
		background: #f5f7f9;
		position: relative;
		overflow: hidden;
	}

	.layout-header-bar {
		background: #fff !important;
		box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
	}

	.menu-item span {
		display: inline-block;
		overflow: hidden;
		width: 69px;
		text-overflow: ellipsis;
		white-space: nowrap;
		vertical-align: bottom;
		transition: width .2s ease .2s;
	}

	.menu-item i {
		transform: translateX(0px);
		transition: font-size .2s ease, transform .2s ease;
		vertical-align: middle;
		font-size: 16px;
	}

	.ivu-menu-item>i {
		margin-right: 12px !important;
	}

	.collapsed-menu span {
		width: 0px;
		transition: width .2s ease;
	}

	.collapsed-menu i {
		transform: translateX(5px);
		transition: font-size .2s ease .2s, transform .2s ease .2s;
		vertical-align: middle;
		font-size: 22px;
	}

	.siderLogo {
		text-align: center;
		padding-top: 50px;
		padding-bottom: 50px;
	}

	.siderLogoImg {
		margin: auto;
		width: 80px;
		height: 80px;
		background-color: #bcbdbf;
		border-radius: 10px;
	}

	.siderLogoTitle {
		line-height: 60px;
		font-size: 20px;
		color: #bcbdbf;
	}
</style>
