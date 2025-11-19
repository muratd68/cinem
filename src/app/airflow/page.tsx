'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Workflow, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function AirflowCheatSheet() {
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
            <div className="p-3 rounded-xl bg-teal-500">
              <Workflow className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Apache Airflow Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Workflow orchestration</p>
            </div>
          </div>
          <PDFDownload title="Airflow" sheetId="airflow" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Kurulum ve CLI</h2>

          <CodeBlock
            language="bash"
            title="Kurulum"
            code={`# Pip ile kurulum
pip install apache-airflow

# Extras ile
pip install apache-airflow[postgres,redis,celery]

# Database initialize
airflow db init

# Kullanıcı oluştur
airflow users create \\
    --username admin \\
    --firstname Admin \\
    --lastname User \\
    --role Admin \\
    --email admin@example.com

# Webserver başlat
airflow webserver --port 8080

# Scheduler başlat
airflow scheduler`}
          />

          <CodeBlock
            language="bash"
            title="CLI Komutları"
            code={`# DAG listele
airflow dags list

# DAG tasks
airflow tasks list my_dag

# DAG trigger
airflow dags trigger my_dag

# Task test
airflow tasks test my_dag my_task 2023-01-01

# Task run
airflow tasks run my_dag my_task 2023-01-01

# DAG pause/unpause
airflow dags pause my_dag
airflow dags unpause my_dag

# Backfill
airflow dags backfill my_dag \\
    --start-date 2023-01-01 \\
    --end-date 2023-01-31

# Clear task instances
airflow tasks clear my_dag -s 2023-01-01 -e 2023-01-31

# Connections
airflow connections list
airflow connections add my_conn --conn-type postgres --host localhost

# Variables
airflow variables set my_var "value"
airflow variables get my_var`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">DAG Tanımlama</h2>

          <CodeBlock
            language="python"
            title="Temel DAG"
            code={`from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.bash import BashOperator

# Default arguments
default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'email': ['alert@example.com'],
    'email_on_failure': True,
    'email_on_retry': False,
    'retries': 3,
    'retry_delay': timedelta(minutes=5),
}

# DAG tanımla
dag = DAG(
    'my_dag',
    default_args=default_args,
    description='My first DAG',
    schedule_interval=timedelta(days=1),  # veya cron: '0 0 * * *'
    start_date=datetime(2023, 1, 1),
    catchup=False,
    tags=['example'],
)

# Tasks
def my_python_function():
    print("Hello from Python!")
    return "success"

task1 = PythonOperator(
    task_id='python_task',
    python_callable=my_python_function,
    dag=dag,
)

task2 = BashOperator(
    task_id='bash_task',
    bash_command='echo "Hello from Bash!"',
    dag=dag,
)

# Dependencies
task1 >> task2`}
          />

          <CodeBlock
            language="python"
            title="TaskFlow API (Airflow 2.0+)"
            code={`from airflow.decorators import dag, task
from datetime import datetime

@dag(
    schedule_interval='@daily',
    start_date=datetime(2023, 1, 1),
    catchup=False,
    tags=['taskflow']
)
def my_taskflow_dag():

    @task()
    def extract():
        return {"data": [1, 2, 3]}

    @task()
    def transform(data: dict):
        return {"transformed": [x * 2 for x in data["data"]]}

    @task()
    def load(data: dict):
        print(f"Loading: {data}")

    # XCom otomatik
    data = extract()
    transformed = transform(data)
    load(transformed)

# DAG oluştur
dag = my_taskflow_dag()`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Operators</h2>

          <CodeBlock
            language="python"
            title="Yaygın Operators"
            code={`from airflow.operators.python import PythonOperator, BranchPythonOperator
from airflow.operators.bash import BashOperator
from airflow.operators.empty import EmptyOperator
from airflow.operators.email import EmailOperator

# PythonOperator
def process_data(**context):
    ti = context['ti']
    data = ti.xcom_pull(task_ids='extract')
    return data * 2

python_task = PythonOperator(
    task_id='process',
    python_callable=process_data,
    provide_context=True,
)

# BashOperator
bash_task = BashOperator(
    task_id='run_script',
    bash_command='python /path/to/script.py {{ ds }}',
    env={'MY_VAR': 'value'},
)

# EmailOperator
email_task = EmailOperator(
    task_id='send_email',
    to='user@example.com',
    subject='Airflow Alert',
    html_content='<h1>Task completed</h1>',
)

# EmptyOperator (placeholder)
start = EmptyOperator(task_id='start')
end = EmptyOperator(task_id='end')`}
          />

          <CodeBlock
            language="python"
            title="Database Operators"
            code={`from airflow.providers.postgres.operators.postgres import PostgresOperator
from airflow.providers.mysql.operators.mysql import MySqlOperator

# PostgresOperator
create_table = PostgresOperator(
    task_id='create_table',
    postgres_conn_id='my_postgres',
    sql='''
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100)
        )
    ''',
)

# SQL dosyasından
run_query = PostgresOperator(
    task_id='run_query',
    postgres_conn_id='my_postgres',
    sql='sql/my_query.sql',
)

# Parameters
insert_data = PostgresOperator(
    task_id='insert_data',
    postgres_conn_id='my_postgres',
    sql='INSERT INTO users (name) VALUES (%(name)s)',
    parameters={'name': 'John'},
)`}
          />

          <CodeBlock
            language="python"
            title="Cloud Operators"
            code={`# AWS
from airflow.providers.amazon.aws.operators.s3 import S3CopyObjectOperator
from airflow.providers.amazon.aws.transfers.local_to_s3 import LocalToS3Operator

upload_to_s3 = LocalToS3Operator(
    task_id='upload_to_s3',
    filename='/local/file.csv',
    dest_key='data/file.csv',
    dest_bucket='my-bucket',
    aws_conn_id='aws_default',
)

# GCP
from airflow.providers.google.cloud.operators.bigquery import BigQueryInsertJobOperator

bq_query = BigQueryInsertJobOperator(
    task_id='bq_query',
    configuration={
        "query": {
            "query": "SELECT * FROM dataset.table",
            "useLegacySql": False,
        }
    },
    gcp_conn_id='google_cloud_default',
)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Sensors</h2>

          <CodeBlock
            language="python"
            title="Sensor Kullanımı"
            code={`from airflow.sensors.filesystem import FileSensor
from airflow.sensors.external_task import ExternalTaskSensor
from airflow.sensors.sql import SqlSensor
from airflow.providers.http.sensors.http import HttpSensor

# File Sensor
wait_for_file = FileSensor(
    task_id='wait_for_file',
    filepath='/data/input.csv',
    poke_interval=60,  # saniye
    timeout=60 * 60,   # 1 saat
    mode='poke',  # veya 'reschedule'
)

# External Task Sensor
wait_for_dag = ExternalTaskSensor(
    task_id='wait_for_upstream',
    external_dag_id='upstream_dag',
    external_task_id='final_task',
    execution_delta=timedelta(hours=1),
)

# SQL Sensor
wait_for_data = SqlSensor(
    task_id='wait_for_data',
    conn_id='my_postgres',
    sql="SELECT COUNT(*) FROM orders WHERE date = '{{ ds }}'",
    success=lambda x: x > 0,
)

# HTTP Sensor
wait_for_api = HttpSensor(
    task_id='wait_for_api',
    http_conn_id='api_conn',
    endpoint='health',
    response_check=lambda response: response.status_code == 200,
)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Branching ve Control Flow</h2>

          <CodeBlock
            language="python"
            title="Branching"
            code={`from airflow.operators.python import BranchPythonOperator
from airflow.operators.empty import EmptyOperator

def choose_branch(**context):
    if context['execution_date'].weekday() < 5:
        return 'weekday_task'
    else:
        return 'weekend_task'

branch = BranchPythonOperator(
    task_id='branch',
    python_callable=choose_branch,
)

weekday = EmptyOperator(task_id='weekday_task')
weekend = EmptyOperator(task_id='weekend_task')

join = EmptyOperator(
    task_id='join',
    trigger_rule='none_failed_min_one_success'
)

branch >> [weekday, weekend] >> join`}
          />

          <CodeBlock
            language="python"
            title="Trigger Rules"
            code={`from airflow.utils.trigger_rule import TriggerRule

# Trigger rule seçenekleri
task = EmptyOperator(
    task_id='my_task',
    trigger_rule=TriggerRule.ALL_SUCCESS,  # default
)

# Tüm seçenekler:
# ALL_SUCCESS - tüm upstream başarılı
# ALL_FAILED - tüm upstream başarısız
# ALL_DONE - tüm upstream tamamlandı
# ONE_SUCCESS - en az bir başarılı
# ONE_FAILED - en az bir başarısız
# NONE_FAILED - hiçbiri başarısız
# NONE_SKIPPED - hiçbiri skip
# NONE_FAILED_MIN_ONE_SUCCESS - başarısız yok, en az bir başarılı`}
          />

          <CodeBlock
            language="python"
            title="Dynamic Task Generation"
            code={`from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

with DAG('dynamic_dag', start_date=datetime(2023, 1, 1)) as dag:

    # Liste ile dinamik tasks
    files = ['file1.csv', 'file2.csv', 'file3.csv']

    tasks = []
    for file in files:
        task = PythonOperator(
            task_id=f'process_{file.replace(".", "_")}',
            python_callable=lambda f=file: print(f"Processing {f}"),
        )
        tasks.append(task)

    # Chain tasks
    for i in range(len(tasks) - 1):
        tasks[i] >> tasks[i + 1]`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">XCom</h2>

          <CodeBlock
            language="python"
            title="XCom Kullanımı"
            code={`from airflow.operators.python import PythonOperator

# XCom push
def push_data(**context):
    # Return otomatik push
    return {"key": "value"}

    # Manuel push
    context['ti'].xcom_push(key='my_key', value='my_value')

# XCom pull
def pull_data(**context):
    ti = context['ti']

    # Default key (return value)
    data = ti.xcom_pull(task_ids='push_task')

    # Specific key
    value = ti.xcom_pull(task_ids='push_task', key='my_key')

    # Multiple tasks
    results = ti.xcom_pull(task_ids=['task1', 'task2'])

push_task = PythonOperator(
    task_id='push_task',
    python_callable=push_data,
)

pull_task = PythonOperator(
    task_id='pull_task',
    python_callable=pull_data,
)

push_task >> pull_task`}
          />

          <CodeBlock
            language="python"
            title="Jinja ile XCom"
            code={`# Template içinde XCom kullan
bash_task = BashOperator(
    task_id='use_xcom',
    bash_command='echo "{{ ti.xcom_pull(task_ids=\\'extract\\') }}"',
)

# SQL içinde
sql_task = PostgresOperator(
    task_id='insert',
    sql='''
        INSERT INTO results (value)
        VALUES ('{{ ti.xcom_pull(task_ids="compute") }}')
    ''',
)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Variables ve Connections</h2>

          <CodeBlock
            language="python"
            title="Variables"
            code={`from airflow.models import Variable

# Variable al
value = Variable.get("my_variable")

# Default value
value = Variable.get("my_variable", default_var="default")

# JSON deserialize
config = Variable.get("config", deserialize_json=True)

# Variable set
Variable.set("my_variable", "value")
Variable.set("config", {"key": "value"}, serialize_json=True)

# Template içinde
bash_task = BashOperator(
    task_id='use_var',
    bash_command='echo "{{ var.value.my_variable }}"',
)

# JSON variable template
# {{ var.json.config.key }}`}
          />

          <CodeBlock
            language="python"
            title="Connections"
            code={`from airflow.hooks.base import BaseHook

# Connection al
conn = BaseHook.get_connection("my_conn_id")
print(conn.host)
print(conn.login)
print(conn.password)
print(conn.port)
print(conn.extra_dejson)  # Extra JSON field

# Hook kullan
from airflow.providers.postgres.hooks.postgres import PostgresHook

def query_postgres():
    hook = PostgresHook(postgres_conn_id='my_postgres')

    # SQL çalıştır
    records = hook.get_records("SELECT * FROM users")

    # Pandas DataFrame
    df = hook.get_pandas_df("SELECT * FROM users")

    # Insert
    hook.insert_rows('users', [('John',), ('Jane',)])`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Schedule Patterns</h2>

          <CodeBlock
            language="python"
            title="Schedule Interval"
            code={`from airflow import DAG
from datetime import datetime, timedelta

# Cron expression
dag = DAG(
    'cron_dag',
    schedule_interval='0 0 * * *',  # Her gün gece yarısı
    start_date=datetime(2023, 1, 1),
)

# Timedelta
dag = DAG(
    'interval_dag',
    schedule_interval=timedelta(hours=6),
    start_date=datetime(2023, 1, 1),
)

# Preset schedules
# @once - bir kez
# @hourly - 0 * * * *
# @daily - 0 0 * * *
# @weekly - 0 0 * * 0
# @monthly - 0 0 1 * *
# @yearly - 0 0 1 1 *

dag = DAG(
    'preset_dag',
    schedule_interval='@daily',
    start_date=datetime(2023, 1, 1),
)

# None - manuel trigger
dag = DAG(
    'manual_dag',
    schedule_interval=None,
    start_date=datetime(2023, 1, 1),
)`}
          />
        </section>
      </div>
    </div>
  )
}
