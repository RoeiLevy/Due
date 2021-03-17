import { boardService } from '../services/board.service'

export const boardStore = {
    state: {
        currBoard: null,
        boards: []
    },
    getters: {
        boardForDisplay(state) {
            return state.currBoard
        },
        boards(state) {
            return state.boards;
        }
    },
    mutations: {
        setBoard(state, { board }) {
            state.currBoard = board
        },
        setBoards(state, { boards }) {
            state.boards = boards;
        },
        addNewGroup(state){
            state.currBoard.groups.push(boardService.getEmptyGroup());
        }
    },
    actions: {
        async loadBoard(context, { boardId }) {
            try {
                const board = await boardService.getBoard(boardId);
                context.commit({ type: 'setBoard', board })
                return board
                    // socketService.off(SOCKET_EVENT_REVIEW_ADDED)
                    // socketService.on(SOCKET_EVENT_REVIEW_ADDED, review => {
                    //     context.commit({ type: 'addReview', review })
                    // })
            } catch (err) {
                console.log('boardStore: Error in loadBoard', err)
                throw err
            }
        },
        async loadBoards(context) {
            try {
                const boards = await boardService.query();
                console.log('boards:', boards)
                context.commit({ type: 'setBoards', boards });
            } catch (err) {
                console.log('boardStore: Error in loadBoards', err);
                throw err;
            }
        },
        async saveBoard(context, board) {
            try {
                const savedBoard = await boardService.update(board);
                console.log('board:', savedBoard);
                context.commit({ type: 'setBoard', board });
            } catch (err) {
                console.log('boardStore: Error in loadBoards', err);
                throw err;
            }
        },
        async saveTask(context, taskToEdit) {
            try {
                taskToEdit = await taskService.add(taskToEdit)
                context.commit({ type: 'saveTask', taskToEdit })
                return taskToEdit;
            } catch (err) {
                console.log('boardStore: Error in saveTask', err)
                throw err
            }
        },
        // async addNewGroup(context){
        //     try {
                
        //     } catch (err) {
                
        //     }
        // }

    }
}