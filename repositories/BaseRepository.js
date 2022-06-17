export default ($axios, resource) => ({
    async index(payload) {
        return await $axios.$get(`${resource}`, {params: payload})
    },

    async store(payload) {
        return await $axios.$post(`${resource}`, payload)
    },

    async show(id) {
        return await $axios.$get(`${resource}/${id}`)
    },

    async update(id = null, payload) {
        if (id) {
            return $axios.$put(`${resource}/${id}`, payload)
        }
        return await $axios.$post(`${resource}`, payload)
    },

    async delete(id) {
        return $axios.$delete(`${resource}/${id}`);
    }
})