"use client";

import { toTitleCase } from "@/helpers/uiHelpers";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { LuInfo } from "react-icons/lu";
import { PiXCircle } from "react-icons/pi";
import { TbCircleCheck } from "react-icons/tb";
import { toast as sonnerToast } from "sonner";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  id: string | number;
  description: string;
  title?: string;
  type?: ToastType;
  button?: ReactNode;
}

export function Toast(toast: Omit<ToastProps, "id">) {
  return sonnerToast.custom((id) => (
    <ToastComponent
      id={id}
      title={toast.title}
      description={toast.description}
      button={toast.button}
      type={toast.type || "success"}
    />
  ));
}

function ToastComponent(props: ToastProps) {
  const { title, description, button, id, type } = props;

  return (
    <div
      className={cn(
        "relative flex w-92 max-w-full text-black rounded-md rounded-l-sm bg-white border border-l-0 border-green-light overflow-hidden shadow-elevation-2",
        type === "error" && "border-red-light",
        type === "info" && "border-blue-light",
        type === "warning" && "border-yellow-light"
      )}
    >
      <div
        className={cn(
          "w-2 bg-green",
          type === "error" && "bg-red",
          type === "warning" && "bg-yellow",
          type === "info" && "bg-blue"
        )}
      />
      {/* <div className="flex-1 flex items-center justify-between py-3 px-4"> */}
      <div className="flex-1 flex items-center justify-between py-3 px-2.5">
        <div className="flex-1 flex items-center gap-2">
          {/* <div className="flex-1 flex items-center gap-4"> */}
          {type === "success" && (
            <TbCircleCheck className="text-green text-[1.75rem]" />
          )}
          {type === "error" && (
            <PiXCircle className="text-red text-[1.75rem]" />
          )}
          {type === "warning" && (
            <FiAlertTriangle className="text-yellow text-[1.625rem]" />
          )}
          {type === "info" && <LuInfo className="text-blue text-[1.625rem]" />}
          <div className="flex-1 flex flex-col">
            <h4
              className={cn(
                "text-base text-green",
                type === "error" && "text-red",
                type === "warning" && "text-yellow",
                type === "info" && "text-blue"
              )}
            >
              {title || toTitleCase(type)}
            </h4>
            <p className="text-sm text-black">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
