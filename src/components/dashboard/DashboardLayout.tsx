import { useState } from "react";
import { Menu, Bell, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  SidebarProvider, 
  SidebarTrigger, 
  useSidebar 
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "./DashboardSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardHeader = () => {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="lg:hidden" />
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">PD</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Pashu-Dhan</h1>
            <p className="text-xs text-muted-foreground">Breed Recognition System</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <Settings className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <main className="flex-1 p-4 lg:p-6 dashboard-gradient">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};