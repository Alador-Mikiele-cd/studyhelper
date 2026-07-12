'use client'

import { useRouter } from "next/navigation"
import {getSetting , getSessions} from '@/lib/api'
import { useEffect, useState } from "react"
export default function dashboard(){
    const router = useRouter()
    const [target , setTarget] = useState()
    
    
    useEffect(()=>{
        async function getTarget() {
            const target = await getSetting()
            setTarget(target.targetScore)
        }
        
        getTarget()
        
    },[])
   return (
    <div className="flex min-h-screen justify-center bg-[#1C1B1A] px-6 py-16">
        <main className="w-full max-w-xl">
            <p className="font-mono text-[11px] tracking-[0.25em] text-[#A63A2C]">
                STUDYHELPER &middot; DASHBOARD
            </p>
            <h1 className="mt-1 font-serif text-2xl text-[#F3EFE4] mb-8">Dashboard</h1>

            <div className="grid grid-cols-3 gap-3">
                <div className="border border-[#D8D0BC] bg-[#F3EFE4] px-4 py-4">
                    <p className="font-mono text-[10px] tracking-[0.15em] text-[#6B6656]">TARGET</p>
                    <p className="mt-1 font-serif text-2xl text-[#26241F]">
                        {target ?? '—'}<span className="text-sm text-[#6B6656]">/600</span>
                    </p>
                </div>

                <div className="border border-[#D8D0BC] bg-[#F3EFE4] px-4 py-4">
                    <p className="font-mono text-[10px] tracking-[0.15em] text-[#6B6656]">THIS WEEK</p>
                    <p className="mt-1 font-serif text-2xl text-[#26241F]">
                        6.5<span className="text-sm text-[#6B6656]">h</span>
                    </p>
                </div>

                <div className="border border-[#A63A2C] bg-[#F3EFE4] px-4 py-4">
                    <p className="font-mono text-[10px] tracking-[0.15em] text-[#A63A2C]">WEAK</p>
                    <p className="mt-1 font-serif text-2xl text-[#A63A2C]">4</p>
                </div>
            </div>

            <div
                className="mt-6 border border-[#D8D0BC] bg-[#F3EFE4] px-6 py-6"
                style={{
                    backgroundImage: 'repeating-linear-gradient(#F3EFE4, #F3EFE4 27px, #E4DCC8 28px)',
                }}
            >
                <p className="font-mono text-[10px] tracking-[0.15em] text-[#6B6656]">
                    NEEDS REVIEW
                </p>
                <div className="mt-3 flex flex-col gap-2">
                    <div className="flex items-center justify-between border-b border-[#26241F]/10 pb-2">
                        <span className="font-serif text-sm text-[#26241F]">
                            Exponential and Logarithmic Functions
                        </span>
                        <span className="font-mono text-[11px] text-[#6B6656]">9 days ago</span>
                    </div>
                    <div className="flex items-center justify-between pb-2">
                        <span className="font-serif text-sm text-[#26241F]">Grammar</span>
                        <span className="font-mono text-[11px] text-[#6B6656]">never reviewed</span>
                    </div>
                </div>
            </div>
        </main>
    </div>
)
}