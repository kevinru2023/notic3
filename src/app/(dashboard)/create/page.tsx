'use client';

import React, { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { Image, Video, Type, ChartNoAxesColumn } from 'lucide-react';
import ContentOption from './components/ui/ContentOption';
import { TextUploadForm } from './components/TextUploadForm';
import { useGetCreator } from '@/hooks/use-get-creator';
import { useCurrentAccount } from '@mysten/dapp-kit';
import Link from 'next/link';
import ImageUploadForm from './components/ImageUploadForm';
import VideoUploadForm from './components/VideoUploadForm';
import CreateProfileForm from './components/CreateProfileForm';
import { PlsConnectWallet } from '@/components/pls-connect-wallet';

const CreatePage = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [encryptedBlob, setEncryptedBlob] = useState<Blob | null>(null);
    const [key, setKey] = useState<CryptoKey | null>(null);
    const [iv, setIv] = useState<Uint8Array>(new Uint8Array(12));
    const [blobId, setBlobId] = useState<string | null>(null);
    console.log('PAGE BLOB ID', blobId);
    console.log('PAGE IV', iv);
    console.log('PAGE KEY', key);

    const [isClient, setIsClient] = useState(false);

    const account = useCurrentAccount();
    console.log(account?.address);
    const { data, isError } = useGetCreator(account?.address);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!account) {
        return <PlsConnectWallet />;
    }

    if (isError) {
        return <div>Error</div>;
    }

    const registered = false;

    if (!registered) {
        return (
            <div className="mx-auto my-10 w-full max-w-lg">
                <p className="text-center text-4xl font-bold">Create Profile</p>
                <CreateProfileForm setOpen={() => {}} />
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col items-center justify-between p-10">
            <div className="flex w-full flex-col items-center justify-center gap-4 lg:flex-row lg:items-start">
                {/* Profile Preview Card */}
                <Card className="h-full w-full p-2 lg:w-[60%]">
                    <CardHeader>
                        <CardTitle>Profile Preview</CardTitle>
                        <CardDescription>Your public profile</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center">
                            <img
                                src="https://i.pravatar.cc/300"
                                alt="Profile Picture"
                                className="h-24 w-24 rounded-full"
                            />
                            <h1 className="mt-2 text-2xl font-semibold">{data?.name}</h1>
                            <p className="text-sm text-muted-foreground">Software Developer</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button asChild>
                            <Link className="w-full" href={`creator/${data?.address}`} size="lg">
                                Edit Profile
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>

                {/* Upload Content Card */}
                <Card className="h-full w-full p-3 lg:w-[40%]">
                    <CardHeader>
                        <CardTitle>Create Content</CardTitle>
                        <CardDescription>Upload any content of your choosing</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-2">
                            <ContentOption
                                Form={ImageUploadForm}
                                Icon={Image}
                                tooltipText="Upload Image"
                                formTitle="Image"
                                setIv={setIv}
                                setKey={setKey}
                                setBlobId={setBlobId}
                            />
                            <ContentOption
                                Form={VideoUploadForm}
                                Icon={Video}
                                tooltipText="Upload Video"
                                formTitle="Video"
                                setIv={setIv}
                                setKey={setKey}
                                setBlobId={setBlobId}
                            />
                            <ContentOption
                                Form={TextUploadForm}
                                Icon={Type}
                                tooltipText="Create Blog Post"
                                formTitle="Text"
                                setIv={setIv}
                                setKey={setKey}
                                setBlobId={setBlobId}
                            />
                            <ContentOption
                                Form={TextUploadForm}
                                Icon={ChartNoAxesColumn}
                                tooltipText="Create Poll"
                                formTitle="Poll"
                                setIv={setIv}
                                setKey={setKey}
                                setBlobId={setBlobId}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <p className="text-center text-sm text-muted-foreground">
                            Note: All content is encrypted before being uploaded to the chain
                        </p>
                    </CardFooter>
                </Card>
            </div>

            {/* File Upload Section */}
            {/* <Card className="mt-4 w-full p-3">
                <CardHeader>
                    <CardTitle>File Upload</CardTitle>
                    <CardDescription>Upload and encrypt a file</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex w-full flex-col items-center justify-center">
                        <Card className="h-[20vh] w-full">
                            {previewUrl && (
                                <div className="flex h-full w-full items-center justify-center">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </div>
                            )}
                        </Card>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleUpload}
                            accept="image/*"
                            className="invisible"
                        />
                        <Button
                            variant="outline"
                            onClick={handleButtonClick}
                            disabled={!key}
                            className="mt-2"
                        >
                            Upload File
                        </Button>
                    </div>
                </CardContent>
            </Card> */}

            {/* Encryption Details */}
            {key && (
                <Card className="mt-4 w-full">
                    <CardHeader>
                        <CardTitle>Encryption Details</CardTitle>
                        <CardDescription>
                            Key and IV used for encryption (for demonstration only)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <h3 className="text-lg font-semibold">Key:</h3>
                            <p className="break-all">{key}</p>
                        </div>
                        <div className="mt-2">
                            <h3 className="text-lg font-semibold">IV:</h3>
                            <p className="break-all">
                                {Array.from(iv)
                                    .map((b) => b.toString(16).padStart(2, '0'))
                                    .join('')}
                            </p>
                        </div>
                        {blobId && (
                            <div className="mt-2">
                                <h3 className="text-lg font-semibold">Blob ID:</h3>
                                <p className="break-all">{blobId}</p>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        <p className="text-sm text-red-500">
                            Warning: Exposing encryption keys is not secure. This is for
                            demonstration purposes only.
                        </p>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
};

export default CreatePage;
