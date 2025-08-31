"use client"

import { useState, useEffect } from "react"
import { useAccount, useChainId } from "wagmi"

export interface Transaction {
  id: string
  hash: `0x${string}`
  type: "approve" | "stake" | "unstake" | "emergency_withdraw"
  amount?: string
  timestamp: number
  status: "pending" | "confirming" | "success" | "failed"
  error?: string
}

export function useTransactionHistory() {
  const { address } = useAccount()
  const chainId = useChainId()
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // Load transactions from localStorage on mount
  useEffect(() => {
    if (address) {
      const storageKey = `transactions_${address}_${chainId}`
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        try {
          setTransactions(JSON.parse(stored))
        } catch {
          setTransactions([])
        }
      }
    }
  }, [address, chainId])

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    if (address && transactions.length > 0) {
      const storageKey = `transactions_${address}_${chainId}`
      localStorage.setItem(storageKey, JSON.stringify(transactions))
    }
  }, [transactions, address, chainId])

  const addTransaction = (transaction: Omit<Transaction, "id" | "timestamp">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `${transaction.hash}_${Date.now()}`,
      timestamp: Date.now(),
    }
    setTransactions((prev) => [newTransaction, ...prev.slice(0, 49)]) // Keep last 50 transactions
  }

  const updateTransaction = (hash: `0x${string}`, updates: Partial<Transaction>) => {
    setTransactions((prev) => prev.map((tx) => (tx.hash === hash ? { ...tx, ...updates } : tx)))
  }

  const clearHistory = () => {
    setTransactions([])
    if (address) {
      const storageKey = `transactions_${address}_${chainId}`
      localStorage.removeItem(storageKey)
    }
  }

  const getPendingTransactions = () => {
    return transactions.filter((tx) => tx.status === "pending" || tx.status === "confirming")
  }

  const getRecentTransactions = (limit = 10) => {
    return transactions.slice(0, limit)
  }

  return {
    transactions,
    addTransaction,
    updateTransaction,
    clearHistory,
    getPendingTransactions,
    getRecentTransactions,
  }
}
