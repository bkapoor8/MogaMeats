import { MenuIcon } from "@/icons/MenuIcon"
import { ShoppingBagIcon } from "@/icons/ShoppingBagIcon"
import { TagIcon } from "@/icons/TagIcon"
import { UserIcon } from "@/icons/UserIcon"
import { UsersIcon } from "@/icons/UsersIcon"
import { Button, Link } from "@nextui-org/react"
import { usePathname } from "next/navigation"

interface UserTabsProps {
  admin: boolean
  className?: string
}

const UserTabs = ({ admin, className }: UserTabsProps) => {
  const pathname = usePathname();
  const activeTabStyle = "bg-primary text-dark border-white"
  const inactiveTabStyle = "bg-dark border-primary text-primary hover:bg-primary hover:text-dark hover:border-white"

  return (
    <div className={`w-full flex flex-wrap justify-center items-center gap-6 ${className}`}>
      <Button
        as={Link}
        fullWidth
        radius="full"
        href="/profile"
        startContent={<UserIcon className={"w-6 stroke-2"} />}
        className={`border-2 font-semibold ${pathname.includes("/profile") ? activeTabStyle : inactiveTabStyle} sm:w-auto md:w-auto lg:w-auto`}>
        Profile
      </Button>
      <Button
        as={Link}
        fullWidth
        radius="full"
        href="/orders"
        startContent={<ShoppingBagIcon className={"w-6 stroke-2"} />}
        className={`border-2 font-semibold ${pathname.includes("/orders") ? activeTabStyle : inactiveTabStyle} sm:w-auto md:w-auto lg:w-auto`}>
        Orders
      </Button>
      {admin && (
        <>
          <Button
            as={Link}
            fullWidth
            radius="full"
            href="/categories"
            startContent={<TagIcon className={"w-6 stroke-2"} />}
            className={`border-2 font-semibold ${pathname.includes("/categories") ? activeTabStyle : inactiveTabStyle} sm:w-auto md:w-auto lg:w-auto`}>
            Categories
          </Button>
           <Button
            as={Link}
            fullWidth
            radius="full"
            href="/rawmeatcategories"
            startContent={<TagIcon className={"w-6 stroke-2"} />}
            className={`border-2 font-semibold ${pathname.includes("/rawmeatcategories") ? activeTabStyle : inactiveTabStyle} sm:w-auto md:w-auto lg:w-auto`}>
            Raw Meat Categories
          </Button>
          <Button
            as={Link}
            fullWidth
            radius="full"
            href="/menu-items"
            startContent={<MenuIcon className={"w-6 stroke-2"} />}
            className={`border-2 ${pathname.includes("/menu-items") ? activeTabStyle : inactiveTabStyle} sm:w-auto md:w-auto lg:w-auto`}>
            Menu Items
          </Button>
          <Button
            as={Link}
            fullWidth
            radius="full"
            href="/users"
            startContent={<UsersIcon className={"w-6 stroke-2"} />}
            className={`border-2 ${pathname.includes("/users") ? activeTabStyle : inactiveTabStyle} sm:w-auto md:w-auto lg:w-auto`}>
            Users
          </Button>
        </>
      )}
    </div>
  )
}

export default UserTabs
