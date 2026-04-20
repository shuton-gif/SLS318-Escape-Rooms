'use client'
import { GameState, GROUND_TOP, Piece, ROLE_COLORS } from './gameState'

const PIECE_SIZE = 60

export default function PuzzlePiece({ gameState, piece }: { gameState: GameState; piece: Piece }) {
    const holder = piece.state === 'held'
        ? gameState.players.find((p) => p.heldPieceId === piece.id)
        : undefined

    let top: number
    let left: number

    if (holder) {
        top = holder.y - PIECE_SIZE - 8
        left = holder.x + (holder.width * 16 - PIECE_SIZE) / 2
    } else if (piece.state === 'flying') {
        top = piece.y
        left = piece.x
    } else {
        top = GROUND_TOP - PIECE_SIZE
        left = piece.x
    }

    return (
        <div
            style={{
                position: 'absolute',
                height: `${PIECE_SIZE}px`,
                width: `${PIECE_SIZE}px`,
                top: `${top}px`,
                left: `${left}px`,

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                fontSize: '0.8rem',
                color: 'black',
                backgroundColor: ROLE_COLORS[piece.type],
                userSelect: 'none',
            }}
        >
            {piece.word}
        </div>
    )
}

export { PIECE_SIZE }
