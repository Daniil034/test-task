import { useDebounce } from "./lib/useDebounce";
import { useEffect, useState } from "react";
import styles from "./SearchField.module.css";

type Props = {
    onChange: (value: string) => void;
};

export function SearchField(props: Props) {
    const [inputValue, setInputValue] = useState<null | string>(null);
    const debouncedInput = useDebounce(inputValue, 500);

    useEffect(() => {
        if (debouncedInput === null) return;
        props.onChange(debouncedInput);
    }, [debouncedInput]);

    return (
        <input
            className={styles.root}
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Поиск"
        />
    );
}
