"use client";

import { useMemo, useState } from "react";

type ReviewStatus = "In progress" | "Needs review" | "Ready";
type FilterStatus = "All items" | ReviewStatus;

type QueueItem = {
  id: string;
  image: string;
  crop: string;
  location: string;
  boxes: number;
  updated: string;
  status: ReviewStatus;
  color: string;
  initials: string;
};

const queueItems: QueueItem[] = [
  {
    id: "IMG-00842",
    image: "Leaf underside",
    crop: "Tomato",
    location: "Greenhouse 04",
    boxes: 3,
    updated: "8 min ago",
    status: "In progress",
    color: "sage",
    initials: "MK",
  },
  {
    id: "IMG-00839",
    image: "Damaged leaf",
    crop: "Pepper",
    location: "Field 12B",
    boxes: 2,
    updated: "24 min ago",
    status: "Needs review",
    color: "coral",
    initials: "AL",
  },
  {
    id: "IMG-00835",
    image: "Cluster on stem",
    crop: "Cucumber",
    location: "Greenhouse 02",
    boxes: 5,
    updated: "1 hr ago",
    status: "Ready",
    color: "lavender",
    initials: "JR",
  },
  {
    id: "IMG-00831",
    image: "Leaf surface",
    crop: "Tomato",
    location: "Field 08A",
    boxes: 1,
    updated: "2 hrs ago",
    status: "Needs review",
    color: "amber",
    initials: "MK",
  },
  {
    id: "IMG-00827",
    image: "Young shoot",
    crop: "Eggplant",
    location: "Greenhouse 01",
    boxes: 4,
    updated: "3 hrs ago",
    status: "Ready",
    color: "blue",
    initials: "AL",
  },
];

const filters: FilterStatus[] = [
  "All items",
  "In progress",
  "Needs review",
  "Ready",
];

function Icon({
  name,
  size = 18,
}: {
  name: "grid" | "inbox" | "layers" | "users" | "download" | "search" | "bell" | "arrow" | "leaf" | "clock" | "check" | "plus" | "chevron";
  size?: number;
}) {
  const paths: Record<typeof name, React.ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /></>,
    inbox: <><path d="M4 4h16l1 11h-5l-2 3h-4l-2-3H3L4 4Z" /><path d="M3 15h5l2 3h4l2-3h5" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5M12 15V3" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    leaf: <><path d="M20 4c-9 0-15 3-15 10a6 6 0 0 0 6 6c7 0 10-6 9-16Z" /><path d="M5 20c2-5 6-8 11-11" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    chevron: <><path d="m9 18 6-6-6-6" /></>,
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <a className="brand" href="#overview" aria-label="Fieldnote home">
        <span className="brand-mark"><Icon name="leaf" size={20} /></span>
        <span className="brand-name">fieldnote<span>.</span></span>
      </a>

      <div className="workspace-switcher">
        <span className="workspace-avatar">G</span>
        <span className="workspace-copy"><strong>Greenhouse Lab</strong><small>Research workspace</small></span>
        <span className="workspace-dots" aria-hidden="true">···</span>
      </div>

      <span className="nav-label">WORKSPACE</span>
      <nav className="side-nav" aria-label="Main navigation">
        <a className="nav-item active" href="#overview"><Icon name="grid" /><span>Overview</span></a>
        <a className="nav-item" href="#review-queue"><Icon name="inbox" /><span>Review queue</span><span className="nav-count">12</span></a>
        <span className="nav-item disabled" aria-disabled="true"><Icon name="layers" /><span>Dataset</span><span className="soon-tag">SOON</span></span>
        <span className="nav-item disabled" aria-disabled="true"><Icon name="users" /><span>Team</span></span>
        <span className="nav-item disabled" aria-disabled="true"><Icon name="download" /><span>Exports</span></span>
      </nav>

      <div className="sidebar-bottom">
        <div className="help-card">
          <span className="help-spark">✳</span>
          <strong>Need a hand?</strong>
          <p>Find your way around the review workflow.</p>
          <a href="#getting-started">Getting started <Icon name="arrow" size={14} /></a>
        </div>
        <div className="profile-button">
          <span className="profile-avatar">MK</span>
          <span className="profile-copy"><strong>Maya Kim</strong><small>Reviewer</small></span>
          <span className="profile-dots">···</span>
        </div>
      </div>
    </aside>
  );
}

