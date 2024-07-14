import {TasksType} from "@/components/Task/types";
import {TaskPriorities, TaskStatuses} from "@/api/types";
import {
  addTaskTC,
  changeTaskTC,
  fetchTasksTC,
  removeTaskTC,
  tasksReducer
} from "@/store/redux-toolkit/reducers/taskReducer";
import {addTodolistTC, fetchTodolistsTC, removeTodolistTC} from "@/store/redux-toolkit/reducers/todolistReducer";
import {clearData} from "@/store/redux-toolkit/reducers/appReducer";

let initialState: TasksType;

beforeEach(() => {
  initialState = {
    "todoId1": [
      {
        id: "1",
        status: TaskStatuses.New,
        title: "task",
        addedDate: "",
        deadline: "",
        description: "",
        order: "",
        startDate: "",
        todoListId: "todoId1",
        priority: TaskPriorities.Low
      }
    ],
    "todoId2": [
      {
        id: "1",
        status: TaskStatuses.New,
        title: "task2",
        addedDate: "",
        deadline: "",
        description: "",
        order: "",
        startDate: "",
        todoListId: "todoId2",
        priority: TaskPriorities.Low
      }
    ],
  };
});

describe("TASKS REDUCER TESTS", () => {
  test("setTasksAC: correct task should be set to correct array", () => {
    const payload = {tasks: [
        {
          id: "2",
          title: "newTask",
          description: "",
          todoListId: "todoId2",
          order: "",
          status: TaskStatuses.New,
          priority: TaskPriorities.Hi,
          startDate: "",
          deadline: "",
          addedDate: "",
        }
      ], todoId: "todoId2"};
    const result = tasksReducer(initialState, fetchTasksTC.fulfilled(payload, "requestId", "todoId2"));

    expect(result["todoId1"].length).toBe(1);
    expect(result["todoId2"].length).toBe(1);
    expect(result["todoId2"][0].title).toBe("newTask");
    expect(result["todoId1"][0].title).toBe("task");
  });
  test("addTaskAC: correct task should be add to correct array", () => {
    const payload = {todoId: "todoId2", task: {id: "2",
        title: "newTask",
        description: "",
        todoListId: "todoId2",
        order: "",
        status: TaskStatuses.New,
        priority: TaskPriorities.Hi,
        startDate: "",
        deadline: "",
        addedDate: "",}}

    const result = tasksReducer(initialState, addTaskTC.fulfilled(payload, "requestId", {todoId: "todoId2", title: "newTask"}));
    expect(result["todoId1"].length).toBe(1);
    expect(result["todoId2"].length).toBe(2);
    expect(result["todoId2"][0].title).toBe("newTask");
    expect(result["todoId2"][1].title).toBe("task2");
  });
  test("changeTaskAC: correct values should changed in correct task", () => {
    const data = {todoId: "todoId1", taskId: "1", model: {status: TaskStatuses.Completed, title: "new Task Title"}};
    const payload = {todoId: "todoId1", task: {id: "1", title: "new Task Title", description: "", todoListId: "todoId1", order: "", status: TaskStatuses.Completed, priority: TaskPriorities.Low, startDate: "", deadline: "", addedDate: ""}};
    const result = tasksReducer(initialState, changeTaskTC.fulfilled(payload, "requestId", data));
    expect(result["todoId1"].length).toBe(1);
    expect(result["todoId2"].length).toBe(1);
    expect(result["todoId1"][0].title).toBe("new Task Title");
    expect(result["todoId2"][0].title).toBe("task2");
    expect(result["todoId1"][0].status).toBe(TaskStatuses.Completed);
    expect(result["todoId2"][0].status).toBe(TaskStatuses.New);
  });
  test("removeTaskAC: correct task should be removed", () => {
    const payload = {todoId: "todoId2", taskId: "1"};
    const result = tasksReducer(initialState, removeTaskTC.fulfilled(payload, "requestId", payload));
    expect(result["todoId1"].length).toBe(1);
    expect(result["todoId2"].length).toBe(0);
  });
});

describe("TASKS/TODOLISTS REDUCER TESTS", () => {
  test("addTodolistAC: todolist should be correctly added to array", () => {
    const payload = {
      id: "todoId3",
      title: "newTodoTitle",
      order: "",
      addedDate: "",
    }
    const result = tasksReducer(initialState, addTodolistTC.fulfilled({todolist: payload}, "requestId", "newTodoTitle"));
    expect(result["todoId3"]).toBeDefined();
    expect(result["todoId1"]).toBeDefined();
    expect(result["todoId2"]).toBeDefined();
    expect(result["todoId4"]).toBeUndefined();
  });
  test("removeTodolistAC: correct todolists should be removed", () => {
    const result = tasksReducer(initialState, removeTodolistTC.fulfilled({todoId: "todoId2"}, "requestId", "todoId2"));
    expect(result["todoId1"]).toBeDefined();
    expect(result["todoId2"]).toBeUndefined();
  });
  test("setTodolistsAC: todolists should be set to correct place", () => {
    const payload = [{id: "todoId3",title: "todoTitle3", order: "", addedDate: ""},]
    const result = tasksReducer(initialState, fetchTodolistsTC.fulfilled({todolists: payload}, "requestId", undefined));
    expect(result["todoId1"][0].title).toBe("task");
    expect(result["todoId3"]).toEqual([]);
  });
});

describe("TASKS/APP REDUCER TESTS", () => {
  test("clearData: data must be correctly cleaned", () => {
    const result = tasksReducer(initialState, clearData([], {}));
    expect(result).toEqual({});
  });
});