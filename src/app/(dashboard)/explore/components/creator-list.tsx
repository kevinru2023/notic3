'use client';

import { CreatorCard } from './creator-card';
import { useSuiClientQuery } from '@mysten/dapp-kit';
import { useState, useEffect } from 'react';
import { Creator, useCreators } from '@/hooks/use-creators';
import { useSuiClient } from '@mysten/dapp-kit';
import { Skeleton } from '@/components/ui/skeleton';

export const CreatorList = () => {
    //if (isPending) return <div>Loading...</div>;
    const creators = useCreators();

    if (!creators)
        return (
            <Skeleton className="h-96 p-10">
                <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-32 rounded-lg bg-gray-200" />
                    <Skeleton className="h-32 rounded-lg bg-gray-200" />
                    <Skeleton className="h-32 rounded-lg bg-gray-200" />
                    <Skeleton className="h-32 rounded-lg bg-gray-200" />
                </div>
            </Skeleton>
        );

    return (
        <section>
            <ul className="grid grid-cols-2 gap-2">
                {creators.map((creator) => {
                    return (
                        <li key={creator.address}>
                            <CreatorCard creator={creator} />
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};
