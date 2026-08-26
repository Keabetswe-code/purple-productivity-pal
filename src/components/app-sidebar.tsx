import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Mail,
  NotebookPen,
  ListChecks,
  Telescope,
  MessagesSquare,
  BrainCircuit,
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
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-1 py-2">
          <span className="bg-ember-gradient flex size-9 shrink-0 items-center justify-center rounded-xl">
            <BrainCircuit className="size-5 text-maroon-foreground" />
          </span>
          {!collapsed && (
            <div className="leading-tight">
              <p className="text-sm font-semibold">Aurora</p>
              <p className="text-xs opacity-70">Workplace AI</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {!collapsed && (
          <p className="px-2 pb-2 text-xs opacity-70">
            AI outputs are drafts. Always review before sending or acting.
          </p>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
