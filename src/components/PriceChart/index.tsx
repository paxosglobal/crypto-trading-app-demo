import { useState, useMemo } from "react";
import { Box, HStack, VStack, Divider } from "@coinbase/cds-web/layout";
import { Text } from "@coinbase/cds-web/typography";
import { Button } from "@coinbase/cds-web/buttons";
import { TabNavigation } from "@coinbase/cds-web/tabs";
import { Icon } from "@coinbase/cds-web/icons";
import { SparklineInteractive } from "@coinbase/cds-web-visualization";
import type { ChartData } from "@coinbase/cds-web-visualization";
import { formatCurrency } from "../../data/assets";

const chartTabs = [
  { id: "price_chart", label: "Price chart" },
  { id: "depth_chart", label: "Depth chart" },
];

type Timeframe = "1m" | "5m" | "15m" | "1H" | "4H" | "1D";

const timeframes: Timeframe[] = ["1m", "5m", "15m", "1H", "4H", "1D"];
const bottomTimeRanges = ["6M", "3M", "1M", "5D", "1D", "4H", "1H"] as const;

const periods: { label: string; value: Timeframe }[] = timeframes.map((tf) => ({
  label: tf,
  value: tf,
}));

const drawingTools = [
  { label: "+", title: "Crosshair" },
  { label: "╱", title: "Trend line" },
  { label: "─", title: "Horizontal line" },
  { label: "│", title: "Vertical line" },
  { label: "∠", title: "Angle" },
  { label: "◇", title: "Fibonacci" },
  { label: "▭", title: "Rectangle" },
  { label: "○", title: "Ellipse" },
  { label: "A", title: "Text" },
  { label: "⤡", title: "Measure" },
  { label: "◎", title: "Magnet" },
  { label: "🔒", title: "Lock" },
  { label: "👁", title: "Visibility" },
  { label: "🗑", title: "Delete" },
];

function generatePriceData(
  basePrice: number,
  points: number,
  volatility: number,
): ChartData {
  const data: ChartData = [];
  const now = Date.now();
  let price = basePrice * 0.97;

  for (let i = 0; i < points; i++) {
    const drift = (basePrice - price) * 0.01;
    const noise = (Math.random() - 0.48) * basePrice * volatility;
    price = price + drift + noise;
    data.push({
      value: price,
      date: new Date(now - (points - i) * 60_000),
    });
  }

  return data;
}

