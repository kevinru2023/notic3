'use client';

import React, { useState, useEffect } from 'react';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { SuiObjectResponse } from '@mysten/sui/client';
import { useKeyPair } from '@/hooks/use-key-pair';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { PlsConnectWallet } from '@/components/pls-connect-wallet';

interface Subscription {
    creator_subscription_id: string;
    end_time: string;
    start_time: string;
}

type SubscriptionArray = Subscription[];

function Subscriptions() {
    const account = useCurrentAccount();
    const suiClient = useSuiClient();
    const [registry, setRegistry] = useState<SuiObjectResponse>();
    const [creatorSubscriptions, setCreatorSubscriptions] = useState<SuiObjectResponse[]>([]);
    const [userSubscriptions, setUserSubscriptions] = useState<SubscriptionArray>([]);
    const [timeleft, setTimeleft] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cost, setCost] = useState(0);
    const [creator, setCreator] = useState();

    const { data, isPending, isFetching } = useKeyPair();

    useEffect(() => {
        if (account) {
            (async () => {
                const registryResp = await suiClient.getObject({
                    id: process.env.NEXT_PUBLIC_CREATOR_SUBSCRIPTION_REGISTRY_ID,
                    options: {
                        showContent: true,
                    },
                });
                setRegistry(registryResp);

                const subscriptionResp = await suiClient.multiGetObjects({
                    ids: registryResp?.data?.content?.fields.subscriptions,
                    options: {
                        showContent: true,
                    },
                });
                setCreatorSubscriptions(subscriptionResp);

                console.log(subscriptionResp);
                subscriptionResp.forEach((creatorSubscription) => {
                    creatorSubscription.data?.content?.fields.subscriptions.fields.contents.forEach(
                        async (subscription) => {
                            if (subscription.fields.key == account.address) {
                                const creatorSubscriptionResp = await suiClient.getObject({
                                    id: subscription.fields.value.fields.creator_subscription_id,
                                    options: {
                                        showContent: true,
                                    },
                                });
                                console.log(creatorSubscriptionResp.data);
                                setCost(
                                    creatorSubscriptionResp.data?.content?.fields.subscription_price
                                );

                                //const creatorResp = await

                                const timestamp = parseInt(
                                    subscription.fields.value.fields.end_time,
                                    10
                                );
                                const difference = timestamp - Date.now();

                                const seconds = Math.floor(Math.abs(difference) / 1000);
                                const minutes = Math.floor(seconds / 60);
                                const hours = Math.floor(minutes / 60);
                                const days = Math.floor(hours / 24);

                                if (days > 0) {
                                    setTimeleft(`${days} day${days > 1 ? 's' : ''}`);
                                } else if (hours > 0) {
                                    setTimeleft(`${hours} hour${hours > 1 ? 's' : ''}`);
                                } else if (minutes > 0) {
                                    setTimeleft(`${minutes} minute${minutes > 1 ? 's' : ''}`);
                                } else {
                                    setTimeleft(`${seconds} second${seconds !== 1 ? 's' : ''}`);
                                }

                                setExpiry(new Date(timestamp).toLocaleString());

                                setUserSubscriptions((prevSubscriptions) => {
                                    const newSubscription: Subscription = {
                                        creator_subscription_id:
                                            subscription.fields.value.fields
                                                .creator_subscription_id,
                                        end_time: subscription.fields.value.fields.end_time,
                                        start_time: subscription.fields.value.fields.start_time,
                                    };
                                    return [...prevSubscriptions, newSubscription];
                                });
                            }
                        }
                    );
                });
            })();
        }
    }, [account]);

    console.log(userSubscriptions);

    if (!account) return <PlsConnectWallet />;

    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col">
                {userSubscriptions.map((subscription) => (
                    <Card key={subscription.end_time}>
                        <CardHeader>
                            <CardTitle>{subscription.creator_subscription_id}</CardTitle>
                            <CardDescription>Expiring in {timeleft}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col">
                                <a
                                    href={`https://suiscan.xyz/testnet/object/${subscription}`}
                                    target="_blank"
                                >
                                    link
                                </a>
                                <span>cost: {cost} $SUI</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Subscriptions;
