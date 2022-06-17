export default {
  SET(state, data) {
    state.posts = data;
  },

  SET_TEMP(state, data) {
    state.post = data;
  },

  ADD(state, data) {
    state.posts = [data, ...state.posts];
  },

  UPDATE(state, data) {
    state.posts.splice(state.posts.findIndex(item => item.id == data.id), 1, data)
  },

  REMOVE(state, data) {
    state.posts.splice(state.posts.indexOf(data), 1);
  },

  TOGGLE_DIALOG(state) {
    state.dialog = !state.dialog
  }
}