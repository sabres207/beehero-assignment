import { FC, PropsWithChildren, MouseEvent, memo } from 'react'

interface Props extends PropsWithChildren {
  id: number
  onClick: (id: number) => void
  onClose: (id: number) => void
  className?: string
}

export const Card: FC<Props> = memo(({ children, id, onClose, onClick, className = '' }) => {
  const handleClose = (id: number) => (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()

    onClose(id)
  }

  const handleClick = (id: number) => () => {
    onClick(id)
  }

  return (
    <div
      onClick={handleClick(id)}
      className={`relative px-2 rounded-md bg-amber-100 text-sm border border-amber-900 text-zinc-900 flex flex-col justify-evenly cursor-pointer ${className}`}
    >
      {children}
      <div className="absolute right-1.5 top-1.5 z-10 w-4 h-4 cursor-pointer" onClick={handleClose(id)}>
        <img src="icons/close.svg" alt="X" />
      </div>
    </div>
  )
})
