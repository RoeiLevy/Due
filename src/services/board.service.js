import { httpService } from './http.service'
import { utilService } from './util.service'
import { storageService } from './async-storage.service'

export const boardService = {
    add,
    update,
    query,
    remove,
    getBoard,
    getEmptyBoard,
    getEmptyGroup,
    getEmptyTask,
    addTask,
    saveGroup,
    updateTask,
    removeTask,
    removeGroup
}

const BOARD_KEY = 'board'
const API_KEY = 'board/'


async function query() {
    return httpService.get(`board/`)

    // if (!localStorage.getItem(BOARD_KEY)) {
    //     localStorage.setItem(BOARD_KEY, JSON.stringify(boardDB));
    //     return Promise.resolve(boardDB);
    // }
    // return storageService.query(BOARD_KEY);

}


async function getBoard(boardId) {
    return httpService.get(`board/${boardId}`)
    // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
    // return storageService.get(BOARD_KEY, boardId)
}

async function remove(boardId) {
    return httpService.delete(`board/${boardId}`)
    // return storageService.remove('board', boardId)

}

async function add(board) {
    return httpService.post(`board`, board)
    // const addedBoard = await httpService.post(`board`, board)
    // board.createdBy = userService.getLoggedinUser()
    // const addedBoard = storageService.post('board', board)
    // return addedBoard
}

async function update(board) {
    const addedBoard = await httpService.put(`board/${board._id}`, board)
    return addedBoard
    // const addedBoard = storageService.put('board', board)
}

async function addTask(task, groupId, boardId) {
    try {
        var currBoard = await getBoard(boardId);
        const idx = currBoard.groups.findIndex(group => group.id === groupId);
        currBoard.groups[idx].tasks.push(task);
        await storageService.put('board', currBoard);
        return task
    } catch (err) {
        console.log(err)
    }
}

async function updateTask(task, groupId, boardId) {
    try {
        var currBoard = await getBoard(boardId);
        const groupIdx = currBoard.groups.findIndex(group => group.id === groupId);
        const taskIdx = currBoard.groups[groupIdx].tasks.findIndex(item => item.id === task.id);
        currBoard.groups[groupIdx].tasks.splice(taskIdx, 1, task);
        await storageService.put('board', currBoard);

        return task
    } catch (err) {
        console.log(err)
    }
}


async function removeTask(taskId, groupId, boardId) {
    try {
        var currBoard = await getBoard(boardId);
        const groupIdx = currBoard.groups.findIndex(group => group.id === groupId);
        const taskIdx = currBoard.groups[groupIdx].tasks.findIndex(item => item.id === taskId);
        currBoard.groups[groupIdx].tasks.splice(taskIdx, 1);
        const removed = await storageService.put('board', currBoard);
        return removed
    } catch (err) {
        console.log(err)
    }
}

async function saveGroup(group, boardId) {
    try {
        console.log('return group?', group)
        var currBoard = await getBoard(boardId);
        const idx = currBoard.groups.findIndex(g => g.id === group.id);
        currBoard.groups.splice(idx, 1, group);
        await storageService.put('board', currBoard);
        return group;
    } catch (err) {
        console.log('Error in board Service, couldn`t save group', err);
        throw err;
    }
}


async function removeGroup(groupId, boardId) {
    try {
        var currBoard = await getBoard(boardId);
        const idx = currBoard.groups.findIndex(g => g.id === groupId);
        currBoard.groups.splice(idx, 1);
        await storageService.put('board', currBoard);
        return groupId;
    } catch (err) {
        console.log('Error in board Service, couldn`t save group', err);
        throw err;
    }
}

function getEmptyBoard() {
    return {
        "title": "New Board",
        "thumbnail": 'http://res.cloudinary.com/datgr82j1/image/upload/v1616405537/bfxcehpe4uoamw6t5c5o.png',
        "createdAt": Date.now(),
        "createdBy": {},
        "members": [],
        "groups": [],
        "statuses": [{
            "id": "udg2t6",
            "title": "Done",
            "color": "#00c875"
        },
        {
            "id": "udm874",
            "title": "Working on it",
            "color": "#fdab3d"
        },
        {
            "id": "ud176a",
            "title": "Stuck",
            "color": "#e2445c"
        }
        ],
        "priorities": [{
            "id": "udr2t6",
            "title": "Important",
            "color": "#C85A00"
        },
        {
            "id": "udm074",
            "title": "Urgent",
            "color": "red"
        },
        {
            "id": "ud1k6a",
            "title": "Low",
            "color": "#A8E244"
        }
        ],
        "activities": [],
        "views": [],
        "description": "Enter Board Description"
    }

}

function getEmptyGroup() {
    return {
        id: utilService.makeId(),
        title: 'New Group',
        tasks: [],
        style: { color: '#e6e9ef;' },
        headers: ['members', 'status', 'dueDate']

    }
}

function getEmptyTask() {
    return {
        // id: utilService.makeId,
        title: '',
        createdAt: new Date(),
        status: null,
        priority: null
    }

}