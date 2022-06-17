import TodoRepository from '~/repositories/TodoRepository'
import PostRepository from '~/repositories/PostRepository'

export default ($axios, resource) => ({
    todos: TodoRepository($axios, resource),
    posts: PostRepository($axios, resource),
})