'use client';
import { useDownloadFile } from '@/hooks/getdata';
import { useState } from 'react';

// Text File Component
const TextFileViewer = ({ content }) => (
    <pre className="max-h-96 overflow-x-auto rounded bg-gray-100 p-4">
        {content.substring(0, 1000)}...
    </pre>
);

// Image File Component
const ImageFileViewer = ({ content }) => {
    const blob = new Blob([content]);
    const url = URL.createObjectURL(blob);
    return <img src={url} alt="Downloaded image" className="h-auto max-w-full" />;
};

// PDF File Component
const PDFFileViewer = ({ content }) => {
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    return <iframe src={url} className="h-96 w-full" title="PDF Viewer" />;
};

// Default File Component
const DefaultFileViewer = ({ type, content }) => (
    <div>
        <p>File type: {type}</p>
        <p>File size: {content.byteLength} bytes</p>
        <a
            href={URL.createObjectURL(new Blob([content], { type }))}
            download="file"
            className="text-blue-500 hover:underline"
        >
            Download File
        </a>
    </div>
);

export default function TestDownloadFile() {
    const [blobId, setBlobId] = useState('');
    const [key, setKey] = useState('');
    const [iv, setIv] = useState('');
    const [result, setResult] = useState(null);

    const { mutate: downloadFile, error } = useDownloadFile(key, iv);

    const handleSubmit = (e) => {
        e.preventDefault();
        downloadFile(blobId, {
            onSuccess: (data) => {
                setResult(data);
            },
            onError: (error) => {
                console.error('Download failed:', error);
            },
        });
    };

    const renderFileContent = () => {
        if (!result) return null;

        switch (result.type) {
            case 'text/plain':
            case 'application/json':
            case 'text/html':
            case 'text/css':
            case 'text/javascript':
                return <TextFileViewer content={result.content} />;
            case 'image/jpeg':
            case 'image/png':
            case 'image/gif':
            case 'image/svg+xml':
                return <ImageFileViewer content={result.content} />;
            case 'application/pdf':
                return <PDFFileViewer content={result.content} />;
            default:
                return <DefaultFileViewer type={result.type} content={result.content} />;
        }
    };

    return (
        <div className="p-4">
            <h1 className="mb-4 text-2xl font-bold">Test Download File Function</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="blobId" className="mb-1 block">
                        Blob ID:
                    </label>
                    <input
                        id="blobId"
                        type="text"
                        value={blobId}
                        onChange={(e) => setBlobId(e.target.value)}
                        className="w-full rounded border p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="key" className="mb-1 block">
                        Key:
                    </label>
                    <input
                        id="key"
                        type="text"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        className="w-full rounded border p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="iv" className="mb-1 block">
                        IV:
                    </label>
                    <input
                        id="iv"
                        type="text"
                        value={iv}
                        onChange={(e) => setIv(e.target.value)}
                        className="w-full rounded border p-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                    Download and Decrypt
                </button>
            </form>

            {error && <div className="mt-4 text-red-500">Error: {error.message}</div>}

            {result && (
                <div className="mt-4">
                    <h2 className="mb-2 text-xl font-semibold">Result:</h2>
                    {renderFileContent()}
                </div>
            )}
        </div>
    );
}
('use client');
import { useDownloadFile } from '@/hooks/getdata';
import { useState } from 'react';

// Text File Component
const TextFileViewer = ({ content }) => (
    <pre className="max-h-96 overflow-x-auto rounded bg-gray-100 p-4">
        {content.substring(0, 1000)}...
    </pre>
);

// Image File Component
const ImageFileViewer = ({ content }) => {
    const blob = new Blob([content]);
    const url = URL.createObjectURL(blob);
    return <img src={url} alt="Downloaded image" className="h-auto max-w-full" />;
};

// PDF File Component
const PDFFileViewer = ({ content }) => {
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    return <iframe src={url} className="h-96 w-full" title="PDF Viewer" />;
};

// Default File Component
const DefaultFileViewer = ({ type, content }) => (
    <div>
        <p>File type: {type}</p>
        <p>File size: {content.byteLength} bytes</p>
        <a
            href={URL.createObjectURL(new Blob([content], { type }))}
            download="file"
            className="text-blue-500 hover:underline"
        >
            Download File
        </a>
    </div>
);

export default function TestDownloadFile() {
    const [blobId, setBlobId] = useState('');
    const [key, setKey] = useState('');
    const [iv, setIv] = useState('');
    const [result, setResult] = useState(null);

    const { mutate: downloadFile, error } = useDownloadFile(key, iv);

    const handleSubmit = (e) => {
        e.preventDefault();
        downloadFile(blobId, {
            onSuccess: (data) => {
                setResult(data);
            },
            onError: (error) => {
                console.error('Download failed:', error);
            },
        });
    };

    const renderFileContent = () => {
        if (!result) return null;

        switch (result.type) {
            case 'text/plain':
            case 'application/json':
            case 'text/html':
            case 'text/css':
            case 'text/javascript':
                return <TextFileViewer content={result.content} />;
            case 'image/jpeg':
            case 'image/png':
            case 'image/gif':
            case 'image/svg+xml':
                return <ImageFileViewer content={result.content} />;
            case 'application/pdf':
                return <PDFFileViewer content={result.content} />;
            default:
                return <DefaultFileViewer type={result.type} content={result.content} />;
        }
    };

    return (
        <div className="p-4">
            <h1 className="mb-4 text-2xl font-bold">Test Download File Function</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="blobId" className="mb-1 block">
                        Blob ID:
                    </label>
                    <input
                        id="blobId"
                        type="text"
                        value={blobId}
                        onChange={(e) => setBlobId(e.target.value)}
                        className="w-full rounded border p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="key" className="mb-1 block">
                        Key:
                    </label>
                    <input
                        id="key"
                        type="text"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        className="w-full rounded border p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="iv" className="mb-1 block">
                        IV:
                    </label>
                    <input
                        id="iv"
                        type="text"
                        value={iv}
                        onChange={(e) => setIv(e.target.value)}
                        className="w-full rounded border p-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                    Download and Decrypt
                </button>
            </form>

            {error && <div className="mt-4 text-red-500">Error: {error.message}</div>}

            {result && (
                <div className="mt-4">
                    <h2 className="mb-2 text-xl font-semibold">Result:</h2>
                    {renderFileContent()}
                </div>
            )}
        </div>
    );
}
