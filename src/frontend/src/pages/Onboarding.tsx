import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, FileText, Loader2, MapPin, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useRegisterUser } from "../hooks/use-backend";
import { INDIAN_CITIES } from "../types";

const STEP_LABELS = ["Pick City", "Your Name", "Your Bio"];

export default function Onboarding() {
  const navigate = useNavigate();
  const { mutateAsync: register, isPending } = useRegisterUser();

  const [step, setStep] = useState(0);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  async function handleFinish() {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    try {
      await register({
        name: name.trim(),
        bio: bio.trim(),
        city,
        district: district.trim() || city,
      });
      toast.success("Welcome to ApanStar! 🌟");
      navigate({ to: "/" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  function handleNext() {
    if (step === 0 && !city) {
      toast.error("Please select your city");
      return;
    }
    if (step === 1 && !name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    setStep((s) => s + 1);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center gap-3 pt-10 pb-6 px-4">
        <img
          src="/assets/generated/apanstar-logo-transparent.dim_200x200.png"
          alt="ApanStar"
          className="w-12 h-12"
        />
        <span
          className="font-display font-extrabold text-3xl"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.72 0.22 65), oklch(0.68 0.25 20))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ApanStar
        </span>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 px-6 mb-8">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-smooth ${
                  i < step
                    ? "bg-primary text-primary-foreground"
                    : i === step
                      ? "bg-primary/20 border-2 border-primary text-primary"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span
                className={`text-[10px] font-medium hidden sm:block ${i === step ? "text-primary" : "text-muted-foreground"}`}
              >
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div
                className={`w-8 h-0.5 mb-3 rounded transition-smooth ${i < step ? "bg-primary" : "bg-border"}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Steps */}
      <div className="flex-1 px-4 max-w-md mx-auto w-full">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Step 0: City */}
          {step === 0 && (
            <div className="space-y-5">
              <div className="text-center space-y-1">
                <MapPin className="w-10 h-10 text-primary mx-auto mb-2 animate-float" />
                <h2 className="font-display font-bold text-2xl text-foreground">
                  Where are you from?
                </h2>
                <p className="text-muted-foreground text-sm">
                  We'll show you creators from your area
                </p>
              </div>

              <div className="space-y-2">
                <Label>Select City *</Label>
                <div
                  className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto scrollbar-hide pr-1"
                  data-ocid="city-grid"
                >
                  {INDIAN_CITIES.map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setCity(c)}
                      className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-smooth text-left ${
                        city === c
                          ? "bg-primary/20 border-primary text-primary font-bold"
                          : "bg-card border-border text-foreground hover:border-primary/50"
                      }`}
                      data-ocid={`city-option-${c.toLowerCase()}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="district">District (optional)</Label>
                <Input
                  id="district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g., Andheri, Bandra..."
                  className="bg-card border-border"
                  data-ocid="district-input"
                />
              </div>
            </div>
          )}

          {/* Step 1: Name */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="text-center space-y-1">
                <User className="w-10 h-10 text-primary mx-auto mb-2 animate-float" />
                <h2 className="font-display font-bold text-2xl text-foreground">
                  What's your name?
                </h2>
                <p className="text-muted-foreground text-sm">
                  This is how other creators will know you
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="creator-name">Creator Name *</Label>
                <Input
                  id="creator-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Rohan_DanceStar"
                  maxLength={40}
                  className="bg-card border-border text-lg h-12"
                  autoFocus
                  data-ocid="name-input"
                />
                <p className="text-xs text-muted-foreground text-right">
                  {name.length}/40
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Bio */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="text-center space-y-1">
                <FileText className="w-10 h-10 text-primary mx-auto mb-2 animate-float" />
                <h2 className="font-display font-bold text-2xl text-foreground">
                  Tell your story
                </h2>
                <p className="text-muted-foreground text-sm">
                  Let people know what you're about
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio (optional)</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="e.g., Local dance champion from Mumbai 💃 | Weekly challenge winner..."
                  maxLength={160}
                  rows={4}
                  className="bg-card border-border resize-none"
                  data-ocid="bio-input"
                />
                <p className="text-xs text-muted-foreground text-right">
                  {bio.length}/160
                </p>
              </div>

              {/* Preview */}
              <div className="card-elevated rounded-2xl p-4 space-y-2">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  Preview
                </p>
                <p className="font-display font-bold text-foreground">
                  {name || "Your Name"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {city}
                  {district ? `, ${district}` : ""}
                </p>
                {bio && <p className="text-sm text-foreground">{bio}</p>}
              </div>
            </div>
          )}
        </motion.div>

        {/* CTA */}
        <div className="mt-8 pb-10">
          {step < 2 ? (
            <Button
              onClick={handleNext}
              className="w-full h-12 font-bold text-base gap-2"
              data-ocid="onboarding-next"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleFinish}
              disabled={isPending}
              className="w-full h-12 font-bold text-base gap-2"
              data-ocid="onboarding-finish"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.22 65), oklch(0.68 0.25 20))",
              }}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Joining...
                </>
              ) : (
                <>
                  Join ApanStar <span>🌟</span>
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
