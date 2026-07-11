'use client'
import { useEffect, useState } from 'react'
import {createSetting} from '../../../lib/api'
import { useRouter } from 'next/navigation'


export default function Target(){
    const [input , setInput] = useState('')
    const [stream ,setStream] = useState<string |null>(null)
    const router = useRouter()
    useEffect(()=>{
    setStream(localStorage.getItem('stream'))
    },[])
    async function handle(){
    await createSetting({targetScore : Number(input),stream})
     localStorage.removeItem('stream')
        router.push('/onboarding/onboarding_subject')
    }
    
     

    return(
        <div className="">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
             <button onClick={handle}> Submit </button>
        </div>
    )
}