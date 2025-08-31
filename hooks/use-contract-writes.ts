"use client"

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { CONTRACTS } from "@/lib/contracts"
import { parseUnits } from "viem"
import { useToast } from "@/hooks/use-toast"
import { useQueryClient } from "@tanstack/react-query"

export function useApproveToken() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const approve = (amount: string) => {
    try {
      const parsedAmount = parseUnits(amount, 18)
      writeContract({
        ...CONTRACTS.AssetToken,
        functionName: "approve",
        args: [CONTRACTS.StakingAdapter.address, parsedAmount],
      })
    } catch (err) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to approve",
        variant: "destructive",
      })
    }
  }

  // Invalidate queries when transaction is successful
  if (isSuccess) {
    queryClient.invalidateQueries({ queryKey: ["readContract"] })
  }

  return {
    approve,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  }
}

export function useStakeTokens() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const stake = (amount: string) => {
    try {
      const parsedAmount = parseUnits(amount, 18)
      writeContract({
        ...CONTRACTS.StakingAdapter,
        functionName: "stake",
        args: [parsedAmount],
      })
    } catch (err) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to stake",
        variant: "destructive",
      })
    }
  }

  if (isSuccess) {
    queryClient.invalidateQueries({ queryKey: ["readContract"] })
    toast({
      title: "Stake successful",
      description: "Your tokens have been staked successfully",
    })
  }

  return {
    stake,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  }
}

export function useUnstakeTokens() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const unstake = (shares: string) => {
    try {
      const parsedShares = parseUnits(shares, 18)
      writeContract({
        ...CONTRACTS.StakingAdapter,
        functionName: "unstake",
        args: [parsedShares],
      })
    } catch (err) {
      toast({
        title: "Invalid shares",
        description: "Please enter a valid amount of shares to unstake",
        variant: "destructive",
      })
    }
  }

  if (isSuccess) {
    queryClient.invalidateQueries({ queryKey: ["readContract"] })
    toast({
      title: "Unstake successful",
      description: "Your tokens have been unstaked successfully",
    })
  }

  return {
    unstake,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  }
}

export function useEmergencyWithdraw() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const emergencyWithdraw = () => {
    writeContract({
      ...CONTRACTS.StakingAdapter,
      functionName: "emergencyWithdraw",
    })
  }

  if (isSuccess) {
    queryClient.invalidateQueries({ queryKey: ["readContract"] })
    toast({
      title: "Emergency withdrawal successful",
      description: "Your tokens have been withdrawn in emergency mode",
    })
  }

  return {
    emergencyWithdraw,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  }
}
