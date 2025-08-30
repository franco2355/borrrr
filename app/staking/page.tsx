import StakePanel from "@/components/StakePanel"

export default function StakingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Staking de Tokens</h1>
          <div className="bg-card rounded-lg border p-6">
            <StakePanel />
          </div>
        </div>
      </div>
    </div>
  )
}
