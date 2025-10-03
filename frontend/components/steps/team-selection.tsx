"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Users, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TeamSelectionProps {
  projectData: {
    projectName: string;
    selectedTeamMembers: any[];
    projectDuration: number;
  };
  teamMembers: any[];
  updateProjectData: (data: Partial<TeamSelectionProps["projectData"]>) => void;
  setIsLoading: (loading: boolean) => void;
  onComplete: () => void;
}

export function TeamSelection({
  projectData,
  teamMembers,
  updateProjectData,
  setIsLoading,
  onComplete,
}: TeamSelectionProps) {
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<any[]>(
    projectData.selectedTeamMembers || []
  );

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectMember = (member: any) => {
    if (!selectedMembers.some((m) => m.id === member.id)) {
      const updatedMembers = [...selectedMembers, member];
      setSelectedMembers(updatedMembers);
      updateProjectData({ selectedTeamMembers: updatedMembers });
      toast({
        title: "Team Member Added",
        description: `${member.name} has been added to the project team`,
        variant: "default",
      });
    }
  };

  const handleRemoveMember = (memberId: string) => {
    const updatedMembers = selectedMembers.filter((m) => m.id !== memberId);
    setSelectedMembers(updatedMembers);
    updateProjectData({ selectedTeamMembers: updatedMembers });
  };

  const handleUpdateDuration = (days: number) => {
    if (days < 1) {
      setError("Project duration must be at least 1 day");
      return;
    }

    updateProjectData({ projectDuration: days });
    setError(null);
  };

  const handleContinue = () => {
    if (selectedMembers.length === 0) {
      setError("Please select at least one team member");
      toast({
        title: "Missing Information",
        description: "Please select at least one team member",
        variant: "destructive",
      });
      return;
    }

    if (!projectData.projectDuration || projectData.projectDuration < 1) {
      setError("Please enter a valid project duration");
      toast({
        title: "Missing Information",
        description: "Please enter a valid project duration",
        variant: "destructive",
      });
      return;
    }

    onComplete();
  };

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-base font-medium bg-gradient-to-r from-slate-800 to-slate-500 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-400">
            Project Duration
          </Label>
        </div>

        <Card className="border-slate-200 dark:border-slate-800 transition-all duration-200 hover:shadow-md dark:hover:shadow-slate-800/30 hover:border-slate-300 dark:hover:border-slate-700">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-end gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="projectDuration">Time Period (in days)</Label>
                <Input
                  id="projectDuration"
                  type="number"
                  min="1"
                  value={projectData.projectDuration}
                  onChange={(e) =>
                    handleUpdateDuration(Number.parseInt(e.target.value) || 0)
                  }
                  className="h-11 border-slate-200 dark:border-slate-700"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">
                  Estimated Completion
                </Label>
                <div className="h-11 flex items-center px-3 border rounded-md bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700">
                  {new Date(
                    Date.now() +
                      projectData.projectDuration * 24 * 60 * 60 * 1000
                  ).toLocaleDateString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-base font-medium bg-gradient-to-r from-slate-800 to-slate-500 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-400">
            Team Members
          </Label>
        </div>

        <Card className="border-slate-200 dark:border-slate-800 transition-all duration-200 hover:shadow-md dark:hover:shadow-slate-800/30 hover:border-slate-300 dark:hover:border-slate-700">
          <CardContent className="p-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search team members by name, role, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 border-slate-200 dark:border-slate-700"
              />
            </div>

            {selectedMembers.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">
                  Selected Team Members
                </Label>
                <div className="flex flex-wrap gap-2 p-3 border rounded-md bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700">
                  {selectedMembers.map((member) => (
                    <Badge
                      key={member.id}
                      variant="secondary"
                      className="px-3 py-1.5 text-sm flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-slate-200 text-slate-700 text-xs dark:bg-slate-700 dark:text-slate-200">
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span>{member.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 p-0"
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">
                Available Team Members
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto p-1">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <div
                      key={member.id}
                      className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer transition-colors
                        ${
                          selectedMembers.some((m) => m.id === member.id)
                            ? "border-slate-400 bg-slate-100/80 dark:border-slate-600 dark:bg-slate-800/80"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-slate-600 dark:hover:bg-slate-800/50"
                        }`}
                      onClick={() => handleSelectMember(member)}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{member.name}</p>
                        <p className="text-sm text-muted-foreground truncate">
                          {member.role} • {member.department}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
                    <Users className="h-10 w-10 mb-2" />
                    <p>No team members found matching your search criteria</p>
                  </div>
                )}
              </div>
            </div>

            <Button
              onClick={handleContinue}
              className="w-full mt-4 h-11 bg-slate-800 hover:bg-slate-700 text-white dark:bg-slate-700 dark:hover:bg-slate-600"
              disabled={
                selectedMembers.length === 0 ||
                !projectData.projectDuration ||
                projectData.projectDuration < 1
              }
            >
              Continue with Selected Team ({selectedMembers.length})
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
