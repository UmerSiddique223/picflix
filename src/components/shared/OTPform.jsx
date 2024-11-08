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
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
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
        // setLoading(false);
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        className="whitespace-nowrap mt-8"
                    >
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
                            <span>Sign up</span>
                        )}
                        </Button>
                </DialogTrigger>
                {showform && (
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Verification</DialogTitle>
                        </DialogHeader>
                        {!isemail && (
                            <>
                                <DialogDescription className="mt-3">
                                    Click here to verify your identity
                                </DialogDescription>
                                <Button
                                    onClick={() => {
                                        setIsemail(true);
                                    }}
                                    className="whitespace-nowrap mt-8"
                                >
                                    Verify
                                </Button>
                            </>
                        )}
                        {isemail && (
                            <div>
                                {/* {isCalled && HandleEmail(formValues.email, formValues.username)} */}

                                <DialogDescription>
                                    To confirm that you are not a robot, type {otp} here
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
                                                    <FormLabel>
                                                        6 digit code
                                                    </FormLabel>
                                                    <FormControl>
                                                        <InputOTP
                                                            maxLength={6}
                                                            {...field}
                                                        >
                                                            <InputOTPGroup>
                                                                <InputOTPSlot
                                                                    index={0}
                                                                />
                                                                <InputOTPSlot
                                                                    index={1}
                                                                />
                                                                <InputOTPSlot
                                                                    index={2}
                                                                />
                                                                <InputOTPSlot
                                                                    index={3}
                                                                />
                                                                <InputOTPSlot
                                                                    index={4}
                                                                />
                                                                <InputOTPSlot
                                                                    index={5}
                                                                />
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
