import { boardService } from '../services/board.service'

export const boardStore = {
    state: {
        board: null,
        boards: []
    },
    getters: {
        boardForDisplay(state) {
            return state.board
        },
        boards(state) {
            return state.boards;
        }
    },
    mutations: {
        setBoard(state, { board }) {
            state.board = board
        },
        setBoards(state, { boards }) {
            state.boards = boards;
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
        async loadBoards(context) {
            try {
                const boards = await boardService.query();
                console.log('boards:', boards)
                context.commit({ type: 'setBoards', boards });
            } catch (error) {

            }
        }
    }
}
