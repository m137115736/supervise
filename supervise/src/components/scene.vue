<template>
	<Tabs type="card">
		<TabPane label="现场督查">
			<sFirst />
		</TabPane>
		<TabPane label="问题详情">
			<sProblem></sProblem>
		</TabPane>
		<TabPane label="预(告)警单详情">
			<!-- <sCaution></sCaution> -->
		</TabPane>
	</Tabs>
</template>

<script>
	import sFirst from './scene-first.vue';
	import sProblem from './scene-problem.vue';
	import sCaution from './scene-caution.vue'
	export default {
		components: {
			sFirst,
			sProblem,
			sCaution
		},
		data() {
			return {

			}
		}
	}
</script>
<style>
	.ivu-modal-header {
		background-color: #f5f7fa;
	}

	.ivu-modal-content {
		border-radius: 0px;
	}

	.ivu-form-item {
		/* margin-bottom: 16px !important; */
	}
</style>
