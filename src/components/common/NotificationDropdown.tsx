"use client"; // Mark as client component for Next.js App Router

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import Link from "next/link";

// Define the Notification interface for type safety
interface Notification {
  _id: string;
  title: string;
  body: string | null;
  createdAt: string | Date;
}

// Props interface for the component
interface NotificationDropdownProps {
  notifications: Notification[];
}

export default function NotificationDropdown({ notifications }: NotificationDropdownProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          color="primary"
          variant="flat"
          className="px-4 py-2"
          aria-label="Open notifications dropdown"
        >
          Notifications ({notifications.length})
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Notifications menu"
        items={notifications} // Pass notifications as items
        className="w-80 bg-gray-800 border border-gray-700 rounded-md shadow-lg"
        emptyContent={
          <div className="text-center text-gray-400 py-4" role="status" aria-live="polite">
            No notifications
          </div>
        }
      >
        {(notification) => {
          // Safely extract order ID from notification body
          const orderId = notification.body?.match(/ORDER#(\w+)/)?.[1] || "";

          return (
            <DropdownItem
              key={notification._id}
              textValue={notification.title} // Required for accessibility
              className="py-2 hover:bg-gray-700 transition-colors text-gray-200"
            >
              {orderId ? (
                <Link
                  href={`/orders/${orderId}`}
                  className="block focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                  prefetch={true}
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-gray-200">{notification.title}</span>
                    <span className="text-sm text-gray-300">
                      {notification.body || "No details available"}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(notification.createdAt).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                        timeZone: "UTC",
                      })}
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-gray-200">{notification.title}</span>
                  <span className="text-sm text-gray-300">
                    {notification.body || "No details available"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(notification.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                      timeZone: "UTC",
                    })}
                  </span>
                </div>
              )}
            </DropdownItem>
          );
        }}
      </DropdownMenu>
    </Dropdown>
  );
}