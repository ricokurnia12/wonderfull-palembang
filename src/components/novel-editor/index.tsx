"use client";

import { useState, useEffect } from "react";
import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  type JSONContent,
} from "novel";
import { slashCommand, suggestionItems } from "./slash-command";
import EditorMenu from "./editor-menu";
import { uploadFn } from "./image-upload";
import { defaultExtensions } from "./extensions";
import { TextButtons } from "./selectors/text-buttons";
import { LinkSelector } from "./selectors/link-selector";
import { NodeSelector } from "./selectors/node-selector";
import { MathSelector } from "./selectors/math-selector";
import { ColorSelector } from "./selectors/color-selector";
import { useDebouncedCallback } from "use-debounce";
import { Separator } from "@/components/ui/separator";
import { TextAlignmentButtons } from "./selectors/text-align";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ImageResizer, handleCommandNavigation } from "novel";
import { handleImageDrop, handleImagePaste } from "novel";

const extensions = [...defaultExtensions, slashCommand];

export const defaultEditorContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [],
    },
  ],
};

type TStatus = "Saved" | "Unsaved";
type TEditorProps = {
  className?: string;
  title?: string;
  contentname?: string;
  onChange?: (html: string) => void;
  initialValue?: string | JSONContent | null;
};

export default function Editor({
  className,
  title = "Content Editor",
  contentname ,
  onChange,
  initialValue,
}: TEditorProps) {
  const [initialContent, setInitialContent] =
    useState<JSONContent>(defaultEditorContent);
  const [saveStatus, setSaveStatus] = useState<TStatus>("Saved");
  const [charsCount, setCharsCount] = useState();
  const [editorInstance, setEditorInstance] = useState<EditorInstance | null>(
    null
  );
  const [htmlToConvert, setHtmlToConvert] = useState<string | null>(null);

  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openAI, setOpenAI] = useState(false);

  // Image URL Dialog states
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageRange, setImageRange] = useState(null);

  // Process initialValue when it changes
  useEffect(() => {
    if (initialValue) {
      if (typeof initialValue === "string") {
        // Store the HTML string to be converted once editor is ready
        setHtmlToConvert(initialValue);
        setInitialContent(defaultEditorContent);
      } else {
        setInitialContent(initialValue);
        setHtmlToConvert(null);
      }
    } else {
      const savedContent = window.localStorage.getItem(
        `novel-content-${contentname}`
      );
      if (savedContent) {
        try {
          const parsedContent = JSON.parse(savedContent);
          setInitialContent(parsedContent);
        } catch (error) {
          console.error("Error parsing saved content:", error);
          setInitialContent(defaultEditorContent);
        }
      } else {
        setInitialContent(defaultEditorContent);
      }
      setHtmlToConvert(null);
    }
  }, [initialValue, contentname]);

  // Convert HTML to editor content once editor is ready
  useEffect(() => {
    if (htmlToConvert && editorInstance) {
      try {
        // Create a temporary div to parse HTML
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlToConvert;

        // Use the editor's schema to generate JSON from HTML
        // const parser = new DOMParser();
        // const doc = parser.parseFromString(htmlToConvert, "text/html");

        // Clear the editor and insert the HTML content
        editorInstance.commands.clearContent();
        editorInstance.commands.insertContent(htmlToConvert);

        setHtmlToConvert(null);
      } catch (error) {
        console.error("Error converting HTML to editor content:", error);
        // Fallback to plain text if HTML parsing fails
        editorInstance.commands.clearContent();
        editorInstance.commands.insertContent(
          htmlToConvert.replace(/<[^>]*>/g, "")
        );
        setHtmlToConvert(null);
      }
    }
  }, [htmlToConvert, editorInstance]);

  // Listen for custom image URL dialog events
  useEffect(() => {
    const handleImageUrlDialog = (event: CustomEvent) => {
      setImageRange(event.detail.range);
      setEditorInstance(event.detail.editor);
      setShowImageDialog(true);
    };

    window.addEventListener(
      "showImageUrlDialog",
      handleImageUrlDialog as EventListener
    );

    return () => {
      window.removeEventListener(
        "showImageUrlDialog",
        handleImageUrlDialog as EventListener
      );
    };
  }, []);

  const handleImageInsert = () => {
    if (!imageUrl.trim() || !editorInstance || !imageRange) {
      return;
    }

    editorInstance
      .chain()
      .focus()
      .deleteRange(imageRange)
      .setImage({
        src: imageUrl.trim(),
        alt: imageAlt || "Image",
        title: imageAlt || "Image",
      })
      .run();

    // Reset dialog state
    setShowImageDialog(false);
    setImageUrl("");
    setImageAlt("");
    setImageRange(null);
  };

  const handleDialogClose = () => {
    setShowImageDialog(false);
    setImageUrl("");
    setImageAlt("");
    setImageRange(null);
  };

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();
      const html = editor.getHTML();
      setCharsCount(editor.storage.characterCount.words());

      if (!initialValue) {
        window.localStorage.setItem(
          `novel-content-${contentname}`,
          JSON.stringify(json)
        );
      }

      setSaveStatus("Saved");
      if (onChange) {
        onChange(html);
      }
    },
    500
  );

  return (
    <>
      <Card className={cn("w-auto min-h-96 min-w-[350px]", className)}>
        <CardHeader className="flex flex-row justify-between items-center border-b p-3 rounded-t-xl">
          <CardTitle>{title}</CardTitle>
          <CardDescription className="flex flex-row gap-2">
            <Badge
              variant={"outline"}
              className={charsCount ? "items-baseline gap-1.5" : "hidden"}
            >
              <span className="text-[0.625rem] font-medium text-emerald-500">
                {charsCount}
              </span>
              Words
            </Badge>
            <Badge variant="outline" className="gap-1.5">
              <span
                className={`size-1.5 rounded-full ${saveStatus === "Saved" ? "bg-emerald-500" : "bg-red-500"
                  }`}
                aria-hidden="true"
              ></span>
              {saveStatus}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditorRoot>
            <EditorContent
              key={`${contentname}`}
              initialContent={initialContent}
              extensions={extensions}
              className="relative min-h-96"
              editorProps={{
                handleDOMEvents: {
                  keydown: (_view, event) => handleCommandNavigation(event),
                },
                handlePaste: (view, event) =>
                  handleImagePaste(view, event, uploadFn),
                handleDrop: (view, event, _slice, moved) =>
                  handleImageDrop(view, event, moved, uploadFn),
                attributes: {
                  class:
                    "prose dark:prose-invert prose-headings:font-title min-h-96 font-default focus:outline-none max-w-full",
                },
              }}
              onCreate={({ editor }) => {
                setEditorInstance(editor);
              }}
              onUpdate={({ editor }) => {
                debouncedUpdates(editor);
                setSaveStatus("Unsaved");
              }}
              slotAfter={<ImageResizer />}
            >
              <EditorCommand className="z-[2000] h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
                <EditorCommandEmpty className="px-2 text-muted-foreground">
                  No results
                </EditorCommandEmpty>
                <EditorCommandList className="z-50">
                  {suggestionItems.map((item) => (
                    <EditorCommandItem
                      value={item.title}
                      onCommand={(val) => item.command?.(val)}
                      className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                      key={item.title}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </EditorCommandItem>
                  ))}
                </EditorCommandList>
              </EditorCommand>

              <EditorMenu open={openAI} onOpenChange={setOpenAI}>
                <Separator orientation="vertical" />
                <NodeSelector open={openNode} onOpenChange={setOpenNode} />
                <Separator orientation="vertical" />
                <LinkSelector open={openLink} onOpenChange={setOpenLink} />
                <Separator orientation="vertical" />
                <MathSelector />
                <Separator orientation="vertical" />
                <TextAlignmentButtons />
                <Separator orientation="vertical" />
                <TextButtons />
                <Separator orientation="vertical" />
                <ColorSelector open={openColor} onOpenChange={setOpenColor} />
              </EditorMenu>
            </EditorContent>
          </EditorRoot>
        </CardContent>
      </Card>

      {/* Image URL Dialog */}
      <Dialog open={showImageDialog} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Insert Image from URL</DialogTitle>
            <DialogDescription>
              Enter the URL of the image you want to insert.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="image-url">Image URL</Label>
              <Input
                id="image-url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && imageUrl.trim()) {
                    handleImageInsert();
                  }
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image-alt">Alt Text (Optional)</Label>
              <Input
                id="image-alt"
                placeholder="Describe the image..."
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleDialogClose}>
              Cancel
            </Button>
            <Button onClick={handleImageInsert} disabled={!imageUrl.trim()}>
              Insert Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
