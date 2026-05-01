"use client";

import { useState, useEffect } from "react";
import styles from "./Projects.module.css";
import api from "@/utils/axios";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

type SubStep = {
  id: number;
  name: string;
  is_completed: boolean;
};

type Checkpoint = {
  id: number;
  name: string;
  order: number;
  is_completed: boolean;
  sub_steps: SubStep[];
};

type Project = {
  id: number;
  client_name: string;
  line: string;
  material: string;
  location: string;
  progress: number;
  checkpoints: Checkpoint[];
  owner_name?: string;
  owner_id: number;
};

export default function ProjectsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("lifecycle");
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    client_name: "",
    line: "",
    material: "",
    location: "",
  });

  useEffect(() => {
    fetchProjects();
  }, [activeTab]);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/projects", formData);
      setFormData({ client_name: "", line: "", material: "", location: "" });
      setActiveTab("lifecycle");
    } catch (err) {
      alert("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (projectId: number, val: number) => {
    try {
      await api.patch(`/projects/${projectId}`, { progress: val });
      setProjects(projects.map(p => p.id === projectId ? { ...p, progress: val } : p));
      if (selectedProject?.id === projectId) {
        setSelectedProject({ ...selectedProject, progress: val });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleCheckpoint = async (cp: Checkpoint) => {
    try {
      await api.patch(`/projects/checkpoints/${cp.id}`, { is_completed: !cp.is_completed });
      fetchProjects();
      if (selectedProject) {
        const updatedCps = selectedProject.checkpoints.map(c => 
          c.id === cp.id ? { ...c, is_completed: !cp.is_completed } : c
        );
        setSelectedProject({ ...selectedProject, checkpoints: updatedCps });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [newSubStep, setNewSubStep] = useState("");
  const addSubStep = async (checkpointId: number) => {
    if (!newSubStep) return;
    try {
      await api.post(`/projects/checkpoints/${checkpointId}/substeps`, { name: newSubStep });
      setNewSubStep("");
      const res = await api.get("/projects");
      const updated = res.data.find((p: Project) => p.id === selectedProject?.id);
      if (updated) setSelectedProject(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const renderCreateTab = () => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.card}
    >
      <div className={styles.cardHeader}>
        <h2>Start New Project</h2>
        <p>Enter the initial project details to begin the lifecycle tracking.</p>
      </div>

      <form className={styles.formGrid} onSubmit={handleCreateProject}>
        <div className={styles.formGroup}>
          <label>Client Name</label>
          <input 
            className={styles.input}
            required 
            value={formData.client_name}
            onChange={e => setFormData({...formData, client_name: e.target.value})}
            placeholder="e.g. Tata Motors" 
          />
        </div>
        <div className={styles.formGroup}>
          <label>Line</label>
          <input 
            className={styles.input}
            required 
            value={formData.line}
            onChange={e => setFormData({...formData, line: e.target.value})}
            placeholder="e.g. Assembly Line A" 
          />
        </div>
        <div className={styles.formGroup}>
          <label>Material</label>
          <input 
            className={styles.input}
            required 
            value={formData.material}
            onChange={e => setFormData({...formData, material: e.target.value})}
            placeholder="e.g. Stainless Steel" 
          />
        </div>
        <div className={styles.formGroup}>
          <label>Location</label>
          <input 
            className={styles.input}
            required 
            value={formData.location}
            onChange={e => setFormData({...formData, location: e.target.value})}
            placeholder="e.g. Pune, Maharashtra" 
          />
        </div>
        <div style={{ gridColumn: "span 2" }}>
           <button type="submit" className={styles.primaryBtn} disabled={loading} style={{ width: "100%" }}>
            {loading ? "Initializing..." : "Create Project & Start Tracking"}
          </button>
        </div>
      </form>
    </motion.div>
  );

  const renderLifecycleTab = () => {
    if (selectedProject) {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className={styles.card}
        >
          <button className={styles.backBtn} onClick={() => setSelectedProject(null)}>
            ← Back to All Projects
          </button>
          
          <div className={styles.cardHeader}>
            <h2>{selectedProject.client_name}</h2>
            <p>{selectedProject.line} • {selectedProject.location}</p>
          </div>

          <div className={styles.progressBarContainer}>
            <div className={styles.progressBarLabel}>
              <span>Manual Progress Update</span>
              <span style={{ color: "var(--admin-accent)" }}>{selectedProject.progress}%</span>
            </div>
            <input 
              type="range" 
              className={styles.slider} 
              min="0" max="100" 
              value={selectedProject.progress}
              onChange={(e) => updateProgress(selectedProject.id, parseInt(e.target.value))}
            />
          </div>

          <div className={styles.checkpoints}>
            {selectedProject.checkpoints.map((cp) => (
              <div 
                key={cp.id} 
                className={`${styles.checkpoint} ${cp.is_completed ? styles.activeCp : ""}`}
                onClick={() => toggleCheckpoint(cp)}
                style={{ cursor: "pointer" }}
              >
                <div className={`${styles.dot} ${cp.is_completed ? styles.completedDot : ""}`}>
                  {cp.is_completed ? "✓" : cp.order}
                </div>
                <div className={styles.cpName}>{cp.name}</div>
              </div>
            ))}
          </div>

          <div className={styles.substepsSection}>
            <div className={styles.cardHeader} style={{ marginBottom: "16px" }}>
              <h2>Milestone Sub-tasks</h2>
              <p>Add specific tasks for each stage to track granular progress.</p>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              {selectedProject.checkpoints.map(cp => (
                <div key={cp.id} style={{ opacity: cp.is_completed ? 0.6 : 1 }}>
                  <h4 style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", fontSize: "14px", fontWeight: 700, color: "var(--admin-text-primary)" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: cp.is_completed ? "#10b981" : "var(--admin-accent)" }}></div>
                    {cp.name}
                  </h4>
                  <div className={styles.substepList}>
                    {cp.sub_steps?.map(sub => (
                      <div key={sub.id} className={styles.substepItem}>
                        <input type="checkbox" checked={sub.is_completed} readOnly />
                        <span>{sub.name}</span>
                      </div>
                    ))}
                    <div className={styles.addSubstep}>
                      <input 
                        className={styles.input}
                        style={{ padding: "8px 12px" }}
                        placeholder="Add sub-task..." 
                        value={cp.id === (window as any).activeCpId ? newSubStep : ""}
                        onChange={(e) => {
                          setNewSubStep(e.target.value);
                          (window as any).activeCpId = cp.id;
                        }}
                        onKeyPress={(e) => e.key === "Enter" && addSubStep(cp.id)}
                      />
                      <button 
                        onClick={() => addSubStep(cp.id)} 
                        className={styles.primaryBtn}
                        style={{ margin: 0, padding: "0 12px" }}
                      >+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <div className={styles.projectGrid}>
        {projects.map((p) => (
          <motion.div 
            key={p.id} 
            whileHover={{ y: -4 }}
            className={styles.projectCard} 
            onClick={() => setSelectedProject(p)}
          >
            <div className={styles.projectInfo}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <h3>{p.client_name}</h3>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--admin-accent)", background: "var(--admin-accent-soft)", padding: "2px 6px", borderRadius: "4px" }}>
                  ACTIVE
                </span>
              </div>
              <div className={styles.projectMeta}>
                <span><strong>Line:</strong> {p.line}</span>
                <span><strong>Location:</strong> {p.location}</span>
                <span><strong>Material:</strong> {p.material}</span>
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "6px", fontWeight: 600 }}>
                <span>Progress</span>
                <span>{p.progress}%</span>
              </div>
              <div style={{ width: "100%", height: "6px", background: "#f1f5f9", borderRadius: "3px" }}>
                <div style={{ width: `${p.progress}%`, height: "100%", background: "var(--admin-accent)", borderRadius: "3px", transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)" }}></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderManagementTab = () => {
    const grouped: Record<string, Project[]> = {};
    projects.forEach(p => {
      const name = p.owner_name || "Unknown";
      if (!grouped[name]) grouped[name] = [];
      grouped[name].push(p);
    });

    return (
      <div className={styles.container}>
        {Object.entries(grouped).map(([name, employeeProjects]) => (
          <div key={name} className={styles.employeeGroup}>
            <div className={styles.employeeHeader}>
              <span style={{ fontWeight: 600, color: "var(--admin-text-primary)" }}>{name}</span>
              <span style={{ fontSize: "13px", color: "var(--admin-text-secondary)" }}>{employeeProjects.length} Active Projects</span>
            </div>
            <div className={styles.employeeProjects}>
               {employeeProjects.map(p => (
                 <div key={p.id} className={styles.projectCard} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px" }}>
                   <div>
                     <div style={{ fontWeight: 600, fontSize: "15px" }}>{p.client_name}</div>
                     <div style={{ fontSize: "12px", color: "var(--admin-text-secondary)" }}>{p.line} | {p.location}</div>
                   </div>
                   <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "18px", fontWeight: 800, color: "var(--admin-accent)" }}>{p.progress}%</div>
                      <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--admin-text-secondary)", textTransform: "uppercase" }}>Completion</div>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Project Management</h1>
        <p className={styles.subtitle}>Track and manage employee project lifecycles</p>
      </div>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === "lifecycle" ? styles.tabActive : ""}`}
          onClick={() => { setActiveTab("lifecycle"); setSelectedProject(null); }}
        >
          Project Life Cycle
        </button>
        <button 
          className={`${styles.tab} ${activeTab === "create" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("create")}
        >
          Create New Project
        </button>
        {user?.role === "manager" && (
          <button 
            className={`${styles.tab} ${activeTab === "management" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("management")}
          >
            Management Overview
          </button>
        )}
      </div>

      <div className={styles.content}>
        <AnimatePresence mode="wait">
          {activeTab === "create" && renderCreateTab()}
          {activeTab === "lifecycle" && renderLifecycleTab()}
          {activeTab === "management" && renderManagementTab()}
        </AnimatePresence>
      </div>
    </div>
  );
}
