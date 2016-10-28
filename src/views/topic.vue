<template>
	<div class="page-content" style="padding-top: 50px;">
		<form id="form1" name="form1" method="post" action="">
			<div name="time" id="score" class="init" v-show="STEP1">
				<div class="biankuang">1.您的企业成立不到三年？</div>
				<label><input type="radio" name="score"  value="10" 
                    @click="checkedYES(0)"/><img :src="yesURL"></label>
				<label><input type="radio" name="score"  value="15" 
                    @click="checkedYES(1)"/><img :src="noURL"></label>
			</div>
			<div id="case" class="init-other" v-for="item in topics" v-show="item.STEP">
				<div class="biankuang">{{item.title}}</div>
				<label>
                    <input type="radio" name="score{{$index + 1}}"  :value="item.A_VALUE" @click="radioChecked($index,0)"/>
                    <img :src="item.A_URL" />
                    <span>{{item.A_NAME}}</span>
                </label>
				<label>
                    <input type="radio" name="score{{$index + 1}}"  :value="item.B_VALUE" @click="radioChecked($index,1)"/>
                    <img :src="item.B_URL">
                    <span>{{item.B_NAME}}</span>
                </label>
				<label>
                    <input type="radio" name="score{{$index + 1}}"  :value="item.C_VALUE" @click="radioChecked($index,2)"/>
                    <img :src="item.C_URL">
                    <span>{{item.C_NAME}}</span>
                </label>
				<label v-if="item.D_VALUE != null">
                    <input type="radio" name="score{{$index + 1}}"  :value="item.D_VALUE" @click="radioChecked($index,3)"/>
                    <img :src="item.D_URL">
                    <span>{{item.D_NAME}}</span>
                </label>
			</div>
			<div class="message-view" v-show="messageView">
				<div class="message-input">
					<input type="number" name="register" id="register" placeholder="注册资金" number>
					<span>/万元</span>
				</div>
				<div class="message-input">
					<input type="number" name="actual" id="actual" placeholder="实缴资金" number>
					<span>/万元</span>
				</div>
				<div class="message-input">
					<input type="number" name="profit" id="profit" placeholder="上一年度利润" number>
					<span>/万元</span>
				</div>
				<input class="messae-submit" type="button" @click="submit" value="提交" id="calBut" />
			</div>
		</from>
	</div>
</template>
<script src="../js/topic.js" type="text/javascript"></script>
<style src="../style/topic.less" lang="less" scoped></style>