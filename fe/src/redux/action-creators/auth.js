import instance from '../../utils/api';

export const storeToken = (token) => {
    localStorage.setItem('access_token', token)
    //instance.defaults.headers.common.authorization = instance.defaults.headers.common.authorization ? "" : `Bearer ${token}`
    if (token === null) localStorage.removeItem('access_token')
}

export const login = (data) => {
    return (dispatch) => {
        instance.post('api/auth/login', data).then(res => {
            storeToken(res.data.accessToken)
            dispatch({
                type: 'SET_LOGIN',
                value: res.data.accessToken,
            })
        }).catch(e => {
            dispatch({
                type: 'LOGIN_FAILED',
                value: null,
            })
            // localStorage.removeItem('access_token')
            storeToken(null)

        })
    }
}

export const logout = (data) => {
    return (dispatch) => {
        dispatch({ type: 'SET_LOGOUT', value: null });
        // localStorage.removeItem('access_token')
        storeToken(null)

    }
}