class TodoAPI {
    static API = "https://642768d646fd35eb7c3f6d3b.mockapi.io/api/todo/"

    static getList() {
        return fetch(TodoAPI.API).
            then((res) => {
                if(res.ok) {
                    return res.json()
                }
                throw new Error('Can not retrieve todo list from server.')
        })
    }

    static createElem(todo) {
        return fetch(TodoAPI.API, {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-type': 'application/json'
            }
        }).
        then((res) => {
            if(res.ok) {
                return res.json()
            }
            throw new Error('Can not add this element to todo list.')
        })
    }

    static deleteElem(index) {
        return fetch(TodoAPI.API + index, {
            method: 'DELETE'
        }).
        then((res) => {
            if(res.ok) {
                return res.json()
            }
            throw new Error('Can not delete this element from todo list.')
        })
    }
}