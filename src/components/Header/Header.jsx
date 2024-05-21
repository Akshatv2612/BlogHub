import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Container from '../container/container'
import Logo from '../Logo'

function Header() {
  const navigate = useNavigate()
  const  isLoggedIn = useSelector((state) => state.isLoggedIn)

  const navItems=[
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
      name: 'Login',
      path: '/login',
      active: !isLoggedIn
    },
    {
      name: 'Sign Up',
      path: '/register',
      active: !isLoggedIn
    },
  ]

  return (
    <header className='py-3 bg-gray-500 shadow'>
      <Container>
        <nav>
          <div>
            <Link to='/'>
              <Logo width='100px' />
            </Link>
          </div>
          <ul className='flex'>
            {navItems.map((item) => item.active && (
              <li key={item.name}>
                <button onClick={()=>navigate(item.path)} className=''>
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