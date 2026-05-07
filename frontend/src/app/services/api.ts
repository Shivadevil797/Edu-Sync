// ─── Edu-Sync API Client ───
// Centralized service for all backend API calls

const API_BASE = 'http://localhost:5001/api/v1';

// ─── Token Management ───
let accessToken: string | null = localStorage.getItem('edu_sync_token');

export function setToken(token: string) {
  accessToken = token;
  localStorage.setItem('edu_sync_token', token);
}

export function getToken(): string | null {
  return accessToken;
}

export function clearToken() {
  accessToken = null;
  localStorage.removeItem('edu_sync_token');
  localStorage.removeItem('edu_sync_user');
}

export function setUser(user: any) {
  localStorage.setItem('edu_sync_user', JSON.stringify(user));
}

export function getUser(): any | null {
  try {
    const data = localStorage.getItem('edu_sync_user');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

// ─── Base Fetch Helper ───
async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const url = `${API_BASE}${endpoint}`;

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };

  // Don't set Content-Type for FormData (browser sets multipart boundary automatically)
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  // Attach auth token if available
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }

  return data;
}

// ─── Auth API ───

export async function apiLogin(username: string, password: string) {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

  // Store token and user data
  if (data.accessToken) {
    setToken(data.accessToken);
  }
  if (data.user) {
    setUser(data.user);
  }

  return data;
}

export async function apiRegisterStudent(formData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  dateOfBirth?: string;
  gender?: string;
  department?: string;
  section?: string;
  yearOfJoining?: number;
}) {
  const data = await apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(formData),
  });

  // Store token and user data on successful registration
  if (data.accessToken) {
    setToken(data.accessToken);
  }
  if (data.user) {
    setUser(data.user);
  }

  return data;
}

export async function apiLogout() {
  try {
    await apiFetch('/auth/logout', { method: 'POST' });
  } catch {
    // Logout should clear tokens even if API call fails
  }
  clearToken();
}

export async function apiGetDepartments(): Promise<any> {
  return apiFetch('/auth/departments');
}

// ─── Admin API ───

export async function apiGetDashboard() {
  return apiFetch('/admin/dashboard');
}

export async function apiGetAdminProfile() {
  return apiFetch('/admin/profile');
}

// ─── Admin Timetable API ───

export async function apiUploadWorkload(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return apiFetch('/admin/timetable/upload-workload', {
    method: 'POST',
    body: formData,
  });
}

export async function apiGetTimetables(filters?: {
  department?: string;
  year?: number;
  section?: string;
  type?: string;
}) {
  const params = new URLSearchParams();
  if (filters?.department) params.append('department', filters.department);
  if (filters?.year) params.append('year', String(filters.year));
  if (filters?.section) params.append('section', filters.section);
  if (filters?.type) params.append('type', filters.type);

  const query = params.toString();
  return apiFetch(`/admin/timetable${query ? `?${query}` : ''}`);
}

export async function apiGetWorkloads() {
  return apiFetch('/admin/timetable/workloads');
}

export async function apiPublishTimetable(timetableId: string) {
  return apiFetch(`/admin/timetable/${timetableId}/publish`, {
    method: 'POST',
  });
}

// ─── Admin Staff API ───

export async function apiGetStaff(params?: {
  search?: string;
  department?: string;
  sort?: string;
  page?: number;
  limit?: number;
}) {
  const searchParams = new URLSearchParams();
  if (params?.search) searchParams.append('search', params.search);
  if (params?.department) searchParams.append('department', params.department);
  if (params?.sort) searchParams.append('sort', params.sort);
  if (params?.page) searchParams.append('page', String(params.page));
  if (params?.limit) searchParams.append('limit', String(params.limit));

  const query = searchParams.toString();
  return apiFetch(`/admin/staff${query ? `?${query}` : ''}`);
}

// ─── Admin Student API ───

export async function apiGetStudents(params?: {
  search?: string;
  department?: string;
  semester?: number;
  page?: number;
  limit?: number;
}) {
  const searchParams = new URLSearchParams();
  if (params?.search) searchParams.append('search', params.search);
  if (params?.department) searchParams.append('department', params.department);
  if (params?.semester) searchParams.append('semester', String(params.semester));
  if (params?.page) searchParams.append('page', String(params.page));
  if (params?.limit) searchParams.append('limit', String(params.limit));

  const query = searchParams.toString();
  return apiFetch(`/admin/students${query ? `?${query}` : ''}`);
}

