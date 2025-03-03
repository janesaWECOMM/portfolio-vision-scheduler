
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SchedulingDialog } from "./SchedulingDialog";

const FloatingContactButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsDialogOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg button-gradient h-14 w-14 p-0"
        aria-label="Contact Us"
      >
        <Calendar className="h-6 w-6" />
      </Button>
      
      <SchedulingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export default FloatingContactButton;
