import { LocalityModel } from "./../../models/locality.model";
export async function getAll(name: string | undefined, province: string | undefined) {
    const filters: { name?: string; province?: string } = {};

    if (name !== undefined) {
        filters.name = name;
    }
    if (province !== undefined) {
        filters.province = province;
    }

    const localities = LocalityModel.find(filters);
    return localities;
}
