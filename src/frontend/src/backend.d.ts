import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    tagline: string;
    name: string;
    category: string;
    price: bigint;
}
export interface backendInterface {
    getAllProducts(): Promise<Array<Product>>;
}
