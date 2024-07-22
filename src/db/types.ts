import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Channel = {
    id: Generated<string>;
    name: string;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type ChannelUser = {
    channel_id: string;
    user_id: string;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type Message = {
    id: Generated<string>;
    user_id: string;
    product_id: string;
    text: string;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type Product = {
    id: Generated<string>;
    name: string;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
    channel_id: string;
};
export type User = {
    id: string;
    name: string;
};
export type DB = {
    channel_users: ChannelUser;
    channels: Channel;
    messages: Message;
    products: Product;
    users: User;
};
