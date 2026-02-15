import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const emailSchema = z.string().email("auth.validation.email");
const passwordSchema = z.string().min(6, "auth.validation.password");

const Auth = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup"
    ? "signup"
    : searchParams.get("mode") === "reset"
      ? "updatePassword"
      : "login";

  const [mode, setMode] = useState<"login" | "signup" | "forgot" | "updatePassword">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const { signIn, signUp, resetPassword, user } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && mode !== "updatePassword") {
      navigate("/");
    }
  }, [user, navigate, mode]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (mode !== "updatePassword") {
      const emailResult = emailSchema.safeParse(email);
      if (!emailResult.success) {
        newErrors.email = t(emailResult.error.errors[0].message);
      }
    }

    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      newErrors.password = t(passwordResult.error.errors[0].message);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrors({ email: t("auth.validation.email_required") });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await resetPassword(email);
      if (error) {
        toast({
          title: t("auth.toast.reset_failed"),
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: t("auth.toast.reset_sent.title"),
          description: t("auth.toast.reset_sent.description"),
        });
        setMode("login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      setErrors({ password: t(passwordResult.error.errors[0].message) });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        toast({
          title: t("auth.toast.update_failed"),
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: t("auth.toast.update_success.title"),
          description: t("auth.toast.update_success.description"),
        });
        navigate("/");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "forgot") {
      return handleForgotPassword(e);
    }

    if (mode === "updatePassword") {
      return handleUpdatePassword(e);
    }

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (mode === "login") {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: t("auth.toast.login_failed"),
            description: error.message === "Invalid login credentials"
              ? t("auth.error.invalid_login")
              : error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: t("auth.toast.login_welcome.title"),
            description: t("auth.toast.login_welcome.description"),
          });
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: t("auth.toast.account_exists"),
              description: t("auth.error.email_registered"),
              variant: "destructive",
            });
          } else {
            toast({
              title: t("auth.toast.signup_failed"),
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: t("auth.toast.signup_success.title"),
            description: t("auth.toast.signup_success.description"),
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-background min-h-[calc(100vh-200px)] flex items-center">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
          >
            <div className="text-center mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-serif mb-2"
              >
                {mode === "login"
                  ? t("auth.login.title")
                  : mode === "signup"
                    ? t("auth.signup.title")
                    : mode === "forgot"
                      ? t("auth.forgot.title")
                      : t("auth.update.title")}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground"
              >
                {mode === "login"
                  ? t("auth.login.description")
                  : mode === "signup"
                    ? t("auth.signup.description")
                    : mode === "forgot"
                      ? t("auth.forgot.description")
                      : t("auth.update.description")}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl p-8 border border-border shadow-sm"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-2"
                  >
                    <Label htmlFor="fullName">{t("auth.fullName")}</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder={t("auth.fullNamePlaceholder")}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-12"
                    />
                  </motion.div>
                )}

                {mode !== "updatePassword" && (
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("auth.email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("auth.placeholder.email")}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={`h-12 ${errors.email ? "border-destructive" : ""}`}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>
                )}

                {(mode === "login" || mode === "signup" || mode === "updatePassword") && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">{t("auth.password")}</Label>
                      {mode === "login" && (
                        <button
                          type="button"
                          onClick={() => setMode("forgot")}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {t("auth.forgotPassword")}
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errors.password) setErrors({ ...errors, password: undefined });
                        }}
                        className={`h-12 pr-10 ${errors.password ? "border-destructive" : ""}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-destructive">{errors.password}</p>
                    )}
                  </div>
                )}

                <Button
                  variant="hero"
                  className="w-full h-12 group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    t("auth.wait")
                  ) : (
                    <>
                      {mode === "login"
                        ? t("auth.logIn")
                        : mode === "signup"
                          ? t("auth.createAccount")
                          : mode === "forgot"
                            ? t("auth.sendReset")
                            : t("auth.update.title")}
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {mode === "login"
                    ? t("auth.noAccount")
                    : mode === "signup"
                      ? t("auth.haveAccount")
                      : t("auth.rememberPassword")}
                  <button
                    type="button"
                    onClick={() => setMode(mode === "login" ? "signup" : "login")}
                    className="text-foreground font-medium hover:underline"
                  >
                    {mode === "login" ? t("auth.signUp") : t("auth.logIn")}
                  </button>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Auth;

