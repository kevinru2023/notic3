'use client';
import React from 'react';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

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
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        fileInput.click();
        const file = fileInput.files?.[0];

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
        <div className="flex w-full items-center justify-between p-10">
            {/* Upload Content Card */}
            <Card className="w-[38%] p-3">
                <CardHeader>
                    <CardTitle>Create Content</CardTitle>
                    <CardDescription>Upload any content of your choosing</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex w-[100%] flex-col items-center justify-center">
                        <Card className="h-[20vh] w-full"></Card>
                        <input type="file" className="invisible" />
                        <Button variant="outline" onClick={handleUpload} disabled={!key}>
                            Upload File
                        </Button>
                    </div>
                </CardContent>
                <CardFooter>
                    <p className="text-muted-foreground text-center text-sm">
                        Note: The file will be encrypted before being uploaded.
                    </p>
                </CardFooter>
            </Card>

            {/* Carousel of Previous Uploads */}
            <Card className="w-[58%] p-4">
                <CardHeader>
                    <CardTitle>Posted Content</CardTitle>
                    <CardDescription>View all of your uploaded content</CardDescription>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter>
                    <Button variant="outline" size="sm">
                        View All
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

// const PostContainer = (img, description) => {

export default CreatePage;
