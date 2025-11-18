'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface QuizResult {
  sheetId: string
  score: number
  total: number
  date: string
}

interface QuizContextType {
  results: QuizResult[]
  addResult: (result: QuizResult) => void
  getBestScore: (sheetId: string) => number
  clearResults: () => void
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

export function QuizProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<QuizResult[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('quiz-results')
    if (saved) {
      setResults(JSON.parse(saved))
    }
  }, [])

  const addResult = (result: QuizResult) => {
    const newResults = [...results, result]
    setResults(newResults)
    localStorage.setItem('quiz-results', JSON.stringify(newResults))
  }

  const getBestScore = (sheetId: string) => {
    const sheetResults = results.filter(r => r.sheetId === sheetId)
    if (sheetResults.length === 0) return 0
    return Math.max(...sheetResults.map(r => (r.score / r.total) * 100))
  }

  const clearResults = () => {
    setResults([])
    localStorage.removeItem('quiz-results')
  }

  return (
    <QuizContext.Provider value={{ results, addResult, getBestScore, clearResults }}>
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider')
  }
  return context
}

// Quiz data
export const quizData: Record<string, QuizQuestion[]> = {
  python: [
    {
      id: 'py1',
      question: 'Python\'da liste sonuna eleman eklemek için hangi metod kullanılır?',
      options: ['add()', 'append()', 'insert()', 'push()'],
      correct: 1,
      explanation: 'append() metodu listenin sonuna eleman ekler.'
    },
    {
      id: 'py2',
      question: 'Dictionary\'de key\'e göre değer almak için hangi metod güvenlidir?',
      options: ['dict[key]', 'dict.get(key)', 'dict.fetch(key)', 'dict.value(key)'],
      correct: 1,
      explanation: 'get() metodu key yoksa None döner, KeyError vermez.'
    },
    {
      id: 'py3',
      question: 'List comprehension syntax\'ı hangisidir?',
      options: ['[x for x in list]', '{x for x in list}', '(x for x in list)', '<x for x in list>'],
      correct: 0,
      explanation: 'List comprehension köşeli parantez ile yazılır.'
    },
    {
      id: 'py4',
      question: 'Python\'da decorator tanımlamak için hangi sembol kullanılır?',
      options: ['#', '$', '@', '&'],
      correct: 2,
      explanation: '@ sembolü decorator tanımlamak için kullanılır.'
    },
    {
      id: 'py5',
      question: '__init__ metodu ne işe yarar?',
      options: ['Destructor', 'Constructor', 'Iterator', 'Generator'],
      correct: 1,
      explanation: '__init__ class\'ın constructor metodudur.'
    }
  ],
  pandas: [
    {
      id: 'pd1',
      question: 'DataFrame\'in ilk 5 satırını görmek için hangi metod kullanılır?',
      options: ['first()', 'top()', 'head()', 'begin()'],
      correct: 2,
      explanation: 'head() metodu varsayılan olarak ilk 5 satırı gösterir.'
    },
    {
      id: 'pd2',
      question: 'Eksik verileri doldurmak için hangi metod kullanılır?',
      options: ['fillna()', 'dropna()', 'isna()', 'notna()'],
      correct: 0,
      explanation: 'fillna() eksik değerleri belirtilen değerle doldurur.'
    },
    {
      id: 'pd3',
      question: 'GroupBy sonrası birden fazla aggregation için hangi metod kullanılır?',
      options: ['apply()', 'transform()', 'agg()', 'map()'],
      correct: 2,
      explanation: 'agg() metodu birden fazla aggregation fonksiyonu uygulamak için kullanılır.'
    },
    {
      id: 'pd4',
      question: 'İki DataFrame\'i birleştirmek için SQL-like join yapan fonksiyon hangisidir?',
      options: ['concat()', 'merge()', 'join()', 'append()'],
      correct: 1,
      explanation: 'merge() SQL-style join işlemleri için kullanılır.'
    },
    {
      id: 'pd5',
      question: 'DataFrame\'i CSV olarak kaydetmek için hangi metod kullanılır?',
      options: ['save_csv()', 'write_csv()', 'to_csv()', 'export_csv()'],
      correct: 2,
      explanation: 'to_csv() DataFrame\'i CSV dosyasına kaydeder.'
    }
  ],
  sql: [
    {
      id: 'sql1',
      question: 'Tablodaki tüm kayıtları seçmek için hangi komut kullanılır?',
      options: ['GET * FROM table', 'SELECT * FROM table', 'FETCH * FROM table', 'READ * FROM table'],
      correct: 1,
      explanation: 'SELECT * FROM table tüm kayıtları getirir.'
    },
    {
      id: 'sql2',
      question: 'İki tabloyu ortak sütuna göre birleştirmek için hangi komut kullanılır?',
      options: ['MERGE', 'COMBINE', 'JOIN', 'UNION'],
      correct: 2,
      explanation: 'JOIN iki tabloyu ortak sütuna göre birleştirir.'
    },
    {
      id: 'sql3',
      question: 'GROUP BY sonrası filtreleme için hangi clause kullanılır?',
      options: ['WHERE', 'HAVING', 'FILTER', 'WHEN'],
      correct: 1,
      explanation: 'HAVING GROUP BY sonrası filtreleme yapar.'
    },
    {
      id: 'sql4',
      question: 'Benzersiz değerleri seçmek için hangi keyword kullanılır?',
      options: ['UNIQUE', 'DISTINCT', 'DIFFERENT', 'SINGLE'],
      correct: 1,
      explanation: 'DISTINCT benzersiz değerleri seçer.'
    },
    {
      id: 'sql5',
      question: 'NULL değerleri kontrol etmek için hangi operatör kullanılır?',
      options: ['= NULL', '== NULL', 'IS NULL', 'EQUALS NULL'],
      correct: 2,
      explanation: 'IS NULL operatörü NULL kontrolü için kullanılır.'
    }
  ]
}
