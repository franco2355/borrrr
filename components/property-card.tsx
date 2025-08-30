"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, TrendingUp, Coins } from "lucide-react"
import Image from "next/image"

interface Property {
  id: number
  name: string
  location: string
  image: string
  totalTokens: number
  availableTokens: number
  tokenPrice: number
  expectedReturn: string
  description: string
}

interface PropertyCardProps {
  property: Property
  onPurchaseClick: () => void
  onDetailsClick: () => void
}

export function PropertyCard({ property, onPurchaseClick, onDetailsClick }: PropertyCardProps) {
  const tokensSold = property.totalTokens - property.availableTokens
  const soldPercentage = (tokensSold / property.totalTokens) * 100

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative">
          <Image
            src={property.image || "/placeholder.svg"}
            alt={property.name}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
          />
          <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
            <TrendingUp className="h-3 w-3 mr-1" />
            {property.expectedReturn}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-card-foreground mb-2 text-balance">{property.name}</h3>

        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          {property.location}
        </div>

        <p className="text-sm text-muted-foreground mb-4 text-pretty">{property.description}</p>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Precio por token:</span>
            <span className="font-semibold text-foreground">${property.tokenPrice}</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tokens disponibles:</span>
              <div className="flex items-center">
                <Coins className="h-4 w-4 mr-1 text-primary" />
                <span className="font-medium">{property.availableTokens.toLocaleString()}</span>
              </div>
            </div>

            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${soldPercentage}%` }}
              />
            </div>

            <div className="text-xs text-muted-foreground text-center">{soldPercentage.toFixed(1)}% vendido</div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        <Button onClick={onPurchaseClick} className="w-full" size="sm">
          Comprar Tokens
        </Button>
        <Button
          onClick={onDetailsClick}
          variant="outline"
          className="w-full border-primary/20 hover:bg-primary/5 bg-transparent"
          size="sm"
        >
          Ver Más Detalles
        </Button>
      </CardFooter>
    </Card>
  )
}
