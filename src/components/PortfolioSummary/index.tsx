import { Box, HStack, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import { Icon } from '@coinbase/cds-web/icons';
import { type CryptoAsset, formatCurrency } from '../../data/assets';
import { useMemo } from 'react';

export const PortfolioSummary = ({ assets }: { assets: CryptoAsset[] }) => {
  const totalValue = useMemo(
    () => assets.reduce((sum, asset) => sum + asset.holdings * asset.price, 0),
    [assets],
  );

  const totalChange = useMemo(() => {
    const weightedChange = assets.reduce((sum, asset) => {
      const value = asset.holdings * asset.price;
      return sum + (asset.change24h * value) / totalValue;
    }, 0);
    return weightedChange;
  }, [assets, totalValue]);

  const isPositive = totalChange >= 0;

  return (
    <Box
      bordered
      borderRadius={400}
      background="bgElevation1"
      padding={3}
      width="100%"
    >
      <HStack justifyContent="space-between" alignItems="center">
        <VStack gap={0.5}>
          <Text as="p" font="caption" color="fgMuted">
            Portfolio Value
          </Text>
          <Text as="p" font="display3">
            {formatCurrency(totalValue)}
          </Text>
        </VStack>
        <Box
          background={isPositive ? 'bgPositiveWash' : 'bgNegativeWash'}
          borderRadius={200}
          paddingX={1.5}
          paddingY={0.5}
        >
          <HStack alignItems="center" gap={0.5}>
            <Icon
              name={isPositive ? 'arrowUp' : 'arrowDown'}
              size="xs"
              color={isPositive ? 'fgPositive' : 'fgNegative'}
            />
            <Text
              as="span"
              font="label1"
              color={isPositive ? 'fgPositive' : 'fgNegative'}
            >
              {isPositive ? '+' : ''}{totalChange.toFixed(2)}% today
            </Text>
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
};
