import Spinner from "@/components/utilities/Spinner";

interface SubmitButtonProps {
    label: string;
    loading: boolean;
}

const classes = {
    submitButton: `
		flex justify-center
		bg-purple-700 hover:bg-purple-800
		shadow-md shadow-black/30 
		rounded w-full  p-3 text-white
	`,
};

export function SubmitButton({ label, loading }: SubmitButtonProps) {
    return (
        <button type="submit" className={classes.submitButton}>
            {loading ? <Spinner /> : label }
        </button>
    );
}
