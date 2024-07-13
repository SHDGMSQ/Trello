import {TodolistType} from "@/components/Todolist/types";
import {
  addTodolistAC,
  changeFilterAC, changeTodolistEntityStatusAC, changeTodolistTitleAC,
  removeTodolistAC,
  setTodolistsAC,
  todolistReducer
} from "@/store/redux/reducers/todolistReducer";
import {setEmptyDataValuesAC} from "@/store/redux/reducers/appReducer";

let initialState: Array<TodolistType>;

beforeEach(() => {
  initialState = [
    {
      id: "todoId1",
      title: "first todo",
      order: "",
      addedDate: "",
      entityStatus: "idle",
      filter: "Active"
    },
    {
      id: "todoId2",
      title: "sec todo",
      order: "",
      addedDate: "",
      entityStatus: "idle",
      filter: "Active"
    },
  ];
});

describe("TODOLISTS REDUCER TESTS", () => {
  test("setTodolistsAC: todolists should be correctly added", () => {
    const result = todolistReducer(initialState, setTodolistsAC([
      {id: "todoId2", title: "new todo", order: "", addedDate: ""}
    ]));
    expect(result.length).toBe(1);
    expect(result[0].title).toBe("new todo");
    expect(result[0].filter).toBe("All");
    expect(result[0].entityStatus).toBe("idle");
  });
  test("removeTodolistAC: correct todolist should be removed", () => {
    const result = todolistReducer(initialState, removeTodolistAC("todoId2"));
    expect(result.length).toBe(1);
    expect(result[0].title).toBe("first todo");
  });
  test("addTodolistAC: todolist should be added to correct place", () => {
    const result = todolistReducer(initialState, addTodolistAC({
      id: "todoId3",
      title: "newTodo",
      addedDate: "",
      order: ""
    }));
    expect(result.length).toBe(3);
    expect(result[0].title).toBe("newTodo");
  });
  test("changeFilterAC: correct filter should be changed", () => {
    const result = todolistReducer(initialState, changeFilterAC("todoId2", "Completed"));
    expect(result[0].filter).toBe("Active");
    expect(result[1].filter).toBe("Completed");
  });
  test("changeTodolistTitleAC: todolist title should change in correct todolist", () => {
    const result = todolistReducer(initialState, changeTodolistTitleAC("todoId2", "my new title"));
    expect(result.length).toBe(2);
    expect(result[0].title).toBe("first todo");
    expect(result[1].title).toBe("my new title");
  });
  test("changeTodolistEntityStatusAC: entity status should be changed in correct todolist", () => {
    const result = todolistReducer(initialState, changeTodolistEntityStatusAC("todoId1", "failed"));
    expect(result.length).toBe(2);
    expect(result[0].entityStatus).toBe("failed");
    expect(result[1].entityStatus).toBe("idle");
  });
});

describe("TODOLISTS/APP REDUCER TESTS", () => {
  test("setEmptyDataValuesAC: data must be correctly cleaned", () => {
    const result = todolistReducer(initialState, setEmptyDataValuesAC());
    expect(result).toEqual([]);
  });
});