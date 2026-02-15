import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Trash2, User, Mail, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const Settings = () => {
    const { user, deleteAccount } = useAuth();
    const { toast } = useToast();
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [confirmText, setConfirmText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate("/auth");
        }
    }, [user, navigate]);

    const handleDeleteAccount = async () => {
        if (confirmText !== "DELETE") {
            toast({
                title: t("settings.toast.confirm_required.title"),
                description: t("settings.toast.confirm_required.description"),
                variant: "destructive",
            });
            return;
        }

        setIsDeleting(true);
        try {
            const { error } = await deleteAccount();

            if (error) {
                toast({
                    title: "Error",
                    description: error.message || "Failed to delete account. Please try again.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: t("settings.toast.delete_success.title"),
                    description: t("settings.toast.delete_success.description"),
                });
                navigate("/");
            }
        } catch (err) {
            toast({
                title: "Error",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsDeleting(false);
            setConfirmText("");
        }
    };

    if (!user) {
        return null;
    }

    return (
        <Layout>
            <section className="py-16 md:py-24 bg-background min-h-[calc(100vh-200px)]">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-3xl md:text-4xl font-serif mb-2">{t("settings.title")}</h1>
                        <p className="text-muted-foreground mb-8">
                            {t("settings.subtitle")}
                        </p>

                        {/* Account Information */}
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    {t("settings.info.title")}
                                </CardTitle>
                                <CardDescription>
                                    {t("settings.info.description")}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                                    <Mail className="w-5 h-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">{t("settings.info.email")}</p>
                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                                    <Calendar className="w-5 h-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">{t("settings.info.since")}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Danger Zone */}
                        <Card className="border-destructive/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-destructive">
                                    <Trash2 className="w-5 h-5" />
                                    {t("settings.danger.title")}
                                </CardTitle>
                                <CardDescription>
                                    {t("settings.danger.description")}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                                        <h3 className="font-semibold mb-2">{t("settings.danger.delete.title")}</h3>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            {t("settings.danger.delete.description")}
                                        </p>
                                        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 mb-4">
                                            <li>{t("settings.danger.delete.item1")}</li>
                                            <li>{t("settings.danger.delete.item2")}</li>
                                            <li>{t("settings.danger.delete.item3")}</li>
                                        </ul>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive" className="w-full sm:w-auto">
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    {t("settings.danger.delete.title")}
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>{t("settings.danger.delete.confirm.title")}</AlertDialogTitle>
                                                    <AlertDialogDescription className="space-y-4">
                                                        <p>
                                                            {t("settings.danger.delete.confirm.description")}
                                                        </p>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="confirm-delete">
                                                                {t("settings.danger.delete.confirm.instruction").split('DELETE')[0]}<span className="font-bold">DELETE</span>{t("settings.danger.delete.confirm.instruction").split('DELETE')[1]}
                                                            </Label>
                                                            <Input
                                                                id="confirm-delete"
                                                                value={confirmText}
                                                                onChange={(e) => setConfirmText(e.target.value)}
                                                                placeholder={t("settings.danger.delete.confirm.placeholder")}
                                                                className="font-mono"
                                                            />
                                                        </div>
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel onClick={() => setConfirmText("")}>
                                                        {t("settings.danger.delete.confirm.cancel")}
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={handleDeleteAccount}
                                                        disabled={confirmText !== "DELETE" || isDeleting}
                                                        className="bg-destructive hover:bg-destructive/90"
                                                    >
                                                        {isDeleting ? t("settings.danger.delete.confirm.deleting") : t("settings.danger.delete.confirm.action")}
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
};

export default Settings;
