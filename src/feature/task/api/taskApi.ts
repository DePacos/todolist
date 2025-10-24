import type {
  AddTaskRequest,
  BoardId,
  DeleteTaskRequest,
  OrderTaskRequest,
  Response,
  TaskItemResponse,
  TaskResponse,
  UpdateTaskRequest,
} from '@/types/types.ts';

import { todolistApi } from '@/app/api/todolistApi.ts';

const taskApi = todolistApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<TaskResponse, BoardId>({
      query: ({ id: boardId }) => `todo-lists/${boardId}/tasks`,
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id: taskId }) => ({ type: 'Tasks' as const, taskId })),
              { type: 'Tasks', id: 'LIST' },
            ]
          : [{ type: 'Tasks', id: 'LIST' }],
    }),
    addTask: builder.mutation<Response<{}>, AddTaskRequest>({
      query: ({ id: boardId, ...body }) => ({
        url: `todo-lists/${boardId}/tasks`,
        method: 'POST',
        body,
      }),
    }),
    updateTask: builder.mutation<Response<TaskItemResponse>, UpdateTaskRequest>({
      query: ({ id: boardId, taskId, ...body }) => ({
        url: `todo-lists/${boardId}/tasks/${taskId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
    updateTaskStatus: builder.mutation<Response<TaskItemResponse>, UpdateTaskRequest>({
      query: ({ id: boardId, taskId, ...body }) => ({
        url: `todo-lists/${boardId}/tasks/${taskId}`,
        method: 'PUT',
        body,
      }),
      onQueryStarted: async ({ id: boardId, taskId, ...data }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          taskApi.util.updateQueryData('getTasks', { id: boardId }, (draft) => {
            const task = draft.items.find((task) => task.id === taskId);
            if (task) task.status = data.status;
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteTask: builder.mutation<Response<{}>, DeleteTaskRequest>({
      query: ({ boardId, taskId }) => ({
        url: `todo-lists/${boardId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
    orderTask: builder.mutation<Response<{}>, OrderTaskRequest>({
      query: ({ boardId, taskId, ...body }) => ({
        url: `todo-lists/${boardId}/tasks/${taskId}/reorder`,
        method: 'PUT',
        body,
      }),
      onQueryStarted: async ({ boardId, taskId, putAfterItemId }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          taskApi.util.updateQueryData('getTasks', { id: boardId }, (draft) => {
            let newIndex = 0;
            const oldIndex = draft.items.findIndex((task) => task.id === taskId);
            const [moved] = draft.items.splice(oldIndex, 1);

            if (putAfterItemId) {
              newIndex = draft.items.findIndex((task) => task.id === putAfterItemId) + 1;
            }

            draft.items.splice(newIndex, 0, moved);
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation,
  useOrderTaskMutation,
} = taskApi;
