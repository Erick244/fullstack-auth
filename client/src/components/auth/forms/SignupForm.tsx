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
            id
            name
            email
            createdAt
            updatedAt
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
        const user = await signupUser({
            variables: {
                data,
            },
        });

		console.log(user);
    }

    return (
        <form
            onSubmit={handleSubmit(handlerSignup)}
            noValidate
            autoComplete="off"
        >
            <AreaForm
                label="Name"
                type="text"
                register={register("name")}
                errorMessage={errors.name?.message}
            />
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
            <AreaForm
                label="Confirm Password"
                type="password"
                register={register("confirmPassword")}
                errorMessage={errors.confirmPassword?.message}
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
