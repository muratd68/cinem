'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { BarChart3, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function PrometheusCheatSheet() {
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
            <div className="p-3 rounded-xl bg-orange-500">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Prometheus Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Monitoring</p>
            </div>
          </div>
          <PDFDownload title="Prometheus" sheetId="prometheus" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Konfigürasyon</h2>

          <CodeBlock
            language="yaml"
            title="prometheus.yml"
            code={`global:
  scrape_interval: 15s
  evaluation_interval: 15s
  external_labels:
    monitor: 'my-monitor'

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093

rule_files:
  - "rules/*.yml"

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node'
    static_configs:
      - targets: ['node1:9100', 'node2:9100']
        labels:
          env: 'production'

  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">PromQL Temel</h2>

          <CodeBlock
            language="promql"
            title="Selectors"
            code={`# Instant vector
http_requests_total

# Label matchers
http_requests_total{job="api"}
http_requests_total{status="200"}
http_requests_total{method=~"GET|POST"}  # regex
http_requests_total{status!="500"}        # not equal
http_requests_total{path=~"/api/.*"}      # regex match
http_requests_total{path!~"/health.*"}    # not regex

# Multiple labels
http_requests_total{job="api", status="200"}

# Range vector (son 5 dakika)
http_requests_total[5m]
http_requests_total{job="api"}[1h]`}
          />

          <CodeBlock
            language="promql"
            title="Offset ve Time"
            code={`# 1 saat önceki değer
http_requests_total offset 1h

# 1 gün önceki değer
http_requests_total offset 1d

# @ modifier (belirli zaman)
http_requests_total @ 1609459200

# Range ile offset
rate(http_requests_total[5m] offset 1h)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Operators</h2>

          <CodeBlock
            language="promql"
            title="Arithmetic Operators"
            code={`# Temel operatörler
node_memory_MemTotal_bytes - node_memory_MemFree_bytes
node_filesystem_size_bytes / 1024 / 1024 / 1024  # GB
cpu_usage * 100

# Karşılaştırma
http_requests_total > 100
node_cpu_seconds_total == 0

# Bool modifier
http_requests_total > bool 100  # 1 veya 0 döner`}
          />

          <CodeBlock
            language="promql"
            title="Vector Matching"
            code={`# One-to-one
method_code:http_errors:rate5m / ignoring(code) method:http_requests:rate5m

# Many-to-one
method_code:http_errors:rate5m / on(method) group_left method:http_requests:rate5m

# ignoring ve on
A * on(instance) B
A * ignoring(job) B`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Aggregation</h2>

          <CodeBlock
            language="promql"
            title="Aggregation Operators"
            code={`# Sum
sum(http_requests_total)
sum by (job) (http_requests_total)
sum without (instance) (http_requests_total)

# Count
count(up)
count by (job) (up)

# Avg, Min, Max
avg(node_cpu_seconds_total)
min(node_memory_MemFree_bytes)
max(http_request_duration_seconds)

# Stddev, Stdvar
stddev(http_request_duration_seconds)

# Top/Bottom K
topk(5, http_requests_total)
bottomk(3, node_memory_MemFree_bytes)

# Quantile
quantile(0.95, http_request_duration_seconds)

# Count values
count_values("version", build_info)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Functions</h2>

          <CodeBlock
            language="promql"
            title="Rate ve Increase"
            code={`# Rate (per-second average)
rate(http_requests_total[5m])

# İrate (instant rate)
irate(http_requests_total[5m])

# Increase (toplam artış)
increase(http_requests_total[1h])

# Delta (gauge için)
delta(cpu_temp_celsius[1h])

# İdelta
idelta(cpu_temp_celsius[5m])`}
          />

          <CodeBlock
            language="promql"
            title="Math Functions"
            code={`# Abs
abs(delta(cpu_temp_celsius[1h]))

# Ceil, Floor, Round
ceil(cpu_usage)
floor(memory_usage)
round(cpu_usage, 0.1)

# Clamp
clamp(cpu_usage, 0, 100)
clamp_min(cpu_usage, 0)
clamp_max(cpu_usage, 100)

# Exp, Ln, Log
exp(cpu_usage)
ln(http_requests_total)
log2(memory_bytes)
log10(requests)

# Sqrt
sqrt(variance)`}
          />

          <CodeBlock
            language="promql"
            title="Time Functions"
            code={`# Timestamp
timestamp(up)

# Time
time()  # current Unix time

# Day of week, hour, etc.
day_of_week()
day_of_month()
days_in_month()
hour()
minute()
month()
year()`}
          />

          <CodeBlock
            language="promql"
            title="Diğer Functions"
            code={`# Changes (değer değişim sayısı)
changes(process_start_time_seconds[1h])

# Resets (counter reset sayısı)
resets(http_requests_total[1h])

# Absent (metric yoksa 1)
absent(up{job="api"})

# Label functions
label_join(up, "combined", ",", "job", "instance")
label_replace(up, "host", "$1", "instance", "(.*):.*")

# Sort
sort(http_requests_total)
sort_desc(http_requests_total)

# Vector
vector(1)  # scalar to vector

# Histogram quantile
histogram_quantile(0.95, rate(http_request_duration_bucket[5m]))

# Predict linear
predict_linear(node_filesystem_free_bytes[1h], 4*3600)

# Deriv (derivative)
deriv(process_resident_memory_bytes[5m])`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Recording Rules</h2>

          <CodeBlock
            language="yaml"
            title="rules.yml"
            code={`groups:
  - name: example
    interval: 15s
    rules:
      # Recording rule
      - record: job:http_requests:rate5m
        expr: sum by (job) (rate(http_requests_total[5m]))

      - record: instance:node_cpu:avg_rate5m
        expr: 100 - avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100

      - record: job:http_errors:rate5m
        expr: sum by (job) (rate(http_requests_total{status=~"5.."}[5m]))`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Alerting Rules</h2>

          <CodeBlock
            language="yaml"
            title="alerts.yml"
            code={`groups:
  - name: alerts
    rules:
      - alert: HighErrorRate
        expr: sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) > 0.1
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value | humanizePercentage }}"

      - alert: InstanceDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Instance {{ $labels.instance }} down"

      - alert: DiskSpaceLow
        expr: (node_filesystem_avail_bytes / node_filesystem_size_bytes) * 100 < 10
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Disk space low on {{ $labels.instance }}"
          description: "Available: {{ $value | humanize }}%"`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Yaygın Sorgular</h2>

          <CodeBlock
            language="promql"
            title="CPU ve Memory"
            code={`# CPU kullanımı (%)
