// Fake credentials for demo purposes
// In a real application, these would be stored securely and passwords would be hashed

export interface UserCredentials {
  username: string
  password: string
  name: string
  email: string
  department?: string
  designation?: string
}

export const DEMO_CREDENTIALS = {
  principal: [
    {
      username: 'principal01',
      password: 'Principal@123',
      name: 'Dr. Rajesh Mehta',
      email: 'principal@college.edu',
      designation: 'Principal'
    },
    {
      username: 'admin',
      password: 'Admin@2024',
      name: 'Dr. Priya Sharma',
      email: 'admin@college.edu',
      designation: 'Principal'
    }
  ],
  hod: [
    {
      username: 'hod_bca',
      password: 'HodBCA@123',
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@college.edu',
      department: 'BCA',
      designation: 'HOD - BCA'
    },
    {
      username: 'hod_bcom',
      password: 'HodBCOM@123',
      name: 'Dr. Priya Nair',
      email: 'priya.nair@college.edu',
      department: 'BCOM',
      designation: 'HOD - BCOM'
    },
    {
      username: 'hod_bba',
      password: 'HodBBA@123',
      name: 'Dr. Amit Verma',
      email: 'amit.verma@college.edu',
      department: 'BBA',
      designation: 'HOD - BBA'
    },
    {
      username: 'hod_kannada',
      password: 'HodKannada@123',
      name: 'Dr. Padmavathi Rao',
      email: 'padmavathi.rao@college.edu',
      department: 'Kannada',
      designation: 'HOD - Kannada'
    }
  ],
  faculty: [
    {
      username: 'faculty01',
      password: 'Faculty@123',
      name: 'Prof. Arjun Malhotra',
      email: 'arjun.malhotra@college.edu',
      department: 'BCA',
      designation: 'Assistant Professor'
    },
    {
      username: 'prof_deepa',
      password: 'Deepa@2024',
      name: 'Dr. Deepa Nair',
      email: 'deepa.nair@college.edu',
      department: 'BCA',
      designation: 'Associate Professor'
    },
    {
      username: 'prof_vikram',
      password: 'Vikram@123',
      name: 'Dr. Vikram Patel',
      email: 'vikram.patel@college.edu',
      department: 'BCOM',
      designation: 'Assistant Professor'
    },
    {
      username: 'prof_neha',
      password: 'Neha@2024',
      name: 'Dr. Neha Gupta',
      email: 'neha.gupta@college.edu',
      department: 'BBA',
      designation: 'Associate Professor'
    },
    {
      username: 'prof_sunita',
      password: 'Sunita@123',
      name: 'Dr. Sunita Gupta',
      email: 'sunita.gupta@college.edu',
      department: 'Hindi',
      designation: 'Assistant Professor'
    }
  ],
  student: [
    {
      username: 'stu2024001',
      password: 'Student@123',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@student.college.edu',
      department: 'BCA',
      designation: '2nd Year'
    },
    {
      username: 'stu2024002',
      password: 'Priya@2024',
      name: 'Priya Reddy',
      email: 'priya.reddy@student.college.edu',
      department: 'BCOM',
      designation: '1st Year'
    },
    {
      username: 'stu2024003',
      password: 'Amit@123',
      name: 'Amit Singh',
      email: 'amit.singh@student.college.edu',
      department: 'BBA',
      designation: '3rd Year'
    },
    {
      username: 'stu2024004',
      password: 'Sneha@2024',
      name: 'Sneha Patel',
      email: 'sneha.patel@student.college.edu',
      department: 'BCA',
      designation: '1st Year'
    },
    {
      username: 'demo_student',
      password: 'Demo@123',
      name: 'Demo Student',
      email: 'demo.student@college.edu',
      department: 'BCA',
      designation: '2nd Year'
    },
    {
      username: 'stu2024005',
      password: 'Ravi@123',
      name: 'Ravi Kumar',
      email: 'ravi.kumar@student.college.edu',
      department: 'BCOM',
      designation: '2nd Year'
    },
    {
      username: 'stu2024006',
      password: 'Ankita@2024',
      name: 'Ankita Joshi',
      email: 'ankita.joshi@student.college.edu',
      department: 'BBA',
      designation: '3rd Year'
    },
    {
      username: 'test_student',
      password: 'Test@123',
      name: 'Test Student',
      email: 'test.student@college.edu',
      department: 'BCA',
      designation: '1st Year'
    }
  ]
}

export const validateCredentials = (username: string, password: string, role: keyof typeof DEMO_CREDENTIALS): UserCredentials | null => {
  const users = DEMO_CREDENTIALS[role]
  const user = users.find(u => u.username === username && u.password === password)
  return user || null
}

export const getAllCredentialsByRole = (role: keyof typeof DEMO_CREDENTIALS): UserCredentials[] => {
  return DEMO_CREDENTIALS[role]
}

// Helper function to get credentials display for testing
export const getCredentialsHelp = () => {
  return {
    principal: 'Username: principal01 | Password: Principal@123',
    hod: 'Username: hod_bca | Password: HodBCA@123',
    faculty: 'Username: faculty01 | Password: Faculty@123',
    student: 'Username: stu2024001 | Password: Student@123'
  }
}