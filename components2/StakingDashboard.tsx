// components/ModernStakingDashboard.tsx

'use client';

import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Zap, 
  Shield, 
  Users, 
  Activity,
  Sparkles,
  Copy,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';

export function StakingDashboard() {
  const { address, isConnected, chain } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeShares, setUnstakeShares] = useState('');
  const [activeTab, setActiveTab] = useState('stake');

  // Mock data for demonstration
  const mockData = {
    tokenBalance: '1,247.50',
    stakedAmount: '850.25',
    totalShares: '850.25',
    totalStaked: '12,450,000',
    totalFees: '15,230',
    apy: '12.5',
    stakingFee: '0.1',
    unstakingFee: '0.3'
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (!isConnected) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '3rem',
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)'
        }}>
          {/* Hero Icon */}
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #ff6b6b, #ffd93d)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            boxShadow: '0 10px 25px rgba(255, 107, 107, 0.3)'
          }}>
            <Sparkles size={40} color="white" />
          </div>

          <h1 style={{
            fontSize: '3rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #fff, #f0f0f0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}>
            Symbiotic Staking
          </h1>

          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1.2rem',
            marginBottom: '3rem',
            lineHeight: '1.6'
          }}>
            Stake your tokens and earn rewards while securing the network
          </p>

          {/* Feature Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginBottom: '3rem'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <Shield size={32} color="#4ade80" style={{ marginBottom: '0.5rem' }} />
              <div style={{ color: 'white', fontSize: '0.9rem' }}>Secure</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <Zap size={32} color="#fbbf24" style={{ marginBottom: '0.5rem' }} />
              <div style={{ color: 'white', fontSize: '0.9rem' }}>Fast</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <Users size={32} color="#a78bfa" style={{ marginBottom: '0.5rem' }} />
              <div style={{ color: 'white', fontSize: '0.9rem' }}>Community</div>
            </div>
          </div>

          {/* Connect Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                disabled={isPending}
                style={{
                  background: connector.name === 'MetaMask' 
                    ? 'linear-gradient(135deg, #f6931d, #f4771d)' 
                    : 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: isPending ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                }}
                onMouseOver={(e) => {
                  if (!isPending) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                }}
              >
                {isPending ? 'Connecting...' : `Connect ${connector.name}`}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #581c87 100%)',
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '1.5rem 2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #ff6b6b, #ffd93d)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={24} color="white" />
            </div>
            <div>
              <h1 style={{
                color: 'white',
                fontSize: '1.8rem',
                fontWeight: '700',
                margin: 0
              }}>
                Symbiotic Staking
              </h1>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.9rem',
                margin: 0
              }}>
                Manage your staking positions
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Live Status */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(34, 197, 94, 0.2)',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: '#22c55e',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }}></div>
              <span style={{ color: '#22c55e', fontSize: '0.9rem', fontWeight: '500' }}>
                Live Network
              </span>
            </div>

            {/* Wallet Info */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '0.8rem 1.2rem',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.3rem'
              }}>
                <CheckCircle size={16} color="#22c55e" />
                <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: '500' }}>
                  Wallet Connected
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <code style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.8rem'
                }}>
                  {formatAddress(address)}
                </code>
                <Copy 
                  size={14} 
                  color="rgba(255, 255, 255, 0.6)" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigator.clipboard.writeText(address)}
                />
                <button
                  onClick={() => disconnect()}
                  style={{
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '6px',
                    padding: '0.25rem 0.5rem',
                    color: '#ef4444',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem'
      }}>
        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Balance Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem'
          }}>
            {/* Token Balance */}
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              borderRadius: '20px',
              padding: '2rem',
              color: 'white',
              boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
              transform: 'translateY(0)',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                <Wallet size={20} />
                <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Token Balance</span>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>
                {mockData.tokenBalance}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>TOKENS</div>
            </div>

            {/* Your Staked */}
            <div style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: '20px',
              padding: '2rem',
              color: 'white',
              boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
              transform: 'translateY(0)',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                <TrendingUp size={20} />
                <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Your Staked</span>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>
                {mockData.stakedAmount}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                {mockData.totalShares} shares
              </div>
            </div>

            {/* Total Staked */}
            <div style={{
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              borderRadius: '20px',
              padding: '2rem',
              color: 'white',
              boxShadow: '0 10px 25px rgba(139, 92, 246, 0.3)',
              transform: 'translateY(0)',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                <DollarSign size={20} />
                <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Total Staked</span>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>
                {mockData.totalStaked}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Protocol TVL</div>
            </div>
          </div>

          {/* Staking Interface */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '0.5rem'
            }}>
              Stake & Unstake
            </h3>
            <p style={{
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '2rem'
            }}>
              Manage your staking position
            </p>

            {/* Tabs */}
            <div style={{
              display: 'flex',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '0.5rem',
              marginBottom: '2rem'
            }}>
              <button
                onClick={() => setActiveTab('stake')}
                style={{
                  flex: 1,
                  padding: '0.8rem',
                  border: 'none',
                  borderRadius: '8px',
                  background: activeTab === 'stake' 
                    ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' 
                    : 'transparent',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <TrendingUp size={16} />
                Stake
              </button>
              <button
                onClick={() => setActiveTab('unstake')}
                style={{
                  flex: 1,
                  padding: '0.8rem',
                  border: 'none',
                  borderRadius: '8px',
                  background: activeTab === 'unstake' 
                    ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
                    : 'transparent',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <TrendingDown size={16} />
                Unstake
              </button>
            </div>

            {/* Stake Form */}
            {activeTab === 'stake' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem',
                    display: 'block'
                  }}>
                    Amount to Stake
                  </label>
                  <input
                    type="number"
                    placeholder="0.0"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '0.5rem',
                    fontSize: '0.8rem',
                    color: 'rgba(255, 255, 255, 0.6)'
                  }}>
                    <span>Min: 1.0 TOKENS</span>
                    <span>Max: {mockData.tokenBalance}</span>
                  </div>
                </div>

                {stakeAmount && (
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '1rem',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                      color: 'rgba(255, 255, 255, 0.8)'
                    }}>
                      <span>Staking Fee ({mockData.stakingFee}%):</span>
                      <span>{(parseFloat(stakeAmount) * 0.001).toFixed(4)} TOKENS</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: 'white'
                    }}>
                      <span>Net Staked Amount:</span>
                      <span>{(parseFloat(stakeAmount) * 0.999).toFixed(4)} TOKENS</span>
                    </div>
                  </div>
                )}

                <button
                  disabled={!stakeAmount}
                  style={{
                    width: '100%',
                    padding: '1rem 2rem',
                    background: stakeAmount 
                      ? 'linear-gradient(135deg, #10b981, #059669)' 
                      : 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: stakeAmount ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <TrendingUp size={16} />
                  Stake Tokens
                </button>
              </div>
            )}

            {/* Unstake Form */}
            {activeTab === 'unstake' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem',
                    display: 'block'
                  }}>
                    Shares to Unstake
                  </label>
                  <input
                    type="number"
                    placeholder="0.0"
                    value={unstakeShares}
                    onChange={(e) => setUnstakeShares(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '0.5rem',
                    fontSize: '0.8rem',
                    color: 'rgba(255, 255, 255, 0.6)'
                  }}>
                    <span>Available:</span>
                    <span>{mockData.totalShares} shares</span>
                  </div>
                </div>

                <button
                  disabled={!unstakeShares}
                  style={{
                    width: '100%',
                    padding: '1rem 2rem',
                    background: unstakeShares 
                      ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
                      : 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: unstakeShares ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <TrendingDown size={16} />
                  Unstake Shares
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* APY Card */}
          <div style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            borderRadius: '20px',
            padding: '2rem',
            color: 'white',
            textAlign: 'center',
            boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)'
          }}>
            <DollarSign size={32} style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Estimated APY
            </h3>
            <div style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '0.5rem' }}>
              ~{mockData.apy}%
            </div>
            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              Based on current network activity
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '1.5rem'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: '0.5rem 1rem'
              }}>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>24h</div>
                <div style={{ fontWeight: '600' }}>+0.3%</div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: '0.5rem 1rem'
              }}>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>7d</div>
                <div style={{ fontWeight: '600' }}>+2.1%</div>
              </div>
            </div>
          </div>

          {/* Network Stats */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Activity size={20} />
              Network Health
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                  Network Status
                </span>
                <div style={{
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: '500'
                }}>
                  Healthy
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                  Active Validators
                </span>
                <span style={{ color: 'white', fontWeight: '600' }}>1,247</span>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                  Network Uptime
                </span>
                <span style={{ color: '#22c55e', fontWeight: '600' }}>99.9%</span>
              </div>
            </div>
          </div>

          {/* Fee Information */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '1.5rem'
            }}>
              Fee Information
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                  Staking Fee
                </span>
                <div style={{
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: '500'
                }}>
                  {mockData.stakingFee}%
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                  Unstaking Fee
                </span>
                <div style={{
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: '500'
                }}>
                  {mockData.unstakingFee}%
                </div>
              </div>
              
              <div style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                paddingTop: '1rem',
                marginTop: '0.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                    Fees Collected
                  </span>
                  <span style={{ 
                    color: '#22c55e', 
                    fontWeight: '600',
                    fontSize: '1rem'
                  }}>
                    {mockData.totalFees} TOKENS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Protocol Info */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '1.5rem'
            }}>
              Protocol Stats
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{
                background: 'rgba(59, 130, 246, 0.2)',
                borderRadius: '12px',
                padding: '1rem',
                border: '1px solid rgba(59, 130, 246, 0.3)'
              }}>
                <div style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  fontSize: '0.8rem',
                  marginBottom: '0.5rem'
                }}>
                  Total Value Locked
                </div>
                <div style={{
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: '700'
                }}>
                  ${mockData.totalStaked}
                </div>
                <div style={{
                  color: '#22c55e',
                  fontSize: '0.8rem',
                  fontWeight: '500',
                  marginTop: '0.25rem'
                }}>
                  ↗ +15.2% (24h)
                </div>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    color: 'rgba(255, 255, 255, 0.8)', 
                    fontSize: '0.8rem',
                    marginBottom: '0.25rem'
                  }}>
                    Total Stakers
                  </div>
                  <div style={{
                    color: 'white',
                    fontSize: '1.2rem',
                    fontWeight: '600'
                  }}>
                    2,847
                  </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    color: 'rgba(255, 255, 255, 0.8)', 
                    fontSize: '0.8rem',
                    marginBottom: '0.25rem'
                  }}>
                    Avg. Stake
                  </div>
                  <div style={{
                    color: 'white',
                    fontSize: '1.2rem',
                    fontWeight: '600'
                  }}>
                    4,372
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
