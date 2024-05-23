import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../slices/authSlice'
import authService from '../../appwrite/auth'
import LoadingMSG from '../spinners/LoaderMSG'

function LogoutBtn() {
    const dispatch = useDispatch()
    const [signingOut, setSigningOut] = useState(false)

    const handleLogout = () => {
        setSigningOut(true)
        authService.logout()
            .then(() => {
                dispatch(logOut())
                setSigningOut(false)
            })
            .catch((error)=>{
                console.log('Logout Error',error)
                setSigningOut(false)
            })
    }

    return (
        <button className='inline-bock px-6 py-2 duration-200 hover:bg-red-400 hover:text-black rounded-full'
            onClick={handleLogout}>
            {signingOut ? <LoadingMSG message='Signing Out' /> : null}
            Logout
        </button>
    )
}

export default LogoutBtn