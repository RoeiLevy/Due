import boardService from '../services/board.service'
export const boardStore = {
    state: {
        boards: []
    },
    getters: {
        boards(state) {
            return state.boards;
        }
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards;
        }
    },
    actions: {
        async loadBoards(context) {
            try {
                const boards = await boardService.query();
                console.log('boards:', boards)
                context.commit({ type: 'setBoards', boards });
            } catch (error) {

            }
        }
        // socketService.on('taskUpdated', task => {
        //     commit({ type: 'saveTask', task })
        // })

    }
}