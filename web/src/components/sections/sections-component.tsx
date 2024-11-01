import { ISection } from "@/src/types/Section";
import Image from "next/image";
import { Card, CardContent } from "@/src/components/ui/card";
import { ScrollArea } from "@/src/components/ui/scroll-area";

interface SectionsComponentProps {
  sections: ISection[];
}

const SectionsComponent = ({ sections }: SectionsComponentProps) => {
  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-4">Sections</h3>
      <ScrollArea className="h-[400px] w-full rounded-md border p-4">
        <div className="flex flex-col gap-4">
          {sections.map((section) => (
            <Card key={section.id} className="flex items-center gap-4 p-4">
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
                <p className="text-sm text-gray-600">{section.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SectionsComponent;
