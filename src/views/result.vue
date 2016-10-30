<template>
	<div class="page-content" style="padding-top: 50px;">
		<div class="result-view">
            <div class="biankuang-result" v-if="friendResultShow">
				<span class="your-price">您好友的企业估值：</span>
				<span id="firstResult">{{friendResult}}万元</span>
			</div>
			<div class="biankuang-result">
				<span class="your-price">您的企业估值：</span>
				<span id="firstResult">{{firstResult}}万元</span>
			</div>
			<div class="fdfdfdf">
				分享给好友，召唤您身边的老板朋友<br>来测企业估值啦！<br>
				<span>即可获取一次抽奖机会<br>奖品内容：企业估值诊断书一份<br>(价值2万元)</span>
			</div>
			<i class="down-page-icon" @click="goContact()"></i>
		</div>
	</div>
</template>

<script src="../js/result.js" type="text/javascript"></script>
<style src="../style/topic.less" lang="less" scoped></style>
