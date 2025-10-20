import type {
  Response,
  GetBoardsResponse,
  AddBoardRequest,
  UpdateBoardRequest,
  OrderBoardsRequest,
} from '@/types';

import { todolistApi } from '@/app/api';

const boardsApi = todolistApi.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query<GetBoardsResponse[], void>({
      query: () => 'todo-lists',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Boards' as const, id })),
              { type: 'Boards', id: 'LIST' },
            ]
          : [{ type: 'Boards', id: 'LIST' }],
    }),
    addBoard: builder.mutation<Response<GetBoardsResponse>, AddBoardRequest>({
      query: (body) => ({
        url: 'todo-lists',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),
    updateBoard: builder.mutation<Response<{}>, UpdateBoardRequest>({
      query: ({ id, ...body }) => ({
        url: `todo-lists/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Boards', id }],
    }),
    deleteBoard: builder.mutation<Response<{}>, string>({
      query: (id) => ({
        url: `todo-lists/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),
    orderBoards: builder.mutation<Response<{}>, OrderBoardsRequest>({
      query: ({ id, ...body }) => ({
        url: `todo-lists/${id}/reorder`,
        method: 'PUT',
        body,
      }),

      async onQueryStarted({ id, putAfterItemId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          boardsApi.util.updateQueryData('getBoards', undefined, (draft) => {
            let newIndex = 0;

            const oldIndex = draft.findIndex((col) => col.id === id);
            const [moved] = draft.splice(oldIndex, 1);

            if (putAfterItemId) {
              newIndex = draft.findIndex((col) => col.id === putAfterItemId) + 1;
            }
            draft.splice(newIndex, 0, moved);
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useAddBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
  useOrderBoardsMutation,
} = boardsApi;
