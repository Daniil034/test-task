import { ReactNode } from "react";
import parse from "html-react-parser";
import styles from "./Text.module.css";
import classNames from "classnames";

type Props = {
    as?: "h1" | "span";
    color?: "grey" | "black";
    weight?: 300 | 400;
    children: ReactNode;
    classname?: string;
};

export function Text(props: Props) {
    const {
        color = "black",
        as = "span",
        weight = 400,
        children,
        classname,
    } = props;

    const cssClasses = {
        [styles.grey]: color === "grey",
        [styles.black]: color === "black",
        [styles.light]: weight === 300,
        [styles.regular]: weight === 400,
        [styles.h1]: as === "h1",
        [styles.span]: as === "span",
    };

    const openTag = `<${as} class="${classNames(cssClasses, classname)}">`;
    const closingTag = `</${as}>`;

    return <>{parse(openTag + children + closingTag)}</>;
}
