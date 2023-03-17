import React, { useState, useEffect } from "react";
import { BiExpandAlt } from 'react-icons/bi';
import { IoCopyOutline } from 'react-icons/io5';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CodeEditor from '@uiw/react-textarea-code-editor';

import data from './data.json';
import GenerativeTextBox from "./GenerativeTextBox";
import { apiHeaders, generate_code_external } from "../utilities/api";
import { ThreeDots } from "react-loading-icons";
import { Bounce, toast } from "react-toastify";

function CodeSearchSection({searchQuery,searchResults}) {
  const [codeHeight11, setCodeHeight11] = useState("96");
  const [codeHeight, setCodeHeight] = useState("220px");
  const [buttonText, setButtonText] = useState("Expand");
  /* const [dataJson, setDataJson] = useState(data.result); */
 const [dataJson, setDataJson] = useState([]);
  const [codeResponse, setCodeResponse] = useState('');
  const [codeResponseLoading, setCodeResponseLoading] = useState(false);

  const copyClick = () => {
    toast.success(`Copied to clipboard!`, {theme: "colored", className:"", transition: Bounce, hideProgressBar:true, position: toast.POSITION.TOP_RIGHT})
  }

  const handleClick = (e, rowno) => {
    e.preventDefault();
   
    if (e.target.innerText == 'Expand') {
      const a = [...searchResults];
      var index = a.findIndex(i => i.rowno === rowno);
      a[index].codeHeight = "100%";
      a[index].buttonText = "Show Less";
     // searchResults=a;     
      setDataJson(a);
    }
    else {
      const a = [...searchResults];
      var index = a.findIndex(i => i.rowno === rowno);
      a[index].codeHeight = "200px";
      a[index].buttonText = "Expand";
     // searchResults=a;
      setDataJson(a);
    }
  }

  const generateCode = () => {
    //function to fetch data from api and generate code
    if (searchQuery.length!==0) {
      setCodeResponseLoading(true)
      fetch(generate_code_external, {
        method:"POST", headers: apiHeaders,
        body: JSON.stringify({query : searchQuery})
      }).then((response) => {
          if (response.ok) { return response.json(); }
      })
      .then((json) => {
          if (json.status === 'success') {
              setCodeResponse(json.ai_response.code_response)
              setCodeResponseLoading(false)
          }
      })
      .catch((error) => {
          console.log(error);
      });
    }

  }
  
  return (
    
    <div className={`h-auto flex flex-1 overflow-scroll justify-around gap-1 transform duration-150 ease-in-out relative my-6`}>
         <div id="results_section" className='w-[90%] relative grid gap-y-2 grid-cols-1'>
        {searchResults.map((result, i) => {
          return (
            <div className="border bg-white-100 rounded-lg p-4 px-6 flex flex-col gap-4 transform ease-in-out duration-150">
              <div className="flex items-center justify-between relative overflow-scroll scrollbar-hide">
                  <div className='w-[60%] leading-none truncate'>
                    <p className='text-[8px]'>Description</p>
                    <p className='text-xs font-semibold'>{result.name}</p>
                  </div>
                  <div className='w-[20%] leading-none truncate'>
                    <p className='text-[8px]'>Language</p>
                    <p className='text-xs font-semibold'>{result.lang}</p>
                  </div>
                  <div className='w-[20%] flex justify-end items-center gap-2 text-skin-accent'>
                    <CopyToClipboard text={result.code}>
                        <button 
                        className="hover:bg-skin-backdrop rounded-md text-[10px] px-2 p-1 border border-skin-accent flex gap-2 items-center"
                        onClick={copyClick}
                        >
                          <IoCopyOutline className="h-4 w-4"/>
                          <span>Copy</span>
                        </button>
                    </CopyToClipboard>
                    <button onClick={(event) => handleClick(event, result.rowno)} className="hover:bg-skin-backdrop rounded-md text-[10px] px-2 p-1 border border-skin-accent flex gap-2 items-center">
                        <BiExpandAlt className="h-4 w-4"/>
                        <span>{result.buttonText}</span>
                    </button>
                  </div>
              </div>
              <div>
                <div data-color-mode="dark">
                <CodeEditor language="java"
                      value={result.code}
                      style={{
                       /*  background: "#333",
                            color: "#fff", */
                       /*  background: "#f3f5f7", */
                        borderRadius: "7px",
                        height: result.codeHeight,
                        overflow: "scroll",
                        fontFamily:                     
                          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                        fontSize: 12
                      }}
                      className="transform duration-150 ease-in-out"
                >
                </CodeEditor>
              </div></div>
            </div>
          )

        })}
      </div>
      {/* <div id="results_section" className='w-[30%] px-6 h-full'>
        <button onClick={() => generateCode()} className='text-sm mb-3 font-normal leading-6 border shadow-inner p-4 rounded-xl'>👋🏻 Click here! to <u>generate code</u> for the prompt "<b>{searchQuery}</b>"<p className="text-violet-600 font-semibold">from External API.</p> </button>
        {!codeResponseLoading ? (
          codeResponse.length!==0 && <GenerativeTextBox ai_response={codeResponse}/>
        ):(
            <ThreeDots className='stroke-skin-accent m-auto mt-20 h-20 w-20' />
        )}
      </div> */}
    </div>
  )
}

export default CodeSearchSection