import { FC, memo } from 'react'
import { Post } from '../../services/Users'
import { useUsers } from '../../state/UsersContext'
import { Card } from '../common/Card'

interface Props {
  post: Post
  userId: number
}

export const PostCard: FC<Props> = memo(({ post, userId }) => {
  const { removePost, setPostToEdit } = useUsers()

  const handleRemovePost = (userId: number) => (id: number) => {
    removePost(userId, id)
  }

  const handleClick = (id: number) => {
    setPostToEdit(id)
  }

  return (
    <Card
      id={post.id}
      onClose={handleRemovePost(userId)}
      onClick={handleClick}
      className="w-60 flex flex-col justify-evenly py-4"
    >
      <span className="font-medium text-lg">{post.title}</span>
      <span className="italic font-light text-xs">{post.body}</span>
    </Card>
  )
})
