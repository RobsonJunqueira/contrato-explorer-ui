
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Edit, X, ExternalLink } from "lucide-react";

interface EditableFieldProps {
  field: string;
  value: string | undefined;
  label: string;
  isTextarea?: boolean;
  onSave: (value: string) => void;
}

export function EditableField({ field, value, label, isTextarea = false, onSave }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [fieldValue, setFieldValue] = useState<string>("");

  const handleEditClick = () => {
    setIsEditing(true);
    setFieldValue(value || "");
  };

  const handleSaveClick = () => {
    onSave(fieldValue);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div>
        <h3 className="text-sm font-semibold text-gray-500">{label}</h3>
        <div className="flex mt-1">
          {isTextarea ? (
            <Textarea
              value={fieldValue}
              onChange={(e) => setFieldValue(e.target.value)}
              className="flex-grow mr-2"
              rows={2}
            />
          ) : (
            <Input
              value={fieldValue}
              onChange={(e) => setFieldValue(e.target.value)}
              className="flex-grow mr-2"
            />
          )}
          <Button 
            size="icon"
            variant="ghost" 
            className="h-10 w-10 text-green-600"
            onClick={handleSaveClick}
          >
            <Check className="h-5 w-5" />
          </Button>
          <Button 
            size="icon"
            variant="ghost" 
            className="h-10 w-10 text-red-600"
            onClick={handleCancelClick}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="group relative">
      <h3 className="text-sm font-semibold text-gray-500">{label}</h3>
      <div className="flex items-center">
        <div className="text-navy-900 font-medium flex-grow">
          {field.includes("link") && value ? (
            <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium flex items-center">
              Acessar <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          ) : (
            value || "-"
          )}
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
          onClick={handleEditClick}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
