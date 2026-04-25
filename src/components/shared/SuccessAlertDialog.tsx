import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface AlertDialogProps {
    title: string;
    description: string;
    actionText: string;
    onAction: () => void;
    icon?: React.ReactNode;
    open: boolean;
}

export default function SuccessAlertDialog({ title, description, actionText, onAction, icon, open }: AlertDialogProps) {
    return (
        <AlertDialog open={open}>
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia>
                        {icon}
                    </AlertDialogMedia>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex w-full">
                    <AlertDialogAction className="w-full" onClick={onAction}>{actionText}</AlertDialogAction>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}