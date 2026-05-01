"use client";

import { useState, useEffect } from "react";
import styles from "./Projects.module.css";
import api from "@/utils/axios";
import { useAuth } from "@/context/AuthContext";

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

  // Form State
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
      fetchProjects(); // Refresh to get nested updates
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
      fetchProjects();
      // Optimization: trigger a refresh of selectedProject
      const res = await api.get("/projects");
      const updated = res.data.find((p: Project) => p.id === selectedProject?.id);
      if (updated) setSelectedProject(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const renderCreateTab = () => (
    <div className={styles.card}>
      <h2 style={{ marginBottom: "1.5rem" }}>Start New Project</h2>
      <form className={styles.form} onSubmit={handleCreateProject}>
        <div className={styles.formField}>
          <label>Client Name</label>
          <input 
            required 
            value={formData.client_name}
            onChange={e => setFormData({...formData, client_name: e.target.value})}
            placeholder="e.g. Tata Motors" 
          />
        </div>
        <div className={styles.formField}>
          <label>Line</label>
          <input 
            required 
            value={formData.line}
            onChange={e => setFormData({...formData, line: e.target.value})}
            placeholder="e.g. Assembly Line A" 
          />
        </div>
        <div className={styles.formField}>
          <label>Material</label>
          <input 
            required 
            value={formData.material}
            onChange={e => setFormData({...formData, material: e.target.value})}
            placeholder="e.g. Stainless Steel" 
          />
        </div>
        <div className={styles.formField}>
          <label>Location</label>
          <input 
            required 
            value={formData.location}
            onChange={e => setFormData({...formData, location: e.target.value})}
            placeholder="e.g. Pune, Maharashtra" 
          />
        </div>
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Creating..." : "Initialize Project"}
        </button>
      </form>
    </div>
  );

  const renderLifecycleTab = () => {
    if (selectedProject) {
      return (
        <div className={styles.card}>
          <button className={styles.backBtn} onClick={() => setSelectedProject(null)}>
            ← Back to Projects
          </button>
          
          <div className={styles.trackerHeader}>
            <div>
              <h2 style={{ margin: 0 }}>{selectedProject.client_name}</h2>
              <p style={{ color: "var(--text-secondary)", marginTop: "0.4rem" }}>
                {selectedProject.line} | {selectedProject.location}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <span className={styles.activeTab} style={{ padding: "0.4rem 1rem", borderRadius: "20px", fontSize: "0.8rem" }}>
                Active Project
              </span>
            </div>
          </div>

          <div className={styles.progressBarContainer}>
            <div className={styles.progressBarLabel}>
              <span>Overall Progress</span>
              <span>{selectedProject.progress}%</span>
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
            <h3>Custom Sub-steps</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              Add and track specific tasks for each major checkpoint.
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              {selectedProject.checkpoints.map(cp => (
                <div key={cp.id} style={{ opacity: cp.is_completed ? 0.6 : 1 }}>
                  <h4 style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: cp.is_completed ? "var(--success-color)" : "var(--accent-primary)" }}></span>
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
                        placeholder="Add sub-task..." 
                        value={cp.id === (window as any).activeCpId ? newSubStep : ""}
                        onChange={(e) => {
                          setNewSubStep(e.target.value);
                          (window as any).activeCpId = cp.id;
                        }}
                        onKeyPress={(e) => e.key === "Enter" && addSubStep(cp.id)}
                      />
                      <button onClick={() => addSubStep(cp.id)} style={{ padding: "0 0.8rem", background: "var(--accent-primary)", border: "none", borderRadius: "6px", color: "white" }}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.projectGrid}>
        {projects.length === 0 && (
          <div className={styles.card} style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            <p>No active projects found. Start one in the "Create" tab.</p>
          </div>
        )}
        {projects.map((p) => (
          <div key={p.id} className={styles.projectCard} onClick={() => setSelectedProject(p)}>
            <div className={styles.projectInfo}>
              <h3>{p.client_name}</h3>
              <div className={styles.projectMeta}>
                <span>Line: {p.line}</span>
                <span>Location: {p.location}</span>
                <span>Material: {p.material}</span>
              </div>
            </div>
            <div style={{ marginTop: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                <span>Progress</span>
                <span>{p.progress}%</span>
              </div>
              <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px" }}>
                <div style={{ width: `${p.progress}%`, height: "100%", background: "var(--accent-primary)", borderRadius: "2px", transition: "width 0.5s ease" }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderManagementTab = () => {
    // Group projects by owner
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
              <span style={{ fontWeight: 600 }}>{name}</span>
              <span style={{ color: "var(--text-secondary)" }}>{employeeProjects.length} Projects</span>
            </div>
            <div className={styles.employeeProjects}>
               {employeeProjects.map(p => (
                 <div key={p.id} className={styles.projectCard} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                   <div>
                     <div style={{ fontWeight: 600 }}>{p.client_name}</div>
                     <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{p.line} | {p.location}</div>
                   </div>
                   <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--accent-primary)" }}>{p.progress}%</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>Overall Progress</div>
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
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === "lifecycle" ? styles.activeTab : ""}`}
            onClick={() => { setActiveTab("lifecycle"); setSelectedProject(null); }}
          >
            Project Life Cycle
          </button>
          <button 
            className={`${styles.tab} ${activeTab === "create" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("create")}
          >
            Create New Project
          </button>
          {user?.role === "manager" && (
            <button 
              className={`${styles.tab} ${activeTab === "management" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("management")}
            >
              Management Overview
            </button>
          )}
        </div>
      </div>

      <div className={styles.content}>
        {activeTab === "create" && renderCreateTab()}
        {activeTab === "lifecycle" && renderLifecycleTab()}
        {activeTab === "management" && renderManagementTab()}
      </div>
    </div>
  );
}
