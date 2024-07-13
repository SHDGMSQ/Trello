import {TasksType} from "@/components/Task/types";
import {TaskPriorities, TaskStatuses} from "@/api/types";
import {addTaskAC, changeTaskAC, removeTaskAC, setTasksAC, taskReducer} from "@/store/redux/reducers/taskReducer";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "@/store/redux/reducers/todolistReducer";
import {setEmptyDataValuesAC} from "@/store/redux/reducers/appReducer";

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
    const result = taskReducer(initialState, setTasksAC("todoId2", [
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
    ]));

    expect(result["todoId1"].length).toBe(1);
    expect(result["todoId2"].length).toBe(1);
    expect(result["todoId2"][0].title).toBe("newTask");
    expect(result["todoId1"][0].title).toBe("task");
  });
  test("addTaskAC: correct task should be add to correct array", () => {
    const result = taskReducer(initialState, addTaskAC("todoId2",
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
    ));
    expect(result["todoId1"].length).toBe(1);
    expect(result["todoId2"].length).toBe(2);
    expect(result["todoId2"][0].title).toBe("newTask");
    expect(result["todoId2"][1].title).toBe("task2");
  });
  test("changeTaskAC: correct values should changed in correct task", () => {
    const result = taskReducer(initialState, changeTaskAC("todoId1", {
      id: "1",
      status: TaskStatuses.Completed,
      title: "new Task Title",
      addedDate: "",
      deadline: "",
      description: "",
      order: "",
      startDate: "",
      todoListId: "todoId1",
      priority: TaskPriorities.Low
    }));
    expect(result["todoId1"].length).toBe(1);
    expect(result["todoId2"].length).toBe(1);
    expect(result["todoId1"][0].title).toBe("new Task Title");
    expect(result["todoId2"][0].title).toBe("task2");
    expect(result["todoId1"][0].status).toBe(TaskStatuses.Completed);
    expect(result["todoId2"][0].status).toBe(TaskStatuses.New);
  });
  test("removeTaskAC: correct task should be removed", () => {
    const result = taskReducer(initialState, removeTaskAC("todoId2", "1"));
    expect(result["todoId1"].length).toBe(1);
    expect(result["todoId2"].length).toBe(0);
  });
});

describe("TASKS/TODOLISTS REDUCER TESTS", () => {
  test("addTodolistAC: todolist should be correctly added to array", () => {
    const result = taskReducer(initialState, addTodolistAC({
      id: "todoId3",
      title: "newTodoTitle",
      order: "",
      addedDate: "",
    }));
    expect(result["todoId3"]).toBeDefined();
    expect(result["todoId1"]).toBeDefined();
    expect(result["todoId2"]).toBeDefined();
    expect(result["todoId4"]).toBeUndefined();
  });
  test("removeTodolistAC: correct todolists should be removed", () => {
    const result = taskReducer(initialState, removeTodolistAC("todoId2"));
    expect(result["todoId1"]).toBeDefined();
    expect(result["todoId2"]).toBeUndefined();
  });
  test("setTodolistsAC: todolists should be set to correct place", () => {
    const result = taskReducer(initialState, setTodolistsAC([{id: "todoId3",title: "todoTitle3", order: "", addedDate: ""},]));
    expect(result["todoId1"][0].title).toBe("task");
    expect(result["todoId3"]).toEqual([]);
  });
});

describe("TASKS/APP REDUCER TESTS", () => {
  test("setEmptyDataValuesAC: data must be correctly cleaned", () => {
    const result = taskReducer(initialState, setEmptyDataValuesAC());
    expect(result).toEqual({});
  });
});