"use client";
interface SignupFormProps {
    toggleMode: () => void;
    formMode: "Login" | "Signup";
}

import { AreaForm } from "@/components/template/form/AreaForm";
import { SubmitButton } from "@/components/template/form/SubmitButton";
import { ToggleFormModeLink } from "@/components/template/form/ToggleFormModeLink";
import { useForm } from "react-hook-form";

function SignupForm({ formMode, toggleMode }: SignupFormProps) {
    const { register, handleSubmit } = useForm();

    function handlerSignup(data: any) {
        console.log(data);
    }

    return (
        <form
            onSubmit={handleSubmit(handlerSignup)}
            noValidate
            autoComplete="off"
        >
            <AreaForm label="Name" type="text" register={register("name")} />
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
            <AreaForm
                label="Confirm Password"
                type="password"
                register={register("confirmPassword")}
            />
            <ToggleFormModeLink
                lable="Already have an account?"
                formMode={formMode}
				toggleMode={toggleMode}
            />
            <SubmitButton label="Next" />
        </form>
    );
}

export default SignupForm;
