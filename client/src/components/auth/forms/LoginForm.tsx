"use client";
import { AreaForm } from "@/components/template/form/AreaForm";
import { SubmitButton } from "@/components/template/form/SubmitButton";
import { ToggleFormModeLink } from "@/components/template/form/ToggleFormModeLink";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginFormSchema } from "@/schemas/zodAuthFormSchemas";

interface LoginFormProps {
    toggleMode: () => void;
    formMode: "Login" | "Signup";
}

function LoginForm({ formMode, toggleMode }: LoginFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginFormSchema),
    });

    function handlerLogin(data: LoginFormData) {
        console.log(data);
    }

    return (
        <form
            onSubmit={handleSubmit(handlerLogin)}
            noValidate
            autoComplete="off"
        >
            <AreaForm
                label="E-mail"
                type="email"
                register={register("email")}
                errorMessage={errors.email?.message}
            />
            <AreaForm
                label="Password"
                type="password"
                register={register("password")}
                errorMessage={errors.password?.message}
            />

            <ToggleFormModeLink
                lable="Not have accont?"
                formMode={formMode}
                toggleMode={toggleMode}
            />
            <SubmitButton label="Enter" />
        </form>
    );
}

export default LoginForm;
