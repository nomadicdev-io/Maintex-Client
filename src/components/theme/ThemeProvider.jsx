import { ThemeProvider as NextThemesProvider } from "next-themes"
import BGImage from "@/components/layouts/BGImage";
import ToastProvider from "@/components/ui/ToastProvider";

export default function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
        defaultTheme="system" 
        attribute={['class', 'data-theme']} 
    >
      <BGImage />
      <>{children}</>
      <ToastProvider />
    </NextThemesProvider>
  )
}
