interface AuthLayoutProps {
    children: React.ReactNode;
}

const classes = {
    background: `
		h-screen flex justify-center items-center
		bg-gradient-to-r to-pink-700 from-purple-900
	`,
};

export default function AuthLayout({ children }: AuthLayoutProps) {
    return <div className={classes.background}>{children}</div>;
}
