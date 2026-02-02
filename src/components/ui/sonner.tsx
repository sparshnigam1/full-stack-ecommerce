"use client";

import { useTheme } from "next-themes";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { IoAlertSharp } from "react-icons/io5";
import { RiLoader4Fill } from "react-icons/ri";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <IoMdCheckmark className="size-4" />,
        info: <IoAlertSharp className="size-4" />,
        warning: <IoAlertSharp className="size-4" />,
        error: <IoMdClose className="size-4" />,
        loading: <RiLoader4Fill className="size-4 animate-spin" />,
      }}
      style={
        {
          borderRadius: "1.25rem 1.25rem 0.625rem 0.625rem",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
