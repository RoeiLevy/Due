// import { httpService } from './http.service'
import { utilService } from './util.service'

import { utilSerivce } from './util.service'
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

const boardDB = [{ "_id": "b101", "title": "Due / Group Tasks", "views": [], "description": "Enter Board Description", "thumbnail": "http://res.cloudinary.com/datgr82j1/image/upload/v1616405537/bfxcehpe4uoamw6t5c5o.png", "createdAt": 1589983468418, "createdBy": { "_id": "u101", "fullname": "Abi Abambi", "imgUrl": "http://some-img" }, "members": [{ "_id": "u101", "fullname": "Tal Tarablus", "imgUrl": "https://www.google.com" }], "groups": [{ "id": "CDLJ1", "title": "Yonatan", "tasks": [{ "title": "CSS - Solve Left border issue", "createdAt": 1616256989417, "status": null, "id": "9WGlP" }, { "title": "Service - SAVE functionality needs refining", "createdAt": 1616256992452, "status": null, "id": "VyfWY" }, { "title": "⭐ \"Sticky\" Header", "createdAt": 1616259114942, "status": null, "id": "CLvWf" }], "style": { "color": "#CE98FC" }, "headers": ["members", "status", "dueDate"] }, { "id": "eMAEI", "title": "Roi", "tasks": [{ "title": "Drragable Changes", "createdAt": 1616257014267, "status": null, "id": "S2U8P" }, { "title": "Chart.js start from zero", "createdAt": 1616257017117, "status": null, "id": "xN2qG" }, { "title": "Server planning", "createdAt": 1616257019180, "status": null, "id": "IlAgm" }], "style": { "color": "#A979FC" }, "headers": ["members", "status", "dueDate"] }, { "id": "m6QcY", "title": "Dorran", "tasks": [{ "title": "Demo data needs detune", "createdAt": 1616256995300, "status": null, "id": "tBEKX" }, { "title": "Board List prep", "createdAt": 1616257021956, "status": null, "id": "dXe3r" }, { "title": "Group pitch for Sunday", "createdAt": 1616257025146, "status": null, "id": "Hm8Tn" }], "style": { "color": "#797BFE" }, "headers": ["members", "status", "dueDate"] }, { "id": "g101", "title": "Dean", "headers": ["members", "status", "dueDate"], "tasks": [{ "id": "g102", "title": "Find who Dean is", "tasks": [{ "id": "c103", "title": "Do that" }, { "id": "c104", "title": "Help me with Atlas", "status": { "id": "udg2t6", "title": "Done", "color": "#00c875" }, "comments": [{ "id": "ZdPnm", "txt": "also @yaronb please CR this", "createdAt": 1590999817436, "byMember": { "_id": "u101", "fullname": "Tal Tarablus", "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg" } }], "members": [{ "_id": "u101", "fullname": "Tal Tarablus", "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg" }], "createdAt": 1590999730348, "dueDate": 16156215211, "byMember": { "_id": "u101", "username": "Tal", "fullname": "Tal Tarablus", "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg" }, "style": { "bgColor": "#26de81" } }], "style": {} }, { "title": "Might be a spy", "createdAt": 1616256998124, "status": null, "id": "oMaLe" }, { "id": "c101", "title": "Replace logo" }], "statuses": [{ "id": "udg2t6", "title": "Done", "color": "#00c875" }, { "id": "c104", "title": "Help me with Atlas", "headers": ["members", "status", "dueDate"], "status": { "id": "udg2t6", "title": "Done", "color": "#00c875" }, "comments": [{ "id": "ZdPnm", "txt": "also @yaronb please CR this", "createdAt": 1590999817436, "byMember": { "_id": "u101", "fullname": "Tal Tarablus", "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg" } }], "members": [{ "_id": "u101", "fullname": "Tal Tarablus", "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg" }], "createdAt": 1590999730348, "dueDate": 16156215211, "byMember": { "_id": "u101", "username": "Tal", "fullname": "Tal Tarablus", "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg" }, "style": { "bgColor": "#26de81" } }], "style": { "color": "#6289FF" } }], "statuses": [{ "id": "udg2t6", "title": "Done", "color": "#00c875" }, { "id": "udm874", "title": "Working on it", "color": "#fdab3d" }, { "id": "ud176a", "title": "Stuck", "color": "#e2445c" }], "activities": [{ "id": "a101", "txt": "Changed Color", "createdAt": 154514, "byMember": { "_id": "u101", "fullname": "Abi Abambi", "imgUrl": "http://some-img" }, "task": { "id": "c101", "title": "Replace Logo" } }] }, { "_id": "b102", "title": "Drewl 🎨", "thumbnail": "http://res.cloudinary.com/datgr82j1/image/upload/v1616405537/bfxcehpe4uoamw6t5c5o.png", "views": [], "description": "Enter Board Description", "createdAt": 1589983468418, "createdBy": { "_id": "u101", "fullname": "Abi Abambi", "imgUrl": "http://some-img" }, "members": [{ "_id": "u101", "fullname": "Tal Tarablus", "imgUrl": "https://www.google.com" }], "groups": [{ "id": "g101", "title": "Pitch Ideas", "style": { "color": "#3BCBFF" }, "headers": ["members", "status", "dueDate"], "tasks": [{ "id": "c101", "title": "Painting App for Toddlers!" }, { "title": "Drawing enables your child to draw connections between what he sees and does.", "createdAt": 1616258319420, "status": null, "id": "scptC" }, { "id": "c102", "title": "Add Samples to presentation" }, { "title": "Improving fine motor skills", "createdAt": 1616258291594, "status": null, "id": "uXbgU" }] }, { "id": "HUt7V", "title": "App CSS", "tasks": [{ "title": "Add illustrations from Meg to Gallery", "createdAt": 1616258120190, "status": null, "id": "HsOan" }, { "title": "Horse Illustration pixelated - Talk to Bryan", "createdAt": 1616258174209, "status": null, "id": "Hi3GI" }, { "title": "Fix card-container border radius", "createdAt": 1616258189796, "status": null, "id": "EKY8P" }], "style": { "color": "#8052FF" }, "headers": ["members", "status", "dueDate"] }, { "id": "g102", "title": "App / Front", "style": { "color": "#B871FF" }, "headers": ["members", "status", "dueDate"], "tasks": [{ "id": "c103", "title": "Demo mode - decide how many trys" }, { "id": "c104", "title": "Chat with client - Talk to Sharon", "status": { "id": "udg2t6", "title": "Done", "color": "#00c875" }, "comments": [{ "id": "ZdPnm", "txt": "also @yaronb please CR this", "createdAt": 1590999817436, "byMember": { "_id": "u101", "fullname": "Tal Tarablus", "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg" } }], "members": [{ "_id": "u101", "fullname": "Tal Tarablus", "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg" }], "createdAt": 1590999730348, "dueDate": 16156215211, "byMember": { "_id": "u101", "username": "Tal", "fullname": "Tal Tarablus", "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg" }, "style": { "bgColor": "#26de81" } }, { "title": "Add Brushes", "createdAt": 1616258475360, "status": null, "id": "Z6rui" }, { "title": "Painting Club component solve errors", "createdAt": 1616258496720, "status": { "id": "udm874", "title": "Working on it", "color": "#fdab3d" }, "id": "D5ycL" }] }], "statuses": [{ "id": "udg2t6", "title": "Done", "color": "#00c875" }, { "id": "udm874", "title": "Working on it", "color": "#fdab3d" }, { "id": "ud176a", "title": "Stuck", "color": "#e2445c" }], "activities": [{ "id": "a101", "txt": "Changed Color", "createdAt": 154514, "byMember": { "_id": "u101", "fullname": "Abi Abambi", "imgUrl": "http://some-img" }, "task": { "id": "c101", "title": "Replace Logo" } }] }, { "title": "New Board", "thumbnail": "http://res.cloudinary.com/datgr82j1/image/upload/v1616405537/bfxcehpe4uoamw6t5c5o.png", "description": "Enter Board Description", "createdAt": 1616259263236, "createdBy": {}, "members": [], "groups": [{ "id": "MfZj1", "title": "Group 1", "tasks": [{ "title": "Task 1", "createdAt": 1616259325426, "status": null, "id": "WZzoY" }, { "title": "Task 2", "createdAt": 1616259337554, "status": null, "id": "NNzkl" }, { "title": "Task 3", "createdAt": 1616259340382, "status": null, "id": "MFfSz" }], "style": { "color": "#FB1A1A" }, "headers": ["members", "status", "dueDate"] }, { "id": "n8zSn", "title": "Group 2", "tasks": [{ "title": "Task 1", "createdAt": 1616259343931, "status": null, "id": "CHIUr" }, { "title": "Task 2", "createdAt": 1616259351648, "status": null, "id": "t8KOM" }, { "title": "Task 3", "createdAt": 1616259353706, "status": null, "id": "FphSb" }], "style": { "color": "#FF7B00" }, "headers": ["members", "status", "dueDate"] }, { "id": "WEER1", "title": "Group 3", "tasks": [{ "title": "Task 1", "createdAt": 1616259359903, "status": null, "id": "1ytRM" }, { "title": "Task 2", "createdAt": 1616259362323, "status": null, "id": "GbXDl" }, { "title": "Task 3", "createdAt": 1616259364919, "status": null, "id": "Vr6ko" }], "style": { "color": "#FFF200" }, "headers": ["members", "status", "dueDate"] }, { "id": "xsi40", "title": "Group 4", "tasks": [{ "title": "Task 1", "createdAt": 1616259741677, "status": null, "id": "DQjdi" }, { "title": "Task 2", "createdAt": 1616259751367, "status": null, "id": "IxX1H" }, { "title": "Task 3", "createdAt": 1616259754171, "status": null, "id": "kztKU" }], "style": { "color": "#43F440" }, "headers": ["members", "status", "dueDate"] }, { "id": "Ogb4R", "title": "Group 5", "tasks": [{ "title": "Task 1", "createdAt": 1616259787623, "status": null, "id": "cfkyZ" }, { "title": "Task 2", "createdAt": 1616259808344, "status": null, "id": "LnXis" }, { "title": "Task 3", "createdAt": 1616259810363, "status": null, "id": "JAvpD" }], "style": { "color": "#3BDEFF" }, "headers": ["members", "status", "dueDate"] }], "statuses": [{ "id": "udg2t6", "title": "Done", "color": "#00c875" }, { "id": "udm874", "title": "Working on it", "color": "#fdab3d" }, { "id": "ud176a", "title": "Stuck", "color": "#e2445c" }], "activities": [], "_id": "2wsnv" }]

const BOARD_KEY = 'board'
const KEY='board/'


function query() {
    if (!localStorage.getItem(BOARD_KEY)) {
        localStorage.setItem(BOARD_KEY, JSON.stringify(boardDB));
        return Promise.resolve(boardDB);
    }
    return storageService.query(BOARD_KEY);
}



function getBoard(boardId) {
    // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
    // return httpService.get(`board${queryStr}`)
    return storageService.get(BOARD_KEY, boardId)
}

function remove(boardId) {
    // return httpService.delete(`board/${boardId}`)
    return storageService.remove('board', boardId)

}

async function add(board) {
    // const addedBoard = await httpService.post(`board`, board)

    // board.createdBy = userService.getLoggedinUser()
    const addedBoard = storageService.post('board', board)

    return addedBoard
}

async function update(board) {
    // const addedBoard = await httpService.post(`board`, board)
    const addedBoard = storageService.put('board', board)

    return addedBoard
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
        "activities": [],
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
        status: null
    }

}