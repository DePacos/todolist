import type { DragEndEvent } from '@dnd-kit/core';

export const getOrderParams = (event: DragEndEvent) => {
  const { active, over } = event;

  if (!over || active.id === over.id) return { activeId: '', putAfterItemId: '' };

  const ids: string[] = active.data.current?.sortable.items || [];
  const activeIndex = ids.findIndex((id) => id === active.id);
  const overIndex = ids.findIndex((id) => id === over.id);

  let putAfterItemId: string | null = null;

  if (activeIndex < overIndex) putAfterItemId = over.id as string;

  if (activeIndex > overIndex) {
    const prev = ids[overIndex - 1];

    putAfterItemId = prev || null;
  }

  return {
    activeId: String(active.id),
    putAfterItemId,
  };
};
