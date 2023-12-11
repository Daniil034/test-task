import React, { useEffect, useReducer } from "react";
import { Text } from "./components/Text/Text";
import { Table } from "./components/Table/Table";
import { FoodItemInterface } from "./types/foodItem.interface";
import { getFoodItems } from "./api/getFoodItems";
import { SearchField } from "./components/SearchField/SearchField";
import styles from "./App.module.css";

const dictionary = {
    title: "Наименование",
    portion: "Порция",
    cost: "Цена",
    saleType: "Тип продукции",
};

type State = {
    isLoading: boolean;
    items: FoodItemInterface[];
    error: string | null;
};

function App() {
    const [state, setState] = useReducer(
        (prev: State, current: Partial<State>) => ({ ...prev, ...current }),
        {
            isLoading: false,
            items: [],
            error: null,
        },
    );

    useEffect(() => {
        getFoodItems().then((items) => {
            setState({ isLoading: true, items, error: null });
        });
    }, []);

    const handleInputChange = async (value: string) => {
        const items = await getFoodItems(value);
        setState({ isLoading: true, items, error: null });
    };

    return (
        <div className="App">
            <Text as="h1" weight={300} classname={styles.title}>
                Список продукции
            </Text>
            <div className={styles.paper}>
                <div className={styles.search}>
                    <SearchField onChange={handleInputChange} />
                </div>
                {state.items.length > 0 ? (
                    <Table
                        heads={{
                            title: dictionary.title,
                            portion: dictionary.portion,
                            cost: dictionary.cost,
                            saleType: dictionary.saleType,
                        }}
                        items={state.items}
                    />
                ) : (
                    <div>Загрузка...</div>
                )}
            </div>
        </div>
    );
}

export default App;
