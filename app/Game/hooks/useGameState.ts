'use client'
import { useCallback, useMemo, useState } from 'react'
import stages from '../ku/stage-examples.json'

export type Role = 'S' | 'O' | 'V'

export type StageData = {
    stageNumber: number
    situation: string
    completedKanyouku: string
    explanation: string
    roles: Record<Role, string>
}

export type Selection = Partial<Record<Role, string>>

const ROLES: Role[] = ['S', 'O', 'V']

export function useGameState() {
    const stageList = stages as StageData[]
    const [stageIndex, setStageIndex] = useState(0)
    const [selection, setSelection] = useState<Selection>({})
    const [status, setStatus] = useState<'playing' | 'correct' | 'wrong' | 'done'>('playing')

    const stage = stageList[stageIndex]

    // Build options for each role: correct answer + decoys pulled from other stages
    const options = useMemo<Record<Role, string[]>>(() => {
        const build = (role: Role): string[] => {
            const correct = stage.roles[role]
            const decoys = stageList
                .filter((_, i) => i !== stageIndex)
                .map((s) => s.roles[role])
                .filter((w) => w !== correct)
            const pool = [correct, ...shuffle(decoys).slice(0, 2)]
            return shuffle(pool)
        }
        return { S: build('S'), O: build('O'), V: build('V') }
    }, [stageIndex])

    const select = useCallback((role: Role, word: string) => {
        if (status !== 'playing') return
        setSelection((prev) => ({ ...prev, [role]: word }))
    }, [status])

    const submit = useCallback(() => {
        if (!ROLES.every((r) => selection[r])) return
        const allCorrect = ROLES.every((r) => selection[r] === stage.roles[r])
        setStatus(allCorrect ? 'correct' : 'wrong')
    }, [selection, stage])

    const next = useCallback(() => {
        setSelection({})
        if (stageIndex + 1 >= stageList.length) {
            setStatus('done')
        } else {
            setStageIndex(stageIndex + 1)
            setStatus('playing')
        }
    }, [stageIndex, stageList.length])

    const retry = useCallback(() => {
        setSelection({})
        setStatus('playing')
    }, [])

    return { stage, stageIndex, total: stageList.length, options, selection, status, select, submit, next, retry }
}

function shuffle<T>(arr: T[]): T[] {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
}
