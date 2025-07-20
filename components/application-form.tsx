"use client";

import { useState } from "react";
import { useApplicationForm } from "@/hooks/use-application-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FileUpload } from "@/components/file-upload";
import { ProfileCompleteness } from "@/components/profile-completeness";
import { ChevronLeft, ChevronRight, Save, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const STEPS = [
  {
    id: "personal",
    title: "Personal Information",
    description: "Basic details about yourself",
  },
  {
    id: "academic",
    title: "Academic History",
    description: "Educational background and achievements",
  },
  {
    id: "documents",
    title: "Documents",
    description: "Upload required documents",
  },
  {
    id: "essays",
    title: "Essays",
    description: "Personal statements and essays",
  },
  {
    id: "review",
    title: "Review",
    description: "Review and submit your application",
  },
];

export function ApplicationForm() {
  const {
    formData,
    updateFormData,
    currentStep,
    setCurrentStep,
    completeness,
  } = useApplicationForm();
  const { toast } = useToast();
  const [previewMode, setPreviewMode] = useState(false);

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem("applicationDraft", JSON.stringify(formData));
    toast({
      title: "Draft Saved",
      description: "Your application progress has been saved.",
    });
  };

  const handleSubmit = () => {
    toast({
      title: "Application Submitted",
      description: "Your application has been successfully submitted!",
    });
  };

  if (previewMode) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Application Preview</h2>
          <Button onClick={() => setPreviewMode(false)} variant="outline">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Edit
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Application Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Personal Information</h3>
              <p>
                {formData.firstName} {formData.lastName}
              </p>
              <p>{formData.email}</p>
              <p>{formData.phone}</p>
            </div>

            <div>
              <h3 className="font-semibold">Academic Information</h3>
              <p>GPA: {formData.gpa}</p>
              <p>School: {formData.school}</p>
              <p>Graduation Year: {formData.graduationYear}</p>
            </div>

            <div>
              <h3 className="font-semibold">Personal Statement</h3>
              <p className="text-sm text-muted-foreground">
                {formData.personalStatement}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">College Application</h2>
          <p className="text-muted-foreground">
            Complete your application step by step
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSaveDraft} variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button
            onClick={() => setPreviewMode(true)}
            variant="outline"
            size="sm"
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{STEPS[currentStep].title}</CardTitle>
                  <CardDescription>
                    {STEPS[currentStep].description}
                  </CardDescription>
                </div>
                <Badge variant="secondary">
                  Step {currentStep + 1} of {STEPS.length}
                </Badge>
              </div>
              <Progress value={progress} className="w-full" />
            </CardHeader>

            <CardContent className="space-y-6">
              {currentStep === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        updateFormData({ firstName: e.target.value })
                      }
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        updateFormData({ lastName: e.target.value })
                      }
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        updateFormData({ email: e.target.value })
                      }
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        updateFormData({ phone: e.target.value })
                      }
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) =>
                        updateFormData({ address: e.target.value })
                      }
                      placeholder="Enter your full address"
                    />
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="school">Current School</Label>
                    <Input
                      id="school"
                      value={formData.school}
                      onChange={(e) =>
                        updateFormData({ school: e.target.value })
                      }
                      placeholder="Enter your school name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gpa">GPA</Label>
                    <Input
                      id="gpa"
                      value={formData.gpa}
                      onChange={(e) => updateFormData({ gpa: e.target.value })}
                      placeholder="Enter your GPA"
                    />
                  </div>
                  <div>
                    <Label htmlFor="graduationYear">Graduation Year</Label>
                    <Input
                      id="graduationYear"
                      value={formData.graduationYear}
                      onChange={(e) =>
                        updateFormData({ graduationYear: e.target.value })
                      }
                      placeholder="Enter graduation year"
                    />
                  </div>
                  <div>
                    <Label htmlFor="satScore">SAT Score (Optional)</Label>
                    <Input
                      id="satScore"
                      value={formData.satScore}
                      onChange={(e) =>
                        updateFormData({ satScore: e.target.value })
                      }
                      placeholder="Enter SAT score"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <FileUpload
                    label="Transcript"
                    description="Upload your official transcript (PDF only)"
                    onFileSelect={(file) =>
                      updateFormData({ transcript: file })
                    }
                    acceptedTypes=".pdf"
                  />
                  <FileUpload
                    label="Letters of Recommendation"
                    description="Upload recommendation letters (PDF only)"
                    onFileSelect={(file) =>
                      updateFormData({ recommendations: file })
                    }
                    acceptedTypes=".pdf"
                  />
                  <FileUpload
                    label="Additional Documents"
                    description="Upload any additional supporting documents"
                    onFileSelect={(file) =>
                      updateFormData({ additionalDocs: file })
                    }
                    acceptedTypes=".pdf"
                  />
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="personalStatement">
                      Personal Statement
                    </Label>
                    <Textarea
                      id="personalStatement"
                      value={formData.personalStatement}
                      onChange={(e) =>
                        updateFormData({ personalStatement: e.target.value })
                      }
                      placeholder="Write your personal statement..."
                      className="min-h-[200px]"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      {formData.personalStatement.length}/650 words
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="whyCollege">Why This College?</Label>
                    <Textarea
                      id="whyCollege"
                      value={formData.whyCollege}
                      onChange={(e) =>
                        updateFormData({ whyCollege: e.target.value })
                      }
                      placeholder="Explain why you want to attend this college..."
                      className="min-h-[150px]"
                    />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Review Your Application
                  </h3>
                  <p className="text-muted-foreground">
                    Please review all information before submitting. You can go
                    back to any step to make changes.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Personal Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <p>
                          <strong>Name:</strong> {formData.firstName}{" "}
                          {formData.lastName}
                        </p>
                        <p>
                          <strong>Email:</strong> {formData.email}
                        </p>
                        <p>
                          <strong>Phone:</strong> {formData.phone}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Academic Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <p>
                          <strong>School:</strong> {formData.school}
                        </p>
                        <p>
                          <strong>GPA:</strong> {formData.gpa}
                        </p>
                        <p>
                          <strong>Graduation:</strong> {formData.graduationYear}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-6">
                <Button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  variant="outline"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentStep === STEPS.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Submit Application
                  </Button>
                ) : (
                  <Button onClick={handleNext}>
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <ProfileCompleteness completeness={completeness} />
        </div>
      </div>
    </div>
  );
}
