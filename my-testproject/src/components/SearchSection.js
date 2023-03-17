import React, { useState } from 'react'
import {CiGrid42, CiPaperplane, CiSearch} from "react-icons/ci"
import {BiCategoryAlt} from "react-icons/bi"
import FilterSection from './FilterSection'

function SearchSection({selectedTab, isMinimized, query, queryOnChange, onSearch, onSuggestionClick, clearSearch}) {
  return (
    <div className={`${isMinimized ? "h-[15%]":"h-[35%]"} flex-shrink-0 transform duration-150 ease-in-out relative bg-gray-50 rounded-xl justify-center flex flex-col overflow-clip gap-8 shadow-md`}>
        <CiGrid42 className='absolute -z-10 text-gray-100 h-60 w-60 rotate-[36deg] -left-14 -top-10'/>
        <CiPaperplane className='absolute -z-10 text-gray-100 h-60 w-60 rotate-[45deg] right-10 -bottom-16'/>
        {/* {!isMinimized &&
                    <div className='justify-center leading-none flex gap-2'>
                        <p className='text-[22px] font-semibold text-slate-700'>Find</p>
                        <p className='text-[22px] text-gra-400 underline underline-offset-8'>{selectedTab.tabLabel}</p>
                    </div>
                } */}
        <div className='justify-center flex items-center gap-4 relative'>
          <div className='flex border rounded-xl gap-2 px-2 items-center bg-white focus-within:border-skin-accent'>
            <CiSearch 
              onClick={() => onSearch(query)}
              className='hover:bg-opacity-75 w-8 h-8 rounded-xl text-skin-accent'
              />
            <input
            type="text" 
            value={query}  
            onChange = {(event) => queryOnChange(event.target.value)}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                onSearch(query)
              }
            }}  
            autoFocus
            className='outline-none p-3 px-1  w-[700px] text-sm' 
            placeholder='Type your query here ...'/>
            <CiPaperplane 
                    onClick={() => onSearch(query)}
                    className={`cursor-pointer hover:scale-110 text-skin-accent active:scale-95 w-8 h-7 transition duration-100`}
                    />
          </div>
        
            
            <div className='hidden outline-none p-3 w-40 flex justify-between items-center opacity-70 rounded-xl text-sm bg-white'>
                Category
                <BiCategoryAlt/>
            </div>
            {isMinimized && 
              <span 
              onClick={clearSearch}
              className='absolute right-5 text-[12px] cursor-pointer active:text-red-600 duration-75 active:scale-95 hover:underline underline-offset-2'
              >
                Clear Results
              </span>
            }
        </div>
        {!isMinimized &&
            <FilterSection selectedTab={selectedTab} onSuggestionClick={onSuggestionClick}/>
        }
    </div>
  )
}

export default SearchSection