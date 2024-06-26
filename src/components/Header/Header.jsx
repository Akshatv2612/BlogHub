import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Container from '../container/container'
import { Link } from 'react-router-dom'
import { Logo, LogoutBtn } from '../'

function Header() {
  const navigate = useNavigate()
  const isLoggedIn = useSelector(state => state.isloggedIn)

  const navItems = [
    {
      name: 'Home',
      path: '/',
      active: true
    },
    {
      name: 'All Posts',
      path: '/all-posts',
      active: isLoggedIn
    },
    {
      name: 'Add Post',
      path: '/add-post',
      active: isLoggedIn
    },
    {
      name:'Account',
      path:'/account',
      active: isLoggedIn
    },
    {
      name: 'Login',
      path: '/login',
      active: !isLoggedIn
    },
    {
      name: 'Sign Up',
      path: '/signup',
      active: !isLoggedIn
    },
  ]

  return (
    <header className='py-3 bg-gray-600 shadow rounded-sm'>
      <Container>
        <nav className='flex justify-between'>
          <div className='flex items-center'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex text-white gap-3'>
            {navItems.map((item) => item.active && (
              <li key={item.name}>
                <button onClick={() => { navigate(item.path) }} className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-full'>
                  {item.name}
                </button>
              </li>
            ))}

            {isLoggedIn && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header