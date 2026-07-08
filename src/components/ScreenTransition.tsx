import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function ScreenTransition({ children }: Props) {
  return (
    <div
      className="animate-in fade-in duration-300 w-full h-full"
    >
      {children}
    </div>
  )
}
