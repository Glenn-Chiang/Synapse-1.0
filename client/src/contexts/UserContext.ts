import {createContext} from 'react'
import { User } from '../types'

const UserContext = createContext<User|undefined|null>(null)

export default UserContext