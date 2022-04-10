import Vue from 'vue';
import App from './App.vue';
import store from './store';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({});

router.beforeEach((to, from, next) => {
	let vuexState = localStorage.getItem('vuex');
	let title = JSON.parse(vuexState).title;

	document.title = title;
	next();
});

new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App),
});
