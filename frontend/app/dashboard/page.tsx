'use client'

import { useRouter } from "next/navigation"
import { getSetting, getSessions, getTopics, getSubjects, createSession } from '@/lib/api'
import { useEffect, useState } from "react"

export default function Dashboard() {
    const router = useRouter()
    const [target, setTarget] = useState()
    const [weakSubject, setWeakSubject] = useState()
    const [duration, setDuration] = useState<number | null>(null)
    const [listWeakSubject, setListWeakSubject] = useState<any[]>([])
    const [lastReviewed, setLastReviewed] = useState()
    const [subjects, setSubjects] = useState<any[]>([])
    const [topics, setTopics] = useState<any[]>([])
    const [selectedSubject, setSelectedSubject] = useState('')
    const [selectedTopic, setSelectedTopic] = useState('')

    // timer state
    const [isStudying, setIsStudying] = useState(false)
    const [seconds, setSeconds] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [justSaved, setJustSaved] = useState(false)

    useEffect(() => {
        async function getTarget() {
            const target = await getSetting()
            setTarget(target.targetScore)
        }
        async function getWeakSubject() {
            const topics = await getTopics()
            const filtered = topics.filter((t: any) => t.status === 'weak')
            setWeakSubject(filtered)
        }
        async function getDuration() {
            const session = await getSessions()
            const total = session.reduce((sum: number, s: any) => sum + (s.durationMinutes || 0), 0)
            const hours = total / 60
            setDuration(hours)
        }
        async function getWeakTopics() {
            const topic = await getTopics()
            const filterd = topic.filter((t: any) => t.status === 'weak')
            setListWeakSubject(filterd)
            const id = filterd.slice(0, 3).map((t: any) => t.lastReviewedAt)
            setLastReviewed(id)
        }
        async function loadPickerData() {
            const subj = await getSubjects()
            setSubjects(subj)
            const top = await getTopics()
            setTopics(top)
        }

        getTarget()
        getWeakSubject()
        getDuration()
        getWeakTopics()
        loadPickerData()
    }, [])


    useEffect(() => {
        if (!isStudying || isPaused) return

        const interval = setInterval(() => {
            setSeconds((prev) => prev + 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [isStudying, isPaused])

    function formatTime(totalSeconds: number) {
        const m = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
        const s = String(totalSeconds % 60).padStart(2, '0')
        return `${m}:${s}`
    }

    function startStudying() {
        if (!selectedSubject || !selectedTopic) return
        setSeconds(0)
        setIsPaused(false)
        setIsStudying(true)
    }

    function togglePause() {
        setIsPaused((prev) => !prev)
    }

    async function stopStudying() {
        const durationMinutes = Math.round(seconds / 60)
        await createSession({
            subjectId: selectedSubject,
            topicId: selectedTopic,
            durationMinutes,
            date: new Date(),
        })
        setIsStudying(false)
        setJustSaved(true)
    }

    function studyAgain() {
        setJustSaved(false)
        setSelectedSubject('')
        setSelectedTopic('')
        setSeconds(0)
    }

    const subjectName = subjects.find((s: any) => s._id === selectedSubject)?.name
    const topicName = topics.find((t: any) => t._id === selectedTopic)?.name

    return (
        <div className="flex min-h-screen justify-center bg-[#1C1B1A] px-6 py-16">
            <main className="w-full max-w-xl">
                <p className="font-mono text-[11px] tracking-[0.25em] text-[#A63A2C]">
                    STUDYHELPER &middot; DASHBOARD
                </p>
                <h1 className="mt-1 mb-8 font-serif text-2xl text-[#F3EFE4]">Dashboard</h1>

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
                            {duration}<span className="text-sm text-[#6B6656]">h</span>
                        </p>
                    </div>

                    <div className="border border-[#A63A2C] bg-[#F3EFE4] px-4 py-4">
                        <p className="font-mono text-[10px] tracking-[0.15em] text-[#A63A2C]">WEAK</p>
                        <p className="mt-1 font-serif text-2xl text-[#A63A2C]">{weakSubject?.length ?? 0}</p>
                    </div>
                </div>

               
                {justSaved ? (
                    <div className="mt-6 border border-[#A63A2C] bg-[#F3EFE4] px-6 py-8 text-center">
                        <p className="font-mono text-[11px] tracking-[0.15em] text-[#6B6656]">SESSION SAVED</p>
                        <p className="mt-2 font-serif text-lg text-[#26241F]">
                            {Math.round(seconds / 60)} min logged
                        </p>
                        <button
                            onClick={studyAgain}
                            className="mt-4 border border-[#26241F]/30 px-5 py-2 font-mono text-[11px] tracking-[0.1em] text-[#26241F]"
                        >
                            START ANOTHER SESSION
                        </button>
                    </div>
                ) : !isStudying ? (
                    <div className="mt-6 border border-[#D8D0BC] bg-[#F3EFE4] px-6 py-6">
                        <p className="mb-4 font-mono text-[10px] tracking-[0.15em] text-[#6B6656]">START STUDYING</p>

                        <select
                            value={selectedSubject}
                            onChange={(e) => { setSelectedSubject(e.target.value); setSelectedTopic('') }}
                            className="mb-3 w-full border border-[#26241F]/20 bg-transparent px-4 py-3 font-mono text-sm text-[#26241F]"
                        >
                            <option value="">Select subject</option>
                            {subjects.map((s: any) => (
                                <option key={s._id} value={s._id}>{s.name}</option>
                            ))}
                        </select>

                        <select
                            value={selectedTopic}
                            onChange={(e) => setSelectedTopic(e.target.value)}
                            disabled={!selectedSubject}
                            className="mb-4 w-full border border-[#26241F]/20 bg-transparent px-4 py-3 font-mono text-sm text-[#26241F] disabled:opacity-40"
                        >
                            <option value="">Select topic</option>
                            {topics
                                .filter((t: any) => t.subjectId?._id === selectedSubject)
                                .map((t: any) => (
                                    <option key={t._id} value={t._id}>{t.name}</option>
                                ))}
                        </select>

                        <button
                            onClick={startStudying}
                            disabled={!selectedSubject || !selectedTopic}
                            className="w-full border border-[#26241F] py-3 font-mono text-sm tracking-[0.1em] text-[#26241F] disabled:opacity-30"
                        >
                            START
                        </button>
                    </div>
                ) : (
                    <div className="mt-6 border border-[#A63A2C] bg-[#F3EFE4] px-6 py-6">
                        <p className="mb-3 font-mono text-[10px] tracking-[0.15em] text-[#A63A2C]">
                            CURRENTLY STUDYING
                        </p>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-serif text-lg text-[#26241F]">{subjectName}</p>
                                <p className="mt-1 font-mono text-[11px] text-[#6B6656]">{topicName}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="font-mono text-2xl text-[#26241F]">{formatTime(seconds)}</span>
                                <button
                                    onClick={togglePause}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#A63A2C] font-mono text-xs text-[#A63A2C]"
                                >
                                    {isPaused ? '▶' : 'II'}
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={stopStudying}
                            className="mt-4 w-full border border-[#26241F]/30 py-3 font-mono text-[11px] tracking-[0.1em] text-[#26241F]"
                        >
                            STOP &amp; SAVE SESSION
                        </button>
                    </div>
                )}

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
                        {listWeakSubject?.slice(0, 3).map((t: any) => (
                            <div key={t._id} className="flex items-center justify-between border-b border-[#26241F]/10 pb-2">
                                <span className="font-serif text-sm text-[#26241F]">{t.name}</span>
                                <span className="font-mono text-[11px] text-[#6B6656]">
                                    {t.lastReviewedAt ? new Date(t.lastReviewedAt).toLocaleDateString() : 'Never reviewed'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}