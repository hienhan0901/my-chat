import jwtDecode from "jwt-decode"

const tokenParse = (token) => {
    return jwtDecode(token)
}

const initialState = {
    isAuthenticated: localStorage.getItem('access_token') ? true : false,
    loading: false,
    user: localStorage.getItem('access_token') ? tokenParse(localStorage.getItem('access_token')) : {},
}

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'SET_LOGIN':
            return {
                isAuthenticated: true,
                loading: true,
                user: tokenParse(action.value),
            }
        case 'LOGIN_FAILED':
            return {
                isAuthenticated: false,
                user: {}
            }
        case 'SET_LOGOUT':
            return {
                isAuthenticated: false,
                user: {}
            }
        default:
            return state
    }
}

export default reducer