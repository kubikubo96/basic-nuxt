import apiService from '~/services/api/apiService'

export default (ctx, inject) => {
    inject('api', apiService(ctx.$axios))
}