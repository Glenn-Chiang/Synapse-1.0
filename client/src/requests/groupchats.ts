import { GroupChat } from '../types'
import axios from './axios'

const getGroups = async (userId: string) => {
  const response = await axios.get(`/users/${userId}/groups`)
  return response.data as GroupChat[]
}

export {getGroups}