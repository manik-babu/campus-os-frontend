interface LoadingButtonProps {
    isLoading: boolean;
    content: string | React.ReactNode;
    loadingContent: string | React.ReactNode;
    type?: "button" | "submit" | "reset";
    style?: "btn-primary" | "btn-secondary" | "btn-ghost";
    className?: string;
}

export default function LoadingButton({ isLoading, type = "submit", style = "btn-primary", content, loadingContent, className }: LoadingButtonProps) {
    return (
        <button type={type} className={`${style} ${className || ''}`} disabled={isLoading}>
            {isLoading ? loadingContent : content}
        </button>
    );
}