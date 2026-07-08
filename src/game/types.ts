export type PlayerId = 0 | 1 | 2 | 3

export interface DominoTile {
  id: string
  left: number
  right: number
  played: boolean
}

export interface Player {
  id: PlayerId
  name: string
  hand: DominoTile[]
}

export type BoardDirection =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'

export interface BoardTile {
  tile: DominoTile
  x: number
  y: number
  rotation: number
  direction: BoardDirection
}

export interface GameState {
  players: Player[]
  board: BoardTile[]
  currentPlayer: PlayerId
  leftEnd: number | null
  rightEnd: number | null
  turn: number
}
