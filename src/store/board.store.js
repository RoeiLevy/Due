import { boardService } from '../services/board.service'
// import { utilService } from '../services/util.service';

export const boardStore = {
    state: {
        isActivitiesOpen: false,
        currBoard: null,
        boards: [],
        isTaskDetails: false,
        isBoardActivities: false,
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
        isTaskDetails(state) {
            return state.isTaskDetails
        },
        isBoardActivities(state) {
            return state.isBoardActivities
        }
    },
    mutations: {
        toggleIsDetails(state) {
            state.isTaskDetails = !state.isTaskDetails
        },
        toggleIsBoardActivities(state) {
            state.isBoardActivities = !state.isBoardActivities
            console.log(state.isBoardActivities);
        },
        setBoard(state, { board }) {
            state.currBoard = board
        },
        setBoards(state, { boards }) {
            state.boards = boards;
        },
        saveTask(state, { task, groupId }) {
            const groupIdx = state.currBoard.groups.findIndex(
                g => g.id === groupId
            );
            const taskIdx = state.currBoard.groups[groupIdx].tasks.findIndex(
                t => t.id === task.id
            );
            state.currBoard.groups[groupIdx].tasks.splice(taskIdx, 1, task)
        }
        // addNewGroup(state) {
        //     state.currBoard.groups.push(boardService.getEmptyGroup());
        // },
        // saveGroup(state, { group }) {
        //     const idx = state.currBoard.groups.findIndex(g => g.id === group.id);
        //     state.currBoard.groups.splice(idx, 1, group);
        // },
        // removeGroup(state, { groupId }) {
        //     const idx = state.currBoard.groups.findIndex(g => g.id === groupId);
        //     state.currBoard.groups.splice(idx, 1);
        // },
        // addTask(state, { task, groupId }) {
        //     const currGroupIdx = state.currBoard.groups.findIndex(group => group.id === groupId);
        //     var newGroup = { ...state.currBoard.groups[currGroupIdx] }
        //     newGroup.tasks.push(task)
        //     state.currBoard.groups.splice(currGroupIdx, 1, newGroup);
        //     // if (!currGroup || !currGroup.tasks) {
        //     //     currGroup.tasks = [];
        //     // }
        //     // currGroup.tasks.push(task);
        // },
        // updateTask(state, { task, groupId }) {
        //     // console.log('update task - task', task, ' group id', groupId)
        //     const groupIdx = state.currBoard.groups.findIndex(group => group.id === groupId);
        //     const taskIdx = state.currBoard.groups[groupIdx].tasks.findIndex(item => item.id === task.id);
        //     state.currBoard.groups[groupIdx].tasks.splice(taskIdx, 1, task);
        // },
        // removeTask(state, { taskId, groupId }) {
        //     // console.log('removing task - task', taskId, ' group id', groupId)
        //     const groupIdx = state.currBoard.groups.findIndex(group => group.id === groupId);
        //     const taskIdx = state.currBoard.groups[groupIdx].tasks.findIndex(item => item.id === taskId);
        //     state.currBoard.groups[groupIdx].tasks.splice(taskIdx, 1);
        // },
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
                context.commit({ type: 'setBoards', boards });
                return boards
            } catch (err) {
                console.log('boardStore: Error in loadBoards', err);
                throw err;
            }
        },
        async saveBoard(context, { boardToSave }) {
            try {
                const savedBoard = await boardService.update(boardToSave);
                context.commit({ type: 'setBoard', board: JSON.parse(JSON.stringify(boardToSave)) });
                console.log('board in store:', savedBoard);
                return savedBoard
            } catch (err) {
                console.log('boardStore: Error in loadBoards', err);
                throw err;
            }
        },
        async addNewBoard(context) {
            try {
                var newBoard = boardService.getEmptyBoard();
                const addedBoard = await boardService.add(newBoard);
                return addedBoard
            } catch (err) {
                console.log('boardStore: Error in Adding New Board', err)
                throw err
            }
        },
        async removeBoard(context,boardId) {
            try {
                await boardService.remove(boardId);
                await context.dispatch('loadBoards');
                console.log('Board deleted');
            } catch (err) {
                console.log('Couldn`t delete board', err);
                throw err;
            }
        },
        async getTask({ state }, { taskId, groupId }) {
            try {
                const groupIdx = state.currBoard.groups.findIndex(
                    g => g.id === groupId
                );
                const taskIdx = state.currBoard.groups[groupIdx].tasks.findIndex(
                    t => t.id === taskId
                );
                const taskToShow = JSON.parse(JSON.stringify(state.currBoard.groups[groupIdx].tasks[taskIdx]))
                return taskToShow

            } catch (err) {
                console.log('err:', err)
                throw err
            }
        },
        async getTaskActivities({ state }, { taskId }) {
            try {
                var boardActivities = JSON.parse(JSON.stringify(state.currBoard.activities))
                const taskActivities = boardActivities.filter(a => a.task.id = taskId)
                return taskActivities

            } catch (err) {
                console.log('err:', err)
                throw err
            }
        },
        async saveTask({ state }, { task, groupId }) {
            console.log('groupId:', groupId)
            console.log('task:', task)
            try {
                this.commit({ type: 'saveTask', task, groupId })
                const savedTask = await this.dispatch({ type: 'saveBoard', boardToSave: JSON.parse(JSON.stringify(state.currBoard)) })
                return savedTask

            } catch (err) {
                console.log('err:', err)
                throw err
            }
        }

        // async saveGroup(context, group) {
        //     try {
        //         const savedGroup = await boardService.saveGroup(group, context.state.currBoard._id);
        //         context.commit({ type: 'saveGroup', group: savedGroup })
        //         // return savedGroup;
        //     } catch (err) {
        //         console.log('Board store:Error in saveGroup', err);
        //         throw err;
        //     }
        // },
        // async removeGroup({ commit, state }, { groupId }) {
        //     try {
        //         await boardService.removeGroup(groupId, state.currBoard._id,)
        //         commit({ type: 'removeGroup', groupId })
        //         return groupId;
        //     } catch (err) {
        //         console.log('err:', err)
        //     }
        // },
        // async updateTask(context, payload) {
        //     try {
        //         const task = await boardService.updateTask(payload.taskToEdit, payload.groupId, context.state.currBoard._id)
        //         context.commit({ type: 'updateTask', task, groupId: payload.groupId })
        //         return task;
        //     } catch (err) {
        //         console.log('boardStore: Error in updateTask', err)
        //         throw err
        //     }
        // },
        // async removeTask(context, payload) {
        //     try {
        //         console.log(payload.taskId, payload.groupId);
        //         const removed = await boardService.removeTask(payload.taskId, payload.groupId, context.state.currBoard._id)
        //         context.commit({ type: 'removeTask', taskId: payload.taskId, groupId: payload.groupId })
        //         return removed;
        //     } catch (err) {
        //         console.log('boardStore: Error in updateTask', err)
        //         throw err
        //     }
        // },
        // async addTask(context, payload) {
        //     try {
        //         payload.taskToEdit.id = utilService.makeId();
        //         const task = await boardService.addTask(payload.taskToEdit, payload.groupId, context.state.currBoard._id)
        //         await context.dispatch({ type: 'loadBoard', boardId: context.state.currBoard._id })
        //         return task;
        //     } catch (err) {
        //         console.log('boardStore: Error in addTask', err)
        //         throw err
        //     }
        // },
        // async getTask(context, { taskId }) {
        //     console.log(taskId);
        // }
    }
}