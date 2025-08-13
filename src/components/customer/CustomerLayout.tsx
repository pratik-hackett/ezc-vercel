import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { RootState } from "@/store/store";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CustomerSidebar } from "@/components/customer/CustomerSidebar";
import { CustomerMenuBar } from "@/components/customer/CustomerMenubar";

interface CustomerLayoutProps {
  children: React.ReactNode;
}

export function CustomerLayout({ children }: CustomerLayoutProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if no user or wrong type
    if (!user || user.eu_type !== 3) {
      navigate("/auth");
    }
  }, [user, navigate]);

  if (!user || user.eu_type !== 3) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/50">
        <CustomerSidebar />
        <div className="flex-1 flex flex-col">
          <CustomerMenuBar />
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto p-6">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