100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# Memory kullanımı (%)
(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100

# Memory kullanımı (GB)
(node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / 1024^3

# Load average
node_load1
node_load5
node_load15`}
          />

          <CodeBlock
            language="promql"
            title="Disk ve Network"
            code={`# Disk kullanımı (%)
100 - ((node_filesystem_avail_bytes / node_filesystem_size_bytes) * 100)

# Disk I/O
rate(node_disk_read_bytes_total[5m])
rate(node_disk_written_bytes_total[5m])

# Network traffic
rate(node_network_receive_bytes_total[5m])
rate(node_network_transmit_bytes_total[5m])

# Network errors
rate(node_network_receive_errs_total[5m])
rate(node_network_transmit_errs_total[5m])`}
          />

          <CodeBlock
            language="promql"
            title="HTTP Metrics"
            code={`# Request rate
sum(rate(http_requests_total[5m]))

# Error rate
sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m]))

# Latency (95th percentile)
histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))

# Requests by status
sum by (status) (rate(http_requests_total[5m]))

# Apdex score
(
  sum(rate(http_request_duration_seconds_bucket{le="0.3"}[5m]))
  + sum(rate(http_request_duration_seconds_bucket{le="1.2"}[5m]))
) / 2 / sum(rate(http_request_duration_seconds_count[5m]))`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Python Client</h2>

          <CodeBlock
            language="python"
            title="Prometheus Client"
            code={`from prometheus_client import Counter, Gauge, Histogram, Summary
from prometheus_client import start_http_server, generate_latest

# Counter (sadece artış)
requests_total = Counter(
    'http_requests_total',
    'Total HTTP requests',
    ['method', 'endpoint']
)
requests_total.labels(method='GET', endpoint='/api').inc()

# Gauge (artış/azalış)
temperature = Gauge('temperature_celsius', 'Current temperature')
temperature.set(23.5)
temperature.inc()
temperature.dec()

# Histogram
request_duration = Histogram(
    'request_duration_seconds',
    'Request duration',
    buckets=[0.1, 0.5, 1, 2, 5]
)
request_duration.observe(0.5)

# Context manager
with request_duration.time():
    process_request()

# Summary
request_latency = Summary('request_latency_seconds', 'Request latency')
request_latency.observe(0.3)

# Metrics endpoint
start_http_server(8000)  # /metrics endpoint`}
          />
        </section>
      </div>
    </div>
  )
}
