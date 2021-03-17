import boardService from '../services/board.service'
export const boardStore = {
    state: {
        boards: [
            {
                title:'a',
                createdBy:{
                    fullname:'a'
                },
                createdAt:1589983468418
            },
            {
                title:'b',
                createdBy:{
                    fullname:'b'
                },
                createdAt:1589983468418
            },
            {
                title:'c',
                createdBy:{
                    fullname:'c'
                },
                createdAt:1589983468418
            }
        ]
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