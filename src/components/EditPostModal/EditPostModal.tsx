import { memo } from 'react'
import { useUsers } from '../../state/UsersContext'
import { EditPostForm } from './EditPostForm'

export const EditPostModal = memo(() => {
  const { postIdToEdit } = useUsers()
  const isEditPost = postIdToEdit != null

  return (
    <>
      <div
        className={`fixed h-full inset-0 z-40 bg-black/50 transition-all duration-300 ${
          isEditPost ? 'block' : 'hidden'
        }`}
      ></div>
      <div
        className={`rounded-md p-4 w-96 bg-amber-100 z-50 shadow-xl mx-auto fixed left-0 right-0 transition-all duration-300 ${
          isEditPost ? 'bottom-10' : '-bottom-full'
        }`}
      >
        <EditPostForm />
      </div>
    </>
  )
})
