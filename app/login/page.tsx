"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wallet, Building2 } from "lucide-react"
import Link from "next/link"

const wallets = [
  { id: "metamask", name: "MetaMask", icon: "🦊" },
  { id: "solana", name: "Solana (Phantom)", icon: "👻" },
  { id: "coinbase", name: "Coinbase Wallet", icon: "🔵" },
  { id: "walletconnect", name: "WalletConnect", icon: "🔗" },
  { id: "trust", name: "Trust Wallet", icon: "🛡️" },
]

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [selectedWallet, setSelectedWallet] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password || !selectedWallet) return

    setIsConnecting(true)
    // Simular conexión con wallet
    setTimeout(() => {
      console.log("[v0] Conectando con wallet:", selectedWallet)
      setIsConnecting(false)
      // Aquí iría la lógica real de conexión
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
          >
            <Building2 className="h-8 w-8" />
            <span className="text-2xl font-bold">TokenEstate</span>
          </Link>
          <p className="text-muted-foreground mt-2">Conecta tu wallet para invertir</p>
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center">
              Ingresa tus credenciales y selecciona tu wallet preferida
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Usuario */}
              <div className="space-y-2">
                <Label htmlFor="username">Nombre de Usuario</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Ingresa tu usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              {/* Contraseña */}
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Selector de Wallet */}
              <div className="space-y-2">
                <Label htmlFor="wallet">Wallet para Inversión</Label>
                <Select value={selectedWallet} onValueChange={setSelectedWallet} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    {wallets.map((wallet) => (
                      <SelectItem key={wallet.id} value={wallet.id}>
                        <div className="flex items-center space-x-2">
                          <span>{wallet.icon}</span>
                          <span>{wallet.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Botón de Login */}
              <Button
                type="submit"
                className="w-full"
                disabled={!username || !password || !selectedWallet || isConnecting}
              >
                {isConnecting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Conectando...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Wallet className="h-4 w-4" />
                    <span>Conectar Wallet</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Info adicional */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                ¿Necesitas ayuda?{" "}
                <Link href="#" className="text-primary hover:underline">
                  Contacta soporte
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">Al conectar tu wallet, aceptas nuestros términos de servicio</p>
        </div>
      </div>
    </div>
  )
}
