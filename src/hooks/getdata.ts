import { useMutation } from '@tanstack/react-query';
import { fileTypeFromBuffer } from 'file-type';
import { readChunk } from 'read-chunk';

// Function to convert Base64 to ArrayBuffer
function base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

// Function to convert hex string to Uint8Array
function hexToUint8Array(hexString: string): Uint8Array {
    return new Uint8Array(hexString.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
}

// Function to decrypt AES-GCM encrypted data
async function decryptData(
    encryptedData: ArrayBuffer,
    key: CryptoKey,
    iv: Uint8Array
): Promise<ArrayBuffer> {
    return await window.crypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv: iv,
        },
        key,
        encryptedData
    );
}

// Function to import key from string
async function importKeyFromString(keyString: string): Promise<CryptoKey> {
    const keyData = hexToUint8Array(keyString);
    return await window.crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'AES-GCM' },
        false,
        ['decrypt']
    );
}

// Function to determine file type and load content
async function loadFile(buffer: ArrayBuffer): Promise<{ type: string; content: string | ArrayBuffer }> {
    const fileType = await fileTypeFromBuffer(buffer);
    
    if (!fileType) {
        // If file type is not detected, return the buffer as is
        return { type: 'application/octet-stream', content: buffer };
    }

    if (fileType.mime.startsWith('text/') || fileType.mime === 'application/json') {
        // For text files, convert ArrayBuffer to string
        const decoder = new TextDecoder('utf-8');
        const content = decoder.decode(buffer);
        return { type: fileType.mime, content };
    }

    // For binary files, return the buffer as is
    return { type: fileType.mime, content: buffer };
}


//this will return the file content and the file type, then we can just render the file content based on the file type
export const useDownloadFile = (keyString: string, ivString: string) => {
    return useMutation({
        mutationFn: async (blobId: string) => {
            const response = await fetch(
                `https://aggregator.walrus-testnet.walrus.space/v1/${blobId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'text/plain',
                    },
                }
            );
            if (!response.ok) {
                throw new Error('Download failed');
            }
            const base64EncryptedFile = await response.text();
            const encryptedArrayBuffer = base64ToArrayBuffer(base64EncryptedFile);

            // Convert key and iv from string to required types
            const key = await importKeyFromString(keyString);
            const iv = hexToUint8Array(ivString);

            // Decrypt the file
            const decryptedArrayBuffer = await decryptData(encryptedArrayBuffer, key, iv);

            console.log(
                'Downloaded and decrypted file',
                new Uint8Array(decryptedArrayBuffer).subarray(0, 100)
            );
            
            


            // Determine file type and load content
            const fileInfo = await loadFile(decryptedArrayBuffer);

            console.log(
                'Downloaded and decrypted file',
                fileInfo.type,
                fileInfo.content instanceof ArrayBuffer 
                    ? new Uint8Array(fileInfo.content).subarray(0, 100) 
                    : fileInfo.content.substring(0, 100)
            );

            return fileInfo;
        },
    });
};
