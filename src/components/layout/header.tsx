"use client";

import Link from "next/link";
import {
  Bell,
  FlaskConical,
  Home,
  LineChart,
  CircleUser,
  LogOut,
  Menu,
  Package2,
  Search,
  Settings,
  PlusCircle,
  Vote,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import { notifications, user } from "@/lib/placeholder-data";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/profile", label: "Dashboard", icon: LineChart },
    { href: "/tasks/new", label: "New Task", icon: PlusCircle },
    { href: "/governance", label: "Governance", icon: Vote },
  ];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 sticky top-0 z-50">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base font-headline"
        >
          <FlaskConical className="h-6 w-6 text-primary" />
          <span>SciCrowdAI</span>
        </Link>
        {navItems.map(item => (
             <Link
             key={item.label}
             href={item.href}
             className={cn(
                "transition-colors hover:text-foreground",
                pathname === item.href ? "text-foreground" : "text-muted-foreground"
             )}
           >
             {item.label}
           </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold font-headline"
            >
              <FlaskConical className="h-6 w-6 text-primary" />
              <span>SciCrowdAI</span>
            </Link>
            {navItems.map(item => (
                 <Link
                 key={item.label}
                 href={item.href}
                 className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                    pathname === item.href ? "bg-muted text-primary" : "text-muted-foreground",
                 )}
               >
                 <item.icon className="h-4 w-4" />
                 {item.label}
               </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tasks..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 justify-center p-0 text-xs" variant="destructive">
                        {notifications.filter(n => !n.read).length}
                    </Badge>
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Notifications</CardTitle>
                        <CardDescription>You have {notifications.filter(n => !n.read).length} unread messages.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                       <div className="flex flex-col max-h-80 overflow-y-auto">
                        {notifications.map((notification, index) => (
                           <div key={notification.id}>
                            <div className="p-3 hover:bg-muted/50">
                                <p className={`text-sm mb-1 ${!notification.read ? 'font-semibold' : ''}`}>{notification.text}</p>
                                <p className="text-xs text-muted-foreground">{notification.time}</p>
                            </div>
                             {index < notifications.length - 1 && <Separator />}
                           </div>
                        ))}
                       </div>
                    </CardContent>
                </Card>
            </PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/profile">Profile</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="#">Settings</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
