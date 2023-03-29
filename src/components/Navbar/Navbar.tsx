import { FC, memo } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Navbar: FC = memo(() => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <nav className={`${isHome ? 'hidden' : 'block'} absolute right-4 top-4 z-20`}>
      <Link to="/">
        <div className="bg-white hover:bg-slate-50 w-10 h-10 p-1 grid place-items-center rounded-full border shadow-lg">
          <img src="/icons/home.svg" alt="Home" />
        </div>
      </Link>
    </nav>
  )
})
