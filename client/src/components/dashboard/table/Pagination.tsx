"use client";
import { AngleLeftIcon, AngleRightIcon } from "@/components/utilities/Icons";
import { paginationSkipAtom } from "@/contexts/Jotai";
import { gql, useQuery } from "@apollo/client";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

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
};

function PageCountItem({ label, activeItem }: PageCountItemProps) {
    return (
        <span className={classes.pageCountItem(activeItem ?? false)}>
            {label}
        </span>
    );
}

const USER_COUNT = gql`
    query {
        userCount
    }
`;

function PagesCount() {
    const { data, loading } = useQuery(USER_COUNT);
    const paginationSkip = useAtomValue(paginationSkipAtom);

    if (loading) return <p>Loading...</p>;

    const take = 5;
    const userCount = data?.userCount || 1;
    const pages = Math.ceil(userCount / take);

    const activeItem =
        paginationSkip === 0 ? 1 : (paginationSkip / take) + 1;

    function genPageCountItems() {
        const pageCountItems = [];
        for (let i = 1; i <= pages; i++) {
            const isActiveItem = activeItem === i;
            const newPageCountItem = (
                <PageCountItem
                    label={i.toString()}
                    key={i}
                    activeItem={isActiveItem}
                />
            );
            pageCountItems.push(newPageCountItem);
        }

        return pageCountItems;
    }

    return <div className={classes.pagesCount}>{genPageCountItems()}</div>;
}

export default function Pagination() {

	const setPaginationSkip = useSetAtom(paginationSkipAtom);

    return (
        <div className={classes.pagination}>
            <AngleAction
                direction="left"
                onClick={() => console.log("Left Angle")}
            />
            <PagesCount />
            <AngleAction direction="right" onClick={() => setPaginationSkip(state => state + 5)} />
        </div>
    );
}
