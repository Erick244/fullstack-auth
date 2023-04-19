interface ContainerFormProps {
    children: React.ReactNode;
    title: string;
}

const classes = {
    containerForm: `
		bg-white/40 p-4 rounded w-96
		shadow-lg shadow-black/30
	`,
    title: `
		text-center text-2xl
		bg-purple-700 text-white
		my-4 p-2 rounded
	`,
};

export function ContainerForm({ children, title }: ContainerFormProps) {
    return (
        <div className={classes.containerForm}>
            <h1 className={classes.title}>{title}</h1>
            {children}
        </div>
    );
}
