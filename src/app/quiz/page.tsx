'use client'

import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { useQuiz, quizData } from '@/context/QuizContext'
import { useToast } from '@/context/ToastContext'
import { Brain, ArrowLeft, CheckCircle, XCircle, Trophy } from 'lucide-react'
import Link from 'next/link'

export default function QuizPage() {
  const { isDark } = useTheme()
  const { addResult, getBestScore } = useQuiz()
  const { showToast } = useToast()
  const [selectedSheet, setSelectedSheet] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])

  const sheets = [
    { id: 'python', name: 'Python', color: 'bg-blue-500' },
    { id: 'pandas', name: 'Pandas', color: 'bg-purple-500' },
    { id: 'sql', name: 'SQL', color: 'bg-orange-500' },
  ]

  const startQuiz = (sheetId: string) => {
    setSelectedSheet(sheetId)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
  }

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(index)

    const questions = quizData[selectedSheet!]
    const isCorrect = index === questions[currentQuestion].correct

    if (isCorrect) {
      setScore(score + 1)
    }
    setAnswers([...answers, isCorrect])
  }

  const nextQuestion = () => {
    const questions = quizData[selectedSheet!]

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      // Quiz finished
      setShowResult(true)
      addResult({
        sheetId: selectedSheet!,
        score: score + (selectedAnswer === questions[currentQuestion].correct ? 1 : 0),
        total: questions.length,
        date: new Date().toISOString()
      })
      showToast('Quiz tamamlandı!', 'success')
    }
  }

  const resetQuiz = () => {
    setSelectedSheet(null)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
  }

  if (showResult && selectedSheet) {
    const questions = quizData[selectedSheet]
    const finalScore = answers.filter(a => a).length
    const percentage = Math.round((finalScore / questions.length) * 100)

    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className={`text-center p-8 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
          <Trophy className={`w-16 h-16 mx-auto mb-4 ${percentage >= 80 ? 'text-yellow-500' : percentage >= 60 ? 'text-gray-400' : 'text-orange-500'}`} />
          <h2 className="text-2xl font-bold mb-2">Quiz Tamamlandı!</h2>
          <p className={`text-4xl font-bold mb-4 ${percentage >= 80 ? 'text-green-500' : percentage >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
            %{percentage}
          </p>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {questions.length} sorudan {finalScore} doğru
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={resetQuiz}
              className={`px-4 py-2 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Geri Dön
            </button>
            <button
              onClick={() => startQuiz(selectedSheet)}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Tekrar Dene
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (selectedSheet) {
    const questions = quizData[selectedSheet]
    const question = questions[currentQuestion]

    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={resetQuiz}
          className={`inline-flex items-center gap-2 mb-6 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
        >
          <ArrowLeft className="w-4 h-4" />
          Geri
        </button>

        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
          {/* Progress */}
          <div className="flex justify-between items-center mb-4">
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Soru {currentQuestion + 1} / {questions.length}
            </span>
            <span className="text-sm text-primary font-medium">
              Skor: {score}
            </span>
          </div>
          <div className={`h-2 rounded-full mb-6 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question */}
          <h3 className="text-lg font-semibold mb-4">{question.question}</h3>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-3 rounded-lg text-left flex items-center gap-3 transition-colors ${
                  selectedAnswer === null
                    ? isDark
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-100 hover:bg-gray-200'
                    : index === question.correct
                      ? 'bg-green-500/20 border-2 border-green-500'
                      : selectedAnswer === index
                        ? 'bg-red-500/20 border-2 border-red-500'
                        : isDark
                          ? 'bg-gray-700'
                          : 'bg-gray-100'
                }`}
              >
                {selectedAnswer !== null && index === question.correct && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {selectedAnswer !== null && selectedAnswer === index && index !== question.correct && (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span>{option}</span>
              </button>
            ))}
          </div>

          {/* Explanation */}
          {selectedAnswer !== null && (
            <div className={`p-4 rounded-lg mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>Açıklama:</strong> {question.explanation}
              </p>
            </div>
          )}

          {/* Next button */}
          {selectedAnswer !== null && (
            <button
              onClick={nextQuestion}
              className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              {currentQuestion < questions.length - 1 ? 'Sonraki Soru' : 'Sonucu Gör'}
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className={`inline-flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-4`}>
          <ArrowLeft className="w-4 h-4" />
          Geri
        </Link>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Quiz Modu</h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Bilgini test et</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sheets.map(sheet => (
          <button
            key={sheet.id}
            onClick={() => startQuiz(sheet.id)}
            className={`p-6 rounded-xl text-left transition-all hover:scale-105 ${
              isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white border border-gray-200 hover:border-primary'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg ${sheet.color} flex items-center justify-center mb-3`}>
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold mb-1">{sheet.name} Quiz</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {quizData[sheet.id]?.length || 0} soru
            </p>
            {getBestScore(sheet.id) > 0 && (
              <p className="text-sm text-primary mt-2">
                En iyi: %{Math.round(getBestScore(sheet.id))}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
