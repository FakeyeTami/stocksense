import { BellRing, Store } from "lucide-react";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { AvatarDropdown } from "./avatar-dropdown";
import { QuickActionsMenu } from "./quick-actions-menu";

export function TopBar() {
    return (
        <header>
            <nav
                aria-label="Primary"
                className="flex h-full items-center justify-between px-6 py-3"
            >
                <div className="flex items-center gap-2">
                    <SidebarTrigger />
                    <Button>POS</Button>
                    <QuickActionsMenu />
                </div>
                <div className="flex items-center justify-center gap-3">
                    {/* <ThemeToggle/> */}
                    <Button variant="outline" size="icon-sm">
                        <Store size={16} />
                    </Button>
                    <Button variant="outline" size="icon-sm">
                        <BellRing size={16} />
                    </Button>
                    <AvatarDropdown />
                </div>
            </nav>
        </header>
    );
}
