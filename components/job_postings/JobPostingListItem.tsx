import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { JobPosting } from "@/types/Jobposting";

function JobPostingListItem(job: JobPosting) {
  return (
    <Card key={job.id} className="w-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <Building2 className="h-4 w-4" />
          <span>{job.company.name}</span>
        </div>
        <CardTitle className="text-xl">{job.title}</CardTitle>
        <CardDescription>
          <div className="flex flex-wrap gap-1 mt-2">
            {job.industries.map((industry) => (
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
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium mb-1">募集内容</h3>
          <p className="text-sm text-muted-foreground">{job.description}</p>
        </div>
        <div>
          <h3 className="font-medium mb-1">応募要件</h3>
          <p className="text-sm text-muted-foreground">{job.requirements}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full">
          <h3 className="font-medium text-sm mb-2">必要スキル</h3>
          <div className="flex flex-wrap gap-1">
            {job.skills.map((skill) => (
              <Badge key={skill.id} variant="secondary">
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default JobPostingListItem;
