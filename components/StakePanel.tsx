"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function StakePanel() {
  const [amount, setAmount] = useState("50")
  const [status, setStatus] = useState("Conectá tu wallet para comenzar")
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Simulación de conexión de wallet
  async function connectWallet() {
    setIsLoading(true)
    // Simular conexión
    setTimeout(() => {
      setIsConnected(true)
      setStatus("Wallet conectada - Balance: 1000 ATKN | Shares: 0")
      setIsLoading(false)
    }, 1000)
  }

  async function refresh() {
    if (!isConnected) return
    setIsLoading(true)
    // Simular refresh
    setTimeout(() => {
      setStatus("Balance: 1000 ATKN | Shares: 50")
      setIsLoading(false)
    }, 500)
  }

  async function approveAndStake() {
    if (!amount || !isConnected) return
    setIsLoading(true)
    // Simular stake
    setTimeout(() => {
      setStatus(`Staked ${amount} ATKN exitosamente`)
      setIsLoading(false)
    }, 2000)
  }

  async function unstake() {
    if (!amount || !isConnected) return
    setIsLoading(true)
    // Simular unstake
    setTimeout(() => {
      setStatus(`Unstaked ${amount} ATKN exitosamente`)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Gestión de Tokens</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected ? (
          <Button onClick={connectWallet} disabled={isLoading} className="w-full">
            {isLoading ? "Conectando..." : "Conectar Wallet"}
          </Button>
        ) : (
          <>
            <Button onClick={refresh} disabled={isLoading} variant="outline" className="w-full bg-transparent">
              {isLoading ? "Cargando..." : "Actualizar"}
            </Button>

            <div className="p-3 bg-muted rounded-md text-sm">{status}</div>

            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Cantidad ATKN (ej: 50)"
              type="number"
            />

            <div className="space-y-2">
              <Button onClick={approveAndStake} disabled={isLoading} className="w-full">
                {isLoading ? "Procesando..." : "Approve + Stake"}
              </Button>

              <Button onClick={unstake} disabled={isLoading} variant="destructive" className="w-full">
                {isLoading ? "Procesando..." : "Unstake"}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
