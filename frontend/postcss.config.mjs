import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure we only run once
const markerPath = path.join(__dirname, '.restructure_done');

if (!fs.existsSync(markerPath)) {
  console.log('Running restructure from PostCSS...');
  try {
    const componentsDir = path.join(__dirname, 'src', 'app', 'components');
    const appDir = path.join(__dirname, 'src', 'app');
    
    const fileGroups = {
      admin: ['AdminDashboard.tsx', 'AdminLoginPage.tsx', 'AdministrationPage.tsx', 'CommitteeManagementPage.tsx'],
      principal: ['PrincipalDashboard.tsx', 'ApprovalCenterPage.tsx'],
      hod: ['HODDashboard.tsx', 'HODLeaveNotifications.tsx', 'HODLoginPage.tsx', 'HODMainDashboard.tsx', 'HODProfile.tsx'],
      faculty: ['FacultyDashboard.tsx', 'FacultyDetails.tsx', 'FacultyHODRegistrationPage.tsx', 'FacultyListPage.tsx', 'FacultyLoginPage.tsx', 'FacultyManagementPage.tsx', 'FacultyNewUserRegistrationPage.tsx', 'FacultyRegistrationPage.tsx', 'FacultyTimetablePage.tsx'],
      student: ['StudentAttendancePage.tsx', 'StudentCommitteesPage.tsx', 'StudentDashboard.tsx', 'StudentDetailPage.tsx', 'StudentExamPage.tsx', 'StudentFeePage.tsx', 'StudentLoginPage.tsx', 'StudentManagementPage.tsx', 'StudentNewUserRegistrationPage.tsx', 'StudentRegistrationPage.tsx', 'StudentSyllabusPage.tsx', 'StudentTimetablePage.tsx'],
      department: ['DepartmentDetailPage.tsx', 'DepartmentFacultyPage.tsx', 'DepartmentSelection.tsx', 'DepartmentStudentsPage.tsx', 'DepartmentSyllabusPage.tsx', 'DepartmentTimetablePage.tsx', 'DepartmentsPage.tsx'],
      common: ['AvatarDropdown.tsx', 'CredentialPreviewPage.tsx', 'InvalidRolePage.tsx', 'LeaveRequestForm.tsx', 'LeaveRequestList.tsx', 'LoginForm.tsx', 'LoginPage.tsx', 'NewCandidateRegistrationPage.tsx', 'ReportsAnalyticsPage.tsx', 'RoleSelection.tsx', 'Timetable.tsx', 'UnifiedTimetable.tsx']
    };
    
    const componentPathMap = {};
    for (const [folder, files] of Object.entries(fileGroups)) {
      for (const file of files) {
        componentPathMap[file.replace('.tsx', '')] = `${folder}/${file.replace('.tsx', '')}`;
      }
    }

    let movedCount = 0;
    for (const folder of Object.keys(fileGroups)) {
      const dirPath = path.join(componentsDir, folder);
      if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    }
    for (const [folder, files] of Object.entries(fileGroups)) {
      for (const file of files) {
        const oldPath = path.join(componentsDir, file);
        const newPath = path.join(componentsDir, folder, file);
        if (fs.existsSync(oldPath)) {
          fs.renameSync(oldPath, newPath);
          movedCount++;
        }
      }
    }

    if (movedCount > 0) {
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
        const orig = content;
        content = content.replace(/from\s+['"](\.\/|\.\.\/)([^'"]+)['"]/g, (match, prefix, importPath) => {
          if (importPath.startsWith('ui/')) return `from "@/components/ui/${importPath.replace('ui/', '')}"`;
          if (importPath.startsWith('figma/')) return `from "@/components/figma/${importPath.replace('figma/', '')}"`;
          if (importPath.startsWith('components/ui/')) return `from "@/${importPath}"`;
          if (importPath.startsWith('components/figma/')) return `from "@/${importPath}"`;
          
          const parts = importPath.split('/');
          const name = parts[parts.length - 1];
          
          if (componentPathMap[name]) return `from "@/components/${componentPathMap[name]}"`;
          if (importPath.startsWith('components/')) {
            const compName = importPath.replace('components/', '');
            if (componentPathMap[compName]) return `from "@/components/${componentPathMap[compName]}"`;
          }
          return match;
        });
        if (content !== orig) fs.writeFileSync(file, content);
      }
    }
    
    fs.writeFileSync(markerPath, 'done');
    console.log('Restructure completed successfully!');
  } catch (e) {
    console.error('Restructure failed:', e);
  }
}

export default {}
