"use client"

import { useRef, useState, useEffect, ChangeEvent } from "react"
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function TabsAuthForm() {
  // login
  const [isRevealPassword, setIsRevealPassword] = useState<boolean>(false)

  const [emailSaved, setEmailSaved] = useState<string>("")
  const [passwordSaved, setPasswordSaved] = useState<string>("")
  const [isChecked, setIsChecked] = useState<boolean>(false)

  const { data: session, status } = useSession()

  const email = useRef<HTMLInputElement | null>(null)
  const password = useRef<HTMLInputElement | null>(null)

  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState<string>("")

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailSaved(event.target.value)
  }

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordSaved(event.target.value)
  }

  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState)
  }

  const checkHandler = (checked: boolean) => {
    setIsChecked(!checked)
  }

  const onLogin = async () => {
    const emailValue = email.current?.value || ""
    const passwordValue = password.current?.value || ""

    try {
      const result = await signIn("credentials", {
        email: emailValue,
        password: passwordValue,
        redirect: false
      })

      if (result?.error) {
        setErrorMessage("正しいメールアドレスとパスワードを入力してください.")
      } else {
        setErrorMessage("")

        if (isChecked) {
          localStorage.email = emailValue
          localStorage.password = passwordValue
          localStorage.checkbox = isChecked
        } else {
          localStorage.email = ""
          localStorage.password = ""
        }
      }
    } catch (error) {
      console.error("ログインエラー:", error)
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      window.location.href = "/"
    }

    if (localStorage.checkbox && localStorage.email !== "") {
      setIsChecked(true)
      setEmailSaved(localStorage.email)
      setPasswordSaved(localStorage.password)
    }
  }, [router, status])

  document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      onLogin()
    }
  })

  // sign up
  const [signUpValues, setSignUpValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignUpChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignUpValues({ ...signUpValues, [name]: value });
  };

  const onSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpValues({ name: "", email: "", password: "" })

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(signUpValues),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!res.ok) {
        console.log("error")
        return;
      }

      signIn(undefined, { callbackUrl: "/" });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Tabs defaultValue="login" className="w-[400px] mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">ログイン</TabsTrigger>
        <TabsTrigger value="register">ユーザ登録</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            {/* <CardTitle>ログイン</CardTitle> */}
            <CardDescription>
              アカウントを持っていない方が先に登録してください.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                defaultValue=""
                ref={email}
                onChange={emailChangeHandler}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="current">Password</Label>
              <Input
                id="current"
                type="password"
                placeholder="••••••••"
                ref={password}
                value={passwordSaved}
                onChange={passwordChangeHandler}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={onLogin}
            >
              ログイン
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="register">
        <Card>
          <form onSubmit={onSignUp}>
            <CardHeader>

            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Username</Label>
                <Input
                  id="name"
                  name="name"
                  value={signUpValues.name}
                  onChange={handleSignUpChange}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={signUpValues.email}
                  onChange={handleSignUpChange}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={signUpValues.password}
                  onChange={handleSignUpChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
              >
                登録
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
