import { userService } from '../services/user.service'
import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from '../services/socket.service'

// var localLoggedinUser = null;
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user || null);

export const userStore = {
    state: {
        loggedInUser: userService.getLoggedinUser() || { fullname: 'Guest'},
        users: [],
        watchedUser: null
    },
    getters: {
        users({ users }) { return users },
        loggedInUser({ loggedInUser }) { return loggedInUser },
        watchedUser({ watchedUser }) { return watchedUser }
    },
    mutations: {
        setLoggedInUser(state, { user }) {
            state.loggedInUser = user;
        },
        setWatchedUser(state, { user }) {
            state.watchedUser = user;
        },
        setUsers(state, { users }) {
            state.users = users;
        },
        removeUser(state, { userId }) {
            state.users = state.users.filter(user => user._id !== userId)
        },
    },
    actions: {
        async login(context, credantials) {
            try {
                const user = await userService.login(credantials);
                // console.log('context:', context)
                context.commit({type:'setLoggedInUser',user})
                return user;
            } catch (err) {
                console.log('userStore: Error in login', err)
                throw err
            }
        },
        async signup(context, credantials) {
            try {
                const user = await userService.signup(credantials)
                // commit({ type: 'setLoggedinUser', user })
                // return user;
            } catch (err) {
                console.log('userStore: Error in signup', err)
                throw err
            }

        },
        async logout(context) {
            try {
                await userService.logout()
                context.commit({ type: 'setLoggedInUser', user: null })
            } catch (err) {
                console.log('userStore: Error in logout', err)
                throw err
            }
        },
        async loadUsers({ commit }) {
            // TODO: loading
            try {
                const users = await userService.getUsers();
                commit({ type: 'setUsers', users })
            } catch (err) {
                console.log('userStore: Error in loadUsers', err)
                throw err
            }
        },
        async loadAndWatchUser({ commit }, { userId }) {
            try {
                const user = await userService.getById(userId);
                commit({ type: 'setWatchedUser', user })
                socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
                socketService.off(SOCKET_EVENT_USER_UPDATED)
                socketService.on(SOCKET_EVENT_USER_UPDATED, user => {
                    commit({ type: 'setWatchedUser', user })
                })
            } catch (err) {
                console.log('userStore: Error in loadAndWatchUser', err)
                throw err
            }
        },
        async removeUser({ commit }, { userId }) {
            try {
                await userService.remove(userId);
                commit({ type: 'removeUser', userId })
            } catch (err) {
                console.log('userStore: Error in removeUser', err)
                throw err
            }
        },
        async updateUser({ commit }, { user }) {
            try {
                user = await userService.update(user);
                commit({ type: 'setUser', user })
            } catch (err) {
                console.log('userStore: Error in updateUser', err)
                throw err
            }

        },
        async validateUserByEmail(context, { email }) {
            try {
                const users = await userService.getUsers();
                console.log('users in store', users)
                const wantedUser = users.find(user => user.email === email)
                const memberToAdd = {
                    _id: wantedUser._id,
                    fullname: wantedUser.fullname,
                    img: wantedUser.img
                }
                return memberToAdd

            } catch (err) {
                console.log('err:', err)
                throw new Error('Couldn\'t validate member')
            }
        }
    }
}