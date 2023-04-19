interface SubmitButtonProps {
    label: string;
}

const classes = {
    submitButton: `
		bg-purple-700 hover:bg-purple-800
		shadow-md shadow-black/30 
		rounded text-white
		w-full  p-3
	`,
};

export function SubmitButton({ label }: SubmitButtonProps) {
    return (
        <button type="submit" className={classes.submitButton}>
            {label}
        </button>
    );
}
