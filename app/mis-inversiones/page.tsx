"use client"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Building, DollarSign, Calendar } from "lucide-react"

// Mock data for user investments
const userInvestments = [
  {
    id: 1,
    propertyName: "Torre Residencial Marina",
    location: "Puerto Madero, Buenos Aires",
    tokensOwned: 250,
    tokenPrice: 150,
    currentValue: 37500,
    initialInvestment: 35000,
    returnPercentage: 7.14,
    monthlyReturn: 320,
    purchaseDate: "2024-01-15",
    image: "/modern-residential-tower-with-glass-facade.png",
  },
  {
    id: 2,
    propertyName: "Complejo Comercial Norte",
    location: "Palermo, Buenos Aires",
    tokensOwned: 150,
    tokenPrice: 200,
    currentValue: 30000,
    initialInvestment: 28500,
    returnPercentage: 5.26,
    monthlyReturn: 275,
    purchaseDate: "2024-02-20",
    image: "/modern-commercial-complex-with-retail-spaces.png",
  },
  {
    id: 3,
    propertyName: "Edificio Corporativo Central",
    location: "Microcentro, Buenos Aires",
    tokensOwned: 100,
    tokenPrice: 300,
    currentValue: 30000,
    initialInvestment: 29000,
    returnPercentage: 3.45,
    monthlyReturn: 234,
    purchaseDate: "2024-03-10",
    image: "/corporate-office-building-with-modern-architecture.png",
  },
]

export default function MisInversiones() {
  const totalInvestment = userInvestments.reduce((sum, inv) => sum + inv.initialInvestment, 0)
  const totalCurrentValue = userInvestments.reduce((sum, inv) => sum + inv.currentValue, 0)
  const totalReturn = totalCurrentValue - totalInvestment
  const totalReturnPercentage = (totalReturn / totalInvestment) * 100
  const totalMonthlyReturn = userInvestments.reduce((sum, inv) => sum + inv.monthlyReturn, 0)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Mis Inversiones</h1>
          <p className="text-muted-foreground">Gestiona y monitorea tu portafolio de inversiones inmobiliarias</p>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inversión Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalInvestment.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Actual</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalCurrentValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +${totalReturn.toLocaleString()} ({totalReturnPercentage.toFixed(2)}%)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Retorno Mensual</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalMonthlyReturn.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Propiedades</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userInvestments.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Investment Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {userInvestments.map((investment) => (
            <Card key={investment.id} className="overflow-hidden">
              <div className="flex">
                <div className="w-32 h-32 bg-muted flex-shrink-0">
                  <img
                    src={investment.image || "/placeholder.svg"}
                    alt={investment.propertyName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-lg">{investment.propertyName}</CardTitle>
                    <p className="text-sm text-muted-foreground">{investment.location}</p>
                  </CardHeader>
                  <CardContent className="p-0 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Tokens poseídos</span>
                      <Badge variant="secondary">{investment.tokensOwned} tokens</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Inversión inicial</span>
                      <span className="font-medium">${investment.initialInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Valor actual</span>
                      <span className="font-medium">${investment.currentValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Retorno</span>
                      <span
                        className={`font-medium ${investment.returnPercentage > 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {investment.returnPercentage > 0 ? "+" : ""}
                        {investment.returnPercentage.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Retorno mensual</span>
                      <span className="font-medium text-green-600">${investment.monthlyReturn}</span>
                    </div>
                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        Ver Detalles
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
