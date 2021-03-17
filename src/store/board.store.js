import { boardService } from '../services/board.service'


export const boardStore = {
    state: {
        board: null
    },
    getters: {
        boardForDisplay(state) {
            return state.board
        }
    },
    mutations: {
        setBoard(state, { board }) {
            state.board = board
        }
    },
    actions: {
        async loadBoard(context, { boardId }) {
            try {
                const board = await boardService.query(boardId);
                context.commit({ type: 'setBoard', board })
                // socketService.off(SOCKET_EVENT_REVIEW_ADDED)
                // socketService.on(SOCKET_EVENT_REVIEW_ADDED, review => {
                //     context.commit({ type: 'addReview', review })
                // })
            } catch (err) {
                console.log('reviewStore: Error in loadBoard', err)
                throw err
            }
        },
    }
}