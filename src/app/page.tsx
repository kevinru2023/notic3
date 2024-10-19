'use client';
// import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
// import { generateNonce, generateRandomness } from '@mysten/zklogin';
// import { SuiClient } from '@mysten/sui/client';
// import { useEffect, useState } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import { useSearchParams } from 'next/navigation';

// const FULLNODE_URL = 'https://fullnode.testnet.sui.io'; // replace with the RPC URL you want to use

// export interface JwtPayload {
//     iss?: string;
//     sub?: string; //Subject ID
//     aud?: string[] | string;
//     exp?: number;
//     nbf?: number;
//     iat?: number;
//     jti?: string;
// }

export default function Login() {
    // const [epoch, setEpoch] = useState(0);
    // const [decodedJWT, setDecodedJWT] = useState<JwtPayload | null>(null);
    // const searchParams = useSearchParams();

    // const token_id = searchParams.get('token_id');

    // useEffect(() => {
    //     (async () => {
    //         const { epoch } = await suiClient.getLatestSuiSystemState();
    //         setEpoch(Number(epoch));
    //     })();
    //     console.log(window.location.search);
    //     const idToken = new URLSearchParams(window.location.search).get('id_token');
    //     if (idToken) {
    //         const encodedJWT = JSON.parse(atob(idToken.split('.')[1]));
    //         const decodedJWT = jwtDecode(encodedJWT) as JwtPayload;
    //         setDecodedJWT(decodedJWT);
    //     } else {
    //         console.log('No id_token found');
    //     }
    // }, []);

    // const suiClient = new SuiClient({ url: FULLNODE_URL });

    // const maxEpoch = Number(epoch) + 2; // this means the ephemeral key will be active for 2 epochs from now.
    // const ephemeralKeyPair = new Ed25519Keypair();
    // const randomness = generateRandomness();
    // const nonce = generateNonce(ephemeralKeyPair.getPublicKey(), maxEpoch, randomness);
    // const REDIRECT_URI = 'http://localhost:3000'; // Replace with prod url eventually
    // const CLIENT_ID = '1034945406915-16vf68vkpro1369va4qcg3u68a7imnv5.apps.googleusercontent.com';
    // const res = () =>
    //     window.location.replace(
    //         `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}` +
    //             `&response_type=id_token &redirect_uri=${REDIRECT_URI}&scope=openid&` +
    //             `nonce=${nonce}`
    //     );

    return <p>Home Page</p>;
}
