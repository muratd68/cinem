'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Ship, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function HelmCheatSheet() {
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
              <Ship className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Helm Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Kubernetes package manager</p>
            </div>
          </div>
          <PDFDownload title="Helm" sheetId="helm" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Temel Komutlar</h2>

          <CodeBlock
            language="bash"
            title="Repository"
            code={`# Repo ekle
helm repo add stable https://charts.helm.sh/stable
helm repo add bitnami https://charts.bitnami.com/bitnami

# Repo listele
helm repo list

# Repo güncelle
helm repo update

# Repo kaldır
helm repo remove stable

# Chart ara
helm search repo nginx
helm search hub wordpress`}
          />

          <CodeBlock
            language="bash"
            title="Release Yönetimi"
            code={`# Chart install
helm install my-release bitnami/nginx
helm install my-release bitnami/nginx --namespace mynamespace --create-namespace

# Custom values
helm install my-release bitnami/nginx -f values.yaml
helm install my-release bitnami/nginx --set replicaCount=3

# Dry run
helm install my-release bitnami/nginx --dry-run

# Release listele
helm list
helm list --all-namespaces
helm list -n mynamespace

# Release bilgisi
helm status my-release
helm get values my-release
helm get manifest my-release
helm get all my-release

# Upgrade
helm upgrade my-release bitnami/nginx
helm upgrade my-release bitnami/nginx -f values.yaml
helm upgrade --install my-release bitnami/nginx  # install or upgrade

# Rollback
helm rollback my-release
helm rollback my-release 1  # specific revision

# History
helm history my-release

# Uninstall
helm uninstall my-release
helm uninstall my-release --keep-history`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Chart Oluşturma</h2>

          <CodeBlock
            language="bash"
            title="Chart Scaffolding"
            code={`# Yeni chart oluştur
helm create mychart

# Chart yapısı
mychart/
  Chart.yaml          # Chart metadata
  values.yaml         # Default values
  charts/             # Dependencies
  templates/          # Template files
    deployment.yaml
    service.yaml
    ingress.yaml
    _helpers.tpl      # Template helpers
    NOTES.txt         # Post-install notes
  .helmignore         # Files to ignore`}
          />

          <CodeBlock
            language="yaml"
            title="Chart.yaml"
            code={`apiVersion: v2
name: mychart
description: A Helm chart for Kubernetes
type: application
version: 0.1.0
appVersion: "1.0.0"

maintainers:
  - name: John Doe
    email: john@example.com

dependencies:
  - name: postgresql
    version: "11.x.x"
    repository: https://charts.bitnami.com/bitnami
    condition: postgresql.enabled
  - name: redis
    version: "16.x.x"
    repository: https://charts.bitnami.com/bitnami
    condition: redis.enabled`}
          />

          <CodeBlock
            language="yaml"
            title="values.yaml"
            code={`replicaCount: 1

image:
  repository: nginx
  tag: "1.21"
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: false
  className: nginx
  hosts:
    - host: example.com
      paths:
        - path: /
          pathType: Prefix

resources:
  limits:
    cpu: 100m
    memory: 128Mi
  requests:
    cpu: 100m
    memory: 128Mi

nodeSelector: {}
tolerations: []
affinity: {}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Templates</h2>

          <CodeBlock
            language="yaml"
            title="deployment.yaml"
            code={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "mychart.fullname" . }}
  labels:
    {{- include "mychart.labels" . | nindent 4 }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      {{- include "mychart.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      labels:
        {{- include "mychart.selectorLabels" . | nindent 8 }}
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          ports:
            - containerPort: 80
          {{- if .Values.resources }}
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
          {{- end }}`}
          />

          <CodeBlock
            language="yaml"
            title="_helpers.tpl"
            code={`{{/*
Chart name
*/}}
{{- define "mychart.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Fullname
*/}}
{{- define "mychart.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "mychart.labels" -}}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version }}
{{ include "mychart.selectorLabels" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "mychart.selectorLabels" -}}
app.kubernetes.io/name: {{ include "mychart.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Template Syntax</h2>

          <CodeBlock
            language="yaml"
            title="Built-in Objects"
            code={`# Release
{{ .Release.Name }}
{{ .Release.Namespace }}
{{ .Release.IsUpgrade }}
{{ .Release.IsInstall }}
{{ .Release.Revision }}
{{ .Release.Service }}

# Chart
{{ .Chart.Name }}
{{ .Chart.Version }}
{{ .Chart.AppVersion }}

# Values
{{ .Values.image.repository }}

# Capabilities
{{ .Capabilities.KubeVersion }}
{{ .Capabilities.APIVersions.Has "apps/v1" }}

# Template
{{ .Template.Name }}
{{ .Template.BasePath }}`}
          />

          <CodeBlock
            language="yaml"
            title="Control Flow"
            code={`# If/Else
{{- if .Values.ingress.enabled }}
# ingress config
{{- else }}
# no ingress
{{- end }}

# With (scope change)
{{- with .Values.nodeSelector }}
nodeSelector:
  {{- toYaml . | nindent 2 }}
{{- end }}

# Range (loop)
{{- range .Values.hosts }}
- host: {{ . }}
{{- end }}

{{- range $key, $value := .Values.env }}
- name: {{ $key }}
  value: {{ $value | quote }}
{{- end }}

# Default value
{{ .Values.name | default "default-name" }}

# Required
{{ required "image.tag is required" .Values.image.tag }}`}
          />

          <CodeBlock
            language="yaml"
            title="Functions"
            code={`# String functions
{{ .Values.name | upper }}
{{ .Values.name | lower }}
{{ .Values.name | title }}
{{ .Values.name | quote }}
{{ .Values.name | trim }}
{{ .Values.name | trunc 63 }}
{{ printf "%s-%s" .Release.Name .Chart.Name }}

# Type conversion
{{ .Values.count | int }}
{{ .Values.enabled | toString }}
{{ .Values.data | toYaml }}
{{ .Values.data | toJson }}

# List functions
{{ first .Values.list }}
{{ last .Values.list }}
{{ .Values.list | join "," }}

# Dict functions
{{ .Values.dict | keys }}
{{ .Values.dict | values }}
{{ merge .Values.dict1 .Values.dict2 }}

# Indent
{{ .Values.data | nindent 4 }}
{{ .Values.data | indent 4 }}

# b64
{{ .Values.secret | b64enc }}
{{ .Values.encoded | b64dec }}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Dependencies</h2>

          <CodeBlock
            language="bash"
            title="Dependency Komutları"
            code={`# Dependencies güncelle
helm dependency update mychart

# Dependencies listele
helm dependency list mychart

# Dependencies build
helm dependency build mychart`}
          />

          <CodeBlock
            language="yaml"
            title="Subchart Values"
            code={`# Parent values.yaml
postgresql:
  enabled: true
  auth:
    postgresPassword: "secret"
    database: "mydb"

redis:
  enabled: true
  auth:
    password: "secret"

# Access subchart values in templates
{{ .Values.postgresql.auth.database }}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Test ve Debug</h2>

          <CodeBlock
            language="bash"
            title="Debug Komutları"
            code={`# Template render
helm template my-release mychart
helm template my-release mychart -f values.yaml

# Debug
helm install my-release mychart --debug --dry-run

# Lint
helm lint mychart

# Show values
helm show values bitnami/nginx
helm show chart bitnami/nginx
helm show readme bitnami/nginx
helm show all bitnami/nginx

# Get computed values
helm get values my-release
helm get values my-release --all  # with defaults`}
          />

          <CodeBlock
            language="yaml"
            title="Test Pod"
            code={`# templates/tests/test-connection.yaml
apiVersion: v1
kind: Pod
metadata:
  name: "{{ include "mychart.fullname" . }}-test"
  annotations:
    "helm.sh/hook": test
spec:
  containers:
    - name: wget
      image: busybox
      command: ['wget']
      args: ['{{ include "mychart.fullname" . }}:{{ .Values.service.port }}']
  restartPolicy: Never`}
          />

          <CodeBlock
            language="bash"
            title="Test Çalıştırma"
            code={`# Run tests
helm test my-release

# Run tests with logs
helm test my-release --logs`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Hooks</h2>

          <CodeBlock
            language="yaml"
            title="Hook Türleri"
            code={`# Pre-install hook
apiVersion: batch/v1
kind: Job
metadata:
  name: "{{ .Release.Name }}-pre-install"
  annotations:
    "helm.sh/hook": pre-install
    "helm.sh/hook-weight": "-5"
    "helm.sh/hook-delete-policy": hook-succeeded
spec:
  template:
    spec:
      containers:
        - name: pre-install
          image: busybox
          command: ['sh', '-c', 'echo Pre-install']
      restartPolicy: Never

# Hook types:
# pre-install, post-install
# pre-delete, post-delete
# pre-upgrade, post-upgrade
# pre-rollback, post-rollback
# test

# Delete policies:
# hook-succeeded
# hook-failed
# before-hook-creation`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Packaging ve Publishing</h2>

          <CodeBlock
            language="bash"
            title="Chart Packaging"
            code={`# Package chart
helm package mychart

# Package with version
helm package mychart --version 1.0.0

# Generate index
helm repo index . --url https://example.com/charts

# Push to OCI registry
helm push mychart-0.1.0.tgz oci://registry.example.com/charts

# Install from OCI
helm install my-release oci://registry.example.com/charts/mychart --version 0.1.0`}
          />
        </section>
      </div>
    </div>
  )
}
