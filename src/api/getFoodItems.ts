import { FoodItemInterface } from "../types/foodItem.interface";

const API_URL = "https://api0.sms-dnevnik.com/rest/food/items";

export async function getFoodItems(
    searchQuery?: string,
): Promise<FoodItemInterface[]> {
    let queryString = API_URL;
    const URLParams = new URLSearchParams({
        limit: "100",
        ...(searchQuery ? { search: searchQuery } : {}),
    });
    queryString = `${queryString}?${URLParams}`;
    const res = await fetch(queryString, {
        headers: {
            "Argus-App-Type": "food",
            "Argus-Auth-Token": "teNSmM0i0Pz2Wph_-7nSYg",
            "Argus-School-Id": "587",
        },
    });
    const json = await res.json();
    return Object.values(json.items) as FoodItemInterface[];
}
