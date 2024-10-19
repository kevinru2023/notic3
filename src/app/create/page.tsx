'use client';
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

    const handleUpload = async () => {
        const file = (document.querySelector('input[type="file"]') as HTMLInputElement)?.files?.[0];
        if (!file) {
            return;
        }

        const fileData = await file.arrayBuffer();
        const encryptedFile = await crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv: new Uint8Array(12), // Initialization vector
            },
            key!,
            fileData
        );
        const blob1 = new Blob([encryptedFile]);
        const url = URL.createObjectURL(blob1);
        const img = document.getElementById('img') as HTMLImageElement;
        img.src = url;

        // So the Blob can be Garbage Collected
        img!.onload = (e) => URL.revokeObjectURL(url);

        // TODO: Send the encrypted file to the Walrus API
    };

    return (
        <div>
            <h1>Create Page</h1>
            <p>{key ? 'Key created' : 'Creating key...'}</p>
            <input type="file" />
            <button
                className="h-12 w-32 rounded-sm bg-gray-200"
                onClick={handleUpload}
                disabled={!key}
            >
                Upload File
            </button>
            <img id="img" />
        </div>
    );
};

export default CreatePage;
