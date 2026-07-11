'use client'

import { useEffect, useState } from 'react'
import { createSetting } from '../../../lib/api'
import { useRouter } from 'next/navigation'

export default function Target() {
    const [input, setInput] = useState('')
    const [stream, setStream] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        setStream(localStorage.getItem('stream'))
    }, [])

    async function handle() {
        await createSetting({ targetScore: Number(input), stream })
        localStorage.removeItem('stream')
        router.push('/onboarding/onboarding_subject')
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#1C1B1A] px-6 py-16">
            <main className="w-full max-w-md">
                <div
                    className="relative border border-[#D8D0BC] bg-[#F3EFE4] px-10 py-12"
                    style={{
                        backgroundImage:
                            'repeating-linear-gradient(#F3EFE4, #F3EFE4 27px, #E4DCC8 28px)',
                    }}
                >
                    <p className="font-mono text-[11px] tracking-[0.25em] text-[#A63A2C]">
                        STUDYHELPER &middot; TARGET SCORE
                    </p>

                    <h1 className="mt-3 font-serif text-3xl leading-tight text-[#26241F]">
                        What's your target score?
                    </h1>

                    <p className="mt-3 font-mono text-[12px] text-[#6B6656]">
                        Out of 600. You can change this later.
                    </p>

                    <div className="mt-10">
                        <label className="font-mono text-[10px] tracking-[0.2em] text-[#A63A2C]">
                            02
                        </label>
                        <input
                            type="number"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="530"
                            className="mt-2 w-full border border-[#26241F]/20 bg-transparent px-4 py-4 font-serif text-2xl text-[#26241F] outline-none placeholder:text-[#26241F]/25 focus:border-[#A63A2C]"
                        />
                    </div>

                    <button
                        onClick={handle}
                        disabled={!input}
                        className="mt-8 w-full border border-[#26241F] py-4 font-mono text-sm tracking-[0.15em] text-[#26241F] transition-colors hover:bg-[#26241F] hover:text-[#F3EFE4] disabled:cursor-not-allowed disabled:border-[#26241F]/20 disabled:text-[#26241F]/30 disabled:hover:bg-transparent"
                    >
                        CONTINUE
                    </button>
                </div>

                <p className="mt-6 text-center font-mono text-[11px] text-[#6B6656]/70">
                    Stream: {stream ?? 'not set'}
                </p>
            </main>
        </div>
    )
}
