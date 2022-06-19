export default ($axios, path) => ({
    async index(payload) {
        return await $axios.$get(`${path}`, { params: payload })
    },

    async store(payload) {
        return await $axios.$post(`${path}`, payload)
    },

    async show(id) {
        return await $axios.$get(`${path}/${id}`)
    },

    async update(id = null, payload) {
        if (id) {
            return $axios.$put(`${path}/${id}`, payload)
        }
        return await $axios.$post(`${path}`, payload)
    },

    async delete(id) {
        return $axios.$delete(`${path}/${id}`);
    },

    async dataIndex(payload) {
        try {
            const data = await $axios.$get(`${path}`, { params: payload });
            return data.data;
        } catch (error) {
            throw new Error(error);
        }
    },
})