export default {
    SET(state, tasks) {
        state.tasks = tasks;
    },

    ADD(state, task) {
        state.tasks = [{ content: task, done: false }, ...state.tasks];
    },

    REMOVE(state, task) {
        state.tasks.splice(state.tasks.indexOf(task), 1);
    },

    TOGGLE(state, task) {
        task.done = !task.done;
    }
}