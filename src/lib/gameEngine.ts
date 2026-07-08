import { DominoTile, Player, GameState, TileEnd, MoveResult, GameMode, BoardTile } from '@/types/game'
import { calculateSnakePosition as calculateNewSnakePosition } from '@/game/engine/snakeEngine'

// ============================================================
// BOARD ENDS + VALIDATION EXPORTS
// ============================================================
export const getBoardEnds = (board: BoardTile[]): { leftValue: number; rightValue: number } => {
  if (board.length === 0) {
    return { leftValue: -1, rightValue: -1 }
  }

  const first = board[0]
  const last = board[board.length - 1]

  return {
    leftValue: first.isLeft ? first.top : first.bottom,
    rightValue: last.isLeft ? last.bottom : last.top,
  }
}

export const canPlayTile = (
  tile: DominoTile,
  board: BoardTile[],
  end: TileEnd
): boolean => {
  if (board.length === 0) return true

  const { leftValue, rightValue } = getBoardEnds(board)

  return end === 'left'
    ? tile.top === leftValue || tile.bottom === leftValue
    : tile.top === rightValue || tile.bottom === rightValue
}

export const getValidEnds = (
  tile: DominoTile,
  board: BoardTile[]
): TileEnd[] => {
  if (board.length === 0) return ['left']

  const ends: TileEnd[] = []

  if (canPlayTile(tile, board, 'left')) {
    ends.push('left')
  }

  if (canPlayTile(tile, board, 'right')) {
    ends.push('right')
  }

  return ends
}

// ============================================================
// PLAY TILE
// ============================================================
export const playTile = (state: GameState, playerIndex: number, tileIndex: number, end: TileEnd): MoveResult => {
  const player = state.players[playerIndex]
  const tile = player.hand[tileIndex]

  if (!tile) return { valid: false, message: 'Invalid tile' }
  if (!canPlayTile(tile, state.board, end)) {
    return { valid: false, message: 'لا يمكن اللعب بهذه القطعة هنا' }
  }

  const position = calculateNewSnakePosition(
    state.board,
    end,
    tile,
    state.snakeDirection,
    state.snakeRow,
    state.snakeCol,
    state.snakeDirection,
    state.snakeRow,
    state.snakeCol
  )

  const { leftValue, rightValue } = getBoardEnds(state.board)
  const connectValue = end === 'left' ? leftValue : rightValue
  const needsFlip = tile.top !== connectValue

  const playedTile: BoardTile = {
    ...tile,
    row: position.row,
    col: position.col,
    rotation: position.rotation,
    isLeft: position.isLeft,
    direction: position.direction,
    top: needsFlip ? tile.bottom : tile.top,
    bottom: needsFlip ? tile.top : tile.bottom,
  }

  const newBoard = end === 'left'
    ? [playedTile, ...state.board]
    : [...state.board, playedTile]

  const newHand = [...player.hand]
  newHand.splice(tileIndex, 1)

  const newPlayers = [...state.players]
  newPlayers[playerIndex] = { ...player, hand: newHand }

  const allFivesScore = calculateAllFivesScore(newBoard)
  if (allFivesScore > 0) {
    newPlayers[playerIndex] = {
      ...newPlayers[playerIndex],
      score: newPlayers[playerIndex].score + allFivesScore
    }
  }

  // حالة الفوز
  if (newHand.length === 0) {
    return {
      valid: true,
      newState: {
        ...state,
        board: newBoard,
        players: newPlayers,
        isGameOver: true,
        winner: newPlayers[playerIndex],
        isBlocked: false,
        lastMove: { playerId: player.id, tile: playedTile, end },
        ...(end === 'left'
          ? {
              snakeDirection: position.direction,
              snakeRow: position.row,
              snakeCol: position.col,
            }
          : {
              snakeDirection: position.direction,
              snakeRow: position.row,
              snakeCol: position.col,
            }),
        maxRow: Math.max(state.maxRow, position.row),
        minRow: Math.min(state.minRow, position.row),
        maxCol: Math.max(state.maxCol, position.col),
        minCol: Math.min(state.minCol, position.col),
      }
    }
  }

  const nextPlayer = (playerIndex + 1) % state.players.length

  return {
    valid: true,
    newState: {
      ...state,
      board: newBoard,
      players: newPlayers,
      currentPlayerIndex: nextPlayer,
      lastMove: { playerId: player.id, tile: playedTile, end },
      ...(end === 'left'
        ? {
            snakeDirection: position.direction,
            snakeRow: position.row,
            snakeCol: position.col,
          }
        : {
            snakeDirection: position.direction,
            snakeRow: position.row,
            snakeCol: position.col,
          }),
      maxRow: Math.max(state.maxRow, position.row),
      minRow: Math.min(state.minRow, position.row),
      maxCol: Math.max(state.maxCol, position.col),
      minCol: Math.min(state.minCol, position.col),
    }
  }
}

