export const knowledgeBase: Record<string, string> = {
  // Greetings
  greeting_hello: "Hello! Welcome to Shashi Madan Public School. How can I help you today?",
  greeting_hi: "Hi there! Thanks for reaching out. Feel free to ask me anything about SMPS Chandausi.",
  
  // About & History
  about_school: "Shashi Madan Public School (SMPS) is an inclusive community of lifelong learners located in Chandausi, Sambhal district, Uttar Pradesh, India. We are run by the M.P. Singh Foundation, established in 2002.",
  about_foundation: "The M.P. Singh Foundation is a registered non-profit charitable trust established in 2002. It operates multiple educational institutions including SMPS Chandausi, Delhi Public School Meerut, and Delhi Public School Dehradun, all committed to quality education and character development.",
  about_sister_schools: "The M.P. Singh Foundation operates three schools: Shashi Madan Public School (Chandausi), Delhi Public School Meerut, and Delhi Public School Dehradun.",
  
  // Mission & Values
  mission: "Our mission is to provide quality, inclusive education that develops students as principled, conscientious, and globally aware citizens.",
  vision: "Our vision is to nurture lifelong learners who are equipped with academic excellence, strong values, and the ability to contribute meaningfully to society.",
  values: "Our core values are: Principled - integrity and ethical conduct; Inclusive - welcoming diversity; Growth - continuous learning and development; Service - commitment to the community.",
  
  // Leadership
  leadership: "SMPS Chandausi is led by dedicated educators and administrators. For specific names and qualifications of our leadership team, please contact the school office at +91-9258159506 or visit our website.",
  principal: "For information about our Principal and their qualifications, please contact the school at +91-9258159506 or email info@smpschandausi.com.",
  
  // Campus & Facilities
  campus_size: "Our school is built on a 10-acre sprawling campus in Chandausi, providing a conducive environment for learning and development.",
  facilities: "SMPS features: modern classrooms, dedicated Science, Math, and Computer laboratories, a well-stocked library, clean sanitation facilities, internet connectivity throughout the campus, and CCTV surveillance for security.",
  labs: "We have well-equipped Science, Mathematics, and Computer labs with modern equipment and resources to support hands-on learning.",
  library: "Our library is a valuable learning resource for students, offering a wide collection of books and digital resources.",
  sports: "We offer a variety of sports and extracurricular activities including indoor and outdoor sports, cultural programs, and clubs to develop well-rounded students.",
  extracurricular: "Beyond academics, SMPS offers diverse extracurricular activities including sports, cultural programs, arts, music, and various student clubs to develop all-round personalities.",
  
  // Academics
  academics: "SMPS follows the CBSE curriculum with an emphasis on conceptual learning, critical thinking, and practical application. We maintain a balanced approach to academics and holistic development.",
  cbse: "SMPS is affiliated with the Central Board of Secondary Education (CBSE). For our CBSE affiliation number and school code, please contact the school office.",
  teacher_ratio: "We maintain a healthy teacher-to-student ratio to ensure personalized attention and quality education for each student.",
  special_educators: "We have special educators and counselors available to support students with diverse learning needs and provide guidance on academic and personal matters.",
  
  // Admissions
  admission_process: "The admission process at SMPS typically involves: (1) Application submission through our website or office, (2) Written entrance test, (3) Interview with parents and student, (4) Merit-based selection. For current admission dates and requirements, please contact +91-9258159506.",
  admission_open: "Admissions are open for various grade levels. For current admission requirements, eligibility criteria, and application deadlines, please contact our office at +91-9258159506 or visit smpschandausi.com.",
  registration: "To register for admission, visit our office at SM Education City, Shiv Shakti Nagar, NH-509, Chandausi, or call +91-9258159506 for details.",
  
  // Fee Structure
  fees: "Our fee structure is transparent and competitive, varying by grade level. Fees are structured to support quality education, infrastructure, and teacher development. For detailed fee information by grade, please contact our office at +91-9258159506 or email info@smpschandausi.com.",
  fee_payment: "Fees can be paid monthly, quarterly, or annually. For payment modes and schedules, please contact the school office.",
  scholarships: "We believe education should be accessible. For information about scholarships and financial assistance, please contact +91-9258159506.",
  
  // School Operations
  school_timings: "School timings are: Primary (Classes I-V): 9:00 AM - 1:00 PM; Secondary (Classes VI-VIII): 9:00 AM - 2:30 PM; Senior Secondary (Classes IX-XII): 9:00 AM - 3:30 PM. For specific details, contact the office.",
  transport: "We offer transportation facilities with well-maintained school buses covering various routes in and around Chandausi. For transport availability and routes, please contact +91-9258159506.",
  calendar: "For our academic calendar, holidays, and important dates, please contact the school office or visit smpschandausi.com.",
  
  // Contact & Location
  address: "SM Education City, Shiv Shakti Nagar, NH-509, Chandausi, Sambhal - 244414, Uttar Pradesh, India.",
  phone: "Phone: +91-9258159506 / +91-9258159507",
  email: "Email: info@smpschandausi.com",
  website: "Website: smpschandausi.com",
  location: "We are located in Chandausi, Sambhal district, Uttar Pradesh, on the NH-509. Our campus is easily accessible and well-connected.",
  
  // Future Plans
  expansion: "SMPS is part of an ongoing Education City initiative by the M.P. Singh Foundation, with plans for expansion and enhancement of facilities to serve more students.",
  
  // Career & Hiring
  careers: "We are always looking for talented educators and support staff. For career opportunities at SMPS, please contact our HR office at +91-9258159506 or email your resume to info@smpschandausi.com.",
  
  // Policies
  dress_code: "Students are required to wear the official school uniform as per our dress code policy. For uniform specifications, please contact the school office.",
  rules: "We maintain comprehensive school rules to ensure a safe, disciplined, and conducive learning environment. These include academic policies, conduct expectations, and disciplinary procedures. For detailed school rules, please visit our office or website.",
  conduct: "We expect students to conduct themselves with integrity, respect, and responsibility both within and outside the school. Disciplinary action will be taken against misconduct as per school policies.",
  
  // Fallback responses
  fallback_uncertain: "I am not entirely sure about that. For specific or detailed information, please contact our school office at +91-9258159506 or email info@smpschandausi.com. Our team will be happy to assist you!",
  fallback_noinfo: "I do not have specific information on that topic in my knowledge base. Please reach out to our school office directly: +91-9258159506 / +91-9258159507 or info@smpschandausi.com.",
}