export async function apiDeleteStudent(studentId: string) {
  return apiFetch(`/admin/students/${studentId}`, { method: 'DELETE' });
}

// ─── Gate Verification API ───

export async function apiVerifyGate(role: 'faculty' | 'hod', accessKey: string) {
  return apiFetch('/gate/verify', {
    method: 'POST',
    body: JSON.stringify({ role, accessKey }),
  });
}

// ─── Staff Self-Registration API ───

export async function apiRegisterStaff(formData: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  department?: string;
  designation?: string;
  qualification?: string;
  gender?: string;
  address?: string;
  role: 'faculty' | 'hod';
}) {
  const data = await apiFetch('/auth/register-staff', {
    method: 'POST',
    body: JSON.stringify(formData),
  });

  if (data.accessToken) setToken(data.accessToken);
  if (data.user) setUser(data.user);

  return data;
}

// ─── Role-Scoped Timetable APIs ───

export async function apiGetPrincipalTimetables(filters?: {
  department?: string;
  year?: number;
  section?: string;
  type?: string;
}) {
  const params = new URLSearchParams();
  if (filters?.department) params.append('department', filters.department);
  if (filters?.year) params.append('year', String(filters.year));
  if (filters?.section) params.append('section', filters.section);
  if (filters?.type) params.append('type', filters.type);
  const query = params.toString();
  return apiFetch(`/principal/timetable${query ? `?${query}` : ''}`);
}

export async function apiGetHODTimetables() {
  return apiFetch('/hod/timetable');
}

export async function apiGetFacultyTimetables() {
  return apiFetch('/faculty/timetable');
}

export async function apiGetStudentAcademicTimetable() {
  return apiFetch('/student/timetable/academic');
}

export async function apiGetStudentExamTimetable() {
  return apiFetch('/student/timetable/exam');
}

export async function apiGetStudentProfile() {
  return apiFetch('/student/profile');
}

// ─── Faculty Dashboard API ───

export async function apiGetFacultyDashboard() {
  return apiFetch('/faculty/dashboard');
}

export async function apiGetFacultyLeaveRequests() {
  return apiFetch('/faculty/leave-requests');
}

export async function apiSubmitFacultyLeave(leaveData: {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
}) {
  return apiFetch('/faculty/leave-request', {
    method: 'POST',
    body: JSON.stringify(leaveData),
  });
}

// ─── HOD Dashboard API ───

export async function apiGetHODDashboard() {
  return apiFetch('/hod/dashboard');
}

export async function apiGetHODFaculty() {
  return apiFetch('/hod/faculty');
}

export async function apiGetHODLeaveRequests() {
  return apiFetch('/hod/leave-requests');
}

export async function apiReviewHODLeave(leaveId: string, status: 'approved' | 'rejected') {
  return apiFetch(`/hod/leave-requests/${leaveId}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}

export async function apiSubmitHODLeave(leaveData: {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
}) {
  return apiFetch('/hod/leave-request', {
    method: 'POST',
    body: JSON.stringify(leaveData),
  });
}

export async function apiGetHODExEmployees() {
  return apiFetch('/hod/ex-employees');
}

// ─── Ex-Employees API ───

export async function apiGetExEmployees() {
  return apiFetch('/admin/staff/ex-employees');
}

export async function apiDeleteStaff(facultyId: string, reason?: string) {
  return apiFetch(`/admin/staff/${facultyId}`, {
    method: 'DELETE',
    body: JSON.stringify({ reason: reason || 'Removed by admin' }),
  });
}

// ─── Principal Students API ───

export async function apiGetPrincipalStudents(params?: {
  search?: string;
  department?: string;
}) {
  const searchParams = new URLSearchParams();
  if (params?.search) searchParams.append('search', params.search);
  if (params?.department) searchParams.append('department', params.department);
  const query = searchParams.toString();
  return apiFetch(`/principal/students${query ? `?${query}` : ''}`);
}

// ─── Principal Faculty API ───

export async function apiGetPrincipalFaculty() {
  return apiFetch('/principal/faculty');
}

