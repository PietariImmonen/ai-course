import { IPage } from "@/src/types/Page";
import ReactMarkdown from "react-markdown";
import { Video } from "../../video/video";
import { Card, CardContent } from "@/src/components/ui/card";

interface TheoryPageProps {
  page: IPage;
}

const TheoryPage = ({ page }: TheoryPageProps) => {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {page.videoUrl && <Video videoUrl={page.videoUrl} />}
        <ReactMarkdown>{page.content}</ReactMarkdown>
      </CardContent>
    </Card>
  );
};

export default TheoryPage;
