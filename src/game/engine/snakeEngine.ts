import type { BoardTile, DominoTile, TileEnd } from '@/types/game'

type Direction = 'right' | 'left' | 'down'

interface SnakePosition {
  row: number
  col: number
  rotation: number
  isLeft: boolean
  direction: Direction
}

const MAX_TILES_ROW = 6

export function calculateSnakePosition(
  board: BoardTile[],
  end: TileEnd,
  tile: DominoTile,
  leftDirection: Direction,
  leftRow: number,
  leftCol: number,
  rightDirection: Direction,
  rightRow: number,
  rightCol: number
): SnakePosition {

  // أول قطعة
  if (board.length === 0) {
    return {
      row: 0,
      col: 0,
      rotation: 90,
      isLeft: true,
      direction: 'right'
    }
  }

  let row: number
  let col: number
  let direction: Direction

  // =========================================
  // الطرف الأيمن
  // =========================================
  if (end === 'right') {

    row = rightRow
    col = rightCol
    direction = rightDirection

    if (direction === 'right') {
      col++

      if (col >= MAX_TILES_ROW) {
        row++
        direction = 'left'
      }

    } else if (direction === 'left') {

      col--

      if (col <= 0) {
        row++
        direction = 'right'
      }

    } else {

      col++
      direction = 'right'
    }

  }

  // =========================================
  // الطرف الأيسر
  // =========================================
  else {

    row = leftRow
    col = leftCol
    direction = leftDirection

    if (direction === 'right') {

      col--
      
      if (col < 0) {
        row++
        direction = 'left'
      }

    } else if (direction === 'left') {

      col++

      if (col >= MAX_TILES_ROW) {
        row++
        direction = 'right'
      }

    } else {

      col--
      direction = 'left'
    }
  }


  let rotation = 90

  if (direction === 'down') {
    rotation = 0
  }


  return {
    row,
    col,
    rotation,
    isLeft: end === 'left',
    direction
  }
}
