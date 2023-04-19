interface ToggleFormModeLinkProps {
    toggleMode: () => void;
    formMode: "Login" | "Signup";
    lable: string;
}

const classes = {
    span: `
		text-white
	`,
    link: `
		text-purple-950 
		hover:underline cursor-pointer
	`,
};

export function ToggleFormModeLink({
    formMode,
    lable,
    toggleMode,
}: ToggleFormModeLinkProps) {
    return (
        <div className="my-5" onClick={toggleMode}>
            <span className={classes.span}>{lable}</span>{" "}
            <a className={classes.link}>{formMode}</a>
        </div>
    );
}
