import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  
  const onChange = (e) => setEmail(e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      navigate('/login')
      toast.success('Email was sent')
    } catch (error) {
      toast.error('Email does not exists', { autoClose: 5000 })
    }
  }

  return (
    <div className='pageContainer'>
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="emailInput"
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}
          />
          <Link className="forgotPasswordLink" to='/register'>Register</Link>
          <br />
          <Link className='forgotPasswordLink' to='/login'>Login</Link>
          <div className="loginBar">
            <div className="loginText">Send Reset Link</div>
            <button className="loginButton">
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
            
          </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword
