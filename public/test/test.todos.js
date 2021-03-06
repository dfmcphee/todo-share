describe("Library Tests", function() {
  before(function() {
    return $.ajax = function() {
      return true;
    };
  });
  it("Should be able to add a new Todo", function() {
    var list, todo;
    list = new List();
    todo = {
      _id: "1",
      content: "test todo",
      complete: false
    };
    list.add(todo);
    assert(list.todos.length === 1);
  });
  it("Should initialize todo correctly", function() {
    var list, todo;
    list = new List("a", "Title");
    todo = new Todo("1", "test content", false, "a");
    list.add(todo);
    assert(list.todos[0].content === "test content");
  });
  it("Should be able to remove a Todo", function() {
    var list, todo;
    list = new List("a", "list title");
    todo = new Todo("1", "test todo", false, "a");
    list.add(todo);
    list.removeTodo("1");
    assert(list.todos.length === 0);
  });
  it("Should be able to update a Todo", function() {
    var list, response, result, todo, update;
    list = new List("a", "list title");
    todo = new Todo("1", "test todo", false, "a");
    list.add(todo);
    update = {
      id: "1",
      content: "updated todo",
      complete: true
    };
    response = list.updateTodo(update);
    result = list.findById("1");
    assert(response === true);
    assert(result.content === "updated todo");
    assert(result.complete === true);
  });
  it("Should be able to search for a Todo", function() {
    var list, result, todo;
    list = new List("a", "list title");
    todo = new Todo("1", "test todo", false, "a");
    list.add(todo);
    result = list.findById("1");
    assert(result === list.todos[0]);
  });
  it("Search should return false if no results", function() {
    var list, result, todo;
    list = new List("a", "list title");
    todo = new Todo("1", "test todo", false, "a");
    list.add(todo);
    result = list.findById("3");
    assert(result === false);
  });
});
