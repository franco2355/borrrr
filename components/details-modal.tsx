import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Building, TrendingUp, Coins } from "lucide-react"
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
  details: {
    area: string
    floors: number
    units: number
    completion: string
    developer: string
  }
}

interface DetailsModalProps {
  property: Property
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DetailsModal({ property, open, onOpenChange }: DetailsModalProps) {
  const tokensSold = property.totalTokens - property.availableTokens
  const soldPercentage = (tokensSold / property.totalTokens) * 100

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl text-balance">{property.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative">
            <Image
              src={property.image || "/placeholder.svg"}
              alt={property.name}
              width={600}
              height={300}
              className="w-full h-64 object-cover rounded-lg"
            />
            <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
              <TrendingUp className="h-3 w-3 mr-1" />
              {property.expectedReturn}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              {property.location}
            </div>

            <p className="text-foreground text-pretty">{property.description}</p>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Building className="h-4 w-4" />
                Detalles del Proyecto
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Área total:</span>
                  <span className="font-medium">{property.details.area}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pisos:</span>
                  <span className="font-medium">{property.details.floors}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Unidades:</span>
                  <span className="font-medium">{property.details.units}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Finalización:</span>
                  <span className="font-medium">{property.details.completion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Desarrollador:</span>
                  <span className="font-medium text-pretty">{property.details.developer}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Coins className="h-4 w-4" />
                Información de Tokens
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Precio por token:</span>
                  <span className="font-medium">${property.tokenPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total de tokens:</span>
                  <span className="font-medium">{property.totalTokens.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tokens disponibles:</span>
                  <span className="font-medium text-primary">{property.availableTokens.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tokens vendidos:</span>
                  <span className="font-medium">{tokensSold.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full transition-all duration-300"
                    style={{ width: `${soldPercentage}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground text-center">
                  {soldPercentage.toFixed(1)}% del proyecto tokenizado
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Proyección de Retornos
            </h4>
            <p className="text-sm text-muted-foreground text-pretty">
              Este proyecto tiene un retorno esperado del <strong>{property.expectedReturn}</strong> anual, basado en
              análisis de mercado y proyecciones de renta. Los retornos pueden variar según las condiciones del mercado
              inmobiliario.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
