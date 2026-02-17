import { useMemo } from 'react';
import { Box, HStack, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import { generateOrderBook } from '../../data/assets';

export const OrderBook = ({ midPrice }: { midPrice: number }) => {
  const { asks, bids } = useMemo(() => generateOrderBook(midPrice), [midPrice]);

  const maxTotal = useMemo(
    () => Math.max(asks[asks.length - 1]?.total ?? 0, bids[bids.length - 1]?.total ?? 0),
    [asks, bids],
  );

  const reversedAsks = useMemo(() => [...asks].reverse(), [asks]);

  const spread = useMemo(() => {
    const lowestAsk = asks[0]?.price ?? 0;
    const highestBid = bids[0]?.price ?? 0;
    return Math.abs(lowestAsk - highestBid).toFixed(2);
  }, [asks, bids]);

  return (
    <Box width="100%" overflow="hidden">
      <VStack gap={0}>
        <HStack justifyContent="space-between" alignItems="center" paddingX={1} paddingY={0.5}>
          <Text as="h3" font="headline">
            Order book
          </Text>
        </HStack>

        <HStack justifyContent="space-between" paddingX={1} paddingY={0.5}>
          <Text as="span" font="caption" color="fgMuted">
            Amount (BTC)
          </Text>
          <Text as="span" font="caption" color="fgMuted">
            Price (USD)
          </Text>
        </HStack>

        {reversedAsks.map((entry, i) => (
          <Box key={`ask-${i}`} position="relative">
            <Box
              position="absolute"
              dangerouslySetBackground="rgba(255,59,48,0.08)"
              height="100%"
              width={`${(entry.total / maxTotal) * 100}%`}
              right={0}
              top={0}
            />
            <HStack justifyContent="space-between" paddingY={0.25} paddingX={1}>
              <Text as="span" font="label2" color="fgNegative">
                {entry.amount.toFixed(8)}
              </Text>
              <Text as="span" font="label2" color="fgNegative">
                {entry.price.toFixed(2)}
              </Text>
            </HStack>
          </Box>
        ))}

        <HStack justifyContent="space-between" paddingY={0.5} paddingX={1}>
          <Text as="span" font="caption" color="fgMuted">
            USD Spread
          </Text>
          <Text as="span" font="caption" color="fgMuted">
            {spread}
          </Text>
        </HStack>

        {bids.map((entry, i) => (
          <Box key={`bid-${i}`} position="relative">
            <Box
              position="absolute"
              dangerouslySetBackground="rgba(0,200,83,0.08)"
              height="100%"
              width={`${(entry.total / maxTotal) * 100}%`}
              left={0}
              top={0}
            />
            <HStack justifyContent="space-between" paddingY={0.25} paddingX={1}>
              <Text as="span" font="label2" color="fgPositive">
                {entry.amount.toFixed(8)}
              </Text>
              <Text as="span" font="label2" color="fgPositive">
                {entry.price.toFixed(2)}
              </Text>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
