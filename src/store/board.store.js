import { boardService } from '../services/board.service'

export const boardStore = {
    state: {
        isActivitiesOpen: false,
        currBoard: null,
        boards: [],
        isTaskDetails: false,
        isBoardActivities: false,
        isCloseScreen: false
    },
    getters: {
        isCloseScreen(state) {
            return state.isCloseScreen
        },
        boardMembers(state) {
            return state.currBoard.members
        },
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
        priorities(state) {
            return state.currBoard.priorities;
        },
        isTaskDetails(state) {
            return state.isTaskDetails
        },
        isBoardActivities(state) {
            return state.isBoardActivities
        }
    },
    mutations: {
        toggleCloseScreen(state) {
            state.isCloseScreen = !state.isCloseScreen
        },
        toggleIsDetails(state) {
            state.isTaskDetails = !state.isTaskDetails
        },
        toggleIsBoardActivities(state) {
            state.isBoardActivities = !state.isBoardActivities
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
                const boardToSend = JSON.parse(JSON.stringify(boardToSave))
                const savedBoard = await boardService.update(boardToSend);
                context.commit({ type: 'setBoard', board: savedBoard });
                context.dispatch({ type: 'sendBoard', board: savedBoard })
                return savedBoard
            } catch (err) {
                console.log('boardStore: Error in saveBoard', err);
                throw err;
            }
        },
        async addNewBoard(context) {
            try {
                var newBoard = boardService.getEmptyBoard();
                newBoard.createdBy = context.getters.loggedInUser;
                const addedBoard = await boardService.add(newBoard);
                return addedBoard
            } catch (err) {
                console.log('boardStore: Error in Adding New Board', err)
                throw err
            }
        },
        async removeBoard(context, boardId) {
            try {
                await boardService.remove(boardId);
                await context.dispatch('loadBoards');
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
                const taskActivities = boardActivities.filter(a => {
                    if (a.task) return a.task.id === taskId
                })
                return taskActivities

            } catch (err) {
                console.log('err:', err)
                throw err
            }
        },
        async saveTask({ state }, { task, groupId }) {
            try {
                this.commit({ type: 'saveTask', task, groupId })
                const savedTask = await this.dispatch({ type: 'saveBoard', boardToSave: JSON.parse(JSON.stringify(state.currBoard)) })
                return savedTask

            } catch (err) {
                console.log('err:', err)
                throw err
            }
        },
        async saveStatuses(context, statuses) {
            try {
                const boardToSave = {...context.state.currBoard };
                boardToSave.statuses = [...statuses];
                await context.dispatch('saveBoard', { boardToSave })
                return statuses;
            } catch (err) {

            }
        },
        async savePriorities(context, priorities) {
            try {
                const boardToSave = { ...context.state.currBoard };
                boardToSave.priorities = [...priorities];
                await context.dispatch('saveBoard', { boardToSave })
                return priorities;
            } catch (err) {

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