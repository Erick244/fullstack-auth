const classes = {
    tr: `
		border-b border-purple-500
		bg-stone-800/95
	`,
    td: `
		p-1 text-center
	`,
    tdImage: `
		p-1 flex justify-center
	`,
    imageSkeleton: `
		w-14 h-14 bg-stone-600
		rounded-full animate-pulse
	`,
    textSkeleton: `
		w-24 h-2 bg-stone-600
		animate-pulse inline-block
	`,
};

function ImageSkeleton() {
    return (
        <td className={classes.tdImage}>
            <div className={classes.imageSkeleton}></div>
        </td>
    );
}

function TextSkeleton() {
    return (
        <td className={classes.td}>
            <span className={classes.textSkeleton}></span>
        </td>
    );
}

function TrSkeleton() {
	return (
        <tr className={classes.tr}>
            <ImageSkeleton />
            <TextSkeleton />
            <TextSkeleton />
        </tr>
    );
}

export default function UserTableSkeleton() {
    return (
        <tbody>
            <TrSkeleton />
            <TrSkeleton />
            <TrSkeleton />
            <TrSkeleton />
            <TrSkeleton />
        </tbody>
    );
}
