"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, Building, DollarSign } from "lucide-react"

export default function Dashboard() {
  const [formData, setFormData] = useState({
    propertyName: "",
    location: "",
    propertyType: "",
    totalArea: "",
    floors: "",
    units: "",
    totalTokens: "",
    tokenPrice: "",
    expectedReturn: "",
    completionDate: "",
    developer: "",
    description: "",
  })

  const [titleDeed, setTitleDeed] = useState<File | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setTitleDeed(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
    console.log("[v0] Title deed file:", titleDeed)
    // Here you would typically send the data to your backend
    alert("Propiedad registrada exitosamente!")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard - Registrar Propiedad</h1>
          <p className="text-muted-foreground">Registra una nueva propiedad para tokenización e inversión</p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Property Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Información de la Propiedad
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="propertyName">Nombre de la Propiedad *</Label>
                    <Input
                      id="propertyName"
                      value={formData.propertyName}
                      onChange={(e) => handleInputChange("propertyName", e.target.value)}
                      placeholder="Ej: Torre Residencial Marina"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Ubicación *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Ej: Puerto Madero, Buenos Aires"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="propertyType">Tipo de Propiedad *</Label>
                    <Select onValueChange={(value) => handleInputChange("propertyType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residencial</SelectItem>
                        <SelectItem value="commercial">Comercial</SelectItem>
                        <SelectItem value="office">Oficinas</SelectItem>
                        <SelectItem value="mixed">Uso Mixto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="totalArea">Área Total (m²) *</Label>
                      <Input
                        id="totalArea"
                        type="number"
                        value={formData.totalArea}
                        onChange={(e) => handleInputChange("totalArea", e.target.value)}
                        placeholder="45000"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="floors">Pisos *</Label>
                      <Input
                        id="floors"
                        type="number"
                        value={formData.floors}
                        onChange={(e) => handleInputChange("floors", e.target.value)}
                        placeholder="32"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="units">Unidades *</Label>
                    <Input
                      id="units"
                      type="number"
                      value={formData.units}
                      onChange={(e) => handleInputChange("units", e.target.value)}
                      placeholder="180"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="developer">Desarrollador *</Label>
                    <Input
                      id="developer"
                      value={formData.developer}
                      onChange={(e) => handleInputChange("developer", e.target.value)}
                      placeholder="Ej: Inmobiliaria Premium SA"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="completionDate">Fecha de Finalización *</Label>
                    <Input
                      id="completionDate"
                      type="date"
                      value={formData.completionDate}
                      onChange={(e) => handleInputChange("completionDate", e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Financial Information & Documents */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Información Financiera
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="totalTokens">Total de Tokens *</Label>
                    <Input
                      id="totalTokens"
                      type="number"
                      value={formData.totalTokens}
                      onChange={(e) => handleInputChange("totalTokens", e.target.value)}
                      placeholder="10000"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="tokenPrice">Precio por Token (USD) *</Label>
                    <Input
                      id="tokenPrice"
                      type="number"
                      value={formData.tokenPrice}
                      onChange={(e) => handleInputChange("tokenPrice", e.target.value)}
                      placeholder="150"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="expectedReturn">Retorno Esperado (%) *</Label>
                    <Input
                      id="expectedReturn"
                      type="number"
                      step="0.1"
                      value={formData.expectedReturn}
                      onChange={(e) => handleInputChange("expectedReturn", e.target.value)}
                      placeholder="8.5"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Documentación
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="titleDeed">Título de Propiedad *</Label>
                    <div className="mt-2">
                      <label
                        htmlFor="titleDeed"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click para subir</span> o arrastra el archivo
                          </p>
                          <p className="text-xs text-muted-foreground">PDF, DOC, DOCX (MAX. 10MB)</p>
                        </div>
                        <input
                          id="titleDeed"
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          required
                        />
                      </label>
                      {titleDeed && (
                        <p className="mt-2 text-sm text-green-600">Archivo seleccionado: {titleDeed.name}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Descripción</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="description">Descripción de la Propiedad *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe las características principales, amenities, ubicación estratégica, etc."
                      rows={4}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Guardar Borrador
            </Button>
            <Button type="submit">Registrar Propiedad</Button>
          </div>
        </form>
      </main>
    </div>
  )
}
