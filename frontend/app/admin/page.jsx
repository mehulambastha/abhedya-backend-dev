"use client"

import React, { useState, useEffect } from 'react'
import Model from './components/Model'
import axios from 'axios'
import 'js-cookie'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

const page = () => {
    const [superUserLoggedIn, setsuperUserLoggedIn] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [currentMenuItem, setCurrentMenuItem] = useState('users')
    const router = useRouter()

    const handleLogin = async () => {
        await axios.post("http://localhost:5001/user/superuser/login/", {
            superusername: username,
            supassword: password
        })
            .then((response) => {
                if (response.status === 200) {
                    alert("logged in!")
                    Cookies.set("token", response.data)
                }   
            })
            .finally(() => {
                setsuperUserLoggedIn(true)
                Cookies.set("superUserStatus", true)
            })
    }

    useEffect(() => {
        setsuperUserLoggedIn(Cookies.get("superUserStatus"))
    }, []);
    return (
    <div>    
        {
            (superUserLoggedIn) ? (
            <body className="bg-blue-200 min-h-screen min-w-screen flex flex-row gap-4 p-4"> 

                {/* sidebar */}
                <div className='self-start flex rounded-3xl flex-col items-center min-h-screen w-96 bg-gray-200 text-black'>
                    <div className='bg-blue-200 flex flex-row justify-between items-center self-start mx-auto p-4 my-8 text-black py-5 rounded-xl w-11/12'>
                        <span>Abhedya admin panel</span>
                        <button 
                            className='bg-red-300 p-3 border-black rounded-xl' 
                            onClick={() => {
                                Cookies.remove("token")
                                Cookies.set("superUserStatus", false)
                                setsuperUserLoggedIn(false)
                            }
                        }>
                            Log out
                        </button>
                    </div>
                    <ul className='bg-blue-200 w-11/12 p-8 rounded-xl flex flex-col gap-10'>
                        <li className={
                            currentMenuItem == 'users' ? 
                            'cursor-pointer w-11/12 p-4 rounded-xl border-dotted border-2 border-black' : 
                            'cursor-pointer w-11/12 p-4 rounded-xl'
                            }  
                            onClick={(e) => setCurrentMenuItem('users')}
                        >
                            Users
                        </li>
                        <li className={
                            currentMenuItem === 'levels' ? 
                            'cursor-pointer w-11/12 p-4 rounded-xl border-dotted border-2 border-black' : 'cursor-pointer w-11/12 p-4 rounded-xl'
                            } 
                            onClick={(e) => setCurrentMenuItem('levels')}
                        >
                            Levels
                        </li>
                        <li className={
                            currentMenuItem === 'leaderboard' ? 
                            'cursor-pointer w-11/12 p-4 rounded-xl border-dotted border-2 border-black' : 
                            'cursor-pointer w-11/12 p-4 rounded-xl'} 
                            onClick={(e) => setCurrentMenuItem('leaderboard')}
                        >
                            Leaderboard
                        </li>
                        <li className='cursor-pointer w-11/12 p-4 rounded-xl bg-green-300' onClick={(e) => router.push("../play")}>Go to game screen</li>
                    </ul>
                </div>

                {/* main component */}
                <div className='w-full rounded-3xl bg-gray-200 flex items-start py-8 justify-center'>
                    {
                        (()=>{
                            switch (currentMenuItem) {
                                case 'users':
                                    return (
                                        <Model dataType="users" />
                                    )
                                case 'levels':
                                    return (
                                        <Model dataType="levels" />
                                    )
                                case 'leaderboard':
                                    return (
                                        <Model dataType="leaderboard" />
                                    )
                            }
                        })()
                    }
                </div>
            </body>
            )
            :
            (
                <div className='min-w-screen min-h-screen flex items-center justify-center flex-row bg-blue-300'>
                    <div className='flex min-h-64 p-12 flex-col items-center justify-center gap-4 rounded-2xl bg-gray-100 text-black'> 
                        <h1 className='text-2xl'>Abhedya Admin Panel</h1>
                        <div className=''>
                            <label className='text-md text-gray-600 block' htmlFor='username'>Username</label>
                            <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder='username' name='username' className='my-1 rounded-sm p-2 bg-gray-200 text-black'/>

                            <label className='text-md text-gray-600 block' htmlFor='password'>Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='password' name='username' className='my-1 p-2 rounded-sm bg-gray-200 text-black'/>   

                        </div>
                            <button onClick={handleLogin} className='rounded-lg w-full py-2 text-white m-4 block bg-blue-700 active:scale-105 duration-100' >
                                Login    
                            </button>                     
                    </div>
                </div>
            )
        }
    </div>
    )
}

export default page
