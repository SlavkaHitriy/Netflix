import { action, makeAutoObservable } from 'mobx'

class UserStore {
    constructor() {
        makeAutoObservable(this)
    }

    isAuth = false

    // @action
    setIsAuth (isAuth) {
        this.isAuth = isAuth
    }
}

export default new UserStore()
