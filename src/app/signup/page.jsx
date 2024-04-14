"use client";
import "../globals.css";
import React from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const schema = yup.object({
  username: yup
    .string()
    .min(3, "Username cannot be less than 3 words")
    .required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters ")
    .required(),
});

function SignupPage() {
  // const router = useRouter();
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const { formState } = form;
  const { errors } = formState;
  console.log(errors);

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
        <h1 className="text-3xl font-bold text-primary mb-4">Sign Up</h1>
        <div className="w-2/3">
          <Form {...form}>
            <form className="flex flex-col   gap-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <div className="">
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
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="whitespace-nowrap mt-8">
                Sign Up
              </Button>
            </form>
          </Form>
        </div>
        <div className="">
          <p className="mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
