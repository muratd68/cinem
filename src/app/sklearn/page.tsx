'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Brain, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function SklearnCheatSheet() {
  const { isDark } = useTheme()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className={`inline-flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-4`}>
          <ArrowLeft className="w-4 h-4" />
          Geri
        </Link>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-yellow-500">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Scikit-learn Cheat Sheet</h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Makine ogrenmesi algoritmalari ve model islemleri</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Veri Hazirlama</h2>

          <CodeBlock
            title="Veri Bolme ve Olcekleme"
            code={`from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, MinMaxScaler
import numpy as np

# Veri bolme
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
    stratify=y  # Sinif dagilimini koru
)

# Standardizasyon (mean=0, std=1)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Min-Max normalizasyon (0-1 arasi)
scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(X)

# Robust scaler (outlier'lara dayanikli)
from sklearn.preprocessing import RobustScaler
scaler = RobustScaler()
X_scaled = scaler.fit_transform(X)`}
          />

          <CodeBlock
            title="Encoding ve Imputation"
            code={`from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from sklearn.impute import SimpleImputer

# Label Encoding
le = LabelEncoder()
y_encoded = le.fit_transform(y)
y_original = le.inverse_transform(y_encoded)

# One-Hot Encoding
ohe = OneHotEncoder(sparse=False, drop='first')
X_encoded = ohe.fit_transform(X[['kategori']])

# Pandas ile get_dummies
import pandas as pd
X_encoded = pd.get_dummies(X, columns=['kategori'], drop_first=True)

# Eksik veri doldurma
imputer = SimpleImputer(strategy='mean')  # mean, median, most_frequent
X_imputed = imputer.fit_transform(X)

# KNN imputation
from sklearn.impute import KNNImputer
imputer = KNNImputer(n_neighbors=5)
X_imputed = imputer.fit_transform(X)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Regression Modelleri</h2>

          <CodeBlock
            title="Linear Regression"
            code={`from sklearn.linear_model import LinearRegression, Ridge, Lasso, ElasticNet

# Linear Regression
model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

# Katsayilar
print(model.coef_)        # Katsayilar
print(model.intercept_)   # Sabit terim

# Ridge Regression (L2)
ridge = Ridge(alpha=1.0)
ridge.fit(X_train, y_train)

# Lasso Regression (L1)
lasso = Lasso(alpha=0.1)
lasso.fit(X_train, y_train)

# ElasticNet (L1 + L2)
elastic = ElasticNet(alpha=1.0, l1_ratio=0.5)
elastic.fit(X_train, y_train)

# Polynomial Regression
from sklearn.preprocessing import PolynomialFeatures
poly = PolynomialFeatures(degree=2)
X_poly = poly.fit_transform(X)
model = LinearRegression()
model.fit(X_poly, y)`}
          />

          <CodeBlock
            title="Diger Regression Modelleri"
            code={`# Decision Tree Regressor
from sklearn.tree import DecisionTreeRegressor
tree = DecisionTreeRegressor(max_depth=5, random_state=42)
tree.fit(X_train, y_train)

# Random Forest Regressor
from sklearn.ensemble import RandomForestRegressor
rf = RandomForestRegressor(
    n_estimators=100,
    max_depth=10,
    random_state=42,
    n_jobs=-1
)
rf.fit(X_train, y_train)

# Gradient Boosting
from sklearn.ensemble import GradientBoostingRegressor
gb = GradientBoostingRegressor(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=3
)
gb.fit(X_train, y_train)

# SVR
from sklearn.svm import SVR
svr = SVR(kernel='rbf', C=1.0, epsilon=0.1)
svr.fit(X_train, y_train)

# KNN Regressor
from sklearn.neighbors import KNeighborsRegressor
knn = KNeighborsRegressor(n_neighbors=5)
knn.fit(X_train, y_train)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Classification Modelleri</h2>

          <CodeBlock
            title="Temel Classification"
            code={`# Logistic Regression
from sklearn.linear_model import LogisticRegression
lr = LogisticRegression(
    C=1.0,
    max_iter=1000,
    random_state=42
)
lr.fit(X_train, y_train)
y_pred = lr.predict(X_test)
y_prob = lr.predict_proba(X_test)

# Decision Tree Classifier
from sklearn.tree import DecisionTreeClassifier
tree = DecisionTreeClassifier(
    max_depth=5,
    min_samples_split=2,
    random_state=42
)
tree.fit(X_train, y_train)

# Random Forest Classifier
from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(
    n_estimators=100,
    max_depth=10,
    random_state=42,
    n_jobs=-1
)
rf.fit(X_train, y_train)

# Feature importance
importances = rf.feature_importances_`}
          />

          <CodeBlock
            title="Diger Classification Modelleri"
            code={`# SVM
from sklearn.svm import SVC
svc = SVC(kernel='rbf', C=1.0, gamma='scale', probability=True)
svc.fit(X_train, y_train)

# KNN
from sklearn.neighbors import KNeighborsClassifier
knn = KNeighborsClassifier(n_neighbors=5, weights='uniform')
knn.fit(X_train, y_train)

# Naive Bayes
from sklearn.naive_bayes import GaussianNB, MultinomialNB
gnb = GaussianNB()
gnb.fit(X_train, y_train)

# Gradient Boosting
from sklearn.ensemble import GradientBoostingClassifier
gb = GradientBoostingClassifier(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=3
)
gb.fit(X_train, y_train)

# AdaBoost
from sklearn.ensemble import AdaBoostClassifier
ada = AdaBoostClassifier(n_estimators=50, learning_rate=1.0)
ada.fit(X_train, y_train)

# XGBoost (ekstra kutuphane)
# from xgboost import XGBClassifier
# xgb = XGBClassifier(n_estimators=100, learning_rate=0.1)
# xgb.fit(X_train, y_train)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Clustering</h2>

          <CodeBlock
            title="Kumeleme Algoritmalari"
            code={`# K-Means
from sklearn.cluster import KMeans
kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
clusters = kmeans.fit_predict(X)
centers = kmeans.cluster_centers_
inertia = kmeans.inertia_

# Elbow method
inertias = []
for k in range(1, 11):
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(X)
    inertias.append(kmeans.inertia_)

# DBSCAN
from sklearn.cluster import DBSCAN
dbscan = DBSCAN(eps=0.5, min_samples=5)
clusters = dbscan.fit_predict(X)

# Hierarchical Clustering
from sklearn.cluster import AgglomerativeClustering
hc = AgglomerativeClustering(n_clusters=3, linkage='ward')
clusters = hc.fit_predict(X)

# Silhouette Score
from sklearn.metrics import silhouette_score
score = silhouette_score(X, clusters)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Model Degerlendirme</h2>

          <CodeBlock
            title="Regression Metrikleri"
            code={`from sklearn.metrics import (
    mean_squared_error,
    mean_absolute_error,
    r2_score,
    mean_absolute_percentage_error
)

# Metrikler
mse = mean_squared_error(y_test, y_pred)
rmse = mean_squared_error(y_test, y_pred, squared=False)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
mape = mean_absolute_percentage_error(y_test, y_pred)

print(f"MSE: {mse:.4f}")
print(f"RMSE: {rmse:.4f}")
print(f"MAE: {mae:.4f}")
print(f"R2: {r2:.4f}")
print(f"MAPE: {mape:.4f}")`}
          />

          <CodeBlock
            title="Classification Metrikleri"
            code={`from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    classification_report,
    roc_auc_score,
    roc_curve
)

# Temel metrikler
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, average='weighted')
recall = recall_score(y_test, y_pred, average='weighted')
f1 = f1_score(y_test, y_pred, average='weighted')

# Confusion Matrix
cm = confusion_matrix(y_test, y_pred)

# Classification Report
print(classification_report(y_test, y_pred))

# ROC-AUC
y_prob = model.predict_proba(X_test)[:, 1]
auc = roc_auc_score(y_test, y_prob)
fpr, tpr, thresholds = roc_curve(y_test, y_prob)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Cross Validation ve Hyperparameter Tuning</h2>

          <CodeBlock
            title="Cross Validation"
            code={`from sklearn.model_selection import (
    cross_val_score,
    KFold,
    StratifiedKFold,
    LeaveOneOut
)

# Basit cross validation
scores = cross_val_score(model, X, y, cv=5)
print(f"CV Scores: {scores}")
print(f"Mean: {scores.mean():.4f} (+/- {scores.std()*2:.4f})")

# KFold
kf = KFold(n_splits=5, shuffle=True, random_state=42)
for train_idx, test_idx in kf.split(X):
    X_train, X_test = X[train_idx], X[test_idx]
    y_train, y_test = y[train_idx], y[test_idx]

# StratifiedKFold (sinif dagilimini korur)
skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
for train_idx, test_idx in skf.split(X, y):
    pass`}
          />

          <CodeBlock
            title="Hyperparameter Tuning"
            code={`from sklearn.model_selection import GridSearchCV, RandomizedSearchCV

# Grid Search
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [3, 5, 10, None],
    'min_samples_split': [2, 5, 10]
}

grid_search = GridSearchCV(
    estimator=RandomForestClassifier(random_state=42),
    param_grid=param_grid,
    cv=5,
    scoring='accuracy',
    n_jobs=-1
)

grid_search.fit(X_train, y_train)
print(f"Best params: {grid_search.best_params_}")
print(f"Best score: {grid_search.best_score_:.4f}")
best_model = grid_search.best_estimator_

# Randomized Search
from scipy.stats import randint, uniform
param_dist = {
    'n_estimators': randint(50, 500),
    'max_depth': randint(3, 20),
    'min_samples_split': randint(2, 20)
}

random_search = RandomizedSearchCV(
    estimator=RandomForestClassifier(random_state=42),
    param_distributions=param_dist,
    n_iter=100,
    cv=5,
    random_state=42,
    n_jobs=-1
)
random_search.fit(X_train, y_train)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Pipeline ve Feature Selection</h2>

          <CodeBlock
            title="Pipeline"
            code={`from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer

# Basit pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model', RandomForestClassifier())
])

pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)

# Column transformer (farkli sutunlara farkli islem)
numeric_features = ['age', 'income']
categorical_features = ['gender', 'city']

preprocessor = ColumnTransformer([
    ('num', StandardScaler(), numeric_features),
    ('cat', OneHotEncoder(drop='first'), categorical_features)
])

pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier())
])

pipeline.fit(X_train, y_train)`}
          />

          <CodeBlock
            title="Feature Selection"
            code={`from sklearn.feature_selection import (
    SelectKBest,
    f_classif,
    RFE,
    SelectFromModel
)

# SelectKBest
selector = SelectKBest(score_func=f_classif, k=10)
X_selected = selector.fit_transform(X, y)
selected_features = selector.get_support()

# Recursive Feature Elimination (RFE)
from sklearn.ensemble import RandomForestClassifier
rfe = RFE(
    estimator=RandomForestClassifier(),
    n_features_to_select=10
)
X_selected = rfe.fit_transform(X, y)

# SelectFromModel
selector = SelectFromModel(
    RandomForestClassifier(),
    threshold='median'
)
X_selected = selector.fit_transform(X, y)

# Variance Threshold
from sklearn.feature_selection import VarianceThreshold
selector = VarianceThreshold(threshold=0.01)
X_selected = selector.fit_transform(X)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Model Kaydetme</h2>

          <CodeBlock
            title="Model Persistence"
            code={`import joblib
import pickle

# Joblib ile kaydetme (onerilen)
joblib.dump(model, 'model.joblib')
loaded_model = joblib.load('model.joblib')

# Pickle ile kaydetme
with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)

with open('model.pkl', 'rb') as f:
    loaded_model = pickle.load(f)

# Pipeline kaydetme
joblib.dump(pipeline, 'pipeline.joblib')
loaded_pipeline = joblib.load('pipeline.joblib')

# Tahmin
y_pred = loaded_model.predict(X_new)`}
          />
        </section>
      </div>
    </div>
  )
}
