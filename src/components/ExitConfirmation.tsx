import React from 'react'

interface Props {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function ExitConfirmation({
  open,
  onConfirm,
  onCancel,
}: Props) {

  if (!open) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-[#1a1a2e] rounded-xl p-6 text-white w-80 text-center shadow-xl">

        <h2 className="text-xl font-bold mb-4">
          الخروج من اللعبة؟
        </h2>

        <p className="text-white/70 mb-6">
          سيتم فقدان التقدم الحالي
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-600"
          >
            إلغاء
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600"
          >
            خروج
          </button>
        </div>

      </div>
    </div>
  )
}
