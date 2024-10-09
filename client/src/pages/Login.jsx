import {useNavigate,Link} from 'react-router-dom'
import {useState} from 'react'
import {toast} from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/slices/authSlice'


const Login = () => {
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
 
  const handleSubmit = async(e) =>{
    e.preventDefault()
  
    const formData = new FormData(e.target)
    const userData = Object.fromEntries(formData.entries())

    setIsLoading(true)
    const toastId = toast.loading("Processing your data...")
    try{
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:'include',
        body:JSON.stringify(userData)
      })
      const data = await res.json()

      if(data.success){
        toast.success(data.message)
        dispatch(setUser(data.loggedInUser))
        navigate(`/${data.loggedInUser.accountType}/dashboard`)
      }else{
        toast.error(data.error)
      }
    }catch(error){
      toast.error(data.error)
      console.log(error)
    }finally{
      toast.dismiss(toastId)
      setIsLoading(false)
      
    }

  }

  return (
    <section>
      <div className='max-w-lg w-full mx-auto my-24 px-5'>
        <h2 className='text-2xl mb-5'>Welcome Back !</h2>
       
        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
       
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="email" className="grow" name='email' placeholder="Your email" required/>
          </label>
        
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd" />
            </svg>
            <input type="password" name='password' className="grow" placeholder='Your password' required/>
          </label>
          <button className={`btn btn-primary`} disabled={isLoading}>Login</button>
        </form>
        <p className='my-5'>Don't have an account ? <Link to={"/signup"} className='text-primary underline'>Signup</Link> </p>

        
      </div>
    </section>
  )
}

export default Login
