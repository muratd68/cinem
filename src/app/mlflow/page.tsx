'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Workflow, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function MLflowCheatSheet() {
  const { isDark } = useTheme()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className={`inline-flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-4`}>
          <ArrowLeft className="w-4 h-4" />
          Geri
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-600">
              <Workflow className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">MLflow Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>ML lifecycle management</p>
            </div>
          </div>
          <PDFDownload title="MLflow" sheetId="mlflow" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Kurulum ve Başlangıç</h2>

          <CodeBlock
            language="bash"
            title="Kurulum"
            code={`# Pip ile kurulum
pip install mlflow

# Extras
pip install mlflow[extras]

# UI başlat
mlflow ui
# http://localhost:5000

# Tracking server
mlflow server --host 0.0.0.0 --port 5000`}
          />

          <CodeBlock
            language="python"
            title="Temel Tracking"
            code={`import mlflow

# Experiment ayarla
mlflow.set_experiment("my-experiment")

# Tracking URI
mlflow.set_tracking_uri("http://localhost:5000")
# veya: mlflow.set_tracking_uri("sqlite:///mlflow.db")

# Run başlat
with mlflow.start_run():
    # Parameters
    mlflow.log_param("learning_rate", 0.01)
    mlflow.log_param("epochs", 100)

    # Metrics
    mlflow.log_metric("accuracy", 0.95)
    mlflow.log_metric("loss", 0.05)

    # Metric with step
    for epoch in range(100):
        mlflow.log_metric("train_loss", loss, step=epoch)

    # Artifacts
    mlflow.log_artifact("model.pkl")
    mlflow.log_artifacts("output_folder")

    # Tags
    mlflow.set_tag("model_type", "random_forest")

# Run ID al
run = mlflow.active_run()
print(run.info.run_id)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Autolog</h2>

          <CodeBlock
            language="python"
            title="Otomatik Logging"
            code={`import mlflow

# Scikit-learn
mlflow.sklearn.autolog()
from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier()
model.fit(X_train, y_train)

# TensorFlow/Keras
mlflow.tensorflow.autolog()
model.fit(X_train, y_train, epochs=10)

# PyTorch
mlflow.pytorch.autolog()

# XGBoost
mlflow.xgboost.autolog()

# LightGBM
mlflow.lightgbm.autolog()

# Autolog disable
mlflow.sklearn.autolog(disable=True)

# Selective autolog
mlflow.sklearn.autolog(
    log_input_examples=True,
    log_model_signatures=True,
    log_models=True,
    log_datasets=True
)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Model Logging</h2>

          <CodeBlock
            language="python"
            title="Model Kaydetme"
            code={`import mlflow.sklearn
import mlflow.pytorch
import mlflow.tensorflow

# Scikit-learn
from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier()
model.fit(X_train, y_train)

with mlflow.start_run():
    mlflow.sklearn.log_model(model, "model")

    # Input example ile
    mlflow.sklearn.log_model(
        model,
        "model",
        input_example=X_train[:5],
        signature=mlflow.models.infer_signature(X_train, y_train)
    )

# PyTorch
with mlflow.start_run():
    mlflow.pytorch.log_model(pytorch_model, "model")

# TensorFlow/Keras
with mlflow.start_run():
    mlflow.tensorflow.log_model(tf_model, "model")

# Custom model
class CustomModel(mlflow.pyfunc.PythonModel):
    def load_context(self, context):
        self.model = load_model(context.artifacts["model"])

    def predict(self, context, model_input):
        return self.model.predict(model_input)

with mlflow.start_run():
    mlflow.pyfunc.log_model(
        "model",
        python_model=CustomModel(),
        artifacts={"model": "model.pkl"}
    )`}
          />

          <CodeBlock
            language="python"
            title="Model Yükleme"
            code={`# Run ID ile yükle
model = mlflow.sklearn.load_model(f"runs:/{run_id}/model")

# Model URI ile
model = mlflow.pyfunc.load_model("models:/MyModel/Production")
model = mlflow.pyfunc.load_model("models:/MyModel/1")  # Version

# S3'ten yükle
model = mlflow.sklearn.load_model("s3://bucket/path/to/model")

# Prediction
predictions = model.predict(X_test)

# PyFunc wrapper
pyfunc_model = mlflow.pyfunc.load_model(model_uri)
predictions = pyfunc_model.predict(data)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Model Registry</h2>

          <CodeBlock
            language="python"
            title="Model Kayıt"
            code={`import mlflow
from mlflow.tracking import MlflowClient

client = MlflowClient()

# Model oluştur ve kaydet
with mlflow.start_run():
    mlflow.sklearn.log_model(
        model,
        "model",
        registered_model_name="MyModel"
    )

# Mevcut run'dan kaydet
result = mlflow.register_model(
    f"runs:/{run_id}/model",
    "MyModel"
)

# Model versiyonları listele
versions = client.search_model_versions("name='MyModel'")
for v in versions:
    print(f"Version: {v.version}, Stage: {v.current_stage}")

# Model bilgisi
model = client.get_registered_model("MyModel")
print(model.latest_versions)`}
          />

          <CodeBlock
            language="python"
            title="Stage Yönetimi"
            code={`from mlflow.tracking import MlflowClient

client = MlflowClient()

# Stage'e geçir
client.transition_model_version_stage(
    name="MyModel",
    version=1,
    stage="Staging"  # None, Staging, Production, Archived
)

# Production'a al
client.transition_model_version_stage(
    name="MyModel",
    version=2,
    stage="Production",
    archive_existing_versions=True
)

# Model description
client.update_registered_model(
    name="MyModel",
    description="My classification model"
)

# Version description
client.update_model_version(
    name="MyModel",
    version=1,
    description="First version with baseline features"
)

# Model sil
client.delete_model_version(name="MyModel", version=1)
client.delete_registered_model(name="MyModel")`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Experiments ve Runs</h2>

          <CodeBlock
            language="python"
            title="Experiment Yönetimi"
            code={`import mlflow
from mlflow.tracking import MlflowClient

client = MlflowClient()

# Experiment oluştur
experiment_id = mlflow.create_experiment(
    "my-experiment",
    artifact_location="s3://bucket/artifacts",
    tags={"team": "ml-team"}
)

# Experiment al
experiment = mlflow.get_experiment_by_name("my-experiment")
print(experiment.experiment_id)

# Tüm experiments
experiments = client.search_experiments()

# Experiment sil
client.delete_experiment(experiment_id)`}
          />

          <CodeBlock
            language="python"
            title="Run Sorgulama"
            code={`from mlflow.tracking import MlflowClient

client = MlflowClient()

# Runs ara
runs = client.search_runs(
    experiment_ids=["1"],
    filter_string="metrics.accuracy > 0.9",
    order_by=["metrics.accuracy DESC"],
    max_results=10
)

for run in runs:
    print(f"Run ID: {run.info.run_id}")
    print(f"Accuracy: {run.data.metrics['accuracy']}")
    print(f"Params: {run.data.params}")

# Pandas DataFrame olarak
import mlflow
df = mlflow.search_runs(
    experiment_ids=["1"],
    filter_string="metrics.accuracy > 0.9"
)

# Run bilgisi al
run = client.get_run(run_id)
print(run.data.params)
print(run.data.metrics)
print(run.data.tags)

# Run güncelle
client.set_tag(run_id, "status", "reviewed")

# Run sil
client.delete_run(run_id)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Model Serving</h2>

          <CodeBlock
            language="bash"
            title="Model Serve"
            code={`# Local serve
mlflow models serve -m "models:/MyModel/Production" -p 5001

# Run'dan serve
mlflow models serve -m "runs:/<run_id>/model" -p 5001

# Environment ile
mlflow models serve -m "models:/MyModel/1" --env-manager conda

# No conda
mlflow models serve -m "models:/MyModel/1" --no-conda`}
          />

          <CodeBlock
            language="python"
            title="REST API Kullanımı"
            code={`import requests
import json

# Prediction endpoint
url = "http://localhost:5001/invocations"

# Pandas DataFrame format
data = {
    "dataframe_split": {
        "columns": ["feature1", "feature2", "feature3"],
        "data": [[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]]
    }
}

# Request
response = requests.post(
    url,
    headers={"Content-Type": "application/json"},
    data=json.dumps(data)
)

predictions = response.json()
print(predictions)`}
          />

          <CodeBlock
            language="bash"
            title="Docker Build"
            code={`# Docker image oluştur
mlflow models build-docker -m "models:/MyModel/1" -n my-model-image

# Docker run
docker run -p 5001:8080 my-model-image

# Custom Dockerfile
mlflow models generate-dockerfile -m "models:/MyModel/1" -d ./dockerfile_dir`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Projects</h2>

          <CodeBlock
            language="yaml"
            title="MLproject dosyası"
            code={`name: My ML Project

conda_env: conda.yaml
# veya: docker_env: docker_env.yaml

entry_points:
  main:
    parameters:
      learning_rate: {type: float, default: 0.01}
      epochs: {type: int, default: 100}
    command: "python train.py --lr {learning_rate} --epochs {epochs}"

  validate:
    parameters:
      model_path: path
    command: "python validate.py --model {model_path}"`}
          />

          <CodeBlock
            language="bash"
            title="Project Çalıştırma"
            code={`# Local çalıştır
mlflow run . -P learning_rate=0.01 -P epochs=50

# GitHub'dan çalıştır
mlflow run https://github.com/user/project -P epochs=100

# Entry point belirt
mlflow run . -e validate -P model_path=./model

# Environment seç
mlflow run . --env-manager conda
mlflow run . --env-manager virtualenv`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Backend Stores</h2>

          <CodeBlock
            language="bash"
            title="Storage Konfigürasyonu"
            code={`# SQLite (default)
mlflow server --backend-store-uri sqlite:///mlflow.db

# PostgreSQL
mlflow server --backend-store-uri postgresql://user:pass@host:5432/mlflow

# MySQL
mlflow server --backend-store-uri mysql://user:pass@host:3306/mlflow

# Artifact store - S3
mlflow server \\
    --backend-store-uri postgresql://user:pass@host/mlflow \\
    --default-artifact-root s3://my-bucket/artifacts

# Artifact store - Azure
mlflow server \\
    --default-artifact-root wasbs://container@account.blob.core.windows.net/

# Artifact store - GCS
mlflow server \\
    --default-artifact-root gs://my-bucket/artifacts`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">İleri Özellikler</h2>

          <CodeBlock
            language="python"
            title="Nested Runs"
            code={`import mlflow

# Parent run
with mlflow.start_run(run_name="parent") as parent:
    mlflow.log_param("parent_param", "value")

    # Child runs
    for i in range(3):
        with mlflow.start_run(run_name=f"child_{i}", nested=True):
            mlflow.log_param("child_param", i)
            mlflow.log_metric("score", 0.9 + i * 0.01)`}
          />

          <CodeBlock
            language="python"
            title="Model Signature"
            code={`from mlflow.models.signature import infer_signature, ModelSignature
from mlflow.types.schema import Schema, ColSpec

# Otomatik infer
signature = infer_signature(X_train, model.predict(X_train))

# Manuel tanımlama
input_schema = Schema([
    ColSpec("double", "feature1"),
    ColSpec("double", "feature2"),
    ColSpec("string", "category")
])

output_schema = Schema([ColSpec("long", "prediction")])

signature = ModelSignature(inputs=input_schema, outputs=output_schema)

# Model kaydet
mlflow.sklearn.log_model(model, "model", signature=signature)`}
          />
        </section>
      </div>
    </div>
  )
}
