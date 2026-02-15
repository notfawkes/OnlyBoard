import type {
    ProfileData,
    DocumentItem,
    FeeData,
    LMSPageData,
    AdminStudent,
    KBEntry,
} from '../types/types';

// Profile mock data
export const profileData: ProfileData = {
    currentStage: 'Documents',
    admissionDetails: {
        cetScore: 183,
        percentile: 96.21,
        category: 'TFWS',
        branch: 'AIML',
    },
    contactInfo: {
        phone: '+91 83698 77217',
        email: 'bala010706@gmail.com',
        address: '402, 4th Floor, Panchsheel Society, Matunga East, Mumbai - 400019',
    },
};

// Documents mock data
export const documentsData: DocumentItem[] = [
    { id: 'doc-1', name: '10th Marksheet', requirement: 'Original + Print', status: 'verified', instructions: 'Submit original marksheet along with 2 photocopies attested by gazetted officer.' },
    { id: 'doc-2', name: '12th Marksheet', requirement: 'Original + Print', status: 'verified', instructions: 'Submit original marksheet along with 2 photocopies.' },
    { id: 'doc-3', name: 'CET Score Card', requirement: 'Print', status: 'verified', instructions: 'Print the CET score card from the official website.' },
    { id: 'doc-4', name: 'Domicile Certificate', requirement: 'Original', status: 'uploaded', instructions: 'Original domicile certificate issued by Tehsildar office. Must be valid and not expired.', fileName: 'domicile_cert.pdf' },
    { id: 'doc-5', name: 'Caste Certificate', requirement: 'Original + Print', status: 'pending', instructions: 'Required for reserved category students. Original certificate with 2 photocopies.' },
    { id: 'doc-6', name: 'Income Certificate', requirement: 'Original', status: 'verified', instructions: 'Income certificate from Tehsildar for the current financial year.' },
    { id: 'doc-7', name: 'Aadhar Card', requirement: 'Print', status: 'verified', instructions: 'Print of Aadhar card (front and back on same page).' },
    { id: 'doc-8', name: 'Transfer Certificate', requirement: 'Original', status: 'rejected', instructions: 'TC from previous institution. Must have principal signature and school stamp.' },
    { id: 'doc-9', name: 'Passport Size Photos', requirement: 'Original', status: 'verified', instructions: 'Submit 4 passport-size photographs with white background (not older than 3 months).' },
];

// Fees mock data
export const feeData: FeeData = {
    lineItems: [
        { id: 'fee-1', label: 'Tuition Fee', amount: 125000 },
        { id: 'fee-2', label: 'Development Fee', amount: 15000 },
        { id: 'fee-3', label: 'Exam Fee', amount: 5000 },
        { id: 'fee-4', label: 'Library Fee', amount: 3000 },
        { id: 'fee-5', label: 'Hostel Fee', amount: 60000 },
        { id: 'fee-6', label: 'TFWS Scholarship', amount: -125000, isDeduction: true },
    ],
    totalAmount: 83000,
    status: 'pending',
};

// LMS mock data
export const lmsData: LMSPageData = {
    unlocked: false,
    welcomeMessage: 'Welcome to your learning platforms! Access all your course materials and class groups below.',
    links: [
        {
            id: 'lms-1',
            platform: 'WhatsApp Group',
            icon: 'chat',
            description: 'Join your class WhatsApp group for quick updates, announcements, and peer discussions.',
            url: 'https://chat.whatsapp.com/LEvFaMjlFsmF1esJrrC6HZ?mode=gi_t',
        },
        {
            id: 'lms-2',
            platform: 'Google Classroom',
            icon: 'book',
            description: 'Access course materials, assignments, and submit your work through Google Classroom.',
            url: 'https://classroom.google.com/c/ODQ0ODU0MTUxNDUy?cjc=4w26aqhj',
        },
        {
            id: 'lms-3',
            platform: 'ERP Portal',
            icon: 'building',
            description: 'View attendance, grades, timetable, and other academic information on the ERP portal.',
            url: 'https://erp.college.edu',
        },
    ],
};

