import todoService from '~/services/api/todoService'
import postService from '~/services/api/postService'

export default ($axios, resource) => ({
    todos: todoService($axios, resource),
    posts: postService($axios, resource),
})