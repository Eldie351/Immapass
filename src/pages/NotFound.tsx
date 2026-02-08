import { Layout } from "@/components/layout/Layout";

const NotFound = () => (
    <Layout>
        <div className="container mx-auto py-20">
            <h1 className="text-3xl font-bold">404 — Not Found</h1>
            <p className="mt-4 text-muted-foreground">The page you requested could not be found.</p>
        </div>
    </Layout>
);

export default NotFound;
