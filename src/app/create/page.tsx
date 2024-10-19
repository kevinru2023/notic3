import React from 'react';
import { useEffect } from 'react';

const CreatePage = () => {
    const [key, setKey] = React.useState<CryptoKey | null>(null);
    useEffect(() => {
        (async () => {
            const newKey = await crypto.subtle.generateKey(
                {
                    name: 'AES-GCM',
                    length: 256, // Key length in bits
                },
                true, // Extractable
                ['encrypt', 'decrypt'] // Key usages
            );
            setKey(newKey);
        })();
    }, []);
    return (
        <div>
            <h1>Create Page</h1>
        </div>
    );
};

export default CreatePage;
