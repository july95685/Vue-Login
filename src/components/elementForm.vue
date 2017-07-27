<template>
	<div style="width:90px;">
		<el-form ref="form" :model="form" label-width="90px">
			<el-form-item>
				<el-input v-model="form.name"></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				form:{
					name:""
				}
			}
		}
	}
</script>