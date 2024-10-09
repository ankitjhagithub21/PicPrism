import { useDispatch, useSelector } from "react-redux"
import { useEffect} from "react"
import { setUser } from "../redux/slices/authSlice"


const useFetchUser = () => {
    const {user} = useSelector(state=>state.auth)
    const dispatch = useDispatch()
  useEffect(()=>{

    const getUserFromServer = async() =>{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/user`,{
            credentials:'include'
        })
        const data = await res.json()
        if(data.success){
            dispatch(setUser(data.user))
        }else{
            dispatch(setUser(null))
        }
    }
   if(!user){
    getUserFromServer()
   }
  },[])
}

export default useFetchUser
