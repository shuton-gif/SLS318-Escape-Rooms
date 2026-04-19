'use client'
import { useGameState, Role } from '../hooks/useGameState'
import SituationCard from './SituationCard'
import ResultDisplay from './ResultDisplay'

const ROLES: Role[] = ['S', 'O', 'V']
const ROLE_LABELS: Record<Role, string> = { S: 'Subject (主語)', O: 'Object (目的語)', V: 'Verb (動詞)' }

export default function Stage() {
    const { stage, stageIndex, total, options, selection, status, select, submit, next, retry } = useGameState()

    const allPicked = ROLES.every((r) => selection[r])

    if (status === 'done') {
        return <ResultDisplay status="done" completedKanyouku="" explanation="" onNext={() => {}} onRetry={() => {}} />
    }

    return (
        <div style={{ maxWidth: '50rem', margin: '2rem auto', padding: '1rem', fontFamily: 'sans-serif' }}>
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                {stageIndex + 1} / {total}
            </div>

            <SituationCard stageNumber={stage.stageNumber} situation={stage.situation} />

            <div style={{ display: 'grid', gap: '1rem' }}>
                {ROLES.map((role) => (
                    <div key={role} style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '0.5rem' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                            Player {role} — {ROLE_LABELS[role]}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {options[role].map((word) => {
                                const picked = selection[role] === word
                                return (
                                    <button
                                        key={word}
                                        onClick={() => select(role, word)}
                                        disabled={status !== 'playing'}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            fontSize: '1rem',
                                            cursor: status === 'playing' ? 'pointer' : 'default',
                                            borderRadius: '0.25rem',
                                            border: picked ? '2px solid #1976d2' : '1px solid #999',
                                            backgroundColor: picked ? '#bbdefb' : '#fff',
                                        }}
                                    >
                                        {word}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {status === 'playing' && (
                <button
                    onClick={submit}
                    disabled={!allPicked}
                    style={{
                        marginTop: '1.5rem',
                        padding: '0.75rem 2rem',
                        fontSize: '1.1rem',
                        cursor: allPicked ? 'pointer' : 'not-allowed',
                        borderRadius: '0.25rem',
                        border: 'none',
                        backgroundColor: allPicked ? '#1976d2' : '#ccc',
                        color: '#fff',
                    }}
                >
                    Submit
                </button>
            )}

            {(status === 'correct' || status === 'wrong') && (
                <ResultDisplay
                    status={status}
                    completedKanyouku={stage.completedKanyouku}
                    explanation={stage.explanation}
                    onNext={next}
                    onRetry={retry}
                />
            )}
        </div>
    )
}
