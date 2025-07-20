"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, File, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FileUploadProps {
  label: string
  description: string
  onFileSelect: (file: File | null) => void
  acceptedTypes?: string
}

export function FileUpload({ label, description, onFileSelect, acceptedTypes = ".pdf" }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileSelect = (file: File) => {
    if (!file.type.includes("pdf")) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF file only.",
        variant: "destructive",
      })
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      })
      return
    }

    setSelectedFile(file)
    onFileSelect(file)
    toast({
      title: "File Uploaded",
      description: `${file.name} has been uploaded successfully.`,
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    onFileSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Card
        className={`border-2 border-dashed transition-colors ${
          isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25"
        }`}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragOver(true)
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        <CardContent className="p-6">
          {selectedFile ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <File className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <Button onClick={removeFile} variant="ghost" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">{description}</p>
              <p className="text-sm text-muted-foreground mb-4">Drag and drop your file here, or click to browse</p>
              <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                Choose File
              </Button>
              <p className="text-xs text-muted-foreground mt-2">Accepted formats: PDF (max 10MB)</p>
            </div>
          )}

          <input ref={fileInputRef} type="file" accept={acceptedTypes} onChange={handleFileInput} className="hidden" />
        </CardContent>
      </Card>
    </div>
  )
}
