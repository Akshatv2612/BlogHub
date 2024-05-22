import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function AuthLayout({children, authRequired = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.isloggedIn)
    const user=useSelector(state=>state.userData)

    useEffect(() => {
        if(authRequired && authStatus !== authRequired){          //Required and you are not LoggedIn
            navigate("/login")
        } else if(!authRequired && authStatus !== authRequired){  //Not Required and you are LoggedIn
            console.log('navigate to Home')
            console.log(authStatus)
            console.log(authRequired)
            console.log(user)
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authRequired])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}