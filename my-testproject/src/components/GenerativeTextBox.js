import React, { useEffect, useState } from 'react'

function GenerativeTextBox({ai_response}) {
    const [text, setText] = useState("")
    const [fullText, setFullText] = useState(ai_response)
    const [index, setIndex] = useState(0)
    useEffect(() => {
        if (index < fullText.length) {
          setTimeout(() => {
            setText(text + fullText[index])
            setIndex(index + 1)
          }, 10)
        }
      }, [index])
  return (
        <p className='text-sm leading-6 border p-4 rounded-xl' dangerouslySetInnerHTML={{ __html: text.replace('\n', "<br>")}}/>//{text.replace('\n', "<br>")}!</p>
  )
}

export default GenerativeTextBox