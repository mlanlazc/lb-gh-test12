import { Links, Meta, Scripts, ScrollRestoration, NavLink } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { Home, Building2, Store } from 'lucide-react';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <SidebarProvider defaultOpen={true}>
          <div className="flex h-full">
            <Sidebar>
              <SidebarHeader>
                <SidebarTrigger />
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarMenu>
                    <SidebarMenuButton asChild>
                      <NavLink to="/organizations">
                        <Building2 />
                        <span>Organizations</span>
                      </NavLink>
                    </SidebarMenuButton>
                    <SidebarMenuButton asChild>
                      <NavLink to="/outlets">
                        <Store />
                        <span>Outlets</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <SidebarInset className="flex-1 overflow-y-auto">
              {children}
            </SidebarInset>
          </div>
        </SidebarProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
