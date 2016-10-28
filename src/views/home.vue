<template>
	<div class="page-content">
		<div class="home-head-image">
			<img src="../../assets/images/Buffett@3x.png" />
			<div class="home-item">“如果要投资一家公司的管理者能够做到聪明、勤奋、正直，只要企业估值合理，必定是一个很好的标的。”</div>
			<div class="home-footer">----沃伦巴菲特<br>2016巴菲特股东大会</div>
		</div>
		<div class="biankuang">您是企业老板吗？</div>
		<div id="yes">
			<a @click="alert = true;"></a>
		</div>
		<div id="no">
			<a v-link="{path: '/no'}"></a>
		</div>
	</div>
	<div class="hint-warp" v-if="alert" transition="expand">
		<div class="hint-view">
			<div class="hint-content">快来测测您公司估值多少</div>
			<div class="hint-button" @click="startTest()">GO</div>
		</div>
	</div>
</template>
<script src="../js/home.js" type="text/javascript"></script>
<style src="../style/home.less" lang="less" scoped></style>
