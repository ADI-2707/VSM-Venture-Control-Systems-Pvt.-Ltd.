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

  const [subStepInputs, setSubStepInputs] = useState<Record<number, string>>({});

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

  const refreshSelectedProject = async (projectId: number) => {
    try {
      const res = await api.get(`/projects/${projectId}`);
      setSelectedProject(res.data);
      
      setProjects(prev => prev.map(p => p.id === projectId ? res.data : p));
    } catch (err) {
      console.error("Failed to refresh project", err);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/projects", formData);
      setFormData({ client_name: "", line: "", material: "", location: "" });
      setActiveTab("lifecycle");
      fetchProjects();
    } catch (err) {
      alert("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  const toggleCheckpoint = async (cp: Checkpoint) => {
    if (!selectedProject) return;
    try {
      await api.patch(`/projects/checkpoints/${cp.id}`, { is_completed: !cp.is_completed });
      await refreshSelectedProject(selectedProject.id);
    } catch (err: any) {
      if (err.response?.status === 400) {
        alert(err.response.data.detail);
      } else {
        console.error(err);
      }
    }
  };

  const addSubStep = async (checkpointId: number) => {
    if (!selectedProject) return;
    const name = subStepInputs[checkpointId];
    if (!name) return;
    try {
      await api.post(`/projects/checkpoints/${checkpointId}/substeps`, { name });
      setSubStepInputs({ ...subStepInputs, [checkpointId]: "" });
      await refreshSelectedProject(selectedProject.id);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleSubStep = async (sub: SubStep) => {
    if (!selectedProject) return;
    try {
      await api.patch(`/projects/substeps/${sub.id}`, { is_completed: !sub.is_completed });
      await refreshSelectedProject(selectedProject.id);
    } catch (err: any) {
      if (err.response?.status === 400) {
        alert(err.response.data.detail);
      } else {
        console.error(err);
      }
    }
  };

  const deleteSubStep = async (subId: number) => {
    if (!selectedProject) return;
    if (!confirm("Are you sure you want to remove this sub-task?")) return;
    try {
      await api.delete(`/projects/substeps/${subId}`);
      await refreshSelectedProject(selectedProject.id);
    } catch (err) {
      console.error(err);
    }
  };

  const renderTimeline = () => {
    if (!selectedProject) return null;

    const timelineNodes: any[] = [];
    selectedProject.checkpoints.forEach((cp) => {
      timelineNodes.push({ ...cp, type: "checkpoint" });
      if (cp.sub_steps) {
        cp.sub_steps.forEach((sub) => {
          timelineNodes.push({ ...sub, type: "substep", parentCpId: cp.id, parentOrder: cp.order });
        });
      }
    });

    const isNodeEnabled = (node: any) => {
      const allCps = [...selectedProject.checkpoints].sort((a, b) => a.order - b.order);
      const nodeOrder = node.type === "checkpoint" ? node.order : node.parentOrder;
      return allCps.every(cp => cp.order >= nodeOrder || cp.is_completed);
    };

    return (
      <div className={styles.checkpoints}>
        {timelineNodes.map((node, idx) => {
          const enabled = isNodeEnabled(node);
          if (node.type === "checkpoint") {
            return (
              <div 
                key={`cp-${node.id}`} 
                className={`${styles.checkpoint} ${node.is_completed ? styles.activeCp : ""} ${!enabled ? styles.locked : ""}`}
                onClick={() => enabled && toggleCheckpoint(node)}
                style={{ cursor: enabled ? "pointer" : "not-allowed" }}
              >
                <div className={`${styles.dot} ${node.is_completed ? styles.completedDot : ""}`}>
                  {node.is_completed ? "✓" : node.order}
                </div>
                <div className={styles.cpName}>{node.name}</div>
              </div>
            );
          } else {
            return (
              <div 
                key={`sub-${node.id}`} 
                className={`${styles.checkpoint} ${!enabled ? styles.locked : ""}`}
                onClick={() => enabled && toggleSubStep(node)}
                style={{ cursor: enabled ? "pointer" : "not-allowed" }}
              >
                <div className={`${styles.subDot} ${node.is_completed ? styles.completedSubDot : ""}`}>
                  {node.is_completed ? "✓" : ""}
                </div>
                <div className={styles.subName}>{node.name}</div>
              </div>
            );
          }
        })}
      </div>
    );
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
      const allCps = [...selectedProject.checkpoints].sort((a, b) => a.order - b.order);

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
              <span>Auto-Calculated Progress</span>
              <span style={{ color: "var(--admin-accent)" }}>{selectedProject.progress}%</span>
            </div>
            <input 
              type="range" 
              className={styles.slider} 
              min="0" max="100" 
              value={selectedProject.progress}
              readOnly
            />
          </div>

          {renderTimeline()}

          <div className={styles.substepsSection}>
            <div className={styles.cardHeader} style={{ marginBottom: "16px" }}>
              <h2>Milestone Sub-tasks</h2>
              <p>Add specific tasks for each stage to track granular progress.</p>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              {allCps.map(cp => {
                const enabled = allCps.every(prev => prev.order >= cp.order || prev.is_completed);

                return (
                  <div key={cp.id} style={{ opacity: cp.is_completed ? 0.6 : (enabled ? 1 : 0.4) }}>
                    <h4 style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", fontSize: "14px", fontWeight: 700, color: "var(--admin-text-primary)" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: cp.is_completed ? "#10b981" : (enabled ? "var(--admin-accent)" : "#cbd5e1") }}></div>
                      {cp.name} {!enabled && "🔒"}
                    </h4>
                    <div className={styles.substepList}>
                      {cp.sub_steps?.map(sub => (
                        <div key={sub.id} className={styles.substepItem}>
                          <input 
                            type="checkbox" 
                            disabled={!enabled}
                            checked={sub.is_completed} 
                            onChange={() => toggleSubStep(sub)}
                            style={{ cursor: enabled ? "pointer" : "not-allowed" }}
                          />
                          <span>{sub.name}</span>
                          <button 
                            className={styles.deleteBtn}
                            onClick={() => deleteSubStep(sub.id)}
                            title="Remove sub-task"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <div className={styles.addSubstep}>
                        <input 
                          className={styles.input}
                          disabled={!enabled}
                          style={{ padding: "8px 12px", opacity: enabled ? 1 : 0.5 }}
                          placeholder={enabled ? "Add sub-task..." : "Locked"} 
                          value={subStepInputs[cp.id] || ""}
                          onChange={(e) => setSubStepInputs({ ...subStepInputs, [cp.id]: e.target.value })}
                          onKeyPress={(e) => e.key === "Enter" && addSubStep(cp.id)}
                        />
                        <button 
                          onClick={() => addSubStep(cp.id)} 
                          className={styles.primaryBtn}
                          disabled={!enabled}
                          style={{ margin: 0, padding: "0 12px", opacity: enabled ? 1 : 0.5 }}
                        >+</button>
                      </div>
                    </div>
                  </div>
                );
              })}
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
