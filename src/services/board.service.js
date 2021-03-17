// import { httpService } from './http.service'
// import { userService } from './user.service'

import { utilSerivce } from './util.service'
import { storageService } from './async-storage.service'

export const boardService = {
    add,
    update,
    query,
    remove,
    getBoard,
    getEmptyBoard,
    getEmptyGroup
}


const boardDB = [{
    "_id": "b101",
    "title": "Robot dev proj",
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
        "tasks": [{
            "id": "c103",
            "title": "Do that"
        },
        {
            "id": "c104",
            "title": "Help me with Atlas",
            "statusId": "statusId",
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
        "id": "udm876",
        "title": "Done",
        "color": "#ffffff"
    }],
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
        storageService.save(BOARD_KEY, boardDB);
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

    board.createdBy = userService.getLoggedinUser()
    const addedBoard = storageService.post('board', board)

    return addedBoard
}

async function update(board) {
    // const addedBoard = await httpService.post(`board`, board)
    const addedBoard = storageService.put('board', board)

    return addedBoard
}

function getEmptyBoard() {
    return {
        "_id": utilSerivce.makeId(),
        "title": "Robot dev proj",
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
            "tasks": [{
                "id": "c103",
                "title": "Do that"
            },
            {
                "id": "c104",
                "title": "Help me with Atlas",
                "statusId": "statusId",
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
            "id": "udm876",
            "title": "Done",
            "color": "#ffffff"
        }],
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
    }
}

function getEmptyGroup() {
    return {
        id: utilSerivce.makeId(),
        title: '',
        tasks: [],
        style: {}
    }
}