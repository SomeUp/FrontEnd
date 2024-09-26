import { Suspense } from 'react';
import { PrefetchBoundary } from '@/components/utils/PrefetchBoundary';
import PostDetail from '@/components/post/post-detail';
import postQuerys from '@/lib/service/post/post-queries';
import { typography } from '@/styles/typography';
import { cn } from '@/lib/utils';
import FeedbackBox from '@/components/post/feadback-box';
import PostResultSaveButton from '@/components/post/post-result-save-button';

function ResultPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <span
        className={cn(
          typography({ scale: 'head-2' }),
          'grid place-content-center',
        )}
      >
        Summary Result
      </span>
      <Suspense fallback={<div>Loading...</div>}>
        <PrefetchBoundary fetchQueryOptions={postQuerys.detail(id)}>
          <PostDetail id={id} />
        </PrefetchBoundary>
      </Suspense>
      <PostResultSaveButton postId={id} isLoggedIn />
      <FeedbackBox />
    </>
  );
}

export default ResultPage;
