import {createStore} from 'vuex'

export default createStore({
    state: {
        userInfo: {},
    },
    mutations: {
        setUserInfo(state, equipment) {
            localStorage.setItem("userInfo", JSON.stringify(equipment));
            state.userInfo = equipment;
        },
        close(state) {
            window.localStorage.removeItem('userInfo');
            state.userInfo = {};
        },
    },
    actions: {},
    modules: {}
})
