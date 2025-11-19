'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { BarChart3, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function GrafanaCheatSheet() {
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
            <div className="p-3 rounded-xl bg-orange-600">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Grafana Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Visualization</p>
            </div>
          </div>
          <PDFDownload title="Grafana" sheetId="grafana" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Kurulum ve CLI</h2>

          <CodeBlock
            language="bash"
            title="Kurulum"
            code={`# Docker
docker run -d -p 3000:3000 grafana/grafana

# Docker Compose
version: '3'
services:
  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    volumes:
      - grafana-storage:/var/lib/grafana
volumes:
  grafana-storage:

# Kubernetes (Helm)
helm repo add grafana https://grafana.github.io/helm-charts
helm install grafana grafana/grafana

# grafana-cli
grafana-cli plugins list-remote
grafana-cli plugins install grafana-piechart-panel
grafana-cli admin reset-admin-password newpassword`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Dashboard JSON</h2>

          <CodeBlock
            language="json"
            title="Dashboard Yapısı"
            code={`{
  "dashboard": {
    "id": null,
    "title": "My Dashboard",
    "tags": ["production", "monitoring"],
    "timezone": "browser",
    "refresh": "5s",
    "time": {
      "from": "now-6h",
      "to": "now"
    },
    "templating": {
      "list": []
    },
    "panels": [],
    "annotations": {
      "list": []
    },
    "schemaVersion": 30
  },
  "overwrite": true
}`}
          />

          <CodeBlock
            language="json"
            title="Panel Yapısı"
            code={`{
  "id": 1,
  "type": "graph",
  "title": "CPU Usage",
  "gridPos": {
    "x": 0,
    "y": 0,
    "w": 12,
    "h": 8
  },
  "datasource": "Prometheus",
  "targets": [
    {
      "expr": "100 - (avg by (instance) (rate(node_cpu_seconds_total{mode='idle'}[5m])) * 100)",
      "legendFormat": "{{instance}}",
      "refId": "A"
    }
  ],
  "fieldConfig": {
    "defaults": {
      "unit": "percent",
      "min": 0,
      "max": 100
    }
  },
  "options": {
    "legend": {
      "displayMode": "table",
      "placement": "bottom"
    }
  }
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Variables (Templating)</h2>

          <CodeBlock
            language="json"
            title="Variable Tanımları"
            code={`{
  "templating": {
    "list": [
      {
        "name": "datasource",
        "type": "datasource",
        "query": "prometheus"
      },
      {
        "name": "instance",
        "type": "query",
        "datasource": "Prometheus",
        "query": "label_values(up, instance)",
        "refresh": 1,
        "multi": true,
        "includeAll": true
      },
      {
        "name": "job",
        "type": "query",
        "query": "label_values(up{instance=~'$instance'}, job)"
      },
      {
        "name": "interval",
        "type": "interval",
        "query": "1m,5m,10m,30m,1h",
        "current": {
          "value": "5m"
        }
      },
      {
        "name": "custom",
        "type": "custom",
        "query": "value1,value2,value3"
      }
    ]
  }
}`}
          />

          <CodeBlock
            language="promql"
            title="Variable Kullanımı"
            code={`# Query'de kullanım
rate(http_requests_total{instance=~"$instance", job="$job"}[$interval])

# Multi-value variable
http_requests_total{instance=~"$instance"}  # instance1|instance2|instance3

# All value
http_requests_total{instance=~"$instance"}  # .* when All selected

# Repeat panel
# Panel options > Repeat by variable > instance`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Panel Türleri</h2>

          <CodeBlock
            language="text"
            title="Visualization Types"
            code={`Time Series     - Zaman serisi grafikleri
Stat            - Tek değer gösterimi
Gauge           - Gauge/speedometer
Bar Gauge       - Bar şeklinde gauge
Table           - Tablo görünümü
Pie Chart       - Pasta grafik
Bar Chart       - Bar grafik
Histogram       - Histogram
Heatmap         - Isı haritası
State Timeline  - Durum zaman çizelgesi
Status History  - Durum geçmişi
Logs            - Log panel
Node Graph      - Graf görünümü
Geomap          - Harita
Canvas          - Özel çizim
Alert List      - Alert listesi
Dashboard List  - Dashboard listesi
Text            - Markdown/HTML
News            - RSS feed`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Transformations</h2>

          <CodeBlock
            language="text"
            title="Transform Options"
            code={`# Reduce
- Serileri tek değere indirger (sum, mean, max, min, last, first)

# Merge
- Birden fazla sorgu sonucunu birleştirir

# Filter by name
- Serileri isme göre filtreler

# Filter data by values
- Değerlere göre filtreler

# Organize fields
- Alanları yeniden adlandır, sırala, gizle

# Join by field
- İki veri setini birleştirir (inner, outer join)

# Group by
- Belirli alana göre grupla

# Sort by
- Sıralama

# Add field from calculation
- Hesaplanmış alan ekle

# Convert field type
- Alan tipini dönüştür

# Rename by regex
- Regex ile yeniden adlandır`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Alerting</h2>

          <CodeBlock
            language="yaml"
            title="Alert Rule"
            code={`# Grafana 8+ Unified Alerting
apiVersion: 1
groups:
  - orgId: 1
    name: my-alerts
    folder: alerts
    interval: 1m
    rules:
      - uid: high-cpu-alert
        title: High CPU Usage
        condition: B
        data:
          - refId: A
            datasourceUid: prometheus
            model:
              expr: 100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)
          - refId: B
            datasourceUid: __expr__
            model:
              type: threshold
              expression: A
              conditions:
                - evaluator:
                    type: gt
                    params: [80]
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: CPU usage is high`}
          />

          <CodeBlock
            language="yaml"
            title="Contact Points"
            code={`apiVersion: 1
contactPoints:
  - orgId: 1
    name: email-team
    receivers:
      - uid: email-1
        type: email
        settings:
          addresses: team@example.com

  - orgId: 1
    name: slack-alerts
    receivers:
      - uid: slack-1
        type: slack
        settings:
          url: https://hooks.slack.com/services/xxx
          channel: "#alerts"

  - orgId: 1
    name: pagerduty
    receivers:
      - uid: pd-1
        type: pagerduty
        settings:
          integrationKey: xxx`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Provisioning</h2>

          <CodeBlock
            language="yaml"
            title="Datasource Provisioning"
            code={`# /etc/grafana/provisioning/datasources/datasource.yml
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
    editable: false

  - name: Loki
    type: loki
    access: proxy
    url: http://loki:3100

  - name: InfluxDB
    type: influxdb
    access: proxy
    url: http://influxdb:8086
    database: mydb
    user: admin
    secureJsonData:
      password: secret`}
          />

          <CodeBlock
            language="yaml"
            title="Dashboard Provisioning"
            code={`# /etc/grafana/provisioning/dashboards/dashboards.yml
apiVersion: 1

providers:
  - name: 'default'
    orgId: 1
    folder: ''
    type: file
    disableDeletion: false
    updateIntervalSeconds: 10
    options:
      path: /var/lib/grafana/dashboards

  - name: 'kubernetes'
    orgId: 1
    folder: 'Kubernetes'
    type: file
    options:
      path: /var/lib/grafana/dashboards/kubernetes`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">API</h2>

          <CodeBlock
            language="bash"
            title="Grafana API"
            code={`# API Key oluştur (UI'dan)
# Configuration > API Keys > Add API key

# Dashboard listele
curl -H "Authorization: Bearer API_KEY" \\
  http://localhost:3000/api/search

# Dashboard al
curl -H "Authorization: Bearer API_KEY" \\
  http://localhost:3000/api/dashboards/uid/DASHBOARD_UID

# Dashboard oluştur/güncelle
curl -X POST -H "Authorization: Bearer API_KEY" \\
  -H "Content-Type: application/json" \\
  -d @dashboard.json \\
  http://localhost:3000/api/dashboards/db

# Datasource listele
curl -H "Authorization: Bearer API_KEY" \\
  http://localhost:3000/api/datasources

# Org listele
curl -H "Authorization: Bearer API_KEY" \\
  http://localhost:3000/api/orgs

# User listele
curl -H "Authorization: Bearer API_KEY" \\
  http://localhost:3000/api/users`}
          />

          <CodeBlock
            language="python"
            title="Python ile API"
            code={`import requests

GRAFANA_URL = "http://localhost:3000"
API_KEY = "your-api-key"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

# Dashboard listele
response = requests.get(
    f"{GRAFANA_URL}/api/search",
    headers=headers
)
dashboards = response.json()

# Dashboard al
response = requests.get(
    f"{GRAFANA_URL}/api/dashboards/uid/{uid}",
    headers=headers
)
dashboard = response.json()

# Dashboard kaydet
payload = {
    "dashboard": dashboard_json,
    "overwrite": True
}
response = requests.post(
    f"{GRAFANA_URL}/api/dashboards/db",
    headers=headers,
    json=payload
)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Configuration</h2>

          <CodeBlock
            language="ini"
            title="grafana.ini"
            code={`[server]
http_port = 3000
domain = grafana.example.com
root_url = %(protocol)s://%(domain)s/

[database]
type = postgres
host = localhost:5432
name = grafana
user = grafana
password = secret

[security]
admin_user = admin
admin_password = secret
secret_key = your-secret-key

[auth.anonymous]
enabled = true
org_name = Main Org.
org_role = Viewer

[auth.ldap]
enabled = true
config_file = /etc/grafana/ldap.toml

[smtp]
enabled = true
host = smtp.gmail.com:587
user = alerts@example.com
password = secret
from_address = alerts@example.com

[alerting]
enabled = true
execute_alerts = true

[log]
mode = console file
level = info`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Keyboard Shortcuts</h2>

          <CodeBlock
            language="text"
            title="Shortcuts"
            code={`# Global
g h     - Home dashboard
g p     - Profile
g s     - Search
?       - Shortcuts help
Esc     - Exit edit/setting

# Dashboard
d s     - Dashboard settings
d v     - Toggle view mode
d r     - Refresh
d k     - Toggle kiosk mode (hide panels)
d E     - Expand all rows
d C     - Collapse all rows

# Panel
e       - Toggle edit mode
v       - View panel
i       - Inspect panel
p s     - Share panel
p d     - Duplicate panel
p r     - Remove panel

# Time range
t z     - Zoom out
t ←     - Move time back
t →     - Move time forward`}
          />
        </section>
      </div>
    </div>
  )
}
