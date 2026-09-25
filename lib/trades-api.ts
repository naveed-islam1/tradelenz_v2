import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import dayjs from "dayjs";

import { supabase } from "@/lib/supabase";
import type {
  Strategy,
  TradeCreateInput,
  CsvTradeImportInput,
  TradeRecord,
} from "@/lib/trade-types";

export type DashboardFilters = {
  date: "This week" | "This month" | "All time";
  pair: string;
  tradeType: string;
};

type QueryError = { message: string };

const buildDashboardQuery = (filters: DashboardFilters) => {
  let query = supabase.from("trades").select("*");

  if (filters.date === "This week") {
    query = query
      .gte("date_open", dayjs().startOf("week").toISOString())
      .lte("date_open", dayjs().endOf("week").toISOString());
  }

  if (filters.date === "This month") {
    query = query
      .gte("date_open", dayjs().startOf("month").toISOString())
      .lte("date_open", dayjs().endOf("month").toISOString());
  }

  if (filters.pair !== "All pairs") query = query.eq("pair", filters.pair);
  if (filters.tradeType !== "All types") query = query.eq("type", filters.tradeType.toLowerCase());

  return query.order("date_open", { ascending: false });
};

export const tradesApi = createApi({
  reducerPath: "tradesApi",
  baseQuery: fakeBaseQuery<QueryError>(),
  tagTypes: ["Trades", "Strategies"],
  endpoints: (builder) => ({
    getDashboardTrades: builder.query<TradeRecord[], DashboardFilters>({
      async queryFn(filters) {
        const { data, error } = await buildDashboardQuery(filters);
        if (error) return { error: { message: error.message } };
        return { data: (data ?? []) as TradeRecord[] };
      },
      providesTags: ["Trades"],
    }),
    getStrategies: builder.query<Strategy[], void>({
      async queryFn() {
        const { data, error } = await supabase
          .from("strategies")
          .select("id, name")
          .order("name");
        if (error) return { error: { message: error.message } };
        return { data: (data ?? []) as Strategy[] };
      },
      providesTags: ["Strategies"],
    }),
    getTradeById: builder.query<TradeRecord, string>({
      async queryFn(id) {
        const { data, error } = await supabase.from("trades").select("*").eq("id", id).single();
        if (error) return { error: { message: error.message } };
        return { data: data as TradeRecord };
      },
      providesTags: ["Trades"],
    }),
    addTrade: builder.mutation<TradeRecord, TradeCreateInput>({
      async queryFn(trade) {
        const { data, error } = await supabase
          .from("trades")
          .insert(trade)
          .select("*")
          .single();
        if (error) return { error: { message: error.message } };
        return { data: data as TradeRecord };
      },
      invalidatesTags: ["Trades", "Strategies"],
    }),
    importTrades: builder.mutation<void, CsvTradeImportInput[]>({
      async queryFn(trades) {
        const { error } = await supabase.from("trades").insert(trades);
        if (error) return { error: { message: error.message } };
        return { data: undefined };
      },
      invalidatesTags: ["Trades"],
    }),
    deleteTrade: builder.mutation<TradeRecord[], string>({
      async queryFn(id) {
        const { data, error } = await supabase.from("trades").delete().eq("id", id).select("*");
        if (error) return { error: { message: error.message } };
        return { data: (data ?? []) as TradeRecord[] };
      },
      invalidatesTags: ["Trades"],
    }),
  }),
});

export const {
  useAddTradeMutation,
  useDeleteTradeMutation,
  useGetDashboardTradesQuery,
  useGetStrategiesQuery,
  useGetTradeByIdQuery,
  useImportTradesMutation,
} = tradesApi;
