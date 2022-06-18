import todoService from '~/services/api/todoService'
import postService from '~/services/api/postService'
import userService from '~/services/api/userService'

export default ($axios, resource) => ({
    todos: todoService($axios, resource),
    posts: postService($axios, resource),
    users: userService($axios, resource),
})