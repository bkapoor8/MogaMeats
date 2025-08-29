"use client";
import { BellIcon } from "@/icons/BellIcon";
import { ChevronDownIcon } from "@/icons/ChevronDownIcon";
import { MenuIcon } from "@/icons/MenuIcon";
import { ShoppingBagIcon } from "@/icons/ShoppingBagIcon";
import { SignOutIcon } from "@/icons/SignOutIcon";
import { TagIcon } from "@/icons/TagIcon";
import { UserIcon } from "@/icons/UserIcon";
import { UsersIcon } from "@/icons/UsersIcon";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from "react";
import mogameatlogo from "../../assets/Moga_Meats.png";
import { CartContext } from "../../util/ContextProvider";
import { useProfile } from "../hooks/useProfile";

interface Notification {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
}

const Header = () => {
  const { data: session } = useSession();
  const { cartProducts } = useContext(CartContext);
  const pathname = usePathname();
  const { data: profileData } = useProfile();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Function to fetch notifications (replace with actual API call)
  const fetchNotifications = async (pageNum =1) => {
    try {
      setIsLoading(true);
      fetch('/api/notification')
        .then(res => res.json())
        .then(data => {
          setNotifications(data);
        });
      if (notifications.length === 0 || pageNum >= 3) {
        setHasMore(false);
        return;
      }

    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };
  // Reset notifications when user changes
  useEffect(() => {
    setNotifications([]);
    setPage(1);
    setHasMore(true);
  }, [profileData]);

  // Fetch notifications when page or profileData changes
  useEffect(() => {
    if (profileData && hasMore && !isLoading) {
      fetchNotifications(1);
    }
  }, [profileData, page]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 } // Lower threshold for better UX
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [hasMore, isLoading]);

  
  return (
    <Navbar className="font-semibold bg-dark py-3 lg:px-8">
      <NavbarBrand>
        <Link href="/">
          <Image
            src={mogameatlogo}
            alt="Moga Meat Bar & Grill Logo"
            width={100}
            height={60}
            className="block md:inline"
          />
        </Link>
      </NavbarBrand>

      {/* Mobile Sidebar Toggle */}
      <NavbarContent className="lg:hidden" justify="start">
        <Button isIconOnly className="bg-transparent" onClick={toggleSidebar}>
          <MenuIcon className="w-6 stroke-white" />
        </Button>
      </NavbarContent>

      {/* Sidebar for Mobile */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black z-40"
            onClick={toggleSidebar}
          ></div>
          <div className="fixed top-0 left-0 bg-black z-50 pt-12 pb-12 pl-12 pr-44 shadow-lg">
            <button
              className="absolute top-4 right-4 text-white"
              onClick={toggleSidebar}
            >
              ✖
            </button>
            <nav className="flex flex-col space-y-4 mt-8">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <Link href="/menu" className="hover:text-primary">
                Menu
              </Link>
              <Link href="/services" className="hover:text-primary">
                Services
              </Link>
              <Link href="/about" className="hover:text-primary">
                About
              </Link>
              <Link href="/contact" className="hover:text-primary">
                Contact
              </Link>
            </nav>
          </div>
        </>
      )}

      {/* Desktop Navigation */}
      <NavbarContent className="hidden lg:flex gap-8" justify="center">
        <NavbarItem isActive={pathname === "/"}>
          <Link href="/" aria-current="page" className="hover:text-primary">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/menu"}>
          <Link href="/menu" className="hover:text-primary">
            Menu
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/services"}>
          <Link href="/services" className="hover:text-primary">
            Services
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/about"}>
          <Link href="/about" className="hover:text-primary">
            About
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/contact"}>
          <Link href="/contact" className="hover:text-primary">
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* User Profile and Notifications Section */}
      <NavbarContent justify="end">
        {notifications && (
          <Dropdown className="text-gray-300 bg-dark rounded-lg">
            <DropdownTrigger>
              <Button isIconOnly className="bg-transparent relative">
                <BellIcon className="w-6 stroke-white" />
                {notifications.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-primary text-dark text-xs absolute right-0 top-0 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Notifications Menu"
              color="default"
              className="max-h-[300px] overflow-y-auto w-64 p-2 bg-dark text-gray-300 rounded-lg"
            >
              {/* {notifications.length === 0 && !isLoading ? (
                <DropdownItem key="no-notifications" className="text-gray-300 text-center">
                  No notifications
                </DropdownItem>
              ) : ( */}
                {notifications.map((notification) => (
                  <DropdownItem key={notification?._id} className="py-2 hover:bg-gray-700">
                    <Link href={`/orders/${
                        notification?.body.match(/#([a-f0-9]+)/)?.[1] ?? ""
                      }`}>
                      <div className="flex flex-col">
                        <span>{notification?.title}</span>
                        <span>{notification?.body}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(notification?.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </Link>
                  </DropdownItem>
                // ))
              ))}
              {/* <DropdownItem
                ref={loaderRef}
                key="loader"
                className="text-center text-gray-300"
              >
                <div>{isLoading ? "Loading..." : "Scroll to load more"}</div>
              </DropdownItem> */}
            </DropdownMenu>
          </Dropdown>
        )}

        {profileData ? (
          <div className="flex items-center">
            <Dropdown className="text-gray-300">
              <DropdownTrigger>
                <Button
                  className="bg-transparent h-full"
                  startContent={
                    <Avatar
                      src={profileData?.image || ""}
                      isBordered
                      color="primary"
                      size="sm"
                    />
                  }
                  endContent={<ChevronDownIcon className="w-4 stroke-white" />}
                  disableAnimation
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Menu" color="primary">
                <DropdownItem
                  key="profile"
                  href="/profile"
                  startContent={<UserIcon className="w-6" />}
                >
                  My Profile
                </DropdownItem>
                <DropdownItem
                  key="orders"
                  href="/orders"
                  startContent={<ShoppingBagIcon className="w-6" />}
                >
                  Orders
                </DropdownItem>
                <DropdownItem
                  className={profileData.isAdmin ? "" : "hidden"}
                  key="categories"
                  href="/categories"
                  startContent={<TagIcon className="w-6" />}
                >
                  Categories
                </DropdownItem>
                <DropdownItem
                  className={profileData.isAdmin ? "" : "hidden"}
                  key="rawmeatcategories"
                  href="/rawmeatcategories"
                  startContent={<TagIcon className="w-6" />}
                >
                  Raw Categories
                </DropdownItem>
                <DropdownItem
                  className={profileData.isAdmin ? "" : "hidden"}
                  key="menu-items"
                  href="/menu-items"
                  startContent={<MenuIcon className="w-6" />}
                >
                  Menu Items
                </DropdownItem>
                <DropdownItem
                  className={profileData.isAdmin ? "" : "hidden"}
                  key="menu-raw-items"
                  href="/menu-raw-items"
                  startContent={<MenuIcon className="w-6" />}
                >
                  Raw Meat Menu Items
                </DropdownItem>
                <DropdownItem
                  className={profileData.isAdmin ? "" : "hidden"}
                  key="users"
                  href="/users"
                  startContent={<UsersIcon className="w-6" />}
                >
                  Users
                </DropdownItem>
                <DropdownItem
                  key="carts"
                  href="/cart"
                  startContent={<UsersIcon className="w-6" />}
                >
                  Carts{" "}
                  {cartProducts.length > 0 && (
                    <span className="w-4 h-4 rounded-full bg-primary text-dark text-xs absolute right-1 top-0">
                      {cartProducts.length}
                    </span>
                  )}
                </DropdownItem>
                <DropdownItem
                  key="signOut"
                  startContent={<SignOutIcon className="w-6" />}
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        ) : (
        //   <Button href="/login" className="bg-primary text-white">
        //     Log In
        //   </Button>
        // // )}
        <div className="flex items-center">
          <Dropdown className="text-gray-300">
            <DropdownTrigger>
              <Button
                className="bg-transparent h-full"
                startContent={<UsersIcon className="w-6" />}
                endContent={<ChevronDownIcon className="w-4 stroke-white" />}
                disableAnimation
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Menu" color="primary">
              <DropdownItem key="login" href="/login">
                Login
              </DropdownItem>
              <DropdownItem key="register" href="/register">
                SignUp
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default Header;