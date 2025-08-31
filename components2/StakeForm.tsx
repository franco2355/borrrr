// components/StakeForm.tsx

'use client';

import { useState } from 'react';
import { useStaking } from '@/hooks/useStaking';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, TrendingUp, TrendingDown, Loader2, Wallet, DollarSign, Coins } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function StakeForm() {
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeShares, setUnstakeShares] = useState('');
  
  const {
    address,
    tokenBalance,
    allowance,
    userInfo,
    stakingStats,
    stakingFee,
    unstakingFee,
    minStakeAmount,
    emergencyMode,
    isLoading,
    error,
    hash,
    approveTokens,
    stake,
    unstake,
    emergencyWithdraw,
    formatTokenAmount,
    calculateStakingFee,
    calculateUnstakingFee,
    hasEnoughBalance,
    hasEnoughAllowance,
    meetsMinimumStake
  } = useStaking();

  if (!address) {
    return (
      <div className="card-enhanced rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-muted to-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wallet className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
        <p className="text-muted-foreground">
          Please connect your wallet to start staking and earning rewards
        </p>
      </div>
    );
  }

  const handleStake = async () => {
    try {
      if (!hasEnoughAllowance(stakeAmount)) {
        await approveTokens(stakeAmount);
      } else {
        await stake(stakeAmount);
        setStakeAmount('');
      }
    } catch (err) {
      console.error('Staking failed:', err);
    }
  };

  const handleUnstake = async () => {
    try {
      await unstake(unstakeShares);
      setUnstakeShares('');
    } catch (err) {
      console.error('Unstaking failed:', err);
    }
  };

  const canStake = stakeAmount && 
    hasEnoughBalance(stakeAmount) && 
    meetsMinimumStake(stakeAmount) && 
    !emergencyMode;

  const canUnstake = unstakeShares && 
    userInfo && 
    parseFloat(unstakeShares) <= parseFloat(formatTokenAmount(userInfo.shares));

  return (
    <div className="space-y-6">
      {/* Emergency Mode Alert */}
      {emergencyMode && (
        <Alert variant="destructive" className="border-red-500/30 bg-red-500/10">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="font-medium">
            Emergency mode is active. Only emergency withdrawals are allowed.
          </AlertDescription>
        </Alert>
      )}

      {/* Transaction Status */}
      {hash && (
        <Alert className="border-blue-500/30 bg-blue-500/10">
          <AlertDescription className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full pulse-glow"></div>
              Transaction submitted: {hash.slice(0, 10)}...
            </div>
            {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </AlertDescription>
        </Alert>
      )}

      {/* Error Display */}
      {error && (