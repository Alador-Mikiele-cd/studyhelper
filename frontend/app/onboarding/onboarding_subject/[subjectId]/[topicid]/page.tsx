'use client'
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getTopics } from '@/lib/api'
import { updateTopic } from '@/lib/api'
export default function GradePicker() {
    const router = useRouter()
    const params = useParams()
    const subjectId = params.subjectId
    const grade = params.topicid
    const [topic, setTopic] = useState<any[]>([])

    useEffect(() => {
        async function getTopic() {
            const all = await getTopics()
            const filtered = all.filter(
                (t: any) => t.subjectId?._id === subjectId && String(t.grade) === grade
            )
            setTopic(filtered)
        }
        getTopic()
    }, [subjectId, grade])

    async function toggleWeak(topic: any) {
        const newStatus = topic.status === 'weak' ? 'not_started' : 'weak'
        await updateTopic(topic._id, { status: newStatus })
        setTopic((prev) =>
            prev.map((t) => (t._id === topic._id ? { ...t, status: newStatus } : t))
        )
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
                        STUDYHELPER &middot; GRADE {grade}
                    </p>

                    <h1 className="mt-3 font-serif text-3xl leading-tight text-[#26241F]">
                        Mark weak units
                    </h1>

                    <p className="mt-3 font-mono text-[12px] text-[#6B6656]">
                        Tap a unit to flag it as weak.
                    </p>

                    <div className="mt-10 flex flex-col gap-3">
                        {topic.length === 0 && (
                            <p className="font-mono text-[12px] text-[#6B6656]/70">
                                No units found for this grade yet.
                            </p>
                        )}
                        {topic.map((t: any) => (
                            <button
                                key={t._id}
                                onClick={() => toggleWeak(t)}
                                className="flex items-center justify-between border border-[#26241F]/20 bg-[#F3EFE4] px-5 py-4 text-left transition-colors hover:border-[#26241F]/50"
                            >
                                <span className="font-serif text-lg text-[#26241F]">{t.name}</span>
                                <span
                                    className={`h-5 w-5 shrink-0 rounded-full border-2 ${
                                        t.status === 'weak'
                                            ? 'border-[#A63A2C] bg-[#A63A2C]'
                                            : 'border-[#26241F]/20'
                                    }`}
                                />
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => router.push('/onboarding/onboarding_subject')}
                        className="mt-8 w-full border border-[#26241F] py-4 font-mono text-sm tracking-[0.15em] text-[#26241F] transition-colors hover:bg-[#26241F] hover:text-[#F3EFE4]"
                    >
                        DONE WITH THIS SUBJECT
                    </button>
                </div>
            </main>
        </div>
    )
}