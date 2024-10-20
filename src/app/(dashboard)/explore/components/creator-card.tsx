import { Creator } from '@/hooks/use-creators';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ExternalLink, User } from 'lucide-react';
import Link from 'next/link';
import { useDownloadUnencryptedFile } from '@/hooks/getdata';

interface CreatorCardProps {
    creator: Creator;
}

export const CreatorCard = ({ creator }: CreatorCardProps) => {
    const { data, isPending } = useDownloadUnencryptedFile(creator.image);

    return (
        <Card className="mx-auto h-full w-full transform overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="p-4">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                        {!isPending && <AvatarImage src={data} alt={creator.name} />}
                        <AvatarFallback>
                            <User className="h-8 w-8" />
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="line-clamp-1 text-lg font-semibold">{creator.name}</h3>
                        <p className="break-all font-mono text-sm text-muted-foreground">
                            {creator.address.slice(0, Math.ceil(creator.address.length / 2))}
                            <br />
                            {creator.address.slice(Math.ceil(creator.address.length / 2))}
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{creator.bio}</p>
                <Link href={`/creator/${creator.address}`}>
                    <Button variant="outline" className="w-full">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Profile
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
};
