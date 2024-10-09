import { FaShoppingCart, FaHeart } from 'react-icons/fa'

const ImageCard = () => {
    return (
        <div className=' rounded-xl p-3 border'>
            <img src="/bg.avif" alt="title" className='rounded-lg w-full mb-2' />
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
