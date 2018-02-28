var filters = {
    active: function (todos) {
        return todos.filter(function (todo) {
            return !todo.status;
        });
    },
    completed: function (todos) {
        return todos.filter(function (todo) {
            return todo.status;
        });
    },
}

var vm = new Vue({
    el: '#app',
    data: {
        todos: [
            {
                name: 'demo1',
                status: true,
            },
            {
                name: 'demo2',
                status: false,
            },
            {
                name: 'demo3',
                status: true,
            },
            {
                name: 'demo4',
                status: true,
            },
            {
                name: 'demo5',
                status: false,
            },
            {
                name: 'demo6',
                status: true,
            },
            {
                name: 'demo7',
                status: true,
            },
        ],
        todoName: '',
        updateName: '',
        tab: 'all',
        editIndex: null,
    },
    computed: {
        activeCount: function () {
            return filters.active(this.todos).length
        },
        tabTodos: function () {
            if (this.tab == 'all') {
                return this.todos;
            } else {
                return filters[this.tab](this.todos);
            }
        }
    },
    methods: {
        toggleAll: function (e) {
            this.todos = this.todos.map(function (todo, index) {
                todo.status = e.target.checked;
                return todo;
            })
        },
        clearCompleted: function () {
            this.todos = filters.active(this.todos)
        },
        createTodo: function () {
            this.todos.unshift({
                name: this.todoName,
                status: false
            })
            this.todoName = '';
        },
        destroyTodo: function (todo) {
            this.todos.splice(this.todos.indexOf(todo), 1);
        },
        updateTodo: function (todo) {
            this.editIndex = this.todos.indexOf(todo);
        },
        onUpdate: function (todo) {
            this.editIndex = null;
        }
    },
    directives: {
        'focus': function (el, binding) {
            if (binding.value) {
                el.focus()
            }
        }
    }
});

function onHashChange() {
    var tab = window.location.hash.replace(/#\/?/, '')
    vm.tab = filters[tab] ? tab : 'all';
}

window.addEventListener('hashchange', onHashChange)