export const PriceChart = ({ currentPrice }: { currentPrice: number }) => {
  const [activeChartTab, setActiveChartTab] = useState(chartTabs[0].id);
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>("5m");

  const formattedPrice = useMemo(
    () => formatCurrency(currentPrice),
    [currentPrice],
  );

  const chartData = useMemo(() => {
    const data: Record<Timeframe, ChartData> = {
      "1m": generatePriceData(currentPrice, 60, 0.0008),
      "5m": generatePriceData(currentPrice, 120, 0.0015),
      "15m": generatePriceData(currentPrice, 96, 0.002),
      "1H": generatePriceData(currentPrice, 120, 0.004),
      "4H": generatePriceData(currentPrice, 90, 0.008),
      "1D": generatePriceData(currentPrice, 180, 0.015),
    };
    return data;
  }, [currentPrice]);

  const ohlcv = useMemo(() => {
    const o = currentPrice * 0.99;
    const h = currentPrice * 1.005;
    const l = currentPrice * 0.975;
    const c = currentPrice;
    const change = c - o;
    const changePct = ((change / o) * 100).toFixed(2);
    return {
      o: formatCurrency(o),
      h: formatCurrency(h),
      l: formatCurrency(l),
      c: formatCurrency(c),
      change: change.toFixed(2),
      changePct,
      vol: "19.33",
    };
  }, [currentPrice]);

  const currentTime = useMemo(() => {
    const now = new Date();
    return [
      String(now.getHours()).padStart(2, "0"),
      String(now.getMinutes()).padStart(2, "0"),
      String(now.getSeconds()).padStart(2, "0"),
    ].join(":");
  }, []);

  return (
    <VStack gap={0} width="100%" style={{ height: "100%", overflow: "hidden" }}>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        paddingX={1.5}
        paddingY={0.5}
        borderedBottom
      >
        <TabNavigation
          variant="secondary"
          tabs={chartTabs}
          value={activeChartTab}
          onChange={setActiveChartTab}
        />
      </HStack>

      <HStack
        alignItems="center"
        justifyContent="space-between"
        paddingX={1.5}
        paddingY={0.25}
        borderedBottom
      >
        <HStack alignItems="center" gap={0.5}>
          {timeframes.map((tf) => (
            <Button
              key={tf}
              compact
              variant={selectedTimeframe === tf ? "primary" : "secondary"}
              onClick={() => setSelectedTimeframe(tf)}
            >
              {tf}
            </Button>
          ))}

          <Divider direction="vertical" />

          <Button compact variant="secondary">
            Indicators
          </Button>
        </HStack>
      </HStack>

      <HStack gap={0} flexGrow={1}>
        <VStack
          gap={0}
          paddingY={0.5}
          style={{
            width: 30,
            flexShrink: 0,
            borderRight: "1px solid var(--border)",
          }}
          alignItems="center"
        >
          {drawingTools.map((tool) => (
            <Box
              key={tool.title}
              display="flex"
              alignItems="center"
              justifyContent="center"
              style={{
                width: 24,
                height: 24,
                cursor: "pointer",
                fontSize: 14,
                opacity: 0.6,
                borderRadius: 4,
              }}
              title={tool.title}
            >
              <Text as="span" font="caption" color="fgMuted">
                {tool.label}
              </Text>
            </Box>
          ))}
        </VStack>

        <Box flexGrow={1} style={{ minHeight: 0 }} position="relative">
          <VStack
            gap={0}
            paddingX={1}
            paddingY={0.5}
            style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}
          >
            <HStack gap={0.5} alignItems="center">
              <Text as="span" font="caption" color="fgMuted">
                O
              </Text>
              <Text as="span" font="caption" color="fg">
                {ohlcv.o}
              </Text>
              <Text as="span" font="caption" color="fgMuted">
                H
              </Text>
              <Text as="span" font="caption" color="fg">
                {ohlcv.h}
              </Text>
              <Text as="span" font="caption" color="fgMuted">
                L
              </Text>
              <Text as="span" font="caption" color="fg">
                {ohlcv.l}
              </Text>
              <Text as="span" font="caption" color="fgMuted">
                C
              </Text>
              <Text as="span" font="caption" color="fg">
                {ohlcv.c}
              </Text>
              <Text as="span" font="caption" color="fgPositive">
                {ohlcv.change} (+{ohlcv.changePct}%)
              </Text>
              <Text as="span" font="caption" color="fgMuted">
                VOL
              </Text>
              <Text as="span" font="caption" color="fg">
                {ohlcv.vol}
              </Text>
            </HStack>
            <Text as="span" font="caption" style={{ color: "#7B61FF" }}>
              VOLUME SMA 19
            </Text>
          </VStack>

          <Box
            style={{
              position: "absolute",
              top: 40,
              left: 0,
              right: 0,
              bottom: 28,
              zIndex: 1,
            }}
          >
            <SparklineInteractive
              data={chartData}
              periods={periods}
              defaultPeriod={selectedTimeframe}
              onPeriodChanged={(p) => setSelectedTimeframe(p)}
              strokeColor="#C900FF"
              fill
              formatDate={(date) =>
                date.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
              formatHoverPrice={(price) => formatCurrency(price)}
              formatHoverDate={(date) =>
                date.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
              }
              hidePeriodSelector
            />
          </Box>

          <Box
            display="flex"
            alignItems="center"
            width="100%"
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              zIndex: 2,
              pointerEvents: "none",
            }}
          >
            <Box
              width="100%"
              style={{
                borderTop: "1px dashed var(--cds-color-fg-muted, #888)",
              }}
            />
            <Box
              paddingX={1}
              paddingY={0.25}
              style={{
                position: "absolute",
                right: 0,
                backgroundColor: "var(--cds-color-bg-alternate, #1a1a1a)",
                border: "1px solid var(--cds-color-fg-muted, #888)",
                borderRadius: 4,
                whiteSpace: "nowrap",
              }}
            >
              <Text as="span" font="label2" color="fg">
                {formattedPrice}
              </Text>
            </Box>
          </Box>

          <HStack
            alignItems="center"
            justifyContent="space-between"
            paddingX={1.5}
            paddingY={0.25}
            borderedTop
            flexShrink={0}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 2,
              background: "var(--cds-color-bg, #0a0a0a)",
            }}
          >
            <HStack alignItems="center" gap={1}>
              {bottomTimeRanges.map((range) => (
                <Text
                  key={range}
                  as="button"
                  font="caption"
                  color="fgMuted"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "2px 4px",
                  }}
                >
                  {range}
                </Text>
              ))}
              <Icon name="caretDown" size="s" color="fgMuted" />
            </HStack>

            <HStack alignItems="center" gap={1}>
              <Text as="span" font="caption" color="fgMuted">
                {currentTime} (UTC-6)
              </Text>

              <Divider direction="vertical" />

              <Text
                as="button"
                font="caption"
                color="fgMuted"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                %
              </Text>
              <Text
                as="button"
                font="caption"
                color="fgMuted"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                LOG
              </Text>
              <Text
                as="button"
                font="caption"
                color="fgPositive"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                AUTO
              </Text>
            </HStack>
          </HStack>
        </Box>
      </HStack>
    </VStack>
  );
};
