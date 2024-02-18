import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScaleLoader } from "react-spinners"

const LegalConsultant = () => {

    const [query, setQuery] = useState(null)
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleAskAI = () => {
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "question": query
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:5000/legalconsultant", requestOptions)
        .then(response => response.json())
        .then(result => {
            setResponse(result.data)
        })
        .catch(error => console.log('error', error))
        .finally(() => setLoading(false))
    }


  return (
    <div className='flex flex-col h-[calc(100vh-70px)]'>
        <div className='mt-[25px] ml-[30px] text-[14px] text-[#404040]'>
            <div className='flex flex-row gap-x-[10px] items-center'>
                <img src="/assets/images/law.png" alt="law" className="h-[30px] w-[30px] object-contain" />
                <h2 className='font-medium text-[18px] text-black mb-[8px]'>Legal Consultant</h2>
            </div>
            Is anyone troubling you in your food truck business? Get legal advice from our AI.
        </div>
        <div className='flex flex-col items-center flex-grow'>

            <div className='flex flex-col w-[80%] flex-grow pt-[40px] box-border gap-y-[25px]'>

                {query != null && <div className='flex flex-row gap-x-[15px]'>
                    <div className='font-semibold text-[18px] min-w-[140px]'>User query &nbsp;&nbsp;&nbsp;: </div> {query}
                </div>}

                {response != null && <div className='flex flex-row gap-x-[15px]'>
                    <div className='font-semibold text-[18px] min-w-[140px]'>Response &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </div> {response}
                </div>}


                <div className="flex w-full items-center space-x-2 mt-auto mb-[40px]">
                    <Input type="text" placeholder="Enter your legal query here ..." onChange={(event) => setQuery(event.target.value)}/>
                    {!loading ? 
                        <Button type="submit" onClick={handleAskAI}>Ask AI</Button>
                    :
                        <div className="flex justify-center items-center relative w-[80px]">
                            <ScaleLoader color="#3670FF"/>
                        </div>
                    }
                </div>

            </div>
        </div>

    </div>
  )
}

export default LegalConsultant
