import { HStack } from '@coinbase/cds-web/layout';
import { NavigationBar, NavigationTitle } from '@coinbase/cds-web/navigation';
import { IconButton } from '@coinbase/cds-web/buttons';
import { Avatar } from '@coinbase/cds-web/media';
import { useTheme } from '@coinbase/cds-web';

export const Navbar = ({
  toggleColorScheme,
}: {
  toggleColorScheme: () => void;
}) => {
  const theme = useTheme();
  const isDark = theme.activeColorScheme === 'dark';

  return (
    <NavigationBar
      start={
        <HStack alignItems="center" gap={1}>
          <IconButton name="trading" accessibilityLabel="Home" />
        </HStack>
      }
      end={
        <HStack alignItems="center" gap={1}>
          <IconButton name="bell" accessibilityLabel="Notifications" />
          <IconButton
            onClick={toggleColorScheme}
            name={isDark ? 'moon' : 'light'}
            accessibilityLabel="Toggle theme"
          />
          <Avatar alt="User" size="xl" />
        </HStack>
      }
    >
      <NavigationTitle>Crypto Trading</NavigationTitle>
    </NavigationBar>
  );
};
