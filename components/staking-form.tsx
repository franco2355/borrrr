"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, TrendingUp, TrendingDown, Calculator } from "lucide-react"
import { TransactionStatus } from "./transaction-status"
import {
  useFormattedTokenBalance,
  useTokenAllowance,
  useFormattedUserStakingInfo,
  useFormattedStakingStats,
} from "@/hooks/use-contract-reads"
import { useApproveToken, useStakeTokens, useUnstakeTokens, useEmergencyWithdraw } from "@/hooks/use-contract-writes"
import {
  calculateStakingFee,
  calculateNetAmount,
  isValidAmount,
  isValidShares,
  formatTokenAmount,
  formatPercentage,
} from "@/lib/staking-utils"
import { parseUnits } from "viem"

export function StakingForm() {
  const { isConnected } = useAccount()
  const [stakeAmount, setStakeAmount] = useState("")
  const [unstakeShares, setUnstakeShares] = useState("")

  // Contract reads
  const { data: balance } = useFormattedTokenBalance()
  const { data: allowance } = useTokenAllowance()
  const { data: userInfo } = useFormattedUserStakingInfo()
  const { data: stats } = useFormattedStakingStats()

  // Contract writes
  const approveToken = useApproveToken()
  const stakeTokens = useStakeTokens()
  const unstakeTokens = useUnstakeTokens()
  const emergencyWithdraw = useEmergencyWithdraw()

  // Reset forms on successful transactions
  useEffect(() => {
    if (stakeTokens.isSuccess) {
      setStakeAmount("")
    }
  }, [stakeTokens.isSuccess])

  useEffect(() => {
    if (unstakeTokens.isSuccess) {
      setUnstakeShares("")
    }
  }, [unstakeTokens.isSuccess])

  const needsApproval = (amount: string) => {
    if (!allowance || !amount) return false
    try {
      const amountBigInt = parseUnits(amount, 18)
      return allowance < amountBigInt
    } catch {
      return false
    }
  }

  const handleStake = () => {
    if (needsApproval(stakeAmount)) {
      approveToken.approve(stakeAmount)
    } else {
      stakeTokens.stake(stakeAmount)
    }
  }

  const handleUnstake = () => {
    unstakeTokens.unstake(unstakeShares)
  }

  const handleMaxStake = () => {
    if (balance) {
      setStakeAmount(balance)
    }
  }

  const handleMaxUnstake = () => {
    if (userInfo?.shares) {
      setUnstakeShares(userInfo.shares)
    }
  }

  const stakingFee = stats ? calculateStakingFee(stakeAmount || "0", stats.stakingFee) : "0"
  const netStakeAmount = stats ? calculateNetAmount(stakeAmount || "0", stats.stakingFee) : "0"
  const unstakingFee = stats ? calculateStakingFee(unstakeShares || "0", stats.unstakingFee) : "0"
  const netUnstakeAmount = stats ? calculateNetAmount(unstakeShares || "0", stats.unstakingFee) : "0"

  const isStakeValid =
    balance &&
    stats &&
    isValidAmount(stakeAmount, balance) &&
    Number.parseFloat(stakeAmount) >= Number.parseFloat(stats.minStakeAmount)
  const isUnstakeValid = userInfo && isValidShares(unstakeShares, userInfo.shares)

  if (!isConnected) {
    return (
      <Card className="glass p-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
          <p className="text-muted-foreground">Please connect your wallet to start staking</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {stats?.emergencyMode && (
        <Card className="border-orange-500/50 bg-orange-500/10 p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <div className="flex-1">
              <h4 className="font-semibold text-orange-500">Emergency Mode Active</h4>
              <p className="text-sm text-orange-500/80">
                Normal staking is disabled. You can only withdraw your funds.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={emergencyWithdraw.emergencyWithdraw}
              disabled={emergencyWithdraw.isPending || emergencyWithdraw.isConfirming}
              className="border-orange-500 text-orange-500 hover:bg-orange-500/10 bg-transparent"
            >
              {emergencyWithdraw.isPending || emergencyWithdraw.isConfirming ? "Withdrawing..." : "Emergency Withdraw"}
            </Button>
          </div>
        </Card>
      )}

      <Card className="glass p-6">
        <Tabs defaultValue="stake" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="stake" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Stake
            </TabsTrigger>
            <TabsTrigger value="unstake" className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4" />
              Unstake
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stake" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="stake-amount">Amount to Stake</Label>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Balance: {formatTokenAmount(balance || "0")}</span>
                  <Button variant="ghost" size="sm" onClick={handleMaxStake} className="h-6 px-2 text-xs">
                    MAX
                  </Button>
                </div>
              </div>
              <Input
                id="stake-amount"
                type="number"
                placeholder="0.0"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="text-lg"
                disabled={stats?.emergencyMode}
              />
              {stats && (
                <p className="text-xs text-muted-foreground">
                  Minimum stake: {formatTokenAmount(stats.minStakeAmount)}
                </p>
              )}
            </div>

            {stakeAmount && stats && (
              <Card className="gradient-card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Calculator className="h-4 w-4" />
                  <span className="font-medium text-sm">Transaction Summary</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Stake Amount:</span>
                    <span>{formatTokenAmount(stakeAmount)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Staking Fee ({formatPercentage(stats.stakingFee)}):</span>
                    <span>-{formatTokenAmount(stakingFee)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Net Staked:</span>
                    <span>{formatTokenAmount(netStakeAmount)}</span>
                  </div>
                </div>
              </Card>
            )}

            <Button
              onClick={handleStake}
              disabled={
                !isStakeValid ||
                approveToken.isPending ||
                approveToken.isConfirming ||
                stakeTokens.isPending ||
                stakeTokens.isConfirming ||
                stats?.emergencyMode
              }
              className="w-full"
              size="lg"
            >
              {approveToken.isPending || approveToken.isConfirming
                ? "Approving..."
                : stakeTokens.isPending || stakeTokens.isConfirming
                  ? "Staking..."
                  : needsApproval(stakeAmount)
                    ? "Approve"
                    : "Stake"}
            </Button>
          </TabsContent>

          <TabsContent value="unstake" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="unstake-shares">Shares to Unstake</Label>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Available: {formatTokenAmount(userInfo?.shares || "0")}</span>
                  <Button variant="ghost" size="sm" onClick={handleMaxUnstake} className="h-6 px-2 text-xs">
                    MAX
                  </Button>
                </div>
              </div>
              <Input
                id="unstake-shares"
                type="number"
                placeholder="0.0"
                value={unstakeShares}
                onChange={(e) => setUnstakeShares(e.target.value)}
                className="text-lg"
              />
            </div>

            {unstakeShares && stats && (
              <Card className="gradient-card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Calculator className="h-4 w-4" />
                  <span className="font-medium text-sm">Transaction Summary</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Unstake Shares:</span>
                    <span>{formatTokenAmount(unstakeShares)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Unstaking Fee ({formatPercentage(stats.unstakingFee)}):</span>
                    <span>-{formatTokenAmount(unstakingFee)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Net Received:</span>
                    <span>{formatTokenAmount(netUnstakeAmount)}</span>
                  </div>
                </div>
              </Card>
            )}

            <Button
              onClick={handleUnstake}
              disabled={!isUnstakeValid || unstakeTokens.isPending || unstakeTokens.isConfirming}
              className="w-full"
              size="lg"
            >
              {unstakeTokens.isPending || unstakeTokens.isConfirming ? "Unstaking..." : "Unstake"}
            </Button>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Transaction Status */}
      <div className="space-y-3">
        <TransactionStatus
          hash={approveToken.hash}
          isPending={approveToken.isPending}
          isConfirming={approveToken.isConfirming}
          isSuccess={approveToken.isSuccess}
          error={approveToken.error}
          title="Token Approval"
        />
        <TransactionStatus
          hash={stakeTokens.hash}
          isPending={stakeTokens.isPending}
          isConfirming={stakeTokens.isConfirming}
          isSuccess={stakeTokens.isSuccess}
          error={stakeTokens.error}
          title="Stake Transaction"
        />
        <TransactionStatus
          hash={unstakeTokens.hash}
          isPending={unstakeTokens.isPending}
          isConfirming={unstakeTokens.isConfirming}
          isSuccess={unstakeTokens.isSuccess}
          error={unstakeTokens.error}
          title="Unstake Transaction"
        />
        <TransactionStatus
          hash={emergencyWithdraw.hash}
          isPending={emergencyWithdraw.isPending}
          isConfirming={emergencyWithdraw.isConfirming}
          isSuccess={emergencyWithdraw.isSuccess}
          error={emergencyWithdraw.error}
          title="Emergency Withdrawal"
        />
      </div>
    </div>
  )
}
