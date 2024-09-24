import { createElement, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useAuthActions } from "@convex-dev/auth/react";

import { SignInFlow } from "../types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type SignInCardProps = {
  setState: (state: SignInFlow) => void;
};

export const SignInCard = ({ setState }: SignInCardProps) => {
  const { signIn } = useAuthActions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleProviderSignIn = (value: "github" | "google") => signIn(value);

  const inputs = [
    {
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value),
      placeholder: "Email",
      type: "email",
      disabled: false,
    },
    {
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
      placeholder: "Password",
      type: "password",
      disabled: false,
    },
  ];

  const signInButtons = [
    { name: "Google", logo: FcGoogle, onClick: () => {}, disabled: false },
    {
      name: "Github",
      logo: FaGithub,
      onClick: () => handleProviderSignIn("github"),
      disabled: false,
    },
  ];

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5">
          {inputs.map((input, i) => (
            <Input
              key={i}
              disabled={input.disabled}
              value={input.value}
              onChange={input.onChange}
              placeholder={input.placeholder}
              type={input.type}
              required
            />
          ))}
          <Button type="submit" className="w-full" size="lg" disabled={false}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          {signInButtons.map((btn) => (
            <Button
              key={btn.name}
              disabled={btn.disabled}
              onClick={btn.onClick}
              variant="outline"
              size="lg"
              className="w-full relative"
            >
              {createElement(btn.logo, {
                className: "size-5 absolute top-3 left-2.5",
              })}
              Continue with {btn.name}
            </Button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?&nbsp;
          <span
            onClick={() => setState("signUp")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
