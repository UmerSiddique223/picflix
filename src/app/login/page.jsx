"use client";
import "../globals.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
  FormField,
} from "@/components/UI/form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/UI/input";
import { Button } from "@/components/UI/button";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/UI/alert-dialog";
import Image from "next/image";
import { setUser } from "@/lib/userInfo";

//yup schema
const schema = yup.object({
  username: yup.string().required(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters ")
    .required(),
});

//main function
function LoginPage() {
  const [error, Seterror] = useState("");

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { formState } = form;
  const { errors } = formState;
  // console.log("form Errors", errors);

  const handleSubmit = async (values) => {
    Seterror(null);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (!data.success) {
            Seterror(data.message);
          } else {
            setUser(data.userData);
            router.push("/");
          }
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center lg:px-32 ">
      <div className="lg:w-1/2 flex lg:justify-end">
        <Image
          width={800}
          height={800}
          src="/icons/homeIcon.svg"
          className="z-20 hidden lg:block bg-cover"
          alt="image"
        />
      </div>

      <div className="flex flex-col lg:w-1/2 lg:px-20 justify-center h-screen  items-center lg:items-end">
        <div className="xl:w-2/3 lg:w-[300px] md:w-[400px] w-[300px]">
          <h1 className="text-3xl w-full font-bold text-center text-primary mb-4">
            Login
          </h1>
          <Form {...form}>
            <form
              className="flex flex-col gap-5"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        className=" bg-input border border-border"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        className=" bg-input border border-border"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="submit" className="whitespace-nowrap mt-8">
                    Login
                  </Button>
                </AlertDialogTrigger>
                {error && (
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Signup Error</AlertDialogTitle>
                      <AlertDialogDescription>{error}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogAction>OK</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                )}{" "}
              </AlertDialog>
            </form>
          </Form>
          <div className="w-full  text-center">
            <p className="mt-6">
              New to Picflix ?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Signup here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
