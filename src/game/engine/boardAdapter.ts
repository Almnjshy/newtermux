import type { BoardTile as EngineBoardTile } from '../types'
import type { BoardTile, DominoTile } from '@/types/game'


export function convertTile(
  tile: EngineBoardTile
): BoardTile {

  const domino: DominoTile = {
    id: tile.tile.id,
    top: tile.tile.left,
    bottom: tile.tile.right,
  }

  return {
    ...domino,
    row: tile.y,
    col: tile.x,
    rotation:
      tile.rotation,
    isLeft:
      tile.direction === 'left',
  }
}


export function convertBoard(
  board: EngineBoardTile[]
): BoardTile[] {

  return board.map(convertTile)

}
