export type Difficulty = 'easy' | 'medium' | 'hard'
export type GameMode = 'classic' | 'points' | 'block' | 'allFives' | 'draw'
export type TimerMode = 'off' | 'blitz' | 'rapid' | 'custom'

export interface GameSettings {
  soundEnabled: boolean
  musicEnabled: boolean
  difficulty: Difficulty
  showHints: boolean
  gameMode: GameMode
  targetScore: number
  timerMode: TimerMode
  customTime: number
  aiCount: number
}

export interface GameRecord {
  id: string
  date: string
  playerName: string
  opponentName: string
  result: 'win' | 'loss' | 'draw'
  gameMode: GameMode
  difficulty: Difficulty
  rounds: number
  playerScore: number
  opponentScore: number
  targetScore?: number
  duration?: number
}

export interface LeaderboardEntry {
  name: stringتمام ✅ هذا هو ملف **`src/types/game.ts`** بعد التعديل بحيث يخزن الطرفين (يسار ويمين) بدلًا من اتجاه واحد فقط:

```ts
export type Difficulty = 'easy' | 'medium' | 'hard'
export type GameMode = 'classic' | 'points' | 'block' | 'allFives' | 'draw'
export type TimerMode = 'off' | 'blitz' | 'rapid' | 'custom'

export interface GameSettings {
  soundEnabled: boolean
  musicEnabled: boolean
  difficulty: Difficulty
  showHints: boolean
  gameMode: GameMode
  targetScore: number
  timerMode: TimerMode
  customTime: number
  aiCount: number
}

export interface GameRecord {
  id: string
  date: string
  playerName: string
  opponentName: string
  result: 'win' | 'loss' | 'draw'
  gameMode: GameMode
  difficulty: Difficulty
  rounds: number
  playerScore: number
  opponentScore: number
  targetScore?: number
  duration?: number
}

export interface LeaderboardEntry {
  name: string
  score: number
  avatar: string
  date: string
}

export interface Statistics {
  gamesPlayed: number
  gamesWon: number
  gamesLost: number
  totalScore: number
  highestScore: number
  totalTime: number
  bestTime: number
  draws: number
  winStreak: number
  bestWinStreak: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  condition: AchievementCondition
  unlockedAt: string | null
  progress: number
  maxProgress: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export interface AchievementCondition {
  type: 'wins' | 'games_played' | 'streak' | 'clean_win' | 'crushing_win' | 'moves' | 'draws' | 'comeback'
  value: number
}

export interface AchievementProgress {
  totalWins: number
  totalGames: number
  currentStreak: number
  bestStreak: number
  cleanWins: number
  crushingWins: number
  fastestWinMoves: number
  totalDraws: number
  comebacks: number
}

export interface MatchState {
  round: number
  playerScore: number
  aiScore: number
  targetScore: number
  scores: { player: number; ai: number }[]
  playerTotal: number
  opponentTotal: number
}

// ============================================================
// SNAKE BOARD POSITION TRACKING
// ============================================================
export interface BoardTile extends DominoTile {
  row: number
  col: number
  rotation: number
  isLeft: boolean
  direction?: 'right' | 'left' | 'down'
}

export interface DominoTile {
  top: number
  bottom: number
  id: string
}

export type TileEnd = 'left' | 'right'

export interface Player {
  id: string
  name: string
  avatar: string
  hand: DominoTile[]
  score: number
  isAI: boolean
}

export interface GameState {
  board: BoardTile[]
  players: Player[]
  currentPlayerIndex: number
  stock: DominoTile[]
  round: number
  isGameOver: boolean
  winner: Player | null
  lastMove: { playerId: string; tile: DominoTile; end: TileEnd } | null
  isBlocked: boolean

  // Snake layout tracking (real domino snake - both ends)
  leftSnakeDirection: 'right' | 'left' | 'down'
  leftSnakeRow: number
  leftSnakeCol: number

  rightSnakeDirection: 'right' | 'left' | 'down'
  rightSnakeRow: number
  rightSnakeCol: number

  maxRow: number
  minRow: number
  maxCol: number
  minCol: number
}

export const TIMER_CONFIG: Record<TimerMode, { time: number; label: string }> = {
  off: { time: 0, label: 'بدون' },
  blitz: { time: 15, label: 'سريع' },
  rapid: { time: 30, label: 'متوسط' },
  custom: { time: 0, label: 'مخصص' },
}

export const GAME_MODE_CONFIG: Record<GameMode, { label: string; desc: string }> = {
  classic: { label: 'كلاسيكي', desc: 'الأول ينتهي يفوز' },
  points: { label: 'نقاط', desc: 'وصل الهدف أولاً' },
  block: { label: 'بلوك', desc: 'منع الخصم' },
  allFives: { label: 'الخمسات', desc: 'مجموع 5 يعطي نقاط' },
  draw: { label: 'السحب', desc: 'اسحب من المخزون' },
}

export type Screen =
  | 'title' | 'menu' | 'levelSelect' | 'game' | 'matchEnd'
  | 'settings' | 'statistics' | 'achievements' | 'history'
  | 'profile' | 'leaderboard' | 'wifiGame' | 'onlineGame'
  | 'tournamentMenu' | 'tournamentCreate' | 'tournamentBracket'
  | 'tournamentGame' | 'tournamentHistory'
