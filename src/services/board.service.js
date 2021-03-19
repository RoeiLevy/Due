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


const boardDB = [{
    "_id": "b101",
    "title": "Robot dev proj",
    "thumbnail": '',
    "createdAt": 1589983468418,
    "createdBy": {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "imgUrl": "http://some-img"
    },
    "members": [{
        "_id": "u101",
        "fullname": "Tal Tarablus",
        "imgUrl": "https://www.google.com"
    }],
    "groups": [{
        "id": "g101",
        "title": "Group 1",
        "headers": ['members', 'status', 'dueDate'],
        "tasks": [{
            "id": "c101",
            "title": "Replace logo"
        },
        {
            "id": "g102",
            "title": "Group 2",
            "tasks": [{
                "id": "c103",
                "title": "Do that"
            },
            {
                "id": "c104",
                "title": "Help me with Atlas",
                "status": {
                    "id": "udg2t6",
                    "title": "Done",
                    "color": "#00c875"
                },
                "comments": [{
                    "id": "ZdPnm",
                    "txt": "also @yaronb please CR this",
                    "createdAt": 1590999817436.0,
                    "byMember": {
                        "_id": "u101",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    }
                }],
                "members": [{
                    "_id": "u101",
                    "fullname": "Tal Tarablus",
                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                }],
                "createdAt": 1590999730348,
                "dueDate": 16156215211,
                "byMember": {
                    "_id": "u101",
                    "username": "Tal",
                    "fullname": "Tal Tarablus",
                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                },
                "style": {
                    "bgColor": "#26de81"
                }
            }
            ],
            "style": {}
        }
        ],
        "statuses": [{
            "id": "udg2t6",
            "title": "Done",
            "color": "#00c875"
        },
        {
            "id": "c104",
            "title": "Help me with Atlas",
            "headers": ['members', 'status', 'dueDate'],
            "status": {
                "id": "udg2t6",
                "title": "Done",
                "color": "#00c875"
            },
            "comments": [{
                "id": "ZdPnm",
                "txt": "also @yaronb please CR this",
                "createdAt": 1590999817436.0,
                "byMember": {
                    "_id": "u101",
                    "fullname": "Tal Tarablus",
                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                }
            }],
            "members": [{
                "_id": "u101",
                "fullname": "Tal Tarablus",
                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            }],
            "createdAt": 1590999730348,
            "dueDate": 16156215211,
            "byMember": {
                "_id": "u101",
                "username": "Tal",
                "fullname": "Tal Tarablus",
                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "style": {
                "bgColor": "#26de81"
            }
        }
        ],
        "style": {}
    }
    ],
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
    },
    ],
    "activities": [{
        "id": "a101",
        "txt": "Changed Color",
        "createdAt": 154514,
        "byMember": {
            "_id": "u101",
            "fullname": "Abi Abambi",
            "imgUrl": "http://some-img"
        },
        "task": {
            "id": "c101",
            "title": "Replace Logo"
        }
    }]
}, {
    "_id": "b102",
    "title": "Robot dev proj",
    "thumbnail": '',
    "createdAt": 1589983468418,
    "createdBy": {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "imgUrl": "http://some-img"
    },
    "members": [{
        "_id": "u101",
        "fullname": "Tal Tarablus",
        "imgUrl": "https://www.google.com"
    }],
    "groups": [{
        "id": "g101",
        "title": "Group 1",
        "headers": ['members', 'status', 'dueDate'],
        "tasks": [{
            "id": "c101",
            "title": "Replace logo"
        },
        {
            "id": "c102",
            "title": "Add Samples"
        }
        ],
        "style": {}
    },
    {
        "id": "g102",
        "title": "Group 2",
        "headers": ['members', 'status', 'dueDate'],
        "tasks": [{
            "id": "c103",
            "title": "Do that"
        },
        {
            "id": "c104",
            "title": "Help me with Atlas",
            "status": {
                "id": "udg2t6",
                "title": "Done",
                "color": "#00c875"
            },
            "comments": [{
                "id": "ZdPnm",
                "txt": "also @yaronb please CR this",
                "createdAt": 1590999817436.0,
                "byMember": {
                    "_id": "u101",
                    "fullname": "Tal Tarablus",
                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                }
            }],
            "members": [{
                "_id": "u101",
                "fullname": "Tal Tarablus",
                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            }],
            "createdAt": 1590999730348,
            "dueDate": 16156215211,
            "byMember": {
                "_id": "u101",
                "username": "Tal",
                "fullname": "Tal Tarablus",
                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "style": {
                "bgColor": "#26de81"
            }
        }
        ],
        "style": {}
    }
    ],
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
    "activities": [{
        "id": "a101",
        "txt": "Changed Color",
        "createdAt": 154514,
        "byMember": {
            "_id": "u101",
            "fullname": "Abi Abambi",
            "imgUrl": "http://some-img"
        },
        "task": {
            "id": "c101",
            "title": "Replace Logo"
        }
    }]
}]

const BOARD_KEY = 'board'


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
    return storageService.delete('board', boardId)

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
        "thumbnail": '',
        "createdAt": Date.now(),
        "createdBy": {},
        "members": [],
        "groups": [],
        "statuses": [],
        "activities": []
    }

}

function getEmptyGroup() {
    return {
        id: utilService.makeId(),
        title: 'New Group',
        tasks: [],
        style: { color: '#ffffff' },
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

