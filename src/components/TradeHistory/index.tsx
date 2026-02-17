import { useMemo } from "react";
import { Box, HStack, VStack } from "@coinbase/cds-web/layout";
import { Text } from "@coinbase/cds-web/typography";
import { generateTradeHistory, formatCurrency } from "../../data/assets";

interface TradeHistoryProps {
  midPrice: number;
}

export function TradeHistory({ midPrice }: TradeHistoryProps) {
  const trades = useMemo(() => generateTradeHistory(midPrice), [midPrice]);

  return (
    <Box width="100%">
      <VStack>
        <Box paddingX={1} paddingY={0.5}>
          <Text font="headline">Trade history</Text>
        </Box>
        <HStack paddingX={1} paddingY={0.25}>
          <Box width="33%">
            <Text font="caption" color="fgMuted">
              Amount (BTC)
            </Text>
          </Box>
          <Box width="33%">
            <Text font="caption" color="fgMuted">
              Price (USD)
            </Text>
          </Box>
          <Box width="33%">
            <Text font="caption" color="fgMuted">
              Time
            </Text>
          </Box>
        </HStack>
        {trades.map((trade, index) => (
          <HStack key={index} paddingY={0.25} paddingX={1}>
            <Box width="33%">
              <Text font="label2">{trade.amount.toFixed(6)}</Text>
            </Box>
            <Box width="33%">
              <Text
                font="label2"
                color={trade.side === "buy" ? "fgPositive" : "fgNegative"}
              >
                {formatCurrency(trade.price)}
              </Text>
            </Box>
            <Box width="33%">
              <Text font="label2" color="fgMuted">
                {trade.time}
              </Text>
            </Box>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}
