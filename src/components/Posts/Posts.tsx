import { memo, FC, forwardRef, Ref } from 'react'
import { unknown } from 'zod'
import { useUsers } from '../../state/UsersContext'
import { PostCard } from './PostCard'

export const Posts = memo(
  forwardRef((_: unknown, ref: Ref<HTMLDivElement>) => {
    const { users, currentUserId } = useUsers()

    const currentUser = users.data.find(user => user.id === currentUserId)
    const posts = currentUser?.posts?.data || []

    if (currentUser?.posts?.loading) {
      return <>Loading...</>
    }
    if (currentUser?.posts?.error) {
      return <>{currentUser?.posts?.error}</>
    }

    return (
      <div ref={ref}>
        <h1 className="text-2xl text-amber-900 font-bold m-4 mb-0">Posts</h1>
        <div className="flex flex-wrap gap-4 p-4">
          {currentUserId != null && posts.map(post => <PostCard key={post.id} post={post} userId={currentUserId} />)}
        </div>
      </div>
    )
  })
)
