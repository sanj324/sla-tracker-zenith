import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Bank } from "@/types/bank";

interface PublishLinkProps {
  banks: Bank[];
}

const PublishLink = ({ banks }: PublishLinkProps) => {
  const { toast } = useToast();
  const currentDate = format(new Date(), "yyyy-MM-dd");
  
  const handlePublish = () => {
    // Convert banks data to base64 to make it URL-safe
    const encodedData = btoa(JSON.stringify(banks));
    const publishUrl = `${window.location.origin}/published/${currentDate}?data=${encodedData}`;
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