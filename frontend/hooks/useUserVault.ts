'use client';

import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import UserVaultABI from '@/lib/abi/UserVault.json';
import ERC20ABI from '@/lib/abi/ERC20.json';
import { parseUnits } from 'viem';

export function useUserVault(vaultAddress: `0x${string}`) {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  // Read functions
  const { data: totalAssets } = useReadContract({
    address: vaultAddress,
    abi: UserVaultABI,
    functionName: 'totalAssets',
  });

  const { data: userBalance } = useReadContract({
    address: vaultAddress,
    abi: UserVaultABI,
    functionName: 'balanceOf',
    args: [address],
    query: { enabled: !!address },
  });

  const { data: assetAddress } = useReadContract({
    address: vaultAddress,
    abi: UserVaultABI,
    functionName: 'asset',
  });

  // Write functions
  const deposit = async (amount: bigint) => {
    // Note: User needs to approve the vault to spend assets first
    return await writeContractAsync({
      address: vaultAddress,
      abi: UserVaultABI,
      functionName: 'deposit',
      args: [amount, address],
    });
  };

  const withdraw = async (amount: bigint) => {
    return await writeContractAsync({
      address: vaultAddress,
      abi: UserVaultABI,
      functionName: 'withdraw',
      args: [amount, address, address],
    });
  };

  const setProtocolAllocation = async (protocol: string, amount: bigint) => {
    return await writeContractAsync({
      address: vaultAddress,
      abi: UserVaultABI,
      functionName: 'setProtocolAllocation',
      args: [protocol, amount],
    });
  };

  return {
    totalAssets: totalAssets as bigint | undefined,
    userBalance: userBalance as bigint | undefined,
    assetAddress: assetAddress as `0x${string}` | undefined,
    deposit,
    withdraw,
    setProtocolAllocation,
  };
}
