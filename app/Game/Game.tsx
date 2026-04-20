'use client'
import styles from './Game.module.css'
import { useState, useEffect, useRef } from 'react'
import {
    GameState, Piece, Player as PlayerType, Role, ROLES, ROLE_COLORS,
    initState, BOX, KEYMAPS, GROUND_TOP, GRAVITY, THROW_VX, THROW_VY,
} from './gameState'
import Player from '../Player/player'
import PuzzlePiece, { PIECE_SIZE } from './PuzzlePiece'
import stagesData from './ku/stage-examples.json'

type RoleField = string | string[] | null | undefined

type StageData = {
    stageNumber: number | string
    situation: string
    english: string
    hint: string
    completedKanyouku: string
    explanation: string
    englishExplanation: string
    roles: { S?: RoleField; O?: RoleField; V?: RoleField }
}

function toArray(field: RoleField): string[] {
    if (field == null) return []
    return Array.isArray(field) ? field : [field]
}

function fillSituation(situation: string, kanyouku: string): string {
    return situation.replace(/＿＿＿|___/g, kanyouku)
}

const allStages = stagesData as StageData[]
const tutorialStage = allStages.find((s) => s.stageNumber === 'tutorial')!
const stages = allStages.filter((s) => typeof s.stageNumber === 'number')

// Scene bounds (same as player clamp)
const SCENE_MAX_X = 1450

function buildPieces(stage: StageData, allStages: StageData[]): Piece[] {
    let id = 0
    const pieces: Piece[] = []
    for (const role of ROLES) {
        const correct = toArray(stage.roles[role])
        const decoyPool = allStages
            .filter((s) => s.stageNumber !== stage.stageNumber)
            .flatMap((s) => toArray(s.roles[role]))
            .filter((w) => !correct.includes(w))
        const decoyCount = correct.length === 0 ? 3 : 2
        const decoys = shuffle(Array.from(new Set(decoyPool))).slice(0, decoyCount)
        const words = shuffle([...correct, ...decoys])
        if (words.length === 0) continue
        for (const word of words) {
            pieces.push({
                id: id++, word, type: role,
                x: 0, y: GROUND_TOP - PIECE_SIZE,
                vx: 0, vy: 0,
                state: 'onGround',
            })
        }
        console.log("correct" + `${correct}`)
        // console.log("wrong" + `${decoyPool}`)
        console.log("wrong" + `${decoys}`)
    }
    const shuffled = shuffle(pieces)
    const start = 120
    const step = 90
    shuffled.forEach((p, i) => { p.x = start + i * step })
    return shuffled
}

