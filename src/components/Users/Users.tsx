import { FC, memo, useEffect } from 'react'
import { useUsers } from '../../state/UsersContext'
import { UserCard } from './UserCard'

interface Props {
  scrollToPosts: () => void
}

export const Users: FC<Props> = memo(({ scrollToPosts }) => {
  const {
    fetchUsers,
    users: { data: users, loading, error },
  } = useUsers()

  useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) return <>Loading...</>
  if (error) return <>{error}</>

  return (
    <div>
      <h1 className="text-2xl text-amber-900 font-bold m-4 mb-0">Users</h1>

      <div className="flex flex-wrap gap-4 p-4">
        {users?.map(user => (
          <UserCard key={user.id} user={user} scrollToPosts={scrollToPosts} />
        ))}
      </div>
    </div>
  )
})
