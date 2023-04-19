"use client";

import { useState } from "react";
import { ContainerForm } from "../../template/form/ContainerForm";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function AuthForms() {
    const [formMode, setFormMode] = useState<"Login" | "Signup">("Signup");

    function ToggleFormMode() {
        setFormMode((state) => (state === "Login" ? "Signup" : "Login"));
    }

    return (
        <ContainerForm title={formMode}>
            {formMode === "Login" ? (
                <LoginForm formMode={formMode} toggleMode={ToggleFormMode} />
            ) : (
                <SignupForm formMode={formMode} toggleMode={ToggleFormMode} />
            )}
        </ContainerForm>
    );
}

export default AuthForms;
