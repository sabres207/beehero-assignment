import { AsyncData } from './usersReducer'
import { Post, User } from '../services/Users'

type AsyncAction<T> = Partial<AsyncData<T>>

interface FETCH_USERS {
  type: 'FETCH_USERS'
  payload: AsyncAction<User[]>
}

interface PICK_USER {
  type: 'PICK_USER'
  payload: {
    id: number
  }
}

interface REMOVE_USER {
  type: 'REMOVE_USER'
  payload: {
    id: number
  }
}

interface FETCH_USER_POSTS {
  type: 'FETCH_USER_POSTS'
  payload: AsyncAction<{ userId: number; posts?: Post[] }>
}

interface REMOVE_POST {
  type: 'REMOVE_POST'
  payload: {
    userId: number
    postId: number
  }
}

interface SET_POST_TO_EDIT {
  type: 'SET_POST_TO_EDIT'
  payload: { id: number }
}

interface UNSET_POST_TO_EDIT {
  type: 'UNSET_POST_TO_EDIT'
  payload: null
}

interface EDIT_POST {
  type: 'EDIT_POST'
  payload: {
    userId: number
    postId: number
    title: string
    body: string
  }
}

export type UserAction =
  | FETCH_USERS
  | PICK_USER
  | REMOVE_USER
  | FETCH_USER_POSTS
  | REMOVE_POST
  | SET_POST_TO_EDIT
  | UNSET_POST_TO_EDIT
  | EDIT_POST
