import { useState, useCallback, useMemo, type ChangeEvent } from 'react';
import { Box, VStack, HStack, Divider } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import { Button } from '@coinbase/cds-web/buttons';
import { TextInput } from '@coinbase/cds-web/controls';
import { SegmentedTabs } from '@coinbase/cds-web/tabs';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { Avatar } from '@coinbase/cds-web/media';
import { type CryptoAsset, formatCurrency, getAssetIconUrl } from '../../data/assets';

type TradeAction = 'buy' | 'sell' | 'convert';

const tradeTabs = [
  { id: 'buy' as const, label: 'Buy' },
  { id: 'sell' as const, label: 'Sell' },
  { id: 'convert' as const, label: 'Convert' },
];

export const TradePanel = ({ asset }: { asset: CryptoAsset }) => {
  const [activeTab, setActiveTab] = useState<TabValue<TradeAction>>(tradeTabs[0]);
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = useCallback(
    (tab: TabValue<TradeAction> | null) => {
      if (tab) {
        setActiveTab(tab);
        setAmount('');
      }
    },
    [],
  );

  const numericAmount = useMemo(() => parseFloat(amount) || 0, [amount]);

  const estimatedQuantity = useMemo(
    () => (numericAmount > 0 ? numericAmount / asset.price : 0),
    [numericAmount, asset.price],
  );

  const holdingsValue = useMemo(
    () => asset.holdings * asset.price,
    [asset.holdings, asset.price],
  );

  const handleTrade = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAmount('');
    }, 2000);
  }, []);

  const isDisabled = numericAmount <= 0;

  const actionColor = useMemo(() => {
    if (activeTab.id === 'sell') return 'negative' as const;
    return 'primary' as const;
  }, [activeTab.id]);

  return (
    <Box bordered borderRadius={400} background="bgElevation1" padding={3} width="100%">
      <VStack gap={3}>
        <HStack alignItems="center" gap={1.5}>
          <Avatar
            size="xl"
            src={getAssetIconUrl(asset.symbol)}
            alt={asset.name}
          />
          <Text as="h2" font="title3">
            {asset.name} ({asset.symbol})
          </Text>
        </HStack>

        <HStack justifyContent="space-between" alignItems="center">
          <VStack>
            <Text as="p" font="caption" color="fgMuted">
              Current Price
            </Text>
            <Text as="p" font="title2">
              {formatCurrency(asset.price)}
            </Text>
          </VStack>
          <VStack alignItems="flex-end">
            <Text as="p" font="caption" color="fgMuted">
              Your Holdings
            </Text>
            <Text as="p" font="headline">
              {asset.holdings} {asset.symbol}
            </Text>
            <Text as="p" font="caption" color="fgMuted">
              {formatCurrency(holdingsValue)}
            </Text>
          </VStack>
        </HStack>

        <Divider />

        <SegmentedTabs
          accessibilityLabel="Trade action"
          activeTab={activeTab}
          onChange={handleTabChange}
          tabs={tradeTabs}
        />

        <VStack gap={2}>
          <TextInput
            label="Amount (USD)"
            placeholder="0.00"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
            suffix="USD"
            compact
          />

          {numericAmount > 0 && (
            <Box
              background="bgAlternate"
              borderRadius={200}
              padding={2}
            >
              <HStack justifyContent="space-between">
                <Text as="p" font="caption" color="fgMuted">
                  Estimated {activeTab.id === 'sell' ? 'proceeds' : 'quantity'}
                </Text>
                <Text as="p" font="label1">
                  {activeTab.id === 'sell'
                    ? formatCurrency(numericAmount)
                    : `${estimatedQuantity.toFixed(8)} ${asset.symbol}`}
                </Text>
              </HStack>
            </Box>
          )}

          <Button
            onClick={handleTrade}
            variant={actionColor}
            loading={isLoading}
            disabled={isDisabled}
            block
          >
            {activeTab.label} {asset.symbol}
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};
