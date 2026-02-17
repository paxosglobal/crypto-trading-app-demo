import { HStack, VStack, Divider } from "@coinbase/cds-web/layout";
import { Text } from "@coinbase/cds-web/typography";
import { Button, IconButton } from "@coinbase/cds-web/buttons";
import { Avatar } from "@coinbase/cds-web/media";
import { Icon } from "@coinbase/cds-web/icons";
import { getAssetIconUrl, formatCurrency } from "../../data/assets";

type TopBarAsset = {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
};

type TopBarProps = {
  asset: TopBarAsset;
  toggleColorScheme: () => void;
};

export const TopBar = ({ asset }: TopBarProps) => {
  const isPositive = asset.change24h >= 0;

  return (
    <HStack
      background="bgAlternate"
      paddingX={1.5}
      paddingY={0.5}
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      <HStack alignItems="center" gap={2}>
        <HStack
          alignItems="center"
          gap={1}
          style={{
            cursor: "pointer",
            background: "var(--cds-colors-bg)",
            borderRadius: 20,
            padding: "4px 12px 4px 4px",
          }}
        >
          <Avatar
            alt={asset.name}
            size="xl"
            src={getAssetIconUrl(asset.symbol)}
          />
          <Text font="label1" color="fg">
            {asset.symbol}-USD
          </Text>
          <Icon name="caretDown" size="s" color="fgMuted" />
        </HStack>

        <Divider direction="vertical" />

        <VStack gap={0}>
          <Text font="caption" color="fgMuted">
            Last Price (24H)
          </Text>
          <HStack alignItems="center" gap={0.5}>
            <Text font="label1" color="fg">
              {formatCurrency(asset.price)}
            </Text>
            <Text
              font="label2"
              color={isPositive ? "fgPositive" : "fgNegative"}
            >
              {isPositive ? "+" : ""}
              {asset.change24h.toFixed(2)}%
            </Text>
          </HStack>
        </VStack>

        <Divider direction="vertical" />

        <VStack gap={0}>
          <Text font="caption" color="fgMuted">
            24H Volume
          </Text>
          <Text font="label1" color="fg">
            {formatCurrency(asset.volume24h)}
          </Text>
        </VStack>

        <Divider direction="vertical" />

        <VStack gap={0}>
          <Text font="caption" color="fgMuted">
            24H High
          </Text>
          <Text font="label1" color="fg">
            {formatCurrency(asset.high24h)}
          </Text>
        </VStack>

        <Divider direction="vertical" />

        <VStack gap={0}>
          <Text font="caption" color="fgMuted">
            24H Low
          </Text>
          <Text font="label1" color="fg">
            {formatCurrency(asset.low24h)}
          </Text>
        </VStack>
      </HStack>

      <HStack alignItems="center" gap={1}>
        <Button variant="primary" compact>
          Deposit
        </Button>
        <Button variant="secondary" compact>
          Manage funds
        </Button>
        <IconButton name="bell" accessibilityLabel="Notifications" />
      </HStack>
    </HStack>
  );
};
