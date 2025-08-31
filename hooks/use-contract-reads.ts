"use client"

import { useReadContract, useAccount } from "wagmi"
import { CONTRACTS } from "@/lib/contracts"
import { formatUnits } from "viem"

export function useTokenBalance() {
  const { address } = useAccount()

  return useReadContract({
    ...CONTRACTS.AssetToken,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 10000, // Refetch every 10 seconds
    },
  })
}

export function useTokenAllowance() {
  const { address } = useAccount()

  return useReadContract({
    ...CONTRACTS.AssetToken,
    functionName: "allowance",
    args: address ? [address, CONTRACTS.StakingAdapter.address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 10000,
    },
  })
}

export function useUserStakingInfo() {
  const { address } = useAccount()

  return useReadContract({
    ...CONTRACTS.StakingAdapter,
    functionName: "getUserInfo",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 10000,
    },
  })
}

export function useStakingStats() {
  return useReadContract({
    ...CONTRACTS.StakingAdapter,
    functionName: "getStats",
    query: {
      refetchInterval: 30000, // Refetch every 30 seconds
    },
  })
}

// Formatted versions of the hooks for easier use in components
export function useFormattedTokenBalance() {
  const { data: balance, ...rest } = useTokenBalance()

  return {
    ...rest,
    data: balance ? formatUnits(balance, 18) : "0",
    raw: balance,
  }
}

export function useFormattedUserStakingInfo() {
  const { data: userInfo, ...rest } = useUserStakingInfo()

  return {
    ...rest,
    data: userInfo
      ? {
          stakedAmount: formatUnits(userInfo[0], 18),
          shares: formatUnits(userInfo[1], 18),
          stakedAmountRaw: userInfo[0],
          sharesRaw: userInfo[1],
        }
      : null,
  }
}

export function useFormattedStakingStats() {
  const { data: stats, ...rest } = useStakingStats()

  return {
    ...rest,
    data: stats
      ? {
          totalStaked: formatUnits(stats[0], 18),
          totalShares: formatUnits(stats[1], 18),
          stakingFee: Number(stats[2]) / 100, // Convert basis points to percentage
          unstakingFee: Number(stats[3]) / 100,
          minStakeAmount: formatUnits(stats[4], 18),
          emergencyMode: stats[5],
          totalStakedRaw: stats[0],
          totalSharesRaw: stats[1],
          stakingFeeRaw: stats[2],
          unstakingFeeRaw: stats[3],
          minStakeAmountRaw: stats[4],
        }
      : null,
  }
}
