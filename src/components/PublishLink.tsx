import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const PublishLink = () => {
  const { toast } = useToast();
  const currentDate = format(new Date(), "yyyy-MM-dd");
  
  const handlePublish = () => {
    const publishUrl = `${window.location.origin}/published/${currentDate}`;
    navigator.clipboard.writeText(publishUrl);
    toast({
      title: "Link copied!",
      description: `Published link for ${currentDate} has been copied to clipboard.`,
    });
  };

  return (
    <Button 
      onClick={handlePublish}
      className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
    >
      <Share2 className="h-4 w-4" />
      Publish Link ({currentDate})
    </Button>
  );
};

export default PublishLink;