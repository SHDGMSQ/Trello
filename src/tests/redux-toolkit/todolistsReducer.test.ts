import {TodolistType} from "@/components/Todolist/types";
import {
  addTodolist, changeFilter, changeTodolistEntityStatus, changeTodolistTitle,
  fetchTodolists,
  removeTodolist,
  todolistsReducer
} from "@/store/redux-toolkit/reducers/todolistReducer";
import {clearData} from "@/store/redux-toolkit/reducers/appReducer";

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
  test("fetchTodolistsAC: todolists should be correctly added", () => {
    const payload = [
      {id: "todoId2", title: "new todo", order: "", addedDate: ""}
    ];
    const result = todolistsReducer(initialState, fetchTodolists.fulfilled({todolists: payload}, "requestId", undefined));
    expect(result.length).toBe(1);
    expect(result[0].title).toBe("new todo");
    expect(result[0].filter).toBe("All");
    expect(result[0].entityStatus).toBe("idle");
  });
  test("removeTodolistAC: correct todolist should be removed", () => {
    const result = todolistsReducer(initialState, removeTodolist.fulfilled({todoId: "todoId2"}, "requestId", "todoId2"));
    expect(result.length).toBe(1);
    expect(result[0].title).toBe("first todo");
  });
  test("addTodolistAC: todolist should be added to correct place", () => {
    const todolist = {
      id: "todoId3",
      title: "newTodo",
      addedDate: "",
      order: ""
    }
    const result = todolistsReducer(initialState, addTodolist.fulfilled({todolist}, "requestId", "newTodo"));
    expect(result.length).toBe(3);
    expect(result[0].title).toBe("newTodo");
  });
  test("changeFilter: correct filter should be changed", () => {
    const result = todolistsReducer(initialState, changeFilter({todoId: "todoId2", value: "Completed"}));
    expect(result[0].filter).toBe("Active");
    expect(result[1].filter).toBe("Completed");
  });
  test("changeTodolistTitleAC: todolist title should change in correct todolist", () => {
    const payload = {todoId: "todoId2", title: "my new title"}
    const result = todolistsReducer(initialState, changeTodolistTitle.fulfilled(payload, "requestId", payload));

    expect(result.length).toBe(2);
    expect(result[0].title).toBe("first todo");
    expect(result[1].title).toBe("my new title");
  });
  test("changeTodolistEntityStatus: entity status should be changed in correct todolist", () => {
    const result = todolistsReducer(initialState, changeTodolistEntityStatus({todoId: "todoId1", entityStatus: "failed"}));
    expect(result.length).toBe(2);
    expect(result[0].entityStatus).toBe("failed");
    expect(result[1].entityStatus).toBe("idle");
  });
});

describe("TODOLISTS/APP REDUCER TESTS", () => {
  test("clearData: data must be correctly cleaned", () => {
    const result = todolistsReducer(initialState, clearData([], {}));
    expect(result).toEqual([]);
  });
});