// =============================================================================
// AI SKILL GAP ANALYZER - Main Application Logic
// =============================================================================

// SKILL ALIAS MAP: Maps all variations/acronyms to a single canonical skill name
// Format: "search term" -> "Canonical Skill Name"
const SKILL_ALIASES = {
    // Programming Languages
    "python": "Python",
    "java": "Java",
    "javascript": "JavaScript",
    "js": "JavaScript",
    "typescript": "TypeScript",
    "ts": "TypeScript",
    "golang": "Go",
    "go lang": "Go",
    "go programming": "Go",
    "rust": "Rust",
    "c++": "C++",
    "cpp": "C++",
    "c#": "C#",
    "csharp": "C#",
    "ruby": "Ruby",
    "php": "PHP",
    "swift": "Swift",
    "kotlin": "Kotlin",
    "scala": "Scala",
    
    // Frontend
    "react": "React",
    "react.js": "React",
    "reactjs": "React",
    "angular": "Angular",
    "angularjs": "Angular",
    "vue": "Vue.js",
    "vue.js": "Vue.js",
    "vuejs": "Vue.js",
    "svelte": "Svelte",
    "next.js": "Next.js",
    "nextjs": "Next.js",
    "nuxt": "Nuxt.js",
    "nuxt.js": "Nuxt.js",
    "gatsby": "Gatsby",
    "redux": "Redux",
    "tailwind": "Tailwind CSS",
    "tailwind css": "Tailwind CSS",
    "tailwindcss": "Tailwind CSS",
    "bootstrap": "Bootstrap",
    
    // Backend
    "node": "Node.js",
    "node.js": "Node.js",
    "nodejs": "Node.js",
    "express": "Express.js",
    "express.js": "Express.js",
    "expressjs": "Express.js",
    "django": "Django",
    "flask": "Flask",
    "fastapi": "FastAPI",
    "fast api": "FastAPI",
    "spring boot": "Spring Boot",
    "springboot": "Spring Boot",
    ".net": ".NET",
    "dotnet": ".NET",
    "asp.net": "ASP.NET",
    "ruby on rails": "Ruby on Rails",
    "rails": "Ruby on Rails",
    "laravel": "Laravel",
    "nestjs": "NestJS",
    "nest.js": "NestJS",
    
    // Databases
    "mysql": "MySQL",
    "postgresql": "PostgreSQL",
    "postgres": "PostgreSQL",
    "mongodb": "MongoDB",
    "mongo": "MongoDB",
    "redis": "Redis",
    "elasticsearch": "Elasticsearch",
    "elastic search": "Elasticsearch",
    "sql server": "SQL Server",
    "mssql": "SQL Server",
    "sqlite": "SQLite",
    "dynamodb": "DynamoDB",
    "dynamo db": "DynamoDB",
    "cassandra": "Cassandra",
    "neo4j": "Neo4j",
    "firebase": "Firebase",
    "firestore": "Firestore",
    "mariadb": "MariaDB",
    
    // Cloud Platforms
    "aws": "AWS",
    "amazon web services": "AWS",
    "azure": "Azure",
    "microsoft azure": "Azure",
    "gcp": "Google Cloud",
    "google cloud": "Google Cloud",
    "google cloud platform": "Google Cloud",
    "heroku": "Heroku",
    "digitalocean": "DigitalOcean",
    "digital ocean": "DigitalOcean",
    "cloudflare": "Cloudflare",
    "vercel": "Vercel",
    "netlify": "Netlify",
    
    // DevOps & Infrastructure
    "docker": "Docker",
    "kubernetes": "Kubernetes",
    "k8s": "Kubernetes",
    "terraform": "Terraform",
    "ansible": "Ansible",
    "jenkins": "Jenkins",
    "github actions": "GitHub Actions",
    "gitlab ci": "GitLab CI/CD",
    "gitlab ci/cd": "GitLab CI/CD",
    "circleci": "CircleCI",
    "circle ci": "CircleCI",
    "argocd": "ArgoCD",
    "argo cd": "ArgoCD",
    "helm": "Helm",
    "prometheus": "Prometheus",
    "grafana": "Grafana",
    "elk stack": "ELK Stack",
    "elasticsearch logstash kibana": "ELK Stack",
    "datadog": "Datadog",
    "splunk": "Splunk",
    "ci/cd": "CI/CD",
    "cicd": "CI/CD",
    
    // AI/ML - All variations map to canonical names
    "machine learning": "Machine Learning",
    "ml": "Machine Learning",
    "deep learning": "Deep Learning",
    "dl": "Deep Learning",
    "tensorflow": "TensorFlow",
    "tensor flow": "TensorFlow",
    "pytorch": "PyTorch",
    "py torch": "PyTorch",
    "keras": "Keras",
    "scikit-learn": "Scikit-learn",
    "sklearn": "Scikit-learn",
    "scikit learn": "Scikit-learn",
    "natural language processing": "NLP",
    "nlp": "NLP",
    "computer vision": "Computer Vision",
    "cv": "Computer Vision",
    "neural networks": "Neural Networks",
    "neural network": "Neural Networks",
    "large language models": "LLMs",
    "large language model": "LLMs",
    "llm": "LLMs",
    "llms": "LLMs",
    "gpt": "LLMs",
    "gpt-4": "LLMs",
    "gpt-3": "LLMs",
    "chatgpt": "LLMs",
    "openai": "OpenAI API",
    "openai api": "OpenAI API",
    "hugging face": "Hugging Face",
    "huggingface": "Hugging Face",
    "mlops": "MLOps",
    "ml ops": "MLOps",
    "data science": "Data Science",
    
    // Data Engineering
    "data analysis": "Data Analysis",
    "data analytics": "Data Analysis",
    "data engineering": "Data Engineering",
    "apache spark": "Apache Spark",
    "spark": "Apache Spark",
    "apache kafka": "Apache Kafka",
    "kafka": "Apache Kafka",
    "apache airflow": "Apache Airflow",
    "airflow": "Apache Airflow",
    "databricks": "Databricks",
    "snowflake": "Snowflake",
    "pandas": "Pandas",
    "numpy": "NumPy",
    "etl": "ETL/ELT",
    "elt": "ETL/ELT",
    "data pipeline": "Data Pipelines",
    "data pipelines": "Data Pipelines",
    "dbt": "dbt",
    
    // Security
    "cybersecurity": "Cybersecurity",
    "cyber security": "Cybersecurity",
    "information security": "Cybersecurity",
    "infosec": "Cybersecurity",
    "penetration testing": "Penetration Testing",
    "pen testing": "Penetration Testing",
    "pentest": "Penetration Testing",
    "ethical hacking": "Penetration Testing",
    "oauth": "OAuth/SAML",
    "saml": "OAuth/SAML",
    "identity management": "Identity Management",
    "iam": "Identity Management",
    "network security": "Network Security",
    "application security": "Application Security",
    "appsec": "Application Security",
    "owasp": "OWASP",
    
    // Project Management
    "project management": "Project Management",
    "agile": "Agile",
    "agile methodologies": "Agile",
    "scrum": "Scrum",
    "kanban": "Kanban",
    "jira": "Jira",
    "confluence": "Confluence",
    "asana": "Asana",
    "trello": "Trello",
    
    // Design
    "product design": "Product Design",
    "ui/ux": "UI/UX Design",
    "ui/ux design": "UI/UX Design",
    "ux design": "UI/UX Design",
    "ui design": "UI/UX Design",
    "user experience": "UI/UX Design",
    "user interface": "UI/UX Design",
    "ux research": "UX Research",
    "user research": "UX Research",
    "figma": "Figma",
    "sketch": "Sketch",
    "adobe xd": "Adobe XD",
    "invision": "InVision",
    "wireframing": "Wireframing",
    "prototyping": "Prototyping",
    
    // Enterprise Software
    "salesforce": "Salesforce",
    "sap": "SAP",
    "sap erp": "SAP",
    "servicenow": "ServiceNow",
    "service now": "ServiceNow",
    "workday": "Workday",
    "dynamics 365": "Dynamics 365",
    "tableau": "Tableau",
    "power bi": "Power BI",
    "powerbi": "Power BI",
    "looker": "Looker",
    
    // Mobile
    "ios development": "iOS Development",
    "ios": "iOS Development",
    "android development": "Android Development",
    "android": "Android Development",
    "react native": "React Native",
    "flutter": "Flutter",
    "swiftui": "SwiftUI",
    "swift ui": "SwiftUI",
    "jetpack compose": "Jetpack Compose",
    
    // Blockchain
    "blockchain": "Blockchain",
    "ethereum": "Ethereum",
    "solidity": "Solidity",
    "smart contracts": "Smart Contracts",
    "smart contract": "Smart Contracts",
    "web3": "Web3",
    
    // API & Architecture
    "rest api": "REST APIs",
    "restful api": "REST APIs",
    "restful": "REST APIs",
    "graphql": "GraphQL",
    "graph ql": "GraphQL",
    "microservices": "Microservices",
    "micro services": "Microservices",
    "api development": "API Development",
    "api design": "API Development"
};

