import { toRem } from '../../utils/toRem'

export type Action = 'up' | 'down' | 'left' | 'right'
    | 'up-left' | 'down-left' | 'up-right' | 'down-right' | 'idle' | 'space'

export type Role = 'S' | 'O' | 'V'

export const ROLE_COLORS: Record<Role, string> = {
    S: '#03AED2',
    O: '#FEFD99',
    V: '#FCB7C7',
}

export const ROLES: Role[] = ['S', 'O', 'V']

export type Player = {
    id: number
    type: Role
    x: number
    y: number
    width: number
    height: number
    scale: number
    action: Action
    facing: 'left' | 'right'
    holding: boolean
    heldPieceId: number | null
}

export type PieceState = 'onGround' | 'held' | 'flying'

export type Piece = {
    id: number
    word: string
    type: Role
    x: number
    y: number
    vx: number
    vy: number
    state: PieceState
}

export type SubmittedSlots = Record<Role, string[]>

export type BoxFlash = 'none' | 'correct' | 'wrong'

export type GameState = {
    players: Player[]
    pieces: Piece[]
    submittedSlots: SubmittedSlots
    boxFlash: BoxFlash
    frozen: boolean
    sceneState: {
        level: number
        complete: boolean
        phase: 'intro' | 'tutorial' | 'ready' | 'playing'
        timer: number
    }
}

const HEIGHT: number = 70
const WIDTH: number = 40

export const GROUND_TOP: number = 640
export const PLAYER_Y: number = GROUND_TOP - HEIGHT

// Physics
export const GRAVITY = 0.8
export const THROW_VX = 14
export const THROW_VY = -14

// Football-goal-shaped box
export const BOX = {
    X: 1350,
    BASE_HEIGHT: 150,
    RIM_WIDTH: 200,
    UPRIGHT_HEIGHT: 50,
    BAR_THICKNESS: 8,
    HIT_RADIUS: 60,
    COLOR: 'white',
    COLOR_CORRECT: '#2ecc71',
    COLOR_WRONG: '#e74c3c',
}

// Per-player keybindings. Index matches player id.
export type Keymap = { left: string; right: string; action: string }
export const KEYMAPS: Keymap[] = [
    { left: 'KeyA', right: 'KeyD', action: 'KeyW' },                 // player 0 — S
    { left: 'KeyB', right: 'KeyM', action: 'KeyH' },                 // player 1 — O
    { left: 'ArrowLeft', right: 'ArrowRight', action: 'ArrowUp' },   // player 2 — V
]

const makePlayer = (id: number, type: Role, x: number): Player => ({
    id,
    type,
    x,
    y: PLAYER_Y,
    width: toRem(WIDTH),
    height: toRem(HEIGHT),
    scale: 1,
    action: 'idle',
    facing: 'right',
    holding: false,
    heldPieceId: null,
})

export const initState = (): GameState => ({
    players: [
        makePlayer(0, 'S', 150),
        makePlayer(1, 'O', 300),
        makePlayer(2, 'V', 1050),
    ],
    pieces: [],
    submittedSlots: { S: [], O: [], V: [] },
    boxFlash: 'none',
    frozen: false,
    sceneState: {
        level: 1,
        complete: false,
        phase: 'intro',
        timer: 0,
    },
})
