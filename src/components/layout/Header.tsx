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
import { usePathname } from "next/navigation";
import { memo, useCallback, useContext, useEffect, useRef, useState } from "react";
import mogameatlogo from "../../assets/Moga_Meats.png";
import { CartContext } from "../../util/ContextProvider";
import NotificationDropdown from "../common/NotificationDropdown";
import { useProfile } from "../hooks/useProfile";

// Define interfaces for type safety
interface Notification {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
}

interface ProfileData {
  _id?: string; // Added for type safety
  isAdmin: boolean;
  image?: string;
}

// Debounce utility function
const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const Header = () => {
  const { data: session } = useSession();
  const cartCtx = useContext(CartContext);
  const cartProducts = cartCtx?.cartProducts ?? []; // Fallback for context
  const pathname = usePathname();
  const { data: profileData } = useProfile() as { data: ProfileData | null };
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Toggle sidebar
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  // Fetch notifications with debouncing
  const fetchNotifications = useCallback(
    debounce(async (pageNum: number) => {
      if (!profileData || isLoading || !hasMore) return;

      try {
        setIsLoading(true);
        const res = await fetch(`/api/notification?page=${pageNum}`);
        if (!res.ok) throw new Error("Failed to fetch notifications");
        const data: Notification[] = await res.json();

        setNotifications((prev) => [...prev, ...data]);
        if (data.length === 0 || pageNum >= 3) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [profileData, isLoading, hasMore]
  );

  // Reset notifications when user changes
  useEffect(() => {
    setNotifications([]);
    setPage(1);
    setHasMore(true);
  }, [profileData?._id]);

  // Fetch notifications when page or profileData changes
  useEffect(() => {
    fetchNotifications(page);
  }, [page, fetchNotifications]);

  // Play notification sound for admin
  useEffect(() => {
    if (profileData?.isAdmin && notifications.length > 0 && !audioRef.current) {
      const audio = new Audio("/notification.mp3");
      audioRef.current = audio;
      audio.play().catch((error) => {
        console.error("Error playing notification sound:", error);
      });
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [notifications, profileData?.isAdmin]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
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
    <Navbar className="font-semibold bg-dark py-3 lg:px-8" maxWidth="full">
      <NavbarBrand>
        <Link href="/" aria-label="Moga Meat Bar & Grill Home">
          <Image
            src={mogameatlogo}
            alt="Moga Meat Bar & Grill Logo"
            width={100}
            height={60}
            priority
            className="block md:inline"
          />
        </Link>
      </NavbarBrand>

      {/* Mobile Sidebar Toggle */}
      <NavbarContent className="lg:hidden" justify="start">
        <Button
          isIconOnly
          className="bg-transparent"
          onClick={toggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <MenuIcon className="w-6 stroke-white" />
        </Button>
      </NavbarContent>

      {/* Sidebar for Mobile */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={toggleSidebar}
            aria-hidden="true"
          />
          <div className="fixed top-0 left-0 bg-dark z-50 pt-12 pb-12 pl-12 pr-44 shadow-lg">
            <button
              className="absolute top-4 right-4 text-white"
              onClick={toggleSidebar}
              aria-label="Close sidebar"
            >
              ✖
            </button>
            <nav className="flex flex-col space-y-4 mt-8">
              {[
                { href: "/", label: "Home" },
                { href: "/menu", label: "Menu" },
                { href: "/services", label: "Services" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-primary"
                  onClick={toggleSidebar}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}

      {/* Desktop Navigation */}
      <NavbarContent className="hidden lg:flex gap-8" justify="center">
        {[
          { href: "/", label: "Home" },
          { href: "/menu", label: "Menu" },
          { href: "/services", label: "Services" },
          { href: "/about", label: "About" },
          { href: "/contact", label: "Contact" },
        ].map((item) => (
          <NavbarItem key={item.href} isActive={pathname === item.href}>
            <Link
              href={item.href}
              className="hover:text-primary"
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* User Profile and Notifications Section */}
      <NavbarContent justify="end">
        <Dropdown className="text-gray-300 bg-dark rounded-lg">
          <DropdownTrigger>
            <Button isIconOnly className="bg-transparent relative" aria-label="Notifications">
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
            className="max-h-[300px] overflow-y-auto w-64 p-2 bg-dark text-gray-300 rounded-lg"
            variant="flat"
          >
            <NotificationDropdown notifications={notifications} />
            <DropdownItem
              key="loader"
              className="text-center text-gray-400 text-sm"
              isDisabled
            >
              {isLoading
                ? "Loading..."
                : hasMore
                  ? "Scroll to load more"
                  : "No more notifications"
              }
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {profileData ? (
          <Dropdown className="text-gray-300">
            <DropdownTrigger>
              <Button
                className="bg-transparent h-full"
                startContent={
                  <Avatar
                    src={profileData.image || ""}
                    isBordered
                    color="primary"
                    size="sm"
                    alt="User profile image"
                  />
                }
                endContent={<ChevronDownIcon className="w-4 stroke-white" />}
                disableAnimation
                aria-label="User menu"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Menu" color="primary">
              {[
                { key: "profile", href: "/profile", label: "My Profile", icon: <UserIcon className="w-6" /> },
                { key: "orders", href: "/orders", label: "Orders", icon: <ShoppingBagIcon className="w-6" /> },
                ...(profileData.isAdmin
                  ? [
                    { key: "categories", href: "/categories", label: "Categories", icon: <TagIcon className="w-6" /> },
                    { key: "rawmeatcategories", href: "/rawmeatcategories", label: "Raw Categories", icon: <TagIcon className="w-6" /> },
                    { key: "menu-items", href: "/menu-items", label: "Menu Items", icon: <MenuIcon className="w-6" /> },
                    { key: "menu-raw-items", href: "/menu-raw-items", label: "Raw Meat Menu Items", icon: <MenuIcon className="w-6" /> },
                    { key: "users", href: "/users", label: "Users", icon: <UsersIcon className="w-6" /> },
                  ]
                  : []),
                {
                  key: "carts",
                  href: "/cart",
                  label: (
                    <div className="relative">
                      Cart
                      {cartProducts.length > 0 && (
                        <span className="w-4 h-4 rounded-full bg-primary text-dark text-xs absolute right-[-20px] top-0 flex items-center justify-center">
                          {cartProducts.length}
                        </span>
                      )}
                    </div>
                  ),
                  icon: <ShoppingBagIcon className="w-6" />, // Changed to ShoppingBagIcon for consistency
                },
                {
                  key: "signOut",
                  href: "#",
                  label: "Sign Out",
                  icon: <SignOutIcon className="w-6" />,
                  onClick: () => signOut({ callbackUrl: "/" }),
                },
              ].map((item) => (
                <DropdownItem
                  key={item.key}
                  href={item.href}
                  startContent={item.icon}
                  onClick={item.onClick}
                  className={item.key === "signOut" ? "text-danger" : ""}
                >
                  {item.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Dropdown className="text-gray-300">
            <DropdownTrigger>
              <Button
                className="bg-transparent h-full"
                startContent={<UsersIcon className="w-6" />}
                endContent={<ChevronDownIcon className="w-4 stroke-white" />}
                disableAnimation
                aria-label="Guest menu"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Guest Menu" color="primary">
              <DropdownItem key="login" href="/login">
                Login
              </DropdownItem>
              <DropdownItem key="register" href="/register">
                SignUp
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default memo(Header);