import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.join(__dirname, 'src', 'app', 'components');
const appDir = path.join(__dirname, 'src', 'app');

const fileGroups = {
  admin: [
    'AdminDashboard.tsx',
    'AdminLoginPage.tsx',
    'AdministrationPage.tsx',
    'CommitteeManagementPage.tsx'
  ],
  principal: [
    'PrincipalDashboard.tsx',
    'ApprovalCenterPage.tsx'
  ],
  hod: [
    'HODDashboard.tsx',
    'HODLeaveNotifications.tsx',
    'HODLoginPage.tsx',
    'HODMainDashboard.tsx',
    'HODProfile.tsx'
  ],
  faculty: [
    'FacultyDashboard.tsx',
    'FacultyDetails.tsx',
    'FacultyHODRegistrationPage.tsx',
    'FacultyListPage.tsx',
    'FacultyLoginPage.tsx',
    'FacultyManagementPage.tsx',
    'FacultyNewUserRegistrationPage.tsx',
    'FacultyRegistrationPage.tsx',
    'FacultyTimetablePage.tsx'
  ],
  student: [
    'StudentAttendancePage.tsx',
    'StudentCommitteesPage.tsx',
    'StudentDashboard.tsx',
    'StudentDetailPage.tsx',
    'StudentExamPage.tsx',
    'StudentFeePage.tsx',
    'StudentLoginPage.tsx',
    'StudentManagementPage.tsx',
    'StudentNewUserRegistrationPage.tsx',
    'StudentRegistrationPage.tsx',
    'StudentSyllabusPage.tsx',
    'StudentTimetablePage.tsx'
  ],
  department: [
    'DepartmentDetailPage.tsx',
    'DepartmentFacultyPage.tsx',
    'DepartmentSelection.tsx',
    'DepartmentStudentsPage.tsx',
    'DepartmentSyllabusPage.tsx',
    'DepartmentTimetablePage.tsx',
    'DepartmentsPage.tsx'
  ],
  common: [
    'AvatarDropdown.tsx',
    'CredentialPreviewPage.tsx',
    'InvalidRolePage.tsx',
    'LeaveRequestForm.tsx',
    'LeaveRequestList.tsx',
    'LoginForm.tsx',
    'LoginPage.tsx',
    'NewCandidateRegistrationPage.tsx',
    'ReportsAnalyticsPage.tsx',
    'RoleSelection.tsx',
    'Timetable.tsx',
    'UnifiedTimetable.tsx'
  ]
};

// Map component names to their new paths
const componentPathMap = {};
for (const [folder, files] of Object.entries(fileGroups)) {
  for (const file of files) {
    const name = file.replace('.tsx', '');
    componentPathMap[name] = `${folder}/${name}`;
  }
}

function processFiles() {
  // Create folders
  for (const folder of Object.keys(fileGroups)) {
    const dirPath = path.join(componentsDir, folder);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  // Move files
  for (const [folder, files] of Object.entries(fileGroups)) {
    for (const file of files) {
      const oldPath = path.join(componentsDir, file);
      const newPath = path.join(componentsDir, folder, file);
      if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
      }
    }
  }

  // Get all .tsx files in src/app recursively
  function getAllTsx(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        getAllTsx(filePath, fileList);
      } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        fileList.push(filePath);
      }
    }
    return fileList;
  }

  const allFiles = getAllTsx(appDir);

  for (const file of allFiles) {
    let content = fs.readFileSync(file, 'utf-8');
    let changed = false;

    // We will replace imports matching: from "./something" or from "../something"
    content = content.replace(/from\s+['"](\.\/|\.\.\/)([^'"]+)['"]/g, (match, prefix, importPath) => {
      // e.g. prefix = "./", importPath = "ui/button" or "components/AdminDashboard"
      
      // If the import path is already relative to app or components, let's normalize it
      // Instead of complex relative path resolution, let's just check the basename or known prefix.
      
      if (importPath.startsWith('ui/')) {
        return `from "@/components/${importPath}"`;
      }
      if (importPath.startsWith('figma/')) {
        return `from "@/components/${importPath}"`;
      }
      if (importPath.startsWith('components/ui/')) {
        return `from "@/${importPath}"`;
      }
      if (importPath.startsWith('components/figma/')) {
        return `from "@/${importPath}"`;
      }
      
      // If it's a component we moved
      const parts = importPath.split('/');
      const name = parts[parts.length - 1]; // e.g. "AdminDashboard"
      
      if (componentPathMap[name]) {
        return `from "@/components/${componentPathMap[name]}"`;
      }
      
      // If it's importing a component directly like "./components/RoleSelection" from App.tsx
      if (importPath.startsWith('components/')) {
        const compName = importPath.replace('components/', '');
        if (componentPathMap[compName]) {
          return `from "@/components/${componentPathMap[compName]}"`;
        }
      }

      // Default fallback: don't change
      return match;
    });

    if (content !== fs.readFileSync(file, 'utf-8')) {
      fs.writeFileSync(file, content);
      changed = true;
    }
  }

  console.log("Restructure complete");
}

processFiles();
