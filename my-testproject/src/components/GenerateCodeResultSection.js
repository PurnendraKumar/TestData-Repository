import React, { useEffect, useState } from 'react'
import {GoThumbsup, GoThumbsdown} from "react-icons/go"
import GenerativeTextBox from './GenerativeTextBox'
import CodeEditor from '@uiw/react-textarea-code-editor';
import CopyToClipboard from 'react-copy-to-clipboard';
import { IoCopyOutline } from 'react-icons/io5';
import { Bounce, toast } from 'react-toastify';


function GenerateCodeResultSection({searchQuery, codeGenResults, animate}) {
  const [text, setText] = useState("")
  const [fullText, setFullText] = useState(codeGenResults)
  const [index, setIndex] = useState(0)
  const copyClick = () => {
    toast.success(`Copied to clipboard!`, {theme: "colored", className:"", transition: Bounce, hideProgressBar:true, position: toast.POSITION.TOP_RIGHT})
  }
  useEffect(() => {
      if (index < fullText.length) {
        setTimeout(() => {
          setText(text + fullText[index])
          setIndex(index + 1)
        }, 5)
      }
    }, [index])
  return (
    <div className={`h-auto flex flex-1 justify-start gap-2 transform duration-150 ease-in-out px-20 relative my-6`}>
      {/* <div className='stroke-skin-accent m-auto h-60 text-sm text-skin-secondary mt-20'>
          <BsCodeSlash className='opacity-50 h-10 w-10 m-auto mb-6'/>
          <p>Code Generation is still under development..</p>
      </div>. */}
        <div data-color-mode="dark" className="w-full p-2 overflow-scroll flex-col flex gap-2" >
        <div className='flex justify-end items-center gap-5 text-skin-accent'>
            <p className='text-[10px] font-semibold'>Please do give us a feedback to improve our search results over time!</p>
            <GoThumbsup className='hover:scale-150 active:text-black duration-100 cursor-pointer active:scale-95 text-green-600'/>
            <GoThumbsdown className='hover:scale-150 active:text-black duration-100 cursor-pointer active:scale-95 text-red-600'/>
            <CopyToClipboard text={fullText}>
                <button 
                className="hover:text-skin-primary hover:bg-skin-accent active:scale-95 transform duration-100 ease-in-out rounded-md text-[10px] px-2 p-1 border border-skin-accent flex gap-2 items-center"
                onClick={copyClick}
                >
                  <IoCopyOutline className="h-4 w-4"/>
                  <span className=''>Copy</span>
                </button>
            </CopyToClipboard>
            
          </div>
          <CodeEditor language="java"
            value={text}
            style={{
              // background: "#f3f5f7",
              borderRadius: "7px",
              // height: "550px",
              overflow: "scroll",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              fontSize: 12
            }}
            className='max-h-96 overflow-scroll'
          >
          </CodeEditor>
      </div>
    </div>
  )
}

export default GenerateCodeResultSection