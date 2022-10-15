import { ProvinceModel } from "../../models/province.model";

export async function getAll(name: string | undefined) {
    const filters: { name?: string } = {};
    if (name !== undefined) {
        filters.name = name;
    }

    const provinces = ProvinceModel.find(filters).populate("country");
    return provinces;
}
