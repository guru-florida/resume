import * as React from 'react';

export interface Slidable {
    from: 'left' | 'right';
    start: number;
    end?: number;
}