"use client";
import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
import { Textarea } from "@/components/UI/textarea";
import { Input } from "@/components/UI/input";
import { Button } from "@/components/UI/button";
import { useToast } from "@/components/UI/use-toast";
import MediaUploader from "@/components/shared/MediaUploader";
import { getUser } from "@/lib/userInfo";

const schema = yup.object({
  caption: yup.string(),
  media: yup.array().min(1, "Media cannot be empty"),
  location: yup.string(),
});

function Create() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      caption: "",
      media: [],
      location: "",
    },
    resolver: yupResolver(schema),
  });
  const { formState } = form;
  const { errors } = formState;

  const uploadMedia = async (file) => {
    const formData = new FormData();

    file.forEach((f) => {
      formData.append("file", f);
    });

        fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/upload`, {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("HTTP Error: " + response.status);
                }
                return response.json();
            })
            .catch((error) => {
                console.error("File upload failed. Error: " + error.message);
            });
    };
    const handleSubmit = async (values) => {
        await uploadMedia(values.media);
        values.media = values.media.map((file) => ({
            type: file.type,
            path: file.name,
        }));
        const user = getUser();
        fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...values, user_id: user.user_id }),
        })
            .then((res) => {
                if (res.ok) {
                    toast("Post created successfully", "success");
                    router.push("/");
                } else {
                    toast("Failed to create post", "error");
                }
            })
            .catch(() => {
                toast("Failed to create post", "error");
            });
    };

  return (
    // temporary styling because no right section
    <div className="px-16 my-24 w-[800px]">
      <div className="flex items-center gap-3 mb-8">
        <Image
          src={"/icons/gallery-add.svg"}
          width={40}
          height={40}
          alt="Create Post"
        />
        <h1 className="text-xl font-semibold">Create Post</h1>
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-9 w-full max-w-5xl"
          >
            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Caption</FormLabel>
                  <FormControl>
                    <Textarea
                      className="custom-scrollbar bg-input border border-border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="media"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Media</FormLabel>
                  <FormControl>
                    <MediaUploader fieldChange={field.onChange} />
                  </FormControl>
                  {errors.media && (
                    <FormMessage>{errors.media.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-input border border-border"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4 items-center justify-end">
              <Button
                type="button"
                variant="outline"
                className="border-primary text-primary-foreground whitespace-nowrap"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" className="whitespace-nowrap">
                Create Post
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Create;
