import type { Achievement, AchievementProgress } from '@/types/game'

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_win',
    title: 'الفوز الأول',
    description: 'حقق أول فوز لك',
    icon: '🏆',
    condition: {
      type: 'wins',
      value: 1,
    },
    unlockedAt: null,
    progress: 0,
    maxProgress: 1,
    rarity: 'common',
  },
  {
    id: 'ten_wins',
    title: 'لاعب محترف',
    description: 'حقق 10 انتصارات',
    icon: '⭐',
    condition: {
      type: 'wins',
      value: 10,
    },
    unlockedAt: null,
    progress: 0,
    maxProgress: 10,
    rarity: 'rare',
  },
]

export function getAchievementProgress(
  progress: AchievementProgress
): Achievement[] {
  return ACHIEVEMENTS.map((achievement) => ({
    ...achievement,
    progress:
      achievement.condition.type === 'wins'
        ? progress.totalWins
        : 0,
    unlockedAt:
      achievement.condition.type === 'wins' &&
      progress.totalWins >= achievement.condition.value
        ? new Date().toISOString()
        : null,
  }))
}

export const DEFAULT_ACHIEVEMENTS = ACHIEVEMENTS

// ============================================================
// ACHIEVEMENT UI HELPERS
// ============================================================

export const getRarityColor = (
  rarity: Achievement['rarity']
): string => {
  switch (rarity) {
    case 'common':
      return 'text-gray-400'
    case 'rare':
      return 'text-blue-400'
    case 'epic':
      return 'text-purple-400'
    case 'legendary':
      return 'text-yellow-400'
    default:
      return 'text-white'
  }
}


export const getRarityBorder = (
  rarity: Achievement['rarity']
): string => {
  switch (rarity) {
    case 'common':
      return 'border-gray-400'
    case 'rare':
      return 'border-blue-400'
    case 'epic':
      return 'border-purple-400'
    case 'legendary':
      return 'border-yellow-400'
    default:
      return 'border-white'
  }
}


export const getRarityLabel = (
  rarity: Achievement['rarity']
): string => {
  switch (rarity) {
    case 'common':
      return 'شائع'
    case 'rare':
      return 'نادر'
    case 'epic':
      return 'ملحمي'
    case 'legendary':
      return 'أسطوري'
    default:
      return ''
  }
}
