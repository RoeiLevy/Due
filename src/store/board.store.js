import { boardService } from '../services/board.service'
import { utilService } from '../services/util.service';

export const boardStore = {
    state: {
        isActivitiesOpen: false,
        currBoard: null,
        boards: []
    },
    getters: {
        currBoardId(state) {
            return state.currBoard._id
        },
        boardForDisplay(state) {
            return state.currBoard
        },
        boards(state) {
            return state.boards;
        },
        statuses(state) {
            return state.currBoard.statuses;
        },
        isActivitiesOpen(state) {
            return state.isActivitiesOpen
        }
    },
    mutations: {
        toggleActivities(state) {
            state.isActivitiesOpen = !state.isActivitiesOpen
        },
        setBoard(state, { board }) {
            state.currBoard = board
        },
        setBoards(state, { boards }) {
            state.boards = boards;
        },
        addNewGroup(state) {
            state.currBoard.groups.push(boardService.getEmptyGroup());
        },
        saveGroup(state, { group }) {
            const idx = state.currBoard.groups.findIndex(g => g.id === group.id);
            state.currBoard.groups.splice(idx, 1, group);
        },
        removeGroup(state, { groupId }) {
            const idx = state.currBoard.groups.findIndex(g => g.id === groupId);
            state.currBoard.groups.splice(idx, 1);
        },
        addTask(state, { task, groupId }) {
            const currGroup = state.currBoard.groups.find(group => group.id === groupId);
            if (!currGroup || !currGroup.tasks) {
                currGroup.tasks = [];
            }
            currGroup.tasks.push(task);
        },
        updateTask(state, { task, groupId }) {
            console.log('update task - task', task, ' group id', groupId)
            const groupIdx = state.currBoard.groups.findIndex(group => group.id === groupId);
            const taskIdx = state.currBoard.groups[groupIdx].tasks.findIndex(item => item.id === task.id);
            state.currBoard.groups[groupIdx].tasks.splice(taskIdx, 1, task);
        },
        removeTask(state, { taskId, groupId }) {
            console.log('removing task - task', taskId, ' group id', groupId)
            const groupIdx = state.currBoard.groups.findIndex(group => group.id === groupId);
            const taskIdx = state.currBoard.groups[groupIdx].tasks.findIndex(item => item.id === taskId);
            state.currBoard.groups[groupIdx].tasks.splice(taskIdx, 1);
        },
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
        async saveGroup(context, group) {
            try {
                const savedGroup = await boardService.saveGroup(group, context.state.currBoard._id);
                context.commit({ type: 'saveGroup', group: savedGroup })
                // return savedGroup;
            } catch (err) {
                console.log('Board store:Error in saveGroup', err);
                throw err;
            }
        },
        async removeGroup({ commit, state }, { groupId }) {
            try {
                await boardService.removeGroup(groupId, state.currBoard._id, )
                commit({ type: 'removeGroup', groupId })
                return groupId;
            } catch (err) {
                console.log('err:', err)
            }
        },
        async addNewBoard(context) {
            try {
                var newBoard = boardService.getEmptyBoard();
                return await boardService.add(newBoard);
            } catch (err) {
                console.log('boardStore: Error in Adding New Board', err)
                throw err
            }
        },
        async updateTask(context, payload) {
            try {
                const task = await boardService.updateTask(payload.taskToEdit, payload.groupId, context.state.currBoard._id)
                context.commit({ type: 'updateTask', task, groupId: payload.groupId })
                return task;
            } catch (err) {
                console.log('boardStore: Error in updateTask', err)
                throw err
            }
        },
        async removeTask(context, payload) {
            try {
                console.log(payload.taskId, payload.groupId);
                const removed = await boardService.removeTask(payload.taskId, payload.groupId, context.state.currBoard._id)
                context.commit({ type: 'removeTask', taskId: payload.taskId, groupId: payload.groupId })
                return removed;
            } catch (err) {
                console.log('boardStore: Error in updateTask', err)
                throw err
            }
        },
        async addTask(context, payload) {
            try {
                payload.taskToEdit.id = utilService.makeId();
                const task = await boardService.addTask(payload.taskToEdit, payload.groupId, context.state.currBoard._id)
                context.commit({ type: 'addTask', task, groupId: payload.groupId })
                return task;
            } catch (err) {
                console.log('boardStore: Error in addTask', err)
                throw err
            }
        },
        async getTask(context, { taskId }) {
            console.log(taskId);
        }
    }
}