import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Mail, MapPin } from "lucide-react";
import { Company } from "@/types/Company";

export const CompanyDescriptionCard = (company: Company) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>企業情報</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium mb-1">会社名</h3>
          <p className="text-muted-foreground">{company.name}</p>
        </div>

        {company.description && (
          <div>
            <h3 className="font-medium mb-1">会社概要</h3>
            <p className="text-muted-foreground">{company.description}</p>
          </div>
        )}

        <div>
          <h3 className="font-medium mb-1">業界</h3>
          <Badge variant="outline">{company.industry.name}</Badge>
        </div>

        {company.address && (
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <p className="text-muted-foreground">{company.address}</p>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <a
            href={`mailto:${company.email}`}
            className="text-primary hover:underline"
          >
            {company.email}
          </a>
        </div>
      </CardContent>
    </Card>
  );
};
