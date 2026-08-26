import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Mail,
  NotebookPen,
  ListChecks,
  Telescope,
  MessagesSquare,
  BrainCircuit,
  ShieldCheck,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Email Generator", url: "/email", icon: Mail },
  { title: "Meeting Notes", url: "/meetings", icon: NotebookPen },
  { title: "Task Planner", url: "/planner", icon: ListChecks },
  { title: "Research Assistant", url: "/research", icon: Telescope },
  { title: "AI Chatbot", url: "/chat", icon: MessagesSquare },
] as const;

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader>
        <div className="flex items-center gap-3 px-1 py-3">
          <span className="bg-ember-gradient animate-pulse-ring flex size-10 shrink-0 items-center justify-center rounded-2xl shadow-lg">
            <BrainCircuit className="size-5 text-maroon-foreground" />
          </span>
          {!collapsed && (
            <div className="leading-tight">
              <p className="text-base font-extrabold tracking-tight">EnO</p>
              <p className="text-[11px] uppercase tracking-[0.18em] opacity-60">Workplace AI</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.2em] opacity-60">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {items.map((item) => {
                const active = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                      className="group/nav relative h-10 rounded-xl transition-all duration-300 data-[active=true]:shadow-lg"
                    >
                      <Link to={item.url}>
                        {active && (
                          <span className="bg-ember-gradient absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full" />
                        )}
                        <item.icon className="transition-transform duration-300 group-hover/nav:scale-110" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {!collapsed && (
          <div className="m-1 flex gap-2 rounded-xl bg-sidebar-accent/70 p-3 text-[11px] leading-relaxed opacity-90">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-sidebar-primary" />
            <p>AI outputs are drafts. Always review before sending or acting.</p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
