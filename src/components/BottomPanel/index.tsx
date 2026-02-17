import { useState } from "react";
import { Box, HStack, VStack } from "@coinbase/cds-web/layout";
import { Text } from "@coinbase/cds-web/typography";
import { TabNavigation } from "@coinbase/cds-web/tabs";
import { Icon } from "@coinbase/cds-web/icons";
import { topGainers, formatCurrency, formatPercent } from "../../data/assets";

type TabId = "orders" | "assets" | "trade-history";

const tabs = [
  { id: "orders" as const, label: "Orders" },
  { id: "assets" as const, label: "Assets" },
  { id: "trade-history" as const, label: "Trade history" },
];

const orderColumns = [
  "Time Placed",
  "Name",
  "Type",
  "Side",
  "Price",
  "Amount",
  "% Filled ⓘ",
  "Total",
  "TP/SL",
  "Status",
  "Actions",
];

const assetRows = [
  { symbol: "BTC", name: "Bitcoin", balance: 0.5213, value: 50772.54 },
  { symbol: "ETH", name: "Ethereum", balance: 4.821, value: 16503.74 },
  { symbol: "USDC", name: "USD Coin", balance: 12500.0, value: 12500.0 },
];

export const BottomPanel = () => {
  const [activeTab, setActiveTab] = useState<TabId>("orders");

  return (
    <Box borderedTop width="100%" flexShrink={0}>
      <VStack>
        <HStack
          alignItems="center"
          gap={1}
          padding={0.5}
          paddingX={1}
          overflow="hidden"
        >
          <TabNavigation
            tabs={tabs}
            value={activeTab}
            onChange={setActiveTab}
            variant="secondary"
            gap={1}
          />
        </HStack>

        {activeTab === "orders" && (
          <VStack>
            <HStack paddingX={1.5} paddingY={0.5} gap={2}>
              {orderColumns.map((col) => (
                <Box key={col} flexGrow="1" flexBasis="0">
                  <Text as="span" font="caption" color="fgMuted">
                    {col}
                  </Text>
                </Box>
              ))}
            </HStack>
            <VStack alignItems="center" justifyContent="center" padding={3}>
              <Icon name="document" size="l" color="fgMuted" />
              <Text as="p" font="headline" color="fgMuted">
                No orders
              </Text>
            </VStack>
          </VStack>
        )}

        {activeTab === "assets" && (
          <VStack paddingX={2} paddingY={1}>
            <HStack paddingY={1} gap={2}>
              <Box flexGrow="1" flexBasis="0">
                <Text as="span" font="caption" color="fgMuted">
                  Symbol
                </Text>
              </Box>
              <Box flexGrow="1" flexBasis="0">
                <Text as="span" font="caption" color="fgMuted">
                  Name
                </Text>
              </Box>
              <Box flexGrow="1" flexBasis="0">
                <Text as="span" font="caption" color="fgMuted">
                  Balance
                </Text>
              </Box>
              <Box flexGrow="1" flexBasis="0">
                <Text as="span" font="caption" color="fgMuted">
                  Value
                </Text>
              </Box>
            </HStack>
            {assetRows.map((asset) => (
              <HStack key={asset.symbol} paddingY={1} gap={2}>
                <Box flexGrow="1" flexBasis="0">
                  <Text as="span" font="label1">
                    {asset.symbol}
                  </Text>
                </Box>
                <Box flexGrow="1" flexBasis="0">
                  <Text as="span" font="body">
                    {asset.name}
                  </Text>
                </Box>
                <Box flexGrow="1" flexBasis="0">
                  <Text as="span" font="body">
                    {asset.balance}
                  </Text>
                </Box>
                <Box flexGrow="1" flexBasis="0">
                  <Text as="span" font="body">
                    {formatCurrency(asset.value)}
                  </Text>
                </Box>
              </HStack>
            ))}
          </VStack>
        )}

        {activeTab === "trade-history" && (
          <VStack alignItems="center" justifyContent="center" padding={5}>
            <Icon name="document" size="l" color="fgMuted" />
            <Text as="p" font="headline" color="fgMuted">
              No trade history
            </Text>
          </VStack>
        )}

        <HStack
          alignItems="center"
          paddingY={0.5}
          borderedTop
          width="100%"
          style={{ paddingLeft: 0, paddingRight: 0 }}
        >
          <div
            className="hide-scrollbar"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              overflow: "auto",
              flexGrow: 1,
              width: "100%",
              paddingLeft: 8,
              paddingRight: 8,
            }}
          >
            <Text
              as="span"
              font="label2"
              color="fgMuted"
              style={{ flexShrink: 0 }}
            >
              Gainers
            </Text>
            <HStack gap={2} alignItems="center" flexShrink={0}>
              {topGainers.map((gainer) => (
                <HStack key={gainer.symbol} gap={0.5} alignItems="center">
                  <Text as="span" font="caption" color="fgMuted">
                    {gainer.symbol}
                  </Text>
                  <Text as="span" font="caption" color="fgMuted">
                    {formatCurrency(gainer.price)}
                  </Text>
                  <Icon name="caretUp" size="s" color="fgPositive" />
                  <Text as="span" font="caption" color="fgPositive">
                    {formatPercent(gainer.changePercent)}
                  </Text>
                </HStack>
              ))}
            </HStack>
          </div>
        </HStack>
      </VStack>
    </Box>
  );
};
