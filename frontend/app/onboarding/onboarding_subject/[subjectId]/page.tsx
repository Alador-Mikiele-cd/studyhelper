'use client'
import { useParams, useRouter } from "next/navigation"

export default function GradePicker() {
    const router = useRouter()
    const params = useParams()
    const subjectId = params.subjectId
    const grades = [9, 10, 11, 12]

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
                        STUDYHELPER &middot; GRADE
                    </p>

                    <h1 className="mt-3 font-serif text-3xl leading-tight text-[#26241F]">
                        Pick a grade
                    </h1>

                    <p className="mt-3 font-mono text-[12px] text-[#6B6656]">
                        Then mark the units you're weak on.
                    </p>

                    <div className="mt-10 flex flex-col gap-3">
                        {grades.map((g) => (
                            <button
                                key={g}
                                onClick={() => router.push(`/onboarding/onboarding_subject/${subjectId}/${g}`)}
                                className="flex items-center justify-between border border-[#26241F]/20 bg-[#F3EFE4] px-5 py-4 text-left transition-colors hover:border-[#26241F]/50"
                            >
                                <span className="font-serif text-lg text-[#26241F]">Grade {g}</span>
                                <span className="font-mono text-[13px] text-[#6B6656]">&rsaquo;</span>
                            </button>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}