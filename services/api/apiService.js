import todoService from '~/services/api/todoService'
import postService from '~/services/api/postService'
import userService from '~/services/api/userService'
import roleService from '~/services/api/roleService'
import permissionService from '~/services/api/permissionService'

export default ($axios, resource) => ({
    todos: todoService($axios, resource),
    posts: postService($axios, resource),
    users: userService($axios, resource),
    roles: roleService($axios, resource),
    permissions: permissionService($axios, resource),
})