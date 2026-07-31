// components/ui/creatable-select.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Loader2, Plus } from "lucide-react";
import { useState } from "react";

interface Option {
    id: string;
    name: string;
}

interface CreatableSelectProps {
    options: Option[];
    value: string; // selected id
    onChange: (value: string) => void;
    placeholder?: string;
    onCreate: (name: string) => Promise<Option>; // creates and returns the new item
}

export function CreatableSelect({
    options,
    value,
    onChange,
    placeholder = "Select...",
    onCreate,
}: CreatableSelectProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [creating, setCreating] = useState(false);
    const [items, setItems] = useState<Option[]>(options);

    // What the user has typed that doesn't match any existing option
    const noMatch =
        search.length > 0 &&
        !items.some((item) => item.name.toLowerCase() === search.toLowerCase());

    const selected = items.find((item) => item.id === value);

    const handleCreate = async () => {
        if (!search.trim()) return;
        try {
            setCreating(true);
            const newItem = await onCreate(search.trim()); // call the API
            setItems((prev) => [...prev, newItem]); // add to local list
            onChange(newItem.id); // select it
            setSearch("");
            setOpen(false);
        } catch (error) {
            console.error("Failed to create:", error);
        } finally {
            setCreating(false);
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between font-normal"
                >
                    {selected ? (
                        selected.name
                    ) : (
                        <span className="text-muted-foreground">
                            {placeholder}
                        </span>
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0" align="start">
                <Command>
                    <CommandInput
                        placeholder="Search or create..."
                        value={search}
                        onValueChange={setSearch}
                    />
                    <CommandList>
                        <CommandEmpty>
                            {creating ? (
                                <div className="flex items-center gap-2 px-4 py-3 text-sm">
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                    Creating...
                                </div>
                            ) : (
                                <p className="px-4 py-3 text-sm text-muted-foreground">
                                    No results found.
                                </p>
                            )}
                        </CommandEmpty>

                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.id}
                                    value={item.name}
                                    onSelect={() => {
                                        onChange(item.id);
                                        setOpen(false);
                                        setSearch("");
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === item.id
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    />
                                    {item.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>

                        {/* Create new option — only shows when search has no exact match */}
                        {noMatch && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={handleCreate}
                                        disabled={creating}
                                        className="text-primary gap-2"
                                    >
                                        {creating ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Plus className="h-4 w-4" />
                                        )}
                                        Create {search}
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
