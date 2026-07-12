'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getSubjects } from '@/lib/api'

export default function OnboardingSubject() {
    const router = useRouter()
    const [subjects, setSubjects] = useState<any[]>([])
    const [stream, setStream] = useState<string | null>(null)

    function handle() {
        router.push('/dashboard')
    }

    useEffect(() => {
        const savedStream = localStorage.getItem('stream')
        setStream(savedStream)

        async function loadSubjects() {
            const all = await getSubjects()
            setSubjects(all)
        }
        loadSubjects()
    }, [])

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
                        STUDYHELPER &middot; SUBJECTS
                    </p>

                    <h1 className="mt-3 font-serif text-3xl leading-tight text-[#26241F]">
                        Mark your weak subjects
                    </h1>

                    <p className="mt-3 font-mono text-[12px] text-[#6B6656]">
                        Tap a subject to go deeper, or skip ahead.
                    </p>

                    <div className="mt-10 flex flex-col gap-3">
                        {subjects.map((s) => (
                            <button
                                key={s._id}
                                onClick={() => router.push(`/onboarding/onboarding_subject/${s._id}`)}
                                className="flex items-center justify-between border border-[#26241F]/20 bg-[#F3EFE4] px-5 py-4 text-left transition-colors hover:border-[#26241F]/50"

                            >
                                <span className="font-serif text-lg text-[#26241F]">{s.name}</span>
                                <span className="font-mono text-[11px] text-[#6B6656]">
                                    target {s.targetScore ?? '—'}
                                </span>
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handle}
                        className="mt-8 w-full border border-[#26241F] py-4 font-mono text-sm tracking-[0.15em] text-[#26241F] transition-colors hover:bg-[#26241F] hover:text-[#F3EFE4]"
                    >
                        GO TO DASHBOARD
                    </button>
                </div>
            </main>
        </div>
    )
}