"use client";

import Gravatar from "react-gravatar";

interface ClientGravatarProps {
	email: string;
	className?: string;
}

export default function ClientGravatar({ email, className }: ClientGravatarProps) {
    return <Gravatar email={email} className={className} />;
}
