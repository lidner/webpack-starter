import Vue from 'vue';
import App from './App.vue';
import store from './store';
import VueRouter from 'vue-router';
import Vue2TouchEvents from 'vue2-touch-events';

Vue.use(VueRouter);
Vue.use(Vue2TouchEvents);

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
