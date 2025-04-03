import * as React from "react";
import { useToast } from "../../hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../ui/toast";

interface ToasterProps {
  theme?: string;
  richColors?: boolean;
  position?: string;
  className?: string;
}

type ToastType = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

export function Toaster({ theme, richColors, position, className }: ToasterProps) {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }: ToastType) => (
        <Toast key={id} {...props} className={`${theme} ${richColors ? 'rich-colors' : ''}`}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && (
              <ToastDescription>{description}</ToastDescription>
            )}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport className={`${position} ${className}`} />
    </ToastProvider>
  );
}