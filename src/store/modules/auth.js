import autApi from "@/api/auth";
import {setItem} from "@/helpers/persistanceStorage";

const state = {
    isSubmitting: false,
    isLoading: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null // зазвичай true or false, а null показує що ми ще НЕ знаємо залогіненей він чи ні
};

export const mutationTypes = {
    registerStart: "[auth] registerStart",
    registerSuccess: "[auth] registerSuccess",
    registerFailure: "[auth] registerFailure",

    loginSuccess: "[auth] loginSuccess",
    loginStart: "[auth] loginStart",
    loginFailure: "[auth] loginFailure",

    getCurrentUserSuccess: "[auth] getCurrentUserSuccess",
    getCurrentUserStart: "[auth] getCurrentUserStart",
    getCurrentUserFailure: "[auth] getCurrentUserFailure",
};

export const actionTypes = {
    register: "[auth] register",
    login: "[auth] login",
    getCurrentUser: '[auth] getCurrentUser',
};

export const gettersType = {
    currentUser: "[auth] currentUser",
    isLoggedIn: '[auth] isLoggedIn',
    isAnonymous: '[auth] isAnonymous'
};

const getters = {
    [gettersType.currentUser]: state => {
        return state.currentUser;
    },
    [gettersType.isLoggedIn]: state => {
        return Boolean(state.isLoggedIn)
    },
    [gettersType.isAnonymous]: state => {
        return state.isLoggedIn === false
    }

};

const mutations = {
    [mutationTypes.registerStart](state) {
        state.isSubmitting = true;
        state.validationErrors = null;
    },
    [mutationTypes.registerSuccess](state, payload) {
        state.isSubmitting = false;
        state.currentUser = payload;
        state.isLoggedIn = true;
    },
    [mutationTypes.registerFailure](state, payload) {
        state.isSubmitting = false;
        state.validationErrors = payload;
    },
    [mutationTypes.loginStart](state) {
        state.isSubmitting = true;
        state.validationErrors = null;
    },
    [mutationTypes.loginSuccess](state, payload) {
        state.isSubmitting = false;
        state.currentUser = payload;
        state.isLoggedIn = true;
    },
    [mutationTypes.loginFailure](state, payload) {
        state.isSubmitting = false;
        state.validationErrors = payload;
    },
    [mutationTypes.getCurrentUserStart]() {
        state.isLoading = true
    },
    [mutationTypes.getCurrentUserSuccess](state, payload) {
        state.isLoading = false
        state.currentUser = payload
        state.isLoggedIn = true
    },
    [mutationTypes.getCurrentUserFailure](state) {
        state.isLoading = false
        state.isLoggedIn = false
        state.currentUser = null
    }

};

const actions = {
    [actionTypes.register](context, credentials) {
        return new Promise(resolve => {
            context.commit(mutationTypes.registerStart);
            autApi
                .register(credentials)
                .then(response => {
                    context.commit(mutationTypes.registerSuccess, response.data.user);
                    setItem("accessToken", response.data.user.token);
                    resolve(response.data.user);
                })

                .catch(result => {
                    context.commit(mutationTypes.registerFailure, result.response.data.errors);
                });
        });
    },

    [actionTypes.login](context, credentials) {
        return new Promise(resolve => {
            context.commit(mutationTypes.loginStart);
            autApi
                .login(credentials)
                .then(response => {
                    context.commit(mutationTypes.loginSuccess, response.data.user);
                    setItem("accessToken", response.data.user.token);
                    resolve(response.data.user);
                })

                .catch(result => {
                    context.commit(mutationTypes.loginFailure, result.response.data.errors);
                });
        });
    },

    [actionTypes.getCurrentUser](context) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getCurrentUserStart);
            autApi
                .getCurrentUser()
                .then(response => {
                    context.commit(mutationTypes.getCurrentUserSuccess, response.data.user);
                    resolve(response.data.user);
                })

                .catch(() => {
                    context.commit(mutationTypes.getCurrentUserFailure);
                });
        });
    },

};

export default {
    state,
    mutations,
    actions,
    getters
};