import Repository from '~/repositories/Repository'

export default (ctx, inject) => {
    inject('repo', Repository(ctx.$axios))
}