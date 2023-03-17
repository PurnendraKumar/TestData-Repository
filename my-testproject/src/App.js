import { useEffect, useState } from 'react';
import './App.css';
import { CiGrid42, CiPaperplane, CiRedo, CiSearch, CiUser } from "react-icons/ci"
import { ThreeDots } from 'react-loading-icons'
import { VscNewFile, VscRepoForked } from "react-icons/vsc"
import HeaderSection from './components/HeaderSection';
import SearchSection from './components/SearchSection';
import FilterSection from './components/FilterSection';
import AtomSearchSection from './components/AtomSearchSection';
import CodeSearchSection from './components/CodeSearchSection';
import GenerateCodeResultSection from './components/GenerateCodeResultSection';
import { generate_code_external, search_ai_atom_search, search_atom_search, search_snippets } from './utilities/api';
import { BsCodeSlash } from 'react-icons/bs';
import { AiOutlineSnippets } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ZGFfdXNlcjpsdUVZa0MqSko5SDhaandLcE5rWFdTQDhXUw==',
}

function App() {
    const [searchType, setSearchType] = useState({ tabID: "codeRepos", tabName: ["Source Code Repos", ""], tabLabel: "Code Repositories", questions:["Share the api docs for email notification service", "Implementations on smart cooking platform", "Augmented Reality in health care"]})
    const tabs = [
        { tabID: "codeRepos", tabName: ["Source Code Repos", ""], tabLabel: "Code Repositories" , questions:["Share the api docs for email notification service", "Implementations on smart cooking platform", "Augmented Reality in health care"]},
        { tabID: "codeSnips", tabName: ["Code Snippets", ""], tabLabel: "Code Snippets",questions:["Java program to Create Pdf using iText","Java program to Read Excel using Apache XSSF","Java program to compress file into Zip file"] },
        { tabID: "codeGen", tabName: ["Generate Code", ""], tabLabel: "Generative Code", questions:["code for encryption in Python using AES 256", "Code for JWT validation in Go", "Code for JSON parsing in Java"] },
    ]
    const [searchQuery, setSearchQuery] = useState("");
    const [snippetSearchResults, setSnippetSearchResults] = useState([])
    const [isSearchMinimized, setSearchMinimize] = useState(false)
    const [isLoading, setLoading] = useState(false);
    const [atomSearchResults, setAtomSearchResults] = useState([])
    const [codeGenResults, setCodeGenResults] = useState([])
    const [chatResponse, setChatResponse] = useState('');
    const [chatResponseLoading, setChatResponseLoading] = useState(false);

    useEffect(() => {
        if (searchType.tabID === "codeRepos") {
            if (atomSearchResults.length > 0) {
                setSearchMinimize(true)
            }
            else {
                setSearchMinimize(false)
            }
        }
        else if  (searchType.tabID === "codeSnips") {
            if (snippetSearchResults.length > 0) {
                setSearchMinimize(true)
            }
            else {
                setSearchMinimize(false)
            }
        }
        else if (searchType.tabID === "codeGen") {
            if (codeGenResults.length > 0) {
                setSearchMinimize(true)
            }
            else {
                setSearchMinimize(false)
            }
        }
    }, [searchType])

    const atomSearch = (query) => {
        setLoading(true)
        setSearchMinimize(true)
        fetch(search_atom_search, {
            method: "POST", headers: apiHeaders,
            body: JSON.stringify({ query: query })
        }).then((response) => {
            if (response.ok) { return response.json(); }
        })
            .then((json) => {
                if (json.status === 'success') {
                    setLoading(false)
                    if (json.ai_response.search_results.length > 0) {
                        setAtomSearchResults(json.ai_response.search_results)
                    } else {
                        setSearchMinimize(false)

                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });

        // setChatResponseLoading(true)
        // fetch(search_ai_atom_search, {
        //     method:"POST", headers: apiHeaders,
        //     body: JSON.stringify({query : query})
        // }).then((response) => {
        //     if (response.ok) { return response.json(); }
        // })
        // .then((json) => {
        //     if (json.status === 'success') {
        //         setChatResponse(json.ai_response.chat_response)
        //         setChatResponseLoading(false)
        //     }
        // })
        // .catch((error) => {
        //     console.log(error);
        // });

        // setAtomSearchResults(searchData)
        console.log("search function for code repo search")
    }

    const snippetSearch = (query) => {
        setLoading(true)
        setSearchMinimize(true)
        fetch(search_snippets, {
            method: "POST", headers: apiHeaders,
            body: JSON.stringify({ query: query })
        }).then((response) => {
            if (response.ok) { return response.json(); }
        })
            .then((json) => {
                if (json.status === 'success') {
                    setLoading(false)
                    let rowsData = [];
                    if (json.ai_response.search_results.length > 0) {
                        json.ai_response.search_results.map((i, index) => {

                            rowsData.push({ rowno: index, code: i["code"], name: i["name"], lang: i["lang"], codeHeight: "200px", buttonText: "Expand", nooflines: "20" });
                            console.log("changed", rowsData);
                        })
                    }
                    setSnippetSearchResults(rowsData)
                } 
            }
            )
            .catch((error) => {
                console.log(error);
            });
       /*  console.log("search function for code snippet search") */
    }

    const generateCode = (query) => {
        setLoading(true)
        setSearchMinimize(true)
        fetch(generate_code_external, {
            method:"POST", headers: apiHeaders,
            body: JSON.stringify({query : query})
        }).then((response) => {
            if (response.ok) { return response.json(); }
        })
        .then((json) => {
            if (json.status === 'success') {
                setLoading(false)
                setCodeGenResults(json.ai_response.code_response)
            }
        })
        .catch((error) => {
            console.log(error);
        });
        console.log("search function for code repo search")
    }

    const suggestionClickEvent = (query) => {
        setSearchQuery(query)
        onSearchEvent(query)
    }

    const onSearchEvent = (query) => {
        console.log(`'${searchQuery}' query submitted for search in ${searchType.tabID}`)
        if (searchType.tabID === "codeRepos") {
            atomSearch(query)
        }
        else if (searchType.tabID === "codeSnips") {
            snippetSearch(query)
        }
        else {
            generateCode(query)
        }
    }

    const clearSearch = () => {
        // setSearchQuery('')
        setSearchMinimize(false)
        if (searchType.tabID === "codeRepos") {
            setAtomSearchResults([])
        }
        else if (searchType.tabID === "codeSnips") {
            setSnippetSearchResults([])
        }
        else {
            setCodeGenResults([])
        }
    }

    return (
        <div className="h-screen w-full px-4 text-skin-secondary theme-light-blue">
            <HeaderSection selectedTab={searchType} tabSwitchEvent={setSearchType} tabs={tabs} />
            <div className='h-[90%] relative flex flex-col'>
                <SearchSection selectedTab={searchType} isMinimized={isSearchMinimized} query={searchQuery} queryOnChange={setSearchQuery} onSearch={onSearchEvent} onSuggestionClick={suggestionClickEvent} clearSearch={clearSearch}/>
                {/* <FilterSection /> */}
                {searchType.tabID === "codeRepos" &&
                    (!isLoading ?
                        (
                            atomSearchResults.length !== 0 ?
                                (
                                    <AtomSearchSection chatLoading={chatResponseLoading} searchQuery={searchQuery} searchResults={atomSearchResults} chatResponse={chatResponse} />
                                )
                                :
                                (
                                    <div className='stroke-skin-accent m-auto h-60 text-[12px] text-skin-secondary mt-10'>
                                        <VscRepoForked className='opacity-40 h-20 w-20 m-auto mb-6' />
                                        <p className=' text-center max-w-[550px]'>I am Atos Developer Assistant, a bot designed to help you in your development journey. <br />With me, you can quickly find the code you need from Atos repositories and even generate new code using external APIs.</p>
                                        <div className='mt-6'>
                                            <ul>
                                                <li className='flex gap-3 text-skin-accent justify-center items-center'>use the <CiSearch className='h-4 w-4' /> bar to search for code repositories.</li>
                                                <li className='flex gap-3 text-[10px] my-1.5 justify-center items-center'>(or)</li>
                                                <li className='flex gap-3 text-skin-accent justify-center items-center'>Switch to Code Snippet section to Find useful code snippets.</li>
                                            </ul>
                                        </div>
                                    </div>
                                )
                        )
                        :
                        (
                            <ThreeDots className='stroke-skin-accent m-auto mt-10 h-40' />
                        )
                    )
                }
                {searchType.tabID === "codeGen" &&
                  (!isLoading ? 
                    (
                        codeGenResults.length!==0 ? 
                        (
                          <GenerateCodeResultSection searchQuery={searchQuery} codeGenResults={codeGenResults}/>
                        )
                        :
                        (
                            <div className='stroke-skin-accent m-auto h-60 text-[12px] text-skin-secondary mt-10'>
                                <BsCodeSlash className='opacity-40 h-20 w-20 m-auto mb-6'/>
                                <p className=' text-center max-w-[550px]'>Code Gen connects to external api's to generate relevant code, <br/>Please validate the code generated through this platform before use, since this service is still in beta.</p>
                                <div className='mt-6'>
                                <ul>
                                    <li className='flex gap-3 text-skin-accent justify-center items-center'>use the <CiSearch className='h-4 w-4'/> bar to generate code.</li>
                                    <li className='flex gap-3 text-[10px] my-1.5 justify-center items-center'>(or)</li>
                                    <li className='flex gap-3 text-skin-accent justify-center items-center'>Switch to Code Snippets section to find useful Atos verified code snippets.</li>
                                </ul>
                                </div>
                            </div>
                        )

                    ):
                    (
                        <ThreeDots className='stroke-skin-accent m-auto mt-10 h-40' />
                    ))
                }
                {/* {searchType.tabID === "codeRepos" && <AtomSearchSection searchResults={atomSearchResults} chatResponse={chatResponse}/>} */}
                {searchType.tabID === "codeSnips" &&
                    (!isLoading ?
                        (
                            snippetSearchResults.length !== 0 ?
                            (<CodeSearchSection searchQuery={searchQuery} searchResults={snippetSearchResults} />)
                        :
                        (
                            <div className='stroke-skin-accent m-auto h-60 text-[12px] text-skin-secondary mt-10'>
                                <AiOutlineSnippets className='opacity-40 h-20 w-20 m-auto mb-6'/>
                                <p className=' text-center max-w-[550px]'>Find Atos verified code snippets relevant to your query easily with me - a specialized search engine. Trustworthy and efficient results every time. Try me out and simplify your coding workflow!</p>
                                <div className='mt-6'>
                                <ul>
                                    <li className='flex gap-3 text-skin-accent justify-center items-center'>use the <CiSearch className='h-4 w-4'/> bar to search.</li>
                                    <li className='flex gap-3 text-[10px] my-1.5 justify-center items-center'>(or)</li>
                                    <li className='flex gap-3 text-skin-accent justify-center items-center'>Switch to Generate Code to use AI to generate relevant code.</li>
                                </ul>
                                </div>
                            </div>
                        ))
                        :
                        (
                            <ThreeDots className='stroke-skin-accent m-auto mt-10 h-40' />
                        ))
                }
            </div>
            <ToastContainer autoClose={2000}/>
        </div>
    );
}

export default App;
