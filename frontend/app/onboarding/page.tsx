'use client'

import { useRouter } from 'next/navigation'
import { useState ,useEffect} from 'react'

export default function OnBoarding() {
    const router = useRouter()
    const [selected, setSelected] = useState<string | null>(null)
    
    function chooseStream(stream: string) {
        setSelected(stream)
        localStorage.setItem('stream', stream)
        setTimeout(() => router.push('/onboarding/target-score'), 450)
    }

  

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#1C1B1A] px-6 py-16">
            <main className="w-full max-w-md">
                <div className="relative border border-[#D8D0BC] bg-[#F3EFE4] px-10 py-12"
                    style={{
                        backgroundImage:
                            'repeating-linear-gradient(#F3EFE4, #F3EFE4 27px, #E4DCC8 28px)',
                    }}
                >
                    <p className="font-mono text-[11px] tracking-[0.25em] text-[#A63A2C]">
                        STUDYHELPER &middot; STREAM SELECTION
                    </p>

                    <h1 className="mt-3 font-serif text-3xl leading-tight text-[#26241F]">
                        Which stream are you registering for?
                    </h1>

                    <p className="mt-3 font-mono text-[12px] text-[#6B6656]">
                        This decides the subjects on your record.
                    </p>

                    <div className="mt-10 flex flex-col gap-4">
                        {[
                            { id: 'natural', label: 'Natural science', detail: 'Math &middot; Physics &middot; Chemistry &middot; Biology &middot; English' },
                            { id: 'social', label: 'Social science', detail: 'Math &middot; English &middot; Economics &middot; History &middot; Geography' },
                        ].map((stream, i) => (
                            <button
                                key={stream.id}
                                onClick={() => chooseStream(stream.id)}
                                className={`group relative flex items-center justify-between border px-6 py-5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A63A2C] ${
                                    selected === stream.id
                                        ? 'border-[#A63A2C] bg-[#F3EFE4]'
                                        : 'border-[#26241F]/20 bg-[#F3EFE4] hover:border-[#26241F]/50'
                                }`}
                            >
                                <div>
                                    <p className="font-mono text-[10px] tracking-[0.2em] text-[#A63A2C]">
                                        0{i + 1}
                                    </p>
                                    <p className="mt-1 font-serif text-xl text-[#26241F]">{stream.label}</p>
                                    <p
                                        className="mt-1 font-mono text-[11px] text-[#6B6656]"
                                        dangerouslySetInnerHTML={{ __html: stream.detail }}
                                    />
                                </div>

                                <span
                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 font-serif text-[10px] uppercase tracking-wider transition-all duration-300 ${
                                        selected === stream.id
                                            ? 'scale-100 border-[#A63A2C] text-[#A63A2C] opacity-100'
                                            : 'scale-90 border-[#26241F]/15 text-transparent opacity-0'
                                    }`}
                                >
                                    Set
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <p className="mt-6 text-center font-mono text-[11px] text-[#6B6656]/70">
                    You can change this later from your profile.
                </p>
            </main>
        </div>
    )
}