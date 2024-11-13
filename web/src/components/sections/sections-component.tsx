import { ISection } from "@/src/types/Section";
import Image from "next/image";
import { Card, CardContent } from "@/src/components/ui/card";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { useRouter, useSearchParams } from "next/navigation";
import { IPage } from "@/src/types/Page";

interface SectionsComponentProps {
  sections: ISection[];
  pages: IPage[];
}

const SectionsComponent = ({ sections, pages }: SectionsComponentProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sectionIndex = Number(searchParams.get("section")) || 0;

  const handleSectionClick = (sectionIndex: number) => {
    // Calculate page index for this section
    let pageIndex = 0;
    for (let i = 0; i < sectionIndex; i++) {
      const sectionPages = pages.filter(
        (page) => page.sectionId === sections[i].id,
      ).length;
      pageIndex += sectionPages;
    }

    router.push(`?section=${sectionIndex}&page=${pageIndex}`);
  };

  return (
    <div className="max-w-[450px]">
      <h3 className="text-xl font-semibold mb-4">Sections</h3>
      <ScrollArea className="h-[400px] w-full rounded-md border p-4">
        <div className="flex flex-col gap-4">
          {sections.map((section, index) => (
            <Card
              key={section.id}
              className={`flex items-center gap-4 p-4 cursor-pointer  hover:bg-gray-50 ${
                index === sectionIndex && "bg-gray-100"
              }`}
              onClick={() => handleSectionClick(index)}
            >
              <div className="h-[100px] w-[100px] relative rounded-lg overflow-hidden bg-background">
                {section.sectionImage ? (
                  <Image
                    src={section.sectionImage}
                    alt={section.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>
              <CardContent className="flex-1 p-0">
                <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                <p className="text-sm text-gray-600">
                  {section.description.length > 100
                    ? `${section.description.slice(0, 100)}...`
                    : section.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SectionsComponent;
