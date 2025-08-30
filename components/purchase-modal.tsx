"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Coins, Calculator, TrendingUp } from "lucide-react"

interface Property {
  id: number
  name: string
  location: string
  availableTokens: number
  tokenPrice: number
  expectedReturn: string
}

interface PurchaseModalProps {
  property: Property
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PurchaseModal({ property, open, onOpenChange }: PurchaseModalProps) {
  const [tokenAmount, setTokenAmount] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  const totalCost = tokenAmount * property.tokenPrice
  const estimatedMonthlyReturn = (totalCost * Number.parseFloat(property.expectedReturn.replace("%", ""))) / 100 / 12

  const handlePurchase = async () => {
    setIsProcessing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    onOpenChange(false)
    // Here you would typically show a success message
  }

  const handleTokenAmountChange = (value: string) => {
    const numValue = Number.parseInt(value) || 0
    if (numValue >= 0 && numValue <= property.availableTokens) {
      setTokenAmount(numValue)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-primary" />
            Comprar Tokens
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground text-balance">{property.name}</h3>
            <p className="text-sm text-muted-foreground">{property.location}</p>
            <Badge variant="secondary" className="w-fit">
              <TrendingUp className="h-3 w-3 mr-1" />
              Retorno esperado: {property.expectedReturn}
            </Badge>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tokenAmount">Cantidad de tokens</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="tokenAmount"
                  type="number"
                  min="1"
                  max={property.availableTokens}
                  value={tokenAmount}
                  onChange={(e) => handleTokenAmountChange(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" size="sm" onClick={() => setTokenAmount(property.availableTokens)}>
                  Máximo
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Disponibles: {property.availableTokens.toLocaleString()} tokens
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Calculator className="h-4 w-4" />
                Resumen de compra
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Precio por token:</span>
                  <span className="font-medium">${property.tokenPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cantidad:</span>
                  <span className="font-medium">{tokenAmount.toLocaleString()} tokens</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total a pagar:</span>
                  <span className="text-primary">${totalCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Retorno mensual estimado:</span>
                  <span>${estimatedMonthlyReturn.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1" disabled={isProcessing}>
              Cancelar
            </Button>
            <Button onClick={handlePurchase} className="flex-1" disabled={tokenAmount === 0 || isProcessing}>
              {isProcessing ? "Procesando..." : "Confirmar Compra"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
