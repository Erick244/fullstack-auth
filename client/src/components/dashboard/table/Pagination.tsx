"use client";
import { AngleLeftIcon, AngleRightIcon } from "@/components/utilities/Icons";
import { paginationSkipAtom } from "@/contexts/Jotai";
import { gql, useQuery } from "@apollo/client";
import { useAtom } from "jotai";

const classes = {
    pagination: `
		flex justify-between items-center
		bg-purple-900 text-white
		w-11/12  p-2
	`,
    angleAction(direction: "left" | "right") {
        const defaultClasses = "text-xl cursor-pointer ";
        const conditionalclasses =
            direction === "left"
                ? "active:-translate-x-1"
                : "active:translate-x-1";

        return defaultClasses + conditionalclasses;
    },
    pagesCount: `
		font-semibold font-mono
		flex gap-3
	`,
    pageCountItem(conditional: boolean) {
        const defaultClasses = `
			transition-none p-1
			cursor-pointer rounded
			active:scale-100 hover:scale-105
		`;

        const conditionalClasses = conditional
            ? "bg-white/50 text-purple-900"
            : "bg-white/30 text-white";

        return defaultClasses + conditionalClasses;
    },
};

type AngleActionProps = {
    onClick: () => void;
    direction: "left" | "right";
};

function AngleAction({ direction, onClick }: AngleActionProps) {
    return (
        <div className={classes.angleAction(direction)} onClick={onClick}>
            {direction === "left" ? AngleLeftIcon : AngleRightIcon}
        </div>
    );
}

type PageCountItemProps = {
    label: string;
    activeItem?: boolean;
    onClick: () => void;
};

function PageCountItem({ label, activeItem, onClick }: PageCountItemProps) {
    return (
        <span
            className={classes.pageCountItem(activeItem ?? false)}
            onClick={onClick}
        >
            {label}
        </span>
    );
}

const USER_COUNT = gql`
    query {
        userCount
    }
`;

function usePaginationCount() {
    const { data, loading } = useQuery(USER_COUNT);
    const [paginationSkip, setPaginationSkip] = useAtom(paginationSkipAtom);

    const take = 5;
    const userCount = data?.userCount;
    const pages = Math.ceil(userCount / take);

    function handlerSetPaginationByItem(item: number) {
        const skip = item > 1 ? take * (item - 1) : paginationSkip * (item - 1);
        setPaginationSkip(skip);
    }

    const activeItem = paginationSkip === 0 ? 1 : paginationSkip / take + 1;

    function genPageCountItems() {
        const pageCountItems = [];

        for (let i = 1; i <= pages; i++) {
            const isActiveItem = activeItem === i;
            const newPageCountItem = (
                <PageCountItem
                    label={i.toString()}
                    key={i}
                    activeItem={isActiveItem}
                    onClick={() => handlerSetPaginationByItem(i)}
                />
            );

            pageCountItems.push(newPageCountItem);
        }

        return pageCountItems;
    }

    return {
        genPageCountItems,
        loading,
        userCount,
    };
}

function PagesCount() {
    const { genPageCountItems, loading } = usePaginationCount();

    if (loading) return <p>Loading...</p>;

    return <div className={classes.pagesCount}>{genPageCountItems()}</div>;
}

function usePagination() {
	const [paginationSkip, setPaginationSkip] = useAtom(paginationSkipAtom);
    const { userCount } = usePaginationCount();

    function nextPage() {
        const nextPage = paginationSkip + 5;
        if (nextPage < userCount) {
            setPaginationSkip(nextPage);
        }
    }

    function previousPage() {
        const previusPage = paginationSkip - 5;
        if (paginationSkip >= 5) {
            setPaginationSkip(previusPage);
        }
    }

	return {
        nextPage,
        previousPage,
    };
 
}

export default function Pagination() {

	const { nextPage, previousPage } = usePagination();
    
    return (
        <div className={classes.pagination}>
            <AngleAction direction="left" onClick={previousPage} />
            <PagesCount />
            <AngleAction direction="right" onClick={nextPage} />
        </div>
    );
}
