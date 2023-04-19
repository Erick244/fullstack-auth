"use client";
interface LoginFormProps {
    toggleMode: () => void;
    formMode: "Login" | "Signup";
}

import { AreaForm } from "@/components/template/form/AreaForm";
import { SubmitButton } from "@/components/template/form/SubmitButton";
import { ToggleFormModeLink } from "@/components/template/form/ToggleFormModeLink";
import { useForm } from "react-hook-form";

function LoginForm({ formMode, toggleMode }: LoginFormProps) {
    const { register, handleSubmit } = useForm();

    function handlerLogin(data: any) {
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
            />
            <AreaForm
                label="Password"
                type="password"
                register={register("password")}
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
