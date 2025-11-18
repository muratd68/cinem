'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Workflow, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function StatisticsCheatSheet() {
  const { isDark } = useTheme()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className={`inline-flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-4`}>
          <ArrowLeft className="w-4 h-4" />
          Geri
        </Link>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-500">
            <Workflow className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Istatistik Cheat Sheet</h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Tanimlayici istatistik ve hipotez testleri</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Tanimlayici Istatistik</h2>

          <CodeBlock
            title="Merkezi Egilim Olculeri"
            code={`import numpy as np
from scipy import stats

data = [23, 25, 27, 28, 29, 30, 31, 35, 40]

# Ortalama (Mean)
mean = np.mean(data)                    # Aritmetik ortalama
geometric_mean = stats.gmean(data)      # Geometrik ortalama
harmonic_mean = stats.hmean(data)       # Harmonik ortalama
weighted_mean = np.average(data, weights=[1,2,3,4,5,4,3,2,1])

# Medyan (Ortanca)
median = np.median(data)

# Mod (En sik deger)
mode = stats.mode(data)

# Formul: Ortalama
# μ = Σx / n

# Formul: Medyan
# n tek: x[(n+1)/2]
# n cift: (x[n/2] + x[n/2+1]) / 2`}
          />

          <CodeBlock
            title="Yayilim Olculeri"
            code={`import numpy as np
from scipy import stats

data = [23, 25, 27, 28, 29, 30, 31, 35, 40]

# Range (Aciklik)
range_val = np.max(data) - np.min(data)

# Varyans
variance_pop = np.var(data)             # Populasyon (N)
variance_sample = np.var(data, ddof=1)  # Orneklem (n-1)

# Standart Sapma
std_pop = np.std(data)                  # Populasyon
std_sample = np.std(data, ddof=1)       # Orneklem

# Ceyrekler (Quartiles)
q1 = np.percentile(data, 25)            # 1. ceyrek
q2 = np.percentile(data, 50)            # 2. ceyrek (medyan)
q3 = np.percentile(data, 75)            # 3. ceyrek
iqr = q3 - q1                           # Ceyrekler arasi aciklik

# Degisim Katsayisi
cv = (std_sample / mean) * 100

# Formul: Varyans
# σ² = Σ(x - μ)² / N   (populasyon)
# s² = Σ(x - x̄)² / (n-1)   (orneklem)

# Formul: Standart Sapma
# σ = √σ²`}
          />

          <CodeBlock
            title="Sekil Olculeri"
            code={`from scipy import stats

# Carpiklik (Skewness)
skewness = stats.skew(data)
# < 0: Sola carpik (negatif)
# = 0: Simetrik
# > 0: Saga carpik (pozitif)

# Basiklik (Kurtosis)
kurtosis = stats.kurtosis(data)
# < 0: Basik (platykurtic)
# = 0: Normal (mesokurtic)
# > 0: Sivri (leptokurtic)

# Z-skoru (Standart skor)
z_scores = stats.zscore(data)
# z = (x - μ) / σ`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Olasilik Dagilimlari</h2>

          <CodeBlock
            title="Kesikli Dagilimlar"
            code={`from scipy import stats

# Binom Dagilimi
# n deneme, p basari olasiligi
n, p = 10, 0.5
binom = stats.binom(n, p)
binom.pmf(5)            # P(X = 5)
binom.cdf(5)            # P(X <= 5)
binom.mean()            # E(X) = np
binom.var()             # Var(X) = np(1-p)

# Poisson Dagilimi
# lambda: birim zamanda ortalama olay sayisi
mu = 3
poisson = stats.poisson(mu)
poisson.pmf(2)          # P(X = 2)
poisson.cdf(2)          # P(X <= 2)

# Geometrik Dagilim
p = 0.3
geom = stats.geom(p)
geom.pmf(5)             # Ilk basariya kadar 5 deneme`}
          />

          <CodeBlock
            title="Surekli Dagilimlar"
            code={`from scipy import stats
import numpy as np

# Normal Dagilim
mu, sigma = 0, 1
normal = stats.norm(mu, sigma)
normal.pdf(0)           # Olasilik yogunluk fonksiyonu
normal.cdf(1.96)        # Kumulatif dagilim P(X <= 1.96)
normal.ppf(0.975)       # Quantile (inverse CDF)
normal.rvs(size=1000)   # Rastgele orneklem

# Standart Normal
# Z = (X - μ) / σ
z = 1.96
prob = stats.norm.cdf(z)  # 0.975

# t Dagilimi
df = 10                 # Serbestlik derecesi
t_dist = stats.t(df)
t_dist.ppf(0.975)       # t-kritik deger

# Ki-kare Dagilimi
chi2 = stats.chi2(df)
chi2.ppf(0.95)          # Ki-kare kritik deger

# F Dagilimi
dfn, dfd = 5, 10        # Serbestlik dereceleri
f_dist = stats.f(dfn, dfd)

# Ustel Dagilim
lambda_ = 1/5           # Rate
exp = stats.expon(scale=1/lambda_)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Guven Araliği</h2>

          <CodeBlock
            title="Confidence Intervals"
            code={`import numpy as np
from scipy import stats

data = np.array([23, 25, 27, 28, 29, 30, 31, 35, 40])
n = len(data)
mean = np.mean(data)
std = np.std(data, ddof=1)
se = std / np.sqrt(n)       # Standart hata

# %95 Guven Araligi (Z-dagilimi, n>=30)
z_critical = 1.96
ci_lower = mean - z_critical * se
ci_upper = mean + z_critical * se

# %95 Guven Araligi (t-dagilimi, n<30)
confidence = 0.95
alpha = 1 - confidence
t_critical = stats.t.ppf(1 - alpha/2, df=n-1)
ci_lower = mean - t_critical * se
ci_upper = mean + t_critical * se

# Scipy ile
ci = stats.t.interval(
    confidence=0.95,
    df=n-1,
    loc=mean,
    scale=se
)

# Oran icin guven araligi
p = 0.6                 # Orneklem orani
n = 100
se_prop = np.sqrt(p * (1-p) / n)
ci_prop = (p - 1.96*se_prop, p + 1.96*se_prop)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Hipotez Testleri</h2>

          <CodeBlock
            title="t-Testleri"
            code={`from scipy import stats
import numpy as np

# Tek Orneklem t-Test
# H0: μ = μ0
data = [23, 25, 27, 28, 29, 30, 31, 35, 40]
mu_0 = 25
t_stat, p_value = stats.ttest_1samp(data, mu_0)

# Bagimsiz Iki Orneklem t-Test
# H0: μ1 = μ2
group1 = [23, 25, 27, 28, 29]
group2 = [30, 31, 35, 40, 42]
t_stat, p_value = stats.ttest_ind(group1, group2)

# Esit olmayan varyans (Welch's t-test)
t_stat, p_value = stats.ttest_ind(group1, group2, equal_var=False)

# Eslestirilmis t-Test
# H0: μd = 0
before = [70, 75, 80, 85, 90]
after = [72, 78, 82, 88, 95]
t_stat, p_value = stats.ttest_rel(before, after)

# Karar: p_value < alpha ise H0 reddedilir
alpha = 0.05
if p_value < alpha:
    print("H0 reddedilir")
else:
    print("H0 reddedilemez")`}
          />

          <CodeBlock
            title="Ki-Kare Testleri"
            code={`from scipy import stats
import numpy as np

# Ki-Kare Uyum Iyiligi Testi
# H0: Gozlenen dagilim beklenen dagilima uyar
observed = [50, 30, 20]
expected = [40, 40, 20]
chi2, p_value = stats.chisquare(observed, expected)

# Ki-Kare Bagimsizlik Testi
# H0: Degiskenler bagimsizdir
contingency_table = np.array([
    [30, 10, 10],
    [20, 20, 10]
])
chi2, p_value, dof, expected = stats.chi2_contingency(contingency_table)

# Fisher's Exact Test (2x2 tablo icin)
table = [[8, 2], [1, 5]]
odds_ratio, p_value = stats.fisher_exact(table)`}
          />

          <CodeBlock
            title="ANOVA"
            code={`from scipy import stats
import numpy as np

# Tek Yonlu ANOVA
# H0: μ1 = μ2 = μ3 = ...
group1 = [23, 25, 27, 28, 29]
group2 = [30, 31, 35, 40, 42]
group3 = [20, 22, 24, 26, 28]
f_stat, p_value = stats.f_oneway(group1, group2, group3)

# Kruskal-Wallis (non-parametrik)
h_stat, p_value = stats.kruskal(group1, group2, group3)

# Coklu karsilastirma (Post-hoc)
from scipy.stats import tukey_hsd
result = tukey_hsd(group1, group2, group3)
print(result)`}
          />

          <CodeBlock
            title="Non-parametrik Testler"
            code={`from scipy import stats

# Mann-Whitney U Test (bagimsiz 2 grup)
# H0: Iki dagilim ayni
group1 = [23, 25, 27, 28, 29]
group2 = [30, 31, 35, 40, 42]
u_stat, p_value = stats.mannwhitneyu(group1, group2)

# Wilcoxon Signed-Rank Test (eslesmis)
# H0: Medyan farki = 0
before = [70, 75, 80, 85, 90]
after = [72, 78, 82, 88, 95]
w_stat, p_value = stats.wilcoxon(before, after)

# Spearman Korelasyon
rho, p_value = stats.spearmanr(x, y)

# Kendall Tau
tau, p_value = stats.kendalltau(x, y)

# Shapiro-Wilk Normallik Testi
# H0: Veri normal dagiliyor
stat, p_value = stats.shapiro(data)

# Kolmogorov-Smirnov Testi
stat, p_value = stats.kstest(data, 'norm')`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Korelasyon ve Regresyon</h2>

          <CodeBlock
            title="Korelasyon"
            code={`from scipy import stats
import numpy as np

x = [1, 2, 3, 4, 5]
y = [2, 4, 5, 4, 5]

# Pearson korelasyon katsayisi
r, p_value = stats.pearsonr(x, y)
# r: [-1, 1]
# |r| < 0.3: Zayif
# 0.3 <= |r| < 0.7: Orta
# |r| >= 0.7: Guclu

# Spearman sira korelasyonu
rho, p_value = stats.spearmanr(x, y)

# Korelasyon matrisi
data = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
corr_matrix = np.corrcoef(data)

# Pandas ile
import pandas as pd
df = pd.DataFrame({'A': x, 'B': y})
corr = df.corr()
corr = df.corr(method='spearman')`}
          />

          <CodeBlock
            title="Basit Lineer Regresyon"
            code={`from scipy import stats
import numpy as np

x = np.array([1, 2, 3, 4, 5])
y = np.array([2, 4, 5, 4, 5])

# Lineer regresyon
slope, intercept, r_value, p_value, std_err = stats.linregress(x, y)

# y = mx + b
print(f"Egim (slope): {slope}")
print(f"Kesim (intercept): {intercept}")
print(f"R-kare: {r_value**2}")
print(f"p-degeri: {p_value}")

# Tahmin
y_pred = slope * x + intercept

# Sklearn ile
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(x.reshape(-1, 1), y)
print(f"Katsayi: {model.coef_[0]}")
print(f"Kesim: {model.intercept_}")`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Onemli Formuller</h2>

          <CodeBlock
            title="Istatistik Formuller"
            code={`# Ortalama
μ = Σx / n

# Varyans
σ² = Σ(x - μ)² / n          # Populasyon
s² = Σ(x - x̄)² / (n-1)      # Orneklem

# Standart Sapma
σ = √σ²

# Standart Hata
SE = s / √n

# Z-skoru
z = (x - μ) / σ

# t-istatistigi
t = (x̄ - μ₀) / (s / √n)

# Ki-kare
χ² = Σ(O - E)² / E

# Pearson r
r = Σ(x - x̄)(y - ȳ) / √[Σ(x - x̄)² Σ(y - ȳ)²]

# Regresyon
ŷ = b₀ + b₁x
b₁ = Σ(x - x̄)(y - ȳ) / Σ(x - x̄)²
b₀ = ȳ - b₁x̄

# R-kare
R² = 1 - (SS_res / SS_tot)
SS_res = Σ(y - ŷ)²
SS_tot = Σ(y - ȳ)²`}
          />
        </section>
      </div>
    </div>
  )
}
