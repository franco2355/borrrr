"use client"

import { useChainId } from "wagmi"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Loader2, CheckCircle, XCircle } from "lucide-react"
import { shortenHash, getExplorerUrl } from "@/lib/staking-utils"

interface TransactionStatusProps {
  hash?: `0x${string}`
  isPending?: boolean
  isConfirming?: boolean
  isSuccess?: boolean
  error?: Error | null
  title?: string
}

export function TransactionStatus({
  hash,
  isPending,
  isConfirming,
  isSuccess,
  error,
  title = "Transaction",
}: TransactionStatusProps) {
  const chainId = useChainId()

  if (!hash && !isPending && !error) return null

  return (
    <Card className="glass p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isPending || isConfirming ? (
            <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
          ) : isSuccess ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : error ? (
            <XCircle className="h-5 w-5 text-red-500" />
          ) : null}

          <div className="flex flex-col">
            <span className="font-medium text-sm">{title}</span>
            {hash && <span className="font-mono text-xs text-muted-foreground">{shortenHash(hash)}</span>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isPending && <Badge variant="secondary">Pending</Badge>}
          {isConfirming && <Badge variant="secondary">Confirming</Badge>}
          {isSuccess && <Badge className="bg-green-500/20 text-green-500">Success</Badge>}
          {error && <Badge variant="destructive">Failed</Badge>}

          {hash && (
            <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
              <a href={getExplorerUrl(hash, chainId)} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </div>

      {error && <div className="mt-2 text-sm text-destructive">{error.message}</div>}
    </Card>
  )
}
