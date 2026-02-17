import { useState, useCallback, useMemo, type ChangeEvent } from "react";
import { Box, VStack, HStack, Divider } from "@coinbase/cds-web/layout";
import { Text } from "@coinbase/cds-web/typography";
import { Button } from "@coinbase/cds-web/buttons";
import { TextInput, Checkbox } from "@coinbase/cds-web/controls";
import { SegmentedTabs } from "@coinbase/cds-web/tabs";
import { TabNavigation } from "@coinbase/cds-web/tabs";
import { Avatar } from "@coinbase/cds-web/media";
import { Icon } from "@coinbase/cds-web/icons";
import type { TabValue } from "@coinbase/cds-common/tabs/useTabs";
import { formatCurrency, getAssetIconUrl } from "../../data/assets";

type BuySell = "buy" | "sell";

const buySellTabs = [
  { id: "buy" as const, label: "Buy" },
  { id: "sell" as const, label: "Sell" },
];

const orderTypeTabs = [
  { id: "limit", label: "Limit" },
  { id: "market", label: "Market" },
  { id: "stop-limit", label: "Stop Limit" },
];

type OrderFormProps = {
  asset: { symbol: string; name: string; price: number; holdings: number };
};

export const OrderForm = ({ asset }: OrderFormProps) => {
  const [activeTab, setActiveTab] = useState<TabValue<BuySell>>(buySellTabs[0]);
  const [orderType, setOrderType] = useState(orderTypeTabs[0].id);
  const [limitPrice, setLimitPrice] = useState("68,625.87");
  const [amount, setAmount] = useState("");
  const [sliderValue, setSliderValue] = useState(0);
  const [postOnly, setPostOnly] = useState(false);
  const [takeProfitStopLoss, setTakeProfitStopLoss] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = useCallback(
    (tab: TabValue<"buy" | "sell"> | null) => {
      if (tab) {
        setActiveTab(tab);
      }
    },
    [],
  );

  const numericAmount = useMemo(() => parseFloat(amount) || 0, [amount]);
  const numericLimitPrice = useMemo(
    () => parseFloat(limitPrice.replace(/,/g, "")) || asset.price,
    [limitPrice, asset.price],
  );

  const subtotal = useMemo(
    () => numericAmount * numericLimitPrice,
    [numericAmount, numericLimitPrice],
  );
  const fee = useMemo(() => subtotal * 0.005, [subtotal]);
  const total = useMemo(() => subtotal + fee, [subtotal, fee]);

  const handleSubmit = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAmount("");
      setLimitPrice("");
    }, 2000);
  }, []);

  const isBuy = activeTab.id === "buy";

  return (
    <Box paddingY={0.5} paddingX={1}>
      <VStack gap={1.5}>
        <SegmentedTabs
          accessibilityLabel="Buy or Sell"
          activeTab={activeTab}
          onChange={handleTabChange}
          tabs={buySellTabs}
        />

        <TabNavigation
          variant="secondary"
          tabs={orderTypeTabs}
          value={orderType}
          onChange={setOrderType}
        />

        <Box background="bgAlternate" borderRadius={200} padding={1}>
          <HStack justifyContent="space-between" alignItems="center">
            <Text as="p" font="caption" color="fgMuted">
              Pay with
            </Text>
            <HStack alignItems="center" gap={1}>
              <Avatar size="s" src={getAssetIconUrl("USDC")} alt="USDC" />
              <Text as="p" font="label1">
                USDC
              </Text>
              <Text as="span" font="caption" color="fgMuted">
                ▾
              </Text>
            </HStack>
          </HStack>
        </Box>

        <HStack justifyContent="space-between" alignItems="center">
          <Text as="p" font="caption" color="fgMuted">
            Available (USDC)
          </Text>
          <HStack alignItems="center" gap={1}>
            <Text as="p" font="label2">
              0.23
            </Text>
            <Icon name="eye" size="s" />
          </HStack>
        </HStack>

        <Divider />

        <VStack gap={1}>
          <HStack justifyContent="space-between" alignItems="center">
            <Text as="label" font="caption" color="fgMuted">
              Limit price
            </Text>
            <HStack gap={1}>
              <Text
                as="span"
                font="caption"
                color="fgPrimary"
                style={{ cursor: "pointer" }}
              >
                MID
              </Text>
              <Text as="span" font="caption" color="fgMuted">
                |
              </Text>
              <Text
                as="span"
                font="caption"
                color="fgPrimary"
                style={{ cursor: "pointer" }}
              >
                BID
              </Text>
            </HStack>
          </HStack>
          <TextInput
            label="Limit price"
            placeholder={formatCurrency(asset.price)}
            suffix="USD"
            compact
            value={limitPrice}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLimitPrice(e.target.value)
            }
          />
        </VStack>

        <VStack gap={1}>
          <TextInput
            label="Amount"
            placeholder="0.00"
            suffix="USDC ▾"
            compact
            type="number"
            value={amount}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAmount(e.target.value)
            }
            variant="negative"
          />
          <Text as="p" font="caption" style={{ color: "#cf202f" }}>
            Insufficient USDC balance.
          </Text>
          <Text
            as="p"
            font="caption"
            color="fgPrimary"
            style={{ cursor: "pointer", fontWeight: 600 }}
          >
            ADD FUNDS
          </Text>
        </VStack>

        <Box width="100%" paddingY={0.5}>
          <input
            type="range"
            min={0}
            max={100}
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            style={{
              width: "100%",
              accentColor: "var(--cds-colors-fgPrimary, #0052ff)",
              cursor: "pointer",
            }}
          />
        </Box>

        <HStack justifyContent="space-between" alignItems="center">
          <Checkbox
            checked={postOnly}
            onChange={() => setPostOnly((v) => !v)}
            value="postOnly"
          >
            Post only
          </Checkbox>
          <Box
            borderRadius={100}
            padding={0.5}
            paddingX={1}
            background="bgAlternate"
            style={{ cursor: "pointer" }}
          >
            <Text as="span" font="caption">
              GTC ▾
            </Text>
          </Box>
        </HStack>

        <Checkbox
          checked={takeProfitStopLoss}
          onChange={() => setTakeProfitStopLoss((v) => !v)}
          value="tpsl"
        >
          Take profit / Stop loss
        </Checkbox>

        <Divider />

        <VStack gap={1}>
          <HStack justifyContent="space-between">
            <Text as="p" font="caption" color="fgMuted">
              Subtotal
            </Text>
            <Text as="p" font="label1">
              {formatCurrency(subtotal)}
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text as="p" font="caption" color="fgMuted">
              Fee
            </Text>
            <Text as="p" font="label1">
              {formatCurrency(fee)}
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text as="p" font="caption" color="fgMuted">
              Total
            </Text>
            <Text as="p" font="label1">
              {formatCurrency(total)}
            </Text>
          </HStack>
        </VStack>

        <Button
          variant={isBuy ? "primary" : "negative"}
          loading={isLoading}
          onClick={handleSubmit}
          block
        >
          {isBuy ? "Buy" : "Sell"} {asset.symbol}
        </Button>

        <Text as="p" font="legal" color="fgMuted">
          Crypto markets are unique. Once executed, the transaction is not
          reversible.{" "}
          <Text
            as="span"
            font="legal"
            color="fgPrimary"
            style={{ cursor: "pointer" }}
          >
            View more
          </Text>
        </Text>

        <Divider />

        <VStack gap={1}>
          <Text as="p" font="caption" color="fgMuted">
            Balance summary
          </Text>
          <HStack justifyContent="space-between" alignItems="center">
            <Text as="p" font="label2">
              USD $93.00
            </Text>
            <Icon name="eye" size="s" />
          </HStack>
          <HStack justifyContent="space-between" alignItems="center">
            <Text as="p" font="label2">
              USDC 0.23
            </Text>
            <Icon name="eye" size="s" />
          </HStack>
          <HStack justifyContent="space-between" alignItems="center">
            <Text as="p" font="label2">
              BTC 0
            </Text>
            <Icon name="eye" size="s" />
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};
