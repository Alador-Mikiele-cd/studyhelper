'use client'

import { useRouter } from "next/navigation"
import { getSetting } from '@/lib/api'

export default function Home() {
    const router = useRouter()

    async function handleEnter() {
        try {
            const setting = await getSetting()
            if (setting && setting.targetScore) {
                router.push('/dashboard')
            } else {
                router.push('/onboarding')
            }
        } catch (err) {
            router.push('/onboarding')
        }
    }

    return (
        <div className="flex min-h-screen justify-center bg-[#1C1B1A] px-6 py-16">
            <main className="w-full max-w-xl">
                <p className="mb-16 font-mono text-[12px] tracking-[0.25em] text-[#A63A2C]">
                    STUDYHELPER
                </p>

                <p className="mb-4 font-mono text-[11px] tracking-[0.2em] text-[#A63A2C]">
                    EUEE EXAM PREPARATION
                </p>
                <h1 className="mb-5 font-serif text-4xl leading-tight text-[#F3EFE4]">
                    Track what you study.<br />Know what you&apos;re weak on.
                </h1>
                <p className="mb-9 max-w-md font-mono text-[13px] leading-relaxed text-[#F3EFE4]/60">
                    Mark weak units by grade, log study sessions, and see exactly where to focus next.
                </p>

                <button
                    onClick={handleEnter}
                    className="mb-16 border border-[#A63A2C] bg-[#A63A2C] px-7 py-3.5 font-mono text-[12px] tracking-[0.1em] text-[#F3EFE4] transition-opacity hover:opacity-90"
                >
                    ENTER DASHBOARD
                </button>

                <div className="grid grid-cols-3 gap-5 border-t border-[#F3EFE4]/10 pt-9">
                    <div>
                        <p className="mb-2 font-mono text-[10px] text-[#A63A2C]">01</p>
                        <p className="mb-1.5 font-serif text-sm text-[#F3EFE4]">Mark weak units</p>
                        <p className="font-mono text-[11px] leading-relaxed text-[#F3EFE4]/50">
                            By subject, grade, and unit — not just a vague topic list.
                        </p>
                    </div>
                    <div>
                        <p className="mb-2 font-mono text-[10px] text-[#A63A2C]">02</p>
                        <p className="mb-1.5 font-serif text-sm text-[#F3EFE4]">Log real sessions</p>
                        <p className="font-mono text-[11px] leading-relaxed text-[#F3EFE4]/50">
                            Track time studied per topic, with a built-in timer.
                        </p>
                    </div>
                    <div>
                        <p className="mb-2 font-mono text-[10px] text-[#A63A2C]">03</p>
                        <p className="mb-1.5 font-serif text-sm text-[#F3EFE4]">See what&apos;s neglected</p>
                        <p className="font-mono text-[11px] leading-relaxed text-[#F3EFE4]/50">
                            A daily dashboard flags what needs review.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}