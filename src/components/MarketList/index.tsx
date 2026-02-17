import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@coinbase/cds-web/tables';
import { HStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import { Icon } from '@coinbase/cds-web/icons';
import { Avatar } from '@coinbase/cds-web/media';
import { type CryptoAsset, formatCurrency, formatPercent, getAssetIconUrl } from '../../data/assets';

export const MarketList = ({
  assets,
  onSelect,
  selectedId,
}: {
  assets: CryptoAsset[];
  onSelect: (asset: CryptoAsset) => void;
  selectedId: string;
}) => {
  return (
    <Table tableLayout="auto" variant="ruled">
      <TableHeader>
        <TableRow>
          <TableCell title="Asset" width="35%" />
          <TableCell title="Price" width="25%" />
          <TableCell title="24h Change" width="20%" />
          <TableCell title="Market Cap" width="20%" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {assets.map((asset) => {
          const isPositive = asset.change24h >= 0;
          const isSelected = asset.id === selectedId;
          return (
            <TableRow
              key={asset.id}
              onClick={() => onSelect(asset)}
              style={{ cursor: 'pointer', background: isSelected ? 'var(--bgAlternate)' : undefined }}
            >
              <TableCell
                start={
                  <Avatar
                    size="l"
                    src={getAssetIconUrl(asset.symbol)}
                    alt={asset.name}
                  />
                }
                title={asset.name}
                subtitle={asset.symbol}
                width="35%"
              />
              <TableCell title={formatCurrency(asset.price)} width="25%" />
              <TableCell width="20%">
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
                    {formatPercent(asset.change24h)}
                  </Text>
                </HStack>
              </TableCell>
              <TableCell title={formatCurrency(asset.marketCap)} width="20%" />
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
