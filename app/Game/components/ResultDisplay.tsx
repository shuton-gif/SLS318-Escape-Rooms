'use client'

type Props = {
    status: 'correct' | 'wrong' | 'done'
    completedKanyouku: string
    explanation: string
    onNext: () => void
    onRetry: () => void
}

export default function ResultDisplay({ status, completedKanyouku, explanation, onNext, onRetry }: Props) {
    if (status === 'done') {
        return (
            <div style={{ textAlign: 'center', padding: '2rem', fontSize: '1.5rem' }}>
                🎉 All stages cleared!
            </div>
        )
    }

    const isCorrect = status === 'correct'
    return (
        <div style={{
            padding: '1.5rem',
            borderRadius: '0.5rem',
            backgroundColor: isCorrect ? '#e8f5e9' : '#ffebee',
            border: `2px solid ${isCorrect ? '#4caf50' : '#f44336'}`,
            marginTop: '1.5rem',
        }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {isCorrect ? '正解！' : '不正解'}
            </div>
            {isCorrect && (
                <>
                    <div style={{ fontSize: '1.25rem', margin: '0.75rem 0' }}>{completedKanyouku}</div>
                    <div style={{ color: '#555' }}>{explanation}</div>
                </>
            )}
            <button
                onClick={isCorrect ? onNext : onRetry}
                style={{
                    marginTop: '1rem',
                    padding: '0.5rem 1.5rem',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    borderRadius: '0.25rem',
                    border: 'none',
                    backgroundColor: isCorrect ? '#4caf50' : '#f44336',
                    color: '#fff',
                }}
            >
                {isCorrect ? 'Next Stage' : 'Try Again'}
            </button>
        </div>
    )
}
