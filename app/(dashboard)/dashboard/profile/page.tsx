"use client";

// ... imports
import { useState } from "react";
import Image from "next/image";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Pencil,
  Eye,
  EyeOff,
  Lock,
  AlertCircle,
  Trash2,
  Globe,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
// ...
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Inline Switch Component for simplicity
function Switch({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-green-600" : "bg-gray-200"
      )}
    >
      <span
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
}

export default function ProfileSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  
  // Password State
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    old: "",
    new: "",
    confirm: "",
  });

  // Preferences State
  const [inAppNotif, setInAppNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  const passwordsMatch =
    !passwordForm.confirm || passwordForm.new === passwordForm.confirm;

  return (
    <div className="space-y-8 pb-12 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile & Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage your personal info, professional details, and account
          preferences.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-100 pb-1 overflow-x-auto">
        {[
          { id: "general", label: "General settings" },
          { id: "password", label: "Change password" },
          { id: "preferences", label: "Preferences & Notifications" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap",
              activeTab === tab.id
                ? "text-green-700 bg-green-50"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* --- General Settings Tab --- */}
      {activeTab === "general" && (
        <div className="space-y-8">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-pink-300 overflow-hidden relative border-4 border-white shadow-sm flex items-center justify-center">
              <Image
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <Button
              variant="outline"
              className="text-gray-700 border-gray-200 h-10 px-4 rounded-lg bg-white"
            >
              Change picture
            </Button>
          </div>

          {/* Personal Information */}
          <div className="bg-gray-50/50 rounded-xl p-8 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-gray-900">
                Personal Information
              </h3>
              <button className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-gray-900">
                <Pencil className="w-4 h-4" />
                Edit
              </button>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-900 stroke-[1.5]" />
                <span className="text-sm text-gray-900 font-medium">
                  Robert Sam
                </span>
              </div>

              <div className="flex items-center justify-between max-w-md">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-900 stroke-[1.5]" />
                  <span className="text-sm text-gray-900 font-medium">
                    +233536845216
                  </span>
                </div>
                <span className="text-xs font-medium text-green-600">
                  Verified
                </span>
              </div>

              <div className="flex items-center justify-between max-w-md">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-900 stroke-[1.5]" />
                  <span className="text-sm text-gray-900 font-medium">
                    robert.sam@example.com
                  </span>
                </div>
                <span className="text-xs font-medium text-green-600">
                  Verified
                </span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-900 stroke-[1.5]" />
                <span className="text-sm text-gray-900 font-medium">
                  Takoradi,Ama Akroma RD
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Change Password Tab --- */}
      {activeTab === "password" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-900">
                Old password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type={showOldPassword ? "text" : "password"}
                  placeholder="**********"
                  className="pl-10 pr-12 bg-white"
                  value={passwordForm.old}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, old: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-green-700 hover:underline"
                >
                  {showOldPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-900">
                New password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="**********"
                  className="pl-10 pr-12 bg-white"
                  value={passwordForm.new}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, new: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-green-700 hover:underline"
                >
                  {showNewPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-900">
                Confirm new password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="**********"
                  className={cn(
                    "pl-10 pr-12 bg-white",
                    !passwordsMatch && "border-red-300 focus-visible:ring-red-500"
                  )}
                  value={passwordForm.confirm}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirm: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-green-700 hover:underline"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
                {!passwordsMatch && (
                  <div className="absolute right-12 top-1/2 -translate-y-1/2 pr-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  </div>
                )}
              </div>
              {!passwordsMatch && (
                <p className="text-xs text-red-500 mt-1">
                  Passwords do not match.
                </p>
              )}
            </div>

            <Button className="bg-[#15803d] hover:bg-[#14532d] text-white font-medium rounded-lg">
              Update password
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-[10px] font-serif text-gray-500">
                i
              </span>
              Security tips
            </h3>
            <div className="bg-gray-50/50 rounded-xl p-6 space-y-3">
              {[
                "At least 8 characters",
                "One uppercase & one lowercase letter",
                "At least one number",
                "At least one special character (!, #, $, %)",
              ].map((tip) => (
                <div key={tip} className="flex items-center gap-3">
                  <div className="w-4 h-4 border border-green-600 rounded flex items-center justify-center bg-white">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- Preferences & Notifications Tab --- */}
      {activeTab === "preferences" && (
        <div className="space-y-10 pt-4">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-medium text-gray-700">
                In-app Notifications
              </h3>
              <Switch checked={inAppNotif} onCheckedChange={setInAppNotif} />
            </div>
            <div className="bg-gray-50/50 rounded-xl p-6">
              <ul className="space-y-3">
                {[
                  "Order updates (New order request, status change, delivery confirmation)",
                  "Messages (New client messages)",
                  "Reviews (When a client leaves feedback)",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-medium text-gray-700">
                Email Notifications
              </h3>
              <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
            </div>
            <div className="bg-gray-50/50 rounded-xl p-6">
              <ul className="space-y-3">
                {[
                  "Daily summary (digest)",
                  "Real-time updates (instant alerts)",
                  "Important account alerts only",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-medium text-gray-700">
                SMS Notifications
              </h3>
              <Switch checked={smsNotif} onCheckedChange={setSmsNotif} />
            </div>
            <div className="bg-gray-50/50 rounded-xl p-6">
              <ul className="space-y-3">
                {[
                  "Critical updates only (Order accepted/declined, payment received)",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4 max-w-md">
            <h3 className="text-sm font-medium text-gray-700">
              Language Preference
            </h3>
            <Select defaultValue="en-gb">
              <SelectTrigger className="bg-white">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <SelectValue placeholder="Select language" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-gb">English-GB</SelectItem>
                <SelectItem value="en-us">English-US</SelectItem>
                <SelectItem value="fr">French</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-red-500 flex items-center gap-2">
              Delete Account <Trash2 className="w-4 h-4" />
            </h3>
            <div className="bg-gray-50/50 rounded-xl p-6">
              <ul className="space-y-3">
                {[
                  "When you delete your account, you lose access to account services, and we permanently delete your personal data.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
