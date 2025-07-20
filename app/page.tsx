"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApplicationForm } from "@/components/application-form"
import { AIAssistant } from "@/components/ai-assistant"
import { VideoTutorial } from "@/components/video-tutorial"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, MessageSquare, Play, FileText } from "lucide-react"

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-4">College Application Portal</h1>
          <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
            Your smart companion for college applications with AI assistance, video tutorials, and streamlined
            application management.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="application" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Application
            </TabsTrigger>
            <TabsTrigger value="assistant" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Tutorials
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveTab("application")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Start Application
                  </CardTitle>
                  <CardDescription>Begin your college application with our guided multi-step form</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Complete your profile, upload documents, and submit applications to multiple colleges with progress
                    tracking.
                  </p>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveTab("assistant")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    AI Assistant
                  </CardTitle>
                  <CardDescription>Get personalized help with your application process</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Ask questions about requirements, get essay feedback, and receive guidance throughout your
                    application journey.
                  </p>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveTab("tutorials")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Video Tutorials
                  </CardTitle>
                  <CardDescription>Learn with comprehensive video guides</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Watch step-by-step tutorials, track your progress, and take notes while learning about the
                    application process.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="application" className="mt-6">
            <ApplicationForm />
          </TabsContent>

          <TabsContent value="assistant" className="mt-6">
            <AIAssistant />
          </TabsContent>

          <TabsContent value="tutorials" className="mt-6">
            <VideoTutorial />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
