'use client'

export default function SituationCard({ stageNumber, situation }: { stageNumber: number; situation: string }) {
    return (
        <div style={{
            border: '2px solid #333',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            backgroundColor: '#fff8e1',
            marginBottom: '1.5rem',
        }}>
            <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: '0.5rem' }}>
                Stage {stageNumber}
            </div>
            <div style={{ fontSize: '1.25rem', lineHeight: 1.6 }}>
                {situation}
            </div>
        </div>
    )
}
