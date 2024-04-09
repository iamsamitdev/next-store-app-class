import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled } from '@mui/material/styles'
import { IconMenu2 } from '@tabler/icons-react'
import Notifications from './Notification'
import Profile from './Profile'
import Search from './Search'
import Language from './Language'
import MobileRightSidebar from './MobileRightSidebar'

const Header = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'))
  const lgDown = useMediaQuery((theme: any) => theme.breakpoints.down('lg'))

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: 64,
    },
  }))
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '98%',
    color: theme.palette.text.secondary,
  }))

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {/* ------------------------------------------- */}
        {/* Toggle Button Sidebar */}
        {/* ------------------------------------------- */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={lgUp ? () => {} : () => {}}
        >
          <IconMenu2 size="20" />
        </IconButton>

        {/* ------------------------------------------- */}
        {/* Search Dropdown */}
        {/* ------------------------------------------- */}
        <Search />

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Language />
          
          {/* ------------------------------------------- */}
          {/* End Ecommerce Dropdown */}
          {/* ------------------------------------------- */}
          <Notifications />
          {/* ------------------------------------------- */}
          {/* Toggle Right Sidebar for mobile */}
          {/* ------------------------------------------- */}
          {lgDown ? <MobileRightSidebar /> : null}
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  )
}

export default Header