// Get unique canonical skill names
const CANONICAL_SKILLS = [...new Set(Object.values(SKILL_ALIASES))];

// Market trends for 2024-2026 (using canonical names)
const MARKET_TRENDS_2024_2026 = [
    "Python", "Machine Learning", "LLMs", "Kubernetes", "AWS", "React", 
    "TypeScript", "Go", "Rust", "Data Engineering", "MLOps", "Cybersecurity",
    "NLP", "Terraform", "API Development", "Microservices", "Docker",
    "PyTorch", "TensorFlow", "Apache Kafka"
];

// DOM Elements
const analyzeBtn = document.getElementById('analyzeBtn');
const projectDocInput = document.getElementById('projectDoc');
const employeeCsvInput = document.getElementById('employeeCsv');
const manualText = document.getElementById('manualText');
const includeMarketTrends = document.getElementById('includeMarketTrends');
const resultsDiv = document.getElementById('results');
const reportContentDiv = document.getElementById('report-content');
const loadingDiv = document.getElementById('loading');
const projectFileName = document.getElementById('projectFileName');
const employeeFileName = document.getElementById('employeeFileName');

// Set up PDF.js worker
if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

// File input change handlers
projectDocInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        projectFileName.textContent = file.name;
        projectDocInput.closest('.upload-box').classList.add('has-file');
    } else {
        projectFileName.textContent = 'No file selected';
        projectDocInput.closest('.upload-box').classList.remove('has-file');
    }
});

employeeCsvInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        employeeFileName.textContent = file.name;
        employeeCsvInput.closest('.upload-box').classList.add('has-file');
    } else {
        employeeFileName.textContent = 'No file selected';
        employeeCsvInput.closest('.upload-box').classList.remove('has-file');
    }
});

// Main analysis function
analyzeBtn.addEventListener('click', async () => {
    const projectFile = projectDocInput.files[0];
    const employeeFile = employeeCsvInput.files[0];
    const manualTextValue = manualText.value.trim();

    // Validation
    if (!projectFile && !manualTextValue) {
        alert("Please upload a project document or paste text in the text area.");
        return;
    }

    if (!employeeFile) {
        alert("Please upload the employee skills CSV file.");
        return;
    }

    // Show loading
    loadingDiv.classList.remove('hidden');
    resultsDiv.classList.add('hidden');

    try {
        // 1. Extract text from project document
        let docText = manualTextValue;
        if (projectFile) {
            docText = await extractTextFromFile(projectFile);
        }

        // 2. Extract skills from the text
        const extractedSkills = extractSkillsFromText(docText);

        // 3. Parse employee skills CSV
        const csvText = await employeeFile.text();
        const { employeeSkills, skillCounts, skillResources, totalEmployees } = parseEmployeeCsv(csvText);
        const companySkills = new Set(Object.keys(skillCounts));

        // 4. Perform the gap analysis
        const projectAnalysis = performGapAnalysis(extractedSkills, companySkills, skillCounts);

        // 5. Market trends analysis (if enabled)
        let marketAnalysis = null;
        if (includeMarketTrends.checked) {
            marketAnalysis = performGapAnalysis(MARKET_TRENDS_2024_2026, companySkills, skillCounts);
        }

        // 6. Display the report
        displayReport({
            projectAnalysis,
            marketAnalysis,
            extractedSkills,
            totalEmployees,
            totalSkillsInCompany: Object.keys(skillCounts).length,
            employeeSkills,
            skillCounts,
            skillResources
        });

    } catch (error) {
        console.error('Analysis error:', error);
        alert('Error analyzing documents: ' + error.message);
    } finally {
        loadingDiv.classList.add('hidden');
    }
});

// Extract text from various file formats
async function extractTextFromFile(file) {
    const fileName = file.name.toLowerCase();
    
    if (fileName.endsWith('.txt')) {
        return await file.text();
    } else if (fileName.endsWith('.pdf')) {
        return await extractTextFromPdf(file);
    } else {
        // Try to read as text
        return await file.text();
    }
}

