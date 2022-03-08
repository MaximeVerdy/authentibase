import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase-config'

import { UserContext } from '../context/userContext'

export default function NavBar() {

     const { toggleModals } = useContext(UserContext)

     const navigate = useNavigate()

     const logOut = async () => {
          try {
               await signOut(auth)
               navigate('/')
          } catch {
               alert("can't deconnect, sorry")

          }
     }

     return (
          <nav className='navbar navbar-light bg-light px-4' >
               <Link to='/' className='navbar-brand'>
                    authentiBase
               </Link>

               <div>
                    <button className='btn btn-primary'
                         onClick={() => toggleModals("signUp")}
                    >
                         Sign Up
                    </button>
                    <button className='btn btn-primary ms-2'
                         onClick={() => toggleModals("signIn")}
                    >
                         Sign In
                    </button>
                    <button className='btn btn-danger ms-2'
                         onClick={logOut}
                    >
                         Log Out
                    </button>
               </div>

          </nav>



     )
}
