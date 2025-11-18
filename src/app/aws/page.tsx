'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Cloud, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function AWSCheatSheet() {
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
              <Cloud className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AWS CLI Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Amazon Web Services</p>
            </div>
          </div>
          <PDFDownload title="AWS" sheetId="aws" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Konfigürasyon</h2>

          <CodeBlock
            language="bash"
            title="AWS CLI Setup"
            code={`# Konfigürasyon
aws configure
aws configure --profile myprofile

# Kimlik bilgisi kontrol
aws sts get-caller-identity

# Profil kullan
aws s3 ls --profile myprofile
export AWS_PROFILE=myprofile

# Region ayarla
aws configure set region eu-west-1`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">S3 (Storage)</h2>

          <CodeBlock
            language="bash"
            title="S3 Komutlari"
            code={`# Bucket listele
aws s3 ls
aws s3 ls s3://bucket-name

# Bucket olustur
aws s3 mb s3://bucket-name
aws s3 mb s3://bucket-name --region eu-west-1

# Dosya yukle/indir
aws s3 cp file.txt s3://bucket/
aws s3 cp s3://bucket/file.txt ./
aws s3 cp file.txt s3://bucket/ --acl public-read

# Sync (rsync gibi)
aws s3 sync ./local s3://bucket/path
aws s3 sync s3://bucket/path ./local
aws s3 sync . s3://bucket --delete

# Sil
aws s3 rm s3://bucket/file.txt
aws s3 rm s3://bucket --recursive
aws s3 rb s3://bucket --force

# Presigned URL
aws s3 presign s3://bucket/file.txt --expires-in 3600`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">EC2 (Compute)</h2>

          <CodeBlock
            language="bash"
            title="EC2 Komutlari"
            code={`# Instance listele
aws ec2 describe-instances
aws ec2 describe-instances --instance-ids i-1234567890abcdef0
aws ec2 describe-instances --filters "Name=instance-state-name,Values=running"

# Instance baslat/durdur
aws ec2 start-instances --instance-ids i-1234567890abcdef0
aws ec2 stop-instances --instance-ids i-1234567890abcdef0
aws ec2 reboot-instances --instance-ids i-1234567890abcdef0
aws ec2 terminate-instances --instance-ids i-1234567890abcdef0

# AMI listele
aws ec2 describe-images --owners amazon --filters "Name=name,Values=amzn2-ami-hvm-*"

# Security Group
aws ec2 describe-security-groups
aws ec2 create-security-group --group-name my-sg --description "My SG"
aws ec2 authorize-security-group-ingress \\
  --group-id sg-123456 \\
  --protocol tcp \\
  --port 22 \\
  --cidr 0.0.0.0/0

# Key Pair
aws ec2 create-key-pair --key-name MyKeyPair --query 'KeyMaterial' --output text > MyKeyPair.pem`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Lambda</h2>

          <CodeBlock
            language="bash"
            title="Lambda Komutlari"
            code={`# Fonksiyon listele
aws lambda list-functions

# Fonksiyon olustur
aws lambda create-function \\
  --function-name my-function \\
  --runtime python3.9 \\
  --handler lambda_function.handler \\
  --role arn:aws:iam::123456789:role/lambda-role \\
  --zip-file fileb://function.zip

# Fonksiyon cagir
aws lambda invoke \\
  --function-name my-function \\
  --payload '{"key": "value"}' \\
  output.json

# Fonksiyon guncelle
aws lambda update-function-code \\
  --function-name my-function \\
  --zip-file fileb://function.zip

# Fonksiyon sil
aws lambda delete-function --function-name my-function`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">IAM</h2>

          <CodeBlock
            language="bash"
            title="IAM Komutlari"
            code={`# User listele
aws iam list-users
aws iam get-user --user-name myuser

# User olustur
aws iam create-user --user-name myuser
aws iam create-access-key --user-name myuser

# Role listele
aws iam list-roles
aws iam get-role --role-name myrole

# Policy
aws iam list-policies
aws iam attach-user-policy \\
  --user-name myuser \\
  --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess

# Group
aws iam create-group --group-name mygroup
aws iam add-user-to-group --user-name myuser --group-name mygroup`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">RDS (Database)</h2>

          <CodeBlock
            language="bash"
            title="RDS Komutlari"
            code={`# Instance listele
aws rds describe-db-instances

# Instance olustur
aws rds create-db-instance \\
  --db-instance-identifier mydb \\
  --db-instance-class db.t2.micro \\
  --engine mysql \\
  --master-username admin \\
  --master-user-password password123 \\
  --allocated-storage 20

# Snapshot
aws rds create-db-snapshot \\
  --db-instance-identifier mydb \\
  --db-snapshot-identifier mydb-snapshot

# Sil
aws rds delete-db-instance \\
  --db-instance-identifier mydb \\
  --skip-final-snapshot`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">DynamoDB</h2>

          <CodeBlock
            language="bash"
            title="DynamoDB Komutlari"
            code={`# Table listele
aws dynamodb list-tables

# Table olustur
aws dynamodb create-table \\
  --table-name MyTable \\
  --attribute-definitions AttributeName=id,AttributeType=S \\
  --key-schema AttributeName=id,KeyType=HASH \\
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

# Item ekle
aws dynamodb put-item \\
  --table-name MyTable \\
  --item '{"id": {"S": "1"}, "name": {"S": "Test"}}'

# Item oku
aws dynamodb get-item \\
  --table-name MyTable \\
  --key '{"id": {"S": "1"}}'

# Scan
aws dynamodb scan --table-name MyTable

# Query
aws dynamodb query \\
  --table-name MyTable \\
  --key-condition-expression "id = :id" \\
  --expression-attribute-values '{":id": {"S": "1"}}'`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">CloudWatch</h2>

          <CodeBlock
            language="bash"
            title="CloudWatch Komutlari"
            code={`# Log gruplari
aws logs describe-log-groups
aws logs describe-log-streams --log-group-name /aws/lambda/my-function

# Log oku
aws logs get-log-events \\
  --log-group-name /aws/lambda/my-function \\
  --log-stream-name 'stream-name'

# Metrik listele
aws cloudwatch list-metrics --namespace AWS/EC2

# Alarm olustur
aws cloudwatch put-metric-alarm \\
  --alarm-name cpu-alarm \\
  --metric-name CPUUtilization \\
  --namespace AWS/EC2 \\
  --statistic Average \\
  --period 300 \\
  --threshold 80 \\
  --comparison-operator GreaterThanThreshold`}
          />
        </section>
      </div>
    </div>
  )
}
