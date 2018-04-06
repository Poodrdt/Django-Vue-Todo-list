var filters = {
  all: function(todos) {
    return todos;
  },
  complete: function(todos) {
    return todos.filter(function(todo) {
      return todo.complete;
    });
  },
  incomplete: function(todos) {
    return todos.filter(function(todo) {
      return !todo.complete;
    });
  }
};

var app = new Vue({
  el: '#app',
  delimiters: ['[[',']]'],
  data: {
    apiUrl: '/api/tasks/',
    inputVal: '',
    todos: [],
    visibility: 'all'
  },
  mounted: function() {
        this.$http.get(this.apiUrl).then(function (response) {
            this.todos = response.data;
        });
  },
  computed: {
    filteredTodos: function () {
      return filters[this.visibility](this.todos);
    }
  },
  methods: {
    addTodo: function(e) {
      e.preventDefault();
      if (this.inputVal) {
        this.todos.push({
          title: this.inputVal,
          complete: false
        });
        var newTask = {
          title: this.inputVal.trim()
        };
        this.$http.post(this.apiUrl, newTask)
      }
      this.inputVal = '';
    },
    toggleTodo: function(todo, index) {
      todo.complete = !todo.complete;
      var patchTask = {
        complete: todo.complete
      };
      this.$http.patch(this.apiUrl.concat(this.todos[index].id, '/'), patchTask);
    },
    filterTodos: function(filter) {
      this.visibility = filter;
    },
    deleteTodo: function(index) {
      this.$http.delete(this.apiUrl.concat(this.todos[index].id));
      this.todos.splice(index, 1);
    }
  }
});