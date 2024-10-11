import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { setUser } from '../redux/slices/authSlice'
import { toast } from 'react-toastify'

const Navbar = () => {
    const { user } = useSelector(state => state.auth)
    const dispath = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`, {
                credentials: 'include'
            })
            const data = await res.json()
            if (data.success) {
                dispath(setUser(null))
                navigate("/")
            } else {
                toast.error(error.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    if(location.pathname.includes("seller") || location.pathname.includes("buyer") ){
        return null
    }
    return (

        <nav className='fixed top-0 w-full'>
            <div className="navbar bg-[#171212] container border-b mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li ><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li ><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <Link to={"/"} className=" text-2xl font-bold">Pic <span className='text-primary'>Prism</span> </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li ><Link to="/">Home</Link></li>
                        <li ><Link to="/about">About</Link></li>
                        <li ><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <button onClick={handleLogout} className=" btn btn-warning">Logout</button> : <Link to={"/login"} className=" btn btn-primary">Login</Link>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
