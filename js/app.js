/**
 * VLearn English Center - UI Mockup Interactive Controller
 * Handles role-switching, module tabs, modals, attendance toggling, and toasts.
 */

// Current App State
const state = {
  currentRole: 'Admin', // Admin | Receptionist | Teacher | Student
  currentView: 'dashboard', // dashboard | students | teachers | classes | class-detail | schedule | attendance | results | tuition | notices | materials | accounts | roles
  classDetailTab: 'overview'
};

// Role Configuration & Menus
const ROLE_CONFIGS = {
  Admin: {
    name: 'Quản trị viên Hệ thống',
    badge: 'Admin',
    userName: 'Admin Hoàng Long',
    avatar: 'A',
    headerTitle: 'Bảng Điều Khiển Quản Trị',
    menus: [
      { id: 'dashboard', name: 'Bảng điều khiển', icon: 'grid' },
      { id: 'students', name: 'Học viên', icon: 'users' },
      { id: 'teachers', name: 'Giáo viên', icon: 'user-check' },
      { id: 'classes', name: 'Lớp học', icon: 'book' },
      { id: 'schedule', name: 'Lịch học', icon: 'calendar' },
      { id: 'attendance', name: 'Điểm danh', icon: 'check-square' },
      { id: 'results', name: 'Kết quả học tập', icon: 'award' },
      { id: 'tuition', name: 'Học phí & Hóa đơn', icon: 'credit-card' },
      { id: 'notices', name: 'Thông báo', icon: 'bell' },
      { id: 'materials', name: 'Tài liệu học tập', icon: 'file-text' },
      { id: 'accounts', name: 'Tài khoản', icon: 'shield' },
      { id: 'roles', name: 'Ma trận phân quyền', icon: 'layers' }
    ]
  },
  Receptionist: {
    name: 'Cổng Lễ Tân & Tuyển Sinh',
    badge: 'Lễ Tân',
    userName: 'Lễ tân Minh Thư',
    avatar: 'LT',
    headerTitle: 'Cổng Lễ Tân & Tuyển Sinh',
    menus: [
      { id: 'dashboard', name: 'Bảng điều khiển', icon: 'grid' },
      { id: 'students', name: 'Học viên', icon: 'users' },
      { id: 'classes', name: 'Lớp học & Ghi danh', icon: 'book' },
      { id: 'schedule', name: 'Lịch học trung tâm', icon: 'calendar' },
      { id: 'attendance', name: 'Tra cứu chuyên cần', icon: 'check-square' },
      { id: 'results', name: 'Tra cứu kết quả', icon: 'award' },
      { id: 'tuition', name: 'Thu học phí', icon: 'credit-card' },
      { id: 'notices', name: 'Bảng thông báo', icon: 'bell' }
    ]
  },
  Teacher: {
    name: 'Cổng Giảng Viên',
    badge: 'Giáo Viên',
    userName: 'Teacher Sarah Miller',
    avatar: 'SM',
    headerTitle: 'Không Gian Giảng Viên',
    menus: [
      { id: 'dashboard', name: 'Bảng điều khiển', icon: 'grid' },
      { id: 'classes', name: 'Lớp của tôi', icon: 'book' },
      { id: 'schedule', name: 'Lịch dạy tuần này', icon: 'calendar' },
      { id: 'attendance', name: 'Điểm danh buổi học', icon: 'check-square' },
      { id: 'results', name: 'Nhập điểm 4 kỹ năng', icon: 'award' },
      { id: 'materials', name: 'Tài liệu bài giảng', icon: 'file-text' },
      { id: 'notices', name: 'Thông báo nội bộ', icon: 'bell' }
    ]
  },
  Student: {
    name: 'Cổng Học Viên',
    badge: 'Học Viên',
    userName: 'Học viên Nguyễn Văn An',
    avatar: 'NA',
    headerTitle: 'Góc Học Tập Học Viên',
    menus: [
      { id: 'dashboard', name: 'Bảng điều khiển', icon: 'grid' },
      { id: 'classes', name: 'Lớp đang theo học', icon: 'book' },
      { id: 'schedule', name: 'Thời khóa biểu', icon: 'calendar' },
      { id: 'attendance', name: 'Lịch sử chuyên cần', icon: 'check-square' },
      { id: 'results', name: 'Bảng điểm 4 kỹ năng', icon: 'award' },
      { id: 'tuition', name: 'Tình trạng học phí', icon: 'credit-card' },
      { id: 'materials', name: 'Tài liệu khóa học', icon: 'file-text' },
      { id: 'notices', name: 'Thông báo', icon: 'bell' }
    ]
  }
};

