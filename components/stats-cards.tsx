"use client"

import { Card } from "@/components/ui/card"
import { Wallet, TrendingUp, DollarSign, Percent, Loader2 } from "lucide-react"
import {
  useFormattedTokenBalance,
  useFormattedUserStakingInfo,
  useFormattedStakingStats,
} from "@/hooks/use-contract-reads"
import { formatTokenAmount } from "@/lib/staking-utils"

export function StatsCards() {
  const { data: balance, isLoading: balanceLoading } = useFormattedTokenBalance()
  const { data: userInfo, isLoading: userInfoLoading } = useFormattedUserStakingInfo()
  const { data: stats, isLoading: statsLoading } = useFormattedStakingStats()

  const cards = [
    {
      title: "Token Balance",
      value: balance ? formatTokenAmount(balance) : "0",
      icon: Wallet,
      loading: balanceLoading,
      className: "border-blue-500/50 bg-blue-500/10",
      iconClassName: "text-blue-500",
    },
    {
      title: "Staked Amount",
      value: userInfo ? formatTokenAmount(userInfo.stakedAmount) : "0",
      icon: TrendingUp,
      loading: userInfoLoading,
      className: "border-green-500/50 bg-green-500/10",
      iconClassName: "text-green-500",
    },
    {
      title: "Total TVL",
      value: stats ? formatTokenAmount(stats.totalStaked) : "0",
      icon: DollarSign,
      loading: statsLoading,
      className: "border-purple-500/50 bg-purple-500/10",
      iconClassName: "text-purple-500",
    },
    {
      title: "APY",
      value: "12.5%", // This would be calculated from protocol data
      icon: Percent,
      loading: false,
      className: "border-orange-500/50 bg-orange-500/10",
      iconClassName: "text-orange-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.title} className={`glass p-4 ${card.className}`}>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
              <div className="flex items-center gap-2">
                {card.loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <p className="text-2xl font-bold">{card.value}</p>
                )}
              </div>
            </div>
            <card.icon className={`h-8 w-8 ${card.iconClassName}`} />
          </div>
        </Card>
      ))}
    </div>
  )
}
