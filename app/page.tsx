"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { PropertyCard } from "@/components/property-card"
import { PurchaseModal } from "@/components/purchase-modal"
import { DetailsModal } from "@/components/details-modal"

// Mock data for properties
const properties = [
  {
    id: 1,
    name: "Torre Residencial Marina",
    location: "Puerto Madero, Buenos Aires",
    image: "/modern-residential-tower-with-glass-facade.png",
    totalTokens: 10000,
    availableTokens: 7500,
    tokenPrice: 150,
    expectedReturn: "8.5%",
    description: "Exclusivo desarrollo residencial en el corazón de Puerto Madero con vista al río.",
    details: {
      area: "45,000 m²",
      floors: 32,
      units: 180,
      completion: "Q2 2025",
      developer: "Inmobiliaria Premium SA",
    },
  },
  {
    id: 2,
    name: "Complejo Comercial Norte",
    location: "Palermo, Buenos Aires",
    image: "/modern-commercial-complex-with-retail-spaces.png",
    totalTokens: 15000,
    availableTokens: 12300,
    tokenPrice: 200,
    expectedReturn: "9.2%",
    description: "Centro comercial de última generación en zona premium de Palermo.",
    details: {
      area: "28,500 m²",
      floors: 8,
      units: 95,
      completion: "Q4 2024",
      developer: "Desarrollos Urbanos SRL",
    },
  },
  {
    id: 3,
    name: "Edificio Corporativo Central",
    location: "Microcentro, Buenos Aires",
    image: "/corporate-office-building-with-modern-architecture.png",
    totalTokens: 8000,
    availableTokens: 5200,
    tokenPrice: 300,
    expectedReturn: "7.8%",
    description: "Edificio de oficinas AAA en el distrito financiero de la ciudad.",
    details: {
      area: "22,000 m²",
      floors: 25,
      units: 120,
      completion: "Q1 2025",
      developer: "Corporación Inmobiliaria SA",
    },
  },
  {
    id: 4,
    name: "Residencial Jardín Sur",
    location: "Belgrano, Buenos Aires",
    image: "/residential-garden-complex-with-green-spaces.png",
    totalTokens: 12000,
    availableTokens: 9800,
    tokenPrice: 120,
    expectedReturn: "8.1%",
    description: "Complejo residencial con amplios espacios verdes y amenities de primera.",
    details: {
      area: "35,000 m²",
      floors: 15,
      units: 200,
      completion: "Q3 2025",
      developer: "Verde Inmobiliaria SA",
    },
  },
]

export default function HomePage() {
  const [selectedProperty, setSelectedProperty] = useState<(typeof properties)[0] | null>(null)
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)

  const handlePurchaseClick = (property: (typeof properties)[0]) => {
    setSelectedProperty(property)
    setPurchaseModalOpen(true)
  }

  const handleDetailsClick = (property: (typeof properties)[0]) => {
    setSelectedProperty(property)
    setDetailsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Invierte en Inmuebles con Tokens</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Accede a inversiones inmobiliarias premium con la flexibilidad de los tokens digitales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onPurchaseClick={() => handlePurchaseClick(property)}
              onDetailsClick={() => handleDetailsClick(property)}
            />
          ))}
        </div>
      </main>

      {selectedProperty && (
        <>
          <PurchaseModal property={selectedProperty} open={purchaseModalOpen} onOpenChange={setPurchaseModalOpen} />
          <DetailsModal property={selectedProperty} open={detailsModalOpen} onOpenChange={setDetailsModalOpen} />
        </>
      )}
    </div>
  )
}
