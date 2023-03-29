import { memo, FC } from 'react'
import { Link } from '../common/Link'
import { User } from '../../services/Users'
import { Card } from '../common/Card'
import { useUsers } from '../../state/UsersContext'

interface Props {
  user: User
  scrollToPosts: () => void
}

export const UserCard: FC<Props> = memo(({ user, scrollToPosts }) => {
  const {
    id,
    name,
    username,
    email,
    company,
    address: {
      geo: { lat, lng },
    },
  } = user
  const { removeUser, pickUser } = useUsers()

  const handleClick = (id: number) => {
    pickUser(id)
    scrollToPosts()
  }

  return (
    <Card id={id} onClose={removeUser} onClick={handleClick} className="w-56 h-56">
      <div className="flex flex-col">
        <span className="font-medium capitalize">Name:</span>
        <span>
          {name} ({username})
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-medium capitalize">Email:</span>
        <span>
          {name} ({username})
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-medium capitalize">Location:</span>
        <span>
          <Link to={`/map/@${lat},${lng}`} stopPropagation>
            ({lat}, {lng})
          </Link>
        </span>
        <div className="flex flex-col">
          <span className="font-medium capitalize">Company:</span>
          <span>{company.name}</span>
        </div>
      </div>
    </Card>
  )
})
