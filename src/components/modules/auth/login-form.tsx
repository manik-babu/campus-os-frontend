/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field"
import { useForm } from "@tanstack/react-form"
import { loginZodSchema } from "@/zod/auth/login"
import AppField from "@/components/shared/AppField"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"
import LoadingButton from "@/components/ui/loadingButton"
import { Spinner } from "@/components/ui/spinner"
import { login } from "@/services/auth.service"
import { setCookie } from "@/lib/cookieUtils"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [formError, setFormError] = useState<string | null>(null);
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
  });

  const form = useForm({
    defaultValues: {
      idNo: "",
      password: "",
    },
    validators: {
      onSubmit: loginZodSchema
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await mutateAsync(value);
        console.log({
          res
        })
        if (!res.ok) {
          setFormError(res.message);
        } else {
          setCookie("token", res.data?.token as string);
        }
      } catch (error: any) {
        setFormError(error.message || "An error occurred while logging in");
      }
    },
  })
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="py-14 px-4">
        <CardHeader>
          <h1 className="w-full text-center">Welcome back</h1>
          <CardDescription className="text-center">
            Enter your ID and password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}>
            <FieldGroup>
              <form.Field
                name="idNo"
              >
                {
                  (field) => (
                    <AppField
                      field={field}
                      label="ID Number"
                      placeholder="Enter your ID number"
                    />
                  )
                }
              </form.Field>

              <form.Field
                name="password"
              >
                {
                  (field) => (
                    <AppField
                      field={field}
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                    />
                  )
                }
              </form.Field>

              <Field>
                <FieldDescription className="hover:underline cursor-pointer">Forgot your password?</FieldDescription>
              </Field>
              <Field>
                {
                  formError && <Alert variant={"destructive"}>
                    <AlertCircleIcon />
                    <AlertTitle>{formError}</AlertTitle>
                  </Alert>
                }
              </Field>
              <Field>
                {/* <Button type="submit">Login</Button> */}
                <LoadingButton
                  isLoading={isPending}
                  content="Login"
                  style="btn-primary"
                  loadingContent={<><Spinner />Logging in</>}
                />

              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
