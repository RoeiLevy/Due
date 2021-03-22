import {socketService} from '../services/socket.service.js'
import {utilService} from '../services/util.service'

export const socketStore = {
    state: {
    },
    getters: {
    },
    mutations: {
        setJob(state, {job}) {
            state.job = job;
        }
    },
    actions: {
        // TODO: show on
        sendMsg(context, {msg}) {
            socketService.emit('sendMsg', msg)
        },
        getChatHistory(context, {chatId}) {
            socketService.emit('getHistory', chatId)
        },
        sendActivity(context, { txt }) {
            const activity = {
                id: utilService.makeId(),
                createdAt: Date.now(),
                byMember: context.getters.loggedInUser 
            }
            socketService.emit('newActivity', activity)
        },
        sendActivityWithTask(context, { txt, task }) {

        }
    }
}