// Admin mock data
export const adminStudents: AdminStudent[] = [
    { id: 'stu-1', name: 'Bala Sudalaimuthu', uid: '24AIMLA0628', branch: 'AIML', category: 'TFWS', stage: 'documents', documentsVerified: 6, totalDocuments: 9, feeStatus: 'pending' },
    { id: 'stu-2', name: 'Siddharth Jha', uid: '24COMPA0102', branch: 'COMP', category: 'Open', stage: 'fees', documentsVerified: 9, totalDocuments: 9, feeStatus: 'generated' },
    { id: 'stu-3', name: 'Anand Kalambe', uid: '24ENTCA0315', branch: 'ENTC', category: 'OBC', stage: 'profile', documentsVerified: 0, totalDocuments: 9, feeStatus: 'pending' },
    { id: 'stu-4', name: 'Sahil Ambekar', uid: '24MECHA0420', branch: 'MECH', category: 'SC', stage: 'completed', documentsVerified: 9, totalDocuments: 9, feeStatus: 'confirmed' },
    { id: 'stu-5', name: 'Mantu Jha', uid: '24CIVLA0512', branch: 'CIVIL', category: 'NT', stage: 'lms', documentsVerified: 9, totalDocuments: 9, feeStatus: 'confirmed' },
    { id: 'stu-6', name: 'Shekhar Jha', uid: '24AIMLA0733', branch: 'AIML', category: 'Open', stage: 'documents', documentsVerified: 3, totalDocuments: 9, feeStatus: 'pending' },
    { id: 'stu-7', name: 'Neel Kadam', uid: '24COMPA0201', branch: 'COMP', category: 'EWS', stage: 'fees', documentsVerified: 9, totalDocuments: 9, feeStatus: 'pending' },
    { id: 'stu-8', name: 'Gaurav Giri', uid: '24ENTCA0445', branch: 'ENTC', category: 'Open', stage: 'documents', documentsVerified: 7, totalDocuments: 9, feeStatus: 'pending' },
];

// Knowledge Base mock data
export const kbEntries: KBEntry[] = [
    { id: 'kb-1', title: 'How to obtain a Domicile Certificate?', category: 'Documents', content: 'Visit your local Tehsildar office with proof of residence (ration card, light bill). Processing takes 7-15 days. Fee: ₹50.', lastUpdated: '2026-02-10' },
    { id: 'kb-2', title: 'TFWS Scholarship Eligibility', category: 'Fees', content: 'Students with family income below ₹8 lakh/year and CET percentile above 90 are eligible for Tuition Fee Waiver Scheme.', lastUpdated: '2026-02-08' },
    { id: 'kb-3', title: 'ERP Portal Login Instructions', category: 'LMS', content: 'Use your UID as username and DOB (DDMMYYYY) as initial password. Change password on first login.', lastUpdated: '2026-02-12' },
    { id: 'kb-4', title: 'Document Verification Timeline', category: 'Documents', content: 'Documents are verified within 3-5 working days after submission. Check status on your dashboard.', lastUpdated: '2026-02-05' },
    { id: 'kb-5', title: 'Fee Payment Methods', category: 'Fees', content: 'Fees can be paid via NEFT, UPI, or Demand Draft. Online payment link will be generated after document verification.', lastUpdated: '2026-02-11' },
    { id: 'kb-6', title: 'Hostel Allotment Process', category: 'General', content: 'Hostel rooms are allotted on first-come-first-serve basis after fee confirmation. Apply through the ERP portal.', lastUpdated: '2026-02-09' },
];

// AI chat suggestion chips
export const aiSuggestions = [
    'What documents are pending?',
    'How to get domicile certificate?',
    'When is the fee deadline?',
    'How to access Google Classroom?',
    'What is my current stage?',
];
