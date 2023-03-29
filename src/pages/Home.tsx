import { useRef, memo } from 'react'
import { Posts } from '../components/Posts'
import { Users } from '../components/Users'
import { EditPostModal } from '../components/EditPostModal'

export const Home = memo(() => {
  const postsRef = useRef<HTMLDivElement | null>(null)

  const scrollToPosts = () => postsRef.current?.scrollIntoView()

  return (
    <div>
      <Users scrollToPosts={scrollToPosts} />
      <Posts ref={postsRef} />
      <EditPostModal />
      <div />
    </div>
  )
})
