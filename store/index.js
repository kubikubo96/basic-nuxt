export const state = () => ({
    counter: 0
})

export const getter = {
    getCounter(state) {
        return state.counter
    }
}

export const mutations = {
    increment(state) {
        state.counter++
    }
}

export const actions = {
    SCROLL_TOP() {
        var data = document.getElementsByClassName('main-panel')[0];
        if (data) {
            data.scrollTop = 0;
        }
        window.scrollTo(0, 0);
    }
}