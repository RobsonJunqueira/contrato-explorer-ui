
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X, Edit, Plus } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface EditableSelectFieldProps {
  field: string;
  value: string | undefined;
  label: string;
  options: string[];
  onSave: (value: string) => void;
  onAddNew: () => void;
  disabled?: boolean;
}

export function EditableSelectField({ 
  field, 
  value, 
  label, 
  options, 
  onSave, 
  onAddNew,
  disabled = false 
}: EditableSelectFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [fieldValue, setFieldValue] = useState(value || "");
  
  const handleSaveClick = () => {
    onSave(fieldValue);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setFieldValue(value || "");
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div>
        <h3 className="text-sm font-semibold text-gray-500">{label}</h3>
        <div className="flex mt-1">
          <div className="flex-grow mr-2">
            <Select 
              value={fieldValue} 
              onValueChange={setFieldValue}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Selecione ${label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options && options.map(option => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-left font-normal border-t mt-1 pt-1 rounded-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddNew();
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar {label}
                  </Button>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
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
          {value || "-"}
        </div>
        {!disabled && (
          <Button
            size="icon"
            variant="ghost"
            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
