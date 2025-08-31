"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Loader2 } from "lucide-react"
import { useTransactionHistory } from "@/hooks/use-transaction-history"

export function TransactionQueue() {
  const { getPendingTransactions } = useTransactionHistory()
  const pendingTransactions = getPendingTransactions()

  if (pendingTransactions.length === 0) {
    return null
  }

  return (
    <Card className="glass border-blue-500/50 bg-blue-500/10 p-4">
      <div className="flex items-center gap-3 mb-3">
        <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
        <h3 className="font-semibold">Transaction Queue</h3>
        <Badge variant="secondary">{pendingTransactions.length} pending</Badge>
      </div>

      <div className="space-y-3">
        {pendingTransactions.map((transaction, index) => (
          <div key={transaction.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20">
                <span className="text-xs font-medium text-blue-500">{index + 1}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {transaction.type === "approve"
                    ? "Token Approval"
                    : transaction.type === "stake"
                      ? "Stake Tokens"
                      : transaction.type === "unstake"
                        ? "Unstake Tokens"
                        : "Emergency Withdraw"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {transaction.status === "pending" ? "Waiting for confirmation" : "Confirming on blockchain"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {transaction.status === "pending" ? (
                <Clock className="h-4 w-4 text-orange-500" />
              ) : (
                <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Queue Progress</span>
          <span className="text-xs text-muted-foreground">
            {pendingTransactions.filter((tx) => tx.status === "confirming").length} / {pendingTransactions.length}{" "}
            confirming
          </span>
        </div>
        <Progress
          value={
            (pendingTransactions.filter((tx) => tx.status === "confirming").length / pendingTransactions.length) * 100
          }
          className="h-2"
        />
      </div>
    </Card>
  )
}
