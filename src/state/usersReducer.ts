import { Post, User } from '../services/Users'
import { UserAction } from './usersActions'

export interface AsyncData<T> {
  data: T
  loading: boolean
  error?: string
}

interface UsersModel {
  users: AsyncData<Array<User & { posts?: AsyncData<Post[]> }>>
  currentUserId?: number
  postIdToEdit?: number
}

export const initialState: UsersModel = {
  users: { loading: false, error: undefined, data: [] },
  currentUserId: undefined,
  postIdToEdit: undefined,
}

const usersReducer = (state: UsersModel, action: UserAction): UsersModel => {
  const { type, payload } = action

  switch (type) {
    case 'FETCH_USERS': {
      const { loading, data, error } = payload

      if (loading) {
        return { ...state, users: { ...state.users, loading: true } }
      }
      if (error) {
        return { ...state, users: { ...state.users, loading: false, error } }
      }
      if (data) {
        return { ...state, users: { data, loading: false, error: undefined } }
      }
      return state
    }

    case 'PICK_USER': {
      const { id } = payload
      return { ...state, currentUserId: id }
    }

    case 'FETCH_USER_POSTS': {
      const { loading, data, error } = payload
      if (!data?.userId) return state

      if (loading) {
        return {
          ...state,
          users: {
            ...state.users,
            data: state.users.data.map(user => {
              if (user.id !== data.userId) return user
              return { ...user, posts: { ...(user.posts || { data: [] }), loading: true } }
            }),
          },
        }
      }
      if (error) {
        return {
          ...state,
          users: {
            ...state.users,
            data: state.users.data.map(user => {
              if (user.id !== data.userId) return user
              return { ...user, posts: { ...(user.posts || { data: [] }), loading: false, error } }
            }),
          },
        }
      }
      if (data) {
        return {
          ...state,
          users: {
            ...state.users,
            data: state.users.data.map(user => {
              if (user.id !== data.userId) return user
              return { ...user, posts: { data: data.posts || [], error: undefined, loading: false } }
            }),
          },
        }
      }
      return state
    }

    case 'REMOVE_USER': {
      return { ...state, users: { ...state.users, data: state.users.data.filter(({ id }) => id !== payload.id) } }
    }

    case 'REMOVE_POST': {
      const { userId, postId } = payload

      return {
        ...state,
        users: {
          ...state.users,
          data: state.users.data.map(user => {
            if (user.id !== userId) return user

            return {
              ...user,
              posts: { data: user.posts?.data.filter(({ id }) => id !== postId) || [], loading: false },
            }
          }),
        },
      }
    }

    case 'SET_POST_TO_EDIT': {
      const { id } = payload
      return { ...state, postIdToEdit: id }
    }

    case 'UNSET_POST_TO_EDIT': {
      return { ...state, postIdToEdit: undefined }
    }

    case 'EDIT_POST': {
      const { userId, postId, title, body } = payload

      const user = state.users.data.find(({ id }) => id === userId)
      const post = user?.posts?.data.find(({ id }) => id === postId)

      if (!post) return state

      return {
        ...state,
        users: {
          ...state.users,
          data: state.users.data.map(user => {
            if (user.id !== userId) return user
            return {
              ...user,
              posts: {
                ...user.posts,
                loading: false,
                data: user.posts!.data.map(post => {
                  if (post.id !== postId) return post
                  return { ...post, title, body }
                }),
              },
            }
          }),
        },
      }
    }
  }
}

export default usersReducer