// ============================================================
// DOMINO HELPERS (ADDED)
// ============================================================
const createDominoSet = (): DominoTile[] => {
  const tiles: DominoTile[] = []
  let id = 0
  for (let top = 0; top <= 6; top++) {
    for (let bottom = top; bottom <= 6; bottom++) {
      tiles.push({ id: String(id++), top, bottom } as DominoTile)
    }
  }
  return tiles.sort(() => Math.random() - 0.5)
}

const createPlayers = (names: string[], avatars: string[]): Player[] => {
  return names.map((name, index) => ({
    id: `player-${index}`,
    name,
    avatar: avatars[index] || '',
    hand: [],
    score: 0,
    isAI: index !== 0,
  }))
}

const dealTiles = (players: Player[], stock: DominoTile[]) => {
  const newPlayers = players.map(p => ({ ...p, hand: [] }))
  const newStock = [...stock]

  for (let round = 0; round < 7; round++) {
    for (const player of newPlayers) {
      const tile = newStock.pop()
      if (tile) player.hand.push(tile)
    }
  }

  return { players: newPlayers, stock: newStock }
}

const calculateAllFivesScore = (board: BoardTile[]): number => {
  const total = board.reduce((sum, tile) => sum + tile.top + tile.bottom, 0)
  return total > 0 && total % 5 === 0 ? total : 0
}

// ============================================================
// INITIALIZE GAME
// ============================================================
export const createInitialState = (playerNames: string[], playerAvatars: string[]): GameState => {
  const stock = createDominoSet()
  const players = createPlayers(playerNames, playerAvatars)
  const { players: dealtPlayers, stock: remainingStock } = dealTiles(players, stock)

  let starter = 0
  let highestDouble = -1
  for (let i = 0; i < dealtPlayers.length; i++) {
    for (const tile of dealtPlayers[i].hand) {
      if (tile.top === tile.bottom && tile.top > highestDouble) {
        highestDouble = tile.top
        starter = i
      }
    }
  }

  return {
    board: [],
    players: dealtPlayers,
    currentPlayerIndex: starter,
    stock: remainingStock,
    round: 1,
    isGameOver: false,
    winner: null,
    lastMove: null,
    isBlocked: false,
    snakeDirection: 'left',
    snakeRow: 0,
    snakeCol: 1,
    snakeDirection: 'right',
    snakeRow: 0,
    snakeCol: 1,
    maxRow: 0,
    minRow: 0,
    maxCol: 0,
    minCol: 0,
  }
}

// ============================================================
// BLOCK GAME HELPERS
// ============================================================
export const canPlayerPlay = (player: Player, board: BoardTile[]): boolean => {
  return player.hand.some(tile => getValidEnds(tile, board).length > 0)
}

export const isGameBlocked = (state: GameState): boolean => {
  return state.players.every(player => !canPlayerPlay(player, state.board))
}

export const getBlockedWinner = (state: GameState): Player | null => {
  let winner: Player | null = null
  let lowestScore = Infinity
  for (const player of state.players) {
    const score = player.hand.reduce((sum, tile) => sum + tile.top + tile.bottom, 0)
    if (score < lowestScore) {
      lowestScore = score