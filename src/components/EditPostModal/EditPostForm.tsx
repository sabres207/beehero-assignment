import { FC, memo, useEffect, KeyboardEvent } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useUsers } from '../../state/UsersContext'

const schema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  body: z.string().min(1, { message: 'Body is required' }),
})

type FormSchema = z.infer<typeof schema>

export const EditPostForm: FC = memo(() => {
  const { users, currentUserId, postIdToEdit, unsetPostToEdit, editPost } = useUsers()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const post = users.data.find(user => user.id === currentUserId)?.posts?.data.find(post => post.id === postIdToEdit)

  useEffect(() => {
    setValue('title', post?.title || '')
    setValue('body', post?.body || '')
  }, [post])

  const handleMouseDown =
    (field: 'title' | 'body') => (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        setFocus(field)
      }
    }

  const onSubmit: SubmitHandler<FormSchema> = data => {
    const { title, body } = data
    editPost(currentUserId!, postIdToEdit!, title, body)
    unsetPostToEdit()
  }

  return (
    <form className="flex flex-col p-2" onSubmit={handleSubmit(onSubmit)}>
      <label>Title:</label>
      <input
        type="text"
        {...register('title')}
        onKeyDown={handleMouseDown('body')}
        className={`outline-none rounded-sm ${errors.title && 'border-red-600'}`}
        placeholder="Post tittle..."
      />
      {errors.title && <p className="text-red-600">{errors.title?.message}</p>}
      <label>Body:</label>
      <textarea
        {...register('body')}
        onKeyDown={handleMouseDown('title')}
        className="outline-none rounded-sm"
        placeholder="Post body..."
        rows={10}
      />
      <p className={`text-red-600 ${errors.body?.message ? 'opacity-100' : 'opacity-0'}`}>{errors.body?.message}</p>

      <div className="flex mx-auto gap-8 mt-4">
        <button
          disabled={Boolean(errors.body) || Boolean(errors.title)}
          className="px-2 py-0.5 border-amber-900 rounded-md text-white bg-lime-500"
        >
          Confirm
        </button>
        <button
          className="px-2 py-0.5 border-amber-900 rounded-md text-white bg-red-700"
          onClick={e => {
            e.preventDefault()
            unsetPostToEdit()
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  )
})
