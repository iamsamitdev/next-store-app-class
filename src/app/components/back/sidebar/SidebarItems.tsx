import React from 'react'
import Menuitems from './MenuItems'
import { usePathname } from "next/navigation"
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import useMediaQuery from '@mui/material/useMediaQuery'
import NavGroup from './NavGroup/NavGroup'

// Custom imports
import NavItem from './NavItem'

type Props = {}

export default function SidebarItems({ }: Props) {

    const pathname = usePathname()
    const pathDirect = pathname
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'))
    const hideMenu: any = lgUp ? false : false

    // console.log(Menuitems);

    return (
        <Box sx={{ px: 3 }}>
            <List sx={{ pt: 0 }} className="sidebarNav">
                {
                    Menuitems.map((item) => {
                        if (item.subheader) {
                            return <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />
                        } else {
                            return <NavItem item={item} key={item.id} pathDirect={pathDirect} onClick={() =>  console.log('click')} />
                        }
                    })
                }
            </List>
        </Box>
    )
}