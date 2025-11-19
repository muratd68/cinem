import {
  Code, Database, BarChart3, Brain, Cpu, GitBranch,
  Terminal, FileCode, Calculator, Layers, Workflow, Table,
  Container, Atom, Server, Ship, Cloud, Zap, FileJson, Palette,
  Eye, MessageSquare
} from 'lucide-react'

export interface CheatSheet {
  id: string
  title: string
  description: string
  icon: any
  href: string
  color: string
  category: string
}

export const cheatsheets: CheatSheet[] = [
  {
    id: 'python',
    title: 'Python',
    description: 'Temel Python syntax, veri tipleri, fonksiyonlar, OOP ve daha fazlasi',
    icon: Code,
    href: '/python',
    color: 'bg-blue-500',
    category: 'Programlama'
  },
  {
    id: 'pandas',
    title: 'Pandas',
    description: 'DataFrame islemleri, filtreleme, gruplama, birlestirme',
    icon: Table,
    href: '/pandas',
    color: 'bg-purple-500',
    category: 'Data Science'
  },
  {
    id: 'numpy',
    title: 'NumPy',
    description: 'Array islemleri, matematiksel fonksiyonlar, lineer cebir',
    icon: Calculator,
    href: '/numpy',
    color: 'bg-cyan-500',
    category: 'Data Science'
  },
  {
    id: 'sql',
    title: 'SQL',
    description: 'SELECT, JOIN, GROUP BY, subqueries ve veritabani islemleri',
    icon: Database,
    href: '/sql',
    color: 'bg-orange-500',
    category: 'Veritabani'
  },
  {
    id: 'matplotlib',
    title: 'Matplotlib',
    description: 'Grafik olusturma, ozellestirme, subplot ve animasyonlar',
    icon: BarChart3,
    href: '/matplotlib',
    color: 'bg-green-500',
    category: 'Gorsellestirme'
  },
  {
    id: 'sklearn',
    title: 'Scikit-learn',
    description: 'Makine ogrenmesi algoritmalari, model egitimi, degerlendirme',
    icon: Brain,
    href: '/sklearn',
    color: 'bg-yellow-500',
    category: 'Machine Learning'
  },
  {
    id: 'tensorflow',
    title: 'TensorFlow',
    description: 'Derin ogrenme, sinir aglari, model olusturma ve egitim',
    icon: Cpu,
    href: '/tensorflow',
    color: 'bg-orange-600',
    category: 'Deep Learning'
  },
  {
    id: 'pytorch',
    title: 'PyTorch',
    description: 'Tensor islemleri, autograd, sinir aglari, GPU hesaplama',
    icon: Layers,
    href: '/pytorch',
    color: 'bg-red-500',
    category: 'Deep Learning'
  },
  {
    id: 'git',
    title: 'Git',
    description: 'Versiyon kontrolu, branch, merge, rebase ve isbirligi',
    icon: GitBranch,
    href: '/git',
    color: 'bg-gray-600',
    category: 'DevOps'
  },
  {
    id: 'linux',
    title: 'Linux',
    description: 'Terminal komutlari, dosya islemleri, sistem yonetimi',
    icon: Terminal,
    href: '/linux',
    color: 'bg-slate-700',
    category: 'DevOps'
  },
  {
    id: 'regex',
    title: 'Regex',
    description: 'Duznenli ifadeler, pattern matching, metin isleme',
    icon: FileCode,
    href: '/regex',
    color: 'bg-pink-500',
    category: 'Programlama'
  },
  {
    id: 'statistics',
    title: 'Istatistik',
    description: 'Tanimlayici istatistik, olasilik, hipotez testleri',
    icon: Workflow,
    href: '/statistics',
    color: 'bg-indigo-500',
    category: 'Data Science'
  },
  {
    id: 'docker',
    title: 'Docker',
    description: 'Container, image yonetimi, Dockerfile, docker-compose',
    icon: Container,
    href: '/docker',
    color: 'bg-blue-600',
    category: 'DevOps'
  },
  {
    id: 'react',
    title: 'React',
    description: 'Components, hooks, state management, event handling',
    icon: Atom,
    href: '/react',
    color: 'bg-cyan-500',
    category: 'Web Development'
  },
  {
    id: 'django',
    title: 'Django',
    description: 'Models, views, templates, forms, ORM',
    icon: Server,
    href: '/django',
    color: 'bg-green-600',
    category: 'Web Development'
  },
  {
    id: 'kubernetes',
    title: 'Kubernetes',
    description: 'kubectl komutlari, pods, deployments, services',
    icon: Ship,
    href: '/kubernetes',
    color: 'bg-blue-600',
    category: 'DevOps'
  },
  {
    id: 'aws',
    title: 'AWS',
    description: 'S3, EC2, Lambda, IAM, RDS, DynamoDB',
    icon: Cloud,
    href: '/aws',
    color: 'bg-orange-500',
    category: 'Cloud'
  },
  {
    id: 'fastapi',
    title: 'FastAPI',
    description: 'Routes, Pydantic, dependencies, middleware',
    icon: Zap,
    href: '/fastapi',
    color: 'bg-teal-500',
    category: 'Web Development'
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    description: 'ES6+, async/await, DOM, array methods',
    icon: FileJson,
    href: '/javascript',
    color: 'bg-yellow-500',
    category: 'Programlama'
  },
  {
    id: 'mongodb',
    title: 'MongoDB',
    description: 'CRUD, aggregation, indexler, query operators',
    icon: Database,
    href: '/mongodb',
    color: 'bg-green-500',
    category: 'Veritabani'
  },
  {
    id: 'css',
    title: 'CSS/Tailwind',
    description: 'Flexbox, grid, responsive, animations',
    icon: Palette,
    href: '/css',
    color: 'bg-blue-400',
    category: 'Web Development'
  },
  {
    id: 'nodejs',
    title: 'Node.js/Express',
    description: 'Backend JavaScript, routing, middleware, API',
    icon: Server,
    href: '/nodejs',
    color: 'bg-green-600',
    category: 'Web Development'
  },
  {
    id: 'vuejs',
    title: 'Vue.js',
    description: 'Composition API, reactivity, components, Pinia',
    icon: Atom,
    href: '/vuejs',
    color: 'bg-emerald-500',
    category: 'Web Development'
  },
  {
    id: 'nextjs',
    title: 'Next.js',
    description: 'App router, SSR, API routes, server actions',
    icon: Layers,
    href: '/nextjs',
    color: 'bg-black',
    category: 'Web Development'
  },
  {
    id: 'postgresql',
    title: 'PostgreSQL',
    description: 'JSONB, window functions, CTE, indexes',
    icon: Database,
    href: '/postgresql',
    color: 'bg-blue-700',
    category: 'Veritabani'
  },
  {
    id: 'redis',
    title: 'Redis',
    description: 'String, hash, list, set, sorted set, pub/sub',
    icon: Database,
    href: '/redis',
    color: 'bg-red-600',
    category: 'Veritabani'
  },
  {
    id: 'terraform',
    title: 'Terraform',
    description: 'IaC, providers, resources, modules, state',
    icon: Cloud,
    href: '/terraform',
    color: 'bg-purple-600',
    category: 'DevOps'
  },
  {
    id: 'ansible',
    title: 'Ansible',
    description: 'Playbooks, roles, inventory, modules, vault',
    icon: Server,
    href: '/ansible',
    color: 'bg-red-500',
    category: 'DevOps'
  },
  {
    id: 'nginx',
    title: 'Nginx',
    description: 'Reverse proxy, SSL, caching, load balancing',
    icon: Server,
    href: '/nginx',
    color: 'bg-green-600',
    category: 'DevOps'
  },
  {
    id: 'github-actions',
    title: 'GitHub Actions',
    description: 'CI/CD, workflows, jobs, matrix, caching',
    icon: GitBranch,
    href: '/github-actions',
    color: 'bg-gray-800',
    category: 'DevOps'
  },
  {
    id: 'pyspark',
    title: 'PySpark',
    description: 'DataFrame, SQL, transformations, aggregations',
    icon: Database,
    href: '/pyspark',
    color: 'bg-orange-500',
    category: 'Data Science'
  },
  {
    id: 'keras',
    title: 'Keras',
    description: 'Sequential, Functional API, layers, callbacks',
    icon: Brain,
    href: '/keras',
    color: 'bg-red-600',
    category: 'Deep Learning'
  },
  {
    id: 'opencv',
    title: 'OpenCV',
    description: 'Image processing, filters, contours, detection',
    icon: Eye,
    href: '/opencv',
    color: 'bg-blue-600',
    category: 'Data Science'
  },
  {
    id: 'nlp',
    title: 'NLP/SpaCy',
    description: 'Tokenization, NER, POS tagging, word vectors',
    icon: MessageSquare,
    href: '/nlp',
    color: 'bg-indigo-600',
    category: 'Data Science'
  }
]

export const categories = [
  'Tumu',
  'Programlama',
  'Data Science',
  'Machine Learning',
  'Deep Learning',
  'Veritabani',
  'Gorsellestirme',
  'DevOps',
  'Cloud',
  'Web Development'
]
