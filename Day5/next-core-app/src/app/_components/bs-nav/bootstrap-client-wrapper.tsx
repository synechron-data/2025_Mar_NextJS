'use client'

import { useEffect } from 'react';

export default function BootstrapClientWrapper() {
    useEffect(() => {
        import('bootstrap')
            .then(() => {
                console.log('Bootstrap JS loaded');
            })
            .catch(err => {
                console.error('Failed to load Bootstrap JS', err);
            });
    }, []);

    return null;
}
