"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AIMessageText } from "./message";

export interface Action {
  label: string;
  didActionMsg: string;
  id: string;
}

interface ActionSelectorProps {
  actions: Action[];
}

export function ActionSelectorLoading(): JSX.Element {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-3">
        <Skeleton className="h-7 w-4/5 mx-auto" />
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((_, index) => (
            <Skeleton
              key={index}
              className="h-12 w-full"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}


export function ActionSelector({ actions }: ActionSelectorProps): JSX.Element {

  // if we didn't get any actions, fall back to AIMessageText
  if (!actions || actions.length === 0) {
      return (
        <AIMessageText content="No options found for this, can you provide more information?" />
      )
  }


  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-center">
          What would you like to do next?
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="flex flex-col space-y-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={() => alert(action.didActionMsg)}
              className="w-full text-base h-12"
              variant="outline"
            >
              {action.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
