import { parseUnits, formatUnits } from "viem"

export function calculateStakingFee(amount: string, feePercentage: number): string {
  try {
    const amountBigInt = parseUnits(amount, 18)
    const fee = (amountBigInt * BigInt(Math.floor(feePercentage * 100))) / BigInt(10000)
    return formatUnits(fee, 18)
  } catch {
    return "0"
  }
}

export function calculateNetAmount(amount: string, feePercentage: number): string {
  try {
    const amountBigInt = parseUnits(amount, 18)
    const fee = (amountBigInt * BigInt(Math.floor(feePercentage * 100))) / BigInt(10000)
    const netAmount = amountBigInt - fee
    return formatUnits(netAmount, 18)
  } catch {
    return "0"
  }
}

export function isValidAmount(amount: string, maxAmount: string): boolean {
  try {
    const amountBigInt = parseUnits(amount, 18)
    const maxAmountBigInt = parseUnits(maxAmount, 18)
    return amountBigInt > 0n && amountBigInt <= maxAmountBigInt
  } catch {
    return false
  }
}

export function isValidShares(shares: string, maxShares: string): boolean {
  try {
    const sharesBigInt = parseUnits(shares, 18)
    const maxSharesBigInt = parseUnits(maxShares, 18)
    return sharesBigInt > 0n && sharesBigInt <= maxSharesBigInt
  } catch {
    return false
  }
}

export function formatTokenAmount(amount: string, decimals = 4): string {
  try {
    const num = Number.parseFloat(amount)
    if (num === 0) return "0"
    if (num < 0.0001) return "< 0.0001"
    return num.toFixed(decimals).replace(/\.?0+$/, "")
  } catch {
    return "0"
  }
}

export function formatPercentage(percentage: number): string {
  return `${percentage.toFixed(2)}%`
}

export function shortenHash(hash: string): string {
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`
}

export function getExplorerUrl(hash: string, chainId: number): string {
  const explorers: Record<number, string> = {
    1: "https://etherscan.io",
    11155111: "https://sepolia.etherscan.io",
    31337: "http://localhost:8545", // Local hardhat
  }

  const baseUrl = explorers[chainId] || explorers[1]
  return `${baseUrl}/tx/${hash}`
}
