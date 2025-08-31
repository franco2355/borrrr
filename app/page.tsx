"use client"

import { Suspense } from "react"
import { Header } from "@/components/header"
import { StatsCards } from "@/components/stats-cards"
import { EnhancedStakingForm } from "@/components/enhanced-staking-form"
import { ProtocolSidebar } from "@/components/protocol-sidebar"
import { UserDashboard } from "@/components/user-dashboard"
import { TransactionQueue } from "@/components/transaction-queue"
import { TransactionHistory } from "@/components/transaction-history"
import { StatsCardsSkeleton, UserDashboardSkeleton, ProtocolSidebarSkeleton } from "@/components/loading-skeleton"

export default function HomePage() {
  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Stats Cards */}
          <Suspense fallback={<StatsCardsSkeleton />}>
            <StatsCards />
          </Suspense>

          {/* Transaction Queue */}
          <TransactionQueue />

          {/* User Dashboard */}
          <Suspense fallback={<UserDashboardSkeleton />}>
            <UserDashboard />
          </Suspense>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Staking Form */}
            <div className="lg:col-span-2 space-y-6">
              <EnhancedStakingForm />
              <TransactionHistory />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Suspense fallback={<ProtocolSidebarSkeleton />}>
                <ProtocolSidebar />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
