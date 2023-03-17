import React, { useState } from 'react'
import {CiUser} from "react-icons/ci"
import logo_s from "./assets/logo_icon.png"
import {MdOutlinePalette} from "react-icons/md"
import { Avatar } from '@mui/material'
import { blue } from '@mui/material/colors'

function HeaderSection({selectedTab, tabSwitchEvent, tabs}) {
  return (
    <div className='h-[10%] flex py-4'>
        <div className='w-40 flex items-center gap-x-2 px-3 cursor-pointer' onClick={() => window.location.reload(false)}>
            <img
                src={logo_s}
                alt="logo"
                className={`cursor-pointer duration-600 h-8 w-8 ml-1`}
            />
            <div className={` w-24 flex flex-grow duration-200`}>
                <h1 className={`text-md text-skin-secondary`}>Developer</h1>
                <h1 className='text-md text-skin-accent font-bold whitespace-nowrap'>Assistant</h1>
            </div>
        </div>
        <div className='flex-1 flex justify-between'>
            <div className='flex-1 flex items-center gap-x-6 leading-none justify-center'>
                {tabs.map((tab) => (
                    <div className={`${selectedTab.tabID === tab.tabID ? "text-skin-accent border-skin-accent":"text-gray-400 border-transparent"} cursor-pointer border-b-2 py-1.5`} onClick={() => tabSwitchEvent(tab)}>{tab.tabName[0]}<p className='text-[8px] align-sub'>{tab.tabName[1]}</p></div>
                ))}
            </div>
            <div className='w-60 flex items-center justify-end gap-3 mr-4'>
                <div className='rounded-xl text-[10px] font-medium p-1 flex gap-2 items-center'><MdOutlinePalette className='h-5 w-5'/></div>
                {/* <div className='rounded-xl text-[10px] font-medium p-1 border flex gap-2 items-center'><CiUser className='h-5 w-5'/></div> */}
                <Avatar sx={{bgcolor: blue[500]}} alt="Abhishek Nair" src="data.jpeg" className='!w-7 !text-[12px] !h-7'/>
                {/* <div className='text-[12px] py-2 whitespace-nowrap font-semibold text-gray-800'>
                    <p>Good day! Abhishek</p>
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default HeaderSection