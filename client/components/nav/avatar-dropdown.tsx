"use client";

import { useAuthStore } from "@/store/auth.store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function AvatarDropdown() {
    const { user } = useAuthStore();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                        <AvatarImage
                            src={
                                // user.profileImg ||
                                "https://github.com/shadcn.png"
                            }
                            alt="shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-3xs px-4 py-3 mr-5">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Avatar size="default">
                            <AvatarImage
                                src={
                                    // user.profileImg ||
                                    "https://github.com/shadcn.png"
                                }
                                alt="shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-0.5 text-sm p-2.5">
                            <h6 className="font-semibold">{`${user?.firstName} ${user?.lastName}`}</h6>
                            <p className="font-light uppercase">{user?.role}</p>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Staff Management</DropdownMenuItem>
                    <DropdownMenuItem>What&apos;s New?</DropdownMenuItem>
                    <DropdownMenuItem>Get help?</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
