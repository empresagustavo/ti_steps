import { LoginForm } from "@/components/login/login-form";

export function LoginPage(){
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10 bg-radial-[at_25%_25%] from-white to-blue-900 to-75%">

            <div className="relative w-full max-w-sm md:max-w-3xl ">
                
                <LoginForm />

            </div>

        </div>
    )
}