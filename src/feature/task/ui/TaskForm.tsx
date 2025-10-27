import { Check, CirclePlus, X } from 'lucide-react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';

import type { TaskItemResponse } from '@/types';

import { Button, FormDataPicker, FormInput, FormSelect, FormTextarea } from '@/components';
import { TASK_PRIORITY, TASK_PRIORITY_VALUES } from '@/constants';
import { useAddTaskMutation, useUpdateTaskMutation } from '@/feature/task/api';
import { taskSchema } from '@/schemas';
import { type TaskFormType } from '@/schemas/app.schemas.ts';

import classes from './Tasks.module.css';

const selectOptions = TASK_PRIORITY_VALUES.map((value) => ({
  value: TASK_PRIORITY[value].VALUE,
  label: TASK_PRIORITY[value].LABEL,
}));

type Props = {
  task?: TaskItemResponse;
  isEditMode?: boolean;
  setIsEditMode?: (isEditMode: boolean) => void;
};

export const TaskForm = ({ task, isEditMode, setIsEditMode }: Props) => {
  const { id: boardId } = useParams();
  const editModeRef = useRef(true);

  const resetValues = {
    title: isEditMode && task ? task.title : '',
    description: isEditMode && task?.description ? task.description : '',
    priority: isEditMode && task ? +TASK_PRIORITY[task.priority].VALUE : +TASK_PRIORITY[1].VALUE,
    deadline: isEditMode && task ? task.deadline?.split('T')[0] : '',
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(taskSchema),
  });

  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  if (isEditMode && editModeRef.current) {
    editModeRef.current = false;

    reset(resetValues);
  }

  const onSubmitAddTask = (data: TaskFormType) => {
    if (!boardId) return;

    addTask({ id: boardId, ...data });
  };

  const onSubmitUpdateTask = (data: TaskFormType) => {
    if (!boardId || !task?.id) return;

    updateTask({ id: boardId, taskId: task.id, status: task.status, ...data });
    handleEditMode(false);
  };

  const handleEditMode = (isEditMode: boolean) => {
    if (!setIsEditMode) return;

    setIsEditMode(isEditMode);
  };

  return (
    <form
      className={classes.addTaskForm}
      onSubmit={handleSubmit(isEditMode ? onSubmitUpdateTask : onSubmitAddTask)}
    >
      <div className={isEditMode ? classes.wrapperTitleTaskForm : ''}>
        <FormInput placeholder="Title" maxLength={31} control={control} name="title" />
        {isEditMode && (
          <div className={classes.wrapperEditBtnForm}>
            <Button disabled={!isValid} type="submit">
              <Check size="20" color="green" />
            </Button>
            <Button onClick={() => handleEditMode(false)} type="button">
              <X size="20" color="red" />
            </Button>
          </div>
        )}
      </div>
      <div className={classes.wrapperSelectTaskForm}>
        <FormSelect
          control={control}
          name="priority"
          label="Task preorety"
          options={selectOptions}
        />
        <FormDataPicker label="Deadline" control={control} name="deadline" />
      </div>
      <FormTextarea
        placeholder="Description"
        maxLength={151}
        control={control}
        name="description"
      />
      {!isEditMode && (
        <Button variant="primary" disabled={!isValid}>
          <CirclePlus size="30" color="var(--font-color)" />
        </Button>
      )}
    </form>
  );
};
