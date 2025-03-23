import { Toaster } from "../ui/toaster"; // Corrected path

export const ToasterProvider = () => {
  return (
    <Toaster 
      theme="light"
      richColors
      position="top-right"
      className="bg-neutral-100 shadow-lg"
    />
  );
};