"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, User, GraduationCap, FileText, PenTool } from "lucide-react"

interface ProfileCompletenessProps {
  completeness: {
    personal: boolean
    academic: boolean
    documents: boolean
    essays: boolean
    overall: number
  }
}

export function ProfileCompleteness({ completeness }: ProfileCompletenessProps) {
  const sections = [
    {
      key: "personal",
      label: "Personal Info",
      icon: User,
      completed: completeness.personal,
    },
    {
      key: "academic",
      label: "Academic History",
      icon: GraduationCap,
      completed: completeness.academic,
    },
    {
      key: "documents",
      label: "Documents",
      icon: FileText,
      completed: completeness.documents,
    },
    {
      key: "essays",
      label: "Essays",
      icon: PenTool,
      completed: completeness.essays,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Profile Completeness</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">{Math.round(completeness.overall)}%</div>
          <Progress value={completeness.overall} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">Complete your profile to improve your application</p>
        </div>

        <div className="space-y-3">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <div key={section.key} className="flex items-center gap-3">
                {section.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="flex-1 text-sm">{section.label}</span>
                <Badge variant={section.completed ? "default" : "secondary"}>
                  {section.completed ? "Complete" : "Pending"}
                </Badge>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
