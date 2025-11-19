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
  ],
  numpy: [
    {
      id: 'np1',
      question: 'NumPy array oluşturmak için hangi fonksiyon kullanılır?',
      options: ['np.create()', 'np.array()', 'np.make()', 'np.new()'],
      correct: 1,
      explanation: 'np.array() fonksiyonu NumPy array oluşturur.'
    },
    {
      id: 'np2',
      question: 'Sıfırlardan oluşan array için hangi fonksiyon kullanılır?',
      options: ['np.empty()', 'np.zeros()', 'np.null()', 'np.blank()'],
      correct: 1,
      explanation: 'np.zeros() sıfırlardan oluşan array oluşturur.'
    },
    {
      id: 'np3',
      question: 'Array şeklini değiştirmek için hangi metod kullanılır?',
      options: ['shape()', 'resize()', 'reshape()', 'transform()'],
      correct: 2,
      explanation: 'reshape() array şeklini değiştirir.'
    },
    {
      id: 'np4',
      question: 'İki array\'i element-wise çarpmak için hangi operatör kullanılır?',
      options: ['@', '*', '&', 'x'],
      correct: 1,
      explanation: '* operatörü element-wise çarpma yapar.'
    },
    {
      id: 'np5',
      question: 'Array\'in boyutunu öğrenmek için hangi attribute kullanılır?',
      options: ['size', 'length', 'shape', 'dim'],
      correct: 2,
      explanation: 'shape attribute array boyutlarını verir.'
    }
  ],
  matplotlib: [
    {
      id: 'mpl1',
      question: 'Çizgi grafik oluşturmak için hangi fonksiyon kullanılır?',
      options: ['plt.line()', 'plt.plot()', 'plt.draw()', 'plt.graph()'],
      correct: 1,
      explanation: 'plt.plot() çizgi grafik oluşturur.'
    },
    {
      id: 'mpl2',
      question: 'Grafik başlığı eklemek için hangi fonksiyon kullanılır?',
      options: ['plt.name()', 'plt.title()', 'plt.header()', 'plt.label()'],
      correct: 1,
      explanation: 'plt.title() grafik başlığı ekler.'
    },
    {
      id: 'mpl3',
      question: 'Birden fazla grafik için subplot oluşturmak hangi fonksiyonla yapılır?',
      options: ['plt.multi()', 'plt.subplots()', 'plt.grid()', 'plt.panels()'],
      correct: 1,
      explanation: 'plt.subplots() birden fazla subplot oluşturur.'
    },
    {
      id: 'mpl4',
      question: 'Histogram çizmek için hangi fonksiyon kullanılır?',
      options: ['plt.bar()', 'plt.hist()', 'plt.bins()', 'plt.freq()'],
      correct: 1,
      explanation: 'plt.hist() histogram çizer.'
    },
    {
      id: 'mpl5',
      question: 'Grafiği dosyaya kaydetmek için hangi fonksiyon kullanılır?',
      options: ['plt.save()', 'plt.export()', 'plt.savefig()', 'plt.write()'],
      correct: 2,
      explanation: 'plt.savefig() grafiği dosyaya kaydeder.'
    }
  ],
  sklearn: [
    {
      id: 'sk1',
      question: 'Veriyi train/test olarak bölmek için hangi fonksiyon kullanılır?',
      options: ['split_data()', 'train_test_split()', 'divide_data()', 'partition()'],
      correct: 1,
      explanation: 'train_test_split() veriyi train ve test setlerine böler.'
    },
    {
      id: 'sk2',
      question: 'Model eğitmek için hangi metod kullanılır?',
      options: ['train()', 'fit()', 'learn()', 'build()'],
      correct: 1,
      explanation: 'fit() metodu modeli eğitir.'
    },
    {
      id: 'sk3',
      question: 'Tahmin yapmak için hangi metod kullanılır?',
      options: ['predict()', 'forecast()', 'guess()', 'estimate()'],
      correct: 0,
      explanation: 'predict() metodu tahmin yapar.'
    },
    {
      id: 'sk4',
      question: 'Feature scaling için hangi transformer kullanılır?',
      options: ['Normalizer', 'StandardScaler', 'FeatureScaler', 'DataScaler'],
      correct: 1,
      explanation: 'StandardScaler verileri standartlaştırır (mean=0, std=1).'
    },
    {
      id: 'sk5',
      question: 'Cross-validation için hangi fonksiyon kullanılır?',
      options: ['validate()', 'cross_val_score()', 'cv_test()', 'fold_test()'],
      correct: 1,
      explanation: 'cross_val_score() cross-validation yapar.'
    }
  ],
  tensorflow: [
    {
      id: 'tf1',
      question: 'Sequential model oluşturmak için hangi sınıf kullanılır?',
      options: ['tf.Model', 'tf.Sequential', 'keras.Sequential', 'tf.Network'],
      correct: 2,
      explanation: 'keras.Sequential sıralı katmanlardan model oluşturur.'
    },
    {
      id: 'tf2',
      question: 'Dense (fully connected) layer için hangi sınıf kullanılır?',
      options: ['layers.Full', 'layers.Dense', 'layers.FC', 'layers.Linear'],
      correct: 1,
      explanation: 'layers.Dense fully connected layer oluşturur.'
    },
    {
      id: 'tf3',
      question: 'Model derleme için hangi metod kullanılır?',
      options: ['build()', 'compile()', 'setup()', 'prepare()'],
      correct: 1,
      explanation: 'compile() modeli optimizer ve loss ile derler.'
    },
    {
      id: 'tf4',
      question: 'Model eğitimi için hangi metod kullanılır?',
      options: ['train()', 'fit()', 'learn()', 'run()'],
      correct: 1,
      explanation: 'fit() metodu modeli eğitir.'
    },
    {
      id: 'tf5',
      question: 'Classification için yaygın kullanılan activation function hangisidir?',
      options: ['relu', 'sigmoid', 'softmax', 'tanh'],
      correct: 2,
      explanation: 'softmax multi-class classification için kullanılır.'
    }
  ],
  pytorch: [
    {
      id: 'pt1',
      question: 'PyTorch\'ta tensor oluşturmak için hangi fonksiyon kullanılır?',
      options: ['pt.array()', 'torch.tensor()', 'pt.tensor()', 'torch.array()'],
      correct: 1,
      explanation: 'torch.tensor() PyTorch tensor oluşturur.'
    },
    {
      id: 'pt2',
      question: 'GPU\'ya tensor taşımak için hangi metod kullanılır?',
      options: ['to_gpu()', 'cuda()', 'gpu()', 'device()'],
      correct: 1,
      explanation: 'cuda() tensor\'ü GPU\'ya taşır.'
    },
    {
      id: 'pt3',
      question: 'Gradient hesaplamayı devre dışı bırakmak için ne kullanılır?',
      options: ['no_grad()', 'stop_grad()', 'disable_grad()', 'freeze()'],
      correct: 0,
      explanation: 'torch.no_grad() gradient hesaplamayı kapatır.'
    },
    {
      id: 'pt4',
      question: 'Neural network modülü tanımlamak için hangi sınıftan inherit edilir?',
      options: ['nn.Model', 'nn.Module', 'nn.Network', 'nn.Layer'],
      correct: 1,
      explanation: 'nn.Module PyTorch model sınıflarının base class\'ıdır.'
    },
    {
      id: 'pt5',
      question: 'Backpropagation için hangi metod çağrılır?',
      options: ['backprop()', 'backward()', 'gradient()', 'derive()'],
      correct: 1,
      explanation: 'backward() gradient hesaplar.'
    }
  ],
  git: [
    {
      id: 'git1',
      question: 'Yeni repository oluşturmak için hangi komut kullanılır?',
      options: ['git create', 'git new', 'git init', 'git start'],
      correct: 2,
      explanation: 'git init yeni repository oluşturur.'
    },
    {
      id: 'git2',
      question: 'Değişiklikleri staging area\'ya eklemek için hangi komut kullanılır?',
      options: ['git stage', 'git add', 'git put', 'git save'],
      correct: 1,
      explanation: 'git add dosyaları staging area\'ya ekler.'
    },
    {
      id: 'git3',
      question: 'Commit yapmak için hangi komut kullanılır?',
      options: ['git save', 'git commit', 'git push', 'git store'],
      correct: 1,
      explanation: 'git commit değişiklikleri kaydeder.'
    },
    {
      id: 'git4',
      question: 'Yeni branch oluşturmak için hangi komut kullanılır?',
      options: ['git branch', 'git new-branch', 'git create-branch', 'git fork'],
      correct: 0,
      explanation: 'git branch yeni branch oluşturur.'
    },
    {
      id: 'git5',
      question: 'Remote repository\'ye push yapmak için hangi komut kullanılır?',
      options: ['git send', 'git upload', 'git push', 'git sync'],
      correct: 2,
      explanation: 'git push değişiklikleri remote\'a gönderir.'
    }
  ],
  linux: [
    {
      id: 'lnx1',
      question: 'Dosya içeriğini görüntülemek için hangi komut kullanılır?',
      options: ['show', 'cat', 'view', 'print'],
      correct: 1,
      explanation: 'cat dosya içeriğini görüntüler.'
    },
    {
      id: 'lnx2',
      question: 'Dizin değiştirmek için hangi komut kullanılır?',
      options: ['move', 'cd', 'dir', 'goto'],
      correct: 1,
      explanation: 'cd (change directory) dizin değiştirir.'
    },
    {
      id: 'lnx3',
      question: 'Dosya kopyalamak için hangi komut kullanılır?',
      options: ['copy', 'cp', 'duplicate', 'clone'],
      correct: 1,
      explanation: 'cp dosya kopyalar.'
    },
    {
      id: 'lnx4',
      question: 'Dosya silmek için hangi komut kullanılır?',
      options: ['delete', 'rm', 'del', 'erase'],
      correct: 1,
      explanation: 'rm dosya siler.'
    },
    {
      id: 'lnx5',
      question: 'Dosya izinlerini değiştirmek için hangi komut kullanılır?',
      options: ['perm', 'chmod', 'access', 'rights'],
      correct: 1,
      explanation: 'chmod dosya izinlerini değiştirir.'
    }
  ],
  regex: [
    {
      id: 'rgx1',
      question: 'Herhangi bir karakteri temsil eden meta karakter hangisidir?',
      options: ['*', '.', '?', '#'],
      correct: 1,
      explanation: '. (nokta) herhangi bir karakteri temsil eder.'
    },
    {
      id: 'rgx2',
      question: 'Satır başını temsil eden karakter hangisidir?',
      options: ['$', '^', '@', '&'],
      correct: 1,
      explanation: '^ satır başını temsil eder.'
    },
    {
      id: 'rgx3',
      question: '"Bir veya daha fazla" anlamına gelen quantifier hangisidir?',
      options: ['*', '+', '?', '{1}'],
      correct: 1,
      explanation: '+ bir veya daha fazla tekrarı ifade eder.'
    },
    {
      id: 'rgx4',
      question: 'Rakamları temsil eden karakter sınıfı hangisidir?',
      options: ['\\w', '\\d', '\\s', '\\n'],
      correct: 1,
      explanation: '\\d rakamları (0-9) temsil eder.'
    },
    {
      id: 'rgx5',
      question: '"Sıfır veya bir" anlamına gelen quantifier hangisidir?',
      options: ['*', '+', '?', '{0,1}'],
      correct: 2,
      explanation: '? sıfır veya bir tekrarı ifade eder.'
    }
  ],
  statistics: [
    {
      id: 'stat1',
      question: 'Veri setinin ortalaması ne olarak adlandırılır?',
      options: ['Medyan', 'Mod', 'Mean', 'Range'],
      correct: 2,
      explanation: 'Mean (ortalama) tüm değerlerin toplamının sayıya bölümüdür.'
    },
    {
      id: 'stat2',
      question: 'Sıralanmış verinin ortasındaki değer nedir?',
      options: ['Mean', 'Median', 'Mode', 'Variance'],
      correct: 1,
      explanation: 'Median sıralanmış verinin ortasındaki değerdir.'
    },
    {
      id: 'stat3',
      question: 'En sık görülen değer ne olarak adlandırılır?',
      options: ['Mean', 'Median', 'Mode', 'Range'],
      correct: 2,
      explanation: 'Mode en sık görülen değerdir.'
    },
    {
      id: 'stat4',
      question: 'Standart sapmanın karesi nedir?',
      options: ['Mean', 'Median', 'Variance', 'Range'],
      correct: 2,
      explanation: 'Variance standart sapmanın karesidir.'
    },
    {
      id: 'stat5',
      question: 'Korelasyon katsayısının aralığı nedir?',
      options: ['0 ile 1', '-1 ile 1', '0 ile 100', '-∞ ile +∞'],
      correct: 1,
      explanation: 'Korelasyon katsayısı -1 ile 1 arasındadır.'
    }
  ],
  docker: [
    {
      id: 'dkr1',
      question: 'Container çalıştırmak için hangi komut kullanılır?',
      options: ['docker start', 'docker run', 'docker exec', 'docker create'],
      correct: 1,
      explanation: 'docker run yeni container oluşturup çalıştırır.'
    },
    {
      id: 'dkr2',
      question: 'Çalışan container\'ları listelemek için hangi komut kullanılır?',
      options: ['docker list', 'docker ps', 'docker show', 'docker containers'],
      correct: 1,
      explanation: 'docker ps çalışan container\'ları listeler.'
    },
    {
      id: 'dkr3',
      question: 'Image oluşturmak için hangi komut kullanılır?',
      options: ['docker create', 'docker build', 'docker make', 'docker image'],
      correct: 1,
      explanation: 'docker build Dockerfile\'dan image oluşturur.'
    },
    {
      id: 'dkr4',
      question: 'Container\'ı durdurmak için hangi komut kullanılır?',
      options: ['docker kill', 'docker stop', 'docker end', 'docker halt'],
      correct: 1,
      explanation: 'docker stop container\'ı durdurur.'
    },
    {
      id: 'dkr5',
      question: 'docker-compose ile servisleri başlatmak için hangi komut kullanılır?',
      options: ['docker-compose start', 'docker-compose run', 'docker-compose up', 'docker-compose begin'],
      correct: 2,
      explanation: 'docker-compose up servisleri başlatır.'
    }
  ],
  react: [
    {
      id: 'rct1',
      question: 'State yönetimi için hangi hook kullanılır?',
      options: ['useEffect', 'useState', 'useContext', 'useRef'],
      correct: 1,
      explanation: 'useState state yönetimi için kullanılır.'
    },
    {
      id: 'rct2',
      question: 'Side effect\'ler için hangi hook kullanılır?',
      options: ['useState', 'useEffect', 'useMemo', 'useCallback'],
      correct: 1,
      explanation: 'useEffect side effect\'ler için kullanılır.'
    },
    {
      id: 'rct3',
      question: 'JSX\'te JavaScript ifadesi yazmak için ne kullanılır?',
      options: ['( )', '{ }', '[ ]', '< >'],
      correct: 1,
      explanation: 'Süslü parantez { } JavaScript ifadeleri için kullanılır.'
    },
    {
      id: 'rct4',
      question: 'Component\'e dışarıdan veri geçirmek için ne kullanılır?',
      options: ['state', 'props', 'context', 'ref'],
      correct: 1,
      explanation: 'Props component\'e veri geçirmek için kullanılır.'
    },
    {
      id: 'rct5',
      question: 'Memoization için hangi hook kullanılır?',
      options: ['useState', 'useEffect', 'useMemo', 'useRef'],
      correct: 2,
      explanation: 'useMemo hesaplamaları memoize eder.'
    }
  ],
  django: [
    {
      id: 'dj1',
      question: 'Django projesi oluşturmak için hangi komut kullanılır?',
      options: ['django new', 'django-admin startproject', 'django create', 'django init'],
      correct: 1,
      explanation: 'django-admin startproject yeni proje oluşturur.'
    },
    {
      id: 'dj2',
      question: 'Migration oluşturmak için hangi komut kullanılır?',
      options: ['makemigrations', 'migrate', 'syncdb', 'createdb'],
      correct: 0,
      explanation: 'makemigrations model değişikliklerinden migration oluşturur.'
    },
    {
      id: 'dj3',
      question: 'Tüm kayıtları almak için hangi QuerySet metodu kullanılır?',
      options: ['get()', 'all()', 'filter()', 'select()'],
      correct: 1,
      explanation: 'all() tüm kayıtları döner.'
    },
    {
      id: 'dj4',
      question: 'Template\'te değişken göstermek için ne kullanılır?',
      options: ['<% var %>', '{{ var }}', '[[ var ]]', '<< var >>'],
      correct: 1,
      explanation: '{{ }} template değişkenleri için kullanılır.'
    },
    {
      id: 'dj5',
      question: 'Form doğrulama için hangi metod kullanılır?',
      options: ['validate()', 'is_valid()', 'check()', 'verify()'],
      correct: 1,
      explanation: 'is_valid() form doğrulaması yapar.'
    }
  ],
  kubernetes: [
    {
      id: 'k8s1',
      question: 'Tüm pod\'ları listelemek için hangi komut kullanılır?',
      options: ['kubectl list pods', 'kubectl get pods', 'kubectl show pods', 'kubectl pods'],
      correct: 1,
      explanation: 'kubectl get pods tüm pod\'ları listeler.'
    },
    {
      id: 'k8s2',
      question: 'YAML dosyasından kaynak oluşturmak için hangi komut kullanılır?',
      options: ['kubectl create', 'kubectl apply', 'kubectl deploy', 'kubectl run'],
      correct: 1,
      explanation: 'kubectl apply -f YAML dosyasından kaynak oluşturur.'
    },
    {
      id: 'k8s3',
      question: 'Pod loglarını görmek için hangi komut kullanılır?',
      options: ['kubectl log', 'kubectl logs', 'kubectl output', 'kubectl print'],
      correct: 1,
      explanation: 'kubectl logs pod loglarını gösterir.'
    },
    {
      id: 'k8s4',
      question: 'Pod\'a terminal bağlantısı için hangi komut kullanılır?',
      options: ['kubectl connect', 'kubectl exec', 'kubectl ssh', 'kubectl attach'],
      correct: 1,
      explanation: 'kubectl exec -it pod\'da komut çalıştırır.'
    },
    {
      id: 'k8s5',
      question: 'Deployment ölçeklendirmek için hangi komut kullanılır?',
      options: ['kubectl resize', 'kubectl scale', 'kubectl replicas', 'kubectl expand'],
      correct: 1,
      explanation: 'kubectl scale replica sayısını değiştirir.'
    }
  ],
  aws: [
    {
      id: 'aws1',
      question: 'S3 bucket\'larını listelemek için hangi komut kullanılır?',
      options: ['aws s3 list', 'aws s3 ls', 'aws s3 show', 'aws s3 buckets'],
      correct: 1,
      explanation: 'aws s3 ls bucket\'ları listeler.'
    },
    {
      id: 'aws2',
      question: 'EC2 instance\'larını listelemek için hangi komut kullanılır?',
      options: ['aws ec2 list', 'aws ec2 describe-instances', 'aws ec2 show', 'aws ec2 get'],
      correct: 1,
      explanation: 'aws ec2 describe-instances instance\'ları listeler.'
    },
    {
      id: 'aws3',
      question: 'Lambda fonksiyonu çağırmak için hangi komut kullanılır?',
      options: ['aws lambda call', 'aws lambda invoke', 'aws lambda run', 'aws lambda exec'],
      correct: 1,
      explanation: 'aws lambda invoke fonksiyonu çağırır.'
    },
    {
      id: 'aws4',
      question: 'S3\'e dosya yüklemek için hangi komut kullanılır?',
      options: ['aws s3 upload', 'aws s3 cp', 'aws s3 put', 'aws s3 send'],
      correct: 1,
      explanation: 'aws s3 cp dosya kopyalar/yükler.'
    },
    {
      id: 'aws5',
      question: 'IAM kullanıcılarını listelemek için hangi komut kullanılır?',
      options: ['aws iam users', 'aws iam list-users', 'aws iam get-users', 'aws iam show-users'],
      correct: 1,
      explanation: 'aws iam list-users kullanıcıları listeler.'
    }
  ],
  fastapi: [
    {
      id: 'fa1',
      question: 'GET endpoint tanımlamak için hangi decorator kullanılır?',
      options: ['@app.route', '@app.get', '@get', '@router.get'],
      correct: 1,
      explanation: '@app.get() GET endpoint tanımlar.'
    },
    {
      id: 'fa2',
      question: 'Request body için veri modeli oluşturmak için ne kullanılır?',
      options: ['dataclass', 'BaseModel', 'Schema', 'Model'],
      correct: 1,
      explanation: 'Pydantic BaseModel request/response modelleri için kullanılır.'
    },
    {
      id: 'fa3',
      question: 'Path parameter tanımlamak için ne kullanılır?',
      options: ['{param}', ':param', '<param>', '[param]'],
      correct: 0,
      explanation: 'Süslü parantez {param} path parameter tanımlar.'
    },
    {
      id: 'fa4',
      question: 'Dependency injection için hangi fonksiyon kullanılır?',
      options: ['Inject()', 'Depends()', 'Require()', 'Need()'],
      correct: 1,
      explanation: 'Depends() dependency injection sağlar.'
    },
    {
      id: 'fa5',
      question: 'FastAPI uygulaması çalıştırmak için genelde hangi server kullanılır?',
      options: ['gunicorn', 'uvicorn', 'nginx', 'apache'],
      correct: 1,
      explanation: 'uvicorn ASGI server olarak kullanılır.'
    }
  ],
  javascript: [
    {
      id: 'js1',
      question: 'Sabit değişken tanımlamak için hangi keyword kullanılır?',
      options: ['var', 'let', 'const', 'static'],
      correct: 2,
      explanation: 'const sabit değişken tanımlar.'
    },
    {
      id: 'js2',
      question: 'Arrow function syntax\'ı hangisidir?',
      options: ['function() {}', '() => {}', '-> {}', 'fn() {}'],
      correct: 1,
      explanation: '() => {} arrow function syntax\'ıdır.'
    },
    {
      id: 'js3',
      question: 'Array\'e eleman eklemek için hangi metod kullanılır?',
      options: ['add()', 'append()', 'push()', 'insert()'],
      correct: 2,
      explanation: 'push() array sonuna eleman ekler.'
    },
    {
      id: 'js4',
      question: 'Promise beklemek için hangi keyword kullanılır?',
      options: ['wait', 'await', 'async', 'then'],
      correct: 1,
      explanation: 'await Promise\'in resolve olmasını bekler.'
    },
    {
      id: 'js5',
      question: 'Destructuring assignment için hangi syntax kullanılır?',
      options: ['[a, b] = arr', '(a, b) = arr', '<a, b> = arr', '{a, b} = obj'],
      correct: 3,
      explanation: '{} object destructuring, [] array destructuring için kullanılır.'
    }
  ],
  mongodb: [
    {
      id: 'mdb1',
      question: 'Tek doküman eklemek için hangi metod kullanılır?',
      options: ['insert()', 'insertOne()', 'add()', 'create()'],
      correct: 1,
      explanation: 'insertOne() tek doküman ekler.'
    },
    {
      id: 'mdb2',
      question: 'Tüm dokümanları bulmak için hangi metod kullanılır?',
      options: ['findAll()', 'find()', 'get()', 'select()'],
      correct: 1,
      explanation: 'find() dokümanları bulur.'
    },
    {
      id: 'mdb3',
      question: 'Büyüktür operatörü hangisidir?',
      options: ['$greater', '$gt', '$more', '$>'],
      correct: 1,
      explanation: '$gt (greater than) büyüktür operatörüdür.'
    },
    {
      id: 'mdb4',
      question: 'Doküman güncellemek için hangi metod kullanılır?',
      options: ['update()', 'updateOne()', 'modify()', 'change()'],
      correct: 1,
      explanation: 'updateOne() tek doküman günceller.'
    },
    {
      id: 'mdb5',
      question: 'Aggregation pipeline başlatmak için hangi metod kullanılır?',
      options: ['pipe()', 'aggregate()', 'pipeline()', 'process()'],
      correct: 1,
      explanation: 'aggregate() aggregation pipeline başlatır.'
    }
  ],
  css: [
    {
      id: 'css1',
      question: 'Flexbox container oluşturmak için hangi property kullanılır?',
      options: ['display: block', 'display: flex', 'display: grid', 'display: inline'],
      correct: 1,
      explanation: 'display: flex flexbox container oluşturur.'
    },
    {
      id: 'css2',
      question: 'Tailwind\'de padding için hangi prefix kullanılır?',
      options: ['pad-', 'p-', 'padding-', 'pd-'],
      correct: 1,
      explanation: 'p- prefix\'i padding için kullanılır (örn: p-4).'
    },
    {
      id: 'css3',
      question: 'CSS Grid\'de sütun tanımlamak için hangi property kullanılır?',
      options: ['grid-columns', 'grid-template-columns', 'columns', 'grid-cols'],
      correct: 1,
      explanation: 'grid-template-columns sütunları tanımlar.'
    },
    {
      id: 'css4',
      question: 'Tailwind\'de responsive breakpoint prefix\'i hangisidir?',
      options: ['@media:', 'responsive:', 'md:', 'bp:'],
      correct: 2,
      explanation: 'md:, lg:, xl: gibi prefix\'ler responsive için kullanılır.'
    },
    {
      id: 'css5',
      question: 'Flexbox\'ta öğeleri dikey ortlamak için hangi property kullanılır?',
      options: ['justify-content', 'align-items', 'align-content', 'vertical-align'],
      correct: 1,
      explanation: 'align-items öğeleri dikey eksende hizalar.'
    }
  ],
  nodejs: [
    {
      id: 'node1',
      question: 'Express\'te middleware eklemek için hangi metod kullanılır?',
      options: ['app.middleware()', 'app.use()', 'app.add()', 'app.register()'],
      correct: 1,
      explanation: 'app.use() middleware eklemek için kullanılır.'
    },
    {
      id: 'node2',
      question: 'Request body\'yi parse etmek için hangi middleware kullanılır?',
      options: ['express.body()', 'express.json()', 'express.parse()', 'express.data()'],
      correct: 1,
      explanation: 'express.json() JSON body\'yi parse eder.'
    },
    {
      id: 'node3',
      question: 'Route parametresine nasıl erişilir?',
      options: ['req.body', 'req.params', 'req.query', 'req.route'],
      correct: 1,
      explanation: 'req.params route parametrelerini içerir.'
    },
    {
      id: 'node4',
      question: 'JSON response göndermek için hangi metod kullanılır?',
      options: ['res.send()', 'res.json()', 'res.write()', 'res.data()'],
      correct: 1,
      explanation: 'res.json() JSON response gönderir.'
    },
    {
      id: 'node5',
      question: 'Environment variable\'a nasıl erişilir?',
      options: ['env.VAR', 'process.env.VAR', 'node.env.VAR', 'config.VAR'],
      correct: 1,
      explanation: 'process.env environment variable\'lara erişim sağlar.'
    }
  ],
  vuejs: [
    {
      id: 'vue1',
      question: 'Reactive state tanımlamak için hangi fonksiyon kullanılır?',
      options: ['reactive()', 'ref()', 'state()', 'Both ref() and reactive()'],
      correct: 3,
      explanation: 'ref() primitive, reactive() object için kullanılır.'
    },
    {
      id: 'vue2',
      question: 'Computed property tanımlamak için hangi fonksiyon kullanılır?',
      options: ['watch()', 'computed()', 'memo()', 'derive()'],
      correct: 1,
      explanation: 'computed() computed property tanımlar.'
    },
    {
      id: 'vue3',
      question: 'Event dinlemek için hangi directive kullanılır?',
      options: ['v-on / @', 'v-bind / :', 'v-model', 'v-event'],
      correct: 0,
      explanation: 'v-on veya @ shorthand event listener ekler.'
    },
    {
      id: 'vue4',
      question: 'Two-way binding için hangi directive kullanılır?',
      options: ['v-bind', 'v-on', 'v-model', 'v-sync'],
      correct: 2,
      explanation: 'v-model two-way data binding sağlar.'
    },
    {
      id: 'vue5',
      question: 'Component mount olduktan sonra çalışan hook hangisidir?',
      options: ['onCreated', 'onMounted', 'onReady', 'onInit'],
      correct: 1,
      explanation: 'onMounted component DOM\'a eklendikten sonra çalışır.'
    }
  ],
  nextjs: [
    {
      id: 'next1',
      question: 'Client component olduğunu belirtmek için ne kullanılır?',
      options: ['"use server"', '"use client"', 'export client', '@client'],
      correct: 1,
      explanation: '"use client" directive client component tanımlar.'
    },
    {
      id: 'next2',
      question: 'API route tanımlamak için hangi dosya adı kullanılır?',
      options: ['api.ts', 'route.ts', 'handler.ts', 'endpoint.ts'],
      correct: 1,
      explanation: 'route.ts API route handler dosyasıdır.'
    },
    {
      id: 'next3',
      question: 'Static page generation için hangi fetch cache kullanılır?',
      options: ['no-store', 'force-cache', 'revalidate', 'static'],
      correct: 1,
      explanation: 'force-cache (default) static generation yapar.'
    },
    {
      id: 'next4',
      question: 'Loading UI için hangi dosya kullanılır?',
      options: ['loader.tsx', 'loading.tsx', 'spinner.tsx', 'wait.tsx'],
      correct: 1,
      explanation: 'loading.tsx Suspense fallback olarak kullanılır.'
    },
    {
      id: 'next5',
      question: 'Programmatic navigation için hangi hook kullanılır?',
      options: ['useNavigate', 'useRouter', 'useHistory', 'useLocation'],
      correct: 1,
      explanation: 'useRouter programmatic navigation sağlar.'
    }
  ],
  postgresql: [
    {
      id: 'pg1',
      question: 'JSONB veri tipinin JSON\'dan farkı nedir?',
      options: ['Daha yavaş', 'Binary format, daha hızlı', 'Text format', 'Compressed'],
      correct: 1,
      explanation: 'JSONB binary format olup sorgulamada daha hızlıdır.'
    },
    {
      id: 'pg2',
      question: 'Window function için hangi clause kullanılır?',
      options: ['GROUP BY', 'OVER', 'PARTITION', 'WINDOW'],
      correct: 1,
      explanation: 'OVER clause window function tanımlar.'
    },
    {
      id: 'pg3',
      question: 'CTE (Common Table Expression) için hangi keyword kullanılır?',
      options: ['CREATE', 'WITH', 'DEFINE', 'DECLARE'],
      correct: 1,
      explanation: 'WITH clause CTE tanımlar.'
    },
    {
      id: 'pg4',
      question: 'JSONB içinde key kontrolü için hangi operatör kullanılır?',
      options: ['@>', '?', '->', '->'],
      correct: 1,
      explanation: '? operatörü key varlığını kontrol eder.'
    },
    {
      id: 'pg5',
      question: 'Array içinde eleman aramak için hangi keyword kullanılır?',
      options: ['IN', 'ANY', 'CONTAINS', 'HAS'],
      correct: 1,
      explanation: 'ANY array içinde eleman arar.'
    }
  ],
  redis: [
    {
      id: 'redis1',
      question: 'Key-value set etmek için hangi komut kullanılır?',
      options: ['PUT', 'SET', 'INSERT', 'ADD'],
      correct: 1,
      explanation: 'SET key-value çifti kaydeder.'
    },
    {
      id: 'redis2',
      question: 'Hash field set etmek için hangi komut kullanılır?',
      options: ['HSET', 'HADD', 'HPUT', 'HINSERT'],
      correct: 0,
      explanation: 'HSET hash field\'ı set eder.'
    },
    {
      id: 'redis3',
      question: 'Liste başına eleman eklemek için hangi komut kullanılır?',
      options: ['LADD', 'LPUSH', 'LINSERT', 'LPREPEND'],
      correct: 1,
      explanation: 'LPUSH liste başına eleman ekler.'
    },
    {
      id: 'redis4',
      question: 'Key için expiration set etmek için hangi komut kullanılır?',
      options: ['TTL', 'EXPIRE', 'TIMEOUT', 'SETEX'],
      correct: 1,
      explanation: 'EXPIRE key için timeout belirler.'
    },
    {
      id: 'redis5',
      question: 'Sorted set\'e score ile eleman eklemek için hangi komut kullanılır?',
      options: ['SADD', 'ZADD', 'SSET', 'ZSET'],
      correct: 1,
      explanation: 'ZADD sorted set\'e eleman ekler.'
    }
  ],
  terraform: [
    {
      id: 'tf1',
      question: 'Terraform projesi başlatmak için hangi komut kullanılır?',
      options: ['terraform start', 'terraform init', 'terraform new', 'terraform create'],
      correct: 1,
      explanation: 'terraform init projeyi initialize eder.'
    },
    {
      id: 'tf2',
      question: 'Değişiklikleri önizlemek için hangi komut kullanılır?',
      options: ['terraform preview', 'terraform plan', 'terraform show', 'terraform diff'],
      correct: 1,
      explanation: 'terraform plan değişiklikleri gösterir.'
    },
    {
      id: 'tf3',
      question: 'Kaynakları silmek için hangi komut kullanılır?',
      options: ['terraform delete', 'terraform destroy', 'terraform remove', 'terraform clean'],
      correct: 1,
      explanation: 'terraform destroy kaynakları siler.'
    },
    {
      id: 'tf4',
      question: 'Variable tanımlamak için hangi blok kullanılır?',
      options: ['var', 'variable', 'input', 'param'],
      correct: 1,
      explanation: 'variable bloğu değişken tanımlar.'
    },
    {
      id: 'tf5',
      question: 'Birden fazla kaynak oluşturmak için ne kullanılır?',
      options: ['loop', 'count/for_each', 'repeat', 'multiple'],
      correct: 1,
      explanation: 'count veya for_each multiple resource oluşturur.'
    }
  ],
  ansible: [
    {
      id: 'ansible1',
      question: 'Ansible playbook çalıştırmak için hangi komut kullanılır?',
      options: ['ansible run', 'ansible-playbook', 'ansible play', 'ansible execute'],
      correct: 1,
      explanation: 'ansible-playbook komutu playbook dosyalarını çalıştırır.'
    },
    {
      id: 'ansible2',
      question: 'Şifreli dosya oluşturmak için hangi komut kullanılır?',
      options: ['ansible-encrypt', 'ansible-vault', 'ansible-secret', 'ansible-crypt'],
      correct: 1,
      explanation: 'ansible-vault dosyaları şifrelemek için kullanılır.'
    },
    {
      id: 'ansible3',
      question: 'Task sonucunu saklamak için hangi anahtar kelime kullanılır?',
      options: ['save', 'store', 'register', 'capture'],
      correct: 2,
      explanation: 'register task çıktısını bir değişkende saklar.'
    },
    {
      id: 'ansible4',
      question: 'Koşullu task çalıştırmak için hangi anahtar kelime kullanılır?',
      options: ['if', 'when', 'condition', 'check'],
      correct: 1,
      explanation: 'when koşullu task çalıştırma için kullanılır.'
    },
    {
      id: 'ansible5',
      question: 'Role bağımlılıklarını tanımlamak için hangi dosya kullanılır?',
      options: ['requirements.yml', 'dependencies.yml', 'meta/main.yml', 'roles.yml'],
      correct: 2,
      explanation: 'meta/main.yml role bağımlılıklarını tanımlar.'
    }
  ],
  nginx: [
    {
      id: 'nginx1',
      question: 'Konfigürasyonu test etmek için hangi komut kullanılır?',
      options: ['nginx -c', 'nginx -t', 'nginx -v', 'nginx -s'],
      correct: 1,
      explanation: 'nginx -t konfigürasyonu test eder.'
    },
    {
      id: 'nginx2',
      question: 'Reverse proxy için hangi directive kullanılır?',
      options: ['proxy_to', 'proxy_pass', 'forward_to', 'upstream'],
      correct: 1,
      explanation: 'proxy_pass backend\'e yönlendirir.'
    },
    {
      id: 'nginx3',
      question: 'Location block için exact match nasıl yapılır?',
      options: ['location /', 'location =', 'location ~', 'location ^~'],
      correct: 1,
      explanation: '= prefix exact match yapar.'
    },
    {
      id: 'nginx4',
      question: 'SSL sertifikası tanımlamak için hangi directive kullanılır?',
      options: ['ssl_cert', 'ssl_certificate', 'certificate', 'https_cert'],
      correct: 1,
      explanation: 'ssl_certificate sertifika dosyasını belirtir.'
    },
    {
      id: 'nginx5',
      question: 'Konfigürasyonu yeniden yüklemek için hangi sinyal kullanılır?',
      options: ['nginx -s restart', 'nginx -s reload', 'nginx -s refresh', 'nginx -s update'],
      correct: 1,
      explanation: 'nginx -s reload konfigürasyonu yeniden yükler.'
    }
  ],
  'github-actions': [
    {
      id: 'gha1',
      question: 'Workflow dosyaları nerede bulunur?',
      options: ['.github/actions/', '.github/workflows/', '.workflows/', 'actions/'],
      correct: 1,
      explanation: '.github/workflows/ dizininde YAML dosyaları bulunur.'
    },
    {
      id: 'gha2',
      question: 'Manuel tetikleme için hangi event kullanılır?',
      options: ['manual', 'workflow_dispatch', 'trigger', 'on_demand'],
      correct: 1,
      explanation: 'workflow_dispatch manuel tetikleme sağlar.'
    },
    {
      id: 'gha3',
      question: 'Secret\'a nasıl erişilir?',
      options: ['env.SECRET', 'secrets.SECRET', 'github.secret.SECRET', 'vars.SECRET'],
      correct: 1,
      explanation: '${{ secrets.NAME }} syntax\'ı ile erişilir.'
    },
    {
      id: 'gha4',
      question: 'Job bağımlılığı tanımlamak için ne kullanılır?',
      options: ['depends', 'needs', 'requires', 'after'],
      correct: 1,
      explanation: 'needs diğer job\'ların tamamlanmasını bekler.'
    },
    {
      id: 'gha5',
      question: 'Matrix strategy ne işe yarar?',
      options: ['Parallel jobs', 'Multiple configurations', 'Load balancing', 'Caching'],
      correct: 1,
      explanation: 'Matrix farklı konfigürasyonlarla test eder.'
    }
  ],
  pyspark: [
    {
      id: 'spark1',
      question: 'SparkSession oluşturmak için hangi metod kullanılır?',
      options: ['SparkSession.create()', 'SparkSession.builder.getOrCreate()', 'SparkSession.new()', 'SparkSession.start()'],
      correct: 1,
      explanation: 'builder.getOrCreate() SparkSession oluşturur.'
    },
    {
      id: 'spark2',
      question: 'DataFrame filtrelemek için hangi metod kullanılır?',
      options: ['select()', 'filter() / where()', 'query()', 'find()'],
      correct: 1,
      explanation: 'filter() veya where() satır filtreler.'
    },
    {
      id: 'spark3',
      question: 'GroupBy sonrası aggregation için hangi metod kullanılır?',
      options: ['aggregate()', 'agg()', 'summarize()', 'compute()'],
      correct: 1,
      explanation: 'agg() multiple aggregation uygular.'
    },
    {
      id: 'spark4',
      question: 'Yeni kolon eklemek için hangi metod kullanılır?',
      options: ['addColumn()', 'withColumn()', 'newColumn()', 'createColumn()'],
      correct: 1,
      explanation: 'withColumn() yeni kolon ekler veya günceller.'
    },
    {
      id: 'spark5',
      question: 'SQL sorgusu çalıştırmak için ne kullanılır?',
      options: ['df.sql()', 'spark.sql()', 'execute()', 'query()'],
      correct: 1,
      explanation: 'spark.sql() SQL sorgusu çalıştırır.'
    }
  ],
  keras: [
    {
      id: 'keras1',
      question: 'Sequential model\'e layer eklemek için hangi metod kullanılır?',
      options: ['insert()', 'add()', 'append()', 'push()'],
      correct: 1,
      explanation: 'add() metodu layer ekler.'
    },
    {
      id: 'keras2',
      question: 'Model derlemek için hangi metod kullanılır?',
      options: ['build()', 'compile()', 'setup()', 'configure()'],
      correct: 1,
      explanation: 'compile() optimizer ve loss tanımlar.'
    },
    {
      id: 'keras3',
      question: 'Model eğitmek için hangi metod kullanılır?',
      options: ['train()', 'fit()', 'learn()', 'run()'],
      correct: 1,
      explanation: 'fit() modeli eğitir.'
    },
    {
      id: 'keras4',
      question: 'Early stopping için hangi callback kullanılır?',
      options: ['StopTraining', 'EarlyStopping', 'EarlyStop', 'TrainingStop'],
      correct: 1,
      explanation: 'EarlyStopping overfitting\'i önler.'
    },
    {
      id: 'keras5',
      question: 'Fully connected layer için hangi class kullanılır?',
      options: ['layers.Full', 'layers.Dense', 'layers.Linear', 'layers.FC'],
      correct: 1,
      explanation: 'Dense fully connected layer oluşturur.'
    }
  ],
  opencv: [
    {
      id: 'cv1',
      question: 'Görüntü okumak için hangi fonksiyon kullanılır?',
      options: ['cv2.read()', 'cv2.imread()', 'cv2.load()', 'cv2.open()'],
      correct: 1,
      explanation: 'cv2.imread() görüntü dosyası okur.'
    },
    {
      id: 'cv2',
      question: 'BGR\'dan grayscale\'e dönüşüm için ne kullanılır?',
      options: ['cv2.gray()', 'cv2.cvtColor()', 'cv2.convert()', 'cv2.toBW()'],
      correct: 1,
      explanation: 'cv2.cvtColor() renk dönüşümü yapar.'
    },
    {
      id: 'cv3',
      question: 'Kenar tespiti için hangi fonksiyon kullanılır?',
      options: ['cv2.edges()', 'cv2.Canny()', 'cv2.detect()', 'cv2.findEdges()'],
      correct: 1,
      explanation: 'cv2.Canny() kenar tespiti yapar.'
    },
    {
      id: 'cv4',
      question: 'Görüntü boyutunu değiştirmek için hangi fonksiyon kullanılır?',
      options: ['cv2.scale()', 'cv2.resize()', 'cv2.reshape()', 'cv2.transform()'],
      correct: 1,
      explanation: 'cv2.resize() görüntü boyutunu değiştirir.'
    },
    {
      id: 'cv5',
      question: 'Kontur bulmak için hangi fonksiyon kullanılır?',
      options: ['cv2.contours()', 'cv2.findContours()', 'cv2.getContours()', 'cv2.detectContours()'],
      correct: 1,
      explanation: 'cv2.findContours() konturları bulur.'
    }
  ],
  nlp: [
    {
      id: 'nlp1',
      question: 'SpaCy\'de model yüklemek için hangi fonksiyon kullanılır?',
      options: ['spacy.get()', 'spacy.load()', 'spacy.model()', 'spacy.import()'],
      correct: 1,
      explanation: 'spacy.load() dil modelini yükler.'
    },
    {
      id: 'nlp2',
      question: 'Named Entity Recognition sonuçlarına nasıl erişilir?',
      options: ['doc.entities', 'doc.ents', 'doc.ner', 'doc.names'],
      correct: 1,
      explanation: 'doc.ents entity\'leri içerir.'
    },
    {
      id: 'nlp3',
      question: 'Token\'ın kökünü almak için hangi attribute kullanılır?',
      options: ['token.root', 'token.lemma_', 'token.stem', 'token.base'],
      correct: 1,
      explanation: 'token.lemma_ lemmatize edilmiş formu verir.'
    },
    {
      id: 'nlp4',
      question: 'Part-of-speech tag\'ına nasıl erişilir?',
      options: ['token.tag', 'token.pos_', 'token.part', 'token.speech'],
      correct: 1,
      explanation: 'token.pos_ POS tag\'ını verir.'
    },
    {
      id: 'nlp5',
      question: 'Stop word kontrolü için hangi attribute kullanılır?',
      options: ['token.stop', 'token.is_stop', 'token.stopword', 'token.is_common'],
      correct: 1,
      explanation: 'token.is_stop stop word olup olmadığını kontrol eder.'
    }
  ],
  huggingface: [
    {
      id: 'hf1',
      question: 'Hugging Face\'de hızlı inference için hangi API kullanılır?',
      options: ['model.infer()', 'pipeline()', 'model.predict()', 'AutoModel.run()'],
      correct: 1,
      explanation: 'pipeline() hızlı ve kolay inference sağlar.'
    },
    {
      id: 'hf2',
      question: 'Tokenizer yüklemek için hangi sınıf kullanılır?',
      options: ['Tokenizer', 'AutoTokenizer', 'BertTokenizer', 'TokenizerLoader'],
      correct: 1,
      explanation: 'AutoTokenizer otomatik olarak doğru tokenizer\'ı yükler.'
    },
    {
      id: 'hf3',
      question: 'Fine-tuning için hangi sınıf kullanılır?',
      options: ['FineTuner', 'Trainer', 'ModelTrainer', 'AutoTrain'],
      correct: 1,
      explanation: 'Trainer sınıfı fine-tuning için kullanılır.'
    },
    {
      id: 'hf4',
      question: 'Dataset yüklemek için hangi fonksiyon kullanılır?',
      options: ['get_dataset()', 'load_dataset()', 'Dataset.load()', 'fetch_dataset()'],
      correct: 1,
      explanation: 'load_dataset() Hugging Face datasets\'ten veri yükler.'
    },
    {
      id: 'hf5',
      question: 'Model Hub\'a model yüklemek için hangi metod kullanılır?',
      options: ['model.upload()', 'model.push_to_hub()', 'model.publish()', 'model.deploy()'],
      correct: 1,
      explanation: 'push_to_hub() modeli Hub\'a yükler.'
    }
  ],
  mlflow: [
    {
      id: 'ml1',
      question: 'MLflow\'da experiment başlatmak için hangi fonksiyon kullanılır?',
      options: ['mlflow.start()', 'mlflow.start_run()', 'mlflow.begin()', 'mlflow.run()'],
      correct: 1,
      explanation: 'mlflow.start_run() yeni bir run başlatır.'
    },
    {
      id: 'ml2',
      question: 'Parametre loglamak için hangi fonksiyon kullanılır?',
      options: ['mlflow.log_param()', 'mlflow.set_param()', 'mlflow.param()', 'mlflow.add_param()'],
      correct: 0,
      explanation: 'mlflow.log_param() parametre kaydeder.'
    },
    {
      id: 'ml3',
      question: 'Model kaydetmek için hangi fonksiyon kullanılır?',
      options: ['mlflow.save_model()', 'mlflow.sklearn.log_model()', 'mlflow.store_model()', 'mlflow.export()'],
      correct: 1,
      explanation: 'mlflow.sklearn.log_model() sklearn modelini kaydeder.'
    },
    {
      id: 'ml4',
      question: 'Model Registry\'de stage geçişi için ne kullanılır?',
      options: ['change_stage()', 'transition_model_version_stage()', 'update_stage()', 'set_stage()'],
      correct: 1,
      explanation: 'transition_model_version_stage() stage değiştirir.'
    },
    {
      id: 'ml5',
      question: 'Otomatik loglama için hangi fonksiyon kullanılır?',
      options: ['mlflow.auto()', 'mlflow.autolog()', 'mlflow.auto_track()', 'mlflow.enable_logging()'],
      correct: 1,
      explanation: 'mlflow.autolog() otomatik loglama yapar.'
    }
  ],
  airflow: [
    {
      id: 'af1',
      question: 'Airflow\'da iş akışı tanımlamak için ne kullanılır?',
      options: ['Workflow', 'Pipeline', 'DAG', 'Flow'],
      correct: 2,
      explanation: 'DAG (Directed Acyclic Graph) iş akışını tanımlar.'
    },
    {
      id: 'af2',
      question: 'Python fonksiyonu çalıştırmak için hangi operator kullanılır?',
      options: ['FunctionOperator', 'PythonOperator', 'CallableOperator', 'PyOperator'],
      correct: 1,
      explanation: 'PythonOperator Python fonksiyonlarını çalıştırır.'
    },
    {
      id: 'af3',
      question: 'Task\'lar arası veri paylaşımı için ne kullanılır?',
      options: ['SharedData', 'XCom', 'TaskData', 'Pipeline'],
      correct: 1,
      explanation: 'XCom task\'lar arası veri paylaşımı sağlar.'
    },
    {
      id: 'af4',
      question: 'Harici bir olayı beklemek için ne kullanılır?',
      options: ['Waiter', 'Sensor', 'Listener', 'Monitor'],
      correct: 1,
      explanation: 'Sensor harici koşulları bekler.'
    },
    {
      id: 'af5',
      question: 'Koşullu task çalıştırma için hangi operator kullanılır?',
      options: ['IfOperator', 'BranchPythonOperator', 'ConditionalOperator', 'SwitchOperator'],
      correct: 1,
      explanation: 'BranchPythonOperator koşullu dallanma sağlar.'
    }
  ],
  elasticsearch: [
    {
      id: 'es1',
      question: 'Elasticsearch\'te full-text arama için hangi query kullanılır?',
      options: ['text_query', 'match', 'search', 'find'],
      correct: 1,
      explanation: 'match query full-text arama yapar.'
    },
    {
      id: 'es2',
      question: 'Exact match için hangi query kullanılır?',
      options: ['exact', 'term', 'match_exact', 'equals'],
      correct: 1,
      explanation: 'term query exact match yapar.'
    },
    {
      id: 'es3',
      question: 'Birden fazla koşulu birleştirmek için ne kullanılır?',
      options: ['and_query', 'bool', 'combined', 'multi'],
      correct: 1,
      explanation: 'bool query must, should, must_not ile koşulları birleştirir.'
    },
    {
      id: 'es4',
      question: 'Aggregation sonuçlarına nasıl erişilir?',
      options: ['results.aggs', 'response.aggregations', 'data.groups', 'output.buckets'],
      correct: 1,
      explanation: 'response.aggregations aggregation sonuçlarını içerir.'
    },
    {
      id: 'es5',
      question: 'Index mapping tanımlamak için ne kullanılır?',
      options: ['schema', 'mappings', 'structure', 'definition'],
      correct: 1,
      explanation: 'mappings field tiplerini ve ayarlarını tanımlar.'
    }
  ],
  sparksql: [
    {
      id: 'ss1',
      question: 'SparkSession oluşturmak için hangi metod kullanılır?',
      options: ['SparkSession.create()', 'SparkSession.builder', 'SparkSession.new()', 'SparkSession.init()'],
      correct: 1,
      explanation: 'SparkSession.builder ile session oluşturulur.'
    },
    {
      id: 'ss2',
      question: 'DataFrame\'i SQL\'de kullanmak için ne yapılır?',
      options: ['df.toSQL()', 'df.createOrReplaceTempView()', 'df.register()', 'df.asSql()'],
      correct: 1,
      explanation: 'createOrReplaceTempView() temporary view oluşturur.'
    },
    {
      id: 'ss3',
      question: 'UDF tanımlamak için hangi decorator kullanılır?',
      options: ['@spark_udf', '@udf', '@user_function', '@custom_func'],
      correct: 1,
      explanation: '@udf decorator\'ı UDF tanımlar.'
    },
    {
      id: 'ss4',
      question: 'DataFrame\'i cache\'lemek için hangi metod kullanılır?',
      options: ['df.store()', 'df.cache()', 'df.save()', 'df.memory()'],
      correct: 1,
      explanation: 'cache() DataFrame\'i memory\'de tutar.'
    },
    {
      id: 'ss5',
      question: 'Partition sayısını azaltmak için ne kullanılır?',
      options: ['reduce()', 'coalesce()', 'shrink()', 'compact()'],
      correct: 1,
      explanation: 'coalesce() partition sayısını azaltır.'
    }
  ],
  azure: [
    {
      id: 'az1',
      question: 'Azure CLI\'da login için hangi komut kullanılır?',
      options: ['azure login', 'az login', 'az auth', 'azure connect'],
      correct: 1,
      explanation: 'az login Azure hesabına bağlanır.'
    },
    {
      id: 'az2',
      question: 'Resource group oluşturmak için hangi komut kullanılır?',
      options: ['az rg create', 'az group create', 'az resource new', 'az create group'],
      correct: 1,
      explanation: 'az group create resource group oluşturur.'
    },
    {
      id: 'az3',
      question: 'Blob Storage\'a dosya yüklemek için ne kullanılır?',
      options: ['az storage upload', 'az blob put', 'az storage blob upload', 'az file upload'],
      correct: 2,
      explanation: 'az storage blob upload blob yükler.'
    },
    {
      id: 'az4',
      question: 'AKS cluster credential\'larını almak için ne kullanılır?',
      options: ['az aks credentials', 'az aks get-credentials', 'az aks auth', 'az aks login'],
      correct: 1,
      explanation: 'az aks get-credentials kubeconfig\'i günceller.'
    },
    {
      id: 'az5',
      question: 'Function App oluşturmak için hangi komut kullanılır?',
      options: ['az function create', 'az functionapp create', 'az func new', 'az serverless create'],
      correct: 1,
      explanation: 'az functionapp create Function App oluşturur.'
    }
  ],
  gcp: [
    {
      id: 'gcp1',
      question: 'GCP CLI\'da project ayarlamak için ne kullanılır?',
      options: ['gcloud set project', 'gcloud config set project', 'gcloud project use', 'gcloud use project'],
      correct: 1,
      explanation: 'gcloud config set project aktif projeyi ayarlar.'
    },
    {
      id: 'gcp2',
      question: 'GCS\'ye dosya yüklemek için hangi komut kullanılır?',
      options: ['gcloud storage cp', 'gsutil cp', 'gcloud cp', 'gcs upload'],
      correct: 1,
      explanation: 'gsutil cp Cloud Storage\'a dosya kopyalar.'
    },
    {
      id: 'gcp3',
      question: 'GKE cluster oluşturmak için ne kullanılır?',
      options: ['gcloud kubernetes create', 'gcloud container clusters create', 'gcloud gke create', 'gcloud cluster new'],
      correct: 1,
      explanation: 'gcloud container clusters create GKE cluster oluşturur.'
    },
    {
      id: 'gcp4',
      question: 'Cloud Function deploy etmek için ne kullanılır?',
      options: ['gcloud function deploy', 'gcloud functions deploy', 'gcloud deploy function', 'gcloud serverless deploy'],
      correct: 1,
      explanation: 'gcloud functions deploy function\'ı deploy eder.'
    },
    {
      id: 'gcp5',
      question: 'BigQuery\'de query çalıştırmak için hangi komut kullanılır?',
      options: ['bq run', 'bq query', 'bq execute', 'bq sql'],
      correct: 1,
      explanation: 'bq query SQL sorgusu çalıştırır.'
    }
  ],
  prometheus: [
    {
      id: 'pr1',
      question: 'Counter metric\'in saniye başına oranını almak için ne kullanılır?',
      options: ['ratio()', 'rate()', 'per_second()', 'speed()'],
      correct: 1,
      explanation: 'rate() counter\'ın saniye başına oranını hesaplar.'
    },
    {
      id: 'pr2',
      question: 'Label\'a göre toplamak için hangi fonksiyon kullanılır?',
      options: ['group()', 'sum by', 'total()', 'aggregate()'],
      correct: 1,
      explanation: 'sum by label\'a göre toplar.'
    },
    {
      id: 'pr3',
      question: 'Histogram\'dan percentile hesaplamak için ne kullanılır?',
      options: ['percentile()', 'histogram_quantile()', 'quantile()', 'histogram_percentile()'],
      correct: 1,
      explanation: 'histogram_quantile() histogram\'dan quantile hesaplar.'
    },
    {
      id: 'pr4',
      question: 'Recording rule tanımlamak için hangi anahtar kelime kullanılır?',
      options: ['recording', 'record', 'rule', 'metric'],
      correct: 1,
      explanation: 'record yeni metric adını tanımlar.'
    },
    {
      id: 'pr5',
      question: 'Alert tanımlamak için hangi anahtar kelime kullanılır?',
      options: ['warning', 'alert', 'notify', 'trigger'],
      correct: 1,
      explanation: 'alert alert kuralını tanımlar.'
    }
  ],
  grafana: [
    {
      id: 'gr1',
      question: 'Dashboard\'da dinamik değer için ne kullanılır?',
      options: ['parameters', 'variables', 'inputs', 'filters'],
      correct: 1,
      explanation: 'variables dashboard\'da dinamik değerler sağlar.'
    },
    {
      id: 'gr2',
      question: 'Panel\'i tekrarlamak için hangi özellik kullanılır?',
      options: ['clone', 'repeat', 'duplicate', 'copy'],
      correct: 1,
      explanation: 'repeat variable değerlerine göre panel\'i tekrarlar.'
    },
    {
      id: 'gr3',
      question: 'Sorgu sonuçlarını dönüştürmek için ne kullanılır?',
      options: ['converters', 'transformations', 'processors', 'modifiers'],
      correct: 1,
      explanation: 'transformations veriyi dönüştürür.'
    },
    {
      id: 'gr4',
      question: 'Dashboard provisioning için hangi dizin kullanılır?',
      options: ['/etc/grafana/dashboards', '/etc/grafana/provisioning', '/var/grafana/config', '/grafana/setup'],
      correct: 1,
      explanation: '/etc/grafana/provisioning provisioning dosyalarını içerir.'
    },
    {
      id: 'gr5',
      question: 'Grafana API\'ye erişmek için ne gerekir?',
      options: ['username/password', 'API key', 'OAuth token', 'certificate'],
      correct: 1,
      explanation: 'API key ile Grafana API\'ye erişilir.'
    }
  ],
  helm: [
    {
      id: 'hm1',
      question: 'Helm chart\'ı install etmek için hangi komut kullanılır?',
      options: ['helm deploy', 'helm install', 'helm apply', 'helm create'],
      correct: 1,
      explanation: 'helm install chart\'ı cluster\'a yükler.'
    },
    {
      id: 'hm2',
      question: 'Values dosyasını belirtmek için hangi flag kullanılır?',
      options: ['--values', '-f', '--config', '-c'],
      correct: 1,
      explanation: '-f veya --values custom values dosyası belirtir.'
    },
    {
      id: 'hm3',
      question: 'Release\'i güncellemek için hangi komut kullanılır?',
      options: ['helm update', 'helm upgrade', 'helm refresh', 'helm patch'],
      correct: 1,
      explanation: 'helm upgrade release\'i günceller.'
    },
    {
      id: 'hm4',
      question: 'Template\'leri render etmek için ne kullanılır?',
      options: ['helm render', 'helm template', 'helm show', 'helm generate'],
      correct: 1,
      explanation: 'helm template manifest\'leri render eder.'
    },
    {
      id: 'hm5',
      question: 'Chart dependencies\'i güncellemek için ne kullanılır?',
      options: ['helm deps update', 'helm dependency update', 'helm update deps', 'helm refresh deps'],
      correct: 1,
      explanation: 'helm dependency update dependencies\'i günceller.'
    }
  ],
  typescript: [
    {
      id: 'ts1',
      question: 'Optional property tanımlamak için hangi sembol kullanılır?',
      options: ['*', '?', '!', '&'],
      correct: 1,
      explanation: '? optional property tanımlar.'
    },
    {
      id: 'ts2',
      question: 'Tüm property\'leri optional yapan utility type hangisidir?',
      options: ['Optional<T>', 'Partial<T>', 'Maybe<T>', 'Nullable<T>'],
      correct: 1,
      explanation: 'Partial<T> tüm property\'leri optional yapar.'
    },
    {
      id: 'ts3',
      question: 'Union type tanımlamak için hangi operatör kullanılır?',
      options: ['&', '|', '+', ','],
      correct: 1,
      explanation: '| union type tanımlar.'
    },
    {
      id: 'ts4',
      question: 'Generic constraint tanımlamak için ne kullanılır?',
      options: ['implements', 'extends', 'satisfies', 'requires'],
      correct: 1,
      explanation: 'extends generic constraint tanımlar.'
    },
    {
      id: 'ts5',
      question: 'Type guard fonksiyonu tanımlamak için ne kullanılır?',
      options: ['is', 'as', 'typeof', 'instanceof'],
      correct: 0,
      explanation: 'is type predicate tanımlar.'
    }
  ],
  graphql: [
    {
      id: 'gq1',
      question: 'GraphQL\'de veri almak için ne kullanılır?',
      options: ['fetch', 'query', 'get', 'read'],
      correct: 1,
      explanation: 'query veri okumak için kullanılır.'
    },
    {
      id: 'gq2',
      question: 'Veri değiştirmek için ne kullanılır?',
      options: ['update', 'mutation', 'change', 'modify'],
      correct: 1,
      explanation: 'mutation veri değiştirmek için kullanılır.'
    },
    {
      id: 'gq3',
      question: 'Real-time veri için ne kullanılır?',
      options: ['stream', 'subscription', 'websocket', 'push'],
      correct: 1,
      explanation: 'subscription real-time veri sağlar.'
    },
    {
      id: 'gq4',
      question: 'Tekrar eden field\'ları tanımlamak için ne kullanılır?',
      options: ['template', 'fragment', 'partial', 'mixin'],
      correct: 1,
      explanation: 'fragment tekrar eden field\'ları tanımlar.'
    },
    {
      id: 'gq5',
      question: 'Koşullu field için hangi directive kullanılır?',
      options: ['@if', '@include', '@when', '@show'],
      correct: 1,
      explanation: '@include koşullu field içerir.'
    }
  ],
  tailwind: [
    {
      id: 'tw1',
      question: 'Responsive tasarım için hangi prefix kullanılır?',
      options: ['@media', 'sm:', 'responsive-', 'bp-'],
      correct: 1,
      explanation: 'sm:, md:, lg: gibi prefix\'ler responsive tasarım sağlar.'
    },
    {
      id: 'tw2',
      question: 'Hover durumu için hangi prefix kullanılır?',
      options: [':hover', 'hover:', 'on-hover-', 'h:'],
      correct: 1,
      explanation: 'hover: prefix\'i hover durumunu tanımlar.'
    },
    {
      id: 'tw3',
      question: 'Flexbox container için hangi class kullanılır?',
      options: ['flexbox', 'flex', 'display-flex', 'flex-container'],
      correct: 1,
      explanation: 'flex class\'ı flexbox container oluşturur.'
    },
    {
      id: 'tw4',
      question: 'Dark mode için hangi prefix kullanılır?',
      options: ['night:', 'dark:', 'theme-dark:', 'mode-dark:'],
      correct: 1,
      explanation: 'dark: prefix\'i dark mode stillerini tanımlar.'
    },
    {
      id: 'tw5',
      question: 'Padding için hangi class prefix kullanılır?',
      options: ['padding-', 'pad-', 'p-', 'pd-'],
      correct: 2,
      explanation: 'p- padding class\'larının prefix\'idir.'
    }
  ],
  sass: [
    {
      id: 'sa1',
      question: 'SASS\'ta variable tanımlamak için hangi sembol kullanılır?',
      options: ['@', '$', '#', '&'],
      correct: 1,
      explanation: '$ ile variable tanımlanır.'
    },
    {
      id: 'sa2',
      question: 'Mixin tanımlamak için hangi keyword kullanılır?',
      options: ['@function', '@mixin', '@define', '@macro'],
      correct: 1,
      explanation: '@mixin ile mixin tanımlanır.'
    },
    {
      id: 'sa3',
      question: 'Mixin kullanmak için hangi keyword kullanılır?',
      options: ['@use', '@include', '@import', '@apply'],
      correct: 1,
      explanation: '@include ile mixin kullanılır.'
    },
    {
      id: 'sa4',
      question: 'Parent selector\'a referans için hangi sembol kullanılır?',
      options: ['^', '&', '@', '*'],
      correct: 1,
      explanation: '& parent selector\'a referans verir.'
    },
    {
      id: 'sa5',
      question: 'Partial dosya import etmek için hangi keyword kullanılır?',
      options: ['@require', '@use', '@load', '@get'],
      correct: 1,
      explanation: '@use modern SASS\'ta partial import eder.'
    }
  ],
  websocket: [
    {
      id: 'ws1',
      question: 'WebSocket bağlantısı kurmak için hangi constructor kullanılır?',
      options: ['Socket()', 'WebSocket()', 'Connection()', 'WS()'],
      correct: 1,
      explanation: 'new WebSocket(url) bağlantı oluşturur.'
    },
    {
      id: 'ws2',
      question: 'Mesaj almak için hangi event listener kullanılır?',
      options: ['onreceive', 'onmessage', 'ondata', 'onincoming'],
      correct: 1,
      explanation: 'onmessage gelen mesajları dinler.'
    },
    {
      id: 'ws3',
      question: 'Bağlantı durumunu kontrol eden property hangisidir?',
      options: ['state', 'status', 'readyState', 'connectionState'],
      correct: 2,
      explanation: 'readyState bağlantı durumunu gösterir.'
    },
    {
      id: 'ws4',
      question: 'Socket.IO\'da odaya katılmak için ne kullanılır?',
      options: ['socket.enter()', 'socket.join()', 'socket.room()', 'socket.connect()'],
      correct: 1,
      explanation: 'socket.join() odaya katılır.'
    },
    {
      id: 'ws5',
      question: 'Normal kapatma için hangi kod kullanılır?',
      options: ['1000', '1001', '1002', '1003'],
      correct: 0,
      explanation: '1000 normal closure kodudur.'
    }
  ],
  jwt: [
    {
      id: 'jw1',
      question: 'JWT kaç bölümden oluşur?',
      options: ['2', '3', '4', '5'],
      correct: 1,
      explanation: 'JWT header, payload ve signature olmak üzere 3 bölümden oluşur.'
    },
    {
      id: 'jw2',
      question: 'Token\'ın geçerlilik süresini belirten claim hangisidir?',
      options: ['ttl', 'exp', 'valid', 'timeout'],
      correct: 1,
      explanation: 'exp (expiration) claim\'i süreyi belirler.'
    },
    {
      id: 'jw3',
      question: 'Token\'ı imzalamak için hangi metod kullanılır?',
      options: ['jwt.create()', 'jwt.sign()', 'jwt.encode()', 'jwt.generate()'],
      correct: 1,
      explanation: 'jwt.sign() token\'ı imzalar.'
    },
    {
      id: 'jw4',
      question: 'Token\'ı doğrulamak için hangi metod kullanılır?',
      options: ['jwt.check()', 'jwt.verify()', 'jwt.validate()', 'jwt.decode()'],
      correct: 1,
      explanation: 'jwt.verify() token\'ı doğrular.'
    },
    {
      id: 'jw5',
      question: 'Asymmetric signing için hangi algoritma kullanılır?',
      options: ['HS256', 'RS256', 'MD5', 'SHA256'],
      correct: 1,
      explanation: 'RS256 RSA ile asymmetric signing yapar.'
    }
  ],
  oauth: [
    {
      id: 'oa1',
      question: 'Web uygulamaları için önerilen OAuth flow hangisidir?',
      options: ['Implicit', 'Authorization Code', 'Client Credentials', 'Password'],
      correct: 1,
      explanation: 'Authorization Code flow en güvenli seçenektir.'
    },
    {
      id: 'oa2',
      question: 'SPA\'lar için Authorization Code ile ne kullanılmalıdır?',
      options: ['Client Secret', 'PKCE', 'API Key', 'Certificate'],
      correct: 1,
      explanation: 'PKCE public client\'lar için güvenlik sağlar.'
    },
    {
      id: 'oa3',
      question: 'Access token almak için hangi endpoint kullanılır?',
      options: ['/authorize', '/token', '/access', '/oauth'],
      correct: 1,
      explanation: '/token endpoint\'i access token döner.'
    },
    {
      id: 'oa4',
      question: 'Token yenilemek için hangi grant type kullanılır?',
      options: ['renew_token', 'refresh_token', 'new_token', 'update_token'],
      correct: 1,
      explanation: 'refresh_token grant type\'ı token yeniler.'
    },
    {
      id: 'oa5',
      question: 'OpenID Connect\'in OAuth 2.0\'a eklediği nedir?',
      options: ['Access Token', 'ID Token', 'API Key', 'Session'],
      correct: 1,
      explanation: 'ID Token kullanıcı kimlik bilgilerini içerir.'
    }
  ],
  owasp: [
    {
      id: 'ow1',
      question: 'SQL Injection\'ı önlemek için ne kullanılmalıdır?',
      options: ['String concatenation', 'Parametrized queries', 'Escaping', 'Encryption'],
      correct: 1,
      explanation: 'Parametrized queries SQL Injection\'ı önler.'
    },
    {
      id: 'ow2',
      question: 'XSS\'i önlemek için ne yapılmalıdır?',
      options: ['Input encryption', 'Output encoding', 'Input hashing', 'SSL kullanma'],
      correct: 1,
      explanation: 'Output encoding XSS\'i önler.'
    },
    {
      id: 'ow3',
      question: 'Password saklamak için ne kullanılmalıdır?',
      options: ['MD5', 'SHA256', 'bcrypt', 'Base64'],
      correct: 2,
      explanation: 'bcrypt güvenli password hashing sağlar.'
    },
    {
      id: 'ow4',
      question: 'CSRF\'i önlemek için ne kullanılır?',
      options: ['API Key', 'CSRF Token', 'Session ID', 'Cookie'],
      correct: 1,
      explanation: 'CSRF Token cross-site request forgery\'i önler.'
    },
    {
      id: 'ow5',
      question: 'Security header\'ları eklemek için hangi middleware kullanılır?',
      options: ['cors', 'helmet', 'express-security', 'secure-headers'],
      correct: 1,
      explanation: 'helmet security header\'larını ekler.'
    }
  ]
}
