import { useState } from "react";
import { Vehicle } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ActionDialogProps {
  vehicle: Vehicle;
  onSave: (
    id: string,
    action: string,
  ) => Promise<{ success: boolean; error?: string }>;
}

export function ActionDialog({ vehicle, onSave }: ActionDialogProps) {
  const [open, setOpen] = useState(false);
  const [actionText, setActionText] = useState(vehicle.proposedAction || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const res = await onSave(vehicle.id, actionText);
    setIsSaving(false);
    if (res.success) {
      setOpen(false);
    } else {
      alert(`Error saving action: ${res.error}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3 text-xs">
        {vehicle.proposedAction ? "Edit Action" : "Log Action"}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log Proposed Action</DialogTitle>
          <DialogDescription>
            Provide a proposed action for the aging stock:
            <span className="block font-medium text-black mt-1">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="action" className="text-right">
              Action
            </Label>
            <Input
              id="action"
              placeholder="e.g., Price Reduction Planned"
              className="col-span-3"
              value={actionText}
              onChange={(e) => setActionText(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button disabled={isSaving} onClick={handleSave}>
            {isSaving ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
