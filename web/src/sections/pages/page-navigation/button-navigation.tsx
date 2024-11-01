import { Button } from "@/src/components/ui/button";

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
  return (
    <div className="flex justify-between mt-8 pt-4">
      <Button onClick={onPrevious} disabled={currentPageIndex === 0}>
        Previous
      </Button>
      <Button onClick={onNext} disabled={currentPageIndex === totalPages - 1}>
        Next
      </Button>
    </div>
  );
};

export default ButtonNavigation;
