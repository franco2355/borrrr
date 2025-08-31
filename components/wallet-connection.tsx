"use client"

import { useState } from "react"
import { useAccount, useConnect, useDisconnect, useChainId } from "wagmi"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Wallet, Copy, Check, ChevronDown, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const NETWORK_NAMES: Record<number, string> = {
  1: "Ethereum",
  11155111: "Sepolia",
  31337: "Hardhat",
}

export function WalletConnection() {
  const { address, isConnected, isConnecting } = useAccount()
  const { connect, connectors, error, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const handleCopyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (isConnected && address) {
    return (
      <Card className="glass p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
              <div className="h-2 w-2 rounded-full bg-green-500" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-medium">{formatAddress(address)}</span>
                <Button variant="ghost" size="sm" onClick={handleCopyAddress} className="h-6 w-6 p-0">
                  {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
              <Badge variant="secondary" className="w-fit text-xs">
                {NETWORK_NAMES[chainId] || `Chain ${chainId}`}
              </Badge>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => disconnect()} className="text-xs">
            Disconnect
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="glass p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Wallet className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium">Connect Wallet</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" size="sm" disabled={isConnecting || isPending} className="gap-2">
              {isConnecting || isPending ? "Connecting..." : "Connect"}
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {connectors.map((connector) => (
              <DropdownMenuItem key={connector.uid} onClick={() => connect({ connector })} className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  {connector.name}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {error && (
        <div className="mt-3 flex items-center gap-2 rounded-md bg-destructive/10 p-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          <span>{error.message}</span>
        </div>
      )}
    </Card>
  )
}
