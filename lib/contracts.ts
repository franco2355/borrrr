// Contract addresses are provided through environment variables so the
// frontend can target the correct deployed instances.
// They are exposed as NEXT_PUBLIC_* to ensure they are available in the
// browser at build time.
const assetTokenAddress =
  (process.env.NEXT_PUBLIC_ASSET_TOKEN_ADDRESS as `0x${string}` | undefined) ??
  ("0x0000000000000000000000000000000000000000" as `0x${string}`)
const stakingAdapterAddress =
  (process.env.NEXT_PUBLIC_STAKING_ADAPTER_ADDRESS as `0x${string}` | undefined) ??
  ("0x0000000000000000000000000000000000000000" as `0x${string}`)

export const CONTRACTS = {
  AssetToken: {
    address: assetTokenAddress,
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
    address: stakingAdapterAddress,
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
