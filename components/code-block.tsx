"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import {
  vscDarkPlus,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

const PrismSyntaxHighlighter = dynamic(
  async () => {
    const mod = await import("react-syntax-highlighter");
    return mod.Prism;
  },
  { ssr: false, loading: () => null },
);

type PrismProps = ComponentProps<typeof PrismSyntaxHighlighter>;

type Props = {
  code: string;
  language?: string;
  theme?: "dark" | "light";
  showLineNumbers?: boolean;
  customStyle?: PrismProps["customStyle"];
};

export default function CodeBlock({
  code,
  language = "tsx",
  theme = "light",
  showLineNumbers = true,
  customStyle,
}: Props) {
  const style = theme === "dark" ? vscDarkPlus : oneLight;

  return (
    <PrismSyntaxHighlighter
      className="codeblock"
      language={language}
      style={style as any}
      showLineNumbers={showLineNumbers}
      customStyle={{
        margin: 0,
        background: "transparent",
        border: "none",
        padding: 0,
        ...customStyle,
      }}
    >
      {code}
    </PrismSyntaxHighlighter>
  );
}
