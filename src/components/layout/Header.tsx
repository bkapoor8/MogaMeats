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
import React, { useContext } from "react";
import { ChevronDownIcon } from "@/icons/ChevronDownIcon";
import { MenuIcon } from "@/icons/MenuIcon";
import { usePathname } from "next/navigation";
import { CartContext } from "../../util/ContextProvider";
import { useProfile } from "../hooks/useProfile";

const Header = () => {
  const { data: session } = useSession();
  const { cartProducts } = useContext(CartContext);
  const pathname = usePathname();
  const { data: profileData } = useProfile();

  return (
    <Navbar className="font-semibold bg-dark py-3 px-4 lg:px-8">
      <NavbarBrand>
        <Link href="/" className="text-primary text-xl lg:text-2xl font-josefin">
          Moga Meat Bar & Grill
        </Link>
      </NavbarBrand>

      {/* Mobile View */}
      <NavbarContent className="lg:hidden" justify="end">
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly className="bg-transparent">
              <MenuIcon className="w-6 stroke-white" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu color="primary" aria-label="Mobile Navigation Menu">
            {/* Navigation Items */}
            <DropdownItem key="home" href="/">
              Home
            </DropdownItem>
            <DropdownItem key="menu" href="/menu">
              Menu
            </DropdownItem>
            <DropdownItem key="services" href="/services">
              Services
            </DropdownItem>
            <DropdownItem key="about" href="/about">
              About
            </DropdownItem>
            <DropdownItem key="contact" href="/contact">
              Contact
            </DropdownItem>

            {/* Conditional Auth Options */}
            {session ? (
              <>
                <DropdownItem key="profile" href="/profile">
                  My Profile
                </DropdownItem>
                <DropdownItem key="orders" href="/orders">
                  Orders
                </DropdownItem>
                <DropdownItem
                  key="signOut"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Sign Out
                </DropdownItem>
              </>
            ) : (
              <>
                <DropdownItem key="login" href="/login">
                  Login
                </DropdownItem>
                <DropdownItem key="signup" href="/register">
                  Sign Up
                </DropdownItem>
              </>
            )}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      {/* Desktop View */}
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

      {/* User Section */}
      <NavbarContent justify="end">
        {session ? (
          <div className="flex items-center">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="bg-transparent"
                  startContent={
                    <Avatar
                      src={profileData?.image || ""}
                      isBordered
                      color="primary"
                      size="sm"
                    />
                  }
                  endContent={<ChevronDownIcon className="w-4 stroke-white" />}
                />
              </DropdownTrigger>
              <DropdownMenu color="primary" aria-label="User Menu">
                <DropdownItem key="profile" href="/profile">
                  My Profile
                </DropdownItem>
                <DropdownItem key="orders" href="/orders">
                  Orders
                </DropdownItem>
                <DropdownItem
                  key="signOut"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button
              as={Link}
              href="/cart"
              className="bg-transparent relative min-w-10"
              startContent={<CartIcon className="w-8 stroke-white" />}
            >
              {cartProducts.length > 0 && (
                <span className="absolute w-4 h-4 rounded-full bg-primary text-dark text-xs top-0 right-1">
                  {cartProducts.length}
                </span>
              )}
            </Button>
          </div>
        ) : (
          <div className="hidden lg:flex gap-6 items-center">
            <Link href="/login" className="hover:text-primary">
              Login
            </Link>
            <Button
              as={Link}
              color="primary"
              href="/register"
              className="font-semibold rounded-full px-6 py-2 text-dark"
            >
              Sign Up
            </Button>
          </div>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
