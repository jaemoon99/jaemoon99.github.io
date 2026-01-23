"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import { vscDarkPlus, oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

// ✅ 타입 충돌/Prism export 이슈를 피하려고 "react-syntax-highlighter"에서 직접 Prism을 가져옴
// ✅ SSR 완전 차단 + 첫 렌더는 null(loading)로 처리 → hydration mismatch 방지
const PrismSyntaxHighlighter = dynamic(
    async () => {
        const mod = await import("react-syntax-highlighter");
        return mod.Prism;
    },
    {
        ssr: false,
        loading: () => null,
    }
);

type PrismProps = ComponentProps<typeof PrismSyntaxHighlighter>;

type Props = {
    code: string;
    language?: string;
    theme?: "dark" | "light";
    showLineNumbers?: boolean;
    wrapLines?: boolean;
    customStyle?: PrismProps["customStyle"];
};

export default function CodeBlock({
    code,
    language = "tsx",
    theme = "light",
    showLineNumbers = true,
    wrapLines,
    customStyle,
}: Props) {
    const style = theme === "dark" ? vscDarkPlus : oneLight;

    return (
        <PrismSyntaxHighlighter
        language={language}
        style={style as any}
        showLineNumbers={showLineNumbers}
        wrapLines={wrapLines}
        customStyle={customStyle}
        >
        {code}
        </PrismSyntaxHighlighter>
    );
}