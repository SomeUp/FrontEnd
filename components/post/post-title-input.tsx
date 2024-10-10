import { PostSchema } from '@/lib/service/post/constraints';
import { FunctionComponent } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface PostTitleInputProps {
  register: UseFormRegister<PostSchema>;
}

const PostTitleInput: FunctionComponent<PostTitleInputProps> = ({
  register,
}) => {
  return (
    <div className="flex flex-shrink-0 items-center justify-center p-4">
      <div className="flex flex-col">
        <input
          {...register('memo')}
          placeholder="제목을 입력하세요"
          className="flex-1 bg-transparent text-center text-3xl font-semibold"
        />
      </div>
    </div>
  );
};

PostTitleInput.displayName = 'PostTitle';

export default PostTitleInput;
