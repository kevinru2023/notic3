import { ConnectButton } from '@mysten/dapp-kit';

export const PlsConnectWallet = () => {
    return (
        <div className="flex w-full flex-col items-center justify-center gap-4 bg-gray-200">
            <h2 className="text-3xl font-bold">Connect your wallet to view this page.</h2>
            <ConnectButton className="text-2xl font-extrabold" />
        </div>
    );
};
