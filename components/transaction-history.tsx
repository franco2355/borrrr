"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  History,
  ExternalLink,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  TrendingUp,
  TrendingDown,
  Shield,
  Key,
} from "lucide-react"
import { useTransactionHistory, type Transaction } from "@/hooks/use-transaction-history"
import { useChainId } from "wagmi"
import { shortenHash, getExplorerUrl, formatTokenAmount } from "@/lib/staking-utils"

const getTransactionIcon = (type: Transaction["type"]) => {
  switch (type) {
    case "approve":
      return Key
    case "stake":
      return TrendingUp
    case "unstake":
      return TrendingDown
    case "emergency_withdraw":
      return Shield
    default:
      return Clock
  }
}

const getTransactionLabel = (type: Transaction["type"]) => {
  switch (type) {
    case "approve":
      return "Token Approval"
    case "stake":
      return "Stake Tokens"
    case "unstake":
      return "Unstake Tokens"
    case "emergency_withdraw":
      return "Emergency Withdraw"
    default:
      return "Transaction"
  }
}

const getStatusBadge = (status: Transaction["status"]) => {
  switch (status) {
    case "pending":
      return (
        <Badge variant="secondary" className="gap-1">
          <Clock className="h-3 w-3" />
          Pending
        </Badge>
      )
    case "confirming":
      return (
        <Badge variant="secondary" className="gap-1">
          <Loader2 className="h-3 w-3 animate-spin" />
          Confirming
        </Badge>
      )
    case "success":
      return (
        <Badge className="bg-green-500/20 text-green-500 gap-1">
          <CheckCircle className="h-3 w-3" />
          Success
        </Badge>
      )
    case "failed":
      return (
        <Badge variant="destructive" className="gap-1">
          <XCircle className="h-3 w-3" />
          Failed
        </Badge>
      )
    default:
      return null
  }
}

export function TransactionHistory() {
  const { transactions, clearHistory, error } = useTransactionHistory()
  const chainId = useChainId()
  const [showAll, setShowAll] = useState(false)

  const displayTransactions = showAll ? transactions : transactions.slice(0, 5)

  if (transactions.length === 0) {
    return (
      <Card className="glass p-6">
        <div className="text-center">
          <History className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <h3 className="font-semibold mb-1">No Transaction History</h3>
          <p className="text-sm text-muted-foreground">Your transactions will appear here</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="glass p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5" />
          <h3 className="font-semibold">Transaction History</h3>
          <Badge variant="secondary">{transactions.length}</Badge>
        </div>
        <div className="flex items-center gap-2">
          {transactions.length > 5 && (
            <Button variant="ghost" size="sm" onClick={() => setShowAll(!showAll)} className="text-xs">
              {showAll ? "Show Less" : "Show All"}
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearHistory}
            className="text-xs text-destructive hover:text-destructive"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <ScrollArea className={showAll ? "h-96" : "h-auto"}>
        <div className="space-y-3">
          {displayTransactions.map((transaction) => {
            const Icon = getTransactionIcon(transaction.type)
            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{getTransactionLabel(transaction.type)}</span>
                      {transaction.amount && (
                        <span className="text-xs text-muted-foreground">{formatTokenAmount(transaction.amount)}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">{shortenHash(transaction.hash)}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(transaction.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {getStatusBadge(transaction.status)}
                  <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
                    <a href={getExplorerUrl(transaction.hash, chainId)} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </ScrollArea>

      {error && <div className="mt-3 p-2 rounded-md bg-destructive/10 text-destructive text-xs">{error}</div>}
    </Card>
  )
}
