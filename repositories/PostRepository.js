import BaseRepository from '~/repositories/BaseRepository'

export default ($axios) => ({
    base: BaseRepository($axios, 'api/posts'),
})