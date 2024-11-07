import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";

interface ButtonNavigationProps {
  currentPageIndex: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

const ButtonNavigation: React.FC<ButtonNavigationProps> = ({
  currentPageIndex,
  totalPages,
  onPrevious,
  onNext,
}) => {
  const router = useRouter();

  const handleFinish = () => {
    router.push("https://tally.so/r/3xNAjo");
  };

  return (
    <div className="flex justify-between mt-8 pt-4 w-full sm:pb-0 pb-4">
      <Button onClick={onPrevious} disabled={currentPageIndex === 0}>
        Previous
      </Button>
      {currentPageIndex === totalPages - 1 ? (
        <Button onClick={handleFinish}>Finish!</Button>
      ) : (
        <Button onClick={onNext}>Next</Button>
      )}
    </div>
  );
};

export default ButtonNavigation;
