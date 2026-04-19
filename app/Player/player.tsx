'use client'
import styles from './player.module.css'
import { Player as PlayerType, ROLE_COLORS } from '../Game/gameState'
import { toRem } from '../../utils/toRem'

export default function Player({ player, frozen = false }: { player: PlayerType; frozen?: boolean }) {
    const eyeHeight = toRem(5)
    const eyeWidth = toRem(5)

    return (
        <div style={{
            top: `${player.y}px`,
            left: `${player.x}px`,
            height: `${player.height * player.scale}rem`,
            width: `${player.width * player.scale}rem`,
            backgroundColor: frozen ? '#e74c3c' : ROLE_COLORS[player.type],
            transition: 'background-color 0.2s',
            transform: player.action.includes('right') ? 'skewX(-15deg)'
                : player.action.includes('left') ? 'skewX(15deg)'
                    : 'skewX(0deg)',
        }}
            className={styles.player}>
            <div
                style={{
                    position: 'absolute',
                    height: `${eyeHeight}rem`,
                    width: `${eyeWidth}rem`,
                    backgroundColor: 'black',
                    top: `${eyeHeight}rem`,
                    left: 0,
                }}>
            </div>
            <div
                style={{
                    position: 'absolute',
                    height: `${eyeHeight}rem`,
                    width: `${eyeWidth}rem`,
                    backgroundColor: 'black',
                    top: `${eyeHeight}rem`,
                    right: 0,
                }}>
            </div>
        </div>
    )
}
