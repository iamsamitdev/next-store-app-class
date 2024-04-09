import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import Image from 'next/image'
import Link from "next/link"
import Scrollbar from "@/app/components/back/custom-scroll/Scrollbar"
import SidebarItems from "./SidebarItems"
import { Profile } from "./SidebarProfile/Profile"

type Props = {}

export default function Sidebar({}: Props) {

    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.down("lg"))
    const theme = useTheme()

    return (
        <>
            {!lgUp ? (
                <Box
                    sx={{
                        zIndex: 100,
                        width: 270,
                        flexShrink: 0,
                    }}
                >
                    <Drawer
                        anchor="left"
                        open
                        variant="permanent"
                        PaperProps={{
                            sx: {
                              transition: theme.transitions.create("width", {
                                duration: theme.transitions.duration.shortest,
                              }),
                              width: 270,
                              boxSizing: "border-box",
                            },
                          }}
                        >
                           <Box px={3} py={1}>
                                <Link href='/backend/dashboard'>
                                    <Image
                                        src={"/images/logos/NextStoreLogo.svg"}
                                        alt="logo"
                                        height={40}
                                        width={174}
                                        priority
                                    />
                                </Link>
                            </Box>

                            <Scrollbar sx={{ height: "calc(100% - 190px)" }}>
                                <SidebarItems />
                            </Scrollbar>

                            <Profile />

                    </Drawer>
                </Box>
                ) : (
                    <Drawer
                    anchor="left"
                    open
                    variant="temporary"
                    PaperProps={{
                        sx: {
                        width: 270,
                        border: "0 !important",
                        boxShadow: (theme: any) => theme.shadows[8],
                        },
                    }}
                    >
                        <Box px={2}>
                            <Link href='/'>
                                <Image
                                    src={"/images/logos/NextStoreLogo.svg"}
                                    alt="logo"
                                    height={40}
                                    width={174}
                                    priority
                                />
                            </Link>
                        </Box>
                        <SidebarItems />
                    </Drawer>
                )
            }
        </>
    )
}