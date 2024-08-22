"use client";

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EnvelopeClosedIcon, LayersIcon, GlobeIcon, PersonIcon, HomeIcon, ExternalLinkIcon } from "@radix-ui/react-icons"
import { Skeleton } from "@/components/ui/skeleton"
import { AIMessageText } from "./message";

export interface CSIROCardProps {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  profileLink: string;
  orchidLink: string;
  orgUnitName: string;
  businessUnitName: string;
  groupName: string;
  locationName: string;
}

export function CSIROCardLoading(): JSX.Element {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="w-24 h-24 rounded-full" />
          <div className="text-center space-y-2">
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-4 w-32 mx-auto" />
          </div>
        </div>
        <div className="mt-6 space-y-3">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 flex-grow" />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-28" />
      </CardFooter>
    </Card>
  );
}

function objectToString(obj: any) {
  return Object.keys(obj)
      .sort((a, b) => a - b)
      .map(key => obj[key])
      .join('');
}

export function CSIROCard(user: CSIROCardProps): JSX.Element {

  // if we didn't get a user object, fall back to AIMessageText
  if (!user.firstName) {
      try {
        return <AIMessageText content={objectToString(user)} />
      } catch (e) {
        return (
          <AIMessageText content="Unable to find user" />
        )
    }
  }
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/csiro-logo.svg?height=96&width=96" alt={`${user.firstName} ${user.lastName}`} />
            
          </Avatar>
          <div className="text-center">
            <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
            <p className="text-muted-foreground">{user.jobTitle}</p>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          <div className="flex items-center space-x-2">
            <EnvelopeClosedIcon className="text-muted-foreground" />
            <p className="text-sm">
              <a href="mailto:{user.email}" className="text-blue-500">{user.email}</a>
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <LayersIcon className="text-muted-foreground" />
            <p className="text-sm">{user.orgUnitName}</p>
          </div>
          <div className="flex items-center space-x-2">
            <GlobeIcon className="text-muted-foreground" />
            <p className="text-sm">{user.businessUnitName}</p>
          </div>
          <div className="flex items-center space-x-2">
            <PersonIcon className="text-muted-foreground" />
            <p className="text-sm">{user.groupName}</p>
          </div>
          <div className="flex items-center space-x-2">
            <HomeIcon className="text-muted-foreground" />
            <p className="text-sm">{user.locationName}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <a href={user.profileLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
            Profile 
            <ExternalLinkIcon className="ml-2 h-4 w-4" />
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href={user.orchidLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
            ORCID
            <ExternalLinkIcon className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
