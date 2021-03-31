import { Login, Logout } from "./types/connection"

const login = () => ({ type: Login })
const logout = () => ({ type: Logout })

export {
    login,
    logout,
}