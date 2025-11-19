'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Cloud, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function GCPCheatSheet() {
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
              <Cloud className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">GCP Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Google Cloud Platform</p>
            </div>
          </div>
          <PDFDownload title="GCP" sheetId="gcp" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">gcloud CLI</h2>

          <CodeBlock
            language="bash"
            title="Temel Komutlar"
            code={`# Login
gcloud auth login
gcloud auth application-default login

# Project
gcloud projects list
gcloud config set project PROJECT_ID
gcloud config get-value project

# Config
gcloud config list
gcloud config set compute/zone us-central1-a
gcloud config set compute/region us-central1

# Account
gcloud auth list
gcloud config set account user@example.com

# Components
gcloud components list
gcloud components install kubectl
gcloud components update`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Compute Engine</h2>

          <CodeBlock
            language="bash"
            title="VM İşlemleri"
            code={`# VM listele
gcloud compute instances list

# VM oluştur
gcloud compute instances create myvm \\
    --zone=us-central1-a \\
    --machine-type=e2-medium \\
    --image-family=debian-11 \\
    --image-project=debian-cloud \\
    --boot-disk-size=10GB

# VM bilgisi
gcloud compute instances describe myvm --zone=us-central1-a

# VM başlat/durdur
gcloud compute instances start myvm --zone=us-central1-a
gcloud compute instances stop myvm --zone=us-central1-a

# VM sil
gcloud compute instances delete myvm --zone=us-central1-a

# SSH
gcloud compute ssh myvm --zone=us-central1-a

# SCP
gcloud compute scp local.txt myvm:~/remote.txt --zone=us-central1-a

# Machine types
gcloud compute machine-types list --filter="zone:us-central1-a"

# Images
gcloud compute images list`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Cloud Storage</h2>

          <CodeBlock
            language="bash"
            title="gsutil Komutları"
            code={`# Bucket oluştur
gsutil mb gs://my-bucket
gsutil mb -l us-central1 gs://my-bucket

# Bucket listele
gsutil ls
gsutil ls gs://my-bucket

# Upload
gsutil cp local.txt gs://my-bucket/
gsutil cp -r local_dir gs://my-bucket/

# Download
gsutil cp gs://my-bucket/file.txt .
gsutil cp -r gs://my-bucket/dir .

# Move/Rename
gsutil mv gs://my-bucket/old.txt gs://my-bucket/new.txt

# Delete
gsutil rm gs://my-bucket/file.txt
gsutil rm -r gs://my-bucket/dir

# Sync
gsutil rsync -r local_dir gs://my-bucket/dir

# ACL
gsutil acl get gs://my-bucket
gsutil acl ch -u user@example.com:R gs://my-bucket/file.txt

# Public erişim
gsutil acl ch -u AllUsers:R gs://my-bucket/file.txt

# Bucket sil
gsutil rb gs://my-bucket`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">GKE (Kubernetes)</h2>

          <CodeBlock
            language="bash"
            title="GKE Cluster"
            code={`# Cluster oluştur
gcloud container clusters create my-cluster \\
    --zone us-central1-a \\
    --num-nodes 3 \\
    --machine-type e2-medium

# Autopilot cluster
gcloud container clusters create-auto my-cluster \\
    --region us-central1

# Cluster listele
gcloud container clusters list

# Credentials al
gcloud container clusters get-credentials my-cluster \\
    --zone us-central1-a

# Node pools
gcloud container node-pools list --cluster my-cluster
gcloud container node-pools create my-pool \\
    --cluster my-cluster \\
    --num-nodes 2 \\
    --machine-type e2-standard-4

# Resize
gcloud container clusters resize my-cluster \\
    --node-pool default-pool \\
    --num-nodes 5 \\
    --zone us-central1-a

# Upgrade
gcloud container clusters upgrade my-cluster \\
    --zone us-central1-a

# Delete
gcloud container clusters delete my-cluster --zone us-central1-a`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Cloud Functions</h2>

          <CodeBlock
            language="bash"
            title="Functions Deployment"
            code={`# Deploy HTTP function
gcloud functions deploy my-function \\
    --runtime python39 \\
    --trigger-http \\
    --allow-unauthenticated \\
    --entry-point main

# Deploy Pub/Sub trigger
gcloud functions deploy my-function \\
    --runtime python39 \\
    --trigger-topic my-topic \\
    --entry-point main

# Deploy Storage trigger
gcloud functions deploy my-function \\
    --runtime python39 \\
    --trigger-bucket my-bucket \\
    --entry-point main

# Environment variables
gcloud functions deploy my-function \\
    --set-env-vars KEY=value

# List
gcloud functions list

# Logs
gcloud functions logs read my-function

# Delete
gcloud functions delete my-function`}
          />

          <CodeBlock
            language="python"
            title="Python Function Örneği"
            code={`# main.py
def hello_http(request):
    request_json = request.get_json(silent=True)
    name = request_json.get('name', 'World') if request_json else 'World'
    return f'Hello, {name}!'

def hello_pubsub(event, context):
    import base64
    if 'data' in event:
        message = base64.b64decode(event['data']).decode('utf-8')
        print(f'Message: {message}')

def hello_gcs(event, context):
    print(f"File: {event['name']}")
    print(f"Bucket: {event['bucket']}")`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Cloud Run</h2>

          <CodeBlock
            language="bash"
            title="Cloud Run Deployment"
            code={`# Deploy from source
gcloud run deploy my-service \\
    --source . \\
    --region us-central1 \\
    --allow-unauthenticated

# Deploy from image
gcloud run deploy my-service \\
    --image gcr.io/PROJECT_ID/my-image \\
    --region us-central1

# Environment variables
gcloud run deploy my-service \\
    --set-env-vars KEY=value,KEY2=value2

# Memory ve CPU
gcloud run deploy my-service \\
    --memory 512Mi \\
    --cpu 1

# Concurrency
gcloud run deploy my-service \\
    --concurrency 80 \\
    --max-instances 10

# List
gcloud run services list

# Describe
gcloud run services describe my-service --region us-central1

# Delete
gcloud run services delete my-service --region us-central1`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">BigQuery</h2>

          <CodeBlock
            language="bash"
            title="bq Komutları"
            code={`# Dataset oluştur
bq mk my_dataset

# Table oluştur
bq mk --table my_dataset.my_table schema.json

# Query çalıştır
bq query --use_legacy_sql=false 'SELECT * FROM my_dataset.my_table LIMIT 10'

# Load data
bq load --source_format=CSV my_dataset.my_table gs://bucket/data.csv

# Export
bq extract my_dataset.my_table gs://bucket/export.csv

# Table bilgisi
bq show my_dataset.my_table

# List
bq ls
bq ls my_dataset

# Delete
bq rm -t my_dataset.my_table
bq rm -r -d my_dataset`}
          />

          <CodeBlock
            language="python"
            title="Python ile BigQuery"
            code={`from google.cloud import bigquery

client = bigquery.Client()

# Query
query = """
    SELECT name, COUNT(*) as count
    FROM \`project.dataset.table\`
    GROUP BY name
    ORDER BY count DESC
    LIMIT 10
"""

results = client.query(query)
for row in results:
    print(f"{row.name}: {row.count}")

# Load from DataFrame
import pandas as pd
df = pd.DataFrame({"name": ["Alice", "Bob"], "age": [30, 25]})

table_id = "project.dataset.table"
job = client.load_table_from_dataframe(df, table_id)
job.result()

# Query to DataFrame
df = client.query(query).to_dataframe()`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Pub/Sub</h2>

          <CodeBlock
            language="bash"
            title="Pub/Sub Komutları"
            code={`# Topic oluştur
gcloud pubsub topics create my-topic

# Subscription oluştur
gcloud pubsub subscriptions create my-sub --topic my-topic

# Publish
gcloud pubsub topics publish my-topic --message "Hello"

# Pull
gcloud pubsub subscriptions pull my-sub --auto-ack

# List
gcloud pubsub topics list
gcloud pubsub subscriptions list`}
          />

          <CodeBlock
            language="python"
            title="Python ile Pub/Sub"
            code={`from google.cloud import pubsub_v1

# Publisher
publisher = pubsub_v1.PublisherClient()
topic_path = publisher.topic_path("project-id", "my-topic")

data = "Hello, World!".encode("utf-8")
future = publisher.publish(topic_path, data)
print(f"Published: {future.result()}")

# Subscriber
subscriber = pubsub_v1.SubscriberClient()
subscription_path = subscriber.subscription_path("project-id", "my-sub")

def callback(message):
    print(f"Received: {message.data}")
    message.ack()

streaming_pull = subscriber.subscribe(subscription_path, callback=callback)

with subscriber:
    streaming_pull.result(timeout=30)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">IAM</h2>

          <CodeBlock
            language="bash"
            title="IAM Komutları"
            code={`# Service account oluştur
gcloud iam service-accounts create my-sa \\
    --display-name "My Service Account"

# Key oluştur
gcloud iam service-accounts keys create key.json \\
    --iam-account my-sa@PROJECT_ID.iam.gserviceaccount.com

# Role ata
gcloud projects add-iam-policy-binding PROJECT_ID \\
    --member serviceAccount:my-sa@PROJECT_ID.iam.gserviceaccount.com \\
    --role roles/storage.admin

# Policy görüntüle
gcloud projects get-iam-policy PROJECT_ID

# List service accounts
gcloud iam service-accounts list

# List roles
gcloud iam roles list`}
          />
        </section>
      </div>
    </div>
  )
}
