import axios from 'axios'

export interface Address {
  geo: {
    lat: string
    lng: string
  }
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  company: { name: string }
  address: Address
}

export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

export const getUsers = async (): Promise<User[]> => {
  const result = await axios.request<User[]>({
    url: 'https://jsonplaceholder.typicode.com/users',
  })

  return result.data
}

export const getUserById = async (id: number): Promise<User | null> => {
  const result = await axios.request<User | null>({
    url: `https://jsonplaceholder.typicode.com/users/${id}`,
  })

  return result.data
}

export const getUserPosts = async (userId: number): Promise<Post[]> => {
  const result = await axios.request<Post[]>({
    url: `https://jsonplaceholder.typicode.com/users/${userId}/posts`,
  })

  return result.data
}
