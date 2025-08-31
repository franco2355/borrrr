"use client"

import { useAccount, useChainId } from "wagmi"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Wifi, WifiOff } from "lucide-react"
import { useEffect, useState } from "react"

const SUPPORTED_NETWORKS = [1, 11155111, 31337] // Mainnet, Sepolia, Hardhat

export function NetworkStatus() {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (!isConnected) return null

  const isUnsupportedNetwork = !SUPPORTED_NETWORKS.includes(chainId)

  if (!isOnline) {
    return (
      <Card className="glass border-red-500/50 bg-red-500/10 p-4">
        <div className="flex items-center gap-3">
          <WifiOff className="h-5 w-5 text-red-500" />
          <div>
            <h4 className="font-semibold text-red-500">Connection Lost</h4>
            <p className="text-sm text-red-500/80">Please check your internet connection</p>
          </div>
        </div>
      </Card>
    )
  }

  if (isUnsupportedNetwork) {
    return (
      <Card className="glass border-orange-500/50 bg-orange-500/10 p-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          <div className="flex-1">
            <h4 className="font-semibold text-orange-500">Unsupported Network</h4>
            <p className="text-sm text-orange-500/80">Please switch to Ethereum, Sepolia, or Hardhat network</p>
          </div>
          <Badge variant="outline" className="border-orange-500 text-orange-500">
            Chain {chainId}
          </Badge>
        </div>
      </Card>
    )
  }

  return (
    <Card className="glass border-green-500/50 bg-green-500/10 p-4">
      <div className="flex items-center gap-3">
        <Wifi className="h-5 w-5 text-green-500" />
        <div className="flex-1">
          <h4 className="font-semibold text-green-500">Network Connected</h4>
          <p className="text-sm text-green-500/80">All systems operational</p>
        </div>
        <Badge className="bg-green-500/20 text-green-500">
          {chainId === 1 ? "Mainnet" : chainId === 11155111 ? "Sepolia" : "Hardhat"}
        </Badge>
      </div>
    </Card>
  )
}
