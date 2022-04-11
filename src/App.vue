<template>
	<div id="app">
		<div class="container">
			<input
				type="text"
				class="todo-input"
				placeholder="Title"
				v-model="title"
				@keyup.enter="changeTitle"
			/>
			<input
				type="text"
				class="todo-input"
				placeholder="Пиши уже задачи, чтобы не забывать их"
				v-model="newTodo"
				@keyup.enter="addTodo"
				@keyup="searchTask"
			/>
			<!-- <div class="container search-block"> -->
			<div>
				<select
					class="todo-input"
					name="filter"
					@change="changeFilter"
					v-model="filter"
				>
					<option value="all">Все</option>
					<option value="active">Активные</option>
					<option value="completed">Выполненные</option>
				</select>
			</div>
			<!-- <input
				type="text"
				class="todo-input"
				placeholder="Поиск задач"
				v-model="search"
				@keyup="searchTask"
			/> -->
			<!-- </div> -->
			<transition-group
				name="fade"
				enter-active-class="animated fadeInUp"
				leave-active-class="animated fadeOutDown"
			>
				<todo-item
					v-for="todo in todosFiltered"
					:key="todo.id"
					:todo="todo"
					:checkAll="!anyRemaining"
				></todo-item>
			</transition-group>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import TodoItem from './components/TodoItem.vue';

export default {
	data() {
		return {
			message: 'hello skiz',
			newTodo: '',
			title: '',
			search: '',
		};
	},
	methods: {
		addTodo() {
			if (this.newTodo.trim().length == 0) {
				return;
			}

			this.$store.dispatch('addTodo', {
				id: this.idForTodo,
				title: this.newTodo,
			});

			this.newTodo = '';
			this.idForTodo++;
		},
		changeTitle() {
			this.$store.dispatch('updateTitle', this.title);
			this.title = '';
		},
		changeFilter(event) {
			let filter = event.target.value;
			this.$store.dispatch('updateFilter', filter);
		},
		searchTask(e) {
			let search = e.target.value;
			let todos = this.todosFiltered;

			if (e.target.value.trim() == '') {
				console.log('empty');
			} else {
				this.$store.dispatch('searchTask', search);
			}
			// this.filteredTasks = todos.filter(item => {
			// 	return item.title.toLowerCase().includes(search.toLowerCase());
			// });
		},
	},
	components: {
		TodoItem,
	},
	computed: {
		...mapGetters([
			'todosFiltered',
			'anyRemaining',
			'filteredTasks',
			'filter',
		]),
		idForTodo: {
			get() {
				return this.$store.state.idForTodo;
			},
			set(newId) {
				return newId;
			},
		},
		filter: {
			get() {
				return this.$store.state.filter;
			},
			set(newFilter) {
				return newFilter;
			},
		},
	},
};
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css');
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

#app {
	font-family: 'Roboto', sans-serif;
}

.container {
	width: min(100% - 2rem, 600px);
	margin-inline: auto;
	padding-top: 3rem;
}

.todo-input {
	width: 100%;
	padding: 10px 18px;
	font-size: 18px;
	margin-bottom: 16px;
}

.todo-input:focus {
	outline: 0;
}

.todo-item {
	margin-bottom: 12px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	animation-duration: 0.3s;
	font-size: 24px;
	color: #2c3e50;
	width: 100%;
	border: 1px solic #ccc;
}

.remove-item {
	cursor: pointer;
	margin-left: 14px;
}

.remove-item:hover {
	color: red;
}

.todo-item-left {
	display: flex;
	width: 100%;
}

.todo-item-label {
	padding: 10px;
	border: 1px solid white;
	margin-left: 12px;
}

.todo-item-edit {
	font-size: 24px;
	color: #2c3e50;
	margin-left: 12px;
	width: 100%;
	padding: 10px;
	border: 1px solic #ccc;
}

.todo-item-edit:focus {
	outline: none;
}

.completed {
	text-decoration: line-through;
	color: grey;
}

.search-block {
	display: flex;
	gap: 2rem;
	justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