// Keywords to knowledge base mapping
const keywordMap: Record<string, string[]> = {
  'greeting_hello': ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon'],
  'greeting_hi': ['hi there', 'hi', 'hey'],
  'about_school': ['about smps', 'about school', 'who are you', 'what is smps', 'tell me about'],
  'about_foundation': ['foundation', 'mp singh', 'mp singh foundation', 'trust'],
  'about_sister_schools': ['sister schools', 'other schools', 'delhi public school', 'dps'],
  'mission': ['mission', 'our mission', 'goal'],
  'vision': ['vision', 'our vision'],
  'values': ['values', 'core values', 'principles'],
  'campus_size': ['campus', 'campus size', 'acre', '10 acre', 'facilities'],
  'facilities': ['facilities', 'infrastructure', 'labs', 'library', 'sports'],
  'labs': ['laboratory', 'lab', 'science lab', 'computer lab', 'math lab'],
  'library': ['library', 'books'],
  'sports': ['sports', 'games', 'physical education', 'pe'],
  'extracurricular': ['extracurricular', 'activities', 'clubs', 'cultural'],
  'academics': ['academics', 'education', 'curriculum', 'cbse'],
  'cbse': ['cbse', 'affiliation', 'board'],
  'teacher_ratio': ['teacher', 'ratio', 'teacher student', 'class size'],
  'special_educators': ['special educator', 'counselor', 'support', 'special needs'],
  'admission_process': ['admission', 'admissions', 'apply', 'entrance test', 'enroll'],
  'admission_open': ['admission open', 'when can i apply', 'enrollment'],
  'registration': ['registration', 'register', 'registration process'],
  'fees': ['fee', 'fees', 'cost', 'tuition', 'charges'],
  'fee_payment': ['fee payment', 'payment', 'installment'],
  'scholarships': ['scholarship', 'financial aid', 'discount', 'concession'],
  'school_timings': ['timing', 'timings', 'hours', 'when', 'time', 'open', 'close'],
  'transport': ['transport', 'bus', 'transportation', 'pick up'],
  'calendar': ['calendar', 'holidays', 'vacation', 'dates'],
  'address': ['address', 'location', 'where', 'chandausi'],
  'phone': ['phone', 'contact', 'call', 'mobile', 'number'],
  'email': ['email', 'mail'],
  'website': ['website', 'web', 'online', 'website address'],
  'location': ['location', 'where located', 'sambhal'],
  'expansion': ['expansion', 'education city', 'future', 'plans'],
  'careers': ['career', 'job', 'hiring', 'work', 'employ'],
  'dress_code': ['dress code', 'uniform'],
  'rules': ['rules', 'policies', 'conduct', 'discipline'],
  'conduct': ['conduct', 'behavior', 'discipline'],
}

export function matchKeywordToResponse(userQuery: string): string {
  const query = userQuery.toLowerCase().trim()

  // Try exact key lookups first
  if (knowledgeBase[query]) return knowledgeBase[query]

  // Try keyword matching
  for (const [key, keywords] of Object.entries(keywordMap)) {
    for (const keyword of keywords) {
      if (query.includes(keyword)) {
        return knowledgeBase[key] || knowledgeBase.fallback_uncertain
      }
    }
  }

  // Return fallback
  return knowledgeBase.fallback_noinfo
}
