"use client"

import React, { useState } from 'react'
import models from './components/models'
import axios from 'axios'
import 'js-cookie'
import Cookies from 'js-cookie'

const page = () => {
    const [superUserLoggedIn, setsuperUserLoggedIn] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const handleLogin = async () => {
        await axios.post("http://localhost:5001/user/superuser/", {
            superusername: username,
            supassword: password
        })
            .then((response) => {
                if (response.status === 200) {
                    alert(response.data.message)
                    setsuperUserLoggedIn(true)
                    Cookies.set("superUserStatus", true)
                }   
            })
    }

    const currentStatus = Cookies.get("superUserStatus")
    return (
    <div>    
        {
            (currentStatus) ? (
            <body className="bg-white">    
                <div className="container flex flex-col mx-auto bg-white">
                    <aside className="group/sidebar flex flex-col shrink-0 lg:w-[300px] w-[250px] transition-all duration-300 ease-in-out m-0 fixed z-40 inset-y-0 left-0 bg-white border-r border-r-dashed border-r-neutral-200 sidenav fixed-start loopple-fixed-start" id="sidenav-main">
                        
                    <div className="flex shrink-0 px-8 items-center justify-between h-[96px]">
                        <a className="transition-colors duration-200 ease-in-out" href="https://www.loopple.com">
                        <img alt="Logo" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/logos/loopple.svg" className="inline" />
                        </a>
                    </div>
        
                <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>
        
                <div className="flex items-center justify-between px-8 py-5">
                    <div className="flex items-center mr-5">
                    <div className="mr-5">
                        <div className="inline-block relative shrink-0 cursor-pointer rounded-[.95rem]">
                        <img className="w-[40px] h-[40px] shrink-0 inline-block rounded-[.95rem]" src="https://fastly.picsum.photos/id/96/4752/3168.jpg?hmac=KNXudB1q84CHl2opIFEY4ph12da5JD5GzKzH5SeuRVM" alt="avatar image" />
                        </div>
                    </div>
                    <div className="mr-2 ">
                        <a href="javascript:void(0)" className="dark:hover:text-primary hover:text-primary transition-colors duration-200 ease-in-out text-[1.075rem] font-medium dark:text-neutral-400/90 text-secondary-inverse">Abhedya Super User</a>
                        <span className="text-secondary-dark dark:text-stone-500 font-medium block text-[0.85rem]">Prodyogiki 2024</span>
                    </div>
                    </div>
                    <a className="inline-flex relative items-center group justify-end text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-[.95rem] transition-colors duration-150 ease-in-out text-dark bg-transparent shadow-none border-0" href="javascript:void(0)">
                    <span className="leading-none transition-colors duration-200 ease-in-out peer shrink-0 group-hover:text-primary text-secondary-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                    </span>
                    </a>
                </div>
        
                <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>
        
                <div className="relative pl-3 my-5 overflow-y-scroll">
                    <div className="flex flex-col w-full font-medium">
        
                    <div>
                        <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                        <a href="javascript:;" className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark">Sales</a>
                        </span>
                    </div>
        
        
                    <div>
                        <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                        <a href="javascript:;" className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark">Profile</a>
                        </span>
                    </div>
        
                    <div>
                        <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                        <a href="javascript:;" className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark">Settings</a>
                        </span>
                    </div>
        
                    <div className="block pt-5 pb-[.15rem]">
                        <div className="px-4 py-[.65rem]">
                        <span className="font-semibold text-[0.95rem] uppercase dark:text-neutral-500/80 text-secondary-dark">Applications</span>
                        </div>
                    </div>
        
                    <div>
                        <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                        <a href="javascript:;" className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark">Users</a>
                        </span>
                    </div>
        
        
                    <div>
                        <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                        <a href="javascript:;" className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark">Orders</a>
                        </span>
                    </div>
        
                    <div>
                        <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                        <a href="javascript:;" className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark">Track Order</a>
                        </span>
                    </div>
        
                    <div>
                        <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                        <a href="javascript:;" className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark">Products</a>
                        </span>
                    </div>
        
                    </div>
                    </div>
                </aside>
                </div>
                <div className="flex flex-wrap ml-9 my-5">
                    <models />
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
