'use client';

import React, { useState } from 'react';
import { useUserVault } from '@/hooks/useUserVault';
import { Button } from '@/components/ui/button';
import { parseUnits } from 'viem';

interface ProtocolAllocationManagerProps {
  vaultAddress: `0x${string}`;
}

export function ProtocolAllocationManager({ vaultAddress }: ProtocolAllocationManagerProps) {
  const { setProtocolAllocation } = useUserVault(vaultAddress);
  const [protocol, setProtocol] = useState('Aave');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      // Assuming 18 decimals for simplicity in this prototype
      await setProtocolAllocation(protocol, parseUnits(amount, 18));
      alert('Allocation update submitted!');
    } catch (error) {
      console.error(error);
      alert('Failed to update allocation.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-xl border p-6 bg-card space-y-4 shadow-sm">
      <h3 className="text-lg font-bold">Protocol Allocation</h3>
      <div className="grid gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Protocol</label>
          <select 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={protocol}
            onChange={(e) => setProtocol(e.target.value)}
          >
            <option value="Aave">Aave</option>
            <option value="Compound">Compound</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Amount</label>
          <input
            type="number"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <Button onClick={handleUpdate} disabled={isLoading} className="w-full">
          {isLoading ? 'Updating...' : 'Update Allocation'}
        </Button>
      </div>
    </div>
  );
}
