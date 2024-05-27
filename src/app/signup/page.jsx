"use client";
import "../globals.css";
import React, { useRef, useState } from "react";
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
import { Input } from "@/components/UI/input";
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
import { Button } from "@/components/UI/button";
import { setUser } from "@/lib/userInfo";
import { useRouter } from "next/navigation";
//yup schema
const schema = yup.object({
  username: yup
    .string()
    .min(2, "Username cannot be less than 2 characters")
    .required(),
  name: yup.string().min(3, "Name cannot be less than 3 characters").required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters ")
    .required(),
});

//main function
function SignupPage() {
  const router = useRouter();
  const [error, Seterror] = useState("");
  const buttonRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { formState } = form;
  const { errors } = formState;

  const InsertUser = async (formValues) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/signup/insertuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const insertedData = await response.json();
    setUser(insertedData.userData);
    router.push("/");
  };
  const handleSubmit = async (values) => {
    Seterror(null);
    setLoading(true);

    try {
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/signup`, {
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
            buttonRef.current.click();
          } else {
            InsertUser(values);
          }
        });
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };
  return (
    <>
      <div className="flex justify-center lg:px-32">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button ref={buttonRef}></button>
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
                  name="name"
                  render={({ field }) => (
                    <div className="">
                      <FormItem>
                        <FormLabel>Name</FormLabel>
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
                {loading ? (
                  <svg
                    class="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="whitespace-nowrap mt-8"
                  >
                    Sign up
                  </Button>
                )}
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
