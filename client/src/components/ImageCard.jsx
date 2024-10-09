import { FaShoppingCart, FaHeart } from 'react-icons/fa'

const ImageCard = () => {
    return (
        <div className=' rounded-xl p-3 border'>
            <img src="https://images.unsplash.com/photo-1619995745882-f4128ac82ad6?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="title" className='rounded-lg w-full mb-2' />
            <span className='btn btn-sm rounded-full'>
                @ankit
            </span>
            <div className='flex px-2 mt-2  items-center justify-between'>
                <div>
                    <p className='font-semibold text-primary text-lg'>category</p>
                    <p>$20</p>
                </div>
                <div className='flex items-center gap-4'>
                    <FaShoppingCart size={20}/>
                    <FaHeart className='text-primary' size={20}/>
                </div>
            </div>
        </div>
    )
}

export default ImageCard
