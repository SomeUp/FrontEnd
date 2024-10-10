import { z } from 'zod';

const POST_TITLE_MAX_LENGTH: number = 100;
const POST_TITLE_MAX_LENGTH_ERROR: string = '제목을 100자 이내로 입력해주세요.';
const POST_TITLE_MIN_LENGTH: number = 1;
const POST_TITLE_MIN_LENGTH_ERROR: string = '제목을 입력하세요.';
const POST_MEMO_MIN_LENGTH: number = 0;
export const POST_MEMO_MAX_LENGTH: number = 1000;

export const postSchema = z.object({
  title: z
    .string()
    .min(POST_TITLE_MIN_LENGTH, POST_TITLE_MIN_LENGTH_ERROR)
    .max(POST_TITLE_MAX_LENGTH, POST_TITLE_MAX_LENGTH_ERROR),
  memo: z.string().min(POST_MEMO_MIN_LENGTH).max(POST_MEMO_MAX_LENGTH),
});

export type PostSchema = z.infer<typeof postSchema>;
