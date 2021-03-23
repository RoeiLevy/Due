import {socketService} from '../services/socket.service.js'
import {utilService} from '../services/util.service'

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
        // TODO: show on
        sendMsg(context, {msg}) {
            socketService.emit('sendMsg', msg)
        },
        getChatHistory(context, {chatId}) {
            socketService.emit('getHistory', chatId)
        },
        sendActivity(context, { txt, task }) {
            if (!task) task = null;

            const activity = {
                id: utilService.makeId(),
                createdAt: Date.now(),
                txt,
                byMember: context.getters.loggedInUser,
                task
            }
            console.log('activity to send: ', activity);
            socketService.emit('new activity', activity)
        },
        sendBoard(context, { board }) {
            console.log('sending board', board);
           socketService.emit('send board', board) 
        }
    }
}