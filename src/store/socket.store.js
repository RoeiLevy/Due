import { socketService } from '../services/socket.service.js'
import { utilService } from '../services/util.service'

export const socketStore = {
    state: {
    },
    getters: {
    },
    mutations: {
        setJob(state, { job }) {
            state.job = job;
        }
    },
    actions: {
        sendMsg(context, { msg }) {
            socketService.emit('sendMsg', msg)
        },
        getChatHistory(context, { chatId }) {
            socketService.emit('getHistory', chatId)
        },
        sendBoard(context, { board }) {
            socketService.emit('send board', board)
        }
    }
}