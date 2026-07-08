import type { BoardTile, DominoTile } from '../types'

type SnakeDirection =
  | 'right'
  | 'down'
  | 'left'

interface SnakeState {
  board: BoardTile[]
  leftEnd: number | null
  rightEnd: number | null

  row: number
  col: number

  direction: SnakeDirection

  maxCols: number
}

export function createSnakeState(): SnakeState {
  return {
    board: [],

    leftEnd: null,
    rightEnd: null,

    row: 0,
    col: 0,

    direction: 'right',

    // عدد القطع في السطر قبل الانعطاف
    maxCols: 6,
  }
}


function getNextPosition(
  state: SnakeState
) {
  let {
    row,
    col,
    direction,
  } = state


  if (direction === 'right') {

    col++

    if (col >= state.maxCols) {
      direction = 'down'
      row++
    }

  } else if (direction === 'down') {

    row++
    direction = 'left'

  } else if (direction === 'left') {

    col--

    if (col <= 0) {
      direction = 'down'
      row++
    }
  }


  return {
    row,
    col,
    direction,
  }
}


function rotationForDirection(
  direction: SnakeDirection
) {

  switch(direction) {
    case 'right':
      return 90

    case 'left':
      return 90

    case 'down':
      return 0
  }
}


export function addSnakeTile(
  state: SnakeState,
  tile: DominoTile
): SnakeState {


  if (state.board.length === 0) {

    state.board.push({
      tile,
      x: 0,
      y: 0,
      rotation: 90,
      direction: 'right',
    })

    state.leftEnd = tile.left
    state.rightEnd = tile.right

    tile.played = true

    return state
  }


  const next =
    getNextPosition(state)


  state.row = next.row
  state.col = next.col
  state.direction = next.direction


  state.board.push({

    tile,

    x: next.col,

    y: next.row,

    rotation:
      rotationForDirection(
        next.direction
      ),

    direction:
      next.direction === 'left'
        ? 'left'
        : 'right',
  })


  state.rightEnd = tile.right

  tile.played = true


  return state
}
