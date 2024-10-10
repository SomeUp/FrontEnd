'use client';
import ArchiveListItem from '@/components/archive/archive-list-item';
import CreateArchiveDialog from '@/components/archive/create-archive-dialog';
import { useToast } from '@/components/hooks/use-toast';
import PlusOutlined from '@/components/icons/PlusOutlined';
import { ARCHIVE_MAX_NUM } from '@/lib/service/archive/constraints';
import { useAllPostCount } from '@/lib/service/post/use-post-service';
import { cn } from '@/lib/utils';
import { typography } from '@/styles/typography';
import { Archive } from '@/types/archive-types';
import { Dialog } from '@radix-ui/react-dialog';
import Link from 'next/link';
import { useState } from 'react';

interface ArchiveListProps {
  selectedArchiveId?: number;
  archives: Archive[];
}

export default function ArchiveList({
  selectedArchiveId,
  archives,
}: ArchiveListProps) {
  const { toast } = useToast();
  const postCountQuery = useAllPostCount();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const createArchiveDisabled = archives.length >= ARCHIVE_MAX_NUM;

  return (
    <div className="flex flex-col gap-1">
      <Link
        href={`/archive`}
        className={cn(
          typography({ scale: 'body-5' }),
          'flex items-center justify-between px-5 py-3',
          !selectedArchiveId ? 'text-primary-400' : 'text-black',
        )}
      >
        전체
        <span>({postCountQuery.data.totalCount})</span>
      </Link>
      {archives.map((archive) => {
        return (
          <ArchiveListItem
            key={archive.id}
            archiveId={archive.id}
            archiveName={archive.name}
            isSelected={archive.id === selectedArchiveId}
          />
        );
      })}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <button
          className={cn(
            typography({ scale: 'body-5' }),
            'flex items-center justify-between px-5 py-3 text-gray-400',
          )}
          onClick={() => {
            if (createArchiveDisabled) {
              toast({
                title: '생성할 수 있는 최대 아카이브 갯수를 초과하였습니다',
                description: '최대 아카이브 갯수 : 20개',
              });
            } else {
              setIsDialogOpen(true);
            }
          }}
        >
          아카이브 추가
          <PlusOutlined className="h-4 w-4" />
        </button>

        <CreateArchiveDialog onSuccess={() => setIsDialogOpen(false)} />
      </Dialog>
    </div>
  );
}
