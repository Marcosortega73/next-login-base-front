import create from 'zustand'
import { persist } from 'zustand/middleware'

type DataUser = {
    id: number
    email: string
    name: string
    avatar?: string
}

type State = {
    isAuth: boolean
    setIsAuth: (isAuth: boolean) => void
    token: string | null
    setToken: (token: string | null) => void
    dataUser: DataUser | null
    setDataUser: (dataUser: DataUser | null) => void
}

export const useAuthStore = create(
    persist<State>(
        (set) => ({
            isAuth: false,
            setIsAuth: (isAuth) => set({ isAuth }),
            token: null,
            setToken: (token) => set({ token }),
            dataUser: null,
            setDataUser: (dataUser) => set({ dataUser }),
        }),
        {
            name: 'auth',
        }
    )
)

