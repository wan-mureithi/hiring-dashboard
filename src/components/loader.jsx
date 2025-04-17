import React from 'react'
import { LoaderIcon } from 'lucide-react'

function Loader({ size = 32, label = 'Loading...' }) {
  return (
    <div className="flex flex-col h-full items-center justify-center gap-2 text-muted-foreground py-6">
      <LoaderIcon className="animate-spin" size={size} />
      <span className="text-sm">{label}</span>
    </div>
  )
}

export default Loader
