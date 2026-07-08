import { DominoTile, Player, PlayerId } from '../types'

export function createDominoSet(): DominoTile[] {
  const tiles: DominoTile[] = []
  let id = 0

  for (let left = 0; left <= 6; left++) {
    for (let right = left; right <= 6; right++) {
      tiles.push({
        id: `tile-${id++}`,
        left,
        right,
        played: false,
      })
    }
  }

  return tiles
}

export function shuffleTiles(
  tiles: DominoTile[]
): DominoTile[] {
  return [...tiles].sort(() => Math.random() - 0.5)
}

export function dealTiles(
  tiles: DominoTile[]
): Player[] {
  const players: Player[] = [
    { id: 0, name: 'You', hand: [] },
    { id: 1, name: 'CPU 1', hand: [] },
    { id: 2, name: 'CPU 2', hand: [] },
    { id: 3, name: 'CPU 3', hand: [] },
  ]

  const shuffled = shuffleTiles(tiles)

  players.forEach((player) => {
    player.hand = shuffled.splice(0, 7)
  })

  return players
}

export function canPlayTile(
  tile: DominoTile,
  leftEnd: number | null,
  rightEnd: number | null
): boolean {

  if (leftEnd === null || rightEnd === null) {
    return true
  }

  return (
    tile.left === leftEnd ||
    tile.right === leftEnd ||
    tile.left === rightEnd ||
    tile.right === rightEnd
  )
}
