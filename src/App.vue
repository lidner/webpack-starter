<template>
	<div>
		{{ getMsg }}
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			message: 'hello skiz',
		};
	},
	computed: {
		...mapGetters(['getMsg']),
	},
};
</script>

<style scoped></style>