// SVG Icon Mapping
const SVG_ICONS = {
  grid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  'user-check': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>`,
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  'check-square': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
  award: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
  'credit-card': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  'file-text': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`
};

// Render Sidebar according to current role
function renderSidebar() {
  const config = ROLE_CONFIGS[state.currentRole];
  const container = document.getElementById('sidebarMenuContainer');
  if (!container) return;

  let html = `<div class="menu-label">KHÔNG GIAN LÀM VIỆC</div>`;
  config.menus.forEach(item => {
    const isActive = state.currentView === item.id;
    html += `
      <div class="nav-link ${isActive ? 'active' : ''}" onclick="switchView('${item.id}')">
        ${SVG_ICONS[item.icon] || SVG_ICONS.grid}
        <span>${item.name}</span>
      </div>
    `;
  });

  container.innerHTML = html;

  // Update Footer User Profile
  const userNameEl = document.getElementById('sidebarUserName');
  const userRoleEl = document.getElementById('sidebarUserRole');
  const userAvatarEl = document.getElementById('sidebarUserAvatar');
  if (userNameEl) userNameEl.innerText = config.userName;
  if (userRoleEl) userRoleEl.innerText = config.badge;
  if (userAvatarEl) userAvatarEl.innerText = config.avatar;

  // Update Topbar
  const topTitleEl = document.getElementById('topNavTitle');
  const topRoleEl = document.getElementById('topNavRole');
  if (topTitleEl) topTitleEl.innerText = config.headerTitle;
  if (topRoleEl) topRoleEl.innerText = config.badge;
}

// Switch Active Role
function switchRole(role) {
  if (!ROLE_CONFIGS[role]) return;
  state.currentRole = role;

  // Update active pill in role switcher
  document.querySelectorAll('.role-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.role === role);
  });

  // Switch to dashboard by default on role change
  state.currentView = 'dashboard';
  renderSidebar();
  renderCurrentView();
  showToast(`Đã chuyển sang không gian: ${ROLE_CONFIGS[role].name}`, 'info');
}

// Switch Active View / Module
function switchView(viewId) {
  state.currentView = viewId;
  renderSidebar();
  renderCurrentView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render Content View
function renderCurrentView() {
  document.querySelectorAll('.view-section').forEach(sec => {
    sec.style.display = 'none';
  });

  const targetSec = document.getElementById(`view-${state.currentView}`);
  if (targetSec) {
    targetSec.style.display = 'block';
  } else {
    // Fallback to dashboard if view doesn't exist for this role
    const dashSec = document.getElementById('view-dashboard');
    if (dashSec) dashSec.style.display = 'block';
  }
}

// Class Detail Sub-Tabs Switcher
function switchClassTab(tabName) {
  state.classDetailTab = tabName;
  document.querySelectorAll('.class-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  document.querySelectorAll('.class-subtab-pane').forEach(pane => {
    pane.style.display = pane.id === `class-tab-${tabName}` ? 'block' : 'none';
  });
}

// Attendance Status Toggle (Present, Late, Absent, Excused)
function toggleAttendance(btn, status) {
  const parent = btn.closest('.attendance-pills');
  parent.querySelectorAll('.att-pill').forEach(p => {
    p.className = 'att-pill';
  });
  btn.classList.add(`active-${status}`);
}

// Toast Notifications System
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const iconSvg = type === 'success' 
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
    : type === 'error'
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <span style="flex:1;">${message}</span>
    <span style="cursor:pointer;color:#94a3b8;font-size:16px;" onclick="this.parentElement.remove()">&times;</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Modal Handlers
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('open');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('open');
}

// Close modal on click outside dialog
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

// Calculate Average Scores
function updateScoreAvg(rowId) {
  const row = document.getElementById(rowId);
  if (!row) return;
  const inputs = row.querySelectorAll('.score-input');
  let sum = 0, count = 0;
  inputs.forEach(input => {
    const val = parseFloat(input.value) || 0;
    sum += val;
    count++;
  });
  const avg = (sum / (count || 1)).toFixed(1);
  const avgEl = row.querySelector('.score-avg');
  if (avgEl) avgEl.innerText = avg;
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  renderCurrentView();
});
