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
    try {
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/login`, {
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
          console.log(data);
          if (!data.success) {
            Seterror(data.message);
          } else {
            router.push("/");
          }
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-1"></div>
      <div className="col-span-3">
        <img
          src="/images/juicy-girl-with-shopping-bags-calling-a-taxi-on-mobile-phone.gif"
          className="z-20 h-[40rem] bg-cover"
          alt="Juicy girl with shopping bags calling a taxi on mobile phone"
        ></img>
      </div>

      <div className="col-span-2  flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Login</h1>
        <div className="w-2/3">
          <Form {...form}>
            <form
              className="flex flex-col   gap-5
            "
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
                        className=" bg-input   border border-border"
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
                        className=" bg-input  border border-border"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="whitespace-nowrap mt-8">
                Login
              </Button>
            </form>
          </Form>
        </div>
        <div className="">
          <p className="mt-4">
            New to Picflix ?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Signup here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
