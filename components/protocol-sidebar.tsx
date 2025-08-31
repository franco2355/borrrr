"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Activity, Info, AlertTriangle, TrendingUp, Users, Clock, Loader2 } from "lucide-react"
import { useFormattedStakingStats } from "@/hooks/use-contract-reads"
import { formatTokenAmount, formatPercentage } from "@/lib/staking-utils"

export function ProtocolSidebar() {
  const { data: stats, isLoading } = useFormattedStakingStats()

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card className="glass p-4">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* APY Card */}
      <Card className="glass border-orange-500/50 bg-orange-500/10 p-4">
        <div className="flex items-center gap-3 mb-3">
          <TrendingUp className="h-5 w-5 text-orange-500" />
          <h3 className="font-semibold">Current APY</h3>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-orange-500">12.5%</p>
          <p className="text-sm text-muted-foreground mt-1">Annual Percentage Yield</p>
        </div>
      </Card>

      {/* Network Health */}
      <Card className="glass p-4">
        <div className="flex items-center gap-3 mb-3">
          <Activity className="h-5 w-5 text-green-500" />
          <h3 className="font-semibold">Network Health</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Status</span>
            <Badge className="bg-green-500/20 text-green-500">{stats?.emergencyMode ? "Emergency" : "Healthy"}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Uptime</span>
            <span className="text-sm font-medium">99.9%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Active Validators</span>
            <span className="text-sm font-medium">1,247</span>
          </div>
        </div>
      </Card>

      {/* Protocol Stats */}
      <Card className="glass p-4">
        <div className="flex items-center gap-3 mb-3">
          <Users className="h-5 w-5 text-blue-500" />
          <h3 className="font-semibold">Protocol Stats</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Total Staked</span>
            <span className="text-sm font-medium">{stats ? formatTokenAmount(stats.totalStaked) : "0"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Total Shares</span>
            <span className="text-sm font-medium">{stats ? formatTokenAmount(stats.totalShares) : "0"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Active Stakers</span>
            <span className="text-sm font-medium">2,847</span>
          </div>
        </div>
      </Card>

      {/* Fee Information */}
      <Card className="glass p-4">
        <div className="flex items-center gap-3 mb-3">
          <Info className="h-5 w-5 text-purple-500" />
          <h3 className="font-semibold">Fee Information</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Staking Fee</span>
            <span className="text-sm font-medium">{stats ? formatPercentage(stats.stakingFee) : "0%"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Unstaking Fee</span>
            <span className="text-sm font-medium">{stats ? formatPercentage(stats.unstakingFee) : "0%"}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-sm">Min. Stake</span>
            <span className="text-sm font-medium">{stats ? formatTokenAmount(stats.minStakeAmount) : "0"}</span>
          </div>
        </div>
      </Card>

      {/* Emergency Alert */}
      {stats?.emergencyMode && (
        <Card className="glass border-red-500/50 bg-red-500/10 p-4">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h3 className="font-semibold text-red-500">Emergency Mode</h3>
          </div>
          <p className="text-sm text-red-500/80">The protocol is in emergency mode. Only withdrawals are allowed.</p>
        </Card>
      )}

      {/* Recent Activity */}
      <Card className="glass p-4">
        <div className="flex items-center gap-3 mb-3">
          <Clock className="h-5 w-5 text-gray-500" />
          <h3 className="font-semibold">Recent Activity</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last stake</span>
            <span>2 min ago</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last unstake</span>
            <span>15 min ago</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Rewards updated</span>
            <span>1 hour ago</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
