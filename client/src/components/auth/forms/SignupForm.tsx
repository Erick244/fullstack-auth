"use client";
import { AreaForm } from "@/components/template/form/AreaForm";
import { SubmitButton } from "@/components/template/form/SubmitButton";
import { ToggleFormModeLink } from "@/components/template/form/ToggleFormModeLink";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormData, signupFormSchema } from "@/schemas/zodAuthFormSchemas";
import { gql, useMutation } from "@apollo/client";

interface SignupFormProps {
    toggleMode: () => void;
    formMode: "Login" | "Signup";
}

const SIGNUP_USER = gql`
    mutation ($data: SignupInput!) {
        signup(data: $data) {
            data {
				id
			}
        }
    }
`;

function SignupForm({ formMode, toggleMode }: SignupFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupFormSchema),
    });

    const [signupUser, { loading }] = useMutation(SIGNUP_USER);

    async function handlerSignup(data: SignupFormData) {
        await signupUser({
            variables: {
                data,
            },
        });

        toggleMode();
    }

    return (
        <form
            onSubmit={handleSubmit(handlerSignup)}
            noValidate
            autoComplete="off"
        >
            <AreaForm
                label="Name"
                inputProps={{ type: "text" }}
                register={register("name")}
                errorMessage={errors.name?.message}
            />
            <AreaForm
                label="E-mail"
                inputProps={{ type: "email" }}
                register={register("email")}
                errorMessage={errors.email?.message}
            />
            <AreaForm
                label="Password"
                inputProps={{ type: "password" }}
                register={register("password")}
                errorMessage={errors.password?.message}
            />
            <AreaForm
                label="Confirm Password"
                inputProps={{ type: "password" }}
                register={register("confirmPassword")}
                errorMessage={errors.confirmPassword?.message}
            />
            <ToggleFormModeLink
                lable="Already have an account?"
                formMode={formMode}
                toggleMode={toggleMode}
            />
            <SubmitButton label="Next" loading={loading} />
        </form>
    );
}

export default SignupForm;
