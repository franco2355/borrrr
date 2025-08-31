"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, Clock, Award, Target } from "lucide-react"
import { useFormattedUserStakingInfo, useFormattedTokenBalance } from "@/hooks/use-contract-reads"
import { formatTokenAmount } from "@/lib/staking-utils"

export function UserDashboard() {
  const { data: userInfo } = useFormattedUserStakingInfo()
  const { data: balance } = useFormattedTokenBalance()

  const totalBalance = userInfo && balance ? Number.parseFloat(userInfo.stakedAmount) + Number.parseFloat(balance) : 0

  const stakingRatio =
    totalBalance > 0 && userInfo ? (Number.parseFloat(userInfo.stakedAmount) / totalBalance) * 100 : 0

  return (
    <Card className="glass p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
          <Award className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Your Staking Overview</h2>
          <p className="text-sm text-muted-foreground">Track your staking performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Total Portfolio</p>
          <p className="text-2xl font-bold">{formatTokenAmount(totalBalance.toString())}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Staked Amount</p>
          <p className="text-2xl font-bold text-green-500">
            {userInfo ? formatTokenAmount(userInfo.stakedAmount) : "0"}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Your Shares</p>
          <p className="text-2xl font-bold text-purple-500">{userInfo ? formatTokenAmount(userInfo.shares) : "0"}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Staking Ratio</span>
            <span className="text-sm text-muted-foreground">{stakingRatio.toFixed(1)}%</span>
          </div>
          <Progress value={stakingRatio} className="h-2" />
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <div>
              <p className="text-sm font-medium">Estimated Rewards</p>
              <p className="text-xs text-muted-foreground">Next 30 days</p>
            </div>
            <Badge variant="secondary" className="ml-auto">
              +{userInfo ? ((Number.parseFloat(userInfo.stakedAmount) * 0.125) / 12).toFixed(4) : "0"}
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Staking Duration</p>
              <p className="text-xs text-muted-foreground">Since first stake</p>
            </div>
            <Badge variant="secondary" className="ml-auto">
              42 days
            </Badge>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium">Staking Goal</span>
          </div>
          <Badge variant="outline">1,000 tokens</Badge>
        </div>
      </div>
    </Card>
  )
}
