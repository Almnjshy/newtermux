import { create } from 'zustand'
import type { DominoTile, BoardTile, Player, PlayerId } from '@/game/types'

interface BoardStore {
  players: Player[]
  board: BoardTile[]
  currentPlayer: PlayerId

  leftEnd: number | null
  rightEnd: number | null

  setPlayers: (players: Player[]) => void

  playTile: (
    playerId: PlayerId,
    tile: DominoTile,
    side: 'left' | 'right'
  ) => void

  nextTurn: () => void

  resetBoard: () => void
}

export const useBoardStore = create<BoardStore>((set) => ({
  players: [],
  board: [],

  currentPlayer: 0,

  leftEnd: null,
  rightEnd: null,


  setPlayers: (players) =>
    set({
      players,
    }),


  playTile: (playerId, tile, side) =>
    set((state) => {

      const players = state.players.map((player) => {

        if (player.id !== playerId) {
          return player
        }

        return {
          ...player,
          hand: player.hand.filter(
            (item) => item.id !== tile.id
          ),
        }
      })


      const newBoardTile: BoardTile = {
        tile: {
          ...tile,
          played: true,
        },
        x: 0,
        y: 0,
        rotation: 0,
        direction: side,
      }


      return {
        players,
        board: [
          ...state.board,
          newBoardTile,
        ],

        leftEnd:
          side === 'left'
            ? tile.left
            : state.leftEnd ?? tile.left,

        rightEnd:
          side === 'right'
            ? tile.right
            : state.rightEnd ?? tile.right,
      }
    }),


  nextTurn: () =>
    set((state) => ({
      currentPlayer:
        ((state.currentPlayer + 1) % 4) as PlayerId,
    })),


  resetBoard: () =>
    set({
      players: [],
      board: [],
      currentPlayer: 0,
      leftEnd: null,
      rightEnd: null,
    }),
}))
