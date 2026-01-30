VaultAnalytics component

Location: `components/vaults/VaultAnalytics.tsx`

Purpose:

- Small presentational component to display vault TVL trend and simple summary.
- Intended to be wired to a Graph or API to fetch real vault metrics.

Props:

- `vaultId?: string` - optional vault identifier
- `data?: { date: string; tvl: number }[]` - optional timeseries data

Notes:

- Implemented as a lightweight SVG sparkline to avoid adding chart deps.
- Add unit tests and integration with the back-end data source in follow-up tasks.
