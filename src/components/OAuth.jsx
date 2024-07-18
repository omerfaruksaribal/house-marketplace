import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { setDoc, doc, getDoc, serverTimestamp } from 'firebase/firestore'
import db from '../firebase.config'
import { toast } from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

function OAuth() {
    const navigate = useNavigate()
    const location = useLocation()

    const onGoogleClick =  async () => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            // Check for user
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)

            // If user, does not exists create user
            if (!docSnap.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
                toast.success('Successfully created account with Google')
            } else {
                toast.success('Successfully logged in with Google')
            }

            navigate('/')


        } catch (error) {
            toast.error('Could not authorize with Google', { autoClose: 5000 })
        }

    }

  return (
    <div className='socialLogin'>
        <p>{location.pathname === '/login' ? 'Login' : 'Register'} with</p>
        <button className='socialIconDiv' onClick={onGoogleClick}>
            <img className='socialIconImg' src={googleIcon} alt="google " />
        </button>
    </div>
  )
}

export default OAuth