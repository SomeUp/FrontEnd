'use client';
import Button from '@/components/ui/Button';
import TextField from '@/components/ui/TextField';
import {
  POST_MEMO_MAX_LENGTH,
  postSchema,
  PostSchema,
} from '@/lib/service/post/constraints';
import { useUpdateMemo } from '@/lib/service/post/use-post-service';
import { cn } from '@/lib/utils';
import { typography } from '@/styles/typography';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

interface MemoTextFieldProps {
  postId: string;
  initialMemo?: string;
  createdAt?: string;
}

const MemoTextField = ({
  postId,
  initialMemo = '',
  createdAt,
}: MemoTextFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: updateMemoMutate } = useUpdateMemo();
  const maxLength = POST_MEMO_MAX_LENGTH;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      memo: initialMemo,
    },
  });
  const memo = watch('memo', '');
  const textCounter = `${memo.length} / ${maxLength}`;

  const updateMemo = () => {
    updateMemoMutate(
      { postId, content: memo },
      { onSuccess: () => setIsEditing(false) },
    );
  };

  const textFieldRef = useRef<HTMLTextAreaElement>(null);

  const handleClick = () => {
    if (isEditing) {
      updateMemo();
    } else {
      setIsEditing(true);
      textFieldRef.current?.focus();
    }
  };

  const buttonLabel = isEditing
    ? '수정 완료'
    : initialMemo
      ? '메모 수정'
      : '메모 등록';

  const bottomText = isEditing ? textCounter : createdAt;

  return (
    <form className="mt-7" onSubmit={handleSubmit(updateMemo)}>
      <TextField
        placeholder="메모를 남겨보세요 :>"
        className="w-full"
        readOnly={!isEditing}
        {...register('memo', {
          maxLength,
        })}
      >
        <div className="flex w-full items-end justify-between">
          <span
            className={cn(
              typography({ scale: 'body-4' }),
              'flex-shrink-0',
              errors.memo !== undefined ? 'text-error-400' : 'text-gray-800',
            )}
          >
            {bottomText}
          </span>
          <Button
            variant="rounded"
            size="lg"
            type="submit"
            onClick={handleClick}
            className="round-13"
            disabled={Boolean(errors.memo)}
          >
            {buttonLabel}
          </Button>
        </div>
      </TextField>
    </form>
  );
};

export default MemoTextField;
