export default {
  SET(state, data) {
    state.posts = data;
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
}