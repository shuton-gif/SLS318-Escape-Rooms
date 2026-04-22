'use client'
import { GameState, GROUND_TOP, Piece, ROLE_COLORS } from './gameState'

const PIECE_SIZE = 60
const PIECE_MIN_WIDTH = 60
const PIECE_CHAR_WIDTH = 11
const PIECE_PADDING = 16

export function pieceWidth(word: string): number {
    return Math.max(PIECE_MIN_WIDTH, word.length * PIECE_CHAR_WIDTH + PIECE_PADDING)
}

export default function PuzzlePiece({ gameState, piece }: { gameState: GameState; piece: Piece }) {
    const holder = piece.state === 'held'
        ? gameState.players.find((p) => p.heldPieceId === piece.id)
        : undefined

    let top: number
    let left: number

    const w = pieceWidth(piece.word)
    if (holder) {
        top = holder.y - PIECE_SIZE - 8
        left = holder.x + (holder.width * 16 - w) / 2
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
                width: `${w}px`,
                top: `${top}px`,
                left: `${left}px`,

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                fontSize: '0.9rem',
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
