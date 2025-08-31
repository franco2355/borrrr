"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, TrendingUp, TrendingDown, Calculator, Info } from "lucide-react"
import { TransactionStatus } from "./transaction-status"
import { NetworkStatus } from "./network-status"
import {
  useFormattedTokenBalance,
  useTokenAllowance,
  useFormattedUserStakingInfo,
  useFormattedStakingStats,
} from "@/hooks/use-contract-reads"
import { useApproveToken, useStakeTokens, useUnstakeTokens, useEmergencyWithdraw } from "@/hooks/use-contract-writes"
import { calculateStakingFee, calculateNetAmount, formatTokenAmount, formatPercentage } from "@/lib/staking-utils"
import { parseUnits } from "viem"

export function EnhancedStakingForm() {
  const { isConnected } = useAccount()
  const [stakeAmount, setStakeAmount] = useState("")
  const [unstakeShares, setUnstakeShares] = useState("")
  const [stakeError, setStakeError] = useState("")
  const [unstakeError, setUnstakeError] = useState("")

  // Contract reads
  const { data: balance, isLoading: balanceLoading } = useFormattedTokenBalance()
  const { data: allowance } = useTokenAllowance()
  const { data: userInfo, isLoading: userInfoLoading } = useFormattedUserStakingInfo()
  const { data: stats, isLoading: statsLoading } = useFormattedStakingStats()

  // Contract writes
  const approveToken = useApproveToken()
  const stakeTokens = useStakeTokens()
  const unstakeTokens = useUnstakeTokens()
  const emergencyWithdraw = useEmergencyWithdraw()

  // Validation
  useEffect(() => {
    if (stakeAmount) {
      if (!balance) {
        setStakeError("Unable to fetch balance")
      } else if (!stats) {
        setStakeError("Unable to fetch staking stats")
      } else if (Number.parseFloat(stakeAmount) <= 0) {
        setStakeError("Amount must be greater than 0")
      } else if (Number.parseFloat(stakeAmount) > Number.parseFloat(balance)) {
        setStakeError("Insufficient balance")
      } else if (Number.parseFloat(stakeAmount) < Number.parseFloat(stats.minStakeAmount)) {
        setStakeError(`Minimum stake amount is ${formatTokenAmount(stats.minStakeAmount)}`)
      } else {
        setStakeError("")
      }
    } else {
      setStakeError("")
    }
  }, [stakeAmount, balance, stats])

  useEffect(() => {
    if (unstakeShares) {
      if (!userInfo) {
        setUnstakeError("Unable to fetch user info")
      } else if (Number.parseFloat(unstakeShares) <= 0) {
        setUnstakeError("Shares must be greater than 0")
      } else if (Number.parseFloat(unstakeShares) > Number.parseFloat(userInfo.shares)) {
        setUnstakeError("Insufficient shares")
      } else {
        setUnstakeError("")
      }
    } else {
      setUnstakeError("")
    }
  }, [unstakeShares, userInfo])

  // Reset forms on successful transactions
  useEffect(() => {
    if (stakeTokens.isSuccess) {
      setStakeAmount("")
      setStakeError("")
    }
  }, [stakeTokens.isSuccess])

  useEffect(() => {
    if (unstakeTokens.isSuccess) {
      setUnstakeShares("")
      setUnstakeError("")
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
    if (stakeError) return
    if (needsApproval(stakeAmount)) {
      approveToken.approve(stakeAmount)
    } else {
      stakeTokens.stake(stakeAmount)
    }
  }

  const handleUnstake = () => {
    if (unstakeError) return
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

  const isStakeValid = !stakeError && stakeAmount && Number.parseFloat(stakeAmount) > 0
  const isUnstakeValid = !unstakeError && unstakeShares && Number.parseFloat(unstakeShares) > 0

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
      <NetworkStatus />

      {stats?.emergencyMode && (
        <Alert className="border-orange-500/50 bg-orange-500/10">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          <AlertDescription className="text-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <strong>Emergency Mode Active</strong>
                <br />
                Normal staking is disabled. You can only withdraw your funds.
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={emergencyWithdraw.emergencyWithdraw}
                disabled={emergencyWithdraw.isPending || emergencyWithdraw.isConfirming}
                className="border-orange-500 text-orange-500 hover:bg-orange-500/10 bg-transparent ml-4"
              >
                {emergencyWithdraw.isPending || emergencyWithdraw.isConfirming
                  ? "Withdrawing..."
                  : "Emergency Withdraw"}
              </Button>
            </div>
          </AlertDescription>
        </Alert>
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
                  <span>Balance: {balanceLoading ? "Loading..." : formatTokenAmount(balance || "0")}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMaxStake}
                    disabled={balanceLoading || !balance}
                    className="h-6 px-2 text-xs"
                  >
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
                className={`text-lg ${stakeError ? "border-destructive" : ""}`}
                disabled={stats?.emergencyMode || balanceLoading}
              />
              {stakeError && <p className="text-xs text-destructive">{stakeError}</p>}
              {stats && !stakeError && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Info className="h-3 w-3" />
                  <span>Minimum stake: {formatTokenAmount(stats.minStakeAmount)}</span>
                </div>
              )}
            </div>

            {stakeAmount && stats && !stakeError && (
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
                stats?.emergencyMode ||
                balanceLoading ||
                statsLoading
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
                  <span>Available: {userInfoLoading ? "Loading..." : formatTokenAmount(userInfo?.shares || "0")}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMaxUnstake}
                    disabled={userInfoLoading || !userInfo?.shares}
                    className="h-6 px-2 text-xs"
                  >
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
                className={`text-lg ${unstakeError ? "border-destructive" : ""}`}
                disabled={userInfoLoading}
              />
              {unstakeError && <p className="text-xs text-destructive">{unstakeError}</p>}
            </div>

            {unstakeShares && stats && !unstakeError && (
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
              disabled={
                !isUnstakeValid ||
                unstakeTokens.isPending ||
                unstakeTokens.isConfirming ||
                userInfoLoading ||
                statsLoading
              }
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
