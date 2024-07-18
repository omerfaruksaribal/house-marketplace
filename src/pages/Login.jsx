import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {email, password} = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()
  
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
  
      if (userCredential.user) {
        toast.success('Successfully Logged In!')
        navigate('/')
      }
    } catch (error) {
      toast.error('Coult not logged in. Please enter valid informations', { autoClose: 5000 })
    }

  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">
            Welcome to the Login Page!
          </p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type="email"
              className='emailInput'
              placeholder='Email'
              id='email'
              value={email}
              onChange={onChange}
            />
            <div className="passwordInputDiv">
              <input
                type={showPassword ? 'text' : 'password'}
                className='passwordInput'
                placeholder='Password'
                id='password'
                value={password}
                onChange={onChange}
              />
              <img
                src={visibilityIcon}
                alt="Show Password"
                className="showPassword"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>
            <Link to='/forgot-password' className='forgotPasswordLink'>Forgot Password</Link>
            <div className="loginBar">
              <p className="loginText">Login</p>
              <button className="loginButton">
                <ArrowRightIcon fill='#ffffff' width='34px' height='34px'/>
              </button>
            </div>
          </form>

          <OAuth />

          <Link to='/register' className='registerLink'>Register Instead</Link>
        </main>
      </div>
    
    
    </>
  )
}

export default Login