import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return <div className={`skeleton ${className}`} />;
};

export const TransactionSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-fade-in">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-card">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="w-32 h-4" />
              <Skeleton className="w-24 h-3" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="w-20 h-6" />
            <Skeleton className="w-8 h-8 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const StatCardSkeleton: React.FC = () => {
  return (
    <div className="p-6 rounded-xl bg-card animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-6 h-6 rounded" />
      </div>
      <Skeleton className="w-32 h-8 mb-2" />
      <Skeleton className="w-40 h-3" />
    </div>
  );
};

export const ChartSkeleton: React.FC = () => {
  return (
    <div className="p-6 rounded-xl bg-card animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="w-48 h-6" />
        <Skeleton className="w-24 h-4" />
      </div>
      <Skeleton className="w-full h-64" />
    </div>
  );
};
