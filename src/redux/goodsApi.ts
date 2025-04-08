import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {BaseQueryArg} from '@reduxjs/toolkit/dist/query/baseQueryTypes'

export type Good = {
  id: number
  name: string
}

export const goodsApi = createApi({
  reducerPath: 'goodsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Products'],
  endpoints: (build) => ({
    getGoods: build.query<Good[], string | undefined>({
      query: (limit = '') => `goods?${limit && `_limit=${limit}`}`,
      providesTags: (result) => result
        ? [
          ...result.map(({ id }) => ({ type: 'Products', id } as const)),  // Каждый товар помечаем по его id
          {type: 'Products', id: 'LIST'}  // Дополнительно помечаем общий список товаров
        ]
        : [{type: 'Products', id: 'LIST'} ],  // Если нет данных, то просто общий тег
    }),
    addProduct: build.mutation({
      query: (body) => ({
        url: 'goods',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{type:'Products', id: 'LIST'}],
    })
  }),
})

export const { useGetGoodsQuery, useAddProductMutation } = goodsApi;
