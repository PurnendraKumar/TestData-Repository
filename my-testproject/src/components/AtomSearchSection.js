import React, { useState } from 'react'
import {BsCode} from "react-icons/bs"
import {TbApi} from "react-icons/tb"
import {AiOutlineDeploymentUnit} from "react-icons/ai"
import {FaDocker} from "react-icons/fa"
import GenerativeTextBox from './GenerativeTextBox'
import { Oval, ThreeDots } from 'react-loading-icons'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { apiHeaders, search_ai_atom_search } from '../utilities/api'
import { Bounce, toast } from 'react-toastify'
const AtomSearchSection = (props) => {
    const [searchAI, setSearchAI] = useState(false)
    const [chatResponse, setChatResponse] = useState('');
    const [chatResponseLoading, setChatResponseLoading] = useState(false);

    const copyClick = () => {
      toast.success(`Copied to clipboard!`, {theme: "colored", className:"", transition: Bounce, hideProgressBar:true, position: toast.POSITION.TOP_RIGHT})
    }

    const generateChat = () => {
        //function to fetch data from api and generate code
        if (props.searchQuery.length!==0) {
            setChatResponseLoading(true)
          fetch(search_ai_atom_search, {
            method:"POST", headers: apiHeaders,
            body: JSON.stringify({query : props.searchQuery})
          }).then((response) => {
              if (response.ok) { return response.json(); }
          })
          .then((json) => {
              if (json.status === 'success') {
                setChatResponse(json.ai_response.chat_response)
                setChatResponseLoading(false)
              }
          })
          .catch((error) => {
              console.log(error);
          });
        }
    
      }

    return (
        <div className={`h-auto flex flex-1 justify-around gap-3  transform duration-150 ease-in-out relative my-6`}>
            {props.searchResults.length > 0 && (
                <>
                    <div id="results_section" className='w-[75%] flex-initial h-full overflow-scroll relative gap-y-2 flex flex-col scrollbar-hide'>
                        {props.searchResults.map((result) => (
                                <div className='w-full border rounded-xl p-2 px-46'>
                                    <div className='flex justify-between relative overflow-scroll pb-4 border-b scrollbar-hide'>
                                      <div className='w-[44%] text-sm font-semibold leading-tight text-skin-accent truncate'> 
                                          {result.bot_name}
                                          <span className='text-[8px] text-skin-secondary ml-1  truncate'>#{result.bot_id}</span>
                                          <span className=' flex gap-2 items-end'>
                                            <p className='text-[9px] text-skin-secondary font-medium underline underline-offset-2'>Created by {result.author}</p>
                                            <p className='text-[9px] text-green-600 font-semibold'>{result.status}</p>
                                          </span>
                                      </div>
                                      <div className='w-[20%] leading-none truncate'>
                                        <p className='text-[8px]'>Category</p>
                                        <p className='text-xs font-semibold'>{result.category}</p>
                                      </div>
                                      <div className='w-[20%] leading-none truncate'>
                                        <p className='text-[8px]'>Sub Category</p>
                                        <p className='text-xs font-semibold'>{result.sub_category}</p>
                                      </div>
                                      <div className='w-[16%] flex justify-end items-center ml-auto gap-2'>
                                        <a className='cursor-pointer' title='Source Code' href={result.url} target="_blank">
                                          <BsCode className='p-1 rounded-full h-6 w-6 border text-skin-accent shadow-sm'/>
                                        </a>
                                        <a className='cursor-pointer' title='API docs' href={result.api_docs} target="_blank">
                                          <TbApi className='p-1 rounded-full h-6 w-6 border text-skin-accent shadow-sm'/>
                                        </a>
                                        <a className='cursor-pointer' title='Deployment code' href={result.deployment_code} target="_blank">
                                          <AiOutlineDeploymentUnit className='p-1 rounded-full h-6 w-6 border text-skin-accent shadow-sm'/>
                                        </a>
                                        <CopyToClipboard text={result.docker_image}>
                                          <button 
                                          className='group hover:w-20 gap-2 hover:border-skin-accent active:bg-skin-backdrop transform duration-150 ease-in-out cursor-pointer p-1 hover:px-2 rounded-full h-6 w-6 border text-skin-accent shadow-sm flex items-center' title={result.docker_image}
                                          onClick={() => copyClick()}
                                          >
                                            <FaDocker className=''/>
                                            <p className=' text-xs group-hover:block hidden transform duration-100 ease-in-out'>Copy</p>
                                          </button>
                                        </CopyToClipboard>
                                      </div>
                                  </div>
                                  <div className='flex flex-col justify-between relative overflow-scroll py-3 opacity-80 scrollbar-hide'>
                                    <p className='text-xs mb-1 truncate text-[10px] ' title={result.bot_summary}><span className='font-semibold'>Bot Summary :</span> {result.bot_summary}</p>
                                    <p className='text-xs mb-1 truncate text-[10px] ' title={result.how_to_use}><span className='font-semibold'>How to use :</span> {result.how_to_use}</p>
                                    <p className='text-xs truncate text-[10px] ' title={result.how_to_extend_and_customize}><span className='font-semibold'>How to extend and customize :</span> {result.how_to_extend_and_customize}</p>
                                  </div>
                                </div>
                            )
                          )}
                    </div>
                    <div id="results_section" className='w-[25%] h-full'>
                        {!chatResponseLoading ? (
                        chatResponse.length!==0 ? (<GenerativeTextBox ai_response={chatResponse}/>):(<button onClick={() => generateChat()} className='text-sm mb-3 font-normal leading-6 border shadow-inner p-4 rounded-xl'>👋🏻Hello I am your Chat Assistant, <br/>Click here! to get an <u>AI generated response</u> for your query "<b>{props.searchQuery}</b>"</button>)
                        ):(
                            <ThreeDots className='stroke-skin-accent m-auto mt-20 h-20 w-20' />
                        )}
                    </div>
                    {/* {!props.chatLoading ? (
                        <div id="results_section" className='w-[30%] px-6 h-full'>
                            <GenerativeTextBox ai_response={props.chatResponse}/>
                        </div>
                    ):(
                        <div id="search_section" className='h-full w-[30%]'>
                        <ThreeDots className='stroke-skin-accent m-auto mt-20 h-20 w-20' />
                        </div>
                    )} */}
                </>
            )}
            {props.dataEmpty && (
           <div className='w-full border h-15 bg-gray-100 rounded-lg p-2 text-center items-center'>
                    <p className='text-lg font-semibold'>No data available...!</p>
                </div>
            )}
        </div>
    )
}

export default AtomSearchSection