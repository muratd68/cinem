'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Ship, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function KubernetesCheatSheet() {
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
            <div className="p-3 rounded-xl bg-blue-500">
              <Ship className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Kubernetes Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Container orchestration</p>
            </div>
          </div>
          <PDFDownload title="Kubernetes" sheetId="kubernetes" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">kubectl Temel Komutlar</h2>

          <CodeBlock
            language="bash"
            title="Cluster Bilgisi"
            code={`# Cluster bilgisi
kubectl cluster-info
kubectl get nodes
kubectl describe node <node-name>

# Context yonetimi
kubectl config get-contexts
kubectl config use-context <context-name>
kubectl config current-context

# Namespace
kubectl get namespaces
kubectl create namespace <name>
kubectl delete namespace <name>
kubectl config set-context --current --namespace=<name>`}
          />

          <CodeBlock
            language="bash"
            title="Pod Islemleri"
            code={`# Pod listele
kubectl get pods
kubectl get pods -o wide
kubectl get pods --all-namespaces
kubectl get pods -n <namespace>
kubectl get pods -l app=myapp

# Pod detay
kubectl describe pod <pod-name>
kubectl logs <pod-name>
kubectl logs -f <pod-name>           # Canli takip
kubectl logs <pod-name> -c <container>

# Pod calistir
kubectl run nginx --image=nginx
kubectl run nginx --image=nginx --port=80

# Pod'a baglan
kubectl exec -it <pod-name> -- /bin/bash
kubectl exec <pod-name> -- ls /app

# Pod sil
kubectl delete pod <pod-name>
kubectl delete pods --all`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Deployment</h2>

          <CodeBlock
            language="bash"
            title="Deployment Komutlari"
            code={`# Deployment listele
kubectl get deployments
kubectl get deploy

# Deployment olustur
kubectl create deployment nginx --image=nginx
kubectl create deployment nginx --image=nginx --replicas=3

# Deployment guncelle
kubectl set image deployment/nginx nginx=nginx:1.21
kubectl rollout status deployment/nginx
kubectl rollout history deployment/nginx
kubectl rollout undo deployment/nginx

# Scale
kubectl scale deployment nginx --replicas=5

# Sil
kubectl delete deployment nginx`}
          />

          <CodeBlock
            language="yaml"
            title="Deployment YAML"
            code={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.21
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Service</h2>

          <CodeBlock
            language="bash"
            title="Service Komutlari"
            code={`# Service listele
kubectl get services
kubectl get svc

# Service olustur
kubectl expose deployment nginx --port=80 --type=ClusterIP
kubectl expose deployment nginx --port=80 --type=NodePort
kubectl expose deployment nginx --port=80 --type=LoadBalancer

# Port forward
kubectl port-forward svc/nginx 8080:80
kubectl port-forward pod/nginx 8080:80`}
          />

          <CodeBlock
            language="yaml"
            title="Service YAML"
            code={`apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: LoadBalancer`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">ConfigMap ve Secret</h2>

          <CodeBlock
            language="bash"
            title="ConfigMap"
            code={`# ConfigMap olustur
kubectl create configmap myconfig --from-literal=key=value
kubectl create configmap myconfig --from-file=config.txt
kubectl create configmap myconfig --from-env-file=.env

# Listele
kubectl get configmaps
kubectl describe configmap myconfig`}
          />

          <CodeBlock
            language="bash"
            title="Secret"
            code={`# Secret olustur
kubectl create secret generic mysecret --from-literal=password=123
kubectl create secret generic mysecret --from-file=ssh-key=~/.ssh/id_rsa
kubectl create secret docker-registry regcred \\
  --docker-server=<server> \\
  --docker-username=<user> \\
  --docker-password=<pass>

# Listele
kubectl get secrets
kubectl describe secret mysecret`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Ingress</h2>

          <CodeBlock
            language="yaml"
            title="Ingress YAML"
            code={`apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp-service
            port:
              number: 80`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Persistent Volume</h2>

          <CodeBlock
            language="yaml"
            title="PV ve PVC"
            code={`# PersistentVolume
apiVersion: v1
kind: PersistentVolume
metadata:
  name: my-pv
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /data/my-pv

---
# PersistentVolumeClaim
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Diger Komutlar</h2>

          <CodeBlock
            language="bash"
            title="Debug ve Yonetim"
            code={`# Apply/Delete
kubectl apply -f deployment.yaml
kubectl delete -f deployment.yaml

# Tum kaynaklari gor
kubectl get all
kubectl get all -n <namespace>

# Event'leri gor
kubectl get events
kubectl get events --sort-by='.lastTimestamp'

# Resource kullanimi
kubectl top nodes
kubectl top pods

# Dry run
kubectl run nginx --image=nginx --dry-run=client -o yaml

# Edit
kubectl edit deployment nginx

# Label
kubectl label pods nginx app=web
kubectl get pods -l app=web`}
          />
        </section>
      </div>
    </div>
  )
}