// Extract text from PDF using PDF.js
async function extractTextFromPdf(file) {
    if (typeof pdfjsLib === 'undefined') {
        throw new Error('PDF.js library not loaded. Please use a .txt file instead.');
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + '\n';
    }
    
    return fullText;
}

// Extract skills from text using alias-based matching
function extractSkillsFromText(text) {
    const foundSkills = new Set();
    const normalizedText = text.toLowerCase();

    // Search for each alias in the text
    for (const [alias, canonicalSkill] of Object.entries(SKILL_ALIASES)) {
        // Escape special regex characters in the alias
        const escapedAlias = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        
        // Use word boundary matching to avoid false positives
        const regex = new RegExp(`\\b${escapedAlias}\\b`, 'i');
        
        if (regex.test(normalizedText)) {
            foundSkills.add(canonicalSkill);
        }
    }

    return Array.from(foundSkills).sort();
}

// Parse employee CSV and normalize skills to canonical names
function parseEmployeeCsv(csvText) {
    const employeeSkills = {};
    const skillCounts = {};
    const skillResources = {}; // NEW: Track employees and experience for each skill
    const lines = csvText.split(/\r?\n/);
    
    // Skip header row and empty lines
    const dataLines = lines.slice(1).filter(line => line.trim());

    dataLines.forEach(line => {
        // Handle potential quoted fields
        let columns;
        if (line.includes('"')) {
            // Simple CSV parsing for quoted fields
            columns = line.match(/(?:^|,)("(?:[^"]*(?:""[^"]*)*)"|[^,]*)/g)
                ?.map(col => col.replace(/^,?"?|"?$/g, '').replace(/""/g, '"'));
        } else {
            columns = line.split(',');
        }

        if (columns && columns.length >= 2) {
            const employee = columns[0].trim();
            let skill = columns[1].trim();
            const yearsExp = columns[2] ? parseInt(columns[2].trim()) || 0 : 0;
            
            // Normalize skill to canonical name if alias exists
            const normalizedSkill = SKILL_ALIASES[skill.toLowerCase()];
            if (normalizedSkill) {
                skill = normalizedSkill;
            }
            
            if (employee && skill) {
                if (!employeeSkills[employee]) {
                    employeeSkills[employee] = [];
                }
                // Avoid duplicates for same employee
                if (!employeeSkills[employee].find(s => s.skill === skill)) {
                    employeeSkills[employee].push({ skill, yearsExp });
                }
                
                // Track resources per skill
                if (!skillResources[skill]) {
                    skillResources[skill] = [];
                }
                // Avoid duplicate entries
                if (!skillResources[skill].find(r => r.name === employee)) {
                    skillResources[skill].push({ name: employee, yearsExp });
                }
                
                skillCounts[skill] = (skillCounts[skill] || 0) + 1;
            }
        }
    });

    return { 
        employeeSkills, 
        skillCounts,
        skillResources,
        totalEmployees: Object.keys(employeeSkills).length 
    };
}

// Perform gap analysis
function performGapAnalysis(requiredSkills, companySkills, skillCounts) {
    const hardGaps = [];     // Skills we don't have at all
    const atRisk = [];       // Skills with low supply (1-2 employees)
    const wellStaffed = [];  // Skills we have good coverage for

    requiredSkills.forEach(skill => {
        const count = skillCounts[skill] || 0;
        const result = { skill, count };

        if (count === 0) {
            hardGaps.push(result);
        } else if (count <= 2) {
            atRisk.push(result);
        } else {
            wellStaffed.push(result);
        }
    });

    // Sort by count (ascending for gaps/risk, descending for well-staffed)
    hardGaps.sort((a, b) => a.skill.localeCompare(b.skill));
    atRisk.sort((a, b) => a.count - b.count);
    wellStaffed.sort((a, b) => b.count - a.count);

    return { hardGaps, atRisk, wellStaffed, total: requiredSkills.length };
}

// Helper function to generate expandable skill row with resources
function generateSkillRow(item, skillResources, cssClass, badgeClass, badgeText) {
    const resources = skillResources[item.skill] || [];
    const avgExp = resources.length > 0 
        ? (resources.reduce((sum, r) => sum + r.yearsExp, 0) / resources.length).toFixed(1)
        : 0;
    
    // Sort resources by experience (highest first)
    const sortedResources = [...resources].sort((a, b) => b.yearsExp - a.yearsExp);
    
    const hasResources = resources.length > 0;
    const skillId = item.skill.replace(/[^a-zA-Z0-9]/g, '_');
    
    return `
        <li class="${cssClass} expandable-skill" data-skill-id="${skillId}">
            <div class="skill-header" onclick="toggleSkillDetails('${skillId}')">
                <span class="skill-name">
                    ${hasResources ? '<span class="expand-icon">▶</span>' : ''}
                    ${item.skill}
                </span>
                <div class="skill-badges">
                    ${hasResources ? `<span class="badge badge-exp">${avgExp} avg yrs</span>` : ''}
                    <span class="badge ${badgeClass}">${badgeText}</span>
                </div>
            </div>
            ${hasResources ? `
                <div class="skill-details hidden" id="details-${skillId}">
                    <table class="resources-table">
                        <thead>
                            <tr>
                                <th>Resource Name</th>
                                <th>Experience</th>
                                <th>Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${sortedResources.map(r => `
                                <tr>
                                    <td>${r.name}</td>
                                    <td>${r.yearsExp} years</td>
                                    <td><span class="exp-level ${getExpLevelClass(r.yearsExp)}">${getExpLevel(r.yearsExp)}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            ` : ''}
        </li>
    `;
}

// Helper to determine experience level
function getExpLevel(years) {
    if (years >= 10) return 'Expert';
    if (years >= 7) return 'Senior';
    if (years >= 4) return 'Mid-Level';
    if (years >= 2) return 'Junior';
    return 'Entry';
}

function getExpLevelClass(years) {
    if (years >= 10) return 'expert';
    if (years >= 7) return 'senior';
    if (years >= 4) return 'mid';
    if (years >= 2) return 'junior';
    return 'entry';
}

// Toggle skill details visibility
function toggleSkillDetails(skillId) {
    const details = document.getElementById(`details-${skillId}`);
    const icon = document.querySelector(`[data-skill-id="${skillId}"] .expand-icon`);
    
    if (details) {
        details.classList.toggle('hidden');
        if (icon) {
            icon.textContent = details.classList.contains('hidden') ? '▶' : '▼';
        }
    }
}

// Make toggleSkillDetails available globally
window.toggleSkillDetails = toggleSkillDetails;

// Display the analysis report
function displayReport(data) {
    const { 
        projectAnalysis, 
        marketAnalysis, 
        extractedSkills, 
        totalEmployees,
        totalSkillsInCompany,
        skillCounts,
        skillResources
    } = data;

    let html = '';

    // Summary Cards
    html += `
        <div class="summary-cards">
            <div class="summary-card danger">
                <span class="number">${projectAnalysis.hardGaps.length}</span>
                <span class="label">Critical Gaps</span>
            </div>
            <div class="summary-card warning">
                <span class="number">${projectAnalysis.atRisk.length}</span>
                <span class="label">At-Risk Skills</span>
            </div>
            <div class="summary-card success">
                <span class="number">${projectAnalysis.wellStaffed.length}</span>
                <span class="label">Well Covered</span>
            </div>
        </div>
    `;

    // Extracted Skills Section
    html += `
        <div class="report-section">
            <h3>🔍 Skills Extracted from Document</h3>
            <p>${extractedSkills.length} skills were identified in your project document:</p>
            <div class="skills-pills">
                ${extractedSkills.map(skill => `<span class="skill-pill">${skill}</span>`).join('')}
            </div>
        </div>
    `;

    // Project Gap Analysis
    html += `
        <div class="report-section">
            <h3>📊 Project Skill Gap Analysis</h3>
            <p>Based on ${totalEmployees} employees with ${totalSkillsInCompany} unique skills in your database. <span class="click-hint">Click on a skill to see resources.</span></p>
            
            <h4><span style="color: var(--danger);">❌</span> Critical Skill Gaps (No Employees)</h4>
            ${projectAnalysis.hardGaps.length > 0 ? `
                <p class="alert-text">These skills are required but <strong>no one in your organization has them</strong>:</p>
                <ul class="skill-list">
                    ${projectAnalysis.hardGaps.map(item => `
                        <li class="gap">
                            <span class="skill-name">${item.skill}</span>
                            <span class="badge badge-danger">MISSING</span>
                        </li>
                    `).join('')}
                </ul>
            ` : '<p style="color: var(--success); font-weight: 600;">✅ Great news! No critical skill gaps found.</p>'}
            
            <h4><span style="color: var(--warning);">⚠️</span> At-Risk Skills (Low Supply)</h4>
            ${projectAnalysis.atRisk.length > 0 ? `
                <p>These skills have very few employees. Click to see who has them:</p>
                <ul class="skill-list">
                    ${projectAnalysis.atRisk.map(item => 
                        generateSkillRow(item, skillResources, 'risk', 'badge-warning', `${item.count} employee${item.count > 1 ? 's' : ''}`)
                    ).join('')}
                </ul>
            ` : '<p>No at-risk skills identified.</p>'}
            
            <h4><span style="color: var(--success);">✅</span> Well-Staffed Skills</h4>
            ${projectAnalysis.wellStaffed.length > 0 ? `
                <p>Click on a skill to see all available resources and their experience levels:</p>
                <ul class="skill-list">
                    ${projectAnalysis.wellStaffed.map(item => 
                        generateSkillRow(item, skillResources, 'ok', 'badge-success', `${item.count} employees`)
                    ).join('')}
                </ul>
            ` : '<p>No well-staffed skills for this project.</p>'}
        </div>
    `;

    // Market Trends Analysis (if enabled)
    if (marketAnalysis) {
        html += `
            <div class="report-section market-trends-report">
                <h3>📈 Market Trends Analysis (2024-2026)</h3>
                <p>How your organization compares to current market demands:</p>
                
                <h4><span style="color: var(--danger);">❌</span> Trending Skills You're Missing</h4>
                ${marketAnalysis.hardGaps.length > 0 ? `
                    <p>These are hot skills in the market that your organization lacks:</p>
                    <ul class="skill-list">
                        ${marketAnalysis.hardGaps.map(item => `
                            <li class="gap">
                                <span class="skill-name">${item.skill}</span>
                                <span class="badge badge-danger">MARKET GAP</span>
                            </li>
                        `).join('')}
                    </ul>
                ` : '<p style="color: var(--success); font-weight: 600;">✅ Excellent! You have coverage for all trending skills.</p>'}
                
                <h4><span style="color: var(--warning);">⚠️</span> Trending Skills with Low Coverage</h4>
                ${marketAnalysis.atRisk.length > 0 ? `
                    <p>Click to see available resources:</p>
                    <ul class="skill-list">
                        ${marketAnalysis.atRisk.map(item => 
                            generateSkillRow(item, skillResources, 'risk', 'badge-warning', `${item.count} employee${item.count > 1 ? 's' : ''}`)
                        ).join('')}
                    </ul>
                ` : '<p>No trending skills at risk.</p>'}
            </div>
        `;
    }

    // Recommendations
    html += generateRecommendations(projectAnalysis, marketAnalysis);

    reportContentDiv.innerHTML = html;
    resultsDiv.classList.remove('hidden');
    
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Generate actionable recommendations
function generateRecommendations(projectAnalysis, marketAnalysis) {
    const recommendations = [];

    if (projectAnalysis.hardGaps.length > 0) {
        const skills = projectAnalysis.hardGaps.slice(0, 3).map(s => s.skill).join(', ');
        recommendations.push(`<strong>Immediate Hiring Need:</strong> Your project requires ${projectAnalysis.hardGaps.length} skill(s) that no one in your organization has. Prioritize hiring or contracting for: ${skills}.`);
    }

    if (projectAnalysis.atRisk.length > 0) {
        recommendations.push(`<strong>Cross-Training Program:</strong> ${projectAnalysis.atRisk.length} skill(s) have dangerously low supply. Consider cross-training existing employees to reduce single points of failure.`);
    }

    if (marketAnalysis && marketAnalysis.hardGaps.length > 0) {
        const trendingSkills = marketAnalysis.hardGaps.slice(0, 3).map(s => s.skill).join(', ');
        recommendations.push(`<strong>Strategic Upskilling:</strong> Your organization is missing ${marketAnalysis.hardGaps.length} trending market skills (${trendingSkills}). Consider investing in training programs to stay competitive.`);
    }

    if (projectAnalysis.wellStaffed.length > 5) {
        recommendations.push(`<strong>Strength Recognition:</strong> Your team has excellent coverage in ${projectAnalysis.wellStaffed.length} skill areas. Consider leveraging this strength for mentorship and knowledge sharing.`);
    }

    if (recommendations.length === 0) {
        recommendations.push(`<strong>Excellent Position:</strong> Your organization appears well-aligned with both project requirements and market trends. Continue investing in skill development to maintain this advantage.`);
    }

    return `
        <div class="recommendations">
            <h4>💡 Recommendations</h4>
            <ul>
                ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>
    `;
}
