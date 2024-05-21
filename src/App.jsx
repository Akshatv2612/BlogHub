import './App.css'
import { useState, useEffect } from 'react'
import authService from './appwrite/auth'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, logOut } from './slices/authSlice'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from './components' 

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(logIn(user))
        }
        else {
          dispatch(logOut())
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between p-1 bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default App
