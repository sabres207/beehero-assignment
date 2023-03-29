import { createContext, useReducer, FC, PropsWithChildren, useContext } from 'react'
import { getUsers, getUserPosts } from '../services/Users'
import usersReducer, { initialState } from './usersReducer'

const UsersContext = createContext({
  ...initialState,
  fetchUsers: () => {},
  pickUser: (id: number) => {},
  fetchUserPosts: (id: number) => {},
  removeUser: (id: number) => {},
  removePost: (userId: number, postId: number) => {},
  setPostToEdit: (id: number) => {},
  unsetPostToEdit: () => {},
  editPost: (userId: number, postId: number, title: string, body: string) => {},
})

export const UsersProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, initialState)

  const fetchUsers = () => {
    if (state.users.data.length) return

    dispatch({ type: 'FETCH_USERS', payload: { loading: true } })

    getUsers()
      .then(data => {
        dispatch({ type: 'FETCH_USERS', payload: { data } })
      })
      .catch(error => {
        dispatch({ type: 'FETCH_USERS', payload: { error } })
      })
  }

  const pickUser = (id: number) => {
    dispatch({
      type: 'PICK_USER',
      payload: { id },
    })

    const currentUser = state.users.data.find(user => user.id === id)
    if (currentUser?.posts?.data.length) return

    fetchUserPosts(id)
  }

  const fetchUserPosts = (id: number) => {
    dispatch({ type: 'FETCH_USER_POSTS', payload: { loading: true, data: { userId: id } } })

    getUserPosts(id)
      .then(data => {
        dispatch({ type: 'FETCH_USER_POSTS', payload: { data: { userId: id, posts: data } } })
      })
      .catch(error => {
        dispatch({ type: 'FETCH_USER_POSTS', payload: { error, data: { userId: id } } })
      })
  }

  const removeUser = (id: number) => {
    dispatch({
      type: 'REMOVE_USER',
      payload: { id },
    })
  }

  const removePost = (userId: number, postId: number) => {
    dispatch({
      type: 'REMOVE_POST',
      payload: { userId, postId },
    })
  }

  const setPostToEdit = (id: number) => {
    dispatch({
      type: 'SET_POST_TO_EDIT',
      payload: { id },
    })
  }

  const unsetPostToEdit = () => {
    dispatch({
      type: 'UNSET_POST_TO_EDIT',
      payload: null,
    })
  }

  const editPost = (userId: number, postId: number, title: string, body: string) => {
    dispatch({
      type: 'EDIT_POST',
      payload: {
        userId,
        postId,
        title,
        body,
      },
    })
  }

  const value = {
    users: state.users,
    currentUserId: state.currentUserId,
    postIdToEdit: state.postIdToEdit,
    fetchUsers,
    pickUser,
    fetchUserPosts,
    removeUser,
    removePost,
    setPostToEdit,
    unsetPostToEdit,
    editPost,
  }

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}

export const useUsers = () => {
  const context = useContext(UsersContext)

  if (context == null) {
    throw new Error('useUsers should be used from within UsersContext')
  }

  return context
}
