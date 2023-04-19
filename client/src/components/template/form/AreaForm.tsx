import { InputHTMLAttributes } from "react";

interface AreaFormProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    register: any;
    errorMessage?: string;
}

const classes = {
    areaForm: `
		w-full my-7
	`,
    input: `
		w-full pl-2 outline-none
		text-white placeholder:text-white
		bg-transparent border-b-2 
	`,
    spanError: `
		text-purple-950 text-sm pl-2
	`,
};

export function AreaForm(props: AreaFormProps) {
    const { label, register, errorMessage } = props;

    return (
        <div className={classes.areaForm}>
            <input
                {...props}
                {...register}
                placeholder={label}
                className={classes.input}
            />
            {errorMessage && (
                <span className={classes.spanError}>{errorMessage}</span>
            )}
        </div>
    );
}
