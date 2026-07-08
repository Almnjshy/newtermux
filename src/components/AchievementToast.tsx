interface Props {
  title?: string
  message?: string
  icon?: string
  onClose?: () => void
}

export default function AchievementToast({
  title = 'إنجاز جديد',
  message = '',
  icon = '🏆',
  onClose,
}: Props) {
  return (
    <div className="fixed top-5 right-5 z-50 bg-yellow-900/90 text-white rounded-xl p-4 shadow-xl border border-yellow-400">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{icon}</span>

        <div>
          <div className="font-bold text-lg">
            {title}
          </div>

          <div className="text-sm opacity-80">
            {message}
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="ml-3"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}
