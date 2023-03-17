import React from 'react'
import {CiRedo, CiSearch} from "react-icons/ci"
import {BsChevronDown} from "react-icons/bs"

function FilterSection({selectedTab, onSuggestionClick}) {
  console.log(selectedTab)
  return (
    <div className='h-[10%] justify-around flex flex-col px-5 items-center'>
          <div className='text-skin-secondary text-[12px] font-semibold text-opacity-25 pb-2'>Here are a few questions you can search for.</div>
          <div className='flex items-center gap-4'>
            {selectedTab.questions.map((question) => (
              <div 
              className='outline-none cursor-pointer hover:border-skin-accent hover:text-skin-accent transform duration-150 active:scale-95 hover:scale-105 px-4 p-2 flex justify-between items-center opacity-80 rounded-xl bg-skin-primary text-sm border'
              onClick={() => onSuggestionClick(question)}
              >
                {/* Category
                <CiSearch/> */}
                {question}
              </div>
            ))}
            
            {/* <div className='px-4 flex justify-between items-center opacity-80 text-sm rounded-xl bg-skin-primary h-10 w-40'>
              used for
              <BsChevronDown/>
            </div>
            <div className='px-4 flex justify-between items-center opacity-80 text-sm rounded-xl bg-skin-primary h-10 w-40'>
              Technology
              <BsChevronDown/>
            </div>
            <CiRedo className='rounded-xl bg-skin-primary h-9 w-9 p-2'/> */}
          </div>
          {/* <div className='text-gray-800 underline underline-offset-4 text-sm'>Clear all</div> */}
        </div>
  )
}

export default FilterSection