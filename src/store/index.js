import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		msg: 'lidne12341r',
	},
	getters: {
		getMsg(state) {
			return state.msg;
		},
	},
});

export default store;
