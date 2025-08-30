"use client"

import { Building2, User, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Navbar() {
  return (
    <nav className="bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">TokenEstate</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Inicio
            </Link>
            <Link href="/mis-inversiones" className="text-muted-foreground hover:text-primary transition-colors">
              Mis Inversiones
            </Link>
            <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/staking" className="text-muted-foreground hover:text-primary transition-colors">
              Staking
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <HelpCircle className="h-4 w-4 mr-2" />
              Soporte
            </Button>
            <Link href="/login">
              <Button size="sm">
                <User className="h-4 w-4 mr-2" />
                Mi Cuenta
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
