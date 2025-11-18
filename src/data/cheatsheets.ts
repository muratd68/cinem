import {
  Code, Database, BarChart3, Brain, Cpu, GitBranch,
  Terminal, FileCode, Calculator, Layers, Workflow, Table
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
  'DevOps'
]
