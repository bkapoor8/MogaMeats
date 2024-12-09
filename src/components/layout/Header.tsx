"use client";
import { CartIcon } from "@/icons/CartIcon";
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
import Link from "next/link";
import React, { useContext, useState } from "react";
import { ChevronDownIcon } from "@/icons/ChevronDownIcon";
import { UserIcon } from "@/icons/UserIcon";
import { TagIcon } from "@/icons/TagIcon";
import { UsersIcon } from "@/icons/UsersIcon";
import { ShoppingBagIcon } from "@/icons/ShoppingBagIcon";
import { MenuIcon } from "@/icons/MenuIcon";
import { SignOutIcon } from "@/icons/SignOutIcon";
import { usePathname } from "next/navigation";
import { CartContext } from "../../util/ContextProvider";
import { useProfile } from "../hooks/useProfile";
import Image from "next/image";
import mogameatlogo from "../../assets/Moga_Meats.png";

const Header = () => {
  const { data: session } = useSession();
  const { cartProducts } = useContext(CartContext);
  const pathname = usePathname();
  const { data: profileData } = useProfile();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Navbar className="font-semibold bg-dark py-3 lg:px-8 ">
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
          {/* Full Black Background */}
          <div
            className="fixed inset-0 bg-black z-40"
            onClick={toggleSidebar}
          ></div>

          {/* Sidebar */}
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

      {/* User Profile Section */}
      <NavbarContent justify="end">
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
                  endContent={
                    <ChevronDownIcon className="w-4 stroke-white" />
                  }
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
                  key="menu-items"
                  href="/menu-items"
                  startContent={<MenuIcon className="w-6" />}
                >
                  Menu Items
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
                  className={profileData.isAdmin ? "" : "hidden"}
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
          <>
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
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
