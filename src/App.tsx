import { useState, useCallback } from "react";
import type { ColorScheme } from "@coinbase/cds-common";
import { ThemeProvider } from "@coinbase/cds-web";
import { appTheme } from "./theme";
import { Box, Divider, HStack, VStack } from "@coinbase/cds-web/layout";
import { MediaQueryProvider } from "@coinbase/cds-web/system";
import { Banner } from "./components/Banner";
import { TopBar } from "./components/TopBar";
import { PriceChart } from "./components/PriceChart";
import { OrderBook } from "./components/OrderBook";
import { OrderForm } from "./components/OrderForm";
import { BottomPanel } from "./components/BottomPanel";
import { cryptoAssets } from "./data/assets";

export const App = () => {
  const [activeColorScheme, setActiveColorScheme] =
    useState<ColorScheme>("dark");
  const [selectedAsset] = useState(cryptoAssets[0]);

  const toggleColorScheme = useCallback(
    () => setActiveColorScheme((s) => (s === "light" ? "dark" : "light")),
    [],
  );

  return (
    <MediaQueryProvider>
      <ThemeProvider theme={appTheme} activeColorScheme={activeColorScheme}>
        <VStack
          style={{
            height: "100%",
            width: "100%",
            minHeight: "100vh",
            overflow: "hidden",
            backgroundColor: "#733381",
          }}
        >
          <Banner />

          <Box
            flexGrow={1}
            width="100%"
            minWidth={0}
            background="bg"
            style={{
              minHeight: 0,
              overflow: "hidden",
              borderTopLeftRadius: 14,
              borderTopRightRadius: 14,
            }}
          >
            <VStack
              height="100%"
              width="100%"
              style={{
                overflow: "hidden",
                minWidth: 0,
                minHeight: 0,
                paddingBottom: 196,
              }}
            >
              <TopBar
                asset={selectedAsset}
                toggleColorScheme={toggleColorScheme}
              />

              <HStack
                flexGrow={1}
                width="100%"
                style={{ minHeight: 0, minWidth: 0, overflow: "hidden" }}
              >
                <Box flexGrow={1} style={{ minWidth: 0, overflow: "hidden" }}>
                  <PriceChart currentPrice={selectedAsset.price} />
                </Box>

                <Divider direction="vertical" />

                <Box style={{ width: 260, flexShrink: 0, overflow: "auto" }}>
                  <OrderBook midPrice={selectedAsset.price} />
                </Box>

                <Divider direction="vertical" />

                <Box
                  position="relative"
                  style={{
                    width: 360,
                    flexShrink: 0,
                  }}
                >
                  <div
                    className="order-form-scroll"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      overflowY: "auto",
                      overflowX: "hidden",
                    }}
                  >
                    <OrderForm asset={selectedAsset} />
                  </div>
                </Box>
              </HStack>
            </VStack>

            <Box
              position="fixed"
              bottom={0}
              left={0}
              right={0}
              zIndex={10}
              background="bg"
            >
              <BottomPanel />
            </Box>
          </Box>
        </VStack>
      </ThemeProvider>
    </MediaQueryProvider>
  );
};
