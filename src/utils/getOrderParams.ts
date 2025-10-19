import type { DragEndEvent } from '@dnd-kit/core';

export const getOrderParam = (event: DragEndEvent) => {
  const { active, over } = event;

  if (!over || active.id === over.id) return { activeId: '', putAfterItemId: '' };

  const ids: string[] = active.data.current?.sortable.items || [];
  const oldIndex = ids.findIndex((id) => id === active.id);
  const newIndex = ids.findIndex((id) => id === over.id);

  let putAfterItemId: string = '';

  if (oldIndex < newIndex) putAfterItemId = over.id as string;

  if (oldIndex > newIndex) {
    const prev = ids[newIndex - 1];

    putAfterItemId = prev || '';
  }

  return {
    activeId: String(active.id),
    putAfterItemId,
  };
};
