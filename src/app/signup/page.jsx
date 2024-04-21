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
import { useUserContext } from "@/lib/context/UserContext";
import Image from "next/image";

//yup schema
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

//main function
function SignupPage() {
  const [error, Seterror] = useState("");
  const { setUser } = useUserContext();

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
  // console.log("form Errors", errors);
  const router = useRouter();
  const handleSubmit = async (values) => {
    Seterror(null);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          console.log(response.json);
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
    <>
      <div className="flex justify-center px-32">
        <div className="w-1/2 flex justify-end">
          <Image
            width={800}
            height={800}
            src="/icons/homeIcon.svg"
            className="z-20 bg-cover"
            alt="image"
          />
        </div>

        <div className="flex flex-col w-1/2 px-20 justify-center items-end">
          <div className="w-2/3">
            <h1 className="text-3xl w-full font-bold text-center text-primary mb-4">
              Sign Up
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
                    <div className="">
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
                      Sign Up
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
            <div className=" w-full text-center">
              <p className="mt-6">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