function StatusBadge({ status }: { status: ReviewStatus }) {
  const icon = status === "Ready" ? "check" : status === "In progress" ? "clock" : null;
  return (
    <span className={`status-badge status-${status.toLowerCase().replace(" ", "-")}`}>
      {icon && <Icon name={icon} size={13} />}
      {status}
    </span>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("All items");

  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return queueItems.filter((item) => {
      const matchesStatus = activeFilter === "All items" || item.status === activeFilter;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${item.id} ${item.image} ${item.crop} ${item.location}`.toLowerCase().includes(normalizedQuery);
      return matchesStatus && matchesQuery;
    });
  }, [activeFilter, query]);

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-area" id="overview">
        <header className="topbar">
          <div className="breadcrumb"><span>Greenhouse Lab</span><Icon name="chevron" size={14} /><strong>Overview</strong></div>
          <div className="topbar-actions">
            <span className="demo-pill"><span /> SAMPLE DATA</span>
                <span className="icon-button notification-button" aria-label="Notifications">
              <Icon name="bell" size={19} /><i />
                </span>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <p className="eyebrow">YOUR WORKSPACE AT A GLANCE</p>
              <h1>A good morning to grow, Maya<span>.</span></h1>
              <p className="welcome-subtitle">Here’s what’s happening with your annotation work today.</p>
            </div>
            <button className="primary-button" type="button" onClick={() => document.getElementById("review-queue")?.scrollIntoView({ behavior: "smooth" })}>
              <Icon name="plus" size={17} /> Start reviewing
            </button>
          </section>

          <section className="stats-grid" aria-label="Workspace summary">
            <article className="stat-card">
              <div className="stat-top"><span className="stat-icon sage-icon"><Icon name="inbox" /></span><span className="stat-trend">+8.2% <span>this week</span></span></div>
              <p className="stat-label">Waiting for review</p><p className="stat-value">248 <span className="stat-unit">images</span></p>
              <div className="stat-foot"><span className="mini-bar"><i style={{ width: "62%" }} /></span><span>62% of weekly goal</span></div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span className="stat-icon lavender-icon"><Icon name="clock" /></span><span className="stat-trend neutral-trend">On track</span></div>
              <p className="stat-label">Reviewed by you</p><p className="stat-value">36 <span className="stat-unit">this week</span></p>
              <div className="stat-foot"><span className="mini-bar lavender-bar"><i style={{ width: "72%" }} /></span><span>Goal: 50 images</span></div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span className="stat-icon peach-icon"><Icon name="check" /></span><span className="stat-trend">+12% <span>vs last week</span></span></div>
              <p className="stat-label">Team agreement</p><p className="stat-value">94.8<span className="stat-percent">%</span></p>
              <div className="stat-foot"><span className="quality-dots"><i /><i /><i /><i /><i /></span><span>Above 90% target</span></div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span className="stat-icon blue-icon"><Icon name="leaf" /></span><span className="stat-trend neutral-trend">Across 4 crops</span></div>
              <p className="stat-label">Active dataset</p><p className="stat-value">1,284 <span className="stat-unit">images</span></p>
              <div className="stat-foot crop-foot"><span className="crop-dot tomato-dot" /> Tomato <span className="crop-dot pepper-dot" /> Pepper <span className="crop-dot cucumber-dot" /> Cucumber</div>
            </article>
          </section>

          <section className="content-grid">
            <article className="panel queue-panel" id="review-queue">
              <div className="panel-heading">
                <div><div className="heading-with-count"><h2>Your review queue</h2><span className="queue-count">12</span></div><p>Pick up where you left off.</p></div>
                <button className="text-button" type="button" onClick={() => { setActiveFilter("All items"); setQuery(""); }}>Reset filters <Icon name="arrow" size={15} /></button>
              </div>
              <div className="queue-toolbar">
                <div className="filter-tabs" role="group" aria-label="Filter queue by status">
                  {filters.map((filter) => (
                    <button
                      type="button"
                      key={filter}
                      className={`filter-tab${activeFilter === filter ? " selected" : ""}`}
                      aria-pressed={activeFilter === filter}
                      onClick={() => setActiveFilter(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
                <label className="search-field">
                  <Icon name="search" size={16} />
                  <input
                    type="search"
                    placeholder="Search images..."
                    aria-label="Search images"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                  <kbd>/</kbd>
                </label>
              </div>
              <div className="table-scroll">
                <table className="queue-table">
                  <thead><tr><th>IMAGE</th><th>CROP / LOCATION</th><th>BOXES</th><th>STATUS</th><th>UPDATED</th></tr></thead>
                  <tbody>
                    {visibleItems.map((item) => (
                      <tr key={item.id}>
                        <td><div className="image-cell"><span className={`image-thumb thumb-${item.color}`}><Icon name="leaf" size={19} /></span><span><strong>{item.image}</strong><small>{item.id}</small></span></div></td>
                        <td><div className="crop-cell"><strong>{item.crop}</strong><small>{item.location}</small></div></td>
                        <td><span className="box-count">{item.boxes}<span> {item.boxes === 1 ? "box" : "boxes"}</span></span></td>
                        <td><StatusBadge status={item.status} /></td>
                        <td><span className="updated-cell"><span className={`reviewer-avatar avatar-${item.initials.toLowerCase()}`}>{item.initials}</span>{item.updated}</span></td>
                      </tr>
                    ))}
                    {visibleItems.length === 0 && <tr><td className="empty-state" colSpan={5}>No images match this search. Try another term or status.</td></tr>}
                  </tbody>
                </table>
              </div>
              <div className="queue-footer"><span>Showing <strong>{visibleItems.length}</strong> sample images</span><span className="footer-total">12 assigned</span></div>
            </article>

            <aside className="side-column">
              <article className="panel goal-panel">
                <div className="panel-heading compact-heading"><div><h2>Weekly progress</h2><p>You’re building a great rhythm.</p></div><span className="goal-menu">···</span></div>
                <div className="progress-ring" role="img" aria-label="72 percent of weekly review goal completed"><div><strong>72<span>%</span></strong><small>of weekly goal</small></div></div>
                <div className="goal-detail"><span><i className="legend-dot done-dot" />Reviewed</span><strong>36 images</strong></div>
                <div className="goal-detail"><span><i className="legend-dot remaining-dot" />To goal</span><strong>14 images</strong></div>
                <div className="goal-note"><Icon name="check" size={15} /> 4 more than this time last week</div>
              </article>

              <article className="tip-card" id="getting-started">
                <span className="tip-decoration tip-one" /><span className="tip-decoration tip-two" />
                <span className="tip-icon"><Icon name="leaf" size={19} /></span>
                <p className="tip-label">FIELDNOTE TIP</p>
                <h3>Small boxes,<br />big difference.</h3>
                <p className="tip-copy">Zoom in to check edge cases. A precise box helps the whole team learn.</p>
                <button type="button" className="tip-link" onClick={() => document.getElementById("review-queue")?.scrollIntoView({ behavior: "smooth" })}>Explore review tips <Icon name="arrow" size={14} /></button>
              </article>
            </aside>
          </section>

          <footer className="page-footer"><span>Fieldnote <span className="footer-dot">·</span> Pest annotation review</span><span>Workspace data shown is for demonstration</span></footer>
        </div>
      </main>
    </div>
  );
}
