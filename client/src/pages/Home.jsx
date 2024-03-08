import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
  return (
    <div className=' bg-indigo-100' >
        <div className='flex flex-col gap-5 justify-center items-center w-full h-[695px]' >
            <h1 className='text-3xl font-bold shadow-sm p-2 mx-2' >Welcome To PayTmm</h1>
            <div className='' >
                <button onClick={()=>navigate('/signup')} className='border-2 p-2 bg-black text-white font-semibold rounded-md mr-4'>SignUp</button>
                
                <button onClick={()=>navigate('/signin')} className='border-2 p-2 bg-black text-white font-semibold rounded-md' >SignIn</button>
            </div>
        </div>
    </div>
  )
}

export default Home