import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Props {
  fallback: string;
  src?: string;
  className?: string;
}

const CustomAvatar = ({ fallback, src, className }: Props) => {
  const getFallback = () => {
    const fallbackStrArr = fallback.split(" ");
    return `${fallbackStrArr[0]?.slice(0, 1)}${fallbackStrArr[1]?.slice(0, 1)}`?.trim();
  };

  return (
    <Avatar className={cn(className && className)}>
      <AvatarImage src={src} />
      <AvatarFallback>{getFallback()}</AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;
