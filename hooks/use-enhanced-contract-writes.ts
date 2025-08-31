"use client"

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { CONTRACTS } from "@/lib/contracts"
import { parseUnits } from "viem"
import { useToast } from "@/hooks/use-toast"
import { useQueryClient } from "@tanstack/react-query"
import { useTransactionHistory } from "./use-transaction-history"
import { useEffect } from "react"

export function useEnhancedApproveToken() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { addTransaction, updateTransaction } = useTransactionHistory()

  const {
    isLoading: isConfirming,
    isSuccess,
    isError,
  } = useWaitForTransactionReceipt({
    hash,
  })

  // Add transaction to history when hash is available
  useEffect(() => {
    if (hash) {
      addTransaction({
        hash,
        type: "approve",
        status: "pending",
      })
    }
  }, [hash, addTransaction])

  // Update transaction status
  useEffect(() => {
    if (hash && isConfirming) {
      updateTransaction(hash, { status: "confirming" })
    }
  }, [hash, isConfirming, updateTransaction])

  useEffect(() => {
    if (hash && isSuccess) {
      updateTransaction(hash, { status: "success" })
      queryClient.invalidateQueries({ queryKey: ["readContract"] })
      toast({
        title: "Approval successful",
        description: "Token approval completed successfully",
      })
    }
  }, [hash, isSuccess, updateTransaction, queryClient, toast])

  useEffect(() => {
    if (hash && isError) {
      updateTransaction(hash, {
        status: "failed",
        error: error?.message || "Transaction failed",
      })
      toast({
        title: "Approval failed",
        description: error?.message || "Transaction failed",
        variant: "destructive",
      })
    }
  }, [hash, isError, error, updateTransaction, toast])

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

  return {
    approve,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    isError,
    error,
  }
}

export function useEnhancedStakeTokens() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { addTransaction, updateTransaction } = useTransactionHistory()

  const {
    isLoading: isConfirming,
    isSuccess,
    isError,
  } = useWaitForTransactionReceipt({
    hash,
  })

  useEffect(() => {
    if (hash) {
      addTransaction({
        hash,
        type: "stake",
        status: "pending",
      })
    }
  }, [hash, addTransaction])

  useEffect(() => {
    if (hash && isConfirming) {
      updateTransaction(hash, { status: "confirming" })
    }
  }, [hash, isConfirming, updateTransaction])

  useEffect(() => {
    if (hash && isSuccess) {
      updateTransaction(hash, { status: "success" })
      queryClient.invalidateQueries({ queryKey: ["readContract"] })
      toast({
        title: "Stake successful",
        description: "Your tokens have been staked successfully",
      })
    }
  }, [hash, isSuccess, updateTransaction, queryClient, toast])

  useEffect(() => {
    if (hash && isError) {
      updateTransaction(hash, {
        status: "failed",
        error: error?.message || "Transaction failed",
      })
      toast({
        title: "Stake failed",
        description: error?.message || "Transaction failed",
        variant: "destructive",
      })
    }
  }, [hash, isError, error, updateTransaction, toast])

  const stake = (amount: string) => {
    try {
      const parsedAmount = parseUnits(amount, 18)
      addTransaction({
        hash: `pending_${Date.now()}` as `0x${string}`,
        type: "stake",
        amount,
        status: "pending",
      })
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

  return {
    stake,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    isError,
    error,
  }
}
