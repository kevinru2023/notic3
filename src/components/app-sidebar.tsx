import { SquarePen, MonitorPlay, Home, Search, Settings } from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    SidebarHeader,
    SidebarFooter,
} from '@/components/ui/sidebar';
import { ConnectButton } from '@mysten/dapp-kit';
import { Logo } from './logo';

// Menu items.
const items = [
    {
        title: 'Explore',
        url: '/explore',
        icon: Search,
    },
    {
        title: 'Subscriptions',
        url: '/subscriptions',
        icon: MonitorPlay,
    },
    {
        title: 'Create',
        url: '/create',
        icon: SquarePen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <Logo className="m-4 text-black" />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel></SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className="py-4">
                                        <a href={item.url} className="text-xl font-bold">
                                            <item.icon className="mr-2" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem key="Settings">
                        <SidebarMenuButton asChild className="py-4">
                            <a href={'/settings'} className="text-xl font-bold">
                                <Settings className="mr-2" />
                                <span>Settings</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <div className="mb-2 font-sans text-xl">
                        <ConnectButton className="w-full bg-slate-600" />
                    </div>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
