// Contract addresses - these would be replaced with actual deployed addresses
export const CONTRACTS = {
  AssetToken: {
    address: "0x1234567890123456789012345678901234567890" as `0x${string}`,
    abi: [
      {
        inputs: [{ name: "account", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { name: "owner", type: "address" },
          { name: "spender", type: "address" },
        ],
        name: "allowance",
        outputs: [{ name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { name: "spender", type: "address" },
          { name: "amount", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
    ] as const,
  },
  StakingAdapter: {
    address: "0x2345678901234567890123456789012345678901" as `0x${string}`,
    abi: [
      {
        inputs: [{ name: "amount", type: "uint256" }],
        name: "stake",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ name: "shares", type: "uint256" }],
        name: "unstake",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "emergencyWithdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ name: "user", type: "address" }],
        name: "getUserInfo",
        outputs: [
          { name: "stakedAmount", type: "uint256" },
          { name: "shares", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getStats",
        outputs: [
          { name: "totalStaked", type: "uint256" },
          { name: "totalShares", type: "uint256" },
          { name: "stakingFee", type: "uint256" },
          { name: "unstakingFee", type: "uint256" },
          { name: "minStakeAmount", type: "uint256" },
          { name: "emergencyMode", type: "bool" },
        ],
        stateMutability: "view",
        type: "function",
      },
    ] as const,
  },
} as const
