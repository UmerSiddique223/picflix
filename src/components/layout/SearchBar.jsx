"use client";
import { Input } from "@/components/UI/input";
import React from "react";
import { useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "@/utils/loader.css";
import Image from "next/image";
export default function SearchBar() {
    const searchParams = useSearchParams();
    const defaultQuery = searchParams.get("query") || "";
    const inputRef = useRef(null);
    const [isSearching, startTransition] = useTransition();
    const router = useRouter();
    const [query, setQuery] = useState(defaultQuery);

    const search = () => {
        startTransition(() => {
            if (query.trim() === "") return;
            router.push(`/search/searchusers?query=${query}`);
        });
    };

    return (
        <div className="w-full lg:-ml-20 mt-10 flex flex-col ">
            <div className="mx-auto font-bold text-3xl mb-10">
                Search a User
            </div>
            <div className="h-10 flex items-center gap-[6px] justify-center rounded-md">
                <Input
                    disabled={isSearching}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            search();
                        }

                        if (e.key === "Escape") {
                            inputRef.current.blur();
                        }
                    }}
                    ref={inputRef}
                    className="border w-96 lg:w-[40rem] border-border"
                />

                <button
                    disabled={isSearching}
                    size="sm"
                    onClick={search}
                    variant=""
                    className="button relative h-[42px] border w-12 bg-background"
                >
                    <Image
                        src="/icons/search.svg"
                        fill
                        alt="Search"
                        className="span"
                    />
                </button>
            </div>
        </div>
    );
}
