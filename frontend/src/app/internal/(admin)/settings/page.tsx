"use client";

import { useState } from "react";
import styles from "./Settings.module.css";
import { useRBACGuard } from "@/hooks/useRBACGuard";
import { useAuth } from "@/context/AuthContext";
import api from "@/utils/axios";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsPage() {
  const { isAllowed, isLoading } = useRBACGuard();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<"security" | "users">("security");

  // Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdError, setPwdError] = useState("");
  const [pwdSuccess, setPwdSuccess] = useState("");

  // Create User State
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    employee_id: "",
    email: "",
    password: "",
    role: "sales",
  });
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState("");
  const [userSuccess, setUserSuccess] = useState("");

  if (isLoading || !isAllowed) return null;

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError("");
    setPwdSuccess("");

    if (newPassword !== confirmPassword) {
      setPwdError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setPwdError("Password must be at least 6 characters.");
      return;
    }

    try {
      setPwdLoading(true);
      await api.post("/auth/change-password", {
        current_password: currentPassword,
        new_password: newPassword,
      });
      setPwdSuccess("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPwdError(err.response?.data?.detail || "Failed to change password.");
    } finally {
      setPwdLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserError("");
    setUserSuccess("");

    try {
      setUserLoading(true);
      await api.post("/users", formData);
      setUserSuccess("User created successfully.");
      setFormData({
        first_name: "",
        last_name: "",
        employee_id: "",
        email: "",
        password: "",
        role: "sales",
      });
    } catch (err: any) {
      setUserError(err.response?.data?.detail || "Failed to create user.");
    } finally {
      setUserLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>
          Manage your account and system preferences
        </p>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "security" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("security")}
        >
          Security
        </button>
        {user?.role === "manager" && (
          <button
            className={`${styles.tab} ${activeTab === "users" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("users")}
          >
            User Management
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "security" && (
          <motion.div
            key="security"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={styles.card}
          >
            <div className={styles.cardHeader}>
              <h3>Change Password</h3>
              <span>Ensure your account is using a long, random password to stay secure.</span>
            </div>

            <form onSubmit={handlePasswordChange} className={styles.formColumn}>
              <div className={styles.formGroup}>
                <label>Current Password</label>
                <input
                  type="password"
                  className={styles.input}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>New Password</label>
                  <input
                    type="password"
                    className={styles.input}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className={styles.input}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {pwdError && <p className={styles.errorMsg}>{pwdError}</p>}
              {pwdSuccess && <p className={styles.successMsg}>{pwdSuccess}</p>}

              <div>
                <button type="submit" className={styles.primaryBtn} disabled={pwdLoading}>
                  {pwdLoading ? "Saving..." : "Save Password"}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {activeTab === "users" && user?.role === "manager" && (
          <motion.div
            key="users"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={styles.card}
          >
            <div className={styles.cardHeader}>
              <h3>Create New User</h3>
              <span>Add a new employee to the system and assign their role.</span>
            </div>

            <form onSubmit={handleCreateUser} className={styles.formColumn}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>First Name</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Last Name</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  />
                </div>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Employee ID</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={formData.employee_id}
                    onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Email Address</label>
                  <input
                    type="email"
                    className={styles.input}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Role</label>
                  <select
                    className={styles.select}
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                  >
                    <option value="manager">Manager</option>
                    <option value="hr">HR</option>
                    <option value="marketing">Marketing</option>
                    <option value="analyst">Analyst</option>
                    <option value="sales">Sales</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Initial Password</label>
                  <input
                    type="password"
                    className={styles.input}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              {userError && <p className={styles.errorMsg}>{userError}</p>}
              {userSuccess && <p className={styles.successMsg}>{userSuccess}</p>}

              <div>
                <button type="submit" className={styles.primaryBtn} disabled={userLoading}>
                  {userLoading ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}