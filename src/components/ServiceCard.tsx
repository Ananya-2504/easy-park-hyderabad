
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListCheck } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  price?: string;
  icon: JSX.Element;
  buttonText?: string;
  onButtonClick?: () => void;
}

const ServiceCard = ({
  title,
  description,
  price,
  icon,
  buttonText = "Learn More",
  onButtonClick
}: ServiceCardProps) => {
  return (
    <Card className="w-full h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            {icon}
          </div>
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            {price && <p className="text-lg font-medium text-parking-blue mt-1">{price}</p>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onButtonClick} 
          className="w-full bg-parking-blue hover:bg-blue-500"
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
