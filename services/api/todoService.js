import baseService from '~/services/api/baseService'

export default ($axios) => ({
    base: baseService($axios, '/api/todos'),
})