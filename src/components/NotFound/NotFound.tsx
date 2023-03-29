import { useEffect, FC, memo } from 'react'
import { useNavigate } from 'react-router-dom'

export const NotFound: FC = memo(() => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/')
  }, [navigate])

  return <p>This page does'nt exist</p>
})
