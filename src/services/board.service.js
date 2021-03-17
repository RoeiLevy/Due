// import { httpService } from './http.service'
// import { userService } from './user.service'

import { storageService } from './async-storage.service'
const 
export const boardService = {
    add,
    query,
    remove
}

const BOARD_KEY = 'board'

// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}})

function query(boardId) {
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

    board.byUser = userService.getLoggedinUser()
    board.aboutUser = await userService.getById(board.aboutUserId)
    const addedBoard = storageService.post('board', board)

    return addedBoard
}