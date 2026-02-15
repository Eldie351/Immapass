import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
    const { t } = useLanguage();
    return (
        <Layout>
            <div className="container mx-auto py-20">
                <h1 className="text-3xl font-bold">{t("notfound.title")}</h1>
                <p className="mt-4 text-muted-foreground">{t("notfound.description")}</p>
            </div>
        </Layout>
    );
};

export default NotFound;
