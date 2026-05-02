import { cn } from "@/lib/utils";

interface LoadingButtonProps {
    isLoading: boolean;
    content: string | React.ReactNode;
    loadingContent: string | React.ReactNode;
    type?: "button" | "submit" | "reset";
    style?: "btn-primary" | "btn-secondary" | "btn-ghost";
    className?: string;
    onAction?: () => void;
}

export default function LoadingButton({ onAction, isLoading, type = "submit", style = "btn-primary", content, loadingContent, className }: LoadingButtonProps) {
    return (
        <button onClick={onAction || (() => { })} type={type} className={cn(style, className, "cursor-pointer")} disabled={isLoading}>
            {isLoading ? loadingContent : content}
        </button>
    );
}