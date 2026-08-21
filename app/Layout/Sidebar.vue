<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar'
import {
    Avatar,
    AvatarFallback, 
    AvatarImage} 
    from '@/components/ui/avatar'

import {
  LayoutDashboard,
  Users,
  Laptop,
  ClipboardList,
  Wrench,
  Package,
  Receipt,
  FileText,
} from 'lucide-vue-next'
</script>

<template>
  <SidebarProvider>

    <Sidebar>
    <SidebarHeader>
        <div class="flex items-center gap-3">
            <Avatar>
            <AvatarImage src="/avatar.png" alt="Service Tech" />
            <AvatarFallback>ST</AvatarFallback>
            </Avatar>
            <div>
                <h1 class="text-lg font-bold">Service Tech #042</h1>
                <p class="text-sm text-muted-foreground">Service Technician</p>
            </div>
        </div>
    </SidebarHeader>

      <SidebarContent>
        <SidebarMenu class="ml-10 mt-5">

          <SidebarMenuItem>
            <SidebarMenuButton>
              <LayoutDashboard class="h-4 w-4" />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton>
              <Users class="h-4 w-4" />
              <span>Customers</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton>
              <ClipboardList class="h-4 w-4" />
              <span>Service Orders</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton>
              <Laptop class="h-4 w-4" />
              <span>Inventory</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton>
              <Wrench class="h-4 w-4" />
              <span>Technicians</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton>
              <Package class="h-4 w-4" />
              <span>Reports</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton>
              <Receipt class="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>

    <main class="flex-1">
      <slot />
    </main>
  </SidebarProvider>
</template>