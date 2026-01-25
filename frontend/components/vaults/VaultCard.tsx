'use client';

import React from 'react';
import Link from 'next/link';
import { useUserVault } from '@/hooks/useUserVault';
import { formatUnits } from 'viem';
import { Button } from '@/components/ui/button';

interface VaultCardProps {
  address: `0x${string}`;
}

export function VaultCard({ address }: VaultCardProps) {
  const { totalAssets, userBalance } = useUserVault(address);

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6 flex flex-col space-y-4">
        <div>
          <h3 className="font-semibold leading-none tracking-tight">Vault</h3>
          <p className="text-xs text-muted-foreground break-all mt-1">{address}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Assets</p>
            <p className="text-xl font-bold">
              {totalAssets ? formatUnits(totalAssets, 18) : '0.00'}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Your Balance</p>
            <p className="text-xl font-bold">
              {userBalance ? formatUnits(userBalance, 18) : '0.00'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/vaults/${address}`} className="w-full">
            <Button variant="outline" className="w-full">Manage</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
