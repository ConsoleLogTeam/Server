import { CountryModel } from "../../models/country.model";

export async function getAll(name: string | undefined) {
    const filters: { name?: string } = {};
    if (name !== undefined) {
        filters.name = name;
    }
    const countries = CountryModel.find(filters);
    return countries;
}
