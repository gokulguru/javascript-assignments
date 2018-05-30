function Task(data) {
    this.title = ko.observable(data.title);
    this.isDone = ko.observable(data.isDone);
	this.isEdit =ko.observable(data.isEdit);
}

function TaskListViewModel() {
    // Data
    var self = this;
    self.tasks = ko.observableArray([]);
    self.newTaskText = ko.observable();
 

    // Operations
    self.addTask = function() {
        self.tasks.push(new Task({ title: this.newTaskText() }));
        self.newTaskText("");
    };
	self.editTask  = function(task) {
     task.isEdit(true);
    };
		self.saveTask  = function(task) {
		
     task.isEdit(false);
    };
    self.removeTask = function(task) { self.tasks.remove(task) };
}

ko.applyBindings(new TaskListViewModel());