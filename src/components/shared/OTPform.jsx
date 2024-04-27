"use client";
import React, { use, useState } from "react";
import { Button } from "../UI/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/UI/input-otp";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { setUser } from "@/lib/userInfo";
const schema = yup.object({
  pin: yup.string().min(6, "Pin must of 6 characters").required(),
});

const OTPform = ({
  butRef,
  formValues,
  showform,
  SetShowform,
  Seterror,
  SetErrorRef,
}) => {
  const [isCalled, setIsCalled] = useState(true);
  const [otp, setOtp] = useState("123456");
  const [isemail, setIsemail] = useState(false);

  const HandleEmail = async (email, username) => {
    setIsCalled(false);
    const OTP = Math.floor(100000 + Math.random() * 900000);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/signup/sendverificationemail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            username: username,
            verifyCode: OTP,
          }),
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (!data.success) {
            throw new Error("Failed to send Email");
          } else {
            setOtp(OTP.toString());
          }
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const form = useForm({
    defaultValues: {
      pin: "",
    },
    resolver: yupResolver(schema),
  });

  // Insert into the database

  const router = useRouter();
  const handleSubmit = async (values) => {
    try {
      if (values.pin !== otp) {
        Seterror("Invalid OTP");
        SetErrorRef.current.click();
      } else {
        try {
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
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Handle the error
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button ref={butRef} type="submit" className="whitespace-nowrap mt-8">
            Sign up
          </Button>
        </DialogTrigger>
        {showform && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Email Verification</DialogTitle>
            </DialogHeader>
            {!isemail && (
              <>
                <DialogDescription className="mt-3">
                  Click here to send a verification to {formValues.email}
                </DialogDescription>
                <Button
                  onClick={() => {
                    setIsemail(true);
                  }}
                  className="whitespace-nowrap mt-8"
                >
                  Send Email
                </Button>
              </>
            )}
            {isemail && (
              <div>
                {/* {isCalled && HandleEmail(formValues.email, formValues.username)} */}

                <DialogDescription>
                  We have sent an 6 letter code to{" "}
                  <span className="font-bold text-primary">
                    {formValues.email}
                  </span>
                  . Please enter the code below.
                </DialogDescription>
                <Form {...form}>
                  <div
                    // onSubmit={form.handleSubmit(handleSubmit)}
                    className="w-2/3 space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="pin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>6 digit OTP</FormLabel>
                          <FormControl>
                            <InputOTP maxLength={6} {...field}>
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      // type="submit"
                      onClick={() => {
                        handleSubmit(form.getValues());
                        SetShowform(false);
                      }}
                    >
                      Confirm
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default OTPform;
