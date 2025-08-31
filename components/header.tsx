"use client"

import { WalletConnection } from "./wallet-connection"
import { Badge } from "@/components/ui/badge"
import { Layers3 } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <Layers3 className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-balance">Symbiotic Staking</h1>
              <Badge variant="secondary" className="w-fit text-xs">
                Beta
              </Badge>
            </div>
          </div>
          <WalletConnection />
        </div>
      </div>
    </header>
  )
}
