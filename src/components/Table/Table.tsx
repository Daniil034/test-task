import { Text } from "../Text/Text";
import styles from "./Table.module.css";
import classNames from "classnames";

type Props<S, T> = {
    heads: S;
    items: T[];
};

export function Table<
    T extends { [key: string]: number | string },
    S extends Omit<{ [key in keyof T]: string }, "id">,
>(props: Props<S, T>) {
    const { heads, items } = props;

    return (
        <table className={styles.root}>
            <thead className={classNames(styles.row, styles.header)}>
                <tr>
                    {Object.values(heads).map((head) => (
                        <th key={head} className={styles.cell}>
                            <Text as="span" weight={400} color="grey">
                                {head}
                            </Text>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className={styles.row}>
                {items.map((item) => (
                    <tr key={item.id}>
                        {Object.keys(heads).map((head) => (
                            <td key={head} className={styles.cell}>
                                <Text as="span" weight={400} color="black">
                                    {item[head]}
                                </Text>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
