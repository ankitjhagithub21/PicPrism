import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Signup = () => {
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async(e) =>{
    e.preventDefault()

    if(isLoading) return;
  
    const formData = new FormData(e.target)
    const userData = Object.fromEntries(formData.entries())

    setIsLoading(true)
    const toastId = toast.loading("Processing your data...")
    try{
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/signup`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(userData)
      })
      const data = await res.json()

      if(data.success){
        toast.success(data.message)
        navigate("/login")
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
        <h2 className='mb-5 text-2xl'>Create an account !</h2>
        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" className="grow" placeholder="Enter username" name='username' required />
          </label>
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
            <input type="email" className="grow" placeholder="Your email" name='email' required />
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
            <input type="password" className="grow" placeholder='Your password' name='password' required />
          </label>
          <select className="select select-bordered w-full "  name='accountType'>
            <option disabled selected>Select Account Type</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
           
          </select>
          <button className={`btn btn-primary ${isLoading && "cursor-not-allowed"} `}>Sign Up</button>
        </form>
        <p className='mt-5'>Already have an account ? <Link to={"/login"} className='text-primary underline'>Login</Link> </p>
      </div>
    </section>
  )
}

export default Signup
