"use client";

import { useState } from "react";
import {
  FileText,
  Plus,
  Trash2,
  Pencil,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// --- Types ---
type DocumentRequirement = {
  id: string;
  name: string;
  required: boolean;
  selected: boolean;
};

// --- Mock Data ---
const initialDocuments: DocumentRequirement[] = [
  { id: "1", name: "Government ID", required: true, selected: true },
  { id: "2", name: "Proof of Address", required: true, selected: false },
  { id: "3", name: "Insurance Certificate", required: true, selected: false },
  { id: "4", name: "Criminal Background Check", required: true, selected: false },
  { id: "5", name: "Insurance Certificate", required: true, selected: false },
  { id: "6", name: "Professional License", required: true, selected: false },
];

export default function SystemSettingsPage() {
  const [activeTab, setActiveTab] = useState("verification");
  
  // Verification State
  const [documents, setDocuments] = useState<DocumentRequirement[]>(initialDocuments);
  const [selectAll, setSelectAll] = useState(false);
  const [isAddDocOpen, setIsAddDocOpen] = useState(false);
  const [newDocName, setNewDocName] = useState("");
  const [autoApprove, setAutoApprove] = useState(true);
  const [expiryReminders, setExpiryReminders] = useState(true);
  const [reminderDays, setReminderDays] = useState("30");

  // Fees State
  const [fees, setFees] = useState({
    globalCommission: "15",
    clientBookingFee: "5",
    seasonalDiscount: "5",
  });

  // Handlers
  const toggleDocumentSelection = (id: string) => {
    setDocuments(docs => 
      docs.map(doc => doc.id === id ? { ...doc, selected: !doc.selected } : doc)
    );
  };

  const toggleDocumentRequired = (id: string) => {
    setDocuments(docs => 
      docs.map(doc => doc.id === id ? { ...doc, required: !doc.required } : doc)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setDocuments(docs => docs.map(doc => ({ ...doc, selected: checked })));
  };

  const handleAddDocument = () => {
    if (!newDocName.trim()) return;
    const newDoc: DocumentRequirement = {
      id: Date.now().toString(),
      name: newDocName,
      required: true,
      selected: false,
    };
    setDocuments([...documents, newDoc]);
    setNewDocName("");
    setIsAddDocOpen(false);
  };

  const handleDeleteSelected = () => {
    setDocuments(docs => docs.filter(doc => !doc.selected));
    setSelectAll(false);
  };

  return (
    <div className="max-w-[1000px] space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        <p className="text-gray-500 mt-1">
          Configure platform-wide controls and operational rules.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab("verification")}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-full transition-colors",
            activeTab === "verification"
              ? "bg-green-50 text-green-700"
              : "text-gray-600 hover:bg-gray-50"
          )}
        >
          Verification & Compliance
        </button>
        <button
          onClick={() => setActiveTab("fees")}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-full transition-colors",
            activeTab === "fees"
              ? "bg-green-50 text-green-700"
              : "text-gray-600 hover:bg-gray-50"
          )}
        >
          Platform Fees & Commissions
        </button>
      </div>

      {/* Content */}
      {activeTab === "verification" && (
        <div className="space-y-8">
          {/* Document Requirements */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">
                Document Requirements
              </h2>
              <button
                onClick={() => setIsAddDocOpen(true)}
                className="flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-800"
              >
                <Plus className="w-4 h-4" />
                Add new document
              </button>
            </div>

            <div className="bg-gray-50/50 rounded-xl p-6">
              {/* Header Row */}
              <div className="flex items-center justify-between mb-4 pl-1">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectAll}
                    onCheckedChange={handleSelectAll}
                    id="select-all"
                    className="border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                  <label htmlFor="select-all" className="text-sm font-medium text-gray-900 cursor-pointer">
                    select all
                  </label>
                </div>
                <button
                  onClick={handleDeleteSelected}
                  className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>

              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={doc.selected}
                        onCheckedChange={() => toggleDocumentSelection(doc.id)}
                        className="border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{doc.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={doc.required}
                        onCheckedChange={() => toggleDocumentRequired(doc.id)}
                        className="data-[state=checked]:bg-green-500"
                      />
                      <span className="text-sm text-gray-500 w-16">required</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Approval Settings */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-gray-900">
              Approval Settings
            </h2>
            <div className="bg-gray-50/50 rounded-xl p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Auto-approve Verification
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Automatically approve when all documents are submitted
                  </p>
                </div>
                <Switch
                  checked={autoApprove}
                  onCheckedChange={setAutoApprove}
                  className="data-[state=checked]:bg-green-500"
                />
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Verification Expiry Reminders
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Send reminders before verification expires
                  </p>
                </div>
                <Switch
                  checked={expiryReminders}
                  onCheckedChange={setExpiryReminders}
                  className="data-[state=checked]:bg-green-500"
                />
              </div>

              <div className="space-y-2 max-w-[200px]">
                <label className="text-sm font-medium text-gray-700">
                  Send reminder (days before expiry)
                </label>
                <Select value={reminderDays} onValueChange={setReminderDays}>
                  <SelectTrigger className="bg-white border-gray-200 w-full h-10 px-3 rounded-md">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="60">60</SelectItem>
                    <SelectItem value="90">90</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "fees" && (
        <div className="space-y-8">
          <div className="border border-gray-100 rounded-xl p-8 bg-white">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-base font-bold text-gray-900">
                  Commission Settings
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Manage platform fees and commission structures
                </p>
              </div>
              <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                <Pencil className="w-4 h-4" />
                Edit
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">
                  Global commission(%)
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    value={fees.globalCommission}
                    onChange={(e) => setFees({ ...fees, globalCommission: e.target.value })}
                    className="bg-white border-gray-200 pr-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col">
                    <ChevronUp className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                    <ChevronDown className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">
                  Client booking fee(%)
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    value={fees.clientBookingFee}
                    onChange={(e) => setFees({ ...fees, clientBookingFee: e.target.value })}
                    className="bg-white border-gray-200 pr-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col">
                    <ChevronUp className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                    <ChevronDown className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">
                  Seasonal discount(%)
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    value={fees.seasonalDiscount}
                    onChange={(e) => setFees({ ...fees, seasonalDiscount: e.target.value })}
                    className="bg-white border-gray-200 pr-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col">
                    <ChevronUp className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                    <ChevronDown className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Document Modal */}
      <Dialog open={isAddDocOpen} onOpenChange={setIsAddDocOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Add new document</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Document name
              </label>
              <Input
                id="name"
                placeholder="e.g. Business certificate"
                value={newDocName}
                onChange={(e) => setNewDocName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDocOpen(false)}
              className="flex-1 border-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddDocument}
              className="flex-1 bg-[#15803d] hover:bg-[#14532d] text-white"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

