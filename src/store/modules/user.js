// 用户模块
export default {
    namespaced: true,
    state() {
        return {
            // 用户信息
            profile: {
                id: '1',
                avatar: '',
                nickname: 'zs',
                account: '22',
                mobile: '17701314156',
                token: 'asdf'
            }
        }
    },
    mutations: {
        // 修改用户信息，payload就是用户信息对象
        setUser(state, payload) {
            state.profile = payload
        }
    }
}