function shuffle<T>(arr: T[]): T[] {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

// Rim opening bounds (U interior) in world coordinates
const RIM_LEFT = BOX.X - BOX.RIM_WIDTH / 2 + BOX.BAR_THICKNESS
const RIM_RIGHT = BOX.X + BOX.RIM_WIDTH / 2 - BOX.BAR_THICKNESS
const RIM_TOP = GROUND_TOP - BOX.BASE_HEIGHT - BOX.UPRIGHT_HEIGHT
const RIM_BOTTOM = GROUND_TOP - BOX.BASE_HEIGHT

function isPieceInRim(p: Piece): boolean {
    const cx = p.x + PIECE_SIZE / 2
    const cy = p.y + PIECE_SIZE / 2
    return cx >= RIM_LEFT && cx <= RIM_RIGHT && cy >= RIM_TOP && cy <= RIM_BOTTOM
}

const KEY_LABELS: Record<string, string> = {
    KeyA: 'A', KeyD: 'D', KeyW: 'W',
    KeyB: 'B', KeyM: 'M', KeyH: 'H',
    ArrowLeft: '←', ArrowRight: '→', ArrowUp: '↑',
}

export default function Game() {
    const [stageIndex, setStageIndex] = useState(0)
    const [gameState, setGameState] = useState<GameState>(() => initState())
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set())
    const [showHint, setShowHint] = useState(false)

    useEffect(() => {
        if (gameState.sceneState.phase !== 'tutorial' && gameState.sceneState.phase !== 'playing') return
        setShowHint(false)
        const t = setTimeout(() => setShowHint(true), 15000)
        return () => clearTimeout(t)
    }, [gameState.sceneState.phase, stageIndex])

    const phase = gameState.sceneState.phase
    const stage = phase === 'tutorial' ? tutorialStage : stages[stageIndex]
    const speed = 15

    const stageRef = useRef(stage)
    useEffect(() => { stageRef.current = stage }, [stage])

    const frozenRef = useRef(false)
    useEffect(() => { frozenRef.current = gameState.frozen }, [gameState.frozen])

    useEffect(() => {
        if (!gameState.frozen) return
        const t = setTimeout(() => {
            setGameState((prev) => ({ ...prev, frozen: false }))
        }, 3000)
        return () => clearTimeout(t)
    }, [gameState.frozen])

    useEffect(() => {
        if (phase === 'tutorial') {
            setGameState((prev) => ({
                ...prev,
                pieces: buildPieces(tutorialStage, allStages),
            }))
        } else if (phase === 'playing') {
            setGameState((prev) => ({
                ...prev,
                pieces: buildPieces(stages[stageIndex], stages),
            }))
        }
    }, [phase, stageIndex])

    useEffect(() => {
        if (phase !== 'tutorial' && phase !== 'playing') return
        const allRight = ROLES.every((r) => {
            const target = toArray(stage.roles[r])
            const sub = gameState.submittedSlots[r]
            return sub.length === target.length && sub.every((w, i) => w === target[i])
        })
        if (!allRight) return
        const t = setTimeout(() => {
            if (phase === 'tutorial') {
                setGameState(() => ({
                    ...initState(),
                    sceneState: { ...initState().sceneState, phase: 'ready' },
                }))
            } else {
                const nextIdx = stageIndex + 1
                if (nextIdx >= stages.length) {
                    setGameState((prev) => ({ ...prev, sceneState: { ...prev.sceneState, complete: true } }))
                } else {
                    setStageIndex(nextIdx)
                    setGameState((prev) => ({
                        ...initState(),
                        sceneState: { ...initState().sceneState, phase: 'playing', timer: prev.sceneState.timer },
                    }))
                }
            }
        }, 1500)
        return () => clearTimeout(t)
    }, [gameState.submittedSlots, stage, stageIndex, phase])

    useEffect(() => {
        const keysPressed = new Set<string>()

        type KeyKind = 'left' | 'right' | 'action'
        const keyLookup = new Map<string, { id: number; kind: KeyKind }>()
        KEYMAPS.forEach((km, id) => {
            keyLookup.set(km.left, { id, kind: 'left' })
            keyLookup.set(km.right, { id, kind: 'right' })
            keyLookup.set(km.action, { id, kind: 'action' })
        })

        const updateActions = () => {
            setGameState((prev) => ({
                ...prev,
                players: prev.players.map((p) => {
                    const km = KEYMAPS[p.id]
                    const left = keysPressed.has(km.left)
                    const right = keysPressed.has(km.right)
                    let action: PlayerType['action'] = 'idle'
                    let facing = p.facing
                    if (left) { action = 'left'; facing = 'left' }
                    else if (right) { action = 'right'; facing = 'right' }
                    return { ...p, action, facing }
                }),
            }))
        }

        const tryPickupOrThrow = (playerId: number) => {
            setGameState((prev) => {
                const player = prev.players[playerId]
                if (!player) return prev

                // holding → throw
                if (player.holding && player.heldPieceId !== null) {
                    const heldId = player.heldPieceId
                    const playerWidthPx = player.width * 16
                    const startX = player.x + (playerWidthPx - PIECE_SIZE) / 2
                    const startY = player.y - PIECE_SIZE - 8
                    const vx = player.facing === 'right' ? THROW_VX : -THROW_VX
                    const vy = THROW_VY
                    return {
                        ...prev,
                        pieces: prev.pieces.map((p) =>
                            p.id === heldId
                                ? { ...p, state: 'flying', x: startX, y: startY, vx, vy }
                                : p
                        ),
                        players: prev.players.map((p) =>
                            p.id === playerId ? { ...p, holding: false, heldPieceId: null } : p
                        ),
                    }
                }

                // not holding → pickup nearest matching-type piece on ground
                const reach = 60
                const center = player.x + (player.width * 16) / 2
                const candidates = prev.pieces.filter((p) =>
                    p.type === player.type &&
                    p.state === 'onGround' &&
                    Math.abs((p.x + PIECE_SIZE / 2) - center) < reach
                )
                if (candidates.length === 0) return prev
                candidates.sort((a, b) =>
                    Math.abs((a.x + PIECE_SIZE / 2) - center) - Math.abs((b.x + PIECE_SIZE / 2) - center)
                )
                const target = candidates[0]
                return {
                    ...prev,
                    pieces: prev.pieces.map((p) => p.id === target.id ? { ...p, state: 'held' } : p),
                    players: prev.players.map((p) =>
                        p.id === playerId ? { ...p, holding: true, heldPieceId: target.id } : p
                    ),
                }
            })
        }

        const keyDown = (e: KeyboardEvent) => {
            const entry = keyLookup.get(e.code)
            if (!entry) return
            e.preventDefault()
            if (frozenRef.current) return
            if (keysPressed.has(e.code)) return
            keysPressed.add(e.code)
            setPressedKeys((prev) => {
                const next = new Set(prev)
                next.add(e.code)
                return next
            })

            if (entry.kind === 'action') {
                tryPickupOrThrow(entry.id)
            } else {
                updateActions()
            }
        }

        const keyUp = (e: KeyboardEvent) => {
            if (!keyLookup.has(e.code)) return
            keysPressed.delete(e.code)
            setPressedKeys((prev) => {
                const next = new Set(prev)
                next.delete(e.code)
                return next
            })
            updateActions()
        }

        const tick = () => {
            setGameState((prev) => {
                // 1. Move players (skipped while frozen)
                const players = prev.frozen
                    ? prev.players
                    : prev.players.map((p) => {
                        let x = p.x
                        if (p.action === 'left') x -= 0.625 * speed
                        else if (p.action === 'right') x += 0.625 * speed
                        x = Math.max(0, Math.min(x, SCENE_MAX_X))
                        return { ...p, x }
                    })

                // 2. Physics on flying pieces; collect goal results
                let boxFlash: GameState['boxFlash'] = prev.boxFlash
                let submittedSlots = prev.submittedSlots
                let frozen = prev.frozen
                const st = stageRef.current

                const pieces: Piece[] = []
                for (const piece of prev.pieces) {
                    if (piece.state !== 'flying') {
                        pieces.push(piece)
                        continue
                    }

                    const nextVy = piece.vy + GRAVITY
                    const nextX = piece.x + piece.vx
                    const nextY = piece.y + nextVy
                    const candidate: Piece = { ...piece, x: nextX, y: nextY, vy: nextVy }

                    // check rim collision
                    if (isPieceInRim(candidate)) {
                        const target = toArray(st.roles[piece.type])
                        const current = submittedSlots[piece.type]
                        const nextIdx = current.length
                        if (nextIdx < target.length && piece.word === target[nextIdx]) {
                            submittedSlots = { ...submittedSlots, [piece.type]: [...current, piece.word] }
                            boxFlash = 'correct'
                            continue
                        } else {
                            boxFlash = 'wrong'
                            frozen = true
                            continue
                        }
                    }

                    // ground collision
                    if (candidate.y + PIECE_SIZE >= GROUND_TOP) {
                        const landedX = Math.max(0, Math.min(candidate.x, SCENE_MAX_X - PIECE_SIZE))
                        pieces.push({
                            ...candidate,
                            x: landedX,
                            y: GROUND_TOP - PIECE_SIZE,
                            vx: 0, vy: 0,
                            state: 'onGround',
                        })
                        continue
                    }

                    // off-screen sides → also let it land at edge
                    if (candidate.x < 0 || candidate.x > SCENE_MAX_X - PIECE_SIZE) {
                        const clampedX = Math.max(0, Math.min(candidate.x, SCENE_MAX_X - PIECE_SIZE))
                        pieces.push({ ...candidate, x: clampedX })
                        continue
                    }

                    pieces.push(candidate)
                }

                return { ...prev, players, pieces, submittedSlots, boxFlash, frozen }
            })
        }

        window.addEventListener('keydown', keyDown)
        window.addEventListener('keyup', keyUp)
        const timerId = setInterval(tick, 32)

        return () => {
            window.removeEventListener('keydown', keyDown)
            window.removeEventListener('keyup', keyUp)
            clearInterval(timerId)
        }
    }, [])

    // clear flash after a moment
    useEffect(() => {
        if (gameState.boxFlash === 'none') return
        const t = setTimeout(() => setGameState((prev) => ({ ...prev, boxFlash: 'none' })), 500)
        return () => clearTimeout(t)
    }, [gameState.boxFlash])

    // intro / ready: space advances the phase
    useEffect(() => {
        if (phase !== 'intro' && phase !== 'ready') return
        const onKey = (e: KeyboardEvent) => {
            if (e.code !== 'Space') return
            e.preventDefault()
            setGameState((prev) => {
                if (prev.sceneState.phase === 'intro') {
                    return { ...prev, sceneState: { ...prev.sceneState, phase: 'tutorial' } }
                }
                if (prev.sceneState.phase === 'ready') {
                    return { ...prev, sceneState: { ...prev.sceneState, phase: 'playing', timer: 0 } }
                }
                return prev
            })
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [phase])

    // timer: tick every second only while playing real stages
    useEffect(() => {
        if (phase !== 'playing' || gameState.sceneState.complete) return
        const id = setInterval(() => {
            setGameState((prev) => ({
                ...prev,
                sceneState: { ...prev.sceneState, timer: prev.sceneState.timer + 1 },
            }))
        }, 1000)
        return () => clearInterval(id)
    }, [phase, gameState.sceneState.complete])

    const formatTime = (t: number) => {
        const m = Math.floor(t / 60)
        const s = t % 60
        return `${m}:${s.toString().padStart(2, '0')}`
    }

    if (phase === 'intro') {
        return (
            <div className={styles.gameContainer}>
                <div className={styles.gameScene} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                    Press SPACE for tutorial
                </div>
            </div>
        )
    }

    if (phase === 'ready') {
        return (
            <div className={styles.gameContainer}>
                <div className={styles.gameScene} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                    Press SPACE to start
                </div>
            </div>
        )
    }

    const stageCleared = ROLES.every((r) => {
        const target = toArray(stage.roles[r])
        const sub = gameState.submittedSlots[r]
        return sub.length === target.length && sub.every((w, i) => w === target[i])
    })
    if (stageCleared && !gameState.sceneState.complete) {
        return (
            <div className={styles.gameContainer}>
                <div className={styles.gameScene} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontSize: '5rem', backgroundColor: '#2ecc71', color: 'white' }}>
                    <div>Correct!!</div>
                    <div style={{ fontSize: '2rem', marginTop: '1rem' }}>{fillSituation(stage.situation, stage.completedKanyouku)}</div>
                    <div style={{ fontSize: '1.75rem', marginTop: '1.5rem' }}>{stage.explanation}</div>
                    <div style={{ fontSize: '1.25rem', marginTop: '1rem' }}>{stage.englishExplanation}</div>
                </div>
            </div>
        )
    }

    if (gameState.sceneState.complete) {
        return (
            <div className={styles.gameContainer}>
                <div className={styles.gameScene} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                    All stages cleared at: {formatTime(gameState.sceneState.timer)}!!
                </div>
            </div>
        )
    }

    return (
        <div className={styles.gameContainer}>
            <div className={styles.gameScene}>
                <div className={styles.BG}>
                    <div style={{ position: 'absolute', top: 10, left: 20, right: 20, fontSize: '3rem', color: '#333', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                        {gameState.sceneState.phase == 'tutorial' ? <span style={{fontSize: '4.5rem'}}>Tutorial </span>: <span style={{fontSize: '4rem'}}>問題:<span style={{fontSize: '3.5rem'}}>{stage.stageNumber}</span></span>}
                        <span style={{ fontSize: '1.25rem' }}>{formatTime(gameState.sceneState.timer)}</span>
                    </div>
                    <div style={{ position: 'absolute', top: 90, left: 20, right: 20, fontSize: '1.25rem', color: '#333', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <span style={{ fontSize: '2.5rem' }}>{stage.situation}</span>
                        <span style={{ marginTop: '0.625rem', fontSize: '1rem'}}>{stage.english}</span>
                        {showHint && <span style={{ marginTop: '0.625rem' }}>hint: {stage.hint}</span>}
                    </div>
                    <div style={{ position: 'absolute', top: 275, left: 500, right: 20, fontSize: '5rem', color: '#333', display: 'flex', gap: '1rem' }}>
                        {ROLES.flatMap((role) => { 
                            const target = toArray(stage.roles[role])
                            if (target.length === 0) return []
                            return target.map((_, i) => (
                                <span key={`${role}-${i}`} >
                                    {gameState.submittedSlots[role][i] ?? '＿'}
                                </span>
                            ))
                        })}
                    </div>
                    <Box gameState={gameState} />

                    {gameState.pieces.map((p) => (
                        <PuzzlePiece key={p.id} gameState={gameState} piece={p} />
                    ))}

                    {gameState.players.map((p) => (
                        <Player key={p.id} player={p} frozen={gameState.frozen} />
                    ))}
                </div>
                <div className={styles.GROUND}>
                    <KeyHud pressedKeys={pressedKeys} />
                </div>
            </div>
        </div>
    )
}

function KeyHud({ pressedKeys }: { pressedKeys: Set<string> }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: '100%',
            fontSize: '1.25rem',
        }}>
            {ROLES.map((role, idx) => {
                const km = KEYMAPS[idx]
                const keys: { code: string; label: string }[] = [
                    { code: km.left, label: KEY_LABELS[km.left] ?? km.left },
                    { code: km.action, label: KEY_LABELS[km.action] ?? km.action },
                    { code: km.right, label: KEY_LABELS[km.right] ?? km.right },
                ]
                return (
                    <div key={role} style={{ display: 'flex', gap: '0.5rem' }}>
                        {keys.map((k) => {
                            const down = pressedKeys.has(k.code)
                            return (
                                <span key={k.code} style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minWidth: '2.5rem',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '0.25rem',
                                    border: '2px solid #333',
                                    backgroundColor: down ? ROLE_COLORS[role] : 'transparent',
                                    color: '#222',
                                    transition: 'background-color 0.1s',
                                    fontSize: '1.25rem',
                                }}>
                                    {k.label}
                                </span>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

function Box({ gameState }: { gameState: GameState }) {
    const baseColor = BOX.COLOR
    const rimColor = gameState.boxFlash === 'correct'
        ? BOX.COLOR_CORRECT
        : gameState.boxFlash === 'wrong'
            ? BOX.COLOR_WRONG
            : BOX.COLOR

    const baseTop = GROUND_TOP - BOX.BASE_HEIGHT
    const uprightTop = baseTop - BOX.UPRIGHT_HEIGHT

    const bar = (backgroundColor: string) => ({
        position: 'absolute' as const,
        backgroundColor,
        transition: 'background-color 0.2s',
    })

    return (
        <>
            {/* base pole — does not flash */}
            <div style={{
                ...bar(baseColor),
                left: `${BOX.X - BOX.BAR_THICKNESS / 2}px`,
                top: `${baseTop}px`,
                width: `${BOX.BAR_THICKNESS}px`,
                height: `${BOX.BASE_HEIGHT}px`,
            }} />
            {/* crossbar — rim */}
            <div style={{
                ...bar(rimColor),
                left: `${BOX.X - BOX.RIM_WIDTH / 2}px`,
                top: `${baseTop}px`,
                width: `${BOX.RIM_WIDTH}px`,
                height: `${BOX.BAR_THICKNESS}px`,
            }} />
            {/* left upright — rim */}
            <div style={{
                ...bar(rimColor),
                left: `${BOX.X - BOX.RIM_WIDTH / 2}px`,
                top: `${uprightTop}px`,
                width: `${BOX.BAR_THICKNESS}px`,
                height: `${BOX.UPRIGHT_HEIGHT}px`,
            }} />
            {/* right upright — rim */}
            <div style={{
                ...bar(rimColor),
                left: `${BOX.X + BOX.RIM_WIDTH / 2 - BOX.BAR_THICKNESS}px`,
                top: `${uprightTop}px`,
                width: `${BOX.BAR_THICKNESS}px`,
                height: `${BOX.UPRIGHT_HEIGHT}px`,
            }} />
        </>
    )
}
