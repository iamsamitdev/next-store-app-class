import { uniqueId } from "lodash"

interface MenuitemsType {
  [x: string]: any
  id?: string
  navlabel?: boolean
  subheader?: string
  title?: string
  icon?: any
  href?: string
  children?: MenuitemsType[]
  chip?: string
  chipColor?: string
  variant?: string
  external?: boolean
}

import {
    IconAward,
    IconBan,
    IconStar,
    IconMoodSmile,
    IconDashboard,
    IconBrandProducthunt
  } from "@tabler/icons-react"

  const Menuitems: MenuitemsType[] = [
    {
      navlabel: true,
      subheader: "Main",
    },
  
    {
      id: uniqueId(),
      title: "Dashboard",
      icon: IconDashboard,
      href: "/backend/dashboard",
      chipColor: "secondary",
    },
    {
      id: uniqueId(),
      title: "Products",
      icon: IconBrandProducthunt,
      href: "/backend/products",
    },
  
    {
      navlabel: true,
      subheader: "Other",
    },
    {
      id: uniqueId(),
      title: "Disabled",
      icon: IconBan,
      href: "",
      disabled: true,
    },
    {
      id: uniqueId(),
      title: "SubCaption",
      subtitle: "This is the sutitle",
      icon: IconStar,
      href: "",
    },
    {
      id: uniqueId(),
      title: "Chip",
      icon: IconAward,
      href: "",
      chip: "9",
      chipColor: "primary",
    },
    {
      id: uniqueId(),
      title: "Outlined",
      icon: IconMoodSmile,
      href: "",
      chip: "outline",
      variant: "outlined",
      chipColor: "primary",
    },
    {
      id: uniqueId(),
      title: "External Link",
      external: true,
      icon: IconStar,
      href: "https://google.com",
    },
  ];
  
  export default Menuitems