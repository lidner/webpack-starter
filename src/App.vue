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
			/>
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
		<div class="extra-container">
			<todo-check-all></todo-check-all>
			<todo-items-remaining></todo-items-remaining>
		</div>
		<div class="extra-container">
			<todo-filtered></todo-filtered>
			<transition name="fade">
				<todo-clear-completed></todo-clear-completed>
			</transition>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import TodoItem from './components/TodoItem.vue';
import TodoCheckAll from './components/TodoCheckAll.vue';
import TodoItemsRemaining from './components/TodoItemsRemaining.vue';
import TodoFiltered from './components/TodoFiltered.vue';
import TodoClearCompleted from './components/TodoClearCompleted.vue';

export default {
	data() {
		return {
			message: 'hello skiz',
			newTodo: '',
			title: '',
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
			// document.title = this.title;
			this.$store.dispatch('updateTitle', this.title);
			this.title = '';
		},
	},
	components: {
		TodoItem,
		TodoCheckAll,
		TodoItemsRemaining,
		TodoFiltered,
		TodoClearCompleted,
	},
	computed: {
		...mapGetters(['todosFiltered', 'anyRemaining']),
		idForTodo: {
			get() {
				return this.$store.state.idForTodo;
			},
			set(newId) {
				return newId;
			},
		},
	},
};
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css');

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

#app {
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
	widows: 100%;
	border: 1px solic #ccc;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
	widows: 100%;
	padding: 10px;
	border: 1px solic #ccc;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.todo-item-edit:focus {
	outline: none;
}

.completed {
	text-decoration: line-through;
	color: grey;
}

.extra-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 16px;
	border-top: 1px solid lightgrey;
	padding-top: 14px;
	margin-bottom: 14px;
	width: min(100% - 2rem, 600px);
	margin-inline: auto;
	padding-top: 3rem;
}
button {
	font-size: 14px;
	background-color: white;
	appearance: none;
	padding: 4px;
}

button:hover {
	background: lightgreen;
}

button:focus {
	outline: none;
}

.active {
	background: lightgreen;
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
