import { FC, ReactNode, MouseEvent, memo } from 'react'
import { Link as RouterLink } from 'react-router-dom'

interface Props {
  to: string
  children: ReactNode
  className?: string
  stopPropagation?: boolean
}

export const Link: FC<Props> = memo(({ to, children, className = '', stopPropagation }) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (stopPropagation) {
      event.stopPropagation()
    }
  }

  return (
    <RouterLink
      to={to}
      className={`text-blue-900 visited:text-purple-900 active:text-red-900 hover:text-red-900 ${className}`}
      onClick={handleClick}
    >
      {children}
    </RouterLink>
  )
})
