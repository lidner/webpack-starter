import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		filter: 'all',
		todos: [],
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
		showClearCompletedButton(state) {
			return state.todos.filter(todo => todo.completed).length > 0;
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
		checkAll(state, checked) {
			state.todos.forEach(todo => (todo.completed = checked));
		},
		updateFilter(state, filter) {
			state.filter = filter;
		},
		clearCompleted(state) {
			state.todos = state.todos.filter(todo => !todo.completed);
		},
	},
	actions: {
		addTodo(context, todo) {
			context.commit('addTodo', todo);
		},
		deleteTodo(context, id) {
			context.commit('deleteTodo', id);
		},
		updateTodo(context, todo) {
			context.commit('updateTodo', todo);
		},
		checkAll(context, checked) {
			context.commit('checkAll', checked);
		},
		updateFilter(context, filter) {
			context.commit('updateFilter', filter);
		},
		clearCompleted(context) {
			context.commit('clearCompleted');
		},
	},
});

export default store;
