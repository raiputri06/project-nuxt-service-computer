<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'

import { Separator } from '@/components/ui/separator'

import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Package,
  Wrench,
  FileText,
  Settings,
  Search,
  Plus,
} from 'lucide-vue-next'

const route = useRoute()

const menuItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Customers',
    href: '/customers',
    icon: Users,
  },
  {
    title: 'Service Orders',
    href: '/service-orders',
    icon: ClipboardList,
  },
  {
    title: 'Inventory',
    href: '/inventory',
    icon: Package,
  },
  {
    title: 'Technicians',
    href: '/technicians',
    icon: Wrench,
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: FileText,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
]
</script>

<template>
  <SidebarProvider>
    <Sidebar collapsible="icon">
      <!-- Sidebar Header -->
      <SidebarHeader class="border-b">
        <div class="flex items-center gap-3 px-2 py-3">
          <Avatar class="h-9 w-9 shrink-0">
            <AvatarImage
              src="/avatar.png"
              alt="Service Tech"
            />
            <AvatarFallback>
              ST
            </AvatarFallback>
          </Avatar>

          <div class="min-w-0 flex-1">
            <p class="name">
              Service Tech #042
            </p>
            <p class="paragraf">
              Lead Technician
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu class="gap-1 px-2 py-4">

          <SidebarMenuItem
            v-for="item in menuItems"
            :key="item.title"
          >
            <SidebarMenuButton
              as-child
              :is-active="route.path === item.href"
              tooltip="item.title"
              class="h-9"
            >
              <NuxtLink :to="item.href">
                <component
                  :is="item.icon"
                  class="h-4 w-4 shrink-0"
                />

                <span class="nav">
                  {{ item.title }}
                </span>
              </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarContent>
    </Sidebar>

    <SidebarInset>
      <header
        class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-3 border-b bg-background px-4"
      >
        <SidebarTrigger class="-ml-1" />

        <Separator
          orientation="vertical"
          class="mr-2 h-5"
        />
        <div class="flex flex-1 items-center">
          <div>
            <h1 class="title text-primary">
              Technicians
            </h1>
          </div>
        </div>
        <div class="relative hidden w-full max-w-xs md:block">
          <Search
            class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            type="search"
            placeholder="Search technicians..."
            class=" border-2 border-border bg-primary-background  rounded-full px-10 py-2 mt-1 pl-9 focus-visible:ring-0 "
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          class="md:hidden"
        >
          <Search class="h-4 w-4" />
        </Button>

        <!-- Profile
        <Button
          variant="ghost"
          size="icon"
          class="rounded-full"
        >
          <Avatar class="h-8 w-8">
            <AvatarImage
              src="/avatar.png"
              alt="Service Tech"
            />

            <AvatarFallback>
              ST
            </AvatarFallback>
          </Avatar>
        </Button> -->

      </header>
      <main class="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <slot />
      </main>

    </SidebarInset>
  </SidebarProvider>
</template>