/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client';
import { useIntersectionObserver } from 'usehooks-ts';
import Chip from '@/components/ui/Chip';
import { usePosts } from '@/lib/service/post/use-post-service';
import { cn } from '@/lib/utils';
import { typography } from '@/styles/typography';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface PostListProps {
  search?: string;
  archiveId?: number;
}

export default function PostList({
  search,
  archiveId,
}: PostListProps): React.JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isIntersecting, ref } = useIntersectionObserver({
    rootMargin: '200px',
  });
  const { isFetching, fetchNextPage, data, hasNextPage, isFetchingNextPage } =
    usePosts({
      search,
      archiveId: archiveId,
    });

  const handleTagClick = (tag: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('search', `#${tag}`);
    router.push(`?${newSearchParams.toString()}`);
  };

  const handleClickNextPageButton = useCallback(() => {
    if (isFetching) {
      return;
    }

    fetchNextPage();
  }, [isFetching, fetchNextPage]);

  useEffect(() => {
    if (!isIntersecting) return;
    if (!hasNextPage) return;
    fetchNextPage();
  }, [isIntersecting, fetchNextPage, hasNextPage]);

  const allPosts = useMemo(() => {
    return data?.pages.flatMap((page) => page.postList) ?? [];
  }, [data]);

  if (allPosts.length === 0) {
    return (
      <div className="mt-16">
        <img
          src="/folder.png"
          alt="folder"
          width={289}
          height={288}
          className="mx-auto"
        />
        <p
          className={cn(
            typography({ scale: 'title-1' }),
            'py-0 text-center text-gray-300',
          )}
        >
          아카이브가 비어있습니다 :&gt;
        </p>
      </div>
    );
  }

  return (
    <ul>
      {allPosts.map((post) => (
        <li
          key={post.id}
          className="border-b border-gray-200 p-2.5 pb-14 pl-6 pr-6 pt-6"
        >
          <div className="flex flex-col justify-between gap-12">
            <div className="h-18">
              <Link href={`/posts/${post.id}`}>
                <h2
                  className={cn(
                    typography({ scale: 'title-2' }),
                    'line-clamp-2 hover:underline',
                  )}
                >
                  {post.title}
                </h2>
              </Link>
            </div>

            <div className="flex gap-4">
              {post.tagList?.map((tag) => (
                <button key={tag} onClick={() => handleTagClick(tag)}>
                  <Chip className={cn('#' + tag === search && 'bg-gray-200')}>
                    {tag}
                  </Chip>
                </button>
              ))}
            </div>
          </div>
        </li>
      ))}
      {!isFetching && hasNextPage && (
        <button
          ref={ref}
          onClick={handleClickNextPageButton}
          disabled={!hasNextPage || isFetchingNextPage}
          className="opacity-0"
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </button>
      )}
    </ul>
  );
}
