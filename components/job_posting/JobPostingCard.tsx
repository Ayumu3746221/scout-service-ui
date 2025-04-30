import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";
import { Button } from "../ui/button";
import { JobPosting } from "@/types/Jobposting";

interface JobPostingCardProps {
  companyName: string;
  jobPosting: JobPosting;
}

export const JobPostingCard = ({
  companyName,
  jobPosting,
}: JobPostingCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <Building2 className="h-4 w-4" />
          <span>{companyName}</span>
        </div>
        <CardTitle className="text-2xl">{jobPosting.title}</CardTitle>
        <CardDescription>
          <div className="flex flex-wrap gap-1 mt-2">
            {jobPosting.industries.map((industry) => (
              <Badge
                key={industry.id}
                variant="outline"
                className="bg-slate-100"
              >
                {industry.name}
              </Badge>
            ))}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">募集内容</h3>
          <p className="text-muted-foreground whitespace-pre-line">
            {jobPosting.description}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">応募要件</h3>
          <p className="text-muted-foreground whitespace-pre-line">
            {jobPosting.requirements}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">必要スキル</h3>
          <div className="flex flex-wrap gap-1">
            {jobPosting.skills.map((skill) => (
              <Badge key={skill.id} variant="secondary">
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button size="lg" className="w-full sm:w-auto">
          応募する
        </Button>
      </CardFooter>
    </Card>
  );
};
