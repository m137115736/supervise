<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	export default {
		name: 'app',
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;

	}

	.ivu-btn {
		border-radius: 0px !important;
	}

	.ivu-input {
		border-radius: 0px !important;
	}
	.ivu-select-selection{
		border-radius: 0px !important;
	}
</style>
