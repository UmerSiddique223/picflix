"use  client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { Input } from "@/components/UI/input";
import Image from "next/image";
import { Button } from "@/components/UI/button";
import { useDropzone } from "react-dropzone";
import { getUser, setUser } from "@/lib/userInfo";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required(),
  bio: yup.string(),
});
setUser;
const EditProfileForm = ({ buttonRef }) => {
  const [user, setuser] = useState({});
  const [photoUrl, setPhotoUrl] = useState("");
  const [file, setFile] = useState([]);

  const form = useForm({
    defaultValues: {
      name: user.name || "",
      bio: user.bio || "",
      profile_pic: {},
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      const temp_user = getUser();
      const reset_user = {
        name: temp_user.name,
        bio: temp_user.bio,
        profile_pic: [{ path: temp_user.profile_pic }],
      };
      form.reset(reset_user);
      setPhotoUrl(temp_user.profile_picture);
      setuser(temp_user);
    }
  }, []);

  const { formState } = form;
  const { errors } = formState;

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles);
      form.setValue("profile_pic", acceptedFiles);
      setPhotoUrl(acceptedFiles[0].path);
    },
    [form]
  );

  const handleRemovePhoto = () => {
    setPhotoUrl("");
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

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
    if (
      values.name !== user.name ||
      values.bio !== user.bio ||
      values.profile_pic[0].path !== user.profile_pitcure
    ) {
      uploadMedia(values.profile_pic);
      fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, user_id: user.user_id }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setUser({
            ...user,
            name: values.name,
            bio: values.bio,
            profile_pic: values.profile_pic[0].path,
          });
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    } else buttonRef.current.click();
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-9 w-full max-w-5xl"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
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

          <FormField
            control={form.control}
            name="profile_pic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <div
                    {...getRootProps()}
                    className="flex justify-center items-center flex-col bg-input border border-border rounded-xl"
                  >
                    <input {...getInputProps()} className="cursor-pointer" />
                    {photoUrl ? (
                      <div className="mb-4">
                        <Image
                          width={300}
                          height={100}
                          src={`/images/${photoUrl}`}
                          alt="Profile"
                          className="rounded-full w-32 h-32 mx-auto mb-4"
                        />
                        <Button
                          onClick={handleRemovePhoto}
                          variant="destructive"
                          // className="block mx-auto px-4 py-2 bg-red-500 text-white rounded"
                        >
                          Change Photo
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center w-full  lg:p-10">
                        <Image
                          src="/icons/file-upload.svg"
                          width={76}
                          height={50}
                          alt="file upload"
                        />
                        <h3 className="text-muted-foreground mb-2 mt-6">
                          Drag a photo or
                        </h3>
                        <Button
                          type="button"
                          onClick={open}
                          className="bg-primary hover:bg-secondary text-primary-foreground"
                        >
                          Select from computer
                        </Button>
                      </div>
                    )}
                  </div>
                </FormControl>
                {errors.media && (
                  <FormMessage>{errors.media.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
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
              type="submit"
              onClick={() => handleSubmit(form.getValues())}
              className="whitespace-nowrap"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default EditProfileForm;
