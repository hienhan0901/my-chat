export const updateChange = () => {
    return dispatch => {
        dispatch({ type: 'CHANGE_STATE' })
    }
}