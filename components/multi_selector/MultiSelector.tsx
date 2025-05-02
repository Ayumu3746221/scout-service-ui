"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type Option = {
  value: number;
  label: string;
};

interface MultiSelectProps {
  options: Option[];
  selected: number[];
  onChange: (selected: number[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "選択してください",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = (value: number) => {
    onChange(selected.filter((s) => s !== value));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = e.currentTarget.querySelector("input");
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "" && selected.length > 0) {
          const newSelected = [...selected];
          newSelected.pop();
          onChange(newSelected);
        }
      }
      // スペースキーでの選択を防止
      if (e.key === " " && input.value === "") {
        e.preventDefault();
      }
    }
  };

  const selectedOptions = options.filter((option) =>
    selected.includes(option.value),
  );
  const filteredOptions = options.filter((option) => {
    const matchesSearch = option.label
      .toLowerCase()
      .includes(inputValue.toLowerCase());
    return matchesSearch;
  });

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div
        className={`flex min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${className}`}
      >
        <div className="flex flex-wrap gap-1">
          {selectedOptions.map((option) => (
            <Badge
              key={option.value}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {option.label}
              <button
                type="button"
                className="rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUnselect(option.value);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(option.value)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">削除</span>
              </button>
            </Badge>
          ))}
          <CommandInput
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={selectedOptions.length === 0 ? placeholder : ""}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      {open && filteredOptions.length > 0 && (
        <div className="relative z-50">
          <div className="absolute top-0 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandList>
              <CommandEmpty>見つかりませんでした。</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-auto p-1">
                {filteredOptions.map((option) => {
                  const isSelected = selected.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        if (isSelected) {
                          onChange(selected.filter((s) => s !== option.value));
                        } else {
                          onChange([...selected, option.value]);
                        }
                        setInputValue("");
                      }}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
                          isSelected
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-input"
                        }`}
                      >
                        {isSelected && <X className="h-3 w-3" />}
                      </div>
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </div>
        </div>
      )}
    </Command>
  );
}
