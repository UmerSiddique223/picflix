"use client";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import React from "react";
import { useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
      if (query !== "") router.push(`/search/searchusers/${query}`);
    });
  };

  return (
    <div className="w-full lg:-ml-20 mt-10 flex flex-col ">
      <div className="mx-auto font-bold text-3xl mb-10 text-purple-500">
        Search a User{" "}
      </div>
      <div className="h-14 flex items-center justify-center rounded-md">
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

        <Button
          disabled={isSearching}
          size="sm"
          onClick={search}
          variant=""
          className="relative bg-transparent hover:bg-transparent h-14 w-14"
        >
          <Image src="/icons/search.svg" fill alt="search"></Image>
        </Button>
      </div>
    </div>
  );
}
