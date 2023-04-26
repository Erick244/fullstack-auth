interface TitleProps {
    title: string;
    icon: JSX.Element;
}

const classes = {
    title: `
		flex items-center text-white
		ml-4
	`,
    iconTitle: `
		text-2xl mx-1
	`,
    header: `
		flex justify-between items-center
		shadow-lg shadow-black/40
		bg-gray-600 h-16 z-10
	`,
};

export function Title({ title, icon }: TitleProps) {
    return (
        <h1 className={classes.title}>
            <i className={classes.iconTitle}>{icon}</i> {title}
        </h1>
    );
}

interface HaederProps {
    children: React.ReactNode;
}

export default function Header({ children }: HaederProps) {
    return <header className={classes.header}>{children}</header>;
}