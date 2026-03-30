import React from 'react'
import { Card, Skeleton } from '@heroui/react';

export default function PostLoadingCard({ number }) {

    let skeltonCard = <Card className="bg-slate-900 w-full space-y-5 p-6" radius="lg">
        <div className="space-y-3">
            <Skeleton className="bg-slate-950 w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-slate-800" />
            </Skeleton>
            <div className="h-3 w-2/5 rounded-lg bg-slate-900/80" />
            <Skeleton className="bg-slate-950 w-2/5 rounded-lg">
            </Skeleton>
            <Skeleton className="bg-slate-950 rounded-lg">
                <div className="h-24 rounded-lg bg-slate-900/80" />
            </Skeleton>
            <Skeleton className="bg-slate-950 w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-slate-800" />
            </Skeleton>
        </div>
    </Card>

    return Array.from({ length: number || 1 }, (_, i) => (
        <React.Fragment key={i}>{skeltonCard}</React.Fragment>
    ))
}
