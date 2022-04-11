import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

const vuexLocalStorage = new VuexPersist({
	key: 'vuex',
	storage: window.localStorage,
});

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		filter: 'all',
		todos: [],
		title: document.title || window.localStorage.getItem('vuex.title'),
		idForTodo: 1,
		filteredTasks: [],
	},
	getters: {
		todosFiltered(state) {
			if (state.filter == 'all') {
				return state.todos;
			} else if (state.filter == 'active') {
				return state.todos.filter(todo => !todo.completed);
			} else if (state.filter == 'completed') {
				return state.todos.filter(todo => todo.completed);
			} else {
				return state.todos;
			}
		},
		remaining(state) {
			return state.todos.filter(todo => !todo.completed).length;
		},
		anyRemaining(state, getters) {
			return getters.remaining != 0;
		},
		idForTodo(state) {
			return state.idForTodo;
		},
		filteredTasks(state) {
			if (state.filter == 'all') {
				return state.filteredTasks;
			} else if (state.filter == 'active') {
				return state.filteredTasks.filter(todo => !todo.completed);
			} else if (state.filter == 'completed') {
				return state.filteredTasks.filter(todo => todo.completed);
			} else {
				return state.filteredTasks;
			}
		},
		filter(state) {
			return state.filter;
		},
	},
	mutations: {
		addTodo(state, todo) {
			state.todos.push({
				id: todo.id,
				title: todo.title,
				completed: false,
				editing: false,
			});
		},
		deleteTodo(state, id) {
			const index = state.todos.findIndex(item => item.id == id);
			state.todos.splice(index, 1);
		},
		updateTodo(state, todo) {
			const index = state.todos.findIndex(item => item.id == todo.id);
			state.todos.splice(index, 1, {
				id: todo.id,
				title: todo.title,
				completed: todo.completed,
				editing: todo.editing,
			});
		},
		updateFilter(state, filter) {
			state.filter = filter;
		},
		updateTitle(state, title) {
			document.title = title;
			state.title = title;
		},
		incrementTodoId(state) {
			state.idForTodo++;
		},
		searchTask(state, searchWord) {
			state.filteredTasks = state.todos.filter(item => {
				return item.title
					.toLowerCase()
					.includes(searchWord.toLowerCase());
			});
		},
	},
	actions: {
		addTodo(context, todo) {
			context.commit('addTodo', todo);
			context.commit('incrementTodoId');
		},
		deleteTodo(context, id) {
			context.commit('deleteTodo', id);
		},
		updateTodo(context, todo) {
			context.commit('updateTodo', todo);
		},
		updateFilter(context, filter) {
			context.commit('updateFilter', filter);
		},
		updateTitle(context, title) {
			context.commit('updateTitle', title);
		},
		searchTask(context, searchWord) {
			context.commit('searchTask', searchWord);
		},
	},
	plugins: [vuexLocalStorage.plugin],
});

export default store;
