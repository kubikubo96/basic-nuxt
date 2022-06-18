export default {
  SET(state, data) {
    state.users = data;
  },

  SET_TEMP(state, data) {
    state.post = data;
  },

  ADD(state, data) {
    state.users = [data, ...state.users];
  },

  UPDATE(state, data) {
    state.users.splice(state.users.findIndex(item => item.id == data.id), 1, data)
  },

  REMOVE(state, data) {
    state.users.splice(state.users.indexOf(data), 1);
  },

  TOGGLE_DIALOG(state) {
    state.dialog = !state.dialog
  